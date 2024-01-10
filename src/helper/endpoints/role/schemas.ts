import { IRole } from "../../CommonAPISchemas";

export interface RoleCreateReqBody {
	name: string;
	color: string;
	icon: string;
	level: number;
}

export interface RoleUpdateReqBody {
	name?: string;
	color?: string;
	icon?: string;
	level?: number;
}

export type RoleRespBody = IRole;

export interface RolesRespBody {
	roles: IRole[];
	page: number;
	size: number;
	total: number;
}
