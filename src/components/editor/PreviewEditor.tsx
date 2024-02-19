import type { NoteItem } from "@/types";

interface PreviewEditorProps {
	noteText: string;
	directionText?: string;
	notes?: NoteItem[];
}

export const PreviewEditor = ({}: PreviewEditorProps) => {
	return <div>Preview Notes</div>;
};
