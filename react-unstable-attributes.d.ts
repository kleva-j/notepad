// react-unstable-attributes.d.ts
// import "react";

// declare module "react" {
// 	interface IntrinsicElements {
// 		mention: React.DetailedHTMLProps<
// 			React.HTMLAttributes<HTMLElement>,
// 			HTMLElement
// 		>;
// 	}
// }

declare namespace JSX {
	interface IntrinsicElements {
		mention: React.DetailedHTMLProps<
			React.HTMLAttributes<HTMLElement>,
			HTMLElement
		>;
	}
}
