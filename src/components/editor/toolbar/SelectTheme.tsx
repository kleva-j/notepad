import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";

export type ToolbarItemProps = { replayAction: () => void };

export const SelectTheme = ({ replayAction }: ToolbarItemProps) => {
	const { setTheme } = useTheme();

	const handleClick = (theme: "light" | "dark" | "system") => {
		setTheme(theme);
		replayAction();
	};

	return (
		<div className="flex flex-col space-y-2">
			<Button variant="secondary" onClick={() => handleClick("light")}>
				Light
			</Button>
			<Button variant="secondary" onClick={() => handleClick("dark")}>
				Dark
			</Button>
			<Button variant="secondary" onClick={() => handleClick("system")}>
				System
			</Button>
		</div>
	);
};
