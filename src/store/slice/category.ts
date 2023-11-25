import { CategoryItem, CategoryState } from "@/types";
import { atomWithStorage } from "jotai/utils";
import { v4 as uuid } from "uuid";
import { atom } from "jotai";

export const addCategory = (
	categories: CategoryItem[],
	name: string,
): CategoryItem[] => {
	const newCategories = categories;
	newCategories.push({ id: `c-${uuid()}`, name, draggedOver: false });
	return newCategories;
};

export const updateCategory = (
	categories: CategoryItem[],
	id: string,
	payload: Partial<CategoryItem>,
): CategoryItem[] =>
	categories.map((category) =>
		category.id === id ? { ...category, ...payload } : category,
	);

export const swapCategories = (
	categories: CategoryItem[],
	payload: { sourceId: number; destinationId: number },
): CategoryItem[] => {
	const { sourceId, destinationId } = payload;
	const newCategories = [...categories];
	newCategories.splice(sourceId, 1);
	newCategories.splice(destinationId, 0, categories[sourceId] as CategoryItem);

	return newCategories;
};

export const categoryDragEnter = (
	categories: CategoryItem[],
	payload: Partial<CategoryItem>,
) => {
	categories = categories.map((category) =>
		category.id === payload.id ? { ...category, draggedOver: true } : category,
	);
};

export const categoryDragLeave = (
	categories: CategoryItem[],
	payload: Partial<CategoryItem>,
) => {
	categories = categories.map((category) =>
		category.id === payload.id ? { ...category, draggedOver: false } : category,
	);
};

export const deleteCategory = (
	categories: CategoryItem[],
	id: string,
): CategoryItem[] => categories.filter((category) => category.id !== id);

// CategoryState
export const initialCategoryState: CategoryState = {
	categories: [],
	error: "",
	loading: false,
};

export const updateCategoryState = (
	state: CategoryState,
	payload: Partial<CategoryState>,
): CategoryState => ({
	categories: payload.categories || state.categories,
	error: payload.error || "",
	loading: payload.loading || false,
});

export const CategoryStateAtom = atomWithStorage<CategoryState>(
	"categoryState",
	initialCategoryState,
);

export const updateCategoryStateAtom = atom(
	() => initialCategoryState,
	(get, set, payload: Partial<CategoryState>) => {
		set(
			CategoryStateAtom,
			updateCategoryState(get(CategoryStateAtom), payload),
		);
	},
);
