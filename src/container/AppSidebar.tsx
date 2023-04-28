import CategoryList from "./CategoryList";
import React from "react";

import { Edit, Plus, Star, Trash2, Book } from "react-feather";
import { FolderOption } from "@/component/sidebar/Folder";
import { Button } from "@/component/sidebar/ActionButton";
import { Folder } from "@/utils/enums";
import { useState } from "react";

export default function Sidebar() {
	const [activeFolder, setActiveFolder] = useState(Folder.ALL);
	return (
		<section className="h-full bg-[#2d2d2d] pt-[0.4rem] text-[#d0d0d0]">
			<Button icon={Plus} label="New note" />
			<section className="relative flex flex-1 flex-col pb-4">
				<FolderOption
					text="Scratchpad"
					icon={
						<Edit
							size={15}
							style={{
								stroke:
									activeFolder === Folder.SCRATCHPAD ? "#5183f5" : "#ffffff40",
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
							style={{
								stroke: activeFolder === Folder.ALL ? "#5183f5" : "#ffffff40",
							}}
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
							style={{
								stroke:
									activeFolder === Folder.FAVORITE ? "#5183f5" : "#ffffff40",
							}}
						/>
					}
					folder={Folder.FAVORITE}
					active={activeFolder === Folder.FAVORITE}
					onClick={() => setActiveFolder(Folder.FAVORITE)}
				/>
				<FolderOption
					text="Trash"
					icon={
						<Trash2
							size={15}
							style={{
								stroke: activeFolder === Folder.TRASH ? "#5183f5" : "#ffffff40",
							}}
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
