"use client";

import { ResizableHandle } from "@/ui/resizable";
import { menuSubjectAtom } from "@/store";
import { MenuEnum } from "@/utils/enums";
import { motion } from "framer-motion";
import { useAtomValue } from "jotai";

import NoteList from "@/notelist/layout";

const variants = {
	open: { width: "26%", opacity: 1 },
	closed: { width: "0%", opacity: 0 },
};

export const SidePanel = () => {
	const activeMenu = useAtomValue(menuSubjectAtom);
	const padIsActive =
		activeMenu === MenuEnum.scratchpad || activeMenu.length === 0;

	return (
		<motion.div
			initial="closed"
			transition={{ duration: 0.2 }}
			animate={padIsActive ? "closed" : "open"}
			variants={variants}
			exit="closed"
		>
			<NoteList />
			{!padIsActive && <ResizableHandle withHandle />}
		</motion.div>
	);
};
