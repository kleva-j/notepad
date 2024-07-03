import { atomWithStorage } from "jotai/utils";
import { focusAtom } from "jotai-optics";
import { CategoryState } from "@/types";

export const categoryStateAtom = atomWithStorage<CategoryState>(
	"categoryState",
	{
		categories: [],
		activeCategoryId: null,
	},
);

export const CategoriesAtom = focusAtom(categoryStateAtom, (optics) =>
	optics.prop("categories"),
);
export const activeCategoryIdAtom = focusAtom(categoryStateAtom, (optics) =>
	optics.prop("activeCategoryId"),
);
