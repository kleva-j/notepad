import React, { PropsWithChildren } from "react";

import { SeoHeader } from "@/component/SeoHeader";
import { getSession } from "@/lib/session";
import { headers } from "next/headers";

import Providers from "./provider";

import "@/styles/globals.css";
import { Session } from "next-auth";

export default async function RootLayout({ children }: PropsWithChildren) {
	const session = (await getSession(headers().get("cookie") ?? "")) as Session;

	return (
		<html lang="en">
			<SeoHeader />
			<body>
				<Providers session={session}>{children}</Providers>
			</body>
		</html>
	);
}
