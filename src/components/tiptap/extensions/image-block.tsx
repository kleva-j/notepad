/* eslint-disable @next/next/no-img-element */
import { useCallback, useRef, memo, useEffect, useState } from "react";
import { getRenderContainer } from "@/tiptap/lib/utils";
import { mergeAttributes, Range } from "@tiptap/core";
import { ReactNodeViewRenderer } from "@tiptap/react";
import { Toolbar } from "@/tiptap/components";
import { Instance, sticky } from "tippy.js";
import { Node } from "@tiptap/pm/model";
import { v4 as uuid } from "uuid";
import { Icon } from "@/ui/icon";
import { cn } from "@/lib/utils";
import { Image } from "./image";

import {
	BubbleMenu as BaseBubbleMenu,
	NodeViewWrapper,
	Editor,
} from "@tiptap/react";

declare module "@tiptap/core" {
	interface Commands<ReturnType> {
		imageBlock: {
			setImageBlock: (attributes: { src: string }) => ReturnType;
			setImageBlockAt: (attributes: {
				src: string;
				pos: number | Range;
			}) => ReturnType;
			setImageBlockAlign: (align: "left" | "center" | "right") => ReturnType;
			setImageBlockWidth: (width: number) => ReturnType;
		};
	}
}

export const ImageBlock = Image.extend({
	name: "imageBlock",
	group: "block",
	defining: true,
	isolating: true,

	addAttributes() {
		return {
			src: {
				default: "",
				parseHTML: (element) => element.getAttribute("src"),
				renderHTML: (attributes) => ({
					src: attributes.src,
				}),
			},
			width: {
				default: "100%",
				parseHTML: (element) => element.getAttribute("data-width"),
				renderHTML: (attributes) => ({
					"data-width": attributes.width,
				}),
			},
			align: {
				default: "center",
				parseHTML: (element) => element.getAttribute("data-align"),
				renderHTML: (attributes) => ({
					"data-align": attributes.align,
				}),
			},
			alt: {
				default: undefined,
				parseHTML: (element) => element.getAttribute("alt"),
				renderHTML: (attributes) => ({
					alt: attributes.alt,
				}),
			},
		};
	},
	parseHTML() {
		return [
			{
				tag: 'img[src*="tiptap.dev"]:not([src^="data:"]), img[src*="windows.net"]:not([src^="data:"])',
			},
		];
	},
	renderHTML({ HTMLAttributes }) {
		return [
			"img",
			mergeAttributes(this.options.HTMLAttributes, HTMLAttributes),
		];
	},
	addCommands() {
		return {
			setImageBlock:
				(attrs) =>
				({ commands }) => {
					return commands.insertContent({
						type: "imageBlock",
						attrs: { src: attrs.src },
					});
				},
			setImageBlockAt:
				(attrs) =>
				({ commands }) => {
					return commands.insertContentAt(attrs.pos, {
						type: "imageBlock",
						attrs: { src: attrs.src },
					});
				},
			setImageBlockAlign:
				(align) =>
				({ commands }) =>
					commands.updateAttributes("imageBlock", { align }),
			setImageBlockWidth:
				(width) =>
				({ commands }) =>
					commands.updateAttributes("imageBlock", {
						width: `${Math.max(0, Math.min(100, width))}%`,
					}),
		};
	},

	addNodeView() {
		return ReactNodeViewRenderer(ImageBlockView);
	},
});

export type ImageBlockMenuProps = {
	appendTo?: React.RefObject<any>;
  shouldHide?: boolean
	editor: Editor;
};

export const ImageBlockMenu = (props: ImageBlockMenuProps): JSX.Element => {
	const { editor, appendTo } = props;
	const menuRef = useRef<HTMLDivElement>(null);
	const tippyInstance = useRef<Instance | null>(null);

	const getReferenceClientRect = useCallback(() => {
		const renderContainer = getRenderContainer(editor, "node-imageBlock");
		const rect =
			renderContainer?.getBoundingClientRect() ||
			new DOMRect(-1000, -1000, 0, 0);

		return rect;
	}, [editor]);

	const shouldShow = useCallback(() => {
		const isActive = editor.isActive("imageBlock");

		return isActive;
	}, [editor]);

	const onAlignImageLeft = useCallback(() => {
		editor
			.chain()
			.focus(undefined, { scrollIntoView: false })
			.setImageBlockAlign("left")
			.run();
	}, [editor]);

	const onAlignImageCenter = useCallback(() => {
		editor
			.chain()
			.focus(undefined, { scrollIntoView: false })
			.setImageBlockAlign("center")
			.run();
	}, [editor]);

	const onAlignImageRight = useCallback(() => {
		editor
			.chain()
			.focus(undefined, { scrollIntoView: false })
			.setImageBlockAlign("right")
			.run();
	}, [editor]);

	const onWidthChange = useCallback(
		(value: number) => {
			editor
				.chain()
				.focus(undefined, { scrollIntoView: false })
				.setImageBlockWidth(value)
				.run();
		},
		[editor],
	);

	return (
		<BaseBubbleMenu
			editor={editor}
			pluginKey={`imageBlockMenu-${uuid()}`}
			shouldShow={shouldShow}
			updateDelay={0}
			tippyOptions={{
				offset: [0, 8],
				popperOptions: {
					modifiers: [{ name: "flip", enabled: false }],
				},
				getReferenceClientRect,
				onCreate: (instance: Instance) => {
					tippyInstance.current = instance;
				},
				appendTo: () => {
					return appendTo?.current;
				},
				plugins: [sticky],
				sticky: "popper",
			}}
		>
			<Toolbar.Wrapper shouldShowContent={shouldShow()} ref={menuRef}>
				<Toolbar.Button
					tooltip="Align image left"
					active={editor.isActive("imageBlock", { align: "left" })}
					onClick={onAlignImageLeft}
				>
					<Icon name="AlignHorizontalDistributeStart" />
				</Toolbar.Button>
				<Toolbar.Button
					tooltip="Align image center"
					active={editor.isActive("imageBlock", { align: "center" })}
					onClick={onAlignImageCenter}
				>
					<Icon name="AlignHorizontalDistributeCenter" />
				</Toolbar.Button>
				<Toolbar.Button
					tooltip="Align image right"
					active={editor.isActive("imageBlock", { align: "right" })}
					onClick={onAlignImageRight}
				>
					<Icon name="AlignHorizontalDistributeEnd" />
				</Toolbar.Button>
				<Toolbar.Divider />
				<ImageBlockWidth
					onChange={onWidthChange}
					value={parseInt(editor.getAttributes("imageBlock").width)}
				/>
			</Toolbar.Wrapper>
		</BaseBubbleMenu>
	);
};

interface ImageBlockViewProps {
	editor: Editor;
	getPos: () => number;
	node: Node & {
		attrs: {
			src: string;
		};
	};
	updateAttributes: (attrs: Record<string, string>) => void;
}

export const ImageBlockView = (props: ImageBlockViewProps) => {
	const { editor, getPos, node } = props;
	const imageWrapperRef = useRef<HTMLDivElement>(null);
	const { src } = node.attrs;

	const wrapperClassName = cn(
		node.attrs.align === "left" ? "ml-0" : "ml-auto",
		node.attrs.align === "right" ? "mr-0" : "mr-auto",
		node.attrs.align === "center" && "mx-auto",
	);

	const onClick = useCallback(() => {
		editor.commands.setNodeSelection(getPos());
	}, [getPos, editor.commands]);

	return (
		<NodeViewWrapper>
			<div className={wrapperClassName} style={{ width: node.attrs.width }}>
				<div contentEditable={false} ref={imageWrapperRef}>
					<img className="block" src={src} alt="" onClick={onClick} />
				</div>
			</div>
		</NodeViewWrapper>
	);
};

export type ImageBlockWidthProps = {
	onChange: (value: number) => void;
	value: number;
};

export const ImageBlockWidth = memo(
	({ onChange, value }: ImageBlockWidthProps) => {
		const [currentValue, setCurrentValue] = useState(value);

		useEffect(() => {
			setCurrentValue(value);
		}, [value]);

		const handleChange = useCallback(
			(e: React.ChangeEvent<HTMLInputElement>) => {
				onChange(parseInt(e.target.value));
			},
			[onChange],
		);

		return (
			<div className="flex items-center gap-2">
				<input
					className="h-2 appearance-none rounded border-0 bg-neutral-200 fill-neutral-300"
					type="range"
					min="25"
					max="100"
					step="25"
					onChange={handleChange}
					value={currentValue}
				/>
				<span className="select-none text-xs font-semibold text-neutral-500">
					{value}%
				</span>
			</div>
		);
	},
);

ImageBlockWidth.displayName = "ImageBlockWidth";
