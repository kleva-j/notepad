import { icons } from "lucide-react";
import { cn } from "@/lib/utils";
import { memo } from "react";

export type IconProps = {
	name: keyof typeof icons;
	className?: string;
	strokeWidth?: number;
};

export const Icon = memo(({ name, className, strokeWidth }: IconProps) => {
	const IconComponent = icons[name];

	if (!IconComponent) return null;

	return (
		<IconComponent
			className={cn("h-4 w-4", className)}
			strokeWidth={strokeWidth || 2.5}
		/>
	);
});

Icon.displayName = "Icon";
