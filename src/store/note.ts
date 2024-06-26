import type { NoteItem, NoteState } from "@/types";

import { atomWithStorage } from "jotai/utils";
import { focusAtom } from "jotai-optics";
import { Folder } from "@/utils/enums";

export const noteStateAtom = atomWithStorage<NoteState>("noteState", {
	notes: [],
	activeFolder: Folder.ALL,
	selectedNotes: [],
	activeNoteId: "",
});

export const NotesAtom = focusAtom(noteStateAtom, (optics) =>
	optics.prop("notes"),
);
export const SelectedNotesAtom = focusAtom(noteStateAtom, (optics) =>
	optics.prop("selectedNotes"),
);

export function filterNotesByFolder(
	notes: NoteItem[],
	folder: Folder,
	categoryId?: string,
): NoteItem[] {
	return notes.filter(
		{
			[Folder.ALL]: (note: NoteItem) => !note.trash,
			[Folder.TRASH]: (note: NoteItem) => note.trash,
			[Folder.CATEGORY]: (note: NoteItem) => note.categoryId === categoryId,
			[Folder.FAVORITES]: (note: NoteItem) => !note.trash && note.favorite,
		}[folder],
	);
}
