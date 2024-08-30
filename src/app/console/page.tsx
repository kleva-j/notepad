import { ResizablePanelGroup } from "@/ui/resizable";
import { SidePanel } from "@/app/console/_sidepanel";
import { Providers } from "@/app/_providers";
import { EditorWrapper } from "@/editor";
import { Settings } from "@/settings";

import Sidebar from "@/sidebar/layout";

export default function Console() {
	return (
		<Providers>
			<section className="relative flex h-screen w-screen">
				<div className="absolute bottom-12 right-8 z-10">
					<Settings />
				</div>
				<Sidebar />
				<ResizablePanelGroup direction="horizontal">
					<SidePanel />
					<EditorWrapper />
				</ResizablePanelGroup>
			</section>
		</Providers>
	);
}
