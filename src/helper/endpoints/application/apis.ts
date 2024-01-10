import {
	createGETWithParams,
	createPOSTWithParams,
	createPUT,
	createPUTWithParams,
} from "./../../RequesterBase";
import { createGET, createPOST } from "@helper/RequesterBase";
import {
	ApplicationIconReqBody,
	ApplicationIdParams,
	ApplicationListRespBody,
	ApplicationReqBody,
	ApplicationRespBody,
	ApplicationUpdateParams,
} from "./schemas";
import { IdParams } from "@usertypes/params";

export const getApplications = createGET<ApplicationListRespBody>(
	"/applications",
	true,
);

export const createApplication = createPOST<
	ApplicationReqBody,
	ApplicationRespBody
>("/applications", true);

export const getApplicationById = createGETWithParams<
	ApplicationRespBody,
	ApplicationIdParams
>("/applications/:appId", true);

export const updateApplicationIcon = createPUT<ApplicationIconReqBody, never>(
	"/applications/icon",
	true,
);

export const updateApplication = createPUTWithParams<
	ApplicationUpdateParams,
	never,
	ApplicationIdParams
>("/applications/:appId", true);
