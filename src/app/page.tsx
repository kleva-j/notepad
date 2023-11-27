"use client";

import { api } from "@/utils/api";

import React from "react";

function RootPage() {
	const hello = api.example.hello.useQuery({ text: "from tRPC" });

	return (
		<main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
			<div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
				<p className="text-2xl text-white">
					{hello.data ? hello.data.greeting : "Loading tRPC query..."}
				</p>
			</div>
		</main>
	);
}

export default api.withTRPC(RootPage);
