import { NoteItem, NoteState } from "@/types";
import { atomWithStorage } from "jotai/utils";
import { Folder } from "@/utils/enums";
import { atom } from "jotai";

export const addNote = (notes: NoteItem[], newNote: NoteItem): NoteItem[] => [
	...notes,
	newNote,
];

export const updateNote = (
	notes: NoteItem[],
	id: string,
	payload: Partial<NoteItem>,
): NoteItem[] =>
	notes.map((note) => (note.id === id ? { ...note, ...payload } : note));

export const deleteNote = (notes: NoteItem[], id: string): NoteItem[] =>
	notes.filter((note) => note.id !== id);

export const updateNoteState = (
	state: NoteState,
	payload: Partial<NoteState>,
): NoteState => {
	return {
		notes: payload.notes || state.notes,
		activeFolder: payload.activeFolder || state.activeFolder,
		activeNoteId:
			"activeNoteId" in payload
				? payload.activeNoteId || ""
				: state.activeNoteId,
		selectedNotesIds: payload.selectedNotesIds || state.selectedNotesIds,
		selectedNotes: payload.selectedNotes || state.selectedNotes,
		activeCategoryId:
			"activeCategoryId" in payload
				? payload.activeCategoryId || ""
				: state.activeCategoryId,
		error: payload.error || state.error,
		loading: payload.loading || state.loading,
		searchValue: payload.searchValue || state.searchValue,
	};
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

export const setActiveFolder = (
	folder: Folder,
	categoryId?: string,
): Partial<NoteState> => ({
	activeFolder: folder,
	activeCategoryId: categoryId || "",
});

export const pruneNotes = (
	notes: NoteItem[],
	selectedNotesIds: string[],
): NoteItem[] =>
	notes.filter(
		(note) =>
			note.scratchpad ||
			note.content !== "" ||
			selectedNotesIds.includes(note.id),
	);

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

export const NoteStateAtom = atomWithStorage<NoteState>(
	"noteState",
	initialNoteState,
);

export const updateNotes = atom(
	() => initialNoteState,
	(get, set, payload: Partial<NoteState>) => {
		set(NoteStateAtom, updateNoteState(get(NoteStateAtom), payload));
	},
);
