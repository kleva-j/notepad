export interface CategoryItem {
	id: string;
	name: string;
}

export interface NoteItem {
	id: string;
	text: string;
	created: string;
	lastUpdated: string;
	categoryId?: string;
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
