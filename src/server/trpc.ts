import type { Context } from "@/server/context";

import { TRPCError, initTRPC } from "@trpc/server";
import { ZodError } from "zod";

import SuperJSON from "superjson";

export const t = initTRPC.context<Context>().create({
	transformer: SuperJSON,
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

const enforceUserIsAuthed = t.middleware(({ next, ctx }) => {
	if (!ctx.user) {
		throw new TRPCError({ code: "UNAUTHORIZED", message: "Not authenticated" });
	}

	return next({
		ctx: { ...ctx, user: ctx.user },
	});
});

export const createTRPCRouter = t.router;
export const publicProcedure = t.procedure;
export const protectedProcedure = t.procedure.use(enforceUserIsAuthed);
