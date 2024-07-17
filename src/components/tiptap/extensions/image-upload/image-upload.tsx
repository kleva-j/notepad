import { type Editor, NodeViewWrapper } from "@tiptap/react";
import { ImageUploader } from "./image-uploader";
import { useCallback } from "react";

type ImageUploadProps = {
	getPos: () => number;
	editor: Editor;
};

export const ImageUpload = (props: ImageUploadProps): JSX.Element => {
	const { getPos, editor } = props;
	const onUpload = useCallback(
		(url: string) => {
			if (url) {
				editor
					.chain()
					.setImageBlock({ src: url })
					.deleteRange({ from: getPos(), to: getPos() })
					.focus()
					.run();
			}
		},
		[getPos, editor],
	);

	return (
		<NodeViewWrapper>
			<div className="m-0 p-0" data-drag-handle>
				<ImageUploader onUpload={onUpload} />
			</div>
		</NodeViewWrapper>
	);
};

export default ImageUpload;
