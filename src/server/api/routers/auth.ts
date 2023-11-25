import { z } from "zod";

import {
	createTRPCRouter,
	publicProcedure,
	protectedProcedure,
} from "@/server/api/trpc";

export const exampleRouter = createTRPCRouter({
	healthz: publicProcedure
		.input(z.object({ name: z.string() }))
		.query(({ input }) => ({ greeting: `Hi! ${input.name}` })),

	getAll: publicProcedure.query(({ ctx }) => {
		return ctx.prisma.example.findMany();
	}),

	getSecretMessage: protectedProcedure.query(() => {
		return "you can now see this secret message!";
	}),
});
