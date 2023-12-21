import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "@/server/trpc";

export const syncRouter = createTRPCRouter({
	sync: protectedProcedure.query(() => {
		return "Synced Successfully!";
	}),
	getNotes: protectedProcedure
		.input(z.object({ text: z.string() }))
		.query(({ ctx }) => {
			return ctx.prisma.example.findMany();
		}),

	getCategories: protectedProcedure.query(() => {
		return "you can now see this secret message!";
	}),
});
