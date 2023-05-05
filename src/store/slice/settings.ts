import { atomWithStorage } from "jotai/utils";
import { SettingsState } from "@/types";

const initialState: SettingsState = {
	isOpen: false,
	loading: false,
	darkTheme: false,
	sidebarVisible: false,
	previewMarkdown: false,
};

export const updateSettings = (
	state: SettingsState,
	{
		isOpen,
		loading,
		darkTheme,
		sidebarVisible,
		previewMarkdown,
	}: Partial<SettingsState>
): SettingsState => ({
	isOpen: isOpen || state.isOpen,
	loading: loading || state.loading,
	darkTheme: darkTheme || state.darkTheme,
	sidebarVisible: sidebarVisible || state.sidebarVisible,
	previewMarkdown: previewMarkdown || state.previewMarkdown,
});

export const SettingsStateAtom = atomWithStorage("settings", initialState);
