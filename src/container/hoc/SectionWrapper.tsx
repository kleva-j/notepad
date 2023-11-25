import React from "react";

import { staggerContainer } from "@/utils/motion";
import { motion } from "framer-motion";

interface HOC<T> {
	(
		Component: (() => JSX.Element) | React.ComponentType<T>,
	): (props: T) => JSX.Element;
}

export const SectionWrapper: HOC<unknown> = (Component) =>
	function Hoc() {
		return (
			<motion.section
				variants={staggerContainer()}
				initial="hidden"
				whileInView="show"
				viewport={{ once: true, amount: 0.25 }}
				className=""
			>
				<Component />
			</motion.section>
		);
	};
