import React, { DragEvent } from "react";

import { Folder as FolderIcon, MoreHorizontal } from "react-feather";
import { Draggable } from "react-beautiful-dnd";
import { iconColor } from "@/utils/constants";
import { CategoryItem, ClickEvent } from "@/types";

interface CategoryOptionProps {
	category: CategoryItem;
	active?: boolean;
	index: number;
	handleClick?: () => void;
	handleMenuClick: (event: ClickEvent, categoryId: string) => void;
	handleRightClick: (event: ClickEvent, categoryId: string) => void;
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
					<div onClick={(event) => handleMenuClick(event, category.id)}>
						<MoreHorizontal size={15} className="text-white/95" />
					</div>
				</div>
			)}
		</Draggable>
	);
}
