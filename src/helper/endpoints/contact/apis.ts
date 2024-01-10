import { createPOST } from "@helper/RequesterBase";
import { SendMessageReqBody } from "./schemas";

export const sendMessageToContact = createPOST<SendMessageReqBody, never>(
	"/contact",
	true,
);
