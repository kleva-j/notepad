import { icons } from "lucide-react";
import { Icon } from "@/ui/icon";
import { useMemo } from "react";

import {
	DropdownMenuTrigger,
	DropdownMenuContent,
	DropdownMenu,
} from "@/ui/dropdown-menu";
import {
	DropdownCategoryTitle,
	DropdownButton,
	Surface,
	Toolbar,
} from "@/tiptap/components";

export type ContentTypePickerOption = {
	label: string;
	id: string;
	type: "option";
	disabled: () => boolean;
	isActive: () => boolean;
	onClick: () => void;
	icon: keyof typeof icons;
};

export type ContentTypePickerCategory = {
	label: string;
	id: string;
	type: "category";
};

export type ContentPickerOptions = Array<
	ContentTypePickerOption | ContentTypePickerCategory
>;

export type ContentTypePickerProps = {
	options: ContentPickerOptions;
};

const isOption = (
	option: ContentTypePickerOption | ContentTypePickerCategory,
): option is ContentTypePickerOption => option.type === "option";
const isCategory = (
	option: ContentTypePickerOption | ContentTypePickerCategory,
): option is ContentTypePickerCategory => option.type === "category";

export const ContentTypePicker = ({ options }: ContentTypePickerProps) => {
	const activeItem = useMemo(
		() =>
			options.find((option) => option.type === "option" && option.isActive()),
		[options],
	);

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Toolbar.Button
					active={activeItem?.id !== "paragraph" && !!activeItem?.type}
				>
					<Icon
						name={
							(activeItem?.type === "option" && activeItem.icon) || "Pilcrow"
						}
					/>
					<Icon name="ChevronDown" className="h-2 w-2" />
				</Toolbar.Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent asChild>
				<Surface className="flex flex-col gap-1 px-2 py-4">
					{options.map((option) => {
						if (isOption(option)) {
							return (
								<DropdownButton
									key={option.id}
									onClick={option.onClick}
									isActive={option.isActive()}
								>
									<Icon name={option.icon} className="mr-1 h-4 w-4" />
									{option.label}
								</DropdownButton>
							);
						} else if (isCategory(option)) {
							return (
								<div className="mt-2 first:mt-0" key={option.id}>
									<DropdownCategoryTitle key={option.id}>
										{option.label}
									</DropdownCategoryTitle>
								</div>
							);
						}
					})}
				</Surface>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};
