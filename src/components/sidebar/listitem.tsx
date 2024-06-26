"use client";

import type { CategoryItem } from "@/types";

import { useDragControls, Reorder, motion } from "framer-motion";
import { GripVertical, Settings2 } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface ListItemProps {
	item: CategoryItem;
	order: number;
	onClickItem: (id: number) => void;
	onRemoveItem: (id: number) => void;
}

export const ListItem = (props: ListItemProps) => {
	const { item, order, onClickItem, onRemoveItem } = props;
	const [isDragging, setIsDragging] = useState(false);
	const [isDraggable, setIsDraggable] = useState(true);
	const dragControls = useDragControls();

	const handleDragEnd = () => {
		setIsDragging(false);
	};

	return (
		<motion.div className={cn("relative")} onClick={() => onClickItem(item.id)}>
			<Reorder.Item
				value={item.id}
				className="flex cursor-pointer items-center justify-start rounded-md border py-1.5 pl-3 pr-4 text-base capitalize text-gray-400 transition-colors duration-300 hover:bg-neutral-800/70 hover:text-gray-200"
				initial={{ opacity: 0 }}
				animate={{
					opacity: 1,
					transition: {
						type: "spring",
						bounce: 0,
						duration: 0.4,
					},
				}}
				exit={{
					opacity: 0,
					transition: {
						duration: 0.05,
						type: "spring",
						bounce: 0.1,
					},
				}}
				layout
				layoutId={`item-${item.id}`}
				dragListener={!item.checked}
				dragControls={dragControls}
				onDragEnd={handleDragEnd}
			>
				<GripVertical className="mr-2 h-5 w-5 cursor-grab text-gray-600" />
				{item.text}
				<Settings2 className="ml-auto h-4 w-4 text-gray-500 transition-colors duration-300 hover:text-gray-400" />
			</Reorder.Item>
		</motion.div>
	);
};
