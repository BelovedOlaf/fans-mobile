import {
	createPOST,
	createGET,
	createPUTWithParams,
	createDELETEWithParams,
} from "@helper/RequesterBase";
import { IdParams } from "@usertypes/params";
import { RoleCreateReqBody, RoleRespBody, RoleUpdateReqBody } from "./schemas";

export const createRole = createPOST<RoleCreateReqBody, RoleRespBody>(
	"/roles",
	true,
);

export const getRoles = createGET<never>("/roles", true);

export const updateRole = createPUTWithParams<
	RoleUpdateReqBody,
	never,
	IdParams
>("/roles/:id", true);

export const deleteRole = createDELETEWithParams<IdParams, never, IdParams>(
	"/roles/:id",
	true,
);
