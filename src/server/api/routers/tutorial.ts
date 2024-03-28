import { ChatAnthropic } from "@langchain/anthropic";
import { RunnableSequence } from "@langchain/core/runnables";
import { StructuredOutputParser } from "langchain/output_parsers";
import { ChatPromptTemplate } from "langchain/prompts";
import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

const model = new ChatAnthropic({
  anthropicApiKey: process.env.ANTHROPIC_API_KEY || "",
});

const parser = StructuredOutputParser.fromZodSchema(
  z.object({
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
      .describe(
        "An array of a ten step tutorial it must include every detail for user to learn the provided phrase",
      ),
  }),
);

const promptTemplate = ChatPromptTemplate.fromTemplate(
  "You are a language teacher world-classs that can teach grammer, spelling, and vocabulary. your job is to generate a tutorial based on a phrase that the user will provide to you. the tutorial must be a ten step detailed tutorial it must include grammer, vocabulary and other sections that you think is needed. break down the phrase word by word and if the language has special letters for instance kanji break them down too. generate steps based on the language user is trying to learn. make sure to follow this IMPORTANT \n{format_instructions}\n phrase:{phrase}",
);

const chain = RunnableSequence.from([promptTemplate, model, parser]);

export const tutorialRouter = createTRPCRouter({
  create: protectedProcedure
    .input(z.object({ prompt: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const prompt = input.prompt;

      const existingTutorial = await ctx.db.tutorial.findFirst({
        where: {
          userId: ctx.session.user.id,
          phrase: prompt,
        },
      });

      if (existingTutorial) {
        return existingTutorial;
      }

      const result = await chain.invoke({
        phrase: prompt,
        format_instructions: parser.getFormatInstructions(),
      });

      const tutorial = await ctx.db.tutorial.create({
        data: {
          phrase: prompt,
          userId: ctx.session.user.id,
          tutorialSteps: {
            createMany: {
              data: result.tutorial.map((step) => ({
                body: step.text,
                title: step.title,
              })),
            },
          },
        },
      });

      return tutorial;
    }),

  getTutorial: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      return ctx.db.tutorial.findUnique({
        where: {
          id: input.id,
        },
        include: {
          tutorialSteps: true,
        },
      });
    }),
});
