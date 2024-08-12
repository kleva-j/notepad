import { ResizablePanelGroup } from "@/ui/resizable";
import { SidePanel } from "@/app/console/_sidepanel";
import { Providers } from "@/app/_providers";
import { EditorWrapper } from "@//editor";

import Sidebar from "@/sidebar/layout";

export default function Console() {
	return (
		<Providers>
			<section className="flex h-screen w-screen">
				<Sidebar />
				<ResizablePanelGroup direction="horizontal">
					<SidePanel />
					<EditorWrapper />
				</ResizablePanelGroup>
			</section>
		</Providers>
	);
}
