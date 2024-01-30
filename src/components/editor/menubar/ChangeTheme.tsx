import { MoonIcon, SunIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { ThemeEnum } from "@/types";
import {
	TooltipContent,
	TooltipTrigger,
	Tooltip,
} from "@/components/ui/tooltip";

export const ToggleTheme = () => {
	const { theme, setTheme } = useTheme();

	const toggleTheme = () =>
		setTheme(theme === ThemeEnum.light ? ThemeEnum.dark : ThemeEnum.light);

	return (
		<Tooltip>
			<TooltipTrigger asChild>
				<Button
					variant="ghost"
					className="rounded-none"
					size="icon"
					onClick={() => toggleTheme()}
				>
					<SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
					<MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
					<span className="sr-only">Toggle theme</span>
				</Button>
			</TooltipTrigger>
			<TooltipContent>
				<p>Toggle Theme</p>
			</TooltipContent>
		</Tooltip>
	);
};
