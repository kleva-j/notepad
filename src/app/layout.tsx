import React, { PropsWithChildren } from "react";

import { getSession } from "@/lib/session";
import { Roboto } from "next/font/google";
import { headers } from "next/headers";
import { Session } from "next-auth";
import { Metadata } from "next";

import Providers from "./provider";

import "@/styles/globals.css";

const title = "Notepad";
const description = "This is a Note taking app.";

export const metadata: Metadata = {
	title,
	description,
	icons: {
		icon: "/favicon.ico",
		shortcut: "/favicon-16x16.png",
		apple: "/apple-touch-icon.png",
	},
};

const fontMono = Roboto({
	weight: ["100", "300", "400", "500", "700", "900"],
	subsets: ["latin"],
});

export default async function RootLayout({ children }: PropsWithChildren) {
	const session = (await getSession(headers().get("cookie") ?? "")) as Session;

	return (
		<html lang="en">
			<meta
				name="theme-color"
				content="#000"
				media="(prefers-color-scheme: dark)"
			/>
			<meta
				name="theme-color"
				content="#fff"
				media="(prefers-color-scheme: light)"
			/>
			<body className={fontMono.className}>
				<Providers session={session}>{children}</Providers>
			</body>
		</html>
	);
}
