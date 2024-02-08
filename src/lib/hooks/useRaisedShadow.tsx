import { type MotionValue, useMotionValue, animate } from "framer-motion";
import { useEffect } from "react";

export function useRaisedShadow(value: MotionValue<number>) {
	const inactiveShadow = "0px 0px 0px rgba(0,0,0,0.8)";
	const activeShadow =
		"0px 2px 3px -1px rgba(0,0,0,0.1), 0px 1px 0px 0px rgba(25,28,33,0.02), 0px 0px 0px 1px rgba(25,28,33,0.08)";
	const boxShadow = useMotionValue(inactiveShadow);

	useEffect(() => {
		let isActive = false;
		value.on("change", (latest) => {
			const wasActive = isActive;
			if (latest !== 0) {
				isActive = true;
				if (isActive !== wasActive) {
					animate(boxShadow, activeShadow);
				}
			} else {
				isActive = false;
				if (isActive !== wasActive) {
					animate(boxShadow, inactiveShadow);
				}
			}
		});
	}, [value, boxShadow]);

	return boxShadow;
}
