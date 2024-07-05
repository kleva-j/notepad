/* eslint-disable react-hooks/exhaustive-deps */

import type { KeyboardEventHandler } from "react";

import { CategoriesAtom, activeCategoryIdAtom } from "@/store/category";
import { AnimatePresence, LayoutGroup, Reorder } from "framer-motion";
import { memo, useCallback, useState, useRef } from "react";
import { CategoryListItem } from "@/sidebar/listitem";
import { Folder, Loader2, Plus } from "lucide-react";
import { generateId } from "@/utils/helpers";
import { Separator } from "@/ui/separator";
import { activeMenuAtom } from "@/store";
import { MenuEnum } from "@/utils/enums";
import { MenuBar, MenuItem } from ".";
import { Button } from "@/ui/button";
import { Input } from "@/ui/input";
import { cn } from "@/lib/utils";
import { useAtom } from "jotai";
import { z } from "zod";
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

const CategorySchema = z
	.string()
	.min(1, { message: "Must be 1 or more characters long" })
	.max(15, { message: "Must be 15 or fewer characters long" });

export default function Layout() {
	const [categories, setCategories] = useAtom(CategoriesAtom);
	const [activeMenu, setActiveMenu] = useAtom(activeMenuAtom);
	const [activeId, setActiveId] = useAtom(activeCategoryIdAtom);
	const [selectedId, setSelectedId] = useState<string | null>(null);
	const [showDialog, setShowDialog] = useState(false);

	const handleClickItem = useCallback((id: string) => {
		if (activeMenu !== MenuEnum.categories) setActiveMenu(MenuEnum.categories);
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

	return (
		<section className="flex h-full w-full max-w-[17rem] flex-col gap-y-4 bg-neutral-900 px-4">
			<MenuBar />
			<div className="mt-4 flex flex-col">
				<div className="flex items-center justify-between gap-x-2">
					<h3 className="px-2 text-xs uppercase tracking-wider text-gray-600 transition-colors duration-300 hover:text-gray-500">
						Categories
					</h3>
					<Button
						variant="ghost"
						className="text-gray-600 hover:bg-transparent hover:text-gray-500"
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
						className="no-scrollbar flex h-[69vh] flex-col gap-y-2 overflow-y-auto"
					>
						<AnimatePresence>
							{showDialog && (
								<MenuItem
									icon={Folder}
									className="w-full bg-neutral-800/5 text-sm capitalize shadow"
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
									<Loader2 className="stroke-text-500 duration-[2000ms] ml-auto h-7 w-7 animate-spin cursor-pointer stroke-[1.2px] px-0.5 py-0.5 text-gray-500 hover:text-gray-400" />
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
								This action cannot be undone. This will permanently delete and
								remove your data from our servers.
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
