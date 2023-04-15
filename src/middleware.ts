import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
	if (request.nextUrl.pathname.startsWith("/dashboard")) {
		return NextResponse.rewrite(new URL("/dashboard/user", request.url));
	}
}

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
