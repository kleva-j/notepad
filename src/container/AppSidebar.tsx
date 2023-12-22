import { FolderOption } from "@/components/sidebar/Folder";
import { Edit, Star, Trash2, Book } from "lucide-react";
import { setStrokeColor } from "@/utils/helpers";
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

	return (
		<section className="h-full bg-[#2d2d2d] pt-[0.4rem] text-[#d0d0d0]">
			<button onClick={addNewNote} />
			<section className="relative flex flex-1 flex-col pb-4">
				<FolderOption
					text="Scratchpad"
					icon={
						<Edit
							size={15}
							style={{
								stroke: setStrokeColor(Folder.SCRATCHPAD, activeFolder),
							}}
						/>
					}
					folder={Folder.SCRATCHPAD}
					active={activeFolder === Folder.SCRATCHPAD}
					onClick={() =>
						dispatch({
							type: NotesActions.SET_ACTIVE_FOLDER,
							payload: Folder.SCRATCHPAD,
						})
					}
				/>
				<FolderOption
					text="Notes"
					icon={
						<Book
							size={15}
							style={{ stroke: setStrokeColor(Folder.ALL, activeFolder) }}
						/>
					}
					folder={Folder.ALL}
					active={activeFolder === Folder.ALL}
					onClick={() =>
						dispatch({
							type: NotesActions.SET_ACTIVE_FOLDER,
							payload: Folder.ALL,
						})
					}
				/>
				<FolderOption
					text="Favorites"
					icon={
						<Star
							size={15}
							style={{ stroke: setStrokeColor(Folder.FAVORITES, activeFolder) }}
						/>
					}
					folder={Folder.FAVORITES}
					active={activeFolder === Folder.FAVORITES}
					onClick={() =>
						dispatch({
							type: NotesActions.SET_ACTIVE_FOLDER,
							payload: Folder.FAVORITES,
						})
					}
				/>
				<FolderOption
					text="Trash"
					icon={
						<Trash2
							size={15}
							style={{ stroke: setStrokeColor(Folder.TRASH, activeFolder) }}
						/>
					}
					folder={Folder.TRASH}
					active={activeFolder === Folder.TRASH}
					onClick={() =>
						dispatch({
							type: NotesActions.SET_ACTIVE_FOLDER,
							payload: Folder.TRASH,
						})
					}
				/>
				<CategoryList />
			</section>
		</section>
	);
}
