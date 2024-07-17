import { WebSocketStatus } from "@hocuspocus/provider";
import { isTextSelection } from "@tiptap/core";
import { Editor } from "@tiptap/react";

import {
	TableOfContentsNode,
	HorizontalRule,
	ImageUpload,
	ImageBlock,
	Figcaption,
	CodeBlock,
	Link,
} from "@/tiptap/extensions";

export const isTableGripSelected = (node: HTMLElement) => {
	let container = node;

	while (container && !["TD", "TH"].includes(container.tagName)) {
		container = container.parentElement!;
	}

	const gripColumn =
		container &&
		container.querySelector &&
		container.querySelector("a.grip-column.selected");
	const gripRow =
		container &&
		container.querySelector &&
		container.querySelector("a.grip-row.selected");

	if (gripColumn || gripRow) {
		return true;
	}

	return false;
};

export const isCustomNodeSelected = (editor: Editor, node: HTMLElement) => {
	const customNodes = [
		HorizontalRule.name,
		ImageBlock.name,
		ImageUpload.name,
		CodeBlock.name,
		ImageBlock.name,
		Link.name,
		Figcaption.name,
		TableOfContentsNode.name,
	];

	return (
		customNodes.some((type) => editor.isActive(type)) ||
		isTableGripSelected(node)
	);
};

export const isTextSelected = ({ editor }: { editor: Editor }) => {
	const {
		state: {
			doc,
			selection,
			selection: { empty, from, to },
		},
	} = editor;

	// Sometime check for `empty` is not enough.
	// Doubleclick an empty paragraph returns a node size of 2.
	// So we check also for an empty text size.
	const isEmptyTextBlock =
		!doc.textBetween(from, to).length && isTextSelection(selection);

	if (empty || isEmptyTextBlock || !editor.isEditable) {
		return false;
	}

	return true;
};

export const getRenderContainer = (editor: Editor, nodeType: string) => {
	const {
		view,
		state: {
			selection: { from },
		},
	} = editor;

	const elements = document.querySelectorAll(".has-focus");
	const elementCount = elements.length;
	const innermostNode = elements[elementCount - 1];
	const element = innermostNode;

	if (
		(element &&
			element.getAttribute("data-type") &&
			element.getAttribute("data-type") === nodeType) ||
		(element && element.classList && element.classList.contains(nodeType))
	) {
		return element;
	}

	const node = view.domAtPos(from).node as HTMLElement;
	let container = node;

	if (!container.tagName) {
		container = node.parentElement as HTMLElement;
	}

	while (
		container &&
		!(
			container.getAttribute("data-type") &&
			container.getAttribute("data-type") === nodeType
		) &&
		!container.classList.contains(nodeType)
	) {
		container = container.parentElement as HTMLElement;
	}

	return container;
};

export const getConnectionText = (collabState: WebSocketStatus) => {
	switch (collabState) {
		case WebSocketStatus.Connected:
			return `Connected`;

		case WebSocketStatus.Connecting:
			return `Connecting...`;

		case WebSocketStatus.Disconnected:
			return `Disconnected`;

		default:
			return `Connecting...`;
	}
};

export const cssVar = (name: string, value?: string) => {
	let currentName = name;
	if (name.substring(0, 2) !== "--") {
		currentName = `--${currentName}`;
	}

	if (value) {
		document.documentElement.style.setProperty(currentName, value);
	}

	return getComputedStyle(document.body).getPropertyValue(currentName);
};

export function randomElement(array: Array<any>) {
	return array[Math.floor(Math.random() * array.length)];
}
