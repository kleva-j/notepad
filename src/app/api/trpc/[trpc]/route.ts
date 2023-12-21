/* eslint-disable @typescript-eslint/ban-ts-comment */
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { appRouter as router } from "@/server/routers";
import { createContext } from "@/server/context";

const handler = (req: Request) =>
	fetchRequestHandler({
		endpoint: "/api/trpc",
		req,
		router,
		// @ts-ignore
		createContext,
	});

export { handler as GET, handler as POST };
