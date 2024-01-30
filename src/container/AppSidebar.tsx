import { Edit, Star, Trash2, Book, Plus } from "lucide-react";
import { FolderOption } from "@/components/sidebar/Folder";
import { UseNotesContext } from "@/lib/context";
import { NotesActions } from "@/lib/constants";
import { Folder } from "@/utils/enums";

import CategoryList from "@/container/CategoryList";

export default function Sidebar() {
	const { state, dispatch } = UseNotesContext();
	const { activeFolder, activeCategoryId } = state;

	const addNewNote = () =>
		dispatch({
			type: NotesActions.ADD_NEW_NOTE,
			payload: { activeFolder, activeCategoryId },
		});

	const type = NotesActions.SET_ACTIVE_FOLDER;

	return (
		<section className="h-full w-full max-w-[270px] bg-neutral-800 border-r border-r-border">
			<div
				className="w-full text-center text-base capitalize leading-[55px] mb-1 text-white cursor-pointer flex items-center justify-center border-b-[0.5px] border-b-neutral-700 hover:bg-neutral-700/10"
				onClick={addNewNote}
			>
				<Plus size={16} className="-ml-4 mr-1" />
				New Note
			</div>
			<section className="relative flex flex-1 flex-col pb-4">
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
