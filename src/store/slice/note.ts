import { NoteItem, NoteState } from "@/types";
import { atomWithStorage } from "jotai/utils";
import { noteList } from "@/utils/constants";
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

// NoteState
export const initialNoteState: NoteState = {
	notes: noteList,
	activeFolder: Folder.ALL,
	activeNoteId: "",
	selectedNotesIds: [],
	activeCategoryId: "",
	error: "",
	loading: false,
	searchValue: "",
};

export const updateNoteState = (
	state: NoteState,
	payload: Partial<NoteState>,
): NoteState => ({
	notes: payload.notes || state.notes,
	activeFolder: payload.activeFolder || state.activeFolder,
	activeNoteId: payload.activeNoteId || state.activeNoteId,
	selectedNotesIds: payload.selectedNotesIds || state.selectedNotesIds,
	activeCategoryId: payload.activeCategoryId || state.activeCategoryId,
	error: payload.error || state.error,
	loading: payload.loading || state.loading,
	searchValue: payload.searchValue || state.searchValue,
});

export const getNoteIds = (
	notes: NoteItem[],
	folder: Folder,
	categoryId?: string,
): string => {
	const firstNote = {
		[Folder.ALL]: () => notes.find((note) => !note.scratchpad),
		[Folder.TRASH]: () => notes.find((note) => note.trash),
		[Folder.CATEGORY]: () =>
			notes.find((note) => note.categoryId === categoryId),
		[Folder.FAVORITES]: () => notes.find((note) => note.favorite),
		[Folder.SCRATCHPAD]: () => notes.find((note) => note.scratchpad),
	}[folder]();

	return firstNote ? firstNote.id : "";
};

export const updateSelectedNotesIds = (
	notes: NoteItem[],
	activeFolder: Folder,
	activeCategoryId?: string,
): string[] => [getNoteIds(notes, activeFolder, activeCategoryId)];

export const updateActiveNoteIds = (
	notes: NoteItem[],
	activeFolder: Folder,
	activeCategoryId?: string,
): string => getNoteIds(notes, activeFolder, activeCategoryId);

export const updateActiveAndSelectedNotes = (
	notes: NoteItem[],
	activeFolder: Folder,
	activeCategoryId?: string,
) => {
	const noteIds = getNoteIds(notes, activeFolder, activeCategoryId);
	return {
		activeNoteId: noteIds,
		selectedNoteIds: [noteIds],
	};
};

export const updateActiveCategoryId = (
	notes: NoteItem[],
	categoryId: string,
) => {
	return {
		activeCategoryId: categoryId,
		activeFolder: Folder.CATEGORY,
		activeNoteId: getNoteIds(notes, Folder.CATEGORY, categoryId),
		selectedNotesIds: [getNoteIds(notes, Folder.CATEGORY, categoryId)],
		notes: notes.filter((note) => note.text !== ""),
	};
};

export const pruneNotes = (
	notes: NoteItem[],
	selectedNotesIds: string[],
): NoteItem[] =>
	notes.filter(
		(note) =>
			note.scratchpad || note.text !== "" || selectedNotesIds.includes(note.id),
	);

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
