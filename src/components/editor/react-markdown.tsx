import rehypeSanitize, { defaultSchema } from "rehype-sanitize";

import { Code, Mention } from ".";

import rehypeStringify from 'rehype-stringify'
import remarkRehype from "remark-rehype";
import remarkParse from "remark-parse";
import rehypeReact from "rehype-react";
import Markdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import remarkMdx from "remark-mdx";

export const ReactMarkdown = (props: { textValue: string }) => {
	return (
		<Markdown
			remarkPlugins={[remarkParse, remarkRehype, remarkGfm, remarkMdx]}
			rehypePlugins={[
				rehypeRaw,
				rehypeReact,
				rehypeStringify,
				[
					rehypeSanitize,
					{
						...defaultSchema,
						tagNames: [...defaultSchema.tagNames!, "mention"],
						attributes: { ...defaultSchema.attributes, mention: ["handle"] },
					},
				],
			]}
			components={{
				code: (props: any) => <Code {...props} />,
				mention: (props: any) => <Mention {...props} />,
			}}
		>
			{props.textValue}
		</Markdown>
	);
};
