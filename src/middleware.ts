/* eslint-disable import/no-anonymous-default-export */
export default function () {}

// Stop Middleware running on static files
export const config = {
	matcher: [
		/*
		 * Match request paths except for the ones starting with:
		 * - _next
		 * - static (static files)
		 * - favicon.ico (favicon file)
		 *
		 * This includes images, and requests from TRPC.
		 */
		"/(.*?trpc.*?|(?!static|.*\\..*|_next|favicon.ico).*)",
	],
};
