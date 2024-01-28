import type { FC } from "react";

export const EmptyEditor: FC = () => {
	return (
		<div className="empty-editor grid h-full w-full place-items-center">
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
