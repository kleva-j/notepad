import React from "react";

import { Folder as FolderIcon, MoreHorizontal } from "react-feather";
import { iconColor } from "@/utils/constants";
import { CategoryItem } from "@/types";
import { type Event } from "./CategoryList";

interface CategoryOptionProps {
	category: CategoryItem;
	active?: boolean;
	index: number;
	handleMenuClick: (event: Event, categoryId: string) => void;
	handleRightClick: (event: Event, categoryId: string) => void;
}

export default function CategoryOptions({
	category,
	active,
	handleMenuClick,
}: CategoryOptionProps): JSX.Element {
	const handleClick = () => "";

	return (
		<button
			className="category-options flex w-full items-center justify-between bg-transparent pr-4 text-sm"
			onClick={handleClick}
		>
			<div
				className={`category-options ${
					active ? "active" : ""
				} flex cursor-pointer items-center gap-x-3.5 border-[1px] border-transparent bg-[#2d2d2d] px-4 py-2 font-semibold hover:bg-blend-lighten`}
			>
				<FolderIcon
					size={15}
					color={iconColor}
					style={{ stroke: active ? "#5183f5" : "#ffffff40" }}
				/>
				<span className="font-light">{category.name}</span>
			</div>
			<div
				className=""
				onClick={(event) => handleMenuClick(event, category.id)}
			>
				<MoreHorizontal size={15} className="text-white/95" />
			</div>
		</button>
	);
}
