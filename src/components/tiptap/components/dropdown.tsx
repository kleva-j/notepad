import type  { PropsWithChildren } from "react";

import { cn } from "@/lib/utils";

export const DropdownCategoryTitle = ({ children }: PropsWithChildren) => {
	return (
		<div className="mb-1 px-1.5 text-[.65rem] font-semibold uppercase text-neutral-500 dark:text-neutral-400">
			{children}
		</div>
	);
};

type ButtonProps = PropsWithChildren<{
	isActive?: boolean;
	onClick?: () => void;
	disabled?: boolean;
	className?: string;
}>;

export const DropdownButton = (props: ButtonProps) => {
	const { children, isActive, onClick, disabled, className } = props;

	const buttonClass = cn(
		"flex items-center gap-2 p-1.5 text-sm font-medium text-neutral-500 dark:text-neutral-400 text-left bg-transparent w-full rounded",
		!isActive && !disabled,
		"hover:bg-neutral-100 hover:text-neutral-800 dark:hover:bg-neutral-900 dark:hover:text-neutral-200",
		isActive &&
			!disabled &&
			"bg-neutral-100 text-neutral-800 dark:bg-neutral-900 dark:text-neutral-200",
		disabled && "text-neutral-400 cursor-not-allowed dark:text-neutral-600",
		className,
	);

	return (
		<button className={buttonClass} disabled={disabled} onClick={onClick}>
			{children}
		</button>
	);
};
