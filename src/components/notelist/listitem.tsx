"use client";

import type { NoteItem } from "@/types";

import { useDragControls, Reorder, motion } from "framer-motion";
import { DotsVerticalIcon } from "@radix-ui/react-icons";
import { ListItemVariants } from "@/utils/motion";
import { Separator } from "@/ui/separator";
import { atom, useAtom } from "jotai";
import { Button } from "@/ui/button";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

import relativeTime from "dayjs/plugin/relativeTime";
import dayjs from "dayjs";

dayjs.extend(relativeTime);

const isDraggingAtom = atom(false);
const isDraggableAtom = atom(true);

interface ListItemProps {
	item: NoteItem;
	order: number;
	active: boolean;
	onClick: (id: string) => void;
	onRemoveItem: (id: string) => void;
}

export const ListItem = (props: ListItemProps) => {
	const { item, order, onClick, onRemoveItem } = props;
	const [isDragging, setIsDragging] = useAtom(isDraggingAtom);
	const [isDraggable, setIsDraggable] = useAtom(isDraggableAtom);

	const dragControls = useDragControls();

	const handleDragStart = (event: any) => {
		setIsDragging(true);
		dragControls.start(event, { snapToCursor: true });
	};

	const handleDragEnd = () => {
		setIsDragging(false);
	};

	const date = dayjs(item.created).fromNow();

	return (
		<Reorder.Item
			key={item.id}
			value={item}
			custom={order}
			variants={ListItemVariants}
			initial="hidden"
			animate="visible"
			exit="exit"
			layout
			layoutId={`item-${item.id}`}
			dragListener={!item.checked}
			dragControls={dragControls}
			onDragEnd={handleDragEnd}
			whileDrag={{ zIndex: 9999 }}
		>
			<motion.div
				onDoubleClick={() => onClick(item.id)}
				className={cn(
					"flex cursor-pointer flex-col justify-start rounded-md border bg-neutral-900/80 px-4 py-3 text-base capitalize text-gray-400 transition-colors duration-150 hover:bg-neutral-800/90 hover:text-gray-200",
					item.favorite && "border-yellow-400/20",
					props.active && "bg-amber-400/40 hover:bg-amber-400/30",
				)}
			>
				<div className="flex items-center justify-between">
					<p
						className={cn(
							"truncate whitespace-nowrap tracking-wide text-inherit transition-colors duration-150",
							item.favorite && "text-amber-200/60",
							props.active && "text-white",
						)}
					>
						{item.title}
					</p>
					<Button
						variant="ghost"
						className="ml-6 h-5 w-5 rounded-full px-1 py-1 text-gray-500 transition-colors duration-150"
						asChild
					>
						<DotsVerticalIcon />
					</Button>
				</div>

				<Separator className="my-1 h-full w-px bg-transparent" />
				<div
					className={cn(
						"line-clamp-3 text-[13px] leading-[18px] text-gray-500 transition-colors duration-150",
						props.active && "text-white",
					)}
				>
					{item.content}
				</div>
				<div className="my-2 flex items-center justify-between">
					{item.favorite && (
						<Button
							variant="ghost"
							className="h-4 w-4 stroke-yellow-500 stroke-[1.2px] px-0.5 py-0.5 text-gray-500 transition-colors duration-150 hover:bg-yellow-400/10 hover:text-gray-400"
							asChild
						>
							<Star />
						</Button>
					)}
					<span
						className={cn(
							"ml-auto font-mono text-xs",
							props.active && "text-white",
						)}
					>
						{date}
					</span>
				</div>
				<div
					onPointerDown={isDraggable ? handleDragStart : undefined}
					style={{ touchAction: "none" }}
				/>
			</motion.div>
		</Reorder.Item>
	);
};
