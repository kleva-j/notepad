import { MutableRefObject } from "react";

import { useEventListener } from "./useEventListener";

type Handler = (event: MouseEvent | TouchEvent) => void;

export function useOnClickOutside<T extends HTMLElement = HTMLElement>(
	ref: MutableRefObject<T>,
	handler: Handler,
	mouseEvent: "mousedown" | "mouseup" = "mousedown"
): void {
	useEventListener(mouseEvent, (event) => {
		const el = ref?.current;
		if (!el || !(event.target instanceof Node) || el.contains(event.target))
			return;

		handler(event);
	});
}
