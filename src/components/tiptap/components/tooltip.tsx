"use client";

import type { PropsWithChildren, ReactNode } from "react";
import type { Placement, Props } from "tippy.js";

import { useCallback } from "react";

import Tippy from "@tippyjs/react/headless";

type TooltipProps = PropsWithChildren<{
	enabled?: boolean;
	title?: string;
	shortcut?: string[];
	tippyOptions?: Omit<Partial<Props>, "content">;
	content?: ReactNode;
}>;

interface TippyProps {
	"data-placement": Placement;
	"data-reference-hidden"?: string;
	"data-escaped"?: string;
}

const isMac =
	typeof window !== "undefined"
		? navigator.platform.toUpperCase().includes("MAC")
		: false;

// const userAgent = navigator.userAgent.includes("Mac") ? "Mac" : "Windows";

const ShortcutKey = ({ children }: { children: string }): JSX.Element => {
	const className =
		"inline-flex items-center justify-center w-5 h-5 p-1 text-[0.625rem] rounded font-semibold leading-none border border-neutral-200 text-neutral-500 border-b-2";

	if (children === "Mod") {
		return <kbd className={className}>{isMac ? "⌘" : "Ctrl"}</kbd>; // ⌃
	}

	if (children === "Shift") {
		return <kbd className={className}>⇧</kbd>;
	}

	if (children === "Alt") {
		return <kbd className={className}>{isMac ? "⌥" : "Alt"}</kbd>;
	}

	return <kbd className={className}>{children}</kbd>;
};

export const Tooltip = ({
	tippyOptions = {},
	enabled = true,
	children,
	shortcut,
	title,
}: TooltipProps): JSX.Element => {
	const renderTooltip = useCallback(
		(attrs: TippyProps) => (
			<span
				className="z-[999] flex items-center gap-2 rounded-lg border border-neutral-100 bg-white px-2.5 py-1 shadow-sm"
				tabIndex={-1}
				data-placement={attrs["data-placement"]}
				data-reference-hidden={attrs["data-reference-hidden"]}
				data-escaped={attrs["data-escaped"]}
			>
				{title && (
					<span className="text-xs font-medium text-neutral-500">{title}</span>
				)}
				{shortcut && (
					<span className="flex items-center gap-0.5">
						{shortcut.map((shortcutKey: string) => (
							<ShortcutKey key={shortcutKey}>{shortcutKey}</ShortcutKey>
						))}
					</span>
				)}
			</span>
		),
		[shortcut, title],
	);

	if (enabled) {
		return (
			<Tippy
				delay={500}
				offset={[0, 8]}
				touch={false}
				zIndex={99999}
				appendTo={document.body}
				{...tippyOptions}
				render={renderTooltip}
			>
				<span>{children}</span>
			</Tippy>
		);
	}

	return <>{children}</>;
};

export default Tooltip;
