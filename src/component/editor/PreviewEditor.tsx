import rehypeSanitizer from "rehype-sanitize";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import React from "react";

import { NoteItem } from "@/types";

interface PreviewEditorProps {
	noteText: string;
	directionText?: string;
	notes?: NoteItem[];
}

export const PreviewEditor = (props: PreviewEditorProps) => {
	return (
		<ReactMarkdown
			rehypePlugins={[rehypeSanitizer]}
			remarkPlugins={[remarkGfm]}
			linkTarget="_blank"
			className="previewer h-full"
		>
			{props.noteText}
		</ReactMarkdown>
	);
};
