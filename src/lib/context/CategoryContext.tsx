/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { PropsWithChildren, createContext, useContext } from "react";
import {
	updateCategoryState,
	CategoryStateAtom,
	swapCategories,
	addCategory,
} from "@/store/slice/category";
import { CategoryActions } from "@/lib/constants";
import { useReducerAtom } from "jotai/utils";
import { CategoryState } from "@/types";

type Action = { type: keyof typeof CategoryActions; payload?: any };
type Dispatch = (action: Action) => void;
type State = CategoryState;

const CategoryContext = createContext<
	{ state: State; dispatch: Dispatch } | undefined
>(undefined);

export function UseCategoryContext() {
	const context = useContext(CategoryContext);
	if (context === undefined)
		throw new Error(
			`UseCategoryContext must be used within a CategoryProvider`,
		);
	return context;
}

function CategoryReducer(state: State, { type, payload }: Action) {
	switch (type) {
		case CategoryActions.ADD_NEW_CATEGORY: {
			return updateCategoryState(state, {
				categories: addCategory(state.categories, payload),
			});
		}
		case CategoryActions.SWAP_CATEGORY: {
			return updateCategoryState(state, {
				categories: swapCategories(state.categories, payload),
			});
		}
		case CategoryActions.SET_CATEGORIES_SUCCESS: {
			return updateCategoryState(state, { error: "", loading: false });
		}
		case CategoryActions.SET_CATEGORIES_LOADING: {
			return updateCategoryState(state, { error: "", loading: true });
		}
		case CategoryActions.SET_CATEGORIES_ERROR: {
			return updateCategoryState(state, { error: payload, loading: false });
		}
		default: {
			throw new Error(`Unhandled Category action type: ${type}`);
		}
	}
}

export function CategoryProvider({ children }: PropsWithChildren) {
	const [state, dispatch] = useReducerAtom(CategoryStateAtom, CategoryReducer);
	const value = { state, dispatch };
	return (
		<CategoryContext.Provider value={value}>
			{children}
		</CategoryContext.Provider>
	);
}
