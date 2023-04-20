import React from "react";
import Head from "next/head";

const metas = {
	title: "Notepad",
	description: "This is a Note taking app.",
	image: "",
};

export const SeoHeader = () => (
	<Head>
		<title>{metas.title}</title>

		<link
			rel="preconnect"
			href="https://fonts.gstatic.com"
			crossOrigin="anonymous"
		/>
		<link
			href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300&display=swap"
			rel="stylesheet"
		/>

		<link
			href="https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700&display=swap"
			rel="stylesheet"
		></link>

		<meta property="og:title" content={metas.title} key="og:title" />
		<meta property="og:image" content={metas.image} key="og:image" />
		<meta
			property="description"
			content={metas.description}
			key="description"
		/>
		<meta
			property="og:description"
			content={metas.description}
			key="og:description"
		/>
		<meta property="og:type" content="website" />
		<meta property="twitter:card" content="summary_large_image" />
		<meta property="twitter:title" content={metas.title} key="twitter:title" />
		<meta
			property="twitter:description"
			content={metas.description}
			key="twitter:description"
		/>
		<meta property="twitter:image" content={metas.image} key="twitter:image" />
		<meta
			name="theme-color"
			content="#000"
			media="(prefers-color-scheme: dark)"
		/>
		<meta
			name="theme-color"
			content="#fff"
			media="(prefers-color-scheme: light)"
		/>
	</Head>
);
