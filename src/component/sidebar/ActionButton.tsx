import { Icon as IconType } from "react-feather";
import { iconColor } from "@/utils/constants";
import React, { FC } from "react";

type ButtonProps = {
	label: string;
	disabled?: boolean;
	icon: IconType;
	onclick?: () => void;
};

export const Button: FC<ButtonProps> = ({
	icon: Icon,
	label,
	onclick,
	disabled = false,
}) => {
	return (
		<button
			className="action-button font-semibold text-white"
			aria-label={label}
			onClick={onclick}
			disabled={disabled}
			title={label}
		>
			<Icon size={18} color={iconColor} aria-hidden="true" focusable="false" />
			<span className="ml-3">{label}</span>
		</button>
	);
};
