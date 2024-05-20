import { ChatAnthropic } from "@langchain/anthropic";
import { RunnableSequence } from "@langchain/core/runnables";
import { StructuredOutputParser } from "langchain/output_parsers";
import { ChatPromptTemplate } from "langchain/prompts";
import { env } from "process";
import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

const model = new ChatAnthropic({
  anthropicApiKey: env.ANTHROPIC_API_KEY,
});

const parser = StructuredOutputParser.fromZodSchema(
  z.object({
    translation: z.string().describe("Translation of the phrase to english"),
    tutorial: z
      .array(
        z.object({
          title: z
            .string()
            .describe(
              "The title that describes the current tutorial that the user is learning",
            ),
          text: z
            .string()
            .describe(
              "The content of the current step tutorial that the user is learning the phrase with, use markdown in it.",
            ),
        }),
      )
      .describe("An array of the tutorial steps"),
  }),
);

const promptTemplate = ChatPromptTemplate.fromTemplate(
  `
You are an expert in all languages in the world

Generate a comprehensive step by step {level} tutorial for the phrase: "{phrase}" ({language})

- Break down the phrase into individual words and their meanings
- Vocabulary definitions and examples based on the {phrase} * Include synonyms, antonyms, and usage examples for each word.
* If the language has grammatical genders, specify the gender of each noun and its impact on articles.
* For languages with Kanji characters, include the Kanji reading (on'yomi and kun'yomi) and meaning for each relevant word.

- Grammar rules and structure analysis of the {phrase}
* Focus on core grammar concepts relevant to the phrase (e.g., verb conjugation, sentence structure).
* If the language is agglutinative, explain how suffixes change meaning and part of speech.

- Pronunciation guide with audio cues for the {phrase} For languages with Kanji characters, include audio cues for both on'yomi and kun'yomi readings of relevant Kanji, along with the pronunciation of the entire phrase. also write the pronunciations for each word or phrase in "()" using english letters.
- Contextual usage in sentences for the {phrase}
- Interactive practice exercises for the {phrase}

import follow this format:
{format_instructions}
do not return anything else other than the requested json code
`,
);

const chain = RunnableSequence.from([promptTemplate, model, parser]);

export const tutorialRouter = createTRPCRouter({
  create: protectedProcedure
    .input(z.object({ prompt: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const prompt = input.prompt;

      const existingTutorial = await ctx.db
        .select(ctx.db.Tutorial, (tutorial) => {
          return {
            id: true,
            filter_single: ctx.db.op(tutorial.phrase, "=", prompt),
          };
        })
        .run(ctx.session.client);

      if (existingTutorial) {
        return existingTutorial;
      }

      const result = await chain.invoke({
        phrase: prompt,
        format_instructions: parser.getFormatInstructions(),
        level: "beginner",
        language: "Auto Detect the language",
      });

      const tutorial = ctx.db.insert(ctx.db.Tutorial, {
        phrase: prompt,
        translation: result.translation,
        user: ctx.db.select(ctx.db.User, (user) => {
          return {
            filter_single: ctx.db.op(
              user.id,
              "=",
              ctx.db.uuid(ctx.session.user.id),
            ),
          };
        }),
      });

      return await ctx.session.client.transaction(async () => {
        const res = await tutorial.run(ctx.session.client);

        const query = ctx.db.params({ items: ctx.db.json }, (params) => {
          return ctx.db.for(ctx.db.json_array_unpack(params.items), (item) => {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-return
            return ctx.db.insert(ctx.db.TutorialStep, {
              body: ctx.db.cast(ctx.db.str, item.body),
              title: ctx.db.cast(ctx.db.str, item.title),
              tutorial: ctx.db.select(ctx.db.Tutorial, () => ({
                filter_single: { id: ctx.db.uuid(res.id) },
              })),
            });
          });
        });

        await query.run(ctx.session.client, {
          items: result.tutorial.map((tut) => ({
            body: tut.text,
            title: tut.title,
          })),
        });

        return res;
      });
    }),

  getTutorial: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      return ctx.db
        .select(ctx.db.Tutorial, () => ({
          filter_single: {
            id: ctx.db.uuid(input.id),
          },
          id: true,
          phrase: true,
          translation: true,
          tutorialSteps: {
            body: true,
            title: true,
          },
        }))
        .run(ctx.session.client);
    }),
});
