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
