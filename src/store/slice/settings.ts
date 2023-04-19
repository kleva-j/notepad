import { atomWithLocalStorage } from "..";
import { SettingsState } from "@/types";

const initialState: SettingsState = {
	isOpen: false,
	loading: false,
	darkTheme: false,
	sidebarVisible: false,
};

export const updateSettings = (
	state: SettingsState,
	{ isOpen, loading, darkTheme, sidebarVisible }: Partial<SettingsState>
): SettingsState => ({
	isOpen: isOpen || state.isOpen,
	loading: loading || state.loading,
	darkTheme: darkTheme || state.darkTheme,
	sidebarVisible: sidebarVisible || state.sidebarVisible,
});

export const SettingsStateAtom = atomWithLocalStorage("settings", initialState);
