"use client";

import type { FC, PropsWithChildren } from "react";

import { CategoryProvider } from "@/lib/context/CategoryContext";
import { ThemeProvider } from "@/components/ThemeProvider";
import { NotesProvider } from "@/lib/context/NotesContext";
import { AuthProvider } from "@/lib/context/AuthContext";
import { AppProvider } from "@/lib/context/AppContext";
import { Provider } from "jotai";

const Providers: FC<PropsWithChildren> = ({ children }) => {
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
							<NotesProvider>{children}</NotesProvider>
						</CategoryProvider>
					</AppProvider>
				</AuthProvider>
			</Provider>
		</ThemeProvider>
	);
};

export default Providers;
