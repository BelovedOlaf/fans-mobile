// import base modules
import { createGET, createPOST } from "@helper/RequesterBase";

// import own modules
import {
	AnalyticsPostsRespBody,
	ChangePasswordReqBody,
	UpdateEmailReqBody,
	UpdateSettingReqBody,
	VerifyDeleteAccountReqBody,
	VerifyNewEmailReqBody,
} from "./schemas";

export const changePassword = createPOST<ChangePasswordReqBody, never>(
	"/settings/change-password",
	true,
);

export const deleteAccount = createPOST<null, never>(
	"/settings/delete-account",
	true,
);

export const getPostAnalytics = createGET<AnalyticsPostsRespBody>(
	"/settings/analytics-post",
	true,
);

export const updateSetting = createPOST<UpdateSettingReqBody, never>(
	"/settings/update",
	true,
);

export const updateEmail = createPOST<UpdateEmailReqBody, never>(
	"/settings/update-email",
	true,
);

export const verifyDeleteAccount = createPOST<
	VerifyDeleteAccountReqBody,
	never
>("/settings/verify-delete-account", true);

export const verifyNewEmail = createPOST<VerifyNewEmailReqBody, never>(
	"/settings/verify-new-email",
	true,
);
