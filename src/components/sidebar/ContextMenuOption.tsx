import type { KeyboardEventHandler, MouseEventHandler } from "react";
import { type ContextMenuEnum, OptionTypesEnum } from "@/utils/enums";
import { ContextMenuStyleMap } from "@/utils/helpers";
import { cn } from "@/lib/utils";

type ContextMenuOptionProps = {
	handler: MouseEventHandler & KeyboardEventHandler;
	optionType?: OptionTypesEnum;
	type: ContextMenuEnum;
	text: string;
};

export const ContextMenuOption: React.FC<ContextMenuOptionProps> = ({
	type,
	text,
	handler,
	optionType,
	...rest
}) => {
	const optionHandler: MouseEventHandler & KeyboardEventHandler = (
		event: React.MouseEvent<Element, MouseEvent> & React.KeyboardEvent<Element>,
	) => handler(event);

	const className = cn(
		"flex items-center gap-4 px-5 py-1",
		ContextMenuStyleMap[type],
		optionType === OptionTypesEnum.delete && "hover:bg-red-500",
	);

	return (
		<div
			className={className}
			role="button"
			onClick={optionHandler}
			onKeyPress={optionHandler}
			tabIndex={0}
			{...rest}
		>
			{text}
		</div>
	);
};
