"use client";

import { EmptyEditor } from "@/components/editor/EmptyEditor";
import { ResizablePanel } from "@/components/ui/resizable";
import { ActiveNoteIdAtom } from "@/store/note";
import { useAtomValue } from "jotai";

import { NoteEditor } from "./NoteEditor";

export const EditorWrapper = () => {
	const activeNoteId = useAtomValue(ActiveNoteIdAtom);

	return (
		<ResizablePanel
			defaultSize={75}
			className="bg-neutral-200 dark:bg-neutral-900 p-4"
		>
			{activeNoteId ? <NoteEditor /> : <EmptyEditor />}
		</ResizablePanel>
	);
};
