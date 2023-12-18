import React, { FC } from "react";

type ButtonProps = {
	label: string;
	disabled?: boolean;
	onclick?: () => void;
};

export const Button: FC<ButtonProps> = ({ label, onclick, disabled }) => (
	<button
		className={`${label}-button`}
		aria-label={label}
		onClick={onclick}
		disabled={disabled}
		title={label}
	>
		{label}
	</button>
);
