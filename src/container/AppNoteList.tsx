import { Folder as FolderIcon, MoreHorizontal, Book, Star } from "lucide-react";
import { debounceEvent, getNoteTitle, isDraftNote } from "@/utils/helpers";
import { Button as EmptyButton } from "@/components/notelist/Button";
import { UseNotesContext, UseCategoryContext } from "@/lib/context";
import { ClickEvent, NoteItem, ReactDragEvent } from "@/types";
import { ContextMenu } from "@/components/sidebar/ContextMenu";
import { SearchBar } from "@/components/notelist/SearchBar";
import { Folder, ContextMenuEnum } from "@/utils/enums";
import { NotesActions } from "@/lib/constants";
import {
	MutableRefObject,
	ReactElement,
	useEffect,
	useState,
	useRef,
} from "react";

export default function NoteList() {
	const { state: noteState, dispatch } = UseNotesContext();
	const { categories } = UseCategoryContext().state;

	const {
		activeFolder,
		activeCategoryId,
		searchValue,
		notes,
		selectedNotesIds,
	} = noteState;

	const searchNotes = debounceEvent(
		(searchValue: string) =>
			dispatch({ type: NotesActions.SET_NOTES_SEARCH, payload: searchValue }),
		100,
	);

	const re = new RegExp(
		searchValue.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"),
		"i",
	);
	const isMatch = (result: NoteItem) => re.test(result.text);

	const filter: Record<Folder, (note: NoteItem) => boolean> = {
		[Folder.CATEGORY]: (note) =>
			!note.trash && note.categoryId === activeCategoryId,
		[Folder.SCRATCHPAD]: (note) => !!note.scratchpad,
		[Folder.FAVORITES]: (note) => !note.trash && !!note.favorite,
		[Folder.TRASH]: (note) => !!note.trash,
		[Folder.ALL]: (note) => !note.trash && !note.scratchpad,
	};

	const filteredNotes: NoteItem[] = notes
		.filter(filter[activeFolder])
		.filter(isMatch);

	const searchRef = useRef() as MutableRefObject<HTMLInputElement>;

	const showEmptyTrash =
		activeFolder === Folder.TRASH && filteredNotes.length > 0;

	const handleDragStart = (event: ReactDragEvent, noteId = "") => {
		event.stopPropagation();
		event.dataTransfer.setData("text/plain", noteId);
	};

	const [optionsId, setOptionsId] = useState("");
	const [optionsPosition, setOptionsPosition] = useState({ x: 0, y: 0 });

	const handleOptionMenuClick = (event: Event | ClickEvent, noteId = "") => {
		const clicked = event.target;
		if (!clicked) return;

		if ("clientX" in event && "clientY" in event)
			setOptionsPosition(() => ({ x: event.pageX + 3, y: event.pageY + 5 }));

		event.stopPropagation();
		setOptionsId(!optionsId || optionsId !== noteId ? noteId : "");
	};

	const handleNoteRightClick = (event: Event | ClickEvent, noteId = "") => {
		event.preventDefault();
		handleOptionMenuClick(event as ClickEvent, noteId);
	};

	useEffect(() => {
		document.addEventListener("mousedown", handleNoteRightClick);

		return () => {
			document.removeEventListener("mousedown", handleNoteRightClick);
		};
	});

	return (
		<section className="flex h-full w-full flex-col overflow-auto bg-[#e5e5e5]">
			<div className="sticky top-0 flex h-[49px] w-full max-w-full items-center border-b border-b-[#cccccc] bg-[#e5e5e5] px-[0.5rem] text-center">
				<SearchBar searchRef={searchRef} searchNotes={searchNotes} />
				{showEmptyTrash && <EmptyButton label="Empty" />}
			</div>
			<div className="note-list">
				{filteredNotes.map((note: NoteItem) => {
					let noteTitle: string | ReactElement = getNoteTitle(note.text);
					const noteCategory = categories.find(
						(category) => category.id === note.categoryId,
					);

					if (searchValue) {
						const highlightStart = noteTitle.search(re);

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

					const isSelected = selectedNotesIds.includes(note.id);

					return (
						<div
							key={note.id}
							className={`note-list-item ${isSelected ? "selected" : ""} `}
							onClick={(event) => {
								event.stopPropagation();
								dispatch({
									type: NotesActions.PRUNE_VOID_NOTES,
									payload: { noteId: note.id },
								});
							}}
							draggable={note.text !== ""}
							onDragStart={(event) => handleDragStart(event, note.id)}
							onContextMenu={(event) => handleNoteRightClick(event, note.id)}
						>
							<div className="flex w-full items-center">
								<div className="flex w-full items-center justify-start">
									{note.favorite ? (
										<>
											<div className="flex-[0_0_9%]">
												<Star
													aria-hidden="true"
													className="note-favorite mr-[0.25rem]"
													size={12}
												/>
												<span className="sr-only">Favorite note</span>
											</div>
											<div className="note-title">{noteTitle}</div>
										</>
									) : (
										<>
											<div className="flex-[9%_0_0]" />
											<div className="note-title">{noteTitle}</div>
										</>
									)}
								</div>
								{!isDraftNote(note) ? (
									<div
										className="z-1 block cursor-pointer p-[0.4rem] text-base text-transparent"
										onClick={(event) => handleOptionMenuClick(event, note.id)}
									>
										<MoreHorizontal
											aria-hidden="true"
											size={15}
											className="more-option"
										/>
										<span className="sr-only">Note options</span>
									</div>
								) : (
									<div className="note-options">&nbsp;</div>
								)}
							</div>
							{(activeFolder === Folder.ALL ||
								activeFolder === Folder.FAVORITES) && (
								<div className="note-category">
									{noteCategory ? <FolderIcon size={12} /> : <Book size={12} />}
									<span className="ml-[0.5rem] text-[0.8rem]">
										{noteCategory?.name || "Notes"}
									</span>
								</div>
							)}
							{optionsId === note.id && !isDraftNote(note) && (
								<ContextMenu
									item={note}
									optionsPosition={optionsPosition}
									setOptionsId={setOptionsId}
									type={ContextMenuEnum.NOTE}
								/>
							)}
						</div>
					);
				})}
			</div>
		</section>
	);
}
