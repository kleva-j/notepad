import { type inferAsyncReturnType } from "@trpc/server";
import { type NextRequest } from "next/server";

import { getAuth, clerkClient } from "@clerk/nextjs/server";
import { prisma } from "@/server/db";

type CreateContextOptions = { req: NextRequest };

export const createContext = async (opts: CreateContextOptions) => {
	async function getUser() {
		const { userId } = getAuth(opts.req);
		const user = userId ? clerkClient.users.getUser(userId) : null;
		return user;
	}
	return { user: await getUser(), prisma };
};

export type Context = inferAsyncReturnType<typeof createContext>;
