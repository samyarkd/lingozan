import { createTRPCRouter } from "~/server/api/trpc";
import { quizRouter } from "./routers/quiz";
import { reviewRouter } from "./routers/review";
import { tutorialRouter } from "./routers/tutorial";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  tutorial: tutorialRouter,
  quiz: quizRouter,
  review: reviewRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
