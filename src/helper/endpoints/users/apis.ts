import {
	createGET,
	createGETWithParams,
	createPOST,
	createPUTWithParams,
	createDELETEWithParams,
	createPOSTWithParams,
} from "@helper/RequesterBase";
import { IdParams } from "@usertypes/params";
import { UsersRespBody } from "./schemas";

export const getUsers = createGET<UsersRespBody>("/users", true);
