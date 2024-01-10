import { PostType } from "@usertypes/commonEnums";
import {
	IPostAdvanced,
	IBookmark,
	IFundraiser,
	IGiveaway,
	IPaidPost,
	IPoll,
	IPost,
	ISchedule,
	IStory,
	PostReportFlag,
	IAnalyzeFans,
	IFansUser,
	PaginatedRespBody,
	IComment,
	IProfile,
	IUser,
} from "@usertypes/types";

export interface IPostReqPaidPost {
	currency: string;
	price: number | string;
	thumbId: string;
}

export interface IPostReqFundraiser {
	title: string;
	caption: string;
	price: number | string;
	currency: string;
	startDate: string;
	endDate: string;
	timezone: string;
	isXpAdd: boolean;
	thumbId: string;
}

export interface IPostReqGiveaway {
	prize: string;
	startDate: string;
	endDate: string;
	timezone: string;
	winnerCount: number | string;
	thumbId: string;
}

export interface IPostReqPoll {
	question: string;
	caption: string;
	answers: string[];
	thumbId: string;
	startDate: string;
	endDate: string;
	timezone: string;
}
export interface PostReqBody {
	title: string;
	type: PostType;
	caption: string;
	thumbId?: string;
	mediaIds?: string[];
	text?: string;
	roles?: string[];
	categories?: string[];
	paidPost?: IPostReqPaidPost;
	fundraiser?: IPostReqFundraiser;
	giveaway?: IPostReqGiveaway;
	poll?: IPostReqPoll;
	schedule?: ISchedule;
	advanced?: IPostAdvanced;
	episodeNumber?: number;
	description?: string;
	isPrivate?: boolean;
	isAudioLeveling?: boolean;
	isNoiseReduction?: boolean;
	taggedPeoples?: string[];
	formIds?: string[];
}
export interface PostArchiveReqBody {
	id: string;
}

export interface StoryReqBody {
	mediaIds: string[];
}

export interface AddPostCommentReqBody {
	postId: string;
	content: string;
	parentCommentId?: string;
}

export interface BookmarkIdsRespBody {
	bookmarkPostIds: string[];
	updatedPost: IPost;
}

export interface BookmarksRespBody {
	bookmarks: (IBookmark & { post: IPost })[];
}

export interface PostListRespBody {
	posts: IPost[];
	page: number;
	size: number;
	total: number;
}

export interface PostFeedForProfileIdParams {
	userId: string;
}

export interface StoriesRespBody {
	stories: IStory[];
	page: number;
	size: number;
	total: number;
}

export interface CreatePostReportReqBody {
	postId: string;
	reportFlag: PostReportFlag;
	reason?: string;
}

export interface RepliesRespBody {
	replies: IComment[];
}

export interface RoleReqBody {
	name: string;
	color: string;
	icon: string;
	level: number;
}

export interface AnalyzeFansRespBody {
	total: number;
	data: IAnalyzeFans[];
}

export interface InvitationReqBody {
	emails: string[];
	message: string;
}

export type FansUsersRespBody = PaginatedRespBody & {
	fans: IFansUser[];
};

export interface PurchasePaidPostReqBody {
	postId: string;
	customerPaymentProfileId: string;
}

export interface PaidPostPriceResBody {
	amount: number;
	platformFee: number;
	totalAmount: number;
}

export type CreatePostReportRespBody = IProfile & { user: IUser };
