import CategoryList from "./CategoryList";
import React from "react";

import { updateNotes, NoteStateAtom, addNote } from "@/store/slice/note";
import { Edit, Plus, Star, Trash2, Book } from "react-feather";
import { FolderOption } from "@/component/sidebar/Folder";
import { Button } from "@/component/sidebar/ActionButton";
import { setStrokeColor } from "@/utils/helpers";
import { Folder } from "@/utils/enums";
import { v4 as uuid } from "uuid";
import { useAtom } from "jotai";

export default function Sidebar() {
	const [{ activeFolder, activeCategoryId, notes }] = useAtom(NoteStateAtom);
	const [, updateNoteState] = useAtom(updateNotes);
	const setActiveFolder = (folder: Folder) =>
		updateNoteState({ activeFolder: folder });

	const handleAddNote = () =>
		updateNoteState({
			notes: addNote(notes, {
				id: `n-${uuid()}`,
				text: "",
				categoryId: activeFolder === Folder.CATEGORY ? activeCategoryId : "",
				trash: false,
				created: new Date().toDateString(),
				lastUpdated: new Date().toDateString(),
				favorite: activeFolder === Folder.FAVORITES,
			}),
		});

	return (
		<section className="h-full bg-[#2d2d2d] pt-[0.4rem] text-[#d0d0d0]">
			<Button icon={Plus} label="New note" onclick={handleAddNote} />
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
					onClick={() => setActiveFolder(Folder.SCRATCHPAD)}
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
					onClick={() => setActiveFolder(Folder.ALL)}
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
					onClick={() => setActiveFolder(Folder.FAVORITES)}
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
					onClick={() => setActiveFolder(Folder.TRASH)}
				/>
				<CategoryList />
			</section>
		</section>
	);
}
