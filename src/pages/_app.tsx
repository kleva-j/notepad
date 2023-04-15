/* eslint-disable @typescript-eslint/ban-types */
import "@/styles/globals.css";

import React from "react";

import { SessionProvider } from "next-auth/react";
import { SeoHeader } from "@/component/SeoHeader";
import { api } from "@/utils/api";

import { type ReactElement, type ReactNode } from "react";
import { type AppProps, type AppType } from "next/app";
import { type Session } from "next-auth";
import { type NextPage } from "next";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
	getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
	Component: NextPageWithLayout;
};

const MyApp: AppType<AppPropsWithLayout & { session: Session | null }> = ({
	Component,
	pageProps: { session, ...pageProps },
}) => {
	return (
		<SessionProvider session={session}>
			<SeoHeader />
			<Component {...pageProps} />
		</SessionProvider>
	);
};

export default api.withTRPC(MyApp);
