import type { Folder } from "@/utils/enums";
import type { IconType } from "@/types";
import type { FC } from "react";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export type FolderProps = {
	text: string;
	icon: IconType;
	active: boolean;
	folder: Folder;
	onClick?: () => void;
	addNoteType?: (noteId: string) => void;
};

export const FolderOption: FC<FolderProps> = (props) => {
	const { text, icon, active, onClick } = props;
	const Icon = motion(icon);

	return (
		<div
			className={cn(
				"group relative flex cursor-pointer items-center gap-x-3 px-4 py-[10px] transition focus-visible:outline-[0.5px] focus-visible:outline-border",
			)}
			style={{ WebkitTapHighlightColor: "transparent" }}
			onClick={onClick}
			draggable={true}
		>
			{active && (
				<motion.span
					layoutId="background"
					className="absolute inset-0 z-10 border-r-2 border-r-blue-500 bg-secondary mix-blend-darken dark:mix-blend-difference"
					transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
				/>
			)}
			<motion.span
				className={cn(
					"flex items-center gap-x-1 text-[15px] font-semibold leading-[1.4rem] tracking-[0.04em] transition-colors",
					active
						? "text-foreground"
						: "text-foreground/75 dark:text-foreground",
				)}
			>
				<Icon
					size={15}
					className={cn(
						"mr-2 dark:text-blue-500",
						active ? "text-blue-600" : "text-blue-500/90",
					)}
				/>
				{text}
			</motion.span>
		</div>
	);
};
