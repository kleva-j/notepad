import { Providers } from "@/app/_providers";
import { EditorWrapper } from "@/editor";

import {
	ResizablePanelGroup,
	ResizableHandle,
} from "@/components/ui/resizable";

import NoteList from "@/notelist/layout";
import Sidebar from "@/sidebar/layout";

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
