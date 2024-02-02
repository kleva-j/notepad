import { TooltipProvider } from "@/components/ui/tooltip";
import {
	CopyToClipboard,
	TogglePreview,
	SettingsModal,
	MakeFavorite,
	DownloadNote,
	MoveToTrash,
	ToggleTheme,
	SyncNotes,
} from ".";

interface MenubarProps {
	activeNote?: boolean;
	previewMarkdown?: boolean;
	togglePreview?: () => void;
}

export const EditorMenu = (props: MenubarProps) => {
	const { activeNote, togglePreview, previewMarkdown } = props;

	return (
		<div className="absolute bottom-0 left-0 z-[4] flex h-[2.5rem] w-full items-center justify-between border-t">
			<nav
				className="flex w-full cursor-pointer gap-x-2 px-2"
				onClick={togglePreview}
			>
				<TooltipProvider>
					{activeNote && <TogglePreview previewMarkdown={previewMarkdown} />}
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
