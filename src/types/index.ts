import { MouseEvent, ChangeEvent } from "react";
import { Folder } from "@/utils/enums";

export type ReactMouseEvent =
	| MouseEvent
	| MouseEvent<HTMLDivElement>
	| ChangeEvent<HTMLSelectElement>;

export interface CategoryItem {
	id: string;
	name: string;
}

export interface NoteItem {
	id: string;
	text: string;
	trash: boolean;
	created: string;
	scratchpad?: boolean;
	lastUpdated: string;
	categoryId?: string;
	favorite?: boolean;
}

export interface SyncPayload {
	categories: CategoryItem[];
	notes: NoteItem[];
}

export interface GithubUser {
	[key: string]: string;
}

export interface AuthState {
	loading: boolean;
	currentUser: GithubUser;
	isAuthenticated: boolean;
	error?: string;
}

export interface CategoryState {
	categories: CategoryItem[];
	error: string;
	loading: boolean;
}

export interface NoteState {
	notes: NoteItem[];
	activeFolder: Folder;
	activeNoteId: string;
	selectedNotesIds: string[];
	activeCategoryId: string;
	error: string;
	loading: boolean;
	searchValue: string;
}

export interface SettingsState {
	isOpen: boolean;
	loading: boolean;
	darkTheme: boolean;
	sidebarVisible: boolean;
}

export interface SyncState {
	syncing: boolean;
	lastSynced: string;
	error: string;
	pendingSync: boolean;
}

export interface RootState {
	authState: AuthState;
	categoryState: CategoryState;
	noteState: NoteState;
	settingsState: SettingsState;
	syncState: SyncState;
}
