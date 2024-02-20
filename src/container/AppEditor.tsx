import type { MDXEditorMethods } from "@mdxeditor/editor";
import type { NoteItem } from "@/types";
import type { FC } from "react";

import { EditorMenubar } from "@/components/editor";
import { useDebounceCallback } from "usehooks-ts";
import { Suspense, useRef } from "react";

import Loading from "@/app/loading";
import dynamic from "next/dynamic";

type AppEditorProps = {
	note: NoteItem;
	updateNote: (text: string) => void;
};

const NoteEditor = dynamic(
	() => import("../components/editor/NoteEditor").then((m) => m.NoteEditor),
	{ loading: Loading },
);

export const AppEditor: FC<AppEditorProps> = ({ note, updateNote }) => {
	const editorRef = useRef<MDXEditorMethods | null>(null);
	const noteRef = useRef<string>(note.content);

	const updateNoteRef = (text: string) => (noteRef.current = text);

	const debounced = useDebounceCallback(updateNoteRef, 500);

	return (
		<section className="relative h-full w-full min-w-[300px]">
			<EditorMenubar activeNote={note} />
			<Suspense fallback={null}>
				<NoteEditor
					editorRef={editorRef}
					markdown={note.content}
					onChange={debounced}
				/>
			</Suspense>
		</section>
	);
};
