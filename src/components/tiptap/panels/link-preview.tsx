import { Surface, Toolbar, Tooltip } from "@/tiptap/components";
import { Icon } from "@/ui/icon";

import Link from "next/link";

export type LinkPreviewPanelProps = {
	url: string;
	onEdit: () => void;
	onClear: () => void;
};

export const LinkPreviewPanel = (props: LinkPreviewPanelProps) => {
	const { url, onEdit, onClear } = props;
	console.log("url", url);

	return (
		<Surface className="flex items-center gap-2 p-2">
			<Link
				href={url ?? "#"}
				target="_blank"
				rel="noopener noreferrer"
				className="break-all text-sm underline"
			>
				{url ?? "No link"}
			</Link>
			<Toolbar.Divider />
			<Tooltip title="Edit link">
				<Toolbar.Button onClick={onEdit}>
					<Icon name="Pen" />
				</Toolbar.Button>
			</Tooltip>
			<Tooltip title="Remove link">
				<Toolbar.Button onClick={onClear}>
					<Icon name="Trash2" />
				</Toolbar.Button>
			</Tooltip>
		</Surface>
	);
};
