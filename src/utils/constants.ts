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

export const noteList = [
	{
		text: "Testing Note",
		id: "n-08177bc2-bb64-4fd5-9eb8-19d1ba5e3c52",
		categoryId: "",
		trash: false,
		created: "2024-02-07T11:32:49+01:00",
		lastUpdated: "2024-02-07T11:32:49+01:00",
		favorite: false,
	},
	{
		text: "Testing Note",
		id: "n-396a6a51-3a0b-4923-806f-d56d0e27ac3e",
		categoryId: "",
		trash: false,
		created: "2024-02-07T11:33:35+01:00",
		lastUpdated: "2024-02-07T11:33:35+01:00",
		favorite: false,
	},
	{
		text: "Testing Note",
		id: "n-c7a88001-ff8a-4506-83d3-adcd0a0f7d5f",
		categoryId: "c-9f25b460-fdb7-49ba-88b3-ba615d3edcba",
		trash: false,
		created: "2024-02-07T11:45:55+01:00",
		lastUpdated: "2024-02-07T11:45:55+01:00",
		favorite: false,
	},
	{
		text: "Testing Note",
		id: "n-42405ad4-ddc0-4e58-8e54-06b425108e2c",
		categoryId: "c-9f25b460-fdb7-49ba-88b3-ba615d3edcba",
		trash: false,
		created: "2024-02-07T11:45:55+01:00",
		lastUpdated: "2024-02-07T11:45:55+01:00",
		favorite: false,
	},
	{
		text: "Testing Note",
		id: "n-bc8f45fe-80bf-481a-884c-d242bfb3d404",
		categoryId: "c-4c4a1f8d-d376-4faf-964b-a23981987d09",
		trash: false,
		created: "2024-02-07T11:45:57+01:00",
		lastUpdated: "2024-02-07T11:45:57+01:00",
		favorite: false,
	},
	{
		text: "Testing Note",
		id: "n-982bfd6f-1497-446c-8474-a8545ffdcaa6",
		categoryId: "c-4c4a1f8d-d376-4faf-964b-a23981987d09",
		trash: false,
		created: "2024-02-07T11:45:58+01:00",
		lastUpdated: "2024-02-07T11:45:58+01:00",
		favorite: false,
	},
	{
		text: "Testing Note",
		id: "n-8207ff60-ef80-4adf-9395-6d7073e7366c",
		categoryId: "c-0ce0b7bc-7db4-426e-80cf-bd3a88dc6c44",
		trash: false,
		created: "2024-02-07T11:46:00+01:00",
		lastUpdated: "2024-02-07T11:46:00+01:00",
		favorite: false,
	},
	{
		text: "Testing Note",
		id: "n-007c3dfe-8ea8-46ee-a4c2-9f75dc64d8e2",
		categoryId: "c-0ce0b7bc-7db4-426e-80cf-bd3a88dc6c44",
		trash: false,
		created: "2024-02-07T11:46:00+01:00",
		lastUpdated: "2024-02-07T11:46:00+01:00",
		favorite: false,
	},
	{
		text: "Testing Note",
		id: "n-d508376f-5688-401a-8435-98acb83abc8e",
		categoryId: "c-961b5d87-eba5-4dc0-a3df-f9e1fec0708d",
		trash: false,
		created: "2024-02-07T11:46:03+01:00",
		lastUpdated: "2024-02-07T11:46:03+01:00",
		favorite: false,
	},
	{
		text: "Testing Note",
		id: "n-1629c8df-3321-4079-9536-2a53c9d25e3b",
		categoryId: "c-961b5d87-eba5-4dc0-a3df-f9e1fec0708d",
		trash: false,
		created: "2024-02-07T11:46:03+01:00",
		lastUpdated: "2024-02-07T11:46:03+01:00",
		favorite: false,
	},
];

export const categoryList = [
	{
		id: "c-961b5d87-eba5-4dc0-a3df-f9e1fec0708d",
		name: "Category No.4",
	},
	{
		id: "c-0ce0b7bc-7db4-426e-80cf-bd3a88dc6c44",
		name: "Category No.3",
	},
	{
		id: "c-4c4a1f8d-d376-4faf-964b-a23981987d09",
		name: "Category No.2",
	},
	{
		id: "c-9f25b460-fdb7-49ba-88b3-ba615d3edcba",
		name: "Category No.1",
	},
];
