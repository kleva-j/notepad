"use client";

import { EmptyEditor, EditorMenu } from "@/components/editor";
import {
	ResizablePanelGroup,
	ResizableHandle,
	ResizablePanel,
} from "@/components/ui/resizable";

import AppSidebar from "@/container/AppSidebar";
import NoteList from "@/container/AppNoteList";

export default function RootPage() {
	return (
		<section className="flex h-screen w-screen">
			<AppSidebar />
			<ResizablePanelGroup direction="horizontal">
				<ResizablePanel
					defaultSize={25}
					className="bg-neutral-100 dark:bg-neutral-900"
				>
					<NoteList />
				</ResizablePanel>
				<ResizableHandle withHandle />
				<ResizablePanel
					defaultSize={75}
					className="bg-neutral-200 dark:bg-neutral-800"
				>
					<div className="relative flex h-full flex-col items-center justify-center p-6">
						<EmptyEditor />
						<EditorMenu activeNote />
					</div>
				</ResizablePanel>
			</ResizablePanelGroup>
		</section>
	);
}
