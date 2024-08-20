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
import { toast } from "sonner";

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
	updateNote: (id: string, note: Partial<NoteItem>) => void;
}

export const ListItem = (props: ListItemProps) => {
	const { item, order, onClick, updateNote } = props;
	const [, setIsDragging] = useAtom(isDraggingAtom);
	const [isDraggable] = useAtom(isDraggableAtom);

	const dragControls = useDragControls();

	const handleDragStart = (event: any) => {
		setIsDragging(true);
		dragControls.start(event, { snapToCursor: true });
	};

	const handleDragEnd = () => {
		setIsDragging(false);
	};

	const date = dayjs(item.created).fromNow();

	const setActiveNote = () => {
		if (props.active) {
			toast.info("Note is already active");
			return;
		}
		if (item.trash) {
			toast.info("Note is in trash, remove it first");
			return;
		}
		onClick(item.id);
	};

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
				onDoubleClick={setActiveNote}
				className={cn(
					"flex cursor-pointer flex-col justify-start rounded-md border bg-white px-4 py-3 text-base capitalize transition-colors duration-150 dark:bg-neutral-900/80 dark:text-gray-400 dark:hover:bg-neutral-800/90 dark:hover:text-gray-200",
					item.favorite && "dark:border-yellow-400/20",
					item.trash && "border-red-300/50 blur-[0.5px] dark:border-red-400/20",
					props.active &&
						"bg-yellow-50 dark:bg-amber-400/40 dark:hover:bg-amber-400/35",
				)}
			>
				<div className="flex items-center justify-between">
					<p
						className={cn(
							"truncate whitespace-nowrap tracking-wide text-inherit transition-colors duration-150",
							item.favorite && "text-yellow-500 dark:text-amber-200/60",
							props.active && "dark:text-white",
							{ "line-through decoration-red-300": item.trash },
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
						props.active && "dark:text-white",
						{ "line-through decoration-red-300": item.trash },
					)}
				>
					{item.content}
				</div>
				<div className="my-2 flex items-center justify-between">
					<Button
						variant="ghost"
						className={cn(
							"h-4 w-4 stroke-[1.2px] px-0.5 py-0.5 text-gray-500 transition-colors duration-150 hover:bg-yellow-400/10 hover:text-gray-400",
							{
								"stroke-yellow-500": item.favorite,
								"fill-yellow-500": props.active && item.favorite,
								"dark:stroke-white": props.active && !item.favorite,
							},
						)}
						asChild
						onClick={() => updateNote(item.id, { favorite: !item.favorite })}
					>
						<Star />
					</Button>
					<span
						className={cn(
							"ml-auto font-mono text-[11px] leading-4",
							props.active && "dark:text-white",
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
