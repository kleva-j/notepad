import { DialogHeader } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react";
import {
	DialogDescription,
	DialogContent,
	DialogTrigger,
	DialogTitle,
	Dialog,
} from "@/components/ui/dialog";
import {
	TooltipContent,
	TooltipTrigger,
	Tooltip,
} from "@/components/ui/tooltip";

export const SettingsModal = () => {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<div>
					<Tooltip>
						<TooltipTrigger asChild>
							<Button
								variant="ghost"
								className="ml-auto rounded-none"
								size="icon"
							>
								<Settings className="h-[1.1rem] w-[1.1rem] transition-all" />
							</Button>
						</TooltipTrigger>
						<TooltipContent>
							<p>Settings</p>
						</TooltipContent>
					</Tooltip>
				</div>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Are you absolutely sure?</DialogTitle>
					<DialogDescription>
						This action cannot be undone. This will permanently delete your
						account and remove your data from our servers.
					</DialogDescription>
				</DialogHeader>
			</DialogContent>
		</Dialog>
	);
};
