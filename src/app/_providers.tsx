"use client";

import type { FC, PropsWithChildren } from "react";

import { ThemeProvider } from "@/components/ThemeProvider";
import { Toaster } from "@/components/ui/toaster";
import { Provider } from "jotai";

import {
	CategoryProvider,
	NotesProvider,
	AuthProvider,
	AppProvider,
} from "@/lib/context";

export const Providers: FC<PropsWithChildren> = ({ children }) => {
	return (
		<ThemeProvider
			attribute="class"
			defaultTheme="system"
			enableSystem
			disableTransitionOnChange
		>
			<Provider>
				<AuthProvider>
					<AppProvider>
						<CategoryProvider>
							<NotesProvider>
								{children}
								<Toaster />
							</NotesProvider>
						</CategoryProvider>
					</AppProvider>
				</AuthProvider>
			</Provider>
		</ThemeProvider>
	);
};

export default Providers;
