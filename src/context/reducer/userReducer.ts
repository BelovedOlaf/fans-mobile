import { IUserState } from "@context/state/userState";
import { IOAuth2LinkedAccount, IUserInfo } from "@usertypes/types";

export enum UserActionType {
	updateUserInfo,
	linkAccount,
	unlinkedAccount,
}

export type UserAction = {
	type: UserActionType;
	payload: {
		data?: Partial<IUserInfo>;
		provider?: string;
		linkedAccount?: IOAuth2LinkedAccount;
	};
};

export function UserReducer(state: IUserState, action: UserAction): IUserState {
	const { type, payload } = action;

	switch (type) {
		case UserActionType.updateUserInfo:
			return {
				...state,
				userInfo: {
					...state.userInfo,
					...payload.data,
				},
			};
		case UserActionType.linkAccount:
			return {
				...state,
				userInfo: {
					...state.userInfo,
					linkedAccounts: payload.linkedAccount
						? [
								...(state.userInfo.linkedAccounts ?? []),
								payload.linkedAccount,
						  ]
						: state.userInfo.linkedAccounts,
				},
			};
		case UserActionType.unlinkedAccount:
			return {
				...state,
				userInfo: {
					...state.userInfo,
					linkedAccounts: state.userInfo.linkedAccounts?.filter(
						(l) => l.provider !== payload.provider,
					),
				},
			};
		default:
			return state;
	}
}
