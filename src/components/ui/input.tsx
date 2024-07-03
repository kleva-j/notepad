"use client";

import { cva, type VariantProps } from "class-variance-authority";

import { forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface InputProps
	extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = forwardRef<HTMLInputElement, InputProps>(
	({ className, type, ...props }, ref) => {
		return (
			<input
				type={type}
				className={cn(
					// "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
					"size-full bg-transparent text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-neutral-400 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 dark:placeholder:text-neutral-600",
					className,
				)}
				ref={ref}
				{...props}
			/>
		);
	},
);

const rootVariants = cva(
	"py-1 px-2 flex rounded gap-1 items-center transition duration-200",
	{
		variants: {
			variant: {
				// outline
				default:
					"border ring-neutral-800 ring-neutral-300 focus-within:ring-2 focus-within:ring-offset-2 dark:focus-within:ring-neutral-400 focus-within:ring-offset-white dark:focus-within:ring-offset-black focus-within:ring-neutral-600",

				underlined:
					"border-b-[1px] dark:border-neutral-800 focus-within:border-b-2 dark:focus-within:border-neutral-400 focus-within:border-neutral-500 rounded-none px-0",

				filled:
					"bg-neutral-100 dark:bg-neutral-900 dark:text-neutral-100 focus-within:bg-neutral-200 dark:focus-within:bg-neutral-800",

				ghost:
					"bg-transparent dark:bg-transparent dark:text-neutral-100 focus-within:bg-neutral-100 dark:focus-within:bg-neutral-900",
				neubrutalism:
					"border border-neutral-700 rounded-sm shadow-[2px_2px_0px_rgb(82,82,91)] dark:shadow-[2px_2px_0px_rgb(82,82,91)] focus-within:bg-yellow-50 dark:focus-within:bg-neutral-900/40",
				// with floating label
			},
			size: {
				sm: "h-8",
				default: "h-10",
				lg: "h-12",
			},
		},
		defaultVariants: {
			variant: "default",
			size: "default",
		},
	},
);

type InputBlockProps = {
	root?: VariantProps<typeof rootVariants> & {
		className?: string;
	};
	leftIcon?: React.ReactNode;
	rightIcon?: React.ReactNode;
} & InputProps;

const InputBlock = ({
	root: { size, variant, className } = { size: "default", variant: "default" },
	leftIcon,
	rightIcon,
	...input
}: InputBlockProps) => (
	<div className={cn(rootVariants({ variant, size, className }))}>
		{leftIcon && <span className="px-1">{leftIcon}</span>}
		<Input {...input} />
		{rightIcon && <span className="px-1">{rightIcon}</span>}
	</div>
);

export { Input, InputBlock };

Input.displayName = "Input";
InputBlock.displayName = "InputBlock";
