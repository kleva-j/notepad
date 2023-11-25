/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { PropsWithChildren, createContext, useContext } from "react";

import { AuthStateAtom } from "@/store/slice/auth";
import { AuthActions } from "@/lib/constants";
import { useReducerAtom } from "jotai/utils";
import { AuthState } from "@/types";

type Action = { type: keyof typeof AuthActions; payload: any };
type Dispatch = (action: Action) => void;
type State = AuthState;

const AuthContext = createContext<
	{ state: State; dispatch: Dispatch } | undefined
>(undefined);

export function UseAuthContext() {
	const context = useContext(AuthContext);
	if (context === undefined)
		throw new Error(`UseAuthContext must be used within a AuthProvider`);
	return context;
}

function AuthReducer(state: State, { type, payload }: Action) {
	switch (type) {
		case AuthActions.SET_AUTH_STATE: {
			return { ...state, isAuthenticated: payload };
		}
		case AuthActions.SET_CURRENT_USER: {
			return { ...state, currentUser: payload };
		}
		case AuthActions.SET_LOGIN_SUCCESS: {
			return { ...state, error: "" };
		}
		case AuthActions.SET_LOGIN_LOADING: {
			return { ...state, loading: payload };
		}
		case AuthActions.SET_LOGIN_ERROR: {
			return { ...state, error: payload };
		}
		default: {
			throw new Error(`Unhandled Auth action type: ${type}`);
		}
	}
}

export function AuthProvider({ children }: PropsWithChildren) {
	const [state, dispatch] = useReducerAtom(AuthStateAtom, AuthReducer);
	const value = { state, dispatch };
	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
