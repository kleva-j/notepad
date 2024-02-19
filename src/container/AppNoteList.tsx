"use client";

import type { MutableRefObject, ReactElement } from "react";
import type { NoteItem } from "@/types";

import { UseNotesContext, UseCategoryContext } from "@/lib/context";
import { SearchBar } from "@/components/notelist/SearchBar";
import { ResizablePanel } from "@/components/ui/resizable";
import { NoteCard } from "@/components/notelist/NoteCard";
import { AnimatePresence, Reorder } from "framer-motion";
import { filterNotesByFolder } from "@/store/slice/note";
import { useDebounceCallback } from "usehooks-ts";
import { NotesActions } from "@/lib/constants";
import { getNoteTitle } from "@/utils/helpers";
import { Folder } from "@/utils/enums";
import { useRef } from "react";

export default function NoteList() {
	const { state: noteState, dispatch } = UseNotesContext();
	const { categories } = UseCategoryContext().state;

	const {
		selectedNotesIds,
		activeCategoryId,
		notes,
		activeFolder,
		searchValue,
		activeNoteId,
	} = noteState;

	const { SET_NOTES_SEARCH, SET_ACTIVE_NOTE_ID } = NotesActions;

	const searchNotes = useDebounceCallback(
		(searchValue: string) =>
			dispatch({ type: SET_NOTES_SEARCH, payload: searchValue }),
		300,
	);

	const regExp = new RegExp(
		searchValue.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"),
		"i",
	);

	const filteredList = filterNotesByFolder(
		notes,
		activeFolder,
		activeCategoryId,
	).filter((result: NoteItem) => regExp.test(result.content));

	const searchRef = useRef() as MutableRefObject<HTMLInputElement>;

	const showEmptyTrash = activeFolder === Folder.TRASH && notes.length > 0;

	return (
		<ResizablePanel
			defaultSize={25}
			className="bg-neutral-100 dark:bg-neutral-900"
		>
			<section className="flex h-full w-full flex-col overflow-y-auto">
				<div className="flex items-center border-b px-3 text-center">
					<SearchBar searchRef={searchRef} />
					{showEmptyTrash && <div>Empty Button</div>}
				</div>
				<Reorder.Group
					axis="y"
					values={filteredList}
					onReorder={() => {}}
					className="flex flex-col gap-y-2.5 p-3"
				>
					<AnimatePresence aria-label="Note list">
						{filteredList.map((note, index) => {
							let noteTitle: string | ReactElement = getNoteTitle(note.title);
							const noteCategory = categories.find(
								(category) => category.id === note.categoryId,
							);

							if (searchValue) {
								const highlightStart = noteTitle.search(regExp);

								if (highlightStart !== -1) {
									const highlightEnd = highlightStart + searchValue.length;

									noteTitle = (
										<>
											{noteTitle.slice(0, highlightStart)}
											<strong className="highlighted">
												{noteTitle.slice(highlightStart, highlightEnd)}
											</strong>
											{noteTitle.slice(highlightEnd)}
										</>
									);
								}
							}
							return (
								<NoteCard
									key={note.id}
									index={index}
									note={note}
									handleSelect={() => {}}
									isActive={note.id === activeNoteId}
									title={noteTitle}
									category={noteCategory}
									activeFolder={activeFolder}
									handleClick={(noteId) =>
										dispatch({ type: SET_ACTIVE_NOTE_ID, payload: noteId })
									}
									isSelected={selectedNotesIds.includes(note.id)}
								/>
							);
						})}
					</AnimatePresence>
				</Reorder.Group>
			</section>
		</ResizablePanel>
	);
}
