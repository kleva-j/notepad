import type { NoteItem } from "@/types";
import type { FC } from "react";

import { SettingsActions } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { Edit, Eye } from "lucide-react";
import {
	CopyToClipboard,
	SettingsModal,
	MakeFavorite,
	DownloadNote,
	MoveToTrash,
	ToggleTheme,
	SyncNotes,
} from ".";

type MenubarProps = {
	activeNote: NoteItem;
};

export const EditorMenubar: FC<MenubarProps> = ({ activeNote }) => {

	return (
		<div className="absolute bottom-0 left-0 z-[4] flex h-[2.5rem] w-full items-center justify-between border-t">
			<nav className="flex w-full cursor-pointer gap-x-2 px-2">
			</nav>
		</div>
	);
};
