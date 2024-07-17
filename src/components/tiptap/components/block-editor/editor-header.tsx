import { WebSocketStatus } from "@hocuspocus/provider";
import { Toolbar } from "@/tiptap/components/toolbar";
import { EditorInfo } from "./editor-info";
import { EditorUser } from "./types";
import { Icon } from "@/ui/icon";

export type EditorHeaderProps = {
	collabState: WebSocketStatus;
	toggleSidebar?: () => void;
	isSidebarOpen?: boolean;
	users: EditorUser[];
	characters: number;
	words: number;
};

export const EditorHeader = (props: EditorHeaderProps) => {
	const { characters, collabState, users, words, ...rest } = props;
	const { isSidebarOpen, toggleSidebar } = rest;
	return (
		<div className="flex flex-none flex-row items-center justify-between border-b border-neutral-200 bg-white py-2 pl-6 pr-3 text-black dark:border-neutral-800 dark:bg-black/30 dark:text-white">
			<div className="flex flex-row items-center gap-x-1.5">
				<div className="flex items-center gap-x-1.5">
					<Toolbar.Button
						tooltip={isSidebarOpen ? "Close sidebar" : "Open sidebar"}
						onClick={toggleSidebar}
						active={isSidebarOpen}
						className={isSidebarOpen ? "bg-transparent" : ""}
					>
						<Icon name={isSidebarOpen ? "PanelLeftClose" : "PanelLeft"} />
					</Toolbar.Button>
				</div>
			</div>
			<EditorInfo
				characters={characters}
				words={words}
				collabState={collabState}
				users={users}
			/>
		</div>
	);
};
