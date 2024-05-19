import { ChatAnthropic } from "@langchain/anthropic";
import { RunnableSequence } from "@langchain/core/runnables";
import { StructuredOutputParser } from "langchain/output_parsers";

import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";

import { ChatPromptTemplate } from "@langchain/core/prompts";
import { TRPCError } from "@trpc/server";
import { env } from "~/env";

const model = new ChatAnthropic({
  anthropicApiKey: env.ANTHROPIC_API_KEY,
});

const parser = StructuredOutputParser.fromZodSchema(
  z.object({
    body: z
      .string()
      .describe("review of the quiz, use markup too for better readability."),
  }),
);

const promptTemplate = ChatPromptTemplate.fromTemplate(
  `
You are an expert in all languages in the world and you are about to prepare a review based on a quiz that you took form students who want to learn a phrase in language of ({language}).


Generate a comprehensive step by step {level} review for the phrase: "{phrase}" ({language}) also this is the translation of the phrase: {translation} it should be a very detailed review.

here is the result and review it: 
student name = {student}
result in a json format= {quiz}

give them a score at the end, don't act like as if it's a chat or an ongoing conversation. just a bare result.

import follow this format:
{format_instructions}
do not return anything else other than the requested json code
`,
);

const chain = RunnableSequence.from([promptTemplate, model, parser]);

export const reviewRouter = createTRPCRouter({
  generateReview: protectedProcedure
    .input(
      z.object({
        takenQuizId: z.string().uuid(),
        tutId: z.string().uuid(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const tutorial = await ctx.db
        .select(ctx.db.Tutorial, () => {
          return {
            phrase: true,
            translation: true,
            filter_single: {
              id: ctx.db.uuid(input.tutId),
            },
          };
        })
        .run(ctx.session.client);

      if (!tutorial) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Tutorial Not Found",
        });
      }

      const takenQuiz = await ctx.db
        .select(ctx.db.TakenQuiz, () => {
          return {
            review: true,
            filter_single: {
              id: ctx.db.uuid(input.takenQuizId),
            },
          };
        })
        .run(ctx.session.client);

      if (takenQuiz?.review) {
        return { body: takenQuiz.review };
      }

      const quizResult = await ctx.db
        .select(ctx.db.TakenQuiz, () => {
          return {
            filter_single: {
              id: input.takenQuizId,
            },
            answeredQuestions: {
              isCorrect: true,
              userAnswer: true,
              question: {
                title: true,
              },
            },
          };
        })
        .run(ctx.session.client);

      console.log("here");

      const result = await chain.invoke({
        phrase: tutorial.phrase,
        quiz: JSON.stringify(quizResult),
        student: ctx.session.user.name ?? "Student",
        translation: tutorial.translation,
        format_instructions: parser.getFormatInstructions(),
        level: "beginner",
        language: "Auto Detect the language",
      });
      console.log("here", {
        result,
      });

      await ctx.db
        .update(ctx.db.TakenQuiz, () => {
          return {
            set: {
              review: result.body,
            },
            filter_single: {
              id: ctx.db.uuid(input.takenQuizId),
            },
          };
        })
        .run(ctx.session.client);

      return result;
    }),
});
