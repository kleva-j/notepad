import React, { useState } from "react";

import { FolderOption } from "@/component/sidebar/Folder";
import { Button } from "@/component/sidebar/ActionButton";
import { Edit, Trash2 } from "react-feather";
import { Folder } from "@/utils/enums";

export default function Sidebar() {
	const [activeFolder, setActiveFolder] = useState(Folder.ALL);
	return (
		<section className="h-full bg-[#2d2d2d] text-[#d0d0d0]">
			<h3>This is the app sidebar</h3>
			<Button label="New note" />
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
		</section>
	);
}
