import { LayoutGroup, Reorder, AnimatePresence } from "framer-motion";
import { Plus, SearchIcon, SendHorizonal } from "lucide-react";
import { ActiveNoteIdAtom, NotesAtom } from "@/store/note";
import { categoryStateAtom } from "@/store/category";
import { memo, useCallback, useMemo } from "react";
import { ResizablePanel } from "@/ui/resizable";
import { useAtom, useAtomValue } from "jotai";
import { Separator } from "@/ui/separator";
import { InputBlock } from "@/ui/input";
import { Button } from "@/ui/button";
import { appState } from "@/store";
import { ListItem } from ".";

import {
	filterNotesByFolder,
	generateFakeNotes,
	mapMenuToFolder,
} from "@/utils/helpers";

const MemoizedListItem = memo(ListItem);

export default function Layout() {
	const [notes, setNotes] = useAtom(NotesAtom);
	const [activeNoteId, setActiveNoteId] = useAtom(ActiveNoteIdAtom);

	const { activeMenu } = useAtomValue(appState);
	const { activeCategoryId: categoryId } = useAtomValue(categoryStateAtom);

	const handleClickItem = (id: string) => setActiveNoteId(id);

	const filteredNotes = useMemo(
		() => filterNotesByFolder(notes, mapMenuToFolder(activeMenu), categoryId!),
		[notes, activeMenu, categoryId],
	);

	const handleAddNewNote = useCallback(() => {
		setNotes((prevNotes) => [...prevNotes, ...generateFakeNotes()]);
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	function handleRemoveItem(id: string): void {
		throw new Error("Function not implemented.");
	}

	return (
		<ResizablePanel
			defaultSize={25}
			minSize={25}
			className="bg-neutral-100 dark:bg-neutral-900/80"
		>
			<section className="relative h-full border-l py-3">
				<div className="w-full px-2">
					<InputBlock
						type="text"
						root={{ variant: "filled" }}
						placeholder="Search for notes"
						leftIcon={<SearchIcon className="h-4 w-4" />}
						rightIcon={<SendHorizonal className="h-4 w-4" />}
					/>
				</div>
				<Separator className="mt-3 h-px bg-neutral-800" />

				<div className="no-scrollbar my-4 h-[calc(100vh_-_theme(spacing.20))] overflow-y-auto px-4">
					<LayoutGroup>
						<Reorder.Group
							axis="y"
							values={filteredNotes}
							onReorder={setNotes}
							className="flex flex-col gap-y-4 pb-5"
						>
							<AnimatePresence>
								{filteredNotes?.map((item, index) => {
									return (
										<MemoizedListItem
											item={item}
											key={item.id}
											order={index}
											onClick={handleClickItem}
											onRemoveItem={handleRemoveItem}
											active={activeNoteId === item.id}
										/>
									);
								})}
							</AnimatePresence>
						</Reorder.Group>
					</LayoutGroup>
				</div>

				<Button
					className="absolute bottom-6 right-6 h-10 w-10 rounded-full bg-amber-400 p-1 shadow-lg transition-colors duration-300 hover:bg-amber-300"
					onClick={handleAddNewNote}
				>
					<Plus />
				</Button>
			</section>
		</ResizablePanel>
	);
}
