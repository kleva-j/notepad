import "@/styles/globals.css";

import { type PropsWithChildren } from "react";

import { Providers } from "@/app/_providers";
export { metadata } from "@/app/_metadata";
import { Roboto } from "next/font/google";

const fontMono = Roboto({
	weight: ["100", "300", "400", "500", "700", "900"],
	subsets: ["latin"],
});

export default async function RootLayout({ children }: PropsWithChildren) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body suppressHydrationWarning className={`${fontMono.className} relative`}>
				<Providers>{children}</Providers>
			</body>
		</html>
	);
}
