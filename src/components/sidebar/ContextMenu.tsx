import type { OptionsPosition, CategoryItem, NoteItem } from "@/types";
import type { FC, RefObject } from "react";

import { ContextMenuEnum, OptionTypesEnum } from "@/utils/enums";
import { LabelText } from "@/utils/constants";
import { createPortal } from "react-dom";

import { ContextMenuOption } from "./ContextMenuOption";

type CategoryMenuProps = { category: CategoryItem };
type NoteMenuProps = { note: NoteItem; setOptionsId: (id: string) => void };
type ContextMenuProps = {
	type: ContextMenuEnum;
	item: NoteItem | CategoryItem;
	optionsPosition: OptionsPosition;
	setOptionsId: (id: string) => void;
	contextMenuRef?: RefObject<HTMLDivElement> | null;
};

const NoteMenu: FC<NoteMenuProps> = () => {
	const removeFavoriteHandler = () => "";
	const moveToTrashHandler = () => "";
	const removeCategoryHandler = () => "";
	const downloadHandler = () => "";

	return (
		<nav className="flex flex-col gap-y-1 text-[0.9rem]">
			<ContextMenuOption
				type={ContextMenuEnum.NOTE}
				handler={removeFavoriteHandler}
				text={LabelText.REMOVE_FAVORITE}
			/>
			<ContextMenuOption
				type={ContextMenuEnum.NOTE}
				handler={moveToTrashHandler}
				text={LabelText.MOVE_TO_TRASH}
				optionType={OptionTypesEnum.delete}
			/>
			<ContextMenuOption
				type={ContextMenuEnum.NOTE}
				handler={removeCategoryHandler}
				text={LabelText.REMOVE_CATEGORY}
			/>
			<ContextMenuOption
				type={ContextMenuEnum.NOTE}
				handler={downloadHandler}
				text={LabelText.DOWNLOAD}
			/>
		</nav>
	);
};

const CategoryMenu: FC<CategoryMenuProps> = () => {
	const startRenameHandler = () => "";
	const removeCategoryHandler = () => "";

	return (
		<nav className="text-[0.9rem]">
			<ContextMenuOption
				type={ContextMenuEnum.CATEGORY}
				handler={startRenameHandler}
				text={LabelText.RENAME}
			/>
			<ContextMenuOption
				text={LabelText.DELETE_PERMANENTLY}
				type={ContextMenuEnum.CATEGORY}
				handler={removeCategoryHandler}
				optionType={OptionTypesEnum.delete}
			/>
		</nav>
	);
};

export const ContextMenu: FC<ContextMenuProps> = (props) => {
	const { item, type, setOptionsId, optionsPosition } = props;

	const cn = type === ContextMenuEnum.CATEGORY ? "category-menu" : "note-menu";

	return createPortal(
		<div tabIndex={0} onBlur={() => setOptionsId("")}>
			<div
				className={`options-context-menu ${cn}`}
				style={{
					visibility: "visible",
					top: optionsPosition.y + "px",
					left: optionsPosition.x + "px",
				}}
				onClick={(event) => event.stopPropagation()}
			>
				{type === ContextMenuEnum.CATEGORY ? (
					<CategoryMenu category={item as CategoryItem} />
				) : (
					<NoteMenu note={item as NoteItem} setOptionsId={setOptionsId} />
				)}
			</div>
		</div>,
		document.body,
	);
};
