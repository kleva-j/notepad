import type { ReactElement } from "react";

import { Reorder, useDragControls, useMotionValue } from "framer-motion";
import { useRaisedShadow } from "@/lib/hooks/useRaisedShadow";
import { CardContent, Card } from "@/components/ui/card";
import { ListItemVariants } from "@/utils/motion";
import { CategoryItem, NoteItem } from "@/types";
import { Grip, Star } from "lucide-react";
import { Folder } from "@/utils/enums";
import { cn } from "@/lib/utils";

import dayjs from "dayjs";

type NoteProps = {
	index: number;
	note: NoteItem;
	title: string | ReactElement;
	isSelected: boolean;
	activeFolder: Folder;
	category?: CategoryItem;
	handlePrune: (id: string) => void;
};

export const NoteCard = (props: NoteProps) => {
	const { note, index, isSelected, title, handlePrune } = props;
	const { id, created, favorite } = note;

	const [day, date, time] = dayjs(new Date(created))
		.format("MMM DD hh:mm")
		.split(" ");

	const y = useMotionValue(0);
	const boxShadow = useRaisedShadow(y);
	const dragControls = useDragControls();

	return (
		<Reorder.Item
			id={id}
			value={note}
			custom={index}
			style={{ boxShadow, y }}
			onClick={() => handlePrune(note.id)}
			variants={ListItemVariants}
			dragControls={dragControls}
			dragListener={false}
			initial="hidden"
			animate="visible"
			exit="exit"
		>
			<Card
				className={cn(
					"group/card relative cursor-pointer overflow-hidden rounded bg-white shadow-sm hover:bg-gray-50 dark:border dark:bg-neutral-800 dark:text-gray-400",
					isSelected ? "border border-zinc-400 dark:border-gray-500" : "",
				)}
			>
				<CardContent className="flex items-center gap-x-3 p-2">
					<div className="flex h-min flex-col rounded border border-sky-100 bg-sky-50 p-1 px-2 dark:border-slate-600 dark:bg-slate-700">
						<span className="text-[10px] font-light">{day}</span>
						<span className="text-sm font-medium leading-[14px]">{date}</span>
					</div>
					<div className="flex h-min flex-col">
						<h4 className="text-md relative">
							{title}
							{favorite && (
								<Star className="absolute right-4 top-0 fill-yellow-600" />
							)}
						</h4>
						<span className="text-xs font-light">{time}</span>
					</div>
					<Grip
						size={19}
						className="ml-auto text-gray-400"
						onPointerDown={(event) => dragControls.start(event)}
					/>
				</CardContent>
			</Card>
		</Reorder.Item>
	);
};
