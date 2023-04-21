/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */

export const debounceEvent = <T extends Function>(cb: T, wait = 20) => {
	let h = 0;
	const callable = (...args: any) => {
		clearTimeout(h);
		h = window.setTimeout(() => cb(...args), wait);
	};

	return <T>(<any>callable);
};

export const copyToClipboard = (text: string) => {
	navigator.clipboard.writeText(text);
};
