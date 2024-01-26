import "./src/lib/env.mjs";

/** @type {import("next").NextConfig} */
const config = {
	images: {
		domains: [
			"avatars.githubusercontent.com",
			"https://assets-global.website-files.com",
		],
	},
	experimental: {
		esmExternals: "loose",
	},
};
export default config;
