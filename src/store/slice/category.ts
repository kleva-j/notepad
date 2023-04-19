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

// CategoryState
export const sampleCategoryState: CategoryState = {
	categories: [],
	error: "",
	loading: false,
};

export const updateCategoryState = (
	state: CategoryState,
	payload: Partial<CategoryState>
): CategoryState => ({
	categories: payload.categories || state.categories,
	error: payload.error || "",
	loading: payload.loading || false,
});

export const CategoryStateAtom = atom<CategoryState>(sampleCategoryState);

export const updateCategoryStateAtom = atom(
	() => sampleCategoryState,
	(get, set, payload: Partial<CategoryState>) => {
		set(
			CategoryStateAtom,
			updateCategoryState(get(CategoryStateAtom), payload)
		);
	}
);
