/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import dynamic from "next/dynamic";

import React, { FC, useCallback } from "react";

import { NotesActions, SettingsActions } from "@/lib/constants";
import { UseNotesContext, UseAppContext } from "@/lib/context";
import { getActiveNote } from "@/utils/helpers";
import { Editor, Range } from "codemirror";
import { NoteItem } from "@/types";

import { PreviewEditor } from "./PreviewEditor";
import { EmptyEditor } from "./EmptyEditor";
import { Menubar } from "./Menubar";

const CodeMirror = dynamic(
	async () => {
		require("codemirror/addon/scroll/scrollpastend");
		require("codemirror/addon/selection/active-line");
		require("codemirror/theme/base16-light.css");
		require("codemirror/lib/codemirror.css");
		require("codemirror/mode/gfm/gfm");
		return import("react-codemirror2").then((mod) => mod.Controlled);
	},
	{ ssr: false },
);

export const NoteEditor: FC = () => {
	const { state: noteState, dispatch: updateNoteState } = UseNotesContext();
	const { state: settings, dispatch: updateSettings } = UseAppContext();

	const { notes, activeNoteId, loading } = noteState;

	const activeNote = getActiveNote(notes, activeNoteId) as NoteItem;

	const { previewMarkdown, codeMirrorOptions } = settings;

	const togglePreview = useCallback(
		() =>
			updateSettings({
				type: SettingsActions.UPDATE_SETTINGS,
				payload: { previewMarkdown: !previewMarkdown },
			}),
		[settings, previewMarkdown],
	);

	const setEditorOverlay = (editor: Editor) => {
		const query = /\{\{[^}]*}}/g;
		editor.addOverlay({
			token: function (stream: any) {
				query.lastIndex = stream.pos;
				const match = query.exec(stream.string);
				if (match && match.index == stream.pos) {
					stream.pos += match[0].length || 1;

					return "notelink";
				} else if (match) {
					stream.pos = match.index;
				} else {
					stream.skipToEnd();
				}
			},
		});
	};

	const renderEditor = () => {
		if (loading) return <div className="empty-editor">Loading...</div>;
		else if (!activeNote) return <EmptyEditor />;
		else if (previewMarkdown)
			return <PreviewEditor noteText={activeNote.text} />;

		return (
			<CodeMirror
				className="editor h-full"
				value={activeNote.text}
				options={codeMirrorOptions}
				editorDidMount={(editor) => {
					setTimeout(() => {
						editor.focus();
					}, 0);
					editor.setCursor(0);
					setEditorOverlay(editor);
				}}
				onChange={(editor, data, value) => {
					if (!value) editor.focus();
				}}
				onBeforeChange={(_editor, _data, value) => {
					updateNoteState({
						type: NotesActions.UPDATE_NOTES,
						payload: { text: value },
					});
				}}
				onPaste={(editor, event: any) => {
					// Get around pasting issue
					// https://github.com/scniro/react-codemirror2/issues/77
					if (
						!event.clipboardData ||
						!event.clipboardData.items ||
						!event.clipboardData.items[0]
					)
						return;
					event.clipboardData.items[0].getAsString((pasted: any) => {
						if (editor.getSelection() !== pasted) return;
						const { anchor, head } = editor.listSelections()[0] as Range;
						editor.setCursor({
							line: Math.max(anchor.line, head.line),
							ch: Math.max(anchor.ch, head.ch),
						});
					});
				}}
			/>
		);
	};

	return (
		<section className="relative h-full min-w-[300px]">
			<Menubar
				activeNote={!!activeNote}
				togglePreview={togglePreview}
				previewMarkdown={previewMarkdown}
			/>
			{renderEditor()}
		</section>
	);
};
