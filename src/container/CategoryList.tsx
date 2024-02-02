"use client";

import { ChevronDown, ChevronRight, Layers, Plus } from "lucide-react";
import { AddCategoryForm } from "@/components/sidebar/AddCategoryForm";
import { UseNotesContext, UseCategoryContext } from "@/lib/context";
import { Popover, PopoverTrigger } from "@/components/ui/popover";
import { NotesActions, CategoryActions } from "@/lib/constants";
import { CategoryOptions } from "@/container/CategoryOptions";
import { AnimatePresence } from "framer-motion";
import { LabelText } from "@/utils/constants";
import { useDroppable } from "@dnd-kit/core";
import { useState, useEffect } from "react";
import { Each } from "@/components/Each";
import { Folder } from "@/utils/enums";
import {
	verticalListSortingStrategy,
	SortableContext,
} from "@dnd-kit/sortable";

export default function CategoryList() {
	const { state: noteState, dispatch: dispatchNotes } = UseNotesContext();
	const { state: categoryState, dispatch } = UseCategoryContext();
	const { activeFolder, activeCategoryId } = noteState;
	const { categories: list } = categoryState;
	const { SET_ACTIVE_CATEGORY_ID } = NotesActions;
	const { ADD_NEW_CATEGORY } = CategoryActions;

	const [isListOpen, setCategoryListOpen] = useState(false);
	const [isPopoverOpen, setIsPopoverOpen] = useState(false);

	useEffect(() => {
		list.length > 0 && setCategoryListOpen(true);
	}, [list.length]);

	const onSubmitNewCategory = (title: string): void => {
		const notFound = list.findIndex((c) => c.name === title) < 0 ? 1 : 0;
		setIsPopoverOpen(false);
		!!notFound && dispatch({ type: ADD_NEW_CATEGORY, payload: title });
	};

	const handleAddCategory = () => {
		!isListOpen && setCategoryListOpen(true);
	};

	const handleClick = (id: string) =>
		dispatchNotes({ type: SET_ACTIVE_CATEGORY_ID, payload: id });

	const { setNodeRef } = useDroppable({ id: "droppable-category-options" });

	return (
		<section className="flex flex-col">
			<div className="group mt-4 flex items-center justify-between py-2 pl-4">
				<div
					className="m-0 flex cursor-pointer items-center bg-transparent p-0 text-sm text-foreground/50"
					onClick={() => setCategoryListOpen(!isListOpen)}
					aria-label={LabelText.COLLAPSE_CATEGORY}
					tabIndex={0}
				>
					{list.length > 0 ? (
						isListOpen ? (
							<ChevronDown size={16} />
						) : (
							<ChevronRight size={16} />
						)
					) : (
						<Layers size={16} className="hover:text-foreground/80" />
					)}
					<h2 className="pl-3 text-[0.8125rem] font-semibold uppercase group-hover:text-foreground/80">
						Categories
					</h2>
				</div>
				<Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
					<PopoverTrigger asChild>
						<button
							className="flex cursor-pointer items-center border-0 bg-transparent px-4 py-2 text-sm"
							onClick={handleAddCategory}
							aria-label={LabelText.ADD_CATEGORY}
						>
							<Plus
								size={16}
								className="text-foreground/50 hover:text-foreground/80"
							/>
						</button>
					</PopoverTrigger>
					<AddCategoryForm onSubmit={onSubmitNewCategory} />
				</Popover>
			</div>

			<ul ref={setNodeRef} className="">
				<AnimatePresence aria-label="Category list" initial={false}>
					<SortableContext items={list} strategy={verticalListSortingStrategy}>
						{isListOpen && (
							<Each
								of={list}
								render={(category, index) => (
									<CategoryOptions
										index={index}
										key={category.id}
										category={category}
										handleMenuClick={() => {}}
										handleRightClick={() => {}}
										handleClick={() => handleClick(category.id)}
										active={
											activeFolder === Folder.CATEGORY &&
											category.id === activeCategoryId
										}
									/>
								)}
							/>
						)}
					</SortableContext>
				</AnimatePresence>
			</ul>
		</section>
	);
}
