import NextAuth, { type NextAuthConfig } from "next-auth";

import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db } from "@/lib/db";

import GitHub from "next-auth/providers/github";

export const { handlers, auth } = NextAuth({
	providers: [GitHub],
	adapter: DrizzleAdapter(db),
} satisfies NextAuthConfig);
