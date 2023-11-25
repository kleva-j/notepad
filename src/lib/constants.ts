export enum AuthActions {
	SET_LOGIN_SUCCESS = "SET_LOGIN_SUCCESS",
	SET_LOGIN_LOADING = "SET_LOGIN_LOADING",
	SET_CURRENT_USER = "SET_CURRENT_USER",
	SET_LOGIN_ERROR = "SET_LOGIN_ERROR",
	SET_AUTH_STATE = "SET_AUTH_STATE",
}

export enum SettingsActions {
	UPDATE_SETTINGS = "UPDATE_SETTINGS",
	SET_CODEMIRROR_CONFIG = "SET_CODEMIRROR_CONFIG",
}

export enum CategoryActions {
	SWAP_CATEGORY = "SWAP_CATEGORY",
	ADD_NEW_CATEGORY = "ADD_NEW_CATEGORY",
	SET_CATEGORIES_ERROR = "SET_CATEGORIES_ERROR",
	SET_CATEGORIES_LOADING = "SET_CATEGORIES_LOADING",
	SET_CATEGORIES_SUCCESS = "SET_CATEGORIES_SUCCESS",
}

export enum NotesActions {
	ADD_NEW_NOTE = "ADD_NEW_NOTE",
	FETCH_ALL_NOTES = "FETCH_ALL_NOTES",
	UPDATE_NOTES = "UPDATE_NOTES",
	SET_ACTIVE_NOTE_ID = "SET_ACTIVE_NOTE_ID",
	SET_ACTIVE_FOLDER = "SET_ACTIVE_FOLDER",
	SET_SELECTED_NOTES_ID = "SET_SELECTED_NOTES_ID",
	SET_ACTIVE_CATEGORY_ID = "SET_ACTIVE_CATEGORY_ID",
	SET_NOTES_ERROR = "SET_NOTES_ERROR",
	SET_NOTES_LOADING = "SET_NOTES_LOADING",
	SET_NOTES_SEARCH = "SET_NOTES_SEARCH",
	PRUNE_VOID_NOTES = "PRUNE_VOID_NOTES",
}