const AuthAction = {
	SET_LOGIN_SUCCESS: "SET_LOGIN_SUCCESS",
	SET_LOGIN_LOADING: "SET_LOGIN_LOADING",
	SET_CURRENT_USER: "SET_CURRENT_USER",
	SET_LOGIN_ERROR: "SET_LOGIN_ERROR",
	SET_AUTH_STATE: "SET_AUTH_STATE",
};

const SettingsAction = {};

const NotesAction = {
	FETCH_NOTES: "FETCH_NOTES",
	SET_NOTE_ID: "SET_NOTE_ID",
};

export const Actions = {
	...SettingsAction,
	...NotesAction,
	...AuthAction,
};
