"use client";

import { ResizablePanelGroup, ResizableHandle } from "@/components/ui";
import { EditorWrapper } from "@/components/editor";

import AppSidebar from "@/container/AppSidebar";
import NoteList from "@/container/AppNoteList";

export default function RootPage() {
	return (
		<section className="flex h-screen w-screen">
			<AppSidebar />
			<ResizablePanelGroup direction="horizontal">
				<NoteList />
				<ResizableHandle withHandle />
				<EditorWrapper />
			</ResizablePanelGroup>
		</section>
	);
}
