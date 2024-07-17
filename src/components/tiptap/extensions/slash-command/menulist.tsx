import type { Editor } from "@tiptap/core";

import {
	useImperativeHandle,
	useCallback,
	forwardRef,
	useEffect,
	useState,
	Fragment,
	useRef,
} from "react";

import { DropdownButton, Surface } from "@/tiptap/components";
import { icons } from "lucide-react";
import { Icon } from "@/ui/icon";

interface Group {
	name: string;
	title: string;
	commands: Command[];
}

interface Command {
	name: string;
	label: string;
	description: string;
	aliases?: string[];
	iconName: keyof typeof icons;
	action: (editor: Editor) => void;
	shouldBeHidden?: (editor: Editor) => boolean;
}

export interface MenuListProps {
	editor: Editor;
	items: Group[];
	command: (command: Command) => void;
}

export const MenuList = forwardRef((props: MenuListProps, ref) => {
	const scrollContainer = useRef<HTMLDivElement>(null);
	const activeItem = useRef<HTMLButtonElement>(null);
	const [selectedGroupIndex, setSelectedGroupIndex] = useState(0);
	const [selectedCommandIndex, setSelectedCommandIndex] = useState(0);

	// Anytime the groups change, i.e. the user types to narrow it down, we want to
	// reset the current selection to the first menu item
	useEffect(() => {
		setSelectedGroupIndex(0);
		setSelectedCommandIndex(0);
	}, [props.items]);

	const selectItem = useCallback(
		(groupIndex: number, commandIndex: number) => {
			const selectedGroup = props.items[groupIndex];
			if (selectedGroup) {
				const selectedCommand = selectedGroup.commands[commandIndex];
				if (selectedCommand) {
					props.command(selectedCommand);
				}
			}
		},
		[props],
	);

	useImperativeHandle(ref, () => ({
		onKeyDown: ({ event }: { event: React.KeyboardEvent }) => {
			if (event.key === "ArrowDown") {
				if (!props.items.length) {
					return false;
				}
				// @ts-expect-error
				const commands = props.items[selectedGroupIndex].commands || [];

				let newCommandIndex = selectedCommandIndex + 1;
				let newGroupIndex = selectedGroupIndex;

				if (commands.length - 1 < newCommandIndex) {
					newCommandIndex = 0;
					newGroupIndex = selectedGroupIndex + 1;
				}

				if (props.items.length - 1 < newGroupIndex) {
					newGroupIndex = 0;
				}

				setSelectedCommandIndex(newCommandIndex);
				setSelectedGroupIndex(newGroupIndex);

				return true;
			}

			if (event.key === "ArrowUp") {
				if (!props.items.length) {
					return false;
				}

				let newCommandIndex = selectedCommandIndex - 1;
				let newGroupIndex = selectedGroupIndex;

				if (newCommandIndex < 0) {
					newGroupIndex = selectedGroupIndex - 1;
					newCommandIndex =
						// @ts-expect-error
						props.items[newGroupIndex]?.commands.length - 1 || 0;
				}

				if (newGroupIndex < 0) {
					newGroupIndex = props.items.length - 1; // @ts-expect-error
					newCommandIndex = props.items[newGroupIndex].commands.length - 1;
				}

				setSelectedCommandIndex(newCommandIndex);
				setSelectedGroupIndex(newGroupIndex);

				return true;
			}

			if (event.key === "Enter") {
				if (
					!props.items.length ||
					selectedGroupIndex === -1 ||
					selectedCommandIndex === -1
				) {
					return false;
				}

				selectItem(selectedGroupIndex, selectedCommandIndex);

				return true;
			}

			return false;
		},
	}));

	useEffect(() => {
		if (activeItem.current && scrollContainer.current) {
			const offsetTop = activeItem.current.offsetTop;
			const offsetHeight = activeItem.current.offsetHeight;

			scrollContainer.current.scrollTop = offsetTop - offsetHeight;
		}
	}, [selectedCommandIndex, selectedGroupIndex]);

	const createCommandClickHandler = useCallback(
		(groupIndex: number, commandIndex: number) => {
			return () => {
				selectItem(groupIndex, commandIndex);
			};
		},
		[selectItem],
	);

	if (!props.items.length) {
		return null;
	}

	return (
		<Surface
			ref={scrollContainer}
			className="mb-8 max-h-[min(80vh,24rem)] flex-wrap overflow-auto p-2 text-black"
		>
			<div className="grid grid-cols-1 gap-0.5">
				{props.items.map((group, groupIndex: number) => (
					<Fragment key={`${group.title}-wrapper`}>
						<div
							className="col-[1/-1] mx-2 mt-4 select-none text-[0.65rem] font-semibold uppercase tracking-wider text-neutral-500 first:mt-0.5"
							key={`${group.title}`}
						>
							{group.title}
						</div>
						{group.commands.map((command: Command, commandIndex: number) => (
							<DropdownButton
								key={`${command.label}`}
								isActive={
									selectedGroupIndex === groupIndex &&
									selectedCommandIndex === commandIndex
								}
								onClick={createCommandClickHandler(groupIndex, commandIndex)}
							>
								<Icon name={command.iconName} className="mr-1" />
								{command.label}
							</DropdownButton>
						))}
					</Fragment>
				))}
			</div>
		</Surface>
	);
});

MenuList.displayName = "MenuList";

export default MenuList;
