export const staggerContainer = (
	staggerChildren?: number,
	delayChildren = 0
) => {
	return {
		hidden: {},
		show: { transition: { delayChildren, staggerChildren } },
	};
};
