import { Children } from "react";

type EachProps = {
	of: any[];
	render: (item: any, index: number) => JSX.Element;
};

export const Each = ({ of, render }: EachProps) =>
	Children.toArray(of.map((item, index) => render(item, index)));
