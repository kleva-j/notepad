import { NodeViewWrapper, ReactNodeViewRenderer } from "@tiptap/react";
import { Node, NodeViewRendererProps } from "@tiptap/core";
import { TableOfContents } from "@/tiptap/components";

const TableOfNodeContent = (props: NodeViewRendererProps) => {
	const { editor } = props;

	return (
		<NodeViewWrapper>
			<div className="-m-2 rounded-lg p-2" contentEditable={false}>
				<TableOfContents editor={editor} />
			</div>
		</NodeViewWrapper>
	);
};

declare module "@tiptap/core" {
	interface Commands<ReturnType> {
		tableOfContentsNode: {
			insertTableOfContents: () => ReturnType;
		};
	}
}

export const TableOfContentsNode = Node.create({
	name: "tableOfContentsNode",
	group: "block",
	atom: true,
	selectable: true,
	draggable: true,
	inline: false,

	parseHTML() {
		return [
			{
				tag: 'div[data-type="table-of-content"]',
			},
		];
	},

	renderHTML({ HTMLAttributes }) {
		return ["div", { ...HTMLAttributes, "data-type": "table-of-content" }];
	},

	addNodeView() {
		return ReactNodeViewRenderer(TableOfNodeContent);
	},

	addCommands() {
		return {
			insertTableOfContents:
				() =>
				({ commands }) => {
					return commands.insertContent({
						type: this.name,
					});
				},
		};
	},
});
