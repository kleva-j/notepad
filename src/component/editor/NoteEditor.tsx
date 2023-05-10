/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import dynamic from "next/dynamic";
import dayjs from "dayjs";

import React, { FC, useCallback } from "react";

import { NoteStateAtom, updateNote, updateNotes } from "@/store/slice/note";
import { SettingsStateAtom } from "@/store/slice/settings";
import { getActiveNote } from "@/utils/helpers";
import { PreviewEditor } from "./PreviewEditor";
import { useAtom, useAtomValue } from "jotai";
import { EmptyEditor } from "./EmptyEditor";
import { Editor, Range } from "codemirror";
import { Menubar } from "./Menubar";
import { NoteItem } from "@/types";

const CodeMirror = dynamic(
	async () => {
		require("codemirror/addon/scroll/scrollpastend");
		require("codemirror/addon/selection/active-line");
		require("codemirror/theme/base16-light.css");
		require("codemirror/lib/codemirror.css");
		require("codemirror/mode/gfm/gfm");
		return import("react-codemirror2").then((mod) => mod.Controlled);
	},
	{ ssr: false }
);

export const NoteEditor: FC = () => {
	const { notes, activeNoteId, loading } = useAtomValue(NoteStateAtom);
	const [settings, updateSettings] = useAtom(SettingsStateAtom);
	const [, updateNoteState] = useAtom(updateNotes);

	const activeNote = getActiveNote(notes, activeNoteId) as NoteItem;

	const { previewMarkdown, codeMirrorOptions } = settings;

	const togglePreview = useCallback(
		() => updateSettings({ ...settings, previewMarkdown: !previewMarkdown }),
		[settings, previewMarkdown]
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
						notes: updateNote(notes, activeNote.id, {
							text: value,
							lastUpdated: dayjs().format(),
						}),
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
