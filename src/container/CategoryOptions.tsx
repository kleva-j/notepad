import { HandleOptionsEvent, OptionsPosition, CategoryItem } from "@/types";
import { Folder as FolderIcon, MoreHorizontal } from "lucide-react";
import { ContextMenu } from "@/components/sidebar/ContextMenu";
import { ContextMenuEnum } from "@/utils/enums";
import { Draggable } from "react-beautiful-dnd";
import { iconColor } from "@/utils/constants";
import { DragEvent } from "react";

interface CategoryOptionProps {
	index: number;
	active?: boolean;
	optionsId: string;
	category: CategoryItem;
	options: OptionsPosition;
	setOptionsId: React.Dispatch<React.SetStateAction<string>>;
	handleClick?: () => void;
	handleMenuClick: HandleOptionsEvent;
	handleRightClick: HandleOptionsEvent;
}

export default function CategoryOptions({
	index,
	active,
	options,
	category,
	optionsId,
	handleClick,
	setOptionsId,
	handleMenuClick,
	handleRightClick,
}: CategoryOptionProps): JSX.Element {
	return (
		<Draggable draggableId={category.id} index={index}>
			{(provided, snapshot) => (
				<div
					tabIndex={0}
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
					onContextMenu={(event) => handleRightClick(event, category.id)}
					onFocus={() => console.log("Menu option is in focus")}
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
						<MoreHorizontal
							size={15}
							className="text-white/95 hover:cursor-pointer"
						/>
					</div>
					{optionsId === category.id && (
						<ContextMenu
							item={category}
							optionsPosition={options}
							setOptionsId={setOptionsId}
							type={ContextMenuEnum.CATEGORY}
						/>
					)}
				</div>
			)}
		</Draggable>
	);
}
