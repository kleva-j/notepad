"use client";

import { Providers } from "@/app/_providers";
import { EditorWrapper } from "@/editor";
import { NoteList } from "@/notelist";

import Sidebar from "@/sidebar/layout";

import {
	ResizablePanelGroup,
	ResizableHandle,
} from "@/components/ui/resizable";

export default function Console() {
	return (
		<Providers>
			<section className="flex h-screen w-screen">
				<Sidebar />
				<ResizablePanelGroup direction="horizontal">
					<NoteList />
					<ResizableHandle withHandle />
					<EditorWrapper />
				</ResizablePanelGroup>
			</section>
		</Providers>
	);
}
