"use client";

import { EmptyEditor, EditorMenu } from "@/components/editor";
import {
	ResizablePanelGroup,
	ResizableHandle,
	ResizablePanel,
} from "@/components/ui/resizable";

import AppSidebar from "@/container/AppSidebar";

export default function RootPage() {
	return (
		<section className="flex h-screen w-screen">
			<AppSidebar />
			<ResizablePanelGroup direction="horizontal" className="border">
				<ResizablePanel defaultSize={25}>
					<div className="flex h-full items-center justify-center p-6">
						<div>Notelist panel</div>
					</div>
				</ResizablePanel>
				<ResizableHandle withHandle />
				<ResizablePanel defaultSize={75}>
					<div className="relative flex h-full flex-col items-center justify-center p-6">
						<EmptyEditor />
						<EditorMenu activeNote />
					</div>
				</ResizablePanel>
			</ResizablePanelGroup>
		</section>
	);
}
