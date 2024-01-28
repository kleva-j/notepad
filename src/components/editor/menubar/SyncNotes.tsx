import { Button } from "@/components/ui/button";
import { FolderSync } from "lucide-react";
import {
	TooltipTrigger,
	TooltipContent,
	Tooltip,
} from "@/components/ui/tooltip";

export const SyncNotes = () => {
	return (
		<Tooltip>
			<TooltipTrigger asChild>
				<Button variant="ghost" className="rounded-none" size="icon">
					<FolderSync className="h-[1.1rem] w-[1.1rem] transition-all" />
				</Button>
			</TooltipTrigger>
			<TooltipContent>
				<p>Sync Notes</p>
			</TooltipContent>
		</Tooltip>
	);
};
