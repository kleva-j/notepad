import "@mdxeditor/editor/style.css";

import type { MDXEditorMethods, MDXEditorProps } from "@mdxeditor/editor";
import type { FC } from "react";

import {
	AdmonitionDirectiveDescriptor,
	markdownShortcutPlugin,
	thematicBreakPlugin,
	KitchenSinkToolbar,
	frontmatterPlugin,
	diffSourcePlugin,
	codeMirrorPlugin,
	linkDialogPlugin,
	directivesPlugin,
	codeBlockPlugin,
	headingsPlugin,
	toolbarPlugin,
	listsPlugin,
	quotePlugin,
	tablePlugin,
	imagePlugin,
	linkPlugin,
	MDXEditor,
} from "@mdxeditor/editor";

interface EditorProps extends MDXEditorProps {
	editorRef?: React.MutableRefObject<MDXEditorMethods | null>;
}

export const NoteEditor: FC<EditorProps> = (props) => {
	const { editorRef, markdown, ...rest } = props;

	return (
		<MDXEditor
			plugins={[
				markdownShortcutPlugin(),
				thematicBreakPlugin(),
				headingsPlugin(),
				frontmatterPlugin(),
				linkDialogPlugin(),
				codeMirrorPlugin({
					codeBlockLanguages: {
						js: "JavaScript",
						css: "CSS",
						txt: "Plain Text",
						tsx: "TypeScript",
						"": "Unspecified",
					},
				}),
				codeBlockPlugin({ defaultCodeBlockLanguage: "js" }),
				diffSourcePlugin({ viewMode: "source", diffMarkdown: "Boo" }),
				listsPlugin(),
				quotePlugin(),
				imagePlugin({
					imageAutocompleteSuggestions: [
						"https://via.placeholder.com/150",
						"https://via.placeholder.com/150",
					],
					imageUploadHandler: async () =>
						Promise.resolve("https://picsum.photos/200/300"),
				}),
				tablePlugin(),
				linkPlugin(),
				toolbarPlugin({ toolbarContents: () => <KitchenSinkToolbar /> }),
				directivesPlugin({
					directiveDescriptors: [AdmonitionDirectiveDescriptor],
				}),
			]}
			markdown={markdown}
			ref={editorRef}
			className="dark:text-white"
			autoFocus={{ defaultSelection: "rootEnd" }}
			{...rest}
		/>
	);
};
