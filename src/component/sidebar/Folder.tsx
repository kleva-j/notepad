import { Folder } from "@/utils/enums";
import React, { FC } from "react";

type FolderProps = {
	text: string;
	icon: JSX.Element;
	active: boolean;
	folder: Folder;
	onClick: () => void;
	addNoteType?: (noteId: string) => void;
};

export const FolderOption: FC<FolderProps> = ({ icon, text, active }) => {
	return (
		<button className="w-full bg-transparent text-sm">
			<div
				className={`${
					active ? "bg-blend-darken" : ""
				} flex cursor-pointer items-center gap-x-3 border-[1px] border-transparent bg-[#2d2d2d] px-4 py-2 font-semibold hover:bg-blend-lighten`}
			>
				{icon}
				<span className="capitalize">{text}</span>
			</div>
		</button>
	);
};
