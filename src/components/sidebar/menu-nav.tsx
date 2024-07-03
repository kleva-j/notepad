import type { PropsWithChildren } from "react";

import { NotepadText, Trash2, Star } from "lucide-react";
import { IconType, Menus } from "@/types";
import { MenuEnum } from "@/utils/enums";
import { motion } from "framer-motion";
import { Button } from "@/ui/button";
import { appState } from "@/store";
import { cn } from "@/lib/utils";
import { useAtom } from "jotai";
import { useMemo } from "react";

export function MenuBar() {
	const [{ activeMenu }, setAppState] = useAtom(appState);

	const setActive = (menu: Menus) => {
		setAppState((state) => ({ ...state, activeMenu: menu }));
	};

	const menuItems = useMemo(
		() => [
			{ icon: NotepadText, label: "All Notes", menu: MenuEnum.notes },
			{ icon: Star, label: "Favorites", menu: MenuEnum.favorites },
			{ icon: Trash2, label: "Trash", menu: MenuEnum.trash },
		],
		[]
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
	label: string;
	icon: IconType;
	className?: string;
	handleClick?: () => void;
} & PropsWithChildren;

const MotionButton = motion(Button)

export function MenuItem(props: MenuItemProps) {
	const { active, icon: Icon, label, className, handleClick, ...rest } = props;

	return (
		<MotionButton
			className={cn(
				"justify-start rounded-md bg-transparent px-5 text-base text-gray-400 shadow-none hover:bg-neutral-800/70 hover:text-gray-200",
				active && "bg-neutral-800 text-gray-200",
				className,
			)}
			onClick={handleClick}
			size="lg"
			{...rest}
		>
			<Icon className="mr-3 h-5 w-5 stroke-[0.85] text-inherit" />
			<p className="truncate whitespace-nowrap tracking-wide text-inherit">
				{label}
			</p>
			{props.children}
		</MotionButton>
	);
}
