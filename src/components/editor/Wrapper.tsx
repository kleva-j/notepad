import { EmptyEditor } from "@/components/editor/EmptyEditor";
import { ResizablePanel } from "@/components/ui/resizable";

export const EditorWrapper = () => {
	return (
		<ResizablePanel
			defaultSize={75}
			className="bg-neutral-200 dark:bg-neutral-900"
		>
			<EmptyEditor />
		</ResizablePanel>
	);
};
