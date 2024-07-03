import type { Themes, Menus } from "@/types";

import { atomWithStorage, selectAtom } from "jotai/utils";
import { ThemeEnum, EditorMode } from "@/utils/enums";
import { focusAtom } from "jotai-optics";

const activeMenu = "" as Menus;
const theme: Themes = ThemeEnum.dark;
const settings = { viewMode: EditorMode.edit, theme };
const initialAppState = { settings, activeMenu };

type AppState = typeof initialAppState;

const settingsSelector = (state: AppState) => state.settings;

export const appState = atomWithStorage<AppState>("appState", initialAppState);

export const SettingsAtom = selectAtom(appState, settingsSelector);

export const activeMenuAtom = focusAtom(appState, (optics) =>
	optics.prop("activeMenu"),
);
