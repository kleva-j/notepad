/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import type { NoteItem } from "@/types";

import { useState, useEffect, useCallback, useRef } from "react";
import { ActiveNoteIdAtom, NotesAtom } from "@/store/note";
import { useAtom, useAtomValue } from "jotai";

import dynamic from "next/dynamic";

export const Tiptap = dynamic(() => import("./tiptap"), { ssr: false });

export const NoteEditor = () => {
	const activeNoteId = useAtomValue(ActiveNoteIdAtom);

	const [notes, setNotes] = useAtom(NotesAtom);
	const activeNote = notes.find((note) => note.id === activeNoteId);
	const [textValue, setTextValue] = useState(activeNote?.content ?? "");

	const currentNoteRef = useRef<NoteItem>();

	useEffect(() => {
		if (activeNoteId && activeNote) {
			currentNoteRef.current = activeNote;
		}
	}, []);

	const updateNote = useCallback((note: NoteItem) => {
		setNotes((_notes) => _notes.map((n) => (n.id === note.id ? note : n)));
	}, []);

	useEffect(() => {
		if (activeNoteId && activeNote) {
			const detectChange = activeNote.id !== currentNoteRef.current?.id;
			if (detectChange) {
				const prevNote = currentNoteRef.current as NoteItem;
				updateNote({ ...prevNote, content: textValue });
				setTextValue(activeNote.content);
				currentNoteRef.current = activeNote;
			}
		}
	}, [activeNoteId]);

	return <Tiptap>{textValue}</Tiptap>;
};
