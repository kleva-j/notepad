/* eslint-disable @typescript-eslint/no-empty-function */
import { NoteItem, NoteState } from "@/types";
import { Folder } from "@/utils/enums";
import { v4 as uuid } from "uuid";
import { atom } from "jotai";
import { UUID } from "crypto";

export const addNote = (notes: NoteItem[], text: string): NoteItem[] => [
	...notes,
	{
		id: `n-${uuid()}`,
		text,
		categoryId: "",
		trash: false,
		created: new Date().toDateString(),
		lastUpdated: new Date().toDateString(),
	},
];

export const updateNote = (
	notes: NoteItem[],
	id: string,
	payload: Partial<NoteItem>
): NoteItem[] =>
	notes.map((note) => (note.id === id ? { ...note, ...payload } : note));

export const deleteNote = (notes: NoteItem[], id: string): NoteItem[] =>
	notes.filter((note) => note.id !== id);

// Jotai implementation
export const NoteAtom = atom<string>("");
export const NotesAtom = atom<NoteItem[]>([]);
export const addNoteAtom = atom(
	() => "",
	(get, set) => {
		set(NotesAtom, addNote(get(NotesAtom), get(NoteAtom)));
		set(NoteAtom, "");
	}
);

export const updateNoteAtom = atom(
	() => "",
	(get, set, { id, ...payload }: { id: string } & Partial<NoteItem>) => {
		set(NotesAtom, updateNote(get(NotesAtom), id, { ...payload }));
	}
);

export const deleteNoteAtom = atom(
	() => "",
	(get, set, id: UUID) => {
		set(NotesAtom, deleteNote(get(NotesAtom), id));
	}
);

// NoteState
export const initialNoteState: NoteState = {
	notes: [],
	activeFolder: Folder.ALL,
	activeNoteId: "",
	selectedNotesIds: [],
	activeCategoryId: "",
	error: "",
	loading: false,
	searchValue: "",
};

const updateNoteState = (state: NoteState, payload: Partial<NoteState>) => ({
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
	categoryId?: string
): string => {
	const firstNote = {
		[Folder.ALL]: () => notes[0],
		[Folder.TRASH]: () => notes.find((note) => note.trash),
		[Folder.CATEGORY]: () =>
			notes.find((note) => note.categoryId === categoryId),
	}[folder]();

	return firstNote ? firstNote.id : "";
};

export const updateSelectedNotesIds = (
	notes: NoteItem[],
	activeFolder: Folder,
	activeCategoryId?: string
): string[] => [getNoteIds(notes, activeFolder, activeCategoryId)];

export const updateActiveNoteIds = (
	notes: NoteItem[],
	activeFolder: Folder,
	activeCategoryId?: string
): string => getNoteIds(notes, activeFolder, activeCategoryId);

export const NoteStateAtom = atom<NoteState>(initialNoteState);

export const updateNotes = atom(
	() => initialNoteState,
	(get, set, payload: Partial<NoteState>) => {
		set(NoteStateAtom, updateNoteState(get(NoteStateAtom), payload));
	}
);
