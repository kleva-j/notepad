import { ToggleGroup, ToggleGroupItem } from "@/ui/toggle-group";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Switch } from "@/ui/switch";
import { Label } from "@/ui/label";
import { useAtom } from "jotai";

import {
	ShowExpandableToolbarAtom,
	DeleteWithNotesAtom,
} from "@/store/setting";

export const Preferences = () => {
	const [showToolbar, setShowToolbar] = useAtom(ShowExpandableToolbarAtom);
	const [withNotes, setWithNotes] = useAtom(DeleteWithNotesAtom);

	const { theme, setTheme } = useTheme();

	return (
		<div className="ml-4 flex flex-col gap-y-2">
			<h3 className="text-lg font-semibold">Preferences</h3>
			<div className="flex flex-col gap-y-3">
				<Label className="flex items-center justify-between gap-x-2 text-sm font-medium leading-6">
					<span>Show / Hide Expandable Toolbar</span>
					<Switch checked={showToolbar} onCheckedChange={setShowToolbar} />
				</Label>

				<Label className="flex items-center justify-between gap-x-2 text-sm font-medium leading-6">
					<span>Deleting a category include notes associated with it</span>
					<Switch checked={withNotes} onCheckedChange={setWithNotes} />
				</Label>

				<div className="flex items-center justify-between gap-x-2 text-sm font-medium leading-6">
					<span>Switch theme of the application.</span>
					<ToggleGroup
						size="sm"
						type="single"
						value={theme}
						onValueChange={setTheme}
						className="rounded-full border p-0.5 border-neutral-200 dark:border-neutral-700"
					>
						<ToggleGroupItem value="light" className="rounded-full">
							<Sun className="h-4 w-4" />
						</ToggleGroupItem>
						<ToggleGroupItem value="dark" className="rounded-full">
							<Moon className="h-4 w-4" />
						</ToggleGroupItem>
					</ToggleGroup>
				</div>
			</div>
		</div>
	);
};
