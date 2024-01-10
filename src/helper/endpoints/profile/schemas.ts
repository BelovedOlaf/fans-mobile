import {
	CampaignApplicableType,
	PromotionType,
	SubscriptionTypes,
} from "@usertypes/commonEnums";
import {
	CreatorReferralCreator,
	CreatorReferralLinkPerformance,
	CreatorReferralTransaction,
	IBundle,
	ICampaign,
	IHighlight,
	ILocation,
	IMedia,
	IPlayList,
	IPopupStatus,
	IPost,
	IProfile,
	ISocialLink,
	IStory,
	ITransaction,
	PaginatedRespBody,
	ProfileReportFlag,
} from "@usertypes/types";

export interface ProfileReqBody {
	displayName?: string;
	migrationLink?: string;
	profileLink?: string;
	bio?: string;
	cover?: string[];
	supportNsfw?: boolean;
	subscriptionType?: SubscriptionTypes;
	location?: string;
	birthday?: Date;
	referrerCode?: string;
}

export interface SocialLinkReqBody {
	provider: string;
	url: string;
}

export interface UpdateSocialLinksReqBody {
	links: SocialLinkReqBody[];
}

export interface BundleReqBody {
	id?: string;
	title?: string | null;
	month?: number;
	discount?: number;
	limit?: number;
}

export interface CreateSubscriptionReqBody {
	title: string;
	currency: string;
	price: number;
	campaigns?: ICampaign[];
	bundles?: IBundle[];
}

export interface CampaignReqBody {
	id?: string;
	startDate?: string;
	endDate?: string;
	duration?: number;
	limit?: number;
	discount?: number;
	type?: PromotionType;
	applicable?: CampaignApplicableType;
}

export interface TierReqBody {
	title: string;
	currency: string;
	description: string;
	cover: string;
	perks: string[];
	price: number;
}

export interface MigrationReqBody {
	migrationLink: string;
}

export interface PlaylistReqBody {
	title: string;
	description: string;
	thumbId: string;
	isPrivate: boolean;
	posts: string[];
}

export interface ProfileAvatarReqBody {
	avatar: string;
}
export interface ProfilePreviewReqBody {
	previews: string[];
}
export interface ProfileLinkParams {
	profileLink: string;
}
export interface HighlightReqBody {
	title: string;
	cover: string;
	stories: string[];
}
export interface PlaylistRespBody {
	playlists: IPlayList[];
}
export interface CreatorProfileRespBody extends IProfile {
	posts: IPost[];
	playlists: IPlayList[];
	medias: IMedia[];
	highlights: IHighlight[];
	hasAccess: boolean;
}

export interface PlaylistDetailRespBody extends IPlayList {}

export interface SuggestedProfilesRespBody {
	profiles: IProfile[];
}

export type GetProfilesRespBody = PaginatedRespBody & {
	profiles: IProfile[];
};

export type SocialLinksRespBody = {
	socialLinks: ISocialLink[];
};

export type CreateProfileReportReqBody = {
	profileId: string;
	reportFlag: ProfileReportFlag;
	reason?: string;
};

export type HighlightRespBody = IHighlight & {
	stories: IStory[];
};

export type LocationsRespBody = PaginatedRespBody & {
	locations: ILocation[];
};

export interface TransactionReqQueryParams {
	page?: number;
	limit?: number;
	search?: string;
}

export type TransactionRespBody = {
	transactions: ITransaction[];
	page: number;
	pages: number;
	total: number;
};

export interface AgeVerifyOndatoRespBody {
	status: string;
	url: string;
}

export interface PopupStatusRespBody {
	popupStatus: IPopupStatus;
}

export interface CreateReferralLinkReqBody {
	code: string;
}
export interface UpdateReferralLinkReqBody {
	code: string;
}
export interface DeleteReferralLinkReqBody {}

export interface ProfilesRespBody {
	profiles: (IProfile & { username?: string })[];
	page: number;
	size: number;
	total: number;
}

export interface GetCreatorReferralTotalEarningReqQueryParams {
	from: string;
	to: string;
	code?: string;
}
export interface GetCreatorReferralTotalEarningRespBody {
	period: string;
	totalEarning: number;
	percentage: number;
	creatorCount: number;
	transactions: CreatorReferralTransaction[];
}

export interface GetCreatorReferralCreatorsReqQueryParams {
	from: string;
	to: string;
	code?: string;
	sort?: string;
}
export interface GetCreatorReferralCreatorsRespBody {
	creators: CreatorReferralCreator[];
}

export interface GetCreatorReferralLinkPerformanceReqQueryParams {
	from: string;
	to: string;
	code?: string;
	sort?: string;
}
export interface GetCreatorReferralLinkPerformanceRespBody {
	creatorReferrals: CreatorReferralLinkPerformance[];
}

export interface GetCreatorReferralTransactionsReqQueryParams {
	query: string;
	page: number;
	size: number;
}
export interface GetCreatorReferralTransactionsRespBody {
	transactions: CreatorReferralTransaction[];
}
