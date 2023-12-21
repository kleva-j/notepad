import type { inferRouterInputs, inferRouterOutputs } from "@trpc/server";

import { syncRouter } from "@/server/routers/sync";
import { authRouter } from "@/server/routers/auth";
import { createTRPCRouter } from "@/server/trpc";

export const appRouter = createTRPCRouter({
	sync: syncRouter,
	auth: authRouter,
});

export type AppRouter = typeof appRouter;
export type RouterInputs = inferRouterInputs<AppRouter>;
export type RouterOutputs = inferRouterOutputs<AppRouter>;
