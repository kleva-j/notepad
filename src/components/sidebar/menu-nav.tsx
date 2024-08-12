import type { PropsWithChildren } from "react";
import type { Menus } from "@/types";

import { type IconType, Icon } from "@/ui/icon";

import { menuSubject$, menuSubjectAtom } from "@/store";
import { Children, useMemo } from "react";
import { MenuEnum } from "@/utils/enums";
import { motion } from "framer-motion";
import { useAtomValue } from "jotai";
import { Button } from "@/ui/button";
import { icons } from "lucide-react";
import { cn } from "@/lib/utils";

export function MenuBar() {
	const activeMenu = useAtomValue(menuSubjectAtom);
	const setActive = (menu: Menus) => menuSubject$.next(menu);

	const menuItems = useMemo(
		() => [
			{
				icon: "NotebookPen" as IconType,
				label: "Scratchpad",
				menu: MenuEnum.scratchpad,
			},
			{
				icon: "NotepadText" as IconType,
				label: "All Notes",
				menu: MenuEnum.notes,
			},
			{
				icon: "Star" as IconType,
				label: "Favorites",
				menu: MenuEnum.favorites,
			},
			{ icon: "Trash2" as IconType, label: "Trash", menu: MenuEnum.trash },
		],
		[],
	);

	return (
		<nav className="mt-20 grid items-start gap-y-1.5">
			{menuItems.map((item) => (
				<MenuItem
					key={item.menu}
					icon={item.icon}
					label={item.label}
					active={activeMenu === item.menu}
					handleClick={() => setActive(item.menu)}
				/>
			))}
		</nav>
	);
}

type MenuItemProps = {
	active?: boolean;
	label?: string | React.ReactNode;
	icon: keyof typeof icons;
	className?: string;
	handleClick?: () => void;
} & PropsWithChildren;

const MotionButton = motion(Button);

export function MenuItem(props: MenuItemProps) {
	const { active, icon, label, className, handleClick, ...rest } = props;

	return (
		<MotionButton
			className={cn(
				"flex items-center justify-start rounded-md bg-transparent px-5 text-base text-gray-400 shadow-none hover:bg-neutral-800/70 hover:text-gray-200",
				active && "bg-neutral-800 text-gray-200",
				className,
			)}
			onClick={handleClick}
			size="lg"
			{...rest}
		>
			{Icon && (
				<Icon name={icon} className="mr-3 h-5 w-5 stroke-[0.85] text-inherit" />
			)}
			{label && (
				<p className="truncate whitespace-nowrap tracking-wide text-inherit">
					{label}
				</p>
			)}
			{Children.toArray(props.children)}
		</MotionButton>
	);
}
