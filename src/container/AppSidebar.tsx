import CategoryList from "./CategoryList";
import React from "react";

import { FolderOption } from "@/component/sidebar/Folder";
import { Button } from "@/component/sidebar/ActionButton";
import { Edit, Plus, Trash2 } from "react-feather";
import { Folder } from "@/utils/enums";
import { useState } from "react";

export default function Sidebar() {
	const [activeFolder, setActiveFolder] = useState(Folder.ALL);
	return (
		<section className="h-full bg-[#2d2d2d] pt-[0.4rem] text-[#d0d0d0]">
			<Button icon={Plus} label="New note" />
			<section className="relative flex flex-1 flex-col pb-4">
				<FolderOption
					text="Notes"
					icon={<Edit size={15} className="mr-3" />}
					folder={Folder.ALL}
					active={activeFolder === Folder.ALL}
					onClick={() => setActiveFolder(Folder.ALL)}
				/>
				<FolderOption
					text="Trash"
					icon={<Trash2 size={15} className="mr-3" />}
					folder={Folder.TRASH}
					active={activeFolder === Folder.TRASH}
					onClick={() => setActiveFolder(Folder.TRASH)}
				/>
				<CategoryList />
			</section>
		</section>
	);
}
