import type { Menus } from "@/types";

import { SlideInAnimationVariants } from "@/utils/motion";
import { AddNoteModal } from "@/notelist/add-note-modal";
import { AnimatePresence, motion } from "framer-motion";
import { Dialog, DialogTrigger } from "@/ui/dialog";
import { Plus, TrashIcon } from "lucide-react";
import { useCallback, useState } from "react";
import { MenuEnum } from "@/utils/enums";
import { Checkbox } from "@/ui/checkbox";
import { Button } from "@/ui/button";
import { Label } from "@/ui/label";
import {
	AlertDialogDescription,
	AlertDialogTrigger,
	AlertDialogContent,
	AlertDialogCancel,
	AlertDialogFooter,
	AlertDialogAction,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialog,
} from "@/ui/alert-dialog";

import useMousetrap from "use-mousetrap";

interface ToolbarProps {
	activeMenu: Menus;
	onEmptyTrashClick: () => void;
	onIncludeTrashChange: (checked: boolean) => void;
	isTrashEmpty: boolean;
	isIncludeTrashChecked: boolean;
}

export const Toolbar = (props: ToolbarProps) => {
	const { onEmptyTrashClick, onIncludeTrashChange, ...rest } = props;
	const { activeMenu, isTrashEmpty, isIncludeTrashChecked } = rest;

	const handleCheckChange = useCallback(
		(checked: boolean) => {
			onIncludeTrashChange(checked);
		},
		[onIncludeTrashChange],
	);

	const [open, setOpen] = useState(false);

	const handleOpen = () => !open && setOpen(true);

	useMousetrap("command+k", handleOpen);

	return (
		<div className="flex h-14 items-center justify-between gap-x-4 bg-neutral-200 px-4 dark:bg-neutral-900">
			<AnimatePresence>
				{activeMenu === MenuEnum.notes && (
					<motion.div
						variants={SlideInAnimationVariants}
						initial="hidden"
						animate="visible"
						exit="exit"
						className="flex cursor-pointer items-center gap-2 text-xs text-gray-500"
					>
						<Checkbox
							id="terms"
							className="border-gray-500 dark:data-[state=checked]:border-yellow-600 dark:data-[state=checked]:bg-yellow-600 data-[state=checked]:border-amber-400 data-[state=checked]:bg-amber-400 data-[state=checked]:text-white"
							checked={isIncludeTrashChecked}
							onCheckedChange={handleCheckChange}
						/>
						<Label
							htmlFor="terms"
							className="cursor-pointer text-gray-500 dark:hover:text-gray-400/95"
						>
							Include trash
						</Label>
					</motion.div>
				)}

				{activeMenu === MenuEnum.trash && (
					<motion.div
						className="flex w-full items-center"
						variants={SlideInAnimationVariants}
						initial="hidden"
						animate="visible"
						exit="exit"
					>
						<AlertDialog>
							<AlertDialogTrigger asChild>
								<Button
									disabled={isTrashEmpty}
									variant="outline"
									className="dark:bg-transparent border-red-200 dark:border-none text-red-500 hover:text-red-500 hover:bg-red-50/95"
									size="sm"
								>
									<TrashIcon className="mr-1.5 h-4 w-4 stroke-red-500" />
									Empty
								</Button>
							</AlertDialogTrigger>
							<AlertDialogContent>
								<AlertDialogHeader>
									<AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
									<AlertDialogDescription>
										This action cannot be undone. This will permanently delete
										and remove your data from our servers.
									</AlertDialogDescription>
								</AlertDialogHeader>
								<AlertDialogFooter>
									<AlertDialogCancel>Cancel</AlertDialogCancel>
									<AlertDialogAction onClick={onEmptyTrashClick}>
										Continue
									</AlertDialogAction>
								</AlertDialogFooter>
							</AlertDialogContent>
						</AlertDialog>
					</motion.div>
				)}

				<Dialog open={open} onOpenChange={setOpen}>
					<DialogTrigger asChild>
						<Button
							variant="ghost"
							className="ml-auto justify-end bg-white text-neutral-800 hover:bg-white/70 dark:bg-transparent dark:text-gray-500 dark:hover:bg-neutral-900/90 dark:hover:text-gray-400/95"
						>
							<Plus className="mr-1.5 h-4 w-4" />
							New Note
						</Button>
					</DialogTrigger>
					<AddNoteModal handleClose={() => setOpen(false)} />
				</Dialog>
			</AnimatePresence>
		</div>
	);
};
