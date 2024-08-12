"use client";

import { EmptyEditor } from "@/components/editor/EmptyEditor";
import { ResizablePanel } from "@/components/ui/resizable";
import { ActiveNoteIdAtom } from "@/store/note";
import { menuSubjectAtom } from "@/store";
import { NoteEditor } from "./NoteEditor";
import { MenuEnum } from "@/utils/enums";
import { useAtomValue } from "jotai";

export const EditorWrapper = () => {
	const activeMenu = useAtomValue(menuSubjectAtom);
	const activeNoteId = useAtomValue(ActiveNoteIdAtom);

	const showEditor = activeMenu === MenuEnum.scratchpad || activeNoteId;

	return (
		<ResizablePanel
			defaultSize={75}
			className="bg-neutral-200 p-4 dark:bg-neutral-900"
		>
			{showEditor ? <NoteEditor /> : <EmptyEditor />}
		</ResizablePanel>
	);
};
