import CategoryOptions from "@/container/CategoryOptions";

import { ChevronDown, ChevronRight, Layers, Plus } from "lucide-react";
import { AddCategoryForm } from "@/component/sidebar/AddCategoryForm";
import { UseNotesContext, UseCategoryContext } from "@/lib/context";
import { NotesActions, CategoryActions } from "@/lib/constants";
import { useRef, useState, FormEvent, useEffect } from "react";
import { LabelText, iconColor } from "@/utils/constants";
import { Droppable } from "react-beautiful-dnd";
import { Folder } from "@/utils/enums";
import { ClickEvent } from "@/types";

export default function CategoryList() {
	const inputRef = useRef<HTMLInputElement>(null);

	const { state: noteState, dispatch: dispatchNotes } = UseNotesContext();
	const [optionsPosition, setOptionsPosition] = useState({ x: 0, y: 0 });
	const { state: categoryState, dispatch } = UseCategoryContext();
	const [isAddingCategory, setIsAddingCategory] = useState(false);
	const { activeFolder, activeCategoryId } = noteState;
	const { categories } = categoryState;

	const [isListOpen, setCategoryListOpen] = useState(false);

	useEffect(() => {
		categories.length > 0 && setCategoryListOpen(true);
	}, [categories.length]);

	const onSubmitNewCategory = (event: FormEvent<HTMLFormElement>): void => {
		event.preventDefault();
		const name = inputRef.current?.value || "";

		if (!categories.find((c) => c.name === name) || !(name === "")) {
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

	const openMenuOption = (event: ClickEvent, categoryId = "") => {
		const clicked = event.target;
		if (!clicked) return;

		if ("clientX" in event && "clientY" in event)
			setOptionsPosition(() => ({ x: event.clientX, y: event.clientY }));

		event.stopPropagation();
		setOptionsId(!optionsId || optionsId !== categoryId ? categoryId : "");
	};

	const handleRightClick = (event: Event | ClickEvent, categoryId = "") => {
		event.preventDefault();
		openMenuOption(event as ClickEvent, categoryId);
	};

	const handleClick = (id: string) =>
		dispatchNotes({
			type: NotesActions.SET_ACTIVE_CATEGORY_ID,
			payload: id,
		});

	const [optionsId, setOptionsId] = useState("");

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
										index={index}
										key={category.id}
										category={category}
										optionsId={optionsId}
										options={optionsPosition}
										setOptionsId={setOptionsId}
										handleMenuClick={openMenuOption}
										handleRightClick={handleRightClick}
										handleClick={() => handleClick(category.id)}
										active={
											activeFolder === Folder.CATEGORY &&
											category.id === activeCategoryId
										}
									/>
								))}
								{provided.placeholder}
							</div>
						)}
					</Droppable>
					{isAddingCategory && (
						<AddCategoryForm
							ref={inputRef}
							setIsAddingCategory={setIsAddingCategory}
							onSubmit={onSubmitNewCategory}
						/>
					)}
				</>
			)}
		</section>
	);
}
