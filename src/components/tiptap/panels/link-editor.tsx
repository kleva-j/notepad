import { useState, useCallback, useMemo } from "react";
import { Surface } from "@/tiptap/components";
import { Button } from "@/ui/button";
import { Toggle } from "@/ui/toggle";
import { Icon } from "@/ui/icon";

export type LinkEditorPanelProps = {
	initialUrl?: string;
	initialOpenInNewTab?: boolean;
	onSetLink: (url: string, openInNewTab?: boolean) => void;
};

export const useLinkEditorState = (props: LinkEditorPanelProps) => {
	const { initialUrl, initialOpenInNewTab, onSetLink } = props;
	const [url, setUrl] = useState(initialUrl || "");
	const [openInNewTab, setOpenInNewTab] = useState(
		initialOpenInNewTab || false,
	);

	const onChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
		setUrl(event.target.value);
	}, []);

	const isValidUrl = useMemo(() => /^(\S+):(\/\/)?\S+$/.test(url), [url]);

	const handleSubmit = useCallback(
		(e: React.FormEvent) => {
			e.preventDefault();
			if (isValidUrl) {
				onSetLink(url, openInNewTab);
			}
		},
		[url, isValidUrl, openInNewTab, onSetLink],
	);

	return {
		setOpenInNewTab,
		handleSubmit,
		openInNewTab,
		isValidUrl,
		onChange,
		setUrl,
		url,
	};
};

export const LinkEditorPanel = (prop: LinkEditorPanelProps) => {
	const { onSetLink, initialOpenInNewTab, initialUrl } = prop;

	const state = useLinkEditorState({
		onSetLink,
		initialOpenInNewTab,
		initialUrl,
	});

	return (
		<Surface className="p-2">
			<form onSubmit={state.handleSubmit} className="flex items-center gap-2">
				<label className="flex cursor-text items-center gap-2 rounded-lg bg-neutral-100 p-2 dark:bg-neutral-900">
					<Icon name="Link" className="flex-none text-black dark:text-white" />
					<input
						type="url"
						className="min-w-[12rem] flex-1 bg-transparent text-sm text-black outline-none dark:text-white"
						placeholder="Enter URL"
						value={state.url}
						onChange={state.onChange}
					/>
				</label>
				<Button
					variant="ghost"
					size="sm"
					type="submit"
					disabled={!state.isValidUrl}
				>
					Set Link
				</Button>
			</form>
			<div className="mt-3">
				<label className="flex cursor-pointer select-none items-center justify-start gap-2 text-sm font-semibold text-neutral-500 dark:text-neutral-400">
					Open in new tab
					<Toggle
						pressed={state.openInNewTab}
						onPressedChange={state.setOpenInNewTab}
						size="sm"
					/>
				</label>
			</div>
		</Surface>
	);
};
