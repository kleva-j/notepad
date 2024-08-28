"use client";

import type { CategoryItem, NoteItem } from "@/types";

import { Edit, Pencil, Star, StarIcon, Trash } from "lucide-react";
import { useDragControls, Reorder, motion } from "framer-motion";
import { DotsVerticalIcon } from "@radix-ui/react-icons";
import { ListItemVariants } from "@/utils/motion";
import { Separator } from "@/ui/separator";
import { atom, useAtom } from "jotai";
import { Button } from "@/ui/button";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

import {
	DropdownMenuSubTrigger,
	DropdownMenuSubContent,
	DropdownMenuSeparator,
	DropdownMenuContent,
	DropdownMenuTrigger,
	DropdownMenuPortal,
	DropdownMenuLabel,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuSub,
	DropdownMenu,
} from "@/ui/dropdown-menu";

import {
	CommandInput,
	CommandEmpty,
	CommandGroup,
	CommandList,
	CommandItem,
	Command,
} from "@/ui/command";

import relativeTime from "dayjs/plugin/relativeTime";
import dayjs from "dayjs";

dayjs.extend(relativeTime);

const isDraggingAtom = atom(false);

interface ListItemProps {
	order: number;
	item: NoteItem;
	active: boolean;
	categories: CategoryItem[];
	onClick: (id: string) => void;
	onRemoveItem: () => void;
	updateNote: (id: string, note: Partial<NoteItem>) => void;
}

export const ListItem = (props: ListItemProps) => {
	const { item, order, onClick, updateNote, categories, onRemoveItem } = props;
	const [, setIsDragging] = useAtom(isDraggingAtom);

	const [isOpen, setIsOpen] = useState(false);

	const dragControls = useDragControls();

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
			whileDrag={{ zIndex: 9999 }}
			onDragEnd={() => setIsDragging(false)}
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

					<DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
						<DropdownMenuTrigger asChild>
							<Button
								variant="ghost"
								className="ml-6 h-5 w-5 rounded-full px-1 py-1 text-gray-500 transition-colors duration-150"
								asChild
							>
								<DotsVerticalIcon />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuPortal>
							<DropdownMenuContent
								align="start"
								className="w-[200px] dark:bg-neutral-900/95"
							>
								<DropdownMenuLabel>Actions</DropdownMenuLabel>
								<DropdownMenuGroup>
									<DropdownMenuItem
										className="cursor-pointer"
										onClick={() =>
											updateNote(item.id, { favorite: !item.favorite })
										}
									>
										<StarIcon
											className={cn("mr-2 h-4 w-4 stroke-[1px]", {
												"stroke-yellow-500": !item.favorite,
												"fill-yellow-500 stroke-yellow-500": item.favorite,
											})}
										/>
										{item.favorite
											? "Remove from Favorites"
											: "Add to Favorites"}
									</DropdownMenuItem>
									<DropdownMenuItem className="cursor-pointer">
										<Pencil className="mr-2 h-4 w-4 stroke-[1px]" />
										Update Title
									</DropdownMenuItem>
									<DropdownMenuSeparator />
									<DropdownMenuSub>
										<DropdownMenuSubTrigger>
											<Edit className="mr-2 h-4 w-4 stroke-[1px]" />
											Edit Category
										</DropdownMenuSubTrigger>
										<DropdownMenuSubContent className="p-0">
											<Command className="dark:bg-neutral-900/90">
												<CommandInput
													placeholder="Filter label..."
													autoFocus={true}
												/>
												<CommandList>
													<CommandEmpty>No Category found.</CommandEmpty>
													<CommandGroup>
														{categories.map(({ id, text }) => (
															<CommandItem
																key={"listitem-actions-" + id}
																value={text}
																className="cursor-pointer hover:bg-neutral-200"
																onSelect={() => {
																	updateNote(item.id, { categoryId: id });
																	setIsOpen(false);
																}}
															>
																{text}
															</CommandItem>
														))}
													</CommandGroup>
												</CommandList>
											</Command>
										</DropdownMenuSubContent>
									</DropdownMenuSub>
									<DropdownMenuSeparator />
									<DropdownMenuItem
										className="cursor-pointer text-red-600"
										onClick={onRemoveItem}
									>
										<Trash className="mr-2 h-4 w-4" />
										Move to Trash
									</DropdownMenuItem>
								</DropdownMenuGroup>
							</DropdownMenuContent>
						</DropdownMenuPortal>
					</DropdownMenu>
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
						{dayjs(item.created).fromNow()}
					</span>
				</div>
			</motion.div>
		</Reorder.Item>
	);
};
