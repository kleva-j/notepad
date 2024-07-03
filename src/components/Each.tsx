import { Children } from "react";

type EachProps = {
	of: any[];
	onClick?: (id: string) => void;
	render: (
		item: any,
		index: number,
		onClick?: (id: string) => void,
	) => JSX.Element;
};

export const Each = ({ of, render, onClick }: EachProps) =>
	Children.toArray(
		Array.isArray(of) && of.map((item, index) => render(item, index, onClick)),
	);
