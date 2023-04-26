import React from "react";

import { FolderOption } from "@/component/sidebar/Folder";
import { Folder as FolderIcon } from "react-feather";
import { iconColor } from "@/utils/constants";
import { CategoryItem } from "@/types";
import { Folder } from "@/utils/enums";

interface CategoryOptionProps {
	category: CategoryItem;
	index: number;
}

export default function CategoryOptions({
	category,
}: CategoryOptionProps): JSX.Element {
	return (
		<>
			<FolderOption
				text={category.name}
				icon={<FolderIcon size={15} className="mr-3" color={iconColor} />}
				folder={Folder.CATEGORY}
				active={false}
				onClick={() => ""}
			/>
		</>
	);
}
