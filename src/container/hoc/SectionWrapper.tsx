import React from "react";

import { staggerContainer } from "@/utils/motion";
import { motion } from "framer-motion";

export const SectionWrapper = (Component: () => JSX.Element) =>
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
