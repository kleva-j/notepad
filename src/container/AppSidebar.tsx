import { Edit, Star, Trash2, Book, Plus } from "lucide-react";
import { FolderOption } from "@/components/sidebar/Folder";
import { UseNotesContext } from "@/lib/context";
import { NotesActions } from "@/lib/constants";
import { Folder } from "@/utils/enums";

import CategoryList from "@/container/CategoryList";

export default function Sidebar() {
	const { state, dispatch } = UseNotesContext();
	const { activeFolder, activeCategoryId } = state;
	const { ADD_NEW_NOTE, SET_ACTIVE_FOLDER: type } = NotesActions;

	return (
		<section className="h-full w-full max-w-[270px] border-r border-r-border bg-background">
			<div
				className="mb-1 flex w-full cursor-pointer items-center justify-center border-b-[0.5px] border-b-border text-center text-base capitalize leading-[55px] text-foreground hover:bg-background/90"
				onClick={() =>
					dispatch({
						type: ADD_NEW_NOTE,
						payload: { activeFolder, activeCategoryId },
					})
				}
			>
				<Plus size={16} className="-ml-4 mr-1" />
				New Note
			</div>
			<section className="flex flex-col">
				<FolderOption
					text="Scratchpad"
					icon={Edit}
					folder={Folder.SCRATCHPAD}
					active={activeFolder === Folder.SCRATCHPAD}
					onClick={() => dispatch({ type, payload: Folder.SCRATCHPAD })}
				/>
				<FolderOption
					text="Notes"
					icon={Book}
					folder={Folder.ALL}
					active={activeFolder === Folder.ALL}
					onClick={() => dispatch({ type, payload: Folder.ALL })}
				/>
				<FolderOption
					text="Favorites"
					icon={Star}
					folder={Folder.FAVORITES}
					active={activeFolder === Folder.FAVORITES}
					onClick={() => dispatch({ type, payload: Folder.FAVORITES })}
				/>
				<FolderOption
					text="Trash"
					icon={Trash2}
					folder={Folder.TRASH}
					active={activeFolder === Folder.TRASH}
					onClick={() => dispatch({ type, payload: Folder.TRASH })}
				/>

				<CategoryList />
			</section>
		</section>
	);
}
