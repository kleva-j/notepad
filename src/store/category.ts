import { atomWithStorage } from "jotai/utils";
import { focusAtom } from "jotai-optics";
import { CategoryState } from "@/types";

export const categoryStateAtom = atomWithStorage<CategoryState>(
	"categoryState",
	{
		categories: [
			{ text: "Homework", checked: false, id: 1 },
			{ text: "Study", checked: false, id: 2 },
			{ text: "Work", checked: false, id: 3 },
		],
		activeCategoryId: null,
	},
);

export const CategoriesAtom = focusAtom(categoryStateAtom, (optics) =>
	optics.prop("categories"),
);
export const activeCategoryIdAtom = focusAtom(categoryStateAtom, (optics) =>
	optics.prop("activeCategoryId"),
);
