/* eslint-disable react-hooks/exhaustive-deps */
import type { NoteItem } from "@/types";
import { type FC, useCallback } from "react";

import { SettingsActions } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { UseAppContext } from "@/lib/context";
import { Edit, Eye } from "lucide-react";
import {
	TooltipProvider,
	TooltipTrigger,
	TooltipContent,
	Tooltip,
} from "@/components/ui/tooltip";
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
	const { state, dispatch: updateSettings } = UseAppContext();

	const togglePreview = useCallback(
		() =>
			updateSettings({
				type: SettingsActions.UPDATE_SETTINGS,
				payload: { previewMarkdown: !state.previewMarkdown },
			}),
		[state.previewMarkdown],
	);

	return (
		<div className="absolute bottom-0 left-0 z-[4] flex h-[2.5rem] w-full items-center justify-between border-t">
			<nav className="flex w-full cursor-pointer gap-x-2 px-2">
				<TooltipProvider>
					{activeNote && (
						<Tooltip>
							<TooltipTrigger asChild>
								<Button
									variant="ghost"
									size="icon"
									className="rounded-none"
									onClick={togglePreview}
								>
									{state.previewMarkdown ? (
										<Edit
											aria-hidden="true"
											className="h-[1.1rem] w-[1.1rem] transition-all"
										/>
									) : (
										<Eye
											aria-hidden="true"
											className="h-[1.1rem] w-[1.1rem] transition-all"
										/>
									)}
								</Button>
							</TooltipTrigger>
							<TooltipContent>
								<p>{state.previewMarkdown ? "Edit" : "Preview"}</p>
							</TooltipContent>
						</Tooltip>
					)}
					<DownloadNote />
					<MoveToTrash />
					<CopyToClipboard />
					<MakeFavorite />
					<SettingsModal />
					<SyncNotes />
					<ToggleTheme />
				</TooltipProvider>
			</nav>
		</div>
	);
};
