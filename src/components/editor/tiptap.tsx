"use client";

import { type FC, useMemo, useState } from "react";

import { TiptapCollabProvider } from "@hocuspocus/provider";
import { BlockEditor } from "@/tiptap/components";
import { Doc as YDoc } from "yjs";

export const Tiptap: FC<{ children: string }> = ({ children }) => {
	const [provider] = useState<TiptapCollabProvider | null>(null);

	const ydoc = useMemo(() => new YDoc(), []);

	return (
		<BlockEditor
			ydoc={ydoc}
			hasCollab={false}
			content={children}
			provider={provider}
		/>
	);
};

export default Tiptap;
