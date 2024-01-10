import { IProfile, IUserList } from "@usertypes/types";

export interface UserlistCreateReqBody {
	title: string;
	creators: string[];
}

export interface UserlistUpdateReqBody {
	title?: string;
	creators?: string[];
	isActive?: boolean;
}

export type UserlistRespBody = IUserList & {
	creators: IProfile[];
};

export interface UserlistsRespBody {
	userlists: IUserList[];
	page: number;
	size: number;
	total: number;
}

export interface AddCreatorReqBody {
	creatorId: string;
}

export interface SubscribedProfilesRespBody {
	profiles: IProfile[];
	page: number;
	size: number;
	total: number;
}
