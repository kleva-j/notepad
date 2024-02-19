import { ContextMenuEnum, ContextType, ContextTypeEnum } from "@/utils/enums";
import { LabelText } from "@/utils/constants";
import { Folder } from "@/utils/enums";
import { NoteItem } from "@/types";

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

export const setActiveColor = (isActive: boolean) =>
	isActive ? "#5183f5" : "#ffffff40";

export const isDraftNote = (note: NoteItem) => {
	return !note.scratchpad && note.content === "";
};

export const getActiveNote = (notes: NoteItem[], activeNoteId: string) =>
	notes.find((note) => note.id === activeNoteId);

export const ContextMenuStyleMap: Record<ContextMenuEnum, string> = {
	[ContextMenuEnum.CATEGORY]: "bg-[#2d2d2d] text-[#c0c0c0] hover:bg-[#4d4d4d]",
	[ContextMenuEnum.NOTE]:
		"text-slate-500 hover:text-slate-800 hover:bg-[#f0f0f0]",
};

export const checkContextType = (id: string): { type: ContextType | null } => {
	const initial = id.split("-")[0];

	switch (initial) {
		case "c":
		case "droppable":
			return { type: ContextTypeEnum.category };
		case "n":
			return { type: ContextTypeEnum.note };

		default:
			return { type: null };
	}
};
