export const ListItemVariants = {
	hidden: (i: number) => ({ opacity: 0, y: -15 * i }),
	visible: (i: number) => ({
		opacity: 1,
		y: 0,
		transition: {
			duration: 0.3,
			delay: i * 0.06,
			type: "spring",
			stiffness: 100,
		},
	}),
	exit: { opacity: 0, y: -15, transition: { duration: 0.1, type: "tween" } },
};

export const FadeInAnimationVariants = {
	hidden: { opacity: 0, transition: { duration: 0.3, type: "tween" } },
	visible: { opacity: 1, transition: { duration: 0.3, type: "tween" } },
	exit: { opacity: 0, transition: { duration: 0.3, type: "tween" } },
};

export const SlideInAnimationVariants = {
	hidden: {
		translateY: 5,
		opacity: 0,
		transition: { duration: 0.3, type: "tween" },
	},
	visible: {
		translateY: 0,
		opacity: 1,
		transition: { duration: 0.3, type: "tween" },
	},
	exit: {
		translateY: 5,
		opacity: 0,
		transition: { duration: 0.3, type: "tween" },
	},
};
