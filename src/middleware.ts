/* eslint-disable @typescript-eslint/no-empty-function */

// import { type NextRequest, NextResponse } from "next/server";

// import { withAuth } from "next-auth/middleware";
// import { NextResponse } from "next/server";
// import { getToken } from "next-auth/jwt";

// This function can be marked `async` if using `await` inside
// export default withAuth(
// 	async function middleware(req: NextRequest) {
// 		const token = await getToken({ req });
// 		const isAuth = !!token;

// 		const isAuthPage = req.nextUrl.pathname.startsWith("/auth/login");

// 		if (isAuthPage) {
// 			return isAuth
// 				? NextResponse.redirect(new URL("/dashboard", req.url))
// 				: null;
// 		}

// 		if (!isAuth) {
// 			let from = req.nextUrl.pathname;
// 			if (req.nextUrl.search) {
// 				from += req.nextUrl.search;
// 			}

// 			return NextResponse.redirect(
// 				new URL(`/auth/login?from=${encodeURIComponent(from)}`, req.url)
// 			);
// 		}
// 	},
// 	{
// 		callbacks: {
// 			async authorized() {
// 				// This is a work-around for handling redirect on auth pages.
// 				// We return true here so that the middleware function above
// 				// is always called.
// 				return true;
// 			},
// 		},
// 	}
// );

export default function () {}

// export { default } from "next-auth/middleware";

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
