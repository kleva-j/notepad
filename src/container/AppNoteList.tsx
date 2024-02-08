"use client";

import type { MutableRefObject, ReactElement } from "react";
import type { NoteItem } from "@/types";

import { UseNotesContext, UseCategoryContext } from "@/lib/context";
import { debounceEvent, getNoteTitle } from "@/utils/helpers";
import { SearchBar } from "@/components/notelist/SearchBar";
import { NoteCard } from "@/components/notelist/NoteCard";
import { AnimatePresence, Reorder } from "framer-motion";
import { NotesActions } from "@/lib/constants";
import { noteList } from "@/utils/constants";
import { useRef, useState } from "react";
import { Folder } from "@/utils/enums";

export default function NoteList() {
	const { state: noteState, dispatch } = UseNotesContext();
	const { categories } = UseCategoryContext().state;

	const {
		selectedNotesIds,
		activeCategoryId,
		activeFolder,
		searchValue,
		notes,
	} = noteState;

	const { SET_NOTES_SEARCH, PRUNE_VOID_NOTES } = NotesActions;

	const searchNotes = debounceEvent(
		(searchValue: string) =>
			dispatch({ type: SET_NOTES_SEARCH, payload: searchValue }),
		100,
	);

	const regExp = new RegExp(
		searchValue.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"),
		"i",
	);

	const isMatch = (result: NoteItem) => regExp.test(result.text);

	const filter: Record<Folder, (note: NoteItem) => boolean> = {
		[Folder.CATEGORY]: (note) =>
			!note.trash && note.categoryId === activeCategoryId,
		[Folder.SCRATCHPAD]: (note) => !!note.scratchpad,
		[Folder.FAVORITES]: (note) => !note.trash && !!note.favorite,
		[Folder.TRASH]: (note) => !!note.trash,
		[Folder.ALL]: (note) => !note.trash && !note.scratchpad,
	};

	let filteredNotes: NoteItem[] = notes
		.filter(filter[activeFolder])
		.filter(isMatch);

	const searchRef = useRef() as MutableRefObject<HTMLInputElement>;

	const showEmptyTrash =
		activeFolder === Folder.TRASH && filteredNotes.length > 0;

	const [items, setItems] = useState(noteList);

	return (
		<section className="flex h-full w-full flex-col overflow-y-auto">
			<div className="flex items-center border-b px-3 text-center">
				<SearchBar searchRef={searchRef} />
				{showEmptyTrash && <div>Empty Button</div>}
			</div>
			<Reorder.Group
				axis="y"
				values={items}
				onReorder={setItems}
				className="flex flex-col gap-y-2.5 p-3"
			>
				<AnimatePresence aria-label="Note list">
					{items.map((note, index) => {
						let noteTitle: string | ReactElement = getNoteTitle(note.text);
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
								note={note}
								title={noteTitle}
								index={index}
								category={noteCategory}
								activeFolder={activeFolder}
								handlePrune={(noteId) =>
									dispatch({ type: PRUNE_VOID_NOTES, payload: { noteId } })
								}
								isSelected={selectedNotesIds.includes(note.id)}
							/>
						);
					})}
				</AnimatePresence>
			</Reorder.Group>
		</section>
	);
}
