import { Auth } from "@usertypes/auth";
import { atom } from "recoil";

export const enum AuthState {
	Loading,
	Authenticated,
	Unauthenticated,
}

export const authAtom = atom({
	key: "auth",
	default: undefined as Auth | undefined,
});

export const authStateAtom = atom({
	key: "authState",
	default: AuthState.Loading,
});

export const accessTokenAtom = atom({
	key: "accessToken",
	default: "",
});

export const resetPwdEmailAtom = atom({
	key: "resetPwdEmailAtom",
	default: "",
});
