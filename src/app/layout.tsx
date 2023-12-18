import React, { PropsWithChildren } from "react";

import { Toaster } from "@/components/ui/toaster";
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
		<html lang="en">
			<body className={`${fontMono.className} relative`}>
				<Providers>
					{children}
					<Toaster />
				</Providers>
			</body>
		</html>
	);
}
