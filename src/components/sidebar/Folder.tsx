import type { FC, ForwardRefExoticComponent } from "react";
import type { LucideProps } from "lucide-react";
import type { Folder } from "@/utils/enums";

import { setActiveColor } from "@/utils/helpers";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type IconType = ForwardRefExoticComponent<LucideProps>;

export type FolderProps = {
	text: string;
	icon: IconType;
	active: boolean;
	folder: Folder;
	iconSize?: number;
	onClick?: () => void;
	addNoteType?: (noteId: string) => void;
};

export const FolderOption: FC<FolderProps> = ({
	text,
	active,
	onClick,
	icon: Icon,
	iconSize = 15,
}) => {
	return (
		<div
			className={cn("relative w-full cursor-pointer gap-x-3 px-4 py-[10px]")}
			onClick={onClick}
		>
			<div className="flex items-center gap-x-3 font-semibold text-foreground">
				<Icon size={iconSize} className={active ? "text-[#5183f5]" : ""} />
				<motion.span transition={{ delay: 1 }} className={cn("text-sm", active ? "text-background" : "")}>
					{text}
				</motion.span>
			</div>
			{active && (
				<motion.span
					layoutId="background"
					className="absolute inset-0 -z-10 block h-full w-full border-r-2 border-r-muted-foreground bg-foreground"
				/>
			)}
		</div>
	);
};
