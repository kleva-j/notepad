import { atomWithStorage } from "jotai/utils";
import { SettingsState } from "@/types";
import { DirectionText } from "@/utils/enums";

const initialState: SettingsState = {
	isOpen: false,
	loading: false,
	darkTheme: false,
	sidebarVisible: false,
	previewMarkdown: false,
	codeMirrorOptions: {
		mode: "gfm",
		theme: "base16-light",
		lineNumbers: false,
		lineWrapping: true,
		styleActiveLine: { nonEmpty: true },
		viewportMargin: Infinity,
		keyMap: "default",
		dragDrop: false,
		direction: DirectionText.LEFT_TO_RIGHT,
		scrollPastEnd: false,
	},
};

export const updateSettings = (
	state: SettingsState,
	{
		isOpen,
		loading,
		darkTheme,
		sidebarVisible,
		previewMarkdown,
		codeMirrorOptions,
	}: Partial<SettingsState>
): SettingsState => ({
	isOpen: isOpen || state.isOpen,
	loading: loading || state.loading,
	darkTheme: darkTheme || state.darkTheme,
	sidebarVisible: sidebarVisible || state.sidebarVisible,
	previewMarkdown: previewMarkdown || state.previewMarkdown,
	codeMirrorOptions: codeMirrorOptions || state.codeMirrorOptions,
});

export const SettingsStateAtom = atomWithStorage("settings", initialState);
