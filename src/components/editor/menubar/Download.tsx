import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import {
	TooltipTrigger,
	TooltipContent,
	Tooltip,
} from "@/components/ui/tooltip";

export const DownloadNote = () => {
	return (
		<Tooltip>
			<TooltipTrigger asChild>
				<Button variant="ghost" className="rounded-none" size="icon">
					<Download className="h-[1.1rem] w-[1.1rem] transition-all" />
				</Button>
			</TooltipTrigger>
			<TooltipContent>
				<p>Download</p>
			</TooltipContent>
		</Tooltip>
	);
};
