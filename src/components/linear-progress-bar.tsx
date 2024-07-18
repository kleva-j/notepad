import { useMotionValue, useSpring, frame } from "framer-motion";
import { Progress } from "@/components/ui/progress";
import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

type Props = {
	min?: number;
	max?: number;
	delay?: number;
	className?: string;
	direction?: "up" | "down";
};

export const ProgressLoader = (props: Props) => {
	const { delay = 0, className, min = 0, max = 99, direction = "up" } = props;
	const ref = useRef<HTMLDivElement>(null);
	const motionValue = useMotionValue(direction === "up" ? min : max);
	const springValue = useSpring(motionValue, { damping: 60, stiffness: 100 });

	useEffect(() => {
		setTimeout(() => {
			motionValue.set(direction === "up" ? max : min);
		}, delay * 1000);
	}, [motionValue, delay, direction, max, min]);

	useEffect(() => {
		springValue.on("change", (latest) => {
			frame.update(() => {
				if (ref.current) {
					ref.current.style.transform = `translateX(-${100 - (latest.toFixed(0) || 0)}%)`;
				}
			});
		});
	}, [springValue]);

	return (
		<Progress
			ref={ref}
			value={0}
			className={cn("[&>div]:bg-neutral-500", className)}
		/>
	);
};
