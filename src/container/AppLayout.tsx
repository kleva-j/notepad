"use client";

import AppSidebar from "./AppSidebar";
import NoteEditor from "./AppEditor";
import NoteList from "./AppNoteList";
import React from "react";

import { Allotment } from "allotment";

import "allotment/dist/style.css";

export const Layout = () => {
	return (
		<section className="flex h-screen w-screen">
			<Allotment minSize={200} proportionalLayout>
				<Allotment.Pane preferredSize={240} maxSize={400}>
					<AppSidebar />
				</Allotment.Pane>
				<Allotment.Pane preferredSize={320} maxSize={400}>
					<NoteList />
				</Allotment.Pane>
				<NoteEditor />
			</Allotment>
		</section>
	);
};
