"use client";

import { ExpandableToolbar } from "@/editor/ExpandableToolbar";
import { EmptyEditor } from "@/components/editor/EmptyEditor";
import { ShowExpandableToolbarAtom } from "@/store/setting";
import { ResizablePanel } from "@/components/ui/resizable";
import { NoteEditor } from "@/editor/NoteEditor";
import { ActiveNoteIdAtom } from "@/store/note";
import { menuSubjectAtom } from "@/store";
import { MenuEnum } from "@/utils/enums";
import { useAtomValue } from "jotai";

export const EditorWrapper = () => {
	const activeMenu = useAtomValue(menuSubjectAtom);
	const activeNoteId = useAtomValue(ActiveNoteIdAtom);
	const showToolbar = useAtomValue(ShowExpandableToolbarAtom);

	const showEditor = activeMenu === MenuEnum.scratchpad || activeNoteId;

	return (
		<ResizablePanel
			defaultSize={75}
			className="relative bg-neutral-200 p-4 dark:bg-neutral-900"
		>
			{showEditor ? <NoteEditor /> : <EmptyEditor />}
			{showToolbar && <ExpandableToolbar />}
		</ResizablePanel>
	);
};
