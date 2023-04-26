import CategoryOptions from "@/container/CategoryOptions";
import React, { useState, FormEvent } from "react";

import {
	CategoriesAtom,
	CategoryAtom,
	addCategoryAtom,
	updateCategoryStateAtom,
} from "@/store/slice/category";
import { ChevronDown, ChevronRight, Layers, Plus } from "react-feather";
import { LabelText, iconColor } from "@/utils/constants";
import { v4 as uuid } from "uuid";
import { useAtom } from "jotai";

export default function CategoryList() {
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

	return (
		<section className="flex flex-col">
			<div className="mt-4 flex items-center justify-between py-2 pl-4">
				<button
					className="category-menulist m-0 flex cursor-pointer items-center bg-transparent p-0 text-sm text-[#d0d0d0]/25"
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
					<h2 className="pl-3 text-[13px] font-bold uppercase">Categories</h2>
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
						/>
					))}
					{isAddingCategory && (
						<form className="category-form" onSubmit={onSubmitNewCategory}>
							<input
								aria-label="Category name"
								type="text"
								autoFocus
								maxLength={20}
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
