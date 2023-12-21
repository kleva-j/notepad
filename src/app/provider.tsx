"use client";

import type { FC, PropsWithChildren } from "react";

import { CategoryProvider } from "@/lib/context/CategoryContext";
import { NotesProvider } from "@/lib/context/NotesContext";
import { AuthProvider } from "@/lib/context/AuthContext";
import { AppProvider } from "@/lib/context/AppContext";
import { TrpcProvider } from "@/app/_trpc/Provider";
import { Provider as StoreProvider } from "jotai";

const Providers: FC<PropsWithChildren> = ({ children }) => {
	return (
		<TrpcProvider>
			<StoreProvider>
				<AuthProvider>
					<AppProvider>
						<CategoryProvider>
							<NotesProvider>{children}</NotesProvider>
						</CategoryProvider>
					</AppProvider>
				</AuthProvider>
			</StoreProvider>
		</TrpcProvider>
	);
};

export default Providers;
