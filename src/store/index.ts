/* eslint-disable @typescript-eslint/no-explicit-any */
import { atomWithStorage } from "jotai/utils";
import { atom } from "jotai";

export const darkModeAtom = atomWithStorage("darkMode", false);

export const categoriesAtom = atomWithStorage("categories", []);
export const settingsAtom = atomWithStorage("settings", []);
export const notesAtom = atomWithStorage("notes", []);

export const atomWithLocalStorage = (key: string, initialValue: any) => {
	const getInitialValue = () => {
		const item = localStorage.getItem(key);
		if (item !== null) {
			return JSON.parse(item);
		}
		return initialValue;
	};
	const baseAtom = atom(getInitialValue());
	const derivedAtom = atom(
		(get) => get(baseAtom),
		(get, set, update) => {
			const nextValue =
				typeof update === "function" ? update(get(baseAtom)) : update;
			set(baseAtom, nextValue);
			localStorage.setItem(key, JSON.stringify(nextValue));
		}
	);
	return derivedAtom;
};
