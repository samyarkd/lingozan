import { ChatAnthropic } from "@langchain/anthropic";
import { RunnableSequence } from "@langchain/core/runnables";
import { StructuredOutputParser } from "langchain/output_parsers";
import { env } from "process";

import { ChatPromptTemplate } from "langchain/prompts";
import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";

const model = new ChatAnthropic({
  anthropicApiKey: env.ANTHROPIC_API_KEY,
});

const parser = StructuredOutputParser.fromZodSchema(
  z.object({
    quiz: z
      .array(
        z.object({
          question: z.string().describe("question title for the question"),
          answers: z
            .array(z.string())
            .describe("list of answers for the question"),
          correctAnswer: z
            .number()
            .describe("zero index of the correct answer"),
        }),
      )
      .describe("An array of the tutorial steps"),
  }),
);

const promptTemplate = ChatPromptTemplate.fromTemplate(
  `
You are an expert in all languages in the world and you are about to prepare a quiz for students who want to learn a phrase in language of ({language}).


Generate a comprehensive step by step {level} quiz for the phrase: "{phrase}" ({language}) also this is the translation of the phrase: {translation}.

each question has a title and it should have four answers, with one being the correct one.

generate quiz questions just like how duolingo does for this phrase : {phrase} the quiz should focus on teaching this phrase: {phrase}.

make sure it's at least 10 questions

import follow this format:
{format_instructions}
do not return anything else other than the requested json code
`,
);

const chain = RunnableSequence.from([promptTemplate, model, parser]);

export const quizRouter = createTRPCRouter({
  generateQuiz: protectedProcedure
    .input(z.object({ id: z.string().uuid() }))
    .mutation(async ({ ctx, input }) => {
      const db = ctx.db;
      const edgeDbClient = ctx.session.client;

      const tutorial = await db
        .select(db.Tutorial, () => {
          return {
            translation: true,
            phrase: true,
            filter_single: {
              id: db.uuid(input.id),
            },
          };
        })
        .run(edgeDbClient);

      if (!tutorial) {
        throw new Error("Tutorial Not Found");
      }

      // TODO: add the quiz to database and return it if it exists

      const result = await chain.invoke({
        phrase: tutorial.phrase,
        translation: tutorial.translation,
        format_instructions: parser.getFormatInstructions(),
        level: "beginner",
        language: "Auto Detect the language",
      });

      return result;
    }),
});
