import { PopoverContent, PopoverTrigger, Popover } from "@/ui/popover";
import { LinkEditorPanel } from "@/tiptap/panels";
import { Toolbar } from "@/tiptap/components";
import { Icon } from "@/ui/icon";

export type EditLinkPopoverProps = {
	onSetLink: (link: string, openInNewTab?: boolean) => void;
};

export const EditLinkPopover = ({ onSetLink }: EditLinkPopoverProps) => {
	return (
		<Popover>
			<PopoverTrigger asChild>
				<Toolbar.Button tooltip="Set Link">
					<Icon name="Link" />
				</Toolbar.Button>
			</PopoverTrigger>
			<PopoverContent>
				<LinkEditorPanel onSetLink={onSetLink} />
			</PopoverContent>
		</Popover>
	);
};
