import { Folder } from "@/utils/enums";

export const iconColor = "rgba(255, 255, 255, 0.25)";

export const sampleData = {
	sampleCategories: [
		{
			text: "Sample 1",
			folder: Folder.TRASH,
			active: false,
		},
		{
			text: "Sample 2",
			folder: Folder.TRASH,
			active: false,
		},
	],
};

export enum LabelText {
	ADD_CATEGORY = "Add category",
	COLLAPSE_CATEGORY = "Collapse Category List",
	NOTES = "Notes",
	CREATE_NEW_NOTE = "Create new note",
	DELETE_PERMANENTLY = "Delete permanently",
	DOWNLOAD = "Download",
	FAVORITES = "Favorites",
	SCRATCHPAD = "Scratchpad",
	MARK_AS_FAVORITE = "Mark as favorite",
	MOVE_TO_TRASH = "Move to trash",
	NEW_CATEGORY = "New category...",
	NEW_NOTE = "New note",
	REMOVE_CATEGORY = "Remove category",
	REMOVE_FAVORITE = "Remove favorite",
	MOVE_CATEGORY = "Move category",
	RESTORE_FROM_TRASH = "Restore from trash",
	SETTINGS = "Settings",
	SYNC_NOTES = "Sync notes",
	TRASH = "Trash",
	WELCOME_TO_TAKENOTE = "Welcome to Takenote!",
	RENAME = "Rename category",
	ADD_CONTENT_NOTE = "Please add content to this new note to access the menu options.",
	DOWNLOAD_ALL_NOTES = "Download all notes",
	BACKUP_ALL_NOTES = "Export backup",
	IMPORT_BACKUP = "Import backup",
	TOGGLE_FAVORITE = "Toggle favorite",
	COPY_REFERENCE_TO_NOTE = "Copy reference to note",
}
