import { createCallerFactory, createTRPCRouter } from "@/server/api/trpc";
import { authRouter } from "./routers/auth";
import { dashboardRouter } from "./routers/dashboard";

export const appRouter = createTRPCRouter({
	auth: authRouter,
	bms: dashboardRouter,
});
export type AppRouter = typeof appRouter;
export const createCaller = createCallerFactory(appRouter);
