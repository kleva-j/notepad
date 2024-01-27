import { Button } from "@/components/ui/button";
import { Clipboard } from "lucide-react";
import {
	TooltipTrigger,
	TooltipContent,
	Tooltip,
} from "@/components/ui/tooltip";

export const CopyToClipboard = () => {
	return (
		<Tooltip>
			<TooltipTrigger asChild>
				<Button variant="ghost" className="rounded-none" size="icon">
					<Clipboard className="h-[1.1rem] w-[1.1rem] transition-all" />
				</Button>
			</TooltipTrigger>
			<TooltipContent>
				<p>Copy to clipboard</p>
			</TooltipContent>
		</Tooltip>
	);
};
