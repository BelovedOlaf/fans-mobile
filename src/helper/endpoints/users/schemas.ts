import { IUserInfo } from "@usertypes/types";

export interface UsersRespBody {
	users: IUserInfo[];
	page: number;
	size: number;
	total: number;
}
