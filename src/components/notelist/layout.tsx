"use client";

/* eslint-disable react-hooks/exhaustive-deps */

import type { NoteItem } from "@/types";

import { ActiveNoteIdAtom, IncludeTrashAtom, NotesAtom } from "@/store/note";
import { filterNotesByFolder, mapMenuToFolder } from "@/utils/helpers";
import { LayoutGroup, Reorder, AnimatePresence } from "framer-motion";
import { SearchIcon, SendHorizonal } from "lucide-react";
import { categoryStateAtom } from "@/store/category";
import { memo, useCallback, useMemo } from "react";
import { ResizablePanel } from "@/ui/resizable";
import { useAtom, useAtomValue } from "jotai";
import { Separator } from "@/ui/separator";
import { menuSubjectAtom } from "@/store";
import { InputBlock } from "@/ui/input";
import { Folder } from "@/utils/enums";
import { ListItem, Toolbar } from ".";

const MemoizedListItem = memo(ListItem);

export default function Layout() {
	const [notes, setNotes] = useAtom(NotesAtom);
	const [includeTrash, setIncludeTrash] = useAtom(IncludeTrashAtom);
	const [activeNoteId, setActiveNoteId] = useAtom(ActiveNoteIdAtom);

	const activeMenu = useAtomValue(menuSubjectAtom);
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
			<section className="relative h-full py-3">
				<div className="w-full px-4">
					<InputBlock
						type="text"
						root={{ variant: "filled", className: "bg-neutral-200/40" }}
						placeholder="Search for notes"
						leftIcon={<SearchIcon className="h-4 w-4 text-gray-400 peer-focus:text-gray-600" />}
						rightIcon={<SendHorizonal className="h-4 w-4 text-gray-400 peer-focus:text-gray-600" />}
					/>
				</div>

				<Separator className="mt-3 h-px dark:bg-neutral-800" />

				<Toolbar
					activeMenu={activeMenu}
					isIncludeTrashChecked={includeTrash}
					onEmptyTrashClick={handleEmptyTrash}
					isTrashEmpty={filteredNotes.length === 0}
					onIncludeTrashChange={handleIncludeTrashChange}
				/>

				<Separator className="h-px dark:bg-neutral-800" />

				<div className="no-scrollbar my-4 h-[calc(100vh_-_theme(spacing.32))] overflow-y-auto px-4">
					<LayoutGroup>
						<Reorder.Group
							axis="y"
							values={filteredNotes}
							onReorder={setNotes}
							className="flex flex-col gap-y-4 pb-5"
						>
							<AnimatePresence initial={false} mode="popLayout">
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
			</section>
		</ResizablePanel>
	);
}
