"use client";

import { AnimatePresence, motion, MotionConfig } from "framer-motion";
import { Folder, Settings2, File, Share2 } from "lucide-react";
import { AddCategory } from "@/editor/toolbar/AddCategory";
import { AddNote } from "@/editor/toolbar/AddNote";
import { useEffect, useRef, useState } from "react";
import { useOnClickOutside } from "usehooks-ts";
import { Button } from "@/ui/button";
import { cn } from "@/lib/utils";

import useMeasure from "react-use-measure";

const ITEMS = [
	{
		id: 1,
		label: "User",
		title: <File className="h-5 w-5" />,
		content: AddNote,
	},
	{
		id: 2,
		label: "Categories",
		title: <Folder className="h-5 w-5" />,
		content: AddCategory,
	},
	{
		id: 3,
		label: "settings",
		title: <Settings2 className="h-5 w-5" />,
		content: () => (
			<div className="flex flex-col space-y-4">
				<span className="text-zinc-600">Open Settings.</span>
				<Button variant="secondary">Open</Button>
			</div>
		),
	},
	{
		id: 4,
		label: "Share",
		title: <Share2 className="h-5 w-5" />,
		content: () => (
			<div className="flex flex-col space-y-4">
				<span className="text-zinc-600">
					Click button to copy shareable link.
				</span>
				<Button variant="secondary">Copy</Button>
			</div>
		),
	},
];

export function ExpandableToolbar() {
	const [active, setActive] = useState<number | null>(null);
	const [contentRef, { height: heightContent }] = useMeasure();
	const [menuRef, { width: widthContainer }] = useMeasure();
	const ref = useRef<HTMLDivElement>(null);
	const [isOpen, setIsOpen] = useState(false);
	const [maxWidth, setMaxWidth] = useState(0);

	const replayCallback = () => {
		setIsOpen(false);
		setActive(null);
	};

	useOnClickOutside(ref, replayCallback);

	useEffect(() => {
		if (!widthContainer || maxWidth > 0) return;

		setMaxWidth(widthContainer);
	}, [widthContainer, maxWidth]);

	return (
		<MotionConfig transition={{ type: "spring", bounce: 0.1, duration: 0.25 }}>
			<div className="absolute bottom-8 left-8" ref={ref}>
				<div className="h-full w-full rounded-xl border border-zinc-950/10 bg-white dark:border-zinc-500/50 dark:bg-neutral-900">
					<div className="overflow-hidden">
						<AnimatePresence initial={false} mode="sync">
							{isOpen ? (
								<motion.div
									key="content"
									initial={{ height: 0 }}
									animate={{ height: heightContent || 0 }}
									exit={{ height: 0 }}
									style={{ width: maxWidth }}
								>
									<div ref={contentRef} className="p-2">
										{ITEMS.map((item) => {
											const isSelected = active === item.id;
											const Content = item.content;

											return (
												<motion.div
													key={item.id}
													initial={{ opacity: 0 }}
													animate={{ opacity: isSelected ? 1 : 0 }}
													exit={{ opacity: 0 }}
												>
													<div
														className={cn(
															"px-2 pt-2 text-sm",
															isSelected ? "block" : "hidden",
														)}
													>
														<Content replayAction={replayCallback} />
													</div>
												</motion.div>
											);
										})}
									</div>
								</motion.div>
							) : null}
						</AnimatePresence>
					</div>
					<div className="flex space-x-2 p-2" ref={menuRef}>
						{ITEMS.map((item) => (
							<button
								key={item.id}
								aria-label={item.label}
								className={cn(
									"relative flex h-9 w-9 shrink-0 scale-100 select-none appearance-none items-center justify-center rounded-lg text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-zinc-800 focus-visible:ring-2 active:scale-[0.98] dark:hover:bg-amber-400",
									active === item.id ? "bg-amber-400 text-zinc-800" : "",
								)}
								type="button"
								onClick={() => {
									if (!isOpen) setIsOpen(true);
									if (active === item.id) {
										setIsOpen(false);
										setActive(null);
										return;
									}

									setActive(item.id);
								}}
							>
								{item.title}
							</button>
						))}
					</div>
				</div>
			</div>
		</MotionConfig>
	);
}