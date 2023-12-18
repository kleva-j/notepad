import { ContextMenuEnum, OptionTypesEnum } from "@/utils/enums";
import { KeyboardEventHandler, MouseEventHandler } from "react";
import { ContextMenuStyleMap } from "@/utils/helpers";
import { Icon } from "react-feather";
import { cn } from "@/utils/helpers";

type ContextMenuOptionProps = {
	handler: MouseEventHandler & KeyboardEventHandler;
	optionType?: OptionTypesEnum;
	type: ContextMenuEnum;
	text: string;
	icon: Icon;
};

export const ContextMenuOption: React.FC<ContextMenuOptionProps> = ({
	type,
	text,
	handler,
	optionType,
	icon: IconCmp,
	...rest
}) => {
	const optionHandler: MouseEventHandler & KeyboardEventHandler = (
		event: React.MouseEvent<Element, MouseEvent> & React.KeyboardEvent<Element>,
	) => handler(event);

	const className = cn(
		"flex items-center gap-4 px-5 py-1",
		ContextMenuStyleMap[type],
		optionType === OptionTypesEnum.delete &&
			"hover:bg-red-500 hover:text-[#f2f2f2]",
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
			<IconCmp className="nav-item-icon" size={18} />
			{text}
		</div>
	);
};
