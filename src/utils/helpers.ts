import type { CategoryItem, Menus, NoteItem } from "@/types";

import { Folder, MenuEnum } from "@/utils/enums";
import { LabelText } from "@/utils/constants";
import { faker } from "@faker-js/faker";

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

export const getActiveNote = (notes: NoteItem[], activeNoteId: string) =>
	notes.find((note) => note.id === activeNoteId);

/**
 * Generates an ID with the specified prefix.
 *
 * @param {string} prefix - The prefix for the generated ID.
 * @return {string} The generated ID.
 */
export function generateId(prefix = "n") {
	return `${prefix}-${faker.string.nanoid(10)}`;
}

/**
 * Generates fake notes with specified length.
 *
 * @param {number} length - The number of fake notes to generate.
 * @return {NoteItem[]} An array of fake NoteItem objects.
 */
export function generateFakeNotes(length: number = 1): NoteItem[] {
	return Array.from({ length }, (_, i) => i).map(() => ({
		id: generateId(),
		title: faker.lorem.sentence({ min: 1, max: 5 }),
		content: faker.lorem.paragraph({ min: 1, max: 3 }),
		categoryId: generateId("c"),
		trash: faker.datatype.boolean(),
		created: faker.date.recent({ days: 10 }).toISOString(),
		lastUpdated: faker.date.recent({ days: 3 }).toISOString(),
		favorite: faker.datatype.boolean(),
		checked: false,
	}));
}

/**
 * Generates fake categories with specified length.
 *
 * @param {number} length - The number of fake categories to generate.
 * @return {CategoryItem[]} An array of fake CategoryItem objects.
 */
export function generateFakeCategories(length: number = 1): CategoryItem[] {
	return Array.from({ length }, (_, i) => i).map((i) => ({
		id: generateId("c"),
		text: faker.word.noun({ length: { min: 2, max: 15 }, strategy: "longest" }),
		checked: false,
	}));
}

export const mapMenuToFolder = (menu: Menus): Folder =>
	({
		[MenuEnum.notes]: Folder.ALL,
		[MenuEnum.favorites]: Folder.FAVORITES,
		[MenuEnum.trash]: Folder.TRASH,
		[MenuEnum.categories]: Folder.CATEGORY,
	})[menu] || Folder.ALL;

export function filterNotesByFolder(
	notes: NoteItem[],
	folder: Folder,
	categoryId?: string,
	filterObj?: {},
): NoteItem[] {
	return notes.filter(
		{
			[Folder.ALL]: (note: NoteItem) => !note.trash,
			[Folder.TRASH]: (note: NoteItem) => note.trash,
			[Folder.CATEGORY]: (note: NoteItem) => note.categoryId === categoryId,
			[Folder.FAVORITES]: (note: NoteItem) => !note.trash && note.favorite,
			...filterObj,
		}[folder],
	);
}
