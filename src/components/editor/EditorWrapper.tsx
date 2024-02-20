/* eslint-disable react-hooks/exhaustive-deps */
import { EmptyEditor } from "@/components/editor/EmptyEditor";
import { ResizablePanel } from "@/components/ui/resizable";
import { AppEditor } from "@/container/AppEditor";
import { UseNotesContext } from "@/lib/context";
import { getActiveNote } from "@/utils/helpers";
import { NotesActions } from "@/lib/constants";
import { useCallback } from "react";

import Loading from "@/app/loading";

export const EditorWrapper = () => {
	const { state: noteState, dispatch } = UseNotesContext();

	const { notes, activeNoteId, loading } = noteState;

	const activeNote = getActiveNote(notes, activeNoteId);

	const updateNote = useCallback((text: string) => {
		dispatch({ type: NotesActions.UPDATE_NOTES, payload: { text } });
	}, []);

	return (
		<ResizablePanel
			defaultSize={75}
			className="bg-neutral-200 dark:bg-neutral-800"
		>
			{loading ? (
				<Loading />
			) : activeNote?.id ? (
				<AppEditor note={activeNote} updateNote={updateNote} />
			) : (
				<EmptyEditor />
			)}
		</ResizablePanel>
	);
};
