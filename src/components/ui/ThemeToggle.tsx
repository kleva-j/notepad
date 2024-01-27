"use client";

import type { PropsWithChildren } from "react";

import { MoonIcon, SunIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import {
	DropdownMenuContent,
	DropdownMenuTrigger,
	DropdownMenuItem,
	DropdownMenu,
} from "@/components/ui/dropdown-menu";
import {
	TooltipContent,
	TooltipTrigger,
	Tooltip,
} from "@/components/ui/tooltip";

export function ModeToggle({ children }: PropsWithChildren) {
	const { setTheme } = useTheme();

	return (
		<Tooltip>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<TooltipTrigger asChild>
						{children || (
							<Button variant="ghost" size="icon">
								<SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
								<MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
								<span className="sr-only">Toggle theme</span>
							</Button>
						)}
					</TooltipTrigger>
				</DropdownMenuTrigger>
				<TooltipContent>
					<p>Change Theme</p>
				</TooltipContent>
				<DropdownMenuContent align="end">
					<DropdownMenuItem onClick={() => setTheme("light")}>
						Light
					</DropdownMenuItem>
					<DropdownMenuItem onClick={() => setTheme("dark")}>
						Dark
					</DropdownMenuItem>
					<DropdownMenuItem onClick={() => setTheme("system")}>
						System
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</Tooltip>
	);
}
