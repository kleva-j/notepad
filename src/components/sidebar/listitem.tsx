import type { CategoryItem } from "@/types";

import { Popover, PopoverContent, PopoverTrigger } from "@/ui/popover";
import { FolderOpen, Folder, PencilIcon, Trash } from "lucide-react";
import { Reorder, useDragControls } from "framer-motion";
import { DotsVerticalIcon } from "@radix-ui/react-icons";
import { ListItemVariants } from "@/utils/motion";
import { atom, useAtom } from "jotai";
import { Button } from "@/ui/button";
import { cn } from "@/lib/utils";
import { MenuItem } from ".";

type ListItemProps = {
	item: CategoryItem;
	order: number;
	isActive: boolean;
	renderExtra?: (item: CategoryItem) => React.ReactNode;
	isExpanded?: boolean;
	className?: string;
	handleDrag?: () => void;
	onClick?: (id: string) => void;
	onSelect?: (id: string) => void;
};

const isDraggingAtom = atom(false);
const isDraggableAtom = atom(true);

export const CategoryListItem = (props: ListItemProps) => {
	const { item, order, isActive, onSelect, handleDrag, onClick } = props;
	const [, setIsDragging] = useAtom(isDraggingAtom);
	const [isDraggable] = useAtom(isDraggableAtom);
	const dragControls = useDragControls();

	const handleDragStart = (event: any) => {
		setIsDragging(true);
		dragControls.start(event, { snapToCursor: true });
		handleDrag?.();
	};

	const handleDragEnd = () => {
		setIsDragging(false);
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
			<MenuItem
				label={item.text}
				active={isActive}
				icon={isActive ? FolderOpen : Folder}
				handleClick={() => onClick?.(item.id)}
				className={cn(
					"w-full bg-neutral-800/5 text-sm capitalize shadow",
					isActive && "bg-neutral-800 text-gray-200",
				)}
			>
				<Popover>
					<PopoverTrigger asChild onClick={(event) => event.stopPropagation()}>
						<DotsVerticalIcon className="-mr-1 ml-auto h-4 w-4 text-gray-600 transition-colors duration-300 hover:text-gray-500" />
					</PopoverTrigger>
					<PopoverContent className="max-w-min bg-neutral-900/90 p-2 shadow-lg" side="right">
						<div className="flex w-full items-center">
							<div className="flex gap-x-1">
								<Button
									variant="ghost"
									className="h-8 w-8 bg-neutral-900 p-2"
									title="Edit"
								>
									<span className="sr-only">Edit</span>
									<PencilIcon className="stroke-[0.75]" />
								</Button>
								<Button
									variant="ghost"
									className="h-8 w-8 bg-neutral-900 p-2"
									title="Delete"
									onClick={(event) => {
										event.stopPropagation();
										onSelect?.(item.id);
									}}
								>
									<span className="sr-only">Delete</span>
									<Trash className="stroke-red-500 stroke-[2px]" />
								</Button>
							</div>
							{/* <AnimatePresence></AnimatePresence> */}
						</div>
					</PopoverContent>
				</Popover>
			</MenuItem>
			<div
				onPointerDown={isDraggable ? handleDragStart : undefined}
				style={{ touchAction: "none" }}
			/>
		</Reorder.Item>
	);
};
