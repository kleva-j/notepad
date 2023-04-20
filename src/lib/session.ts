import { getServerSession } from "next-auth/next";
import { authOptions } from "@/server/auth";
import { Session } from "next-auth";
import { env } from "@/env.mjs";

export async function getSession(cookie: string): Promise<Session> {
	const response = await fetch(`${env.NEXTAUTH_URL}/api/auth/session`, {
		headers: { cookie },
	});

	const session = await response.json();

	return Object.keys(session).length > 0 ? session : null;
}

export async function getCurrentUser() {
	const session = await getServerSession(authOptions);
	return session?.user;
}
