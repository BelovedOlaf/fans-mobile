import {
	createGET,
	createGETWithParams,
	createPOSTWithParams,
} from "@helper/RequesterBase";
import {
	ChatConversationByUserRespBody,
	ChatUserIdParams,
	ChatWSInfoRespBody,
	ChatFansListRespBody,
} from "./schemas";

export const getWSInfo = createGET<ChatWSInfoRespBody>("/chat/ws-info", false);

export const getOrCreateConversation = createPOSTWithParams<
	unknown,
	ChatConversationByUserRespBody,
	ChatUserIdParams
>("/chat/conversations/users/:userId", true);

export const getFansList = createGETWithParams<ChatFansListRespBody>(
	"/chat/fans-list/:category/:limit",
	true,
);
