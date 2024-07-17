"use client";

/* eslint-disable react-hooks/exhaustive-deps */

import type { NoteItem } from "@/types";

import { ActiveNoteIdAtom, IncludeTrashAtom, NotesAtom } from "@/store/note";
import { LayoutGroup, Reorder, AnimatePresence } from "framer-motion";
import { Plus, SearchIcon, SendHorizonal } from "lucide-react";
import { categoryStateAtom } from "@/store/category";
import { memo, useCallback, useMemo } from "react";
import { ResizablePanel } from "@/ui/resizable";
import { useAtom, useAtomValue } from "jotai";
import { Separator } from "@/ui/separator";
import { InputBlock } from "@/ui/input";
import { Folder } from "@/utils/enums";
import { ListItem, Toolbar } from ".";
import { Button } from "@/ui/button";
import { appState } from "@/store";
import {
	filterNotesByFolder,
	generateFakeNotes,
	mapMenuToFolder,
} from "@/utils/helpers";

const MemoizedListItem = memo(ListItem);

export default function Layout() {
	const [notes, setNotes] = useAtom(NotesAtom);
	const [includeTrash, setIncludeTrash] = useAtom(IncludeTrashAtom);
	const [activeNoteId, setActiveNoteId] = useAtom(ActiveNoteIdAtom);

	const { activeMenu } = useAtomValue(appState);
	const { activeCategoryId: categoryId } = useAtomValue(categoryStateAtom);

	const handleClickItem = useCallback((id: string) => setActiveNoteId(id), []);

	const filteredNotes = useMemo(
		() =>
			filterNotesByFolder(
				notes,
				mapMenuToFolder(activeMenu),
				categoryId!,
				includeTrash ? { [Folder.ALL]: (notes: NoteItem[]) => notes } : {},
			),
		[notes, activeMenu, categoryId, includeTrash],
	);

	const handleAddNewNote = useCallback(() => {
		setNotes((notes) => [...notes, ...generateFakeNotes()]);
	}, []);

	const handleEmptyTrash = useCallback(() => {
		setNotes((notes) => notes.filter((note) => note && !note.trash));
	}, []);

	const handleRemoveItem = useCallback((id: string) => {
		setNotes((notes) => notes.filter((note) => note?.id !== id));
	}, []);

	const handleIncludeTrashChange = useCallback(
		(checked: boolean) => {
			setIncludeTrash(checked);
		},
		[setIncludeTrash],
	);

	const handleNoteUpdate = useCallback(
		(id: string, note: Partial<NoteItem>) => {
			setNotes((prevNotes) =>
				prevNotes.map((item) => (item.id === id ? { ...item, ...note } : item)),
			);
		},
		[setNotes],
	);

	return (
		<ResizablePanel
			defaultSize={25}
			minSize={25}
			className="bg-neutral-100 dark:bg-neutral-900/60"
		>
			<section className="relative h-full border-l py-3">
				<div className="w-full px-4">
					<InputBlock
						type="text"
						root={{ variant: "filled" }}
						placeholder="Search for notes"
						leftIcon={<SearchIcon className="h-4 w-4" />}
						rightIcon={<SendHorizonal className="h-4 w-4" />}
					/>
				</div>

				<Separator className="mt-3 h-px bg-neutral-800" />

				<Toolbar
					activeMenu={activeMenu}
					isIncludeTrashChecked={includeTrash}
					onEmptyTrashClick={handleEmptyTrash}
					isTrashEmpty={filteredNotes.length === 0}
					onIncludeTrashChange={handleIncludeTrashChange}
				/>

				<Separator className="h-px bg-neutral-800" />

				<div className="no-scrollbar my-4 h-[calc(100vh_-_theme(spacing.32))] overflow-y-auto px-4">
					<LayoutGroup>
						<Reorder.Group
							axis="y"
							values={filteredNotes}
							onReorder={setNotes}
							className="flex flex-col gap-y-4 pb-5"
						>
							<AnimatePresence initial={false}>
								{filteredNotes?.map((item, index) => (
									<MemoizedListItem
										key={item.id}
										order={index}
										item={item}
										onClick={handleClickItem}
										updateNote={handleNoteUpdate}
										onRemoveItem={handleRemoveItem}
										active={activeNoteId === item.id}
									/>
								))}
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
