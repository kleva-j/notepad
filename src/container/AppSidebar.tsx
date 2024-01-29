import { FolderOption } from "@/components/sidebar/Folder";
import { Edit, Star, Trash2, Book } from "lucide-react";
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
		<section className="h-full w-full max-w-[270px] text-[#d0d0d0]">
			<div
				className="w-full text-center text-base capitalize leading-[50px] mb-1 text-background cursor-pointer"
				onClick={addNewNote}
			>
				Add New Note
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
