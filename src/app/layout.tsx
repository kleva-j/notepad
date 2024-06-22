import "@/styles/globals.css";

import { type PropsWithChildren } from "react";

export { metadata } from "@/app/_metadata";
import { fontMono } from "@/lib/font";

export default function RootLayout({ children }: PropsWithChildren) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body
				suppressHydrationWarning
				className={`${fontMono.className} relative`}
			>
				{children}
			</body>
		</html>
	);
}
