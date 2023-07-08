/* eslint-disable @typescript-eslint/no-explicit-any */
import React, {
	PropsWithChildren,
	createContext,
	useReducer,
	useContext,
} from "react";
import { Actions } from "@/lib/constants";

export const initialState = {};

type Action = { type: keyof typeof Actions; payload?: any };
type State = typeof initialState;
type Dispatch = (action: Action) => void;

const AppContext = createContext<
	{ state: State; dispatch: Dispatch } | undefined
>(undefined);

export function UseAppContext() {
	const context = useContext(AppContext);
	if (context === undefined)
		throw new Error(`useUserDispatch must be used within a UserProvider`);
	return context;
}

function AppReducer(state: State, action: Action) {
	switch (action.type) {
		case Actions.FETCH_NOTES: {
			return { ...state };
		}
		case Actions.SET_NOTE_ID: {
			return { ...state };
		}
		default: {
			throw new Error(`Unhandled action type: ${action.type}`);
		}
	}
}

export function ContextProvider({ children }: PropsWithChildren) {
	const [state, dispatch] = useReducer(AppReducer, { ...initialState });
	const value = { state, dispatch };
	return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
