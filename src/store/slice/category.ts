import { CategoryItem, CategoryState } from "@/types";
import { categoryList } from "@/utils/constants";
import { atomWithStorage } from "jotai/utils";
import { atom } from "jotai";

// CategoryState
export const initialCategoryState: CategoryState = {
	categories: categoryList,
	error: "",
	loading: false,
};

export const CategoryStateAtom = atomWithStorage<CategoryState>(
	"categoryState",
	initialCategoryState,
);
