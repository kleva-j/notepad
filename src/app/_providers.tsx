"use client";

import type { FC, PropsWithChildren } from "react";

import { ThemeProvider } from "next-themes";
import { Provider } from "jotai";

export const Providers: FC<PropsWithChildren> = ({ children }) => {
	return (
		<ThemeProvider
			attribute="class"
			defaultTheme="system"
			enableSystem
			disableTransitionOnChange
		>
			<Provider>{children}</Provider>
		</ThemeProvider>
	);
};

export default Providers;
