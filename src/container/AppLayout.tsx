"use client";

import AppSidebar from "@/container/AppSidebar";
import NoteEditor from "@/container/AppEditor";
import NoteList from "@/container/AppNoteList";

import { fadeIn } from "@/utils/motion";
import { motion } from "framer-motion";

export const Layout = () => {

	// const onDragEnd = (result: DropResult) => {
	// 	const { destination, source } = result;
	// 	if (!destination) return;
	// 	if (
	// 		destination.droppableId === source.droppableId &&
	// 		destination.index === source.index
	// 	)
	// 		return;

	// 	if (result.type === "CATEGORY")
	// 		updateCategory({
	// 			type: CategoryActions.SWAP_CATEGORY,
	// 			payload: { sourceId: source.index, destinationId: destination.index },
	// 		});
	// };

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
