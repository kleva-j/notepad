import React, { DragEvent } from "react";

import { type Event } from "./CategoryList";

import { Folder as FolderIcon, MoreHorizontal } from "react-feather";
import { CategoryItem } from "@/types";
import { Draggable } from "react-beautiful-dnd";
import { iconColor } from "@/utils/constants";

interface CategoryOptionProps {
	category: CategoryItem;
	active?: boolean;
	index: number;
	handleClick?: () => void;
	handleMenuClick: (event: Event, categoryId: string) => void;
	handleRightClick: (event: Event, categoryId: string) => void;
}

export default function CategoryOptions({
	category,
	active,
	index,
	handleClick,
	handleMenuClick,
}: CategoryOptionProps): JSX.Element {
	return (
		<Draggable draggableId={category.id} index={index}>
			{(provided, snapshot) => (
				<div
					ref={provided.innerRef}
					{...provided.dragHandleProps}
					{...provided.draggableProps}
					className={`category-options${active ? " active" : ""}${
						snapshot.isDragging ? " dragging" : ""
					}${
						snapshot.draggingOver ? " dragged-over" : ""
					} flex w-full items-center justify-between bg-transparent pr-4 text-sm`}
					onClick={handleClick}
					onDrop={(event) => event.preventDefault()}
					onDragOver={(event: DragEvent<HTMLDivElement>) =>
						event.preventDefault()
					}
				>
					<div className="flex cursor-pointer items-center gap-x-3.5 px-4 py-2 font-semibold">
						<FolderIcon
							size={15}
							color={iconColor}
							style={{ stroke: active ? "#5183f5" : "#ffffff40" }}
						/>
						<span className="font-light">{category.name}</span>
					</div>
					<div
						className=""
						onClick={(event) => handleMenuClick(event, category.id)}
					>
						<MoreHorizontal size={15} className="text-white/95" />
					</div>
				</div>
			)}
		</Draggable>
	);
}
