/* eslint-disable @typescript-eslint/no-unused-vars */
import CategoryOptions from "@/container/CategoryOptions";

import React, { useRef, useState, FormEvent, MouseEvent } from "react";

import { ChevronDown, ChevronRight, Layers, Plus } from "react-feather";
import { UseNotesContext, UseCategoryContext } from "@/lib/context";
import { NotesActions, CategoryActions } from "@/lib/constants";
import { LabelText, iconColor } from "@/utils/constants";
import { ReactMouseEvent, ClickEvent } from "@/types";
import { Droppable } from "react-beautiful-dnd";
import { Folder } from "@/utils/enums";

export default function CategoryList() {
	const inputRef = useRef<HTMLInputElement>(null);

	const { state: noteState, dispatch: dispatchNotes } = UseNotesContext();
	const { state: categoryState, dispatch } = UseCategoryContext();
	const { activeFolder, activeCategoryId } = noteState;
	const { categories } = categoryState;

	const [isAddingCategory, setIsAddingCategory] = useState(false);
	const [isListOpen, setCategoryListOpen] = useState(false);

	const onSubmitNewCategory = (event: FormEvent<HTMLFormElement>): void => {
		event.preventDefault();
		const name = inputRef.current?.value || "";

		if (!categories.find((cat) => cat.name === name) || !(name === "")) {
			dispatch({
				type: CategoryActions.ADD_NEW_CATEGORY,
				payload: name,
			});
		}
		setIsAddingCategory(false);
	};

	const handleAddCategory = () => {
		setIsAddingCategory(true);
		!isListOpen && setCategoryListOpen(true);
	};

	const handleOptionMenuClick = (
		event: MouseEvent<HTMLDivElement, MouseEvent> | ReactMouseEvent,
		_categoryId = ""
	) => {
		const clicked = event.target;
		if (!clicked) return;

		event.stopPropagation();
	};

	const handleCategoryRightClick = (event: ClickEvent, categoryId = "") => {
		event.preventDefault();
		handleOptionMenuClick(event, categoryId);
	};

	const handleClick = (id: string) =>
		dispatchNotes({
			type: NotesActions.SET_ACTIVE_CATEGORY_ID,
			payload: id,
		});

	return (
		<section className="flex flex-col">
			<div className="mt-4 flex items-center justify-between py-2 pl-4">
				<button
					className="category-menulist m-0 flex cursor-pointer items-center bg-transparent p-0 text-sm text-[#d0d0d067]"
					onClick={() => setCategoryListOpen(!isListOpen)}
					aria-label={LabelText.COLLAPSE_CATEGORY}
				>
					{categories.length > 0 ? (
						isListOpen ? (
							<ChevronDown size={16} />
						) : (
							<ChevronRight size={16} />
						)
					) : (
						<Layers size={16} />
					)}
					<h2 className="pl-3 text-[0.8125rem] font-[600] uppercase">
						Categories
					</h2>
				</button>
				<button
					className="category-button flex cursor-pointer items-center border-0 bg-transparent px-4 py-2 text-sm text-[#d0d0d0]/20 hover:text-white"
					onClick={handleAddCategory}
					aria-label={LabelText.ADD_CATEGORY}
				>
					<Plus size={16} color={iconColor} />
				</button>
			</div>

			{isListOpen && (
				<>
					<Droppable type="CATEGORY" droppableId="category-list">
						{(provided) => (
							<div
								{...provided.droppableProps}
								ref={provided.innerRef}
								className="category-list"
								aria-label="Category list"
							>
								{categories.map((category, index) => (
									<CategoryOptions
										key={category.id}
										index={index}
										category={category}
										active={
											activeFolder === Folder.CATEGORY &&
											category.id === activeCategoryId
										}
										handleClick={() => handleClick(category.id)}
										handleMenuClick={handleOptionMenuClick}
										handleRightClick={handleCategoryRightClick}
									/>
								))}
								{provided.placeholder}
							</div>
						)}
					</Droppable>
					{isAddingCategory && (
						<form onSubmit={onSubmitNewCategory}>
							<input
								type="text"
								autoFocus
								ref={inputRef}
								maxLength={20}
								aria-label="Category name"
								placeholder="New category..."
								onBlur={() => setIsAddingCategory(false)}
								className="m-2 ml-4 w-[150px] border-0 bg-[#2d2d2d]/5 p-2 text-[0.9rem] text-[#eeeeee]"
							/>
						</form>
					)}
				</>
			)}
		</section>
	);
}
