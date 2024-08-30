import { Switch } from "@/ui/switch";
import { Label } from "@/ui/label";
import { useAtom } from "jotai";

import {
	ShowExpandableToolbarAtom,
	DeleteWithNotesAtom,
} from "@/store/setting";

export const Preferences = () => {
	const [showToolbar, setShowToolbar] = useAtom(ShowExpandableToolbarAtom);
	const [WithNotes, setWithNotes] = useAtom(DeleteWithNotesAtom);

	return (
		<div className="ml-4 flex flex-col gap-y-2">
			<h3 className="text-lg font-semibold">Preferences</h3>
			<div className="flex flex-col gap-y-2">
				<Label className="flex items-center justify-between gap-x-2 text-sm font-medium leading-6 text-zinc-800">
					<span>Show / Hide Expandable Toolbar</span>
					<Switch checked={showToolbar} onCheckedChange={setShowToolbar} />
				</Label>

				<Label className="flex items-center justify-between gap-x-2 text-sm font-medium leading-6 text-zinc-800">
					<span>Deleting a category include notes associated with it</span>
					<Switch checked={WithNotes} onCheckedChange={setWithNotes} />
				</Label>
			</div>
		</div>
	);
};
