/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { type FC, useCallback } from "react";

import { PreviewEditor, EditorMenu, EmptyEditor } from "@/components/editor";
import { UseNotesContext, UseAppContext } from "@/lib/context";
import { SettingsActions } from "@/lib/constants";
import { getActiveNote } from "@/utils/helpers";

export const NoteEditor: FC = () => {
	const { state: noteState } = UseNotesContext();
	const { state: settings, dispatch: updateSettings } = UseAppContext();

	const { notes, activeNoteId, loading } = noteState;

	const activeNote = getActiveNote(notes, activeNoteId)!;

	const { previewMarkdown } = settings;

	const togglePreview = useCallback(
		() =>
			updateSettings({
				type: SettingsActions.UPDATE_SETTINGS,
				payload: { previewMarkdown: !previewMarkdown },
			}),
		[settings, previewMarkdown],
	);

	// const setEditorOverlay = () => {
	// 	// const query = /\{\{[^}]*}}/g;
	// };

	const renderEditor = () => {
		if (loading) return <div className="empty-editor">Loading...</div>;
		else if (!activeNote) return <EmptyEditor />;
		else if (previewMarkdown)
			return <PreviewEditor noteText={activeNote.text} />;

		return <div></div>;
	};

	return (
		<section className="relative h-full min-w-[300px]">
			<EditorMenu
				activeNote={!!activeNote}
				togglePreview={togglePreview}
				previewMarkdown={previewMarkdown}
			/>
			{renderEditor()}
		</section>
	);
};
