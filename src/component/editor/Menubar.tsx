import React from "react";

import { Edit, Eye } from "lucide-react";

interface MenubarProps {
	activeNote: boolean;
	previewMarkdown: boolean;
	togglePreview: () => void;
}

export const Menubar = ({
	activeNote,
	togglePreview,
	previewMarkdown,
}: MenubarProps) => {
	return (
		<div className="absolute bottom-0 left-0 z-[4] flex h-[2.4rem] w-full items-center justify-between border-t border-t-slate-300 bg-neutral-200">
			{activeNote && (
				<nav className="cursor-pointer px-4" onClick={togglePreview}>
					{previewMarkdown ? (
						<Edit aria-hidden="true" size={18} />
					) : (
						<Eye aria-hidden="true" size={18} />
					)}
				</nav>
			)}
		</div>
	);
};
