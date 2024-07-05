import type { Menus } from "@/types";

import { SlideInAnimationVariants } from "@/utils/motion";
import { AnimatePresence, motion } from "framer-motion";
import { MenuEnum } from "@/utils/enums";
import { TrashIcon } from "lucide-react";
import { Checkbox } from "@/ui/checkbox";
import { Button } from "@/ui/button";
import { useCallback } from "react";
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

	return (
		<div className="flex h-14 items-center justify-start bg-neutral-900 px-4">
			<AnimatePresence>
				{activeMenu === MenuEnum.notes && (
					<motion.div
						variants={SlideInAnimationVariants}
						initial="hidden"
						animate="visible"
						exit="exit"
						className="flex w-full cursor-pointer items-center justify-end gap-2 text-xs text-gray-500"
					>
						<Checkbox
							id="terms"
							className="border-gray-500"
							checked={isIncludeTrashChecked}
							onCheckedChange={handleCheckChange}
						/>
						<Label htmlFor="terms">Include trash</Label>
					</motion.div>
				)}

				{activeMenu === MenuEnum.trash && (
					<motion.div
						className="flex w-full items-center justify-end"
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
									className="bg-transparent text-red-500 hover:text-red-500"
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
			</AnimatePresence>
		</div>
	);
};
