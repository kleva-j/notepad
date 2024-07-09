import type { PropsWithChildren } from "react";

import { synthwave84 } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Prism } from "react-syntax-highlighter";

type Props = PropsWithChildren<{
	children: React.ReactNode;
	className: string;
	node: any;
}>;

export function Code(props: Props) {
	const { children, className, node, ...rest } = props;
	const match = /language-(\w+)/.exec(className || "");
	return match ? (
		<Prism
			PreTag="div"
			language={match[1]}
			style={synthwave84}
			useInlineStyles
			showLineNumbers
		>
			{String(children).replace(/\n$/, "")}
		</Prism>
	) : (
		<code {...rest} className={className}>
			{children}
		</code>
	);
}
