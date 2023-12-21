import type { SettingsState } from "@/types";

import { type PropsWithChildren, createContext, useContext } from "react";

import { SettingsStateAtom } from "@/store/slice/settings";
import { SettingsActions } from "@/lib/constants";
import { useReducerAtom } from "jotai/utils";

type Action = { type: keyof typeof SettingsActions; payload?: any };
type Dispatch = (action: Action) => void;
type State = SettingsState;

const AppContext = createContext<
	{ state: State; dispatch: Dispatch } | undefined
>(undefined);

export function UseAppContext() {
	const context = useContext(AppContext);
	if (context === undefined)
		throw new Error(`useAppContext must be used within a AppContext provider.`);
	return context;
}

function AppReducer(state: State, { type, payload }: Action) {
	switch (type) {
		case SettingsActions.UPDATE_SETTINGS: {
			const { codeMirrorOptions, ...rest } = state;
			return { ...rest, ...payload, codeMirrorOptions };
		}
		case SettingsActions.SET_CODEMIRROR_CONFIG: {
			return {
				...state,
				codeMirrorOptions: {
					...state.codeMirrorOptions,
					...payload,
				},
			};
		}
		default: {
			throw new Error(`Unhandled action type: ${type}`);
		}
	}
}

export function AppProvider({ children }: PropsWithChildren) {
	const [state, dispatch] = useReducerAtom(SettingsStateAtom, AppReducer);
	const value = { state, dispatch };
	return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
