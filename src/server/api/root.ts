import { createTRPCRouter } from "~/server/api/trpc";
import { goalMapRouter } from "./routers/goal-map";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  goalMap: goalMapRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
