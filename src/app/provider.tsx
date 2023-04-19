"use client";

import React, { FC, PropsWithChildren } from "react";

import { Provider as StoreProvider } from "jotai";
import { SessionProvider } from "next-auth/react";

const Providers: FC<PropsWithChildren> = ({ children }) => {
	return (
		<StoreProvider>
			<SessionProvider>{children}</SessionProvider>
		</StoreProvider>
	);
};

export default Providers;
