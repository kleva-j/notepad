// import { ContentItemMenu } from "@/tiptap/menus/content-item-menu";
// import { TextMenu } from "@/tiptap/menus/text-menu";
import { useBlockEditor } from "@/tiptap/hooks/use-block-editor";
import { LinkMenu } from "@/tiptap/menus/link-menu";
import { EditorHeader } from "./editor-header";
import { EditorContent } from "@tiptap/react";
import { Sidebar } from "../../sidebar";
import { TiptapProps } from "./types";
import { useRef } from "react";
import {
	TableColumnMenu,
	ImageBlockMenu,
	TableRowMenu,
	ColumnsMenu,
} from "@/tiptap/extensions";

import "@/styles/index.css";

export const BlockEditor = ({ ydoc, provider, content }: TiptapProps) => {
	const menuContainerRef = useRef(null);

	const { editor, users, characterCount, collabState, leftSidebar } =
		useBlockEditor({ ydoc, provider, content });

	const displayedUsers = users.slice(0, 3);

	if (!editor) return null;

	return (
		<div className="flex h-full rounded-md border" ref={menuContainerRef}>
			<Sidebar
				isOpen={leftSidebar.isOpen}
				onClose={leftSidebar.close}
				editor={editor}
			/>
			<div className="relative flex h-full flex-1 flex-col overflow-hidden">
				<EditorHeader
					characters={characterCount.characters()}
					collabState={collabState}
					users={displayedUsers}
					words={characterCount.words()}
					isSidebarOpen={leftSidebar.isOpen}
					toggleSidebar={leftSidebar.toggle}
				/>
				<EditorContent editor={editor} className="flex-1 overflow-y-auto" />
				{/*
				<TextMenu editor={editor} />
				<ContentItemMenu editor={editor} />
			*/}
				<LinkMenu editor={editor} appendTo={menuContainerRef} />
				<ColumnsMenu editor={editor} appendTo={menuContainerRef} />
				<TableRowMenu editor={editor} appendTo={menuContainerRef} />
				<TableColumnMenu editor={editor} appendTo={menuContainerRef} />
				<ImageBlockMenu editor={editor} appendTo={menuContainerRef} />
			</div>
		</div>
	);
};

export default BlockEditor;
