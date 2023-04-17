import { CategoryItem, CategoryState } from "@/types";
import { v4 as uuid } from "uuid";
import { atom } from "jotai";
import { UUID } from "crypto";

export const addCategory = (
	categories: CategoryItem[],
	name: string
): CategoryItem[] => [...categories, { id: `c-${uuid()}`, name }];

export const deleteCategory = (
	categories: CategoryItem[],
	id: string
): CategoryItem[] => categories.filter((category) => category.id !== id);

export const initialCategoryState: CategoryState = {
	categories: [],
	error: "",
	loading: false,
};

export const CategoryAtom = atom<string>("");
export const CategoriesAtom = atom<CategoryItem[]>([]);
export const addCategoryAtom = atom(
	() => "",
	(get, set) => {
		set(CategoriesAtom, addCategory(get(CategoriesAtom), get(CategoryAtom)));
		set(CategoryAtom, "");
	}
);

export const deleteCategoryAtom = atom(
	() => "",
	(get, set, id: UUID) => {
		set(CategoriesAtom, deleteCategory(get(CategoriesAtom), id));
	}
);
