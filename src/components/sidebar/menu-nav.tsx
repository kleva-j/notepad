import type { PropsWithChildren } from "react";

import { NotepadText, Trash2, Star } from "lucide-react";
import { IconType, MenuEnum, Menus } from "@/types";
import { Button } from "@/ui/button";
import { appState } from "@/store";
import { cn } from "@/lib/utils";
import { useAtom } from "jotai";

export function MenuBar() {
	const [{ activeMenu }, setAppState] = useAtom(appState);

	const setActive = (menu: Menus) => {
		setAppState((state) => ({ ...state, activeMenu: menu }));
	};

	return (
		<nav className="mt-20 grid items-start gap-y-1.5">
			<MenuItem
				icon={NotepadText}
				label="Notes"
				active={activeMenu === MenuEnum.notes}
				handleClick={() => setActive(MenuEnum.notes)}
			/>
			<MenuItem
				icon={Star}
				label="Favorites"
				active={activeMenu === MenuEnum.favorites}
				handleClick={() => setActive(MenuEnum.favorites)}
			/>
			<MenuItem
				icon={Trash2}
				label="Trash"
				active={activeMenu === MenuEnum.trash}
				handleClick={() => setActive(MenuEnum.trash)}
			/>
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

export function MenuItem(props: MenuItemProps) {
	const { active, icon: Icon, label, className, children, handleClick } = props;

	return (
		<Button
			className={cn(
				"justify-start rounded-md bg-transparent px-5 text-base text-gray-400 shadow-none hover:bg-neutral-800/70 hover:text-gray-200",
				active && "bg-neutral-800 text-gray-200",
				className,
			)}
			onClick={handleClick}
			size="lg"
		>
			<Icon className="mr-3 h-5 w-5 stroke-[0.85] text-inherit" />
			<p className="truncate whitespace-nowrap tracking-wide text-inherit">
				{label}
			</p>
			{children}
		</Button>
	);
}
