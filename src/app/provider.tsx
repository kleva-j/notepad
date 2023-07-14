"use client";

import React, { FC, PropsWithChildren } from "react";

import { CategoryProvider } from "@/lib/context/CategoryContext";
import { NotesProvider } from "@/lib/context/NotesContext";
import { AuthProvider } from "@/lib/context/AuthContext";
import { AppProvider } from "@/lib/context/AppContext";
import { Provider as StoreProvider } from "jotai";
import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth";

type ProviderType = PropsWithChildren & { session: Session };

const Providers: FC<ProviderType> = ({ children, session }) => {
	return (
		<StoreProvider>
			<AuthProvider>
				<AppProvider>
					<CategoryProvider>
						<NotesProvider>
							<SessionProvider session={session}>{children}</SessionProvider>
						</NotesProvider>
					</CategoryProvider>
				</AppProvider>
			</AuthProvider>
		</StoreProvider>
	);
};

export default Providers;
