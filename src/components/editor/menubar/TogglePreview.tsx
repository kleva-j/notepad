import { Button } from "@/components/ui/button";
import { Edit, Eye } from "lucide-react";
import {
	TooltipTrigger,
	TooltipContent,
	Tooltip,
} from "@/components/ui/tooltip";

type Props = {
	previewMarkdown?: boolean;
};

export const TogglePreview = ({ previewMarkdown }: Props) => {
	return (
		<Tooltip>
			<TooltipTrigger asChild>
				<Button variant="ghost" className="rounded-none" size="icon">
					{previewMarkdown ? (
						<Edit
							aria-hidden="true"
							className="h-[1.1rem] w-[1.1rem] transition-all"
						/>
					) : (
						<Eye
							aria-hidden="true"
							className="h-[1.1rem] w-[1.1rem] transition-all"
						/>
					)}
				</Button>
			</TooltipTrigger>
			<TooltipContent>
				<p>Preview / Edit</p>
			</TooltipContent>
		</Tooltip>
	);
};
