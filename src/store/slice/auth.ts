import { AuthState } from "@/types";
import { atom } from "jotai";

const initialState: AuthState = {
	loading: false,
	currentUser: {},
	isAuthenticated: false,
	error: "",
};

export const updateAuthState = (
	state: AuthState,
	payload: Partial<AuthState>
): AuthState => ({ ...state, ...payload });

export const AuthStateAtom = atom<AuthState>(initialState);

export const updateAuthStateAtom = atom(
	() => initialState,
	(get, set, payload: Partial<AuthState>) => {
		set(AuthStateAtom, updateAuthState(get(AuthStateAtom), payload));
	}
);

export const login = ({ loading }: Pick<AuthState, "loading">) => ({ loading });

export const loginSuccess = ({
	currentUser,
}: Pick<AuthState, "currentUser">) => ({
	isAuthenticated: true,
	loading: false,
	currentUser,
});

export const loginError = ({ error }: Pick<AuthState, "error">) => ({
	isAuthenticated: false,
	loading: false,
	error,
});

export const logout = () => ({ loading: true });

export const logoutSuccess = () => initialState;
