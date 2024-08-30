import type { SettingsState } from "@/types";

import { atomWithStorage } from "jotai/utils";
import { focusAtom } from "jotai-optics";

export const settingStateAtom = atomWithStorage<SettingsState>("setting", {
	showExpandableToolbar: true,
});

export const ShowExpandableToolbarAtom = focusAtom(settingStateAtom, (optics) =>
	optics.prop("showExpandableToolbar"),
);
