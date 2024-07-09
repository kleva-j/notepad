"use client";

// @ts-ignore
import { jsx, jsxs } from "react/jsx-runtime";

import rehypeSanitize, { defaultSchema } from "rehype-sanitize";

import { Fragment, createElement, useEffect, useState } from "react";
import { Mention, Code } from ".";
import { unified } from "unified";

import remarkRehype from "remark-rehype";
import remarkParse from "remark-parse";
import rehypeReact from "rehype-react";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import remarkMdx from "remark-mdx";

export function useProcessor(md: string) {
	const [content, setContent] = useState(createElement(Fragment));
	const mentionRegex = /@(\w+)/g;
	const text = md.replace(mentionRegex, '<mention handle="$1">@$1</mention>');

	useEffect(() => {
		(async function () {
			const file = await unified()
				.use(remarkParse)
				.use(remarkRehype, { allowDangerousHtml: true })
				.use(() => (tree) => console.log(JSON.stringify(tree, null, 2)))
				.use(remarkGfm)
				.use(remarkMdx)
				.use(rehypeRaw)
				.use(rehypeSanitize, {
					...defaultSchema,
					tagNames: [...defaultSchema.tagNames!, "mention"],
					attributes: { ...defaultSchema.attributes, mention: ["handle"] },
				})
				// @ts-expect-error because mention is not valid html-tag
				.use(rehypeReact, {
					createElement,
					components: { mention: Mention, code: Code },
					Fragment,
					jsx,
					jsxs,
				})
				.process(text);

			setContent(file.result);
		})();
	}, [text]);

	return content;
}
