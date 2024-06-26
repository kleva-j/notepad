import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { z } from "zod";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function getBaseUrl() {
	return typeof window !== "undefined" && window.location
		? ""
		: process.env.NODE_ENV === "development"
			? "https://localhost:3000"
			: process.env.VERCEL_URL;
}

export const formSchema = z.object({
	title: z
		.string()
		.min(2, { message: "Title must be at least 2 characters." })
		.max(40, { message: "Title must not exceed 40 characters." }),
});
