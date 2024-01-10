import {
	createPOST,
	createGET,
	createGETWithParams,
	createPOSTWithParams,
	createDELETEWithParams,
} from "@helper/RequesterBase";
import { IdParams } from "@usertypes/params";
import {
	RepliesRespBody,
	AddStoryCommentReqBody,
	StoriesFeedRespBody,
} from "./schemas";
import { IStory } from "@usertypes/types";

export const getStoriesFeed = createGET<StoriesFeedRespBody>(
	"/stories/feed",
	true,
);
export const storyLike = createPOSTWithParams<null, IStory, IdParams>(
	"/stories/like/:id",
	true,
);
export const unlikeStoryById = createDELETEWithParams<null, IStory, IdParams>(
	"/stories/like/:id",
	true,
);
export const getStoryCommentsByPostId = createGETWithParams<
	RepliesRespBody,
	IdParams
>("/story/comments/reply/:id", true);
export const addStoryComment = createPOST<AddStoryCommentReqBody, never>(
	"/story/comments",
	true,
);
export const likeStoryComment = createPOSTWithParams<null, never, IdParams>(
	"/story/comments/like/:id",
	true,
);
export const unlikeStoryComment = createDELETEWithParams<null, never, IdParams>(
	"/story/comments/reply/:id",
	true,
);
export const deleteCommentById = createDELETEWithParams<null, never, IdParams>(
	"/story/comments/:id",
	true,
);
