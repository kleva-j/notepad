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
	iconSize?: number;
	onClick?: () => void;
	addNoteType?: (noteId: string) => void;
};

export const FolderOption: FC<FolderProps> = (props) => {
	const { text, icon, active, onClick, iconSize = 15 } = props;
	const Icon = motion(icon);

	return (
		<div
			className={cn(
				"group relative flex w-full cursor-pointer items-center gap-x-3 px-4 py-[10px] transition focus-visible:outline-1 focus-visible:outline-neutral-700",
			)}
			style={{ WebkitTapHighlightColor: "transparent" }}
			onClick={onClick}
			tabIndex={0}
		>
			{active && (
				<motion.span
					layoutId="background"
					className="absolute inset-0 z-10 bg-secondary mix-blend-difference dark:border-r-2 dark:border-r-sky-500"
					transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
				/>
			)}
			<motion.span
				className={cn(
					"flex items-center gap-x-1 text-[15px] font-medium leading-[1.4rem] tracking-[0.04em] text-white/90 transition-colors",
				)}
			>
				<Icon size={iconSize} className={cn("mr-2 text-sky-500")} />
				{text}
			</motion.span>
		</div>
	);
};
