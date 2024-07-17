import { EmojiItem } from "@tiptap-pro/extension-emoji";
import { Panel } from "@/tiptap/panels";
import { Button } from "@/ui/button";
import {
	useImperativeHandle,
	useCallback,
	forwardRef,
	useEffect,
	useState,
} from "react";
import Image from "next/image";

export type Command = { name: string };

export type EmojiListProps = {
	items: EmojiItem[];
	command: (command: Command) => void;
};

export const EmojiList = forwardRef((props: EmojiListProps, ref) => {
	const [selectedIndex, setSelectedIndex] = useState(0);

	useEffect(() => setSelectedIndex(0), [props.items]);

	const selectItem = useCallback(
		(index: number) => {
			const item = props.items[index];

			if (item) {
				props.command({ name: item.name });
			}
		},
		[props],
	);

	useImperativeHandle(
		ref,
		() => {
			const scrollIntoView = (index: number) => {
				const item = props.items[index];

				if (item) {
					const node = document.querySelector(
						`[data-emoji-name="${item.name}"]`,
					);

					if (node) {
						node.scrollIntoView({ block: "nearest" });
					}
				}
			};

			const upHandler = () => {
				const newIndex =
					(selectedIndex + props.items.length - 1) % props.items.length;
				setSelectedIndex(newIndex);
				scrollIntoView(newIndex);
			};

			const downHandler = () => {
				const newIndex = (selectedIndex + 1) % props.items.length;
				setSelectedIndex(newIndex);
				scrollIntoView(newIndex);
			};

			const enterHandler = () => {
				selectItem(selectedIndex);
			};

			return {
				onKeyDown: ({ event }: { event: React.KeyboardEvent }) => {
					if (event.key === "ArrowUp") {
						upHandler();
						return true;
					}

					if (event.key === "ArrowDown") {
						downHandler();
						return true;
					}

					if (event.key === "Enter") {
						enterHandler();
						return true;
					}

					return false;
				},
			};
		},
		[props, selectedIndex, selectItem],
	);

	const createClickHandler = useCallback(
		(index: number) => () => selectItem(index),
		[selectItem],
	);

	if (!props.items || !props.items.length) {
		return null;
	}

	return (
		<Panel className="max-h-[18rem] max-w-[18rem] overflow-y-auto">
			{props.items.map((item: EmojiItem, index: number) => {
				const isActive = index === selectedIndex;
				return (
					<Button
						size="sm"
						key={item.name}
						variant="ghost"
						data-emoji-name={item.name}
						className="w-full justify-start"
						onClick={createClickHandler(index)}
					>
						{item.fallbackImage ? (
							<Image
								width={20}
								height={20}
								src={item.fallbackImage}
								className="h-5 w-5"
								alt="emoji"
							/>
						) : (
							item.emoji
						)}{" "}
						<span className="truncate text-ellipsis">:{item.name}:</span>
					</Button>
				);
			})}
		</Panel>
	);
});

EmojiList.displayName = "EmojiList";
