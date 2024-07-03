import type { NoteState } from "@/types";

import { atomWithStorage } from "jotai/utils";
import { focusAtom } from "jotai-optics";
import { Folder } from "@/utils/enums";

export const noteStateAtom = atomWithStorage<NoteState>("noteState", {
	notes: [],
	activeFolder: Folder.ALL,
	selectedNotes: [],
	activeNoteId: null,
});

export const NotesAtom = focusAtom(noteStateAtom, (optics) =>
	optics.prop("notes"),
);
export const SelectedNotesAtom = focusAtom(noteStateAtom, (optics) =>
	optics.prop("selectedNotes"),
);
export const ActiveNoteIdAtom = focusAtom(noteStateAtom, (optics) =>
	optics.prop("activeNoteId"),
);
