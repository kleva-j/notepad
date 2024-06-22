import { NoteItem, NoteState } from "@/types";
import { atomWithStorage } from "jotai/utils";
import { Folder } from "@/utils/enums";
import { atom } from "jotai";

const initialNoteState = {
	notes: [],
	activeFolder: Folder.ALL,
	selectedNotesIds: [],
	selectedNotes: [],
	activeNoteId: "",
	filteredNotes: [],
	activeCategoryId: "",
	error: "",
	loading: false,
	searchValue: "",
};

export function filterNotesByFolder(
	notes: NoteItem[],
	folder: Folder,
	categoryId?: string,
): NoteItem[] {
	return notes.filter(
		{
			[Folder.ALL]: (note: NoteItem) => !note.trash && !note.scratchpad,
			[Folder.TRASH]: (note: NoteItem) => note.trash,
			[Folder.CATEGORY]: (note: NoteItem) => note.categoryId === categoryId,
			[Folder.FAVORITES]: (note: NoteItem) => !note.trash && note.favorite,
			[Folder.SCRATCHPAD]: (note: NoteItem) => !note.trash && note.scratchpad,
		}[folder],
	);
}

export const NoteStateAtom = atomWithStorage<NoteState>(
	"noteState",
	initialNoteState,
);
