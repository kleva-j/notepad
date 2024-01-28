import { ModeToggle } from "@/components/ui/ThemeToggle";
import { MoonIcon, SunIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

export const ChangeTheme = () => {
	return (
		<ModeToggle>
			<Button variant="ghost" className="rounded-none" size="icon">
				<SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
				<MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
				<span className="sr-only">Toggle theme</span>
			</Button>
		</ModeToggle>
	);
};
