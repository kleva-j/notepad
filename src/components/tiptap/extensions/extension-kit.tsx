"use client";

import { CodeBlockLowlight } from "@tiptap/extension-code-block-lowlight";
import { HocuspocusProvider } from "@hocuspocus/provider";
import { all, createLowlight } from "lowlight";
import { API } from "@/tiptap/lib/api";

import {
	TableOfContentsNode,
	BlockquoteFigure,
	emojiSuggestion,
	TableOfContents,
	CharacterCount,
	HorizontalRule,
	TrailingNode,
	SlashCommand,
	FileHandler,
	Placeholder,
	ImageUpload,
	Superscript,
	TableHeader,
	Dropcursor,
	Typography,
	FontFamily,
	StarterKit,
	ImageBlock,
	Figcaption,
	Subscript,
	TableCell,
	Highlight,
	Underline,
	Selection,
	TextAlign,
	TextStyle,
	Document,
	TaskItem,
	FontSize,
	TableRow,
	TaskList,
	Heading,
	Columns,
	Column,
	Table,
	Focus,
	Emoji,
	Color,
	Link,
} from ".";

const lowlight = createLowlight(all);

interface ExtensionKitProps {
	provider?: HocuspocusProvider | null;
	userId?: string;
	userName?: string;
	userColor?: string;
}

export const ExtensionKit = ({ provider }: ExtensionKitProps) => [
	Document,
	CharacterCount.configure({ limit: 50000 }),
	Heading.configure({ levels: [1, 2, 3, 4, 5, 6] }),
	StarterKit.configure({
		document: false,
		dropcursor: false,
		heading: false,
		horizontalRule: false,
		blockquote: false,
		// history: false, // TODO: add history
		codeBlock: false,
	}),
	HorizontalRule,
	Columns,
	TaskList,
	TaskItem.configure({ nested: true }),
	Column,
	Selection,
	CodeBlockLowlight.configure({ lowlight, defaultLanguage: null }),
	TextStyle,
	FontSize,
	FontFamily,
	Color,
	TrailingNode,
	Link.configure({ openOnClick: false }),
	Highlight.configure({ multicolor: true }),
	Underline,
	TableOfContents,
	TableOfContentsNode,
	ImageUpload.configure({ clientId: provider?.document?.clientID }),
	ImageBlock,
	FileHandler.configure({
		allowedMimeTypes: ["image/png", "image/jpeg", "image/gif", "image/webp"],
		onDrop: (currentEditor, files, pos) => {
			files.forEach(async () => {
				const url = await API.uploadImage();
				currentEditor.chain().setImageBlockAt({ pos, src: url }).focus().run();
			});
		},
		onPaste: (currentEditor, files) => {
			files.forEach(async () => {
				const src = await API.uploadImage();
				return currentEditor
					.chain()
					.setImageBlockAt({ pos: currentEditor.state.selection.anchor, src })
					.focus()
					.run();
			});
		},
	}),
	Emoji.configure({ enableEmoticons: true, suggestion: emojiSuggestion }),
	TextAlign.extend({
		addKeyboardShortcuts() {
			return {};
		},
	}).configure({ types: ["heading", "paragraph"] }),
	Subscript,
	Superscript,
	Table,
	TableCell,
	TableHeader,
	TableRow,
	Typography,
	Placeholder.configure({
		includeChildren: true,
		showOnlyCurrent: false,
		placeholder: () => "",
	}),
	SlashCommand,
	Focus,
	Figcaption,
	BlockquoteFigure,
	Dropcursor.configure({
		width: 2,
		class: "ProseMirror-dropcursor border-black",
	}),
];

export default ExtensionKit;
