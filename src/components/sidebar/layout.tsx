/* eslint-disable react-hooks/exhaustive-deps */
import { CategoriesAtom, activeCategoryIdAtom } from "@/store/category";
import { AnimatePresence, LayoutGroup, Reorder } from "framer-motion";
import { generateFakeCategories } from "@/utils/helpers";
import { CategoryListItem } from "@/sidebar/listitem";
import { memo, useCallback, useState } from "react";
import { Separator } from "@/ui/separator";
import { activeMenuAtom } from "@/store";
import { MenuEnum } from "@/utils/enums";
import { Button } from "@/ui/button";
import { Plus } from "lucide-react";
import { useAtom } from "jotai";
import { MenuBar } from ".";
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
	const [activeMenu, setActiveMenu] = useAtom(activeMenuAtom);
	const [activeId, setActiveId] = useAtom(activeCategoryIdAtom);
	const [selectedId, setSelectedId] = useState("");
	const [isOpen, setIsOpen] = useState(false);

	const handleClickItem = useCallback((id: string) => {
		setActiveMenu(MenuEnum.categories);
		setActiveId(id);
	}, []);

	const handleSelectCategory = useCallback((id: string) => {
		setSelectedId(id);
		setIsOpen(true);
	}, []);

	const handleRemoveCategory = useCallback(() => {
		if (!selectedId) return;
		setCategories((prev) =>
			prev.filter((category) => category.id !== selectedId),
		);
		setSelectedId("");
		setIsOpen(false);
	}, [selectedId]);

	const handleAddNewCategory = useCallback(() => {
		setCategories((prev) => [...prev, ...generateFakeCategories()]);
	}, []);

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
						onClick={handleAddNewCategory}
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
							{categories.map((item, order) => (
								<MemoizedCategoryListItem
									item={item}
									order={order}
									key={item.id}
									isActive={
										activeMenu === MenuEnum.categories && item.id === activeId
									}
									onClick={handleClickItem}
									onSelect={handleSelectCategory}
									onRemoveItem={handleRemoveCategory}
								/>
							))}
						</AnimatePresence>
					</Reorder.Group>
				</LayoutGroup>
			</div>
			<AlertDialog open={isOpen} onOpenChange={setIsOpen}>
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
		</section>
	);
}
