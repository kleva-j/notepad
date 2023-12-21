import { type PropsWithChildren } from "react";

import { Roboto } from "next/font/google";

export { metadata } from "@/app/_metadata";

import Providers from "@/app/_providers";

import "@/styles/globals.css";

const fontMono = Roboto({
	weight: ["100", "300", "400", "500", "700", "900"],
	subsets: ["latin"],
});

export default async function RootLayout({ children }: PropsWithChildren) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body className={`${fontMono.className} relative`}>
				<Providers>
					{children}
				</Providers>
			</body>
		</html>
	);
}
