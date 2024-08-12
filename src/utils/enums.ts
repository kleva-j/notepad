export enum Folder {
	ALL = "ALL",
	TRASH = "TRASH",
	CATEGORY = "CATEGORY",
	FAVORITES = "FAVORITES",
	SCRATCHPAD = "SCRATCHPAD",
}

export enum Colors {
	RED = "RED",
	BLUE = "BLUE",
	GRAY = "GRAY",
	PURPLE = "PURPLE",
}

export type ContextType = "category" | "note";
export enum ContextTypeEnum {
	category = "category",
	note = "note",
}

export enum ContextMenuEnum {
	CATEGORY = "CATEGORY",
	NOTE = "NOTE",
}

export enum NotesSortKey {
	LAST_UPDATED = "lastUpdated",
	TITLE = "title",
	CREATED_DATE = "created_date",
}

export enum DirectionText {
	LEFT_TO_RIGHT = "ltr",
	RIGHT_TO_LEFT = "rtl",
}

export enum Errors {
	INVALID_LINKED_NOTE_ID = "<invalid note id provided>",
}

export enum OptionTypesEnum {
	delete = "delete",
	renanme = "rename",
}

export enum ThemeEnum {
	light = "light",
	dark = "dark",
}

export enum EditorMode {
	preview = "preview",
	edit = "edit",
}

export enum MenuEnum {
	notes = "notes",
	favorites = "favorites",
	trash = "trash",
	categories = "categories",
	scratchpad = "scratchpad",
}

export enum Method {
	GET = "GET",
	POST = "POST",
	PUT = "PUT",
	PATCH = "PATCH",
	DELETE = "DELETE",
}
