import type { MenuProps, ShouldShowProps } from "@/tiptap/components/types";

import { BubbleMenu as BaseBubbleMenu } from "@tiptap/react";
import { Menu as PopoverMenu } from "@/tiptap/components";

import { Toolbar } from "@/tiptap/components";
import { isRowGripSelected } from "./utils";
import { memo, useCallback } from "react";
import { Icon } from "@/ui/icon";

export const TableRowMenu = memo(
	({ editor, appendTo }: MenuProps): JSX.Element => {
		const shouldShow = useCallback(
			({ view, state, from }: ShouldShowProps) => {
				if (!state || !from) {
					return false;
				}

				return isRowGripSelected({ editor, view, state, from });
			},
			[editor],
		);

		const onAddRowBefore = useCallback(() => {
			editor.chain().focus().addRowBefore().run();
		}, [editor]);

		const onAddRowAfter = useCallback(() => {
			editor.chain().focus().addRowAfter().run();
		}, [editor]);

		const onDeleteRow = useCallback(() => {
			editor.chain().focus().deleteRow().run();
		}, [editor]);

		return (
			<BaseBubbleMenu
				editor={editor}
				pluginKey="tableRowMenu"
				updateDelay={0}
				tippyOptions={{
					appendTo: () => {
						return appendTo?.current;
					},
					placement: "left",
					offset: [0, 15],
					popperOptions: {
						modifiers: [{ name: "flip", enabled: false }],
					},
				}}
				shouldShow={shouldShow}
			>
				<Toolbar.Wrapper isVertical>
					<PopoverMenu.Item
						iconComponent={<Icon name="ArrowUpToLine" />}
						close={false}
						label="Add row before"
						onClick={onAddRowBefore}
					/>
					<PopoverMenu.Item
						iconComponent={<Icon name="ArrowDownToLine" />}
						close={false}
						label="Add row after"
						onClick={onAddRowAfter}
					/>
					<PopoverMenu.Item
						icon="Trash"
						close={false}
						label="Delete row"
						onClick={onDeleteRow}
					/>
				</Toolbar.Wrapper>
			</BaseBubbleMenu>
		);
	},
);

TableRowMenu.displayName = "TableRowMenu";
