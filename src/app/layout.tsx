import "@/styles/globals.css";

import { type PropsWithChildren } from "react";

import { fontMono, fontSans } from "@/lib/font";
export { metadata } from "@/app/_metadata";
import { cn } from "@/lib/utils";

export default function RootLayout({ children }: PropsWithChildren) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body
				suppressHydrationWarning
				className={cn(
					"min-h-screen font-sans antialiased",
					fontSans.variable,
					fontMono.variable,
				)}
			>
				{children}
			</body>
		</html>
	);
}
