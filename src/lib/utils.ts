import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

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
