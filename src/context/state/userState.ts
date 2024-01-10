import { IUserInfo } from "@usertypes/types";
import { UserRoleTypes } from "@usertypes/commonEnums";

export const defaultUserInfoData = {
	id: "0",
	type: UserRoleTypes.Fan,
	avatar: "",
	username: "",
	displayName: "",
	phonenumber: "",
	email: "",
	createdAt: "",
	gems: 0,
	gemsAmount: 0,
	payoutBalance: 0,
	bookmarkPostIds: [],
};

export interface IUserState {
	userInfo: IUserInfo;
}

export const userInitialState: IUserState = {
	userInfo: defaultUserInfoData,
};
