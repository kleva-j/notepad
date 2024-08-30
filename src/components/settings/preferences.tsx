import { ShowExpandableToolbarAtom } from "@/store/setting";
import { Switch } from "@/ui/switch";
import { Label } from "@/ui/label";
import { useAtom } from "jotai";

export const Preferences = () => {
	const [showToolbar, setShowToolbar] = useAtom(ShowExpandableToolbarAtom);

	return (
		<div className="ml-4 flex flex-col gap-y-2">
			<h3 className="text-lg font-semibold">Preferences</h3>
			<div className="flex flex-col gap-y-2 divide-y divide-zinc-700/10">
				<Label className="flex items-center justify-between gap-x-2 text-sm font-medium leading-6 text-zinc-800">
					<span>Show / Hide Expandable Toolbar</span>
					<Switch checked={showToolbar} onCheckedChange={setShowToolbar} />
				</Label>
			</div>
		</div>
	);
};
