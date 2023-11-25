/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
import { MouseEvent, ChangeEvent, DragEvent } from "react";
import { Folder } from "@/utils/enums";

export type Prettify<T> = {
	[K in keyof T]: T[K];
} & {};

export type ReactMouseEvent =
	| MouseEvent
	| MouseEvent<HTMLDivElement>
	| ChangeEvent<HTMLSelectElement>;

export type ReactDragEvent = DragEvent<HTMLButtonElement | HTMLDivElement>;

export type ClickEvent =
	| MouseEvent<HTMLDivElement, MouseEvent>
	| ReactMouseEvent;

export interface CategoryItem {
	id: string;
	name: string;
	draggedOver: boolean;
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
	previewMarkdown: boolean;
	codeMirrorOptions: { [key: string]: any };
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

export type PreviewType = "edit" | "preview";

export enum Method {
	GET = "GET",
	POST = "POST",
	PUT = "PUT",
	PATCH = "PATCH",
	DELETE = "DELETE",
}

export type OptionsPosition = {
	x: number;
	y: number;
};

export type HandleOptionsEvent = (
	event: ClickEvent,
	categoryId: string,
) => void;
