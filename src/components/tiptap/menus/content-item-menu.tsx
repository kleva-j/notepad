import type { Editor } from "@tiptap/react";

import { DropdownButton, Toolbar, Surface } from "@/tiptap/components";
import { useContentItemActions, useData } from ".";
import { useEffect, useState } from "react";
import { Icon } from "@/ui/icon";

import {
	PopoverTrigger,
	PopoverContent,
	PopoverClose,
	Popover,
} from "@/ui/popover";

import DragHandle from "@tiptap-pro/extension-drag-handle-react";

export type ContentItemMenuProps = { editor: Editor };

export const ContentItemMenu = ({ editor }: ContentItemMenuProps) => {
	const [menuOpen, setMenuOpen] = useState(false);
	const data = useData();
	const actions = useContentItemActions(
		editor,
		data.currentNode,
		data.currentNodePos,
	);

	useEffect(() => {
		if (menuOpen) editor.commands.setMeta("lockDragHandle", true);
		else editor.commands.setMeta("lockDragHandle", false);
	}, [editor, menuOpen]);

	return (
		<DragHandle
			tippyOptions={{ offset: [-2, 16], zIndex: 99 }}
			onNodeChange={data.handleNodeChange}
			pluginKey="ContentItemMenu"
			editor={editor}
		>
			<div className="flex items-center gap-0.5">
				<Toolbar.Button onClick={actions.handleAdd}>
					<Icon name="Plus" />
				</Toolbar.Button>
				<Popover open={menuOpen} onOpenChange={setMenuOpen}>
					<PopoverTrigger asChild>
						<Toolbar.Button>
							<Icon name="GripVertical" />
						</Toolbar.Button>
					</PopoverTrigger>
					<PopoverContent side="bottom" align="start" sideOffset={8}>
						<Surface className="flex min-w-[16rem] flex-col p-2">
							<PopoverClose>
								<DropdownButton onClick={actions.resetTextFormatting}>
									<Icon name="RemoveFormatting" />
									Clear formatting
								</DropdownButton>
							</PopoverClose>
							<PopoverClose>
								<DropdownButton onClick={actions.copyNodeToClipboard}>
									<Icon name="Clipboard" />
									Copy to clipboard
								</DropdownButton>
							</PopoverClose>
							<PopoverClose>
								<DropdownButton onClick={actions.duplicateNode}>
									<Icon name="Copy" />
									Duplicate
								</DropdownButton>
							</PopoverClose>
							<Toolbar.Divider horizontal />
							<PopoverClose>
								<DropdownButton
									onClick={actions.deleteNode}
									className="bg-red-500 bg-opacity-10 text-red-500 hover:bg-red-500 hover:bg-opacity-20 dark:text-red-500 dark:hover:bg-red-500 dark:hover:bg-opacity-20 dark:hover:text-red-500"
								>
									<Icon name="Trash2" />
									Delete
								</DropdownButton>
							</PopoverClose>
						</Surface>
					</PopoverContent>
				</Popover>
			</div>
		</DragHandle>
	);
};
