/* eslint-disable @typescript-eslint/no-unused-vars */
import CategoryOptions from "@/container/CategoryOptions";

import React, { useState, FormEvent, MouseEvent } from "react";
import {
	CategoriesAtom,
	CategoryAtom,
	addCategoryAtom,
	updateCategoryStateAtom,
} from "@/store/slice/category";
import { ChevronDown, ChevronRight, Layers, Plus } from "react-feather";
import { LabelText, iconColor } from "@/utils/constants";
import { ReactMouseEvent } from "@/types";
import { v4 as uuid } from "uuid";
import { useAtom } from "jotai";

export type Event = MouseEvent<HTMLDivElement, MouseEvent> | ReactMouseEvent;

export default function CategoryList() {
	// const [activeCategory, setActiveCategory] = useState("");
	const [isListOpen, setCategoryListOpen] = useState(false);
	const [isAddingCategory, setIsAddingCategory] = useState(false);

	const [categoryAtom] = useAtom(CategoriesAtom);
	const [, addNewCategory] = useAtom(addCategoryAtom);
	const [category, setCategory] = useAtom(CategoryAtom);
	const [, setCategoryState] = useAtom(updateCategoryStateAtom);

	const onSubmitNewCategory = (event: FormEvent<HTMLFormElement>): void => {
		event.preventDefault();

		const newCategory = { id: uuid(), name: category };

		if (
			!categoryAtom.find((cat) => cat.name === newCategory.name) ||
			!(newCategory.name === "")
		) {
			addNewCategory();
			setCategoryState({ categories: categoryAtom });
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

		console.log("Menu has been clicked");
		event.stopPropagation();
	};

	const handleCategoryRightClick = (event: Event, categoryId = "") => {
		event.preventDefault();
		handleOptionMenuClick(event, categoryId);
	};

	return (
		<section className="flex flex-col">
			<div className="mt-4 flex items-center justify-between py-2 pl-4">
				<button
					className="category-menulist m-0 flex cursor-pointer items-center bg-transparent p-0 text-sm text-[#d0d0d067]"
					onClick={() => setCategoryListOpen(!isListOpen)}
					aria-label={LabelText.COLLAPSE_CATEGORY}
				>
					{categoryAtom.length > 0 ? (
						isListOpen ? (
							<ChevronDown size={16} />
						) : (
							<ChevronRight size={16} />
						)
					) : (
						<Layers size={16} />
					)}
					<h2 className="pl-3 text-[13px] font-[600] uppercase">Categories</h2>
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
					{categoryAtom.map((category, index) => (
						<CategoryOptions
							key={category.id}
							index={index}
							category={category}
							handleMenuClick={handleOptionMenuClick}
							handleRightClick={handleCategoryRightClick}
						/>
					))}
					{isAddingCategory && (
						<form onSubmit={onSubmitNewCategory}>
							<input
								aria-label="Category name"
								type="text"
								autoFocus
								maxLength={20}
								className="m-2 ml-4 w-[150px] border-0 bg-[#2d2d2d]/5 p-2 text-[0.9rem] text-[#eeeeee]"
								value={category}
								placeholder="New category..."
								onChange={(evt) => setCategory(evt.target.value)}
								onBlur={() => setIsAddingCategory(false)}
							/>
						</form>
					)}
				</>
			)}
		</section>
	);
}
