import { ActiveNoteIdAtom, NotesAtom } from "@/store/note";
import { menuSubject$, menuSubjectAtom } from "@/store";
import { showErrorToast } from "@/utils/handleError";
import { Checkbox } from "@/components/ui/checkbox";
import { useAtomValue, useSetAtom } from "jotai";
import { TitleSchema } from "@/utils/constants";
import { Button } from "@/components/ui/button";
import { generateNote } from "@/utils/helpers";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MenuEnum } from "@/utils/enums";
import { useRef, useState } from "react";
import { toast } from "sonner";

export type ToolbarItemProps = { replayAction: () => void };

export const AddNote = ({ replayAction }: ToolbarItemProps) => {
	const inputRef = useRef<HTMLInputElement>(null);

	const [checked, setChecked] = useState(false);

	const setNotes = useSetAtom(NotesAtom);
	const activeMenu = useAtomValue(menuSubjectAtom);
	const setActiveNoteId = useSetAtom(ActiveNoteIdAtom);

	const addNewNote = () => {
		const text = inputRef.current?.value;
		const parsedText = TitleSchema.safeParse(text);

		if (parsedText.success) {
			const note = generateNote({ title: parsedText.data, trash: false });

			setNotes((notes) => [...notes, note]);

			if (activeMenu !== MenuEnum.notes) menuSubject$.next(MenuEnum.notes);

			if (checked) setActiveNoteId(note.id);

			toast.success("Note Created!");

			replayAction();
		} else showErrorToast(parsedText.error);
	};

	return (
		<form
			className="flex h-full flex-col justify-between"
			onSubmit={(e) => {
				e.preventDefault();
				addNewNote();
			}}
		>
			<Input
				type="text"
				ref={inputRef}
				className="max-h-[36px] text-zinc-400"
				placeholder="Title here..."
			/>
			<Label className="mb-2 mt-5 flex items-center gap-x-2 text-xs font-medium leading-none text-zinc-400 peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
				<Checkbox
					checked={checked}
					onCheckedChange={() => setChecked(!checked)}
				/>
				Open in editor
			</Label>
			<Button type="submit" variant="secondary">
				Add Note
			</Button>
		</form>
	);
};
