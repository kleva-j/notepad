"use client";

import type { Folder } from "@/utils/enums";
import type { FC } from "react";

export type FolderProps = {
	text: string;
	icon: JSX.Element;
	active: boolean;
	folder: Folder;
	onClick?: () => void;
	addNoteType?: (noteId: string) => void;
};

export const FolderOption: FC<FolderProps> = ({
	icon,
	text,
	active,
	onClick,
}) => {
	return (
		<button
			className={`folder-options ${
				active ? "active" : ""
			} w-full gap-x-3 bg-transparent`}
			onClick={onClick}
		>
			<div className="flex items-center gap-x-3 font-semibold">
				{icon}
				{text}
			</div>
		</button>
	);
};
