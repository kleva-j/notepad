import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import {
	TooltipTrigger,
	TooltipContent,
	Tooltip,
} from "@/components/ui/tooltip";

export const MoveToTrash = () => {
	return (
		<Tooltip>
			<TooltipTrigger asChild>
				<Button variant="ghost" className="rounded-none" size="icon">
					<Trash2 className="h-[1.1rem] w-[1.1rem] transition-all" />
				</Button>
			</TooltipTrigger>
			<TooltipContent>
				<p>Move to trash</p>
			</TooltipContent>
		</Tooltip>
	);
};
