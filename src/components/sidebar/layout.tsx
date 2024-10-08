/* eslint-disable react-hooks/exhaustive-deps */

"use client";

import type { KeyboardEventHandler } from "react";

import { CategoriesAtom, activeCategoryIdAtom } from "@/store/category";
import { AnimatePresence, LayoutGroup, Reorder } from "framer-motion";
import { memo, useCallback, useState, useRef } from "react";
import { menuSubject$, menuSubjectAtom } from "@/store";
import { DeleteWithNotesAtom } from "@/store/setting";
import { CategoryListItem } from "@/sidebar/listitem";
import { CategorySchema } from "@/utils/constants";
import { useAtom, useAtomValue } from "jotai";
import { Loader2, Plus } from "lucide-react";
import { useMousetrap } from "use-mousetrap";
import { generateId } from "@/utils/helpers";
import { Separator } from "@/ui/separator";
import { MenuEnum } from "@/utils/enums";
import { MenuBar, MenuItem } from ".";
import { Button } from "@/ui/button";
import { Input } from "@/ui/input";
import { cn } from "@/lib/utils";

import {
	AlertDialogDescription,
	AlertDialogContent,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogCancel,
	AlertDialogAction,
	AlertDialogTitle,
	AlertDialog,
} from "@/ui/alert-dialog";

const MemoizedCategoryListItem = memo(CategoryListItem);

export default function Layout() {
	const [categories, setCategories] = useAtom(CategoriesAtom);
	const [activeId, setActiveId] = useAtom(activeCategoryIdAtom);
	const [selectedId, setSelectedId] = useState<string | null>(null);
	const [showDialog, setShowDialog] = useState(false);

	const activeMenu = useAtomValue(menuSubjectAtom);
	const withNotes = useAtomValue(DeleteWithNotesAtom);

	const handleClickItem = useCallback((id: string) => {
		if (activeMenu !== MenuEnum.categories)
			menuSubject$.next(MenuEnum.categories);
		if (activeId !== id) setActiveId(id);
	}, []);

	const handleSelectCategory = useCallback((id: string) => {
		setSelectedId((prev) => (prev === id ? null : id));
	}, []);

	const handleRemoveCategory = useCallback(() => {
		if (!selectedId) return;
		setCategories((prev) => prev.filter(({ id }) => id !== selectedId));
		setSelectedId(null);
	}, [selectedId]);

	const inputRef = useRef<HTMLInputElement>(null);

	const addNewCategory = useCallback((text = "") => {
		if (inputRef.current && inputRef.current.value) {
			const isValid = CategorySchema.safeParse(inputRef.current.value);
			if (!isValid.success) return;
			setCategories((prev) => [
				...prev,
				{
					id: generateId("c"),
					text: inputRef.current?.value || text,
					checked: false,
				},
			]);
		}
	}, []);

	const handlePopup = useCallback(() => setShowDialog(true), []);

	const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = (e) => {
		if (e.key === "Enter") {
			e.preventDefault();
			addNewCategory();
			setShowDialog(false);
		}
	};

	// Create a new Category
	useMousetrap("command+m", handlePopup);

	return (
		<section className="flex h-full w-full max-w-[17rem] flex-col gap-y-4 border-r px-4 dark:bg-neutral-900">
			<MenuBar />
			<div className="mt-4 flex flex-col">
				<div className="flex items-center justify-between gap-x-2">
					<h3 className="px-2 text-xs font-semibold uppercase tracking-wider transition-colors duration-300 dark:text-zinc-600 dark:hover:text-zinc-500">
						Categories
					</h3>
					<Button
						variant="ghost"
						className="hover:bg-transparent dark:text-gray-600 dark:hover:text-gray-500"
						onClick={handlePopup}
					>
						<span className="sr-only">Add Category</span>
						<Plus className="h-4 w-4" />
					</Button>
				</div>
				<Separator className="mb-4 mt-2 px-3" />
				<LayoutGroup>
					<Reorder.Group
						axis="y"
						values={categories}
						onReorder={setCategories}
						className="no-scrollbar flex h-[65vh] flex-col gap-y-2 overflow-y-auto"
					>
						<AnimatePresence>
							{showDialog && (
								<MenuItem
									icon="Folder"
									className="w-full bg-neutral-200 text-sm capitalize shadow-sm dark:bg-neutral-800/5 dark:shadow"
								>
									<Input
										autoFocus
										type="text"
										ref={inputRef}
										placeholder="Enter name"
										onKeyDown={handleKeyDown}
										className={cn(
											"w-9/12 truncate whitespace-nowrap text-sm tracking-wide",
										)}
										onBlur={() => setShowDialog(false)}
									/>
									<Loader2 className="stroke-text-500 duration-[2000ms] ml-auto h-7 w-7 animate-spin cursor-pointer stroke-[1.2px] px-0.5 py-0.5 dark:text-gray-500 dark:hover:text-gray-400" />
								</MenuItem>
							)}
							{categories.map((item, order) => (
								<MemoizedCategoryListItem
									item={item}
									order={order}
									key={item.id}
									onClick={handleClickItem}
									onSelect={handleSelectCategory}
									isActive={
										activeMenu === MenuEnum.categories && item.id === activeId
									}
								/>
							))}
						</AnimatePresence>
					</Reorder.Group>
				</LayoutGroup>
			</div>
			{selectedId && (
				<AlertDialog
					open={!!selectedId}
					onOpenChange={(open) => setSelectedId(open ? selectedId : null)}
				>
					<AlertDialogContent>
						<AlertDialogHeader>
							<AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
							<AlertDialogDescription>
								This action cannot be undone. This will permanently delete this
								category with ID <strong>{selectedId}</strong>{" "}
								{withNotes && "and all associated notes"}.
							</AlertDialogDescription>
						</AlertDialogHeader>
						<AlertDialogFooter>
							<AlertDialogCancel>Cancel</AlertDialogCancel>
							<AlertDialogAction onClick={handleRemoveCategory}>
								Continue
							</AlertDialogAction>
						</AlertDialogFooter>
					</AlertDialogContent>
				</AlertDialog>
			)}
		</section>
	);
}
