import type { HandleOptionsEvent, CategoryItem } from "@/types";
import type { FC } from "react";

import { Folder as FolderIcon, MoreHorizontal } from "lucide-react";
import { useSortable } from "@dnd-kit/sortable";
import { Button } from "@/components/ui/button";
import { CSS } from "@dnd-kit/utilities";
import { cn } from "@/lib/utils";

interface CategoryOptionProps {
	index: number;
	active?: boolean;
	category: CategoryItem;
	handleClick?: () => void;
	handleMenuClick: HandleOptionsEvent;
	handleRightClick: HandleOptionsEvent;
}

export const CategoryOptions: FC<CategoryOptionProps> = (props) => {
	const { index, active, category, handleClick, handleMenuClick } = props;

	const { setNodeRef, attributes, listeners, transform, transition } =
		useSortable({ id: category.id, data: { index } });

	const style = {
		transition,
		transform: CSS.Transform.toString(transform),
	};

	return (
		<li
			id={category.id}
			ref={setNodeRef}
			onClick={handleClick}
			{...attributes}
			{...listeners}
			style={style}
			className="group flex w-full cursor-pointer items-center px-5 text-foreground/80 hover:bg-blue-400/5 hover:text-foreground"
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
				<span className="text-[13px] font-light">{category.name}</span>
			</div>
			<Button
				variant="ghost"
				className="ml-auto h-4 w-4 rounded-full p-0 text-xs text-transparent hover:bg-transparent group-hover:text-foreground/50"
				onClick={(event) => handleMenuClick(event, category.id)}
				asChild
			>
				<MoreHorizontal className="cursor-pointer" />
			</Button>
		</li>
	);
};
