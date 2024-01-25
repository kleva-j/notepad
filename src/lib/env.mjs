import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
	server: {
		NODE_ENV: z
			.enum(["development", "test", "production"])
			.default("development"),
		DATABASE_URL: z.string().min(1),
		GITHUB_TOKEN: z.string().min(3),
		REPO_NAME: z.string().min(3),
		FILENAME: z.string().min(3),
		FILEPATH: z.string().min(3),
		AUTH_GITHUB_ID: z.string().min(10),
		AUTH_GITHUB_SECRET: z.string().min(10),
		AUTH_SECRET: z.string().min(3),
	},
	client: {},
	experimental__runtimeEnv: {},
});
