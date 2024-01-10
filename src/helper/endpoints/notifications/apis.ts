import { createGET, createPOSTWithParams } from "@helper/RequesterBase";
import {
	NotificationsListRespBody,
	NotificationsMarkReadParams,
} from "./schemas";

export const getNotifications = createGET<NotificationsListRespBody>(
	"/notifications/list",
	true,
);

export const markNotificationRead = createPOSTWithParams<
	unknown,
	unknown,
	NotificationsMarkReadParams
>("/notifications/mark-read/:id", true);
