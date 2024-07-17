import { memo, useCallback, useState } from "react";
import { HexColorPicker } from "react-colorful";
import { Toolbar } from "@/tiptap/components";
import { cn } from "@/lib/utils";
import { Icon } from "@/ui/icon";

const themeColors = [
	"#fb7185",
	"#fdba74",
	"#d9f99d",
	"#a7f3d0",
	"#a5f3fc",
	"#a5b4fc",
];

export type ColorButtonProps = {
	color?: string;
	active?: boolean;
	onColorChange?: (color: string) => void;
};

export const ColorButton = memo(
	({ color, active, onColorChange }: ColorButtonProps) => {
		const wrapperClassName = cn(
			"flex items-center justify-center px-1.5 py-1.5 rounded group",
			!active && "hover:bg-neutral-100",
			active && "bg-neutral-100",
		);
		const bubbleClassName = cn(
			"w-4 h-4 rounded bg-slate-100 shadow-sm ring-offset-2 ring-current",
			!active && `hover:ring-1`,
			active && `ring-1`,
		);

		const handleClick = useCallback(() => {
			if (onColorChange) {
				onColorChange(color || "");
			}
		}, [onColorChange, color]);

		return (
			<button onClick={handleClick} className={wrapperClassName}>
				<div
					style={{ backgroundColor: color, color: color }}
					className={bubbleClassName}
				></div>
			</button>
		);
	},
);

ColorButton.displayName = "ColorButton";

export type ColorPickerProps = {
	color?: string;
	onChange?: (color: string) => void;
	onClear?: () => void;
};

export const ColorPicker = ({ color, onChange, onClear }: ColorPickerProps) => {
	const [colorInputValue, setColorInputValue] = useState(color || "");

	const handleColorUpdate = useCallback(
		(event: React.ChangeEvent<HTMLInputElement>) => {
			setColorInputValue(event.target.value);
		},
		[],
	);

	const handleColorChange = useCallback(() => {
		const isCorrectColor = /^#([0-9A-F]{3}){1,2}$/i.test(colorInputValue);

		if (!isCorrectColor) {
			if (onChange) onChange("");
			return;
		}

		if (onChange) onChange(colorInputValue);
	}, [colorInputValue, onChange]);

	return (
		<div className="flex flex-col gap-2">
			<HexColorPicker
				className="w-full"
				color={color || ""}
				onChange={onChange}
			/>
			<input
				type="text"
				className="w-full rounded border border-neutral-200 bg-white p-2 text-black focus:outline-1 focus:outline-neutral-300 focus:ring-0 dark:border-neutral-800 dark:bg-black dark:text-white dark:focus:outline-neutral-700"
				placeholder="#000000"
				value={colorInputValue}
				onChange={handleColorUpdate}
				onBlur={handleColorChange}
			/>
			<div className="flex max-w-[15rem] flex-wrap items-center gap-1">
				{themeColors.map((currentColor) => (
					<ColorButton
						active={currentColor === color}
						color={currentColor}
						key={currentColor}
						onColorChange={onChange}
					/>
				))}
				<Toolbar.Button tooltip="Reset color to default" onClick={onClear}>
					<Icon name="Undo" />
				</Toolbar.Button>
			</div>
		</div>
	);
};
