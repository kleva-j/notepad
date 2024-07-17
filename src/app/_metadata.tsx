import type { Metadata } from "next";

export const metadata: Metadata = {
	metadataBase: new URL("https://notepad-nu.vercel.app"),
	title: "Notepad block editor",
	description:
		"Notepad is a suite of open source content editing and real-time collaboration tools for developers building apps like Notion or Google Docs.",
	robots: "noindex, nofollow",
	icons: [{ url: "/favicon.svg" }],
	twitter: {
		card: "summary_large_image",
		site: "@notepad_editor",
		creator: "@notepad_editor",
	},
	openGraph: {
		title: "Notepad block editor",
		description:
			"Notepad is a suite of open source content editing and real-time collaboration tools for developers building apps like Notion or Google Docs.",
	},
};
