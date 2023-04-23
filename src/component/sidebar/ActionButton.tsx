import React, { FC } from "react";

type ButtonProps = {
	label: string;
	icon?: JSX.Element;
	onclick?: () => void;
};

export const Button: FC<ButtonProps> = ({ icon, label }) => {
	return (
		<button className="flex items-center justify-center gap-x-2 px-2 py-1">
			{icon}
			<span>{label}</span>
		</button>
	);
};
