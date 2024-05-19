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

type ReturnResponse = {
  answers: string[];
  correctAnswer: string;
  id: string;
  title: string;
};

export const quizRouter = createTRPCRouter({
  generateQuiz: protectedProcedure
    .input(z.object({ id: z.string().uuid() }))
    .mutation(async ({ ctx, input }): Promise<Array<ReturnResponse>> => {
      const db = ctx.db;
      const edgeDbClient = ctx.session.client;

      const tutorial = await db
        .select(db.Tutorial, () => {
          return {
            translation: true,
            phrase: true,
            tutorialQuestions: ctx.db.Question["*"],
            filter_single: {
              id: db.uuid(input.id),
            },
          };
        })
        .run(edgeDbClient);

      if (!tutorial) {
        throw new Error("Tutorial Not Found");
      }

      if (tutorial.tutorialQuestions.length) {
        return tutorial.tutorialQuestions;
      }

      const result = await chain.invoke({
        phrase: tutorial.phrase,
        translation: tutorial.translation,
        format_instructions: parser.getFormatInstructions(),
        level: "beginner",
        language: "Auto Detect the language",
      });

      return await ctx.session.client.transaction(async () => {
        const query = ctx.db.params({ items: ctx.db.json }, (params) => {
          return ctx.db.for(ctx.db.json_array_unpack(params.items), (item) => {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-return
            return ctx.db.insert(ctx.db.Question, {
              correctAnswer: ctx.db.cast(ctx.db.str, item.correctAnswer),
              title: ctx.db.cast(ctx.db.str, item.title),
              answers: ctx.db.cast(ctx.db.array(ctx.db.str), item.answers),
              tutorial: ctx.db.select(ctx.db.Tutorial, () => ({
                filter_single: { id: ctx.db.uuid(input.id) },
              })),
            });
          });
        });

        await query.run(ctx.session.client, {
          items: result.quiz.map((tut) => ({
            answers: tut.answers,
            correctAnswer: tut.answers[tut.correctAnswer],
            title: tut.question,
          })),
        });

        return await ctx.db
          .select(ctx.db.Question, (q) => {
            return {
              id: true,
              answers: true,
              correctAnswer: true,
              title: true,
              filter: ctx.db.op(q.tutorial.id, "=", ctx.db.uuid(input.id)),
            };
          })
          .run(ctx.session.client);
      });
    }),

  postAnswers: protectedProcedure
    .input(
      z.object({
        answers: z.array(
          z.object({
            questionId: z.string(),
            userAnswer: z.string(),
          }),
        ),
        tutId: z.string().uuid(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      // create the takenquiz record
      const takenQuiz = await ctx.db
        .insert(ctx.db.TakenQuiz, {
          tutorial: ctx.db.select(ctx.db.Tutorial, () => ({
            filter_single: { id: ctx.db.uuid(input.tutId) },
          })),
        })
        .run(ctx.session.client);

      // loop through the answers
      for (const a of input.answers) {
        // find the question
        const question = await ctx.db
          .select(ctx.db.Question, () => {
            return {
              answers: true,
              title: true,
              correctAnswer: true,
              filter_single: {
                id: ctx.db.uuid(a.questionId),
              },
            };
          })
          .run(ctx.session.client);

        // add the question answer
        if (question) {
          await ctx.db
            .insert(ctx.db.AnsweredQuestion, {
              isCorrect: question.correctAnswer === a.userAnswer,
              userAnswer: a.userAnswer,
              takenQuiz: ctx.db.select(ctx.db.TakenQuiz, () => ({
                filter_single: {
                  id: ctx.db.uuid(takenQuiz.id),
                },
              })),
              question: ctx.db.select(ctx.db.Question, () => ({
                filter_single: {
                  id: ctx.db.uuid(a.questionId),
                },
              })),
            })
            .run(ctx.session.client);
        }
      }

      return {
        takeQuizId: takenQuiz.id,
      };
    }),
});
