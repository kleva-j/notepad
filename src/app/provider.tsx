"use client";

import React, { FC, PropsWithChildren } from "react";

import { CategoryProvider } from "@/lib/context/CategoryContext";
import { NotesProvider } from "@/lib/context/NotesContext";
import { AuthProvider } from "@/lib/context/AuthContext";
import { AppProvider } from "@/lib/context/AppContext";
import { Provider as StoreProvider } from "jotai";

type ProviderType = PropsWithChildren;

const Providers: FC<ProviderType> = ({ children }) => {
	return (
		<StoreProvider>
			<AuthProvider>
				<AppProvider>
					<CategoryProvider>
						<NotesProvider>{children}</NotesProvider>
					</CategoryProvider>
				</AppProvider>
			</AuthProvider>
		</StoreProvider>
	);
};

export default Providers;
