import { Keybindings } from "@/lib/constants";

export const KeyboardShortcuts = () => {
	return (
		<div className="ml-4 flex flex-col gap-y-2">
			<h3 className="text-lg font-semibold">Keyboard Shortcuts</h3>
			<div className="flex flex-col gap-y-2">
				{Object.entries(Keybindings).map(([key, value]) => (
					<div key={key} className="flex items-center justify-between gap-x-2">
						<span className="text-sm">{value}</span>
						<span className="rounded-sm bg-neutral-100 px-2 py-0.5 text-xs tracking-widest text-neutral-800 font-medium">
							{key}
						</span>
					</div>
				))}
			</div>
		</div>
	);
};
