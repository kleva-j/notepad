import { type PropsWithChildren, createContext, useContext } from "react";
import {
	updateActiveCategoryId,
	updateNoteState,
	NoteStateAtom,
	updateNote,
	pruneNotes,
	addNote,
} from "@/store/slice/note";
import { NotesActions } from "@/lib/constants";
import { useReducerAtom } from "jotai/utils";
import { Folder } from "@/utils/enums";
import { NoteState } from "@/types";
import { v4 as uuid } from "uuid";

import dayjs from "dayjs";

type Action = { type: keyof typeof NotesActions; payload?: any };
type Dispatch = (action: Action) => void;
type State = NoteState;

const NotesContext = createContext<
	{ state: State; dispatch: Dispatch } | undefined
>(undefined);

export function UseNotesContext() {
	const context = useContext(NotesContext);
	if (context === undefined)
		throw new Error(`UseNotesContext must be used within a NotesProvider`);
	return context;
}

function NotesReducer(state: State, { type, payload }: Action) {
	switch (type) {
		case NotesActions.ADD_NEW_NOTE: {
			const { activeFolder, activeCategoryId } = payload;
			return updateNoteState(state, {
				notes: addNote(state.notes, {
					id: `n-${uuid()}`,
					text: "",
					categoryId: activeFolder === Folder.CATEGORY ? activeCategoryId : "",
					trash: false,
					created: dayjs().format(),
					lastUpdated: dayjs().format(),
					favorite: activeFolder === Folder.FAVORITES,
				}),
			});
		}
		case NotesActions.UPDATE_NOTES: {
			return updateNoteState(state, {
				notes: updateNote(state.notes, state.activeNoteId, {
					...payload,
					lastUpdated: dayjs().format(),
				}),
			});
		}
		case NotesActions.SET_ACTIVE_NOTE_ID: {
			return updateNoteState(state, { selectedNotesIds: payload });
		}
		case NotesActions.SET_ACTIVE_FOLDER: {
			return updateNoteState(state, { activeFolder: payload });
		}
		case NotesActions.SET_SELECTED_NOTES_ID: {
			return updateNoteState(state, { selectedNotesIds: payload });
		}
		case NotesActions.SET_ACTIVE_CATEGORY_ID: {
			return updateNoteState(
				state,
				updateActiveCategoryId(state.notes, payload),
			);
		}
		case NotesActions.SET_NOTES_ERROR: {
			return updateNoteState(state, { error: payload });
		}
		case NotesActions.SET_NOTES_LOADING: {
			return updateNoteState(state, { loading: payload });
		}
		case NotesActions.SET_NOTES_SEARCH: {
			return updateNoteState(state, { searchValue: payload });
		}
		case NotesActions.PRUNE_VOID_NOTES: {
			return updateNoteState(state, {
				activeNoteId: payload.noteId,
				selectedNotesIds: [payload.noteId],
				notes: pruneNotes(state.notes, [payload.noteId]),
			});
		}
		default: {
			throw new Error(`Unhandled Notes action type: ${type}`);
		}
	}
}

export function NotesProvider({ children }: PropsWithChildren) {
	const [state, dispatch] = useReducerAtom(NoteStateAtom, NotesReducer);
	const value = { state, dispatch };
	return (
		<NotesContext.Provider value={value}>{children}</NotesContext.Provider>
	);
}
