/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */

import { LabelText } from "./constants";
import { NoteItem } from "@/types";
import { Folder } from "./enums";
export const debounceEvent = <T extends Function>(cb: T, wait = 20) => {
	let h = 0;
	const callable = (...args: any) => {
		clearTimeout(h);
		h = window.setTimeout(() => cb(...args), wait);
	};

	return <T>(<any>callable);
};

export const copyToClipboard = (text: string) => {
	navigator.clipboard.writeText(text);
};

export const getNoteTitle = (text: string): string => {
	// Remove whitespace from both ends
	// Get the first n characters
	// Remove # from the title in the case of using markdown headers in your title
	const noteText = text.trim().match(/[^#]{1,45}/);

	// Get the first line of text after any newlines
	// In the future, this should break on a full word
	return (
		noteText ? noteText[0].trim().split(/\r?\n/)[0] : LabelText.NEW_NOTE
	) as string;
};

export const setStrokeColor = (folder: Folder, activeFolder: Folder) =>
	activeFolder === folder ? "#5183f5" : "#ffffff40";

export const isDraftNote = (note: NoteItem) => {
	return !note.scratchpad && note.text === "";
};

export const getActiveNote = (notes: NoteItem[], activeNoteId: string) =>
	notes.find((note) => note.id === activeNoteId);
