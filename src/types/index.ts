import type { LucideProps } from "lucide-react";
import type {
	ForwardRefExoticComponent,
	ChangeEvent,
	MouseEvent,
	DragEvent,
} from "react";

import { Folder, MenuEnum, ThemeEnum } from "@/utils/enums";

export type Prettify<T> = {
	[K in keyof T]: T[K];
} & {};

export type WithoutNullableKeys<T> = {
	[Key in keyof T]-?: Prettify<WithoutNullableKeys<NonNullable<T[Key]>>>;
};

export type __Awaited__<T> = T extends Promise<infer U> ? __Awaited__<U> : T;

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
	text: string;
	checked: boolean;
}

export interface NoteItem {
	id: string;
	title: string;
	content: string;
	checked: boolean;
	trash: boolean;
	created: string;
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
	activeCategoryId: string | null;
}

export interface NoteState {
	notes: NoteItem[];
	activeFolder: Folder;
	activeNoteId: string | null;
	selectedNotes: NoteItem[];
	includeTrash: boolean;
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

export type Themes = keyof typeof ThemeEnum;
export type Menus = keyof typeof MenuEnum;

export type OptionsPosition = { x: number; y: number };

export type HandleOptionsEvent = (
	event: ClickEvent,
	categoryId: string,
) => void;

export type IconType = ForwardRefExoticComponent<LucideProps>;
