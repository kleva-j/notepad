import type { FC } from "react";

export const EmptyEditor: FC = () => {
	return (
		<div className="empty-editor flex h-screen w-full items-center justify-center bg-[#f5f5f5]">
			<div className="text-center">
				<p>
					<strong>Create a note</strong>
				</p>
				<p>
					<kbd>CTRL</kbd> + <kbd>ALT</kbd> + <kbd>N</kbd>
				</p>
			</div>
		</div>
	);
};
