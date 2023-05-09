"use client";

import AppSidebar from "./AppSidebar";
import NoteEditor from "./AppEditor";
import NoteList from "./AppNoteList";
import React from "react";

import {
	updateCategoryStateAtom,
	CategoryStateAtom,
	swapCategories,
} from "@/store/slice/category";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { fadeIn } from "@/utils/motion";
import { motion } from "framer-motion";
import { Allotment } from "allotment";
import { useAtom } from "jotai";

import "allotment/dist/style.css";

export const Layout = () => {
	const [{ categories }] = useAtom(CategoryStateAtom);
	const [, updateCategory] = useAtom(updateCategoryStateAtom);

	const onDragEnd = (result: DropResult) => {
		const { destination, source } = result;
		if (!destination) return;
		if (
			destination.droppableId === source.droppableId &&
			destination.index === source.index
		)
			return;

		if (result.type === "CATEGORY") {
			updateCategory({
				categories: swapCategories(categories, {
					sourceId: source.index,
					destinationId: destination.index,
				}),
			});
		}
	};

	return (
		<motion.section
			variants={fadeIn("right", "spring", 0.5, 0.75)}
			className="flex h-screen w-screen"
		>
			<DragDropContext onDragEnd={onDragEnd}>
				<Allotment minSize={200} proportionalLayout>
					<Allotment.Pane preferredSize={240} maxSize={400}>
						<AppSidebar />
					</Allotment.Pane>
					<Allotment.Pane preferredSize={320} maxSize={400}>
						<NoteList />
					</Allotment.Pane>
					<NoteEditor />
				</Allotment>
			</DragDropContext>
		</motion.section>
	);
};
