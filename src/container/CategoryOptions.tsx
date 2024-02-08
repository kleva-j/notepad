import type { CategoryItem } from "@/types";
import type { FC } from "react";

import { Folder as FolderIcon, MoreHorizontal } from "lucide-react";
import { useRaisedShadow } from "@/lib/hooks/useRaisedShadow";
import { Reorder, useMotionValue } from "framer-motion";
import { ListItemVariants } from "@/utils/motion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface CategoryOptionProps {
	index: number;
	active?: boolean;
	category: CategoryItem;
	handleClick?: () => void;
}

export const CategoryOptions: FC<CategoryOptionProps> = (props) => {
	const { index, active, category, handleClick } = props;
	const { id, name } = category;

	const y = useMotionValue(0);
	const boxShadow = useRaisedShadow(y);

	return (
		<Reorder.Item
			id={id}
			key={id}
			custom={index}
			value={category}
			onClick={handleClick}
			style={{ boxShadow, y }}
			variants={ListItemVariants}
			initial="hidden"
			animate="visible"
			exit="exit"
			className={cn("group flex w-full cursor-pointer items-center px-5 text-foreground/80 hover:bg-blue-400/5 hover:text-foreground border-y border-transparent bg-white dark:bg-transparent dark:border-transparent", active ? "bg-blue-50 border-y border-blue-50 dark:bg-blue-200/5" : "")}
		>
			<div className="flex cursor-pointer items-center gap-x-3.5 py-2 pr-4">
				<FolderIcon
					size={15}
					className={cn(
						active
							? "text-[#5183f5]"
							: "text-[#888888] group-hover:text-foreground/90 dark:text-foreground/50",
					)}
				/>
				<span className="text-[13px] font-light">{name}</span>
			</div>
			<Button
				variant="ghost"
				className="ml-auto h-4 w-4 rounded-full p-0 text-xs text-transparent hover:bg-transparent group-hover:text-foreground/50"
				asChild
			>
				<MoreHorizontal className="cursor-pointer" />
			</Button>
		</Reorder.Item>
	);
};
