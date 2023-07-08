/* eslint-disable @typescript-eslint/no-explicit-any */
import React, {
	PropsWithChildren,
	createContext,
	useReducer,
	useContext,
} from "react";
import { Actions } from "@/lib/constants";
import { AuthState } from "@/types";

export const initialState: AuthState = {
	loading: false,
	currentUser: {},
	isAuthenticated: false,
	error: "",
};

type Action = { type: keyof typeof Actions; payload?: any };
type State = typeof initialState;
type Dispatch = (action: Action) => void;

const AuthContext = createContext<
	{ state: State; dispatch: Dispatch } | undefined
>(undefined);

export function UseAuthContext() {
	const context = useContext(AuthContext);
	if (context === undefined)
		throw new Error(`UseAuthContext must be used within a AuthProvider`);
	return context;
}

function AppReducer(state: State, { type, payload }: Action) {
	switch (type) {
		case Actions.SET_AUTH_STATE: {
			return { ...state, isAuthenticated: payload };
		}
		case Actions.SET_CURRENT_USER: {
			return { ...state, currentUser: payload };
		}
		case Actions.SET_LOGIN_SUCCESS: {
			return { ...state, error: "" };
		}
		case Actions.SET_LOGIN_LOADING: {
			return { ...state, loading: payload };
		}
		case Actions.SET_LOGIN_ERROR: {
			return { ...state, error: payload };
		}
		default: {
			throw new Error(`Unhandled Auth action type: ${type}`);
		}
	}
}

export function ContextProvider({ children }: PropsWithChildren) {
	const [state, dispatch] = useReducer(AppReducer, initialState);
	const value = { state, dispatch };
	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
