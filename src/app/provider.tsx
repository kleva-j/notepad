"use client";

import React, { FC, PropsWithChildren } from "react";

import { Provider as StoreProvider } from "jotai";
import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth";

type ProviderType = PropsWithChildren & { session: Session };

const Providers: FC<ProviderType> = ({ children, session }) => {
	console.log(session);
	return (
		<StoreProvider>
			<SessionProvider session={session}>{children}</SessionProvider>
		</StoreProvider>
	);
};

export default Providers;
