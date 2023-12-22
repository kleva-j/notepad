"use client";

import AppSidebar from "@/container/AppSidebar";
import NoteEditor from "@/container/AppEditor";
import NoteList from "@/container/AppNoteList";

import { fadeIn } from "@/utils/motion";
import { motion } from "framer-motion";

export const Layout = () => {
	return (
		<motion.section
			variants={fadeIn("right", "spring", 0.5, 0.75)}
			className="flex h-screen w-screen"
		>
			<AppSidebar />
			<NoteList />
			<NoteEditor />
		</motion.section>
	);
};
