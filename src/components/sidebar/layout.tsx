"use client";

import type { CategoryItem } from "@/types";

import { CategoriesAtom, activeCategoryIdAtom } from "@/store/category";
import { DotsVerticalIcon } from "@radix-ui/react-icons";
import { Folder, FolderOpen, Plus } from "lucide-react";
import { Separator } from "@/ui/separator";
import { activeMenuAtom } from "@/store";
import { MenuEnum } from "@/utils/enums";
import { MenuBar, MenuItem } from ".";
import { Button } from "@/ui/button";
import { cn } from "@/lib/utils";
import { useAtom } from "jotai";
import { Each } from "@/Each";

export default function Layout() {
	const [categories] = useAtom(CategoriesAtom);
	const [activeMenu, setActiveMenu] = useAtom(activeMenuAtom);
	const [activeCategoryId, setActiveCategoryId] = useAtom(activeCategoryIdAtom);

	const handleClickItem = (id: number) => {
		setActiveMenu(MenuEnum.categories);
		setActiveCategoryId(id);
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
					>
						<span className="sr-only">Add</span>
						<Plus className="h-4 w-4" />
					</Button>
				</div>
				<Separator className="mb-4 mt-2 px-3" />
				<ul className="flex flex-col gap-y-2">
					<Each
						of={categories}
						onClick={handleClickItem}
						render={(
							item: CategoryItem,
							order: number,
							onClickItem?: (id: number) => void,
						) => {
							const isActive =
								activeMenu === MenuEnum.categories &&
								item.id === activeCategoryId;
							return (
								<MenuItem
									label={item.text}
									active={isActive}
									icon={isActive ? FolderOpen : Folder}
									handleClick={() => onClickItem?.(item.id)}
									className={cn(
										"bg-neutral-800/5 shadow",
										isActive && "bg-neutral-800 text-gray-200",
									)}
								>
									<DotsVerticalIcon className="-mr-1 ml-auto h-4 w-4 text-gray-600 transition-colors duration-300 hover:text-gray-500" />
								</MenuItem>
							);
						}}
					/>
				</ul>
			</div>
		</section>
	);
}
