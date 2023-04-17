import { SeoHeader } from "@/component/SeoHeader";

import React, { PropsWithChildren } from "react";

import Providers from "./provider";

import "@/styles/globals.css";

function RootLayout({ children }: PropsWithChildren) {
	return (
		<html lang="en">
			<SeoHeader />
			<body>
				<Providers>{children}</Providers>
			</body>
		</html>
	);
}

export default RootLayout;
