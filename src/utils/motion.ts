export const ListItemVariants = {
	hidden: (i: number) => ({ opacity: 0, y: -50 * i }),
	visible: (i: number) => ({
		opacity: 1,
		y: 0,
		transition: { delay: i * 0.025 },
	}),
	exit: { opacity: 0 },
}
