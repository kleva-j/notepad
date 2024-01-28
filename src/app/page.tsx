"use client";

import { EmptyEditor, EditorMenu } from "@/components/editor";
import { fadeIn } from "@/utils/motion";
import { motion } from "framer-motion";
import {
	ResizablePanelGroup,
	ResizableHandle,
	ResizablePanel,
} from "@/components/ui/resizable";

import AppSidebar from "@/container/AppSidebar";

export default function RootPage() {
	return (
		<motion.section
			variants={fadeIn("right", "spring", 0.5, 0.75)}
			className="flex h-screen w-screen"
		>
			<ResizablePanelGroup
				direction="horizontal"
				className="min-h-[200px] rounded-lg border"
			>
				<ResizablePanel defaultSize={18}>
					<AppSidebar />
				</ResizablePanel>
				<ResizableHandle withHandle />
				<ResizablePanel defaultSize={24}>
					<div className="flex h-full items-center justify-center p-6">
						<div>Notelist panel</div>
					</div>
				</ResizablePanel>
				<ResizableHandle withHandle />
				<ResizablePanel defaultSize={58}>
					<div className="relative flex h-full flex-col items-center justify-center p-6">
						<EmptyEditor />
						<EditorMenu activeNote />
					</div>
				</ResizablePanel>
			</ResizablePanelGroup>
		</motion.section>
	);
}
