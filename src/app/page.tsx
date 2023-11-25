"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { api } from "@/utils/api";

import React from "react";

function RootPage() {
	const hello = api.example.hello.useQuery({ text: "from tRPC" });
	const { data: session } = useSession();
	const { data: secretMessage } = api.example.getSecretMessage.useQuery(
		undefined, // no input
		{ enabled: session?.user !== undefined },
	);

	return (
		<main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
			<div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
				<p className="text-2xl text-white">
					{hello.data ? hello.data.greeting : "Loading tRPC query..."}
				</p>
				<div className="flex flex-col items-center justify-center gap-4">
					<p className="text-center text-2xl text-white">
						{session && <span>Logged in as {session.user?.name}</span>}
						{secretMessage && <span> - {secretMessage}</span>}
					</p>
					<button
						className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
						onClick={session ? () => void signOut() : () => void signIn()}
					>
						{session ? "Sign out" : "Sign in"}
					</button>
				</div>
			</div>
		</main>
	);
}

export default api.withTRPC(RootPage);
