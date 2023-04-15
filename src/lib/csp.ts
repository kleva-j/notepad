import { getCSP, SELF, UNSAFE_INLINE, DATA, UNSAFE_EVAL } from "csp-header";

const sitePreset = {
	"default-src": [SELF],
	"script-src":
		process.env.NODE_ENV === "development"
			? [UNSAFE_EVAL, UNSAFE_INLINE, SELF]
			: [SELF],
	"connect-src": [SELF, "https://vitals.vercel-insights.com"],
	"style-src": [UNSAFE_INLINE, SELF, "fonts.googleapis.com"],
	"font-src": [SELF, "fonts.gstatic.com"],
	"object-src": [SELF],
	"img-src": ["*", DATA],
	"frame-ancestors": [SELF],
	"child-src": [SELF],
	"frame-src": [SELF],
	"base-uri": [SELF],
	"form-action": [SELF],
};

export const securityHeaders = {
	"X-DNS-Prefetch-Control": "on",
	"Strict-Transport-Security": "max-age=63072000; includeSubDomains; preload",
	"X-Frame-Options": "DENY",
	"X-XSS-Protection": "1; mode=block",
	"X-Content-Type-Options": "nosniff",
};

export const csp = getCSP({
	presets: [sitePreset],
});
