import {
	createDELETEWithParams,
	createGET,
	createGETWithParams,
	createPOST,
	createPOSTWithParams,
	createPUTWithParams,
} from "@helper/RequesterBase";
import { IdParams } from "@usertypes/params";
import {
	AddPostCommentReqBody,
	BookmarkIdsRespBody,
	BookmarksRespBody,
	CreatePostReportReqBody,
	PostArchiveReqBody,
	PostFeedForProfileIdParams,
	PostListRespBody,
	PostReqBody,
	RepliesRespBody,
	StoriesRespBody,
	StoryReqBody,
	RoleReqBody,
	AnalyzeFansRespBody,
	InvitationReqBody,
	FansUsersRespBody,
	PurchasePaidPostReqBody,
	PaidPostPriceResBody,
	CreatePostReportRespBody,
} from "./schemas";
import { IPost, IRole, IStory } from "@usertypes/types";

export const createRole = createPOST<RoleReqBody, IRole>("/roles", true);
export const getRoles = createGET<never>("/roles", true);
export const updateRole = createPUTWithParams<RoleReqBody, never, IdParams>(
	"/roles/:id",
	true,
);
export const deleteRole = createDELETEWithParams<IdParams, never, IdParams>(
	"/roles/:id",
	true,
);

export const createPost = createPOST<PostReqBody, IPost>("/posts", true);
export const getPosts = createGET<PostListRespBody>("/posts", true);
export const getPostById = createGETWithParams<IPost, IdParams>(
	"/posts/:id",
	true,
);
export const updatePostById = createPUTWithParams<
	Partial<IPost>,
	never,
	IdParams
>("/posts/:id", true);
export const updatePostArchive = createPOST<PostArchiveReqBody, never>(
	"/posts/archive",
	true,
);
export const deletePostById = createDELETEWithParams<IdParams, never, IdParams>(
	"/posts/:id",
	true,
);

// story apis
export const createStory = createPOST<StoryReqBody, IStory>("/stories", true);
export const getStories = createGET<StoriesRespBody>("/stories", true);
export const deleteStory = createDELETEWithParams<IdParams, never, IdParams>(
	"/stories/:id",
	true,
);

// post comments
export const getPostCommentsByPostId = createGETWithParams<
	RepliesRespBody,
	IdParams
>("/post/comment/reply/:id", true);
export const addPostComment = createPOST<AddPostCommentReqBody, never>(
	"/post/comment",
	true,
);
export const likeCommentById = createPOSTWithParams<null, never, IdParams>(
	"/post/comment/like/:id",
	true,
);
export const unLikeCommentById = createDELETEWithParams<null, never, IdParams>(
	"/post/comment/like/:id",
	true,
);
export const deleteCommentById = createDELETEWithParams<null, never, IdParams>(
	"/post/comment/:id",
	true,
);

export const setBookmark = createPOSTWithParams<
	null,
	BookmarkIdsRespBody,
	IdParams
>("/post/bookmarks/:id", true);
export const deleteBookmark = createDELETEWithParams<
	null,
	BookmarkIdsRespBody,
	IdParams
>("/post/bookmarks/:id", true);
export const getBookmarks = createGET<BookmarksRespBody>(
	"/post/bookmarks",
	true,
);

export const getPostFeedForProfile = createGETWithParams<
	PostListRespBody,
	PostFeedForProfileIdParams
>("/posts/feed/:userId", true);

export const getPostFeedForHomepage = createGET<PostListRespBody>(
	"/posts/feed",
	true,
);

export const createPostReport = createPOST<
	CreatePostReportReqBody,
	CreatePostReportRespBody
>("/post/report", true);

export const getAnalyzeFans = createGET<AnalyzeFansRespBody>(
	"/posts/analyze-fans",
	true,
);

export const sendInvitation = createPOST<InvitationReqBody>(
	"/posts/send-invitation",
	true,
);

export const getFansUsers = createGET<FansUsersRespBody>(
	"/posts/search-fans",
	true,
);

export const hidePostFromFeed = createPOSTWithParams<null, never, IdParams>(
	"/posts/hidden/:id",
	true,
);

export const likePostWithPostId = createPOSTWithParams<null, IPost, IdParams>(
	"/posts/like/:id",
	true,
);

export const unlikePostWidthPostId = createDELETEWithParams<
	null,
	IPost,
	IdParams
>("/posts/like/:id", true);

export const getArchivedPosts = createGET<PostListRespBody>(
	"/posts/archived",
	true,
);

export const getPaidPostPrice = createGET<PaidPostPriceResBody>(
	"/post/paid-post/price",
	true,
);

export const purchasePaidPost = createPOST<PurchasePaidPostReqBody>(
	"/post/paid-post/purchase",
	true,
);

export const pinPostById = createPOSTWithParams<null, IPost, IdParams>(
	"/posts/pin/:id",
	true,
);

export const unpinPostById = createDELETEWithParams<null, IPost, IdParams>(
	"/posts/pin/:id",
	true,
);
