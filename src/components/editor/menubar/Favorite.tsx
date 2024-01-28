import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import {
	TooltipTrigger,
	TooltipContent,
	Tooltip,
} from "@/components/ui/tooltip";

export const MakeFavorite = () => {
	return (
		<Tooltip>
			<TooltipTrigger asChild>
				<Button variant="ghost" className="mr-auto rounded-none" size="icon">
					<Star className="h-[1.1rem] w-[1.1rem] transition-all" />
				</Button>
			</TooltipTrigger>
			<TooltipContent>
				<p>Favorite</p>
			</TooltipContent>
		</Tooltip>
	);
};
