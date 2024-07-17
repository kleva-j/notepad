import { DropdownButton, Toolbar, Surface } from "@/tiptap/components";
import { useCallback } from "react";
import { Icon } from "@/ui/icon";

import {
	DropdownMenuContent,
	DropdownMenuTrigger,
	DropdownMenu,
} from "@/ui/dropdown-menu";

const FONT_SIZES = [
	{ label: "Smaller", value: "12px" },
	{ label: "Small", value: "14px" },
	{ label: "Medium", value: "" },
	{ label: "Large", value: "18px" },
	{ label: "Extra Large", value: "24px" },
];

export type FontSizePickerProps = {
	onChange: (value: string) => void;
	value: string;
};

export const FontSizePicker = ({ onChange, value }: FontSizePickerProps) => {
	const currentValue = FONT_SIZES.find((size) => size.value === value);
	const currentSizeLabel = currentValue?.label.split(" ")[0] || "Medium";

	const selectSize = useCallback(
		(size: string) => () => onChange(size),
		[onChange],
	);

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Toolbar.Button active={!!currentValue?.value}>
					{currentSizeLabel}
					<Icon name="ChevronDown" className="h-2 w-2" />
				</Toolbar.Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent asChild>
				<Surface className="flex flex-col gap-1 px-2 py-4">
					{FONT_SIZES.map((size) => (
						<DropdownButton
							isActive={value === size.value}
							onClick={selectSize(size.value)}
							key={`${size.label}_${size.value}`}
						>
							<span style={{ fontSize: size.value }}>{size.label}</span>
						</DropdownButton>
					))}
				</Surface>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};
