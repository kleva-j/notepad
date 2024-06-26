import { ResizablePanel } from "@/ui/resizable";

export const NoteList = () => {
	return (
		<ResizablePanel
			defaultSize={25}
			className="bg-neutral-100 dark:bg-neutral-900/80"
		>
			<section>
				<span>NoteList</span>
			</section>
		</ResizablePanel>
	);
};
