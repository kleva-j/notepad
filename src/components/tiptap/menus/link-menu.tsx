import { type Editor, BubbleMenu } from "@tiptap/react";

import { LinkPreviewPanel, LinkEditorPanel } from "@/tiptap/panels";
import { useCallback, useState } from "react";

interface MenuProps {
	editor: Editor;
	appendTo?: React.RefObject<any>;
	shouldHide?: boolean;
}

export const LinkMenu = ({ editor, appendTo }: MenuProps): JSX.Element => {
	const [showEdit, setShowEdit] = useState(false);

	const shouldShow = useCallback(() => {
		const isActive = editor.isActive("link");
		return isActive;
	}, [editor]);

	const { href: link, target } = editor.getAttributes("link");

	const handleEdit = useCallback(() => {
		setShowEdit(true);
	}, []);

	const onSetLink = useCallback(
		(url: string, openInNewTab?: boolean) => {
			editor
				.chain()
				.focus()
				.extendMarkRange("link")
				.setLink({ href: url, target: openInNewTab ? "_blank" : "" })
				.run();
			setShowEdit(false);
		},
		[editor],
	);

	const onUnsetLink = useCallback(() => {
		editor.chain().focus().extendMarkRange("link").unsetLink().run();
		setShowEdit(false);
		return null;
	}, [editor]);

	const onShowEdit = useCallback(() => {
		setShowEdit(true);
	}, []);

	const onHideEdit = useCallback(() => {
		setShowEdit(false);
	}, []);

	return (
		<BubbleMenu
			editor={editor}
			updateDelay={0}
			pluginKey="textMenu"
			shouldShow={shouldShow}
			tippyOptions={{
				popperOptions: { modifiers: [{ name: "flip", enabled: false }] },
				appendTo: () => appendTo?.current,
				onHidden: () => setShowEdit(false),
			}}
		>
			{showEdit ? (
				<LinkEditorPanel
					initialUrl={link}
					onSetLink={onSetLink}
					initialOpenInNewTab={target === "_blank"}
				/>
			) : (
				<LinkPreviewPanel
					url={link}
					onClear={onUnsetLink}
					onEdit={handleEdit}
				/>
			)}
		</BubbleMenu>
	);
};

export default LinkMenu;
