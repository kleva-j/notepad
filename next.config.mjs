/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation.
 * This is especially useful for Docker builds.
 */
!process.env.SKIP_ENV_VALIDATION && (await import("./src/env.mjs"));

/** @type {import("next").NextConfig} */
const config = {
	images: {
		domains: [
			"avatars.githubusercontent.com",
			"https://assets-global.website-files.com",
		],
	},
};
export default config;

// site:greenhouse.io | site:lever.co | site:workable.com | site:himalayas.app | site:arch.dev | site:weworkremotely.com | site:ycombinator.com/jobs frontend developer
