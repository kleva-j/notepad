import type { EditorUser } from "@/tiptap/components/block-editor/types";
import type { Doc as YDoc } from "yjs";

import { TiptapCollabProvider, WebSocketStatus } from "@hocuspocus/provider";
import { ExtensionKit } from "@/tiptap/extensions/extension-kit";
import { debouncedValueAtom, menuSubjectAtom } from "@/store";
import { ActiveNoteIdAtom, NotesAtom } from "@/store/note";
import { useEffect, useMemo, useState } from "react";
import { initialContent } from "@/tiptap/lib/data";
import { useAtomValue, useSetAtom } from "jotai";
import { useSidebar } from "./use-sidebar";
import { useEditor } from "@tiptap/react";
import { MenuEnum } from "@/utils/enums";

type UseBlockEditorProps = {
	ydoc: YDoc;
	content: string;
	provider?: TiptapCollabProvider | null | undefined;
};

export const useBlockEditor = ({ provider }: UseBlockEditorProps) => {
	const leftSidebar = useSidebar();
	const [collabState, setCollabState] = useState<WebSocketStatus>(
		WebSocketStatus.Connecting,
	);

	const notes = useAtomValue(NotesAtom);
	const noteId = useAtomValue(ActiveNoteIdAtom);
	const activeMenu = useAtomValue(menuSubjectAtom);
	const setDebouncedValue = useSetAtom(debouncedValueAtom);
	const activeNote = notes.find((note) => note.id === noteId);

	const editor = useEditor({
		onUpdate: ({ editor }) => {
			if (activeMenu === MenuEnum.scratchpad) {
				editor.commands.setContent(initialContent);
			}
		},
		autofocus: true,
		extensions: [...ExtensionKit({ provider })],
		content: initialContent,
		editorProps: {
			attributes: {
				autocomplete: "off",
				autocorrect: "off",
				autocapitalize: "off",
				class: "min-h-full",
			},
		},
	});

	const users = useMemo(() => {
		if (!editor?.storage.collaborationCursor?.users) {
			return [];
		}

		return editor.storage.collaborationCursor?.users.map((user: EditorUser) => {
			const names = user.name?.split(" ");
			const firstName = names?.[0];
			const lastName = names?.[names.length - 1];
			const initials = `${firstName?.[0] || "?"}${lastName?.[0] || "?"}`;

			return { ...user, initials: initials.length ? initials : "?" };
		});
	}, [editor?.storage.collaborationCursor?.users]);

	const characterCount = editor?.storage.characterCount || {
		characters: () => 0,
		words: () => 0,
	};

	useEffect(() => {
		if (editor) {
			if (activeMenu === MenuEnum.scratchpad) {
				editor.commands.setContent(initialContent);
			}
		}
	}, [activeMenu, editor]);

	useEffect(() => {
		if (editor) {
			if (noteId && activeNote) {
				editor.commands.setContent(activeNote.content);
			}
		}
	}, [noteId, activeNote, editor]);

	useEffect(() => {
		provider?.on("status", (event: { status: WebSocketStatus }) => {
			setCollabState(event.status);
		});
	}, [provider]);

	window.editor = editor;

	return { editor, users, characterCount, collabState, leftSidebar };
};
