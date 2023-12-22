"use client";

import "allotment/dist/style.css";

import { fadeIn } from "@/utils/motion";
import { motion } from "framer-motion";
import { Allotment } from "allotment";

import AppSidebar from "@/container/AppSidebar";

export default function RootPage() {
	return (
		<motion.section
			variants={fadeIn("right", "spring", 0.5, 0.75)}
			className="flex h-screen w-screen"
		>
			<Allotment minSize={200} proportionalLayout>
				<Allotment.Pane preferredSize={240} maxSize={400}>
					<AppSidebar />
				</Allotment.Pane>
				<Allotment.Pane preferredSize={320} maxSize={400}>
					<div>Notelist panel</div>
				</Allotment.Pane>
				<div>Editor Panel</div>
			</Allotment>
		</motion.section>
	);
}
