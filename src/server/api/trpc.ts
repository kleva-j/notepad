import { initTRPC } from "@trpc/server";
import { prisma } from "@/server/db";
import { ZodError } from "zod";

const createInnerTRPCContext = () => ({ prisma });

export const createTRPCContext = async () => createInnerTRPCContext();

import superjson from "superjson";

const t = initTRPC.context<typeof createTRPCContext>().create({
	transformer: superjson,
	errorFormatter({ shape, error }) {
		return {
			...shape,
			data: {
				...shape.data,
				zodError:
					error.cause instanceof ZodError ? error.cause.flatten() : null,
			},
		};
	},
});

const enforceUserIsAuthed = t.middleware(({ ctx, next }) => next({ ctx }));

export const createTRPCRouter = t.router;
export const publicProcedure = t.procedure;
export const protectedProcedure = t.procedure.use(enforceUserIsAuthed);
