import { VideoReadyForDisplayEvent } from "expo-av";
import { CountryCode } from "libphonenumber-js";
import moment from "moment";
import { ReactNode } from "react";
import { ImageSourcePropType } from "react-native";
import {
	BadgeType,
	CampaignApplicableType,
	CheckoutType,
	DurationType,
	IconTypes,
	MediaType,
	PostStepTypes,
	PostType,
	PromotionType,
	SubscriptionTypes,
	UserRoleTypes,
} from "./commonEnums";
import {
	ColorStyle,
	FansSvgProps,
	FansViewProps,
	IFansSvg,
} from "./components";

const languages = ["English", "Russian"] as const;
export type LanguageType = (typeof languages)[number];

const genderTypes = ["Male", "Female", "NonBinary", "Other"] as const;
export type GenderType = (typeof genderTypes)[number];

export interface ICountry {
	code: CountryCode | "AQ" | "BV" | "GS" | "HM" | "PN" | "TF" | "UM";
	name: string;
	flag: NodeRequire;
	phone: string;
}

export interface IFansDropdownItem {
	id?: number | string;
	text: string;
	value?: string;
}

export interface IFansTabsItem extends Pick<FansViewProps, "gap"> {
	icon?: ReactNode;
	id?: number | string;
	text?: string;
}

export interface IConversationMeta {
	id: string;
	name: string;
	icon: string | null;
	lastReadMessageId?: string;
	lastMessage?: IMessage;
	isBlocked: boolean;
	isPinned: boolean;
}

export enum UserType {
	Fan = "Fan",
	Creator = "Creator",
}

const ageVerifyStatus = [
	"PENDING",
	"APPROVED",
	"REJECTED",
	"CANCELLED",
] as const;
export type AgeVerifyStatus = (typeof ageVerifyStatus)[number];

export const postReportFlags = [
	"ILLEGAL_CONTENT",
	"UNDERAGE_CONTENT",
	"GRAPHIC_VOILENCE_OR_GORE",
	"HARASSMENT_OR_BULLYING",
	"SELF_HARM_OR_SUICIDE_CONTENT",
	"NON_CONSENSUAL_CONTENT",
	"SPAM_OR_SCAM",
	"INFRINGEMENT_OF_MY_COPYRIGHT",
	"OTHER",
] as const;
export type PostReportFlag = (typeof postReportFlags)[number];

export const profileReportFlags = [
	"ILLEGAL_CONTENT",
	"UNDERAGE_USER",
	"IMPERSONATION_OR_IDENTITY_THEFT",
	"PROMOTING_HATE_SPEECH_OR_DISCRIMINATION",
	"PROMOTING_DANGEROUS_BEHAVIORS",
	"INVOLVED_IN_SPAN_OR_SCAM_ACTIVITIES",
	"INFRINGEMENT_OF_MY_COPYRIGHT",
	"OTHER",
] as const;

export type ProfileReportFlag = (typeof profileReportFlags)[number];

export interface StringIdParam {
	id: string;
}

export interface IProfilePreview {
	id: string;
	profileId: string;
	url: string;
}

export interface IProfile {
	id: string;
	userId: string;
	displayName: string;
	migrationLink: string;
	profileLink: string;
	bio: string;
	cover: string[];
	supportNsfw: boolean | null;
	subscriptionType: SubscriptionTypes;
	isEnabled: boolean;
	location: string;
	birthday: string;
	socialLinks: ISocialLink[];
	subscriptions: ISubscription[];
	tiers: ISubscriptionTier[];
	commentCount: number;
	likeCount: number;
	imageCount: number;
	videoCount: number;
	previews: IProfilePreview[];
	username?: string;
	avatar?: string;
	user?: IUser;
	roles: IRole[];
	categories: ICategory[];
	stories: IStory[];
	isSelected?: boolean;
	referrerCode?: string;
	activeStories?: IStory[];
}

export interface IOAuth2LinkedAccount {
	id: string;
	userId: string;
	provider: string;
	accountId: string;
	name: string;
	email: string;
	avatarUrl?: string;
}

export interface IUserInfo {
	id: string;
	avatar: string;
	type: UserRoleTypes;
	username: string;
	displayName: string;
	phonenumber: string;
	email: string;
	createdAt: string;
	gender?: GenderType;
	language?: LanguageType;
	birthdate?: string;
	profile?: IProfile;
	gems?: number;
	gemsAmount?: number;
	payoutBalance?: number;
	bookmarkPostIds: string[];
	linkedAccounts?: IOAuth2LinkedAccount[];
	ageVerifyId?: string;
	ageVerifyStatus?: AgeVerifyStatus;
}

export interface IUser {
	id: string;
	avatar?: string;
	email: string;
	username: string;
	phonenumber?: string;
	type: UserRoleTypes;
	displayName?: string;
	language?: LanguageType;
	gems?: number;
	gemsAmount?: number;
	payoutBalance?: number;
	birthdate?: string;
}

export interface IUserBasic {
	id: string;
	username: string;
	displayName: string | null;
	avatar: string | null;
}

export interface IUserProfile {
	id: number;
	username: string;
	isCurrentUser: boolean;
	isSelected: boolean;
	avatar: string;
	note?: string;
}

export interface IPostAdvanced {
	isHideLikeViewCount: boolean;
	isTurnOffComment: boolean;
	isPaidLabelDisclaimer: boolean;
}

export interface ITaggedPeople {
	postId: string;
	userId: string;
	user: IUserInfo;
}

export interface Media {
	id: string;
	url?: string;
	blurhash?: string;
}

export interface IPost {
	id: string;
	profileId: string;
	title: string;
	type: PostType;
	caption: string;
	thumb?: IThumbImage;
	medias: Media[];
	isArchived: boolean;
	isHidden: boolean;
	commentCount: number;
	likeCount: number;
	advanced?: IPostAdvanced;
	// location?: any;
	createdAt: string;
	updatedAt: string;

	username?: string;
	bookmarkCount: number;
	profile: IProfile;
	taggedPeoples: ITaggedPeople[];
	isBookmarked?: boolean;
	isLiked?: boolean;
	isPaidPost: boolean;
	paidPost?: IPaidPost;
	isPaidOut?: boolean;
	isPinned: boolean;
	// audio?: IAudio;
}

export interface IPaidPostForm {
	currency: string;
	price: number | string;
	thumb: IPickerMedia;
}

export interface ISuggestedProfile extends IUser {
	heroImg: string;
}

export interface ITag {
	id: number;
	title: string;
	count: number;
}

export interface IRecentSearch extends IUser {}

export interface IRecentSearchGroup {
	id: number;
	title: string;
	searches: IRecentSearch[];
}

export interface IUserListMember extends IUser {
	active: boolean;
	fullname?: string;
}

export interface IUserList {
	id: string;
	userId: string;
	title: string;
	creators: IProfile[];
	isActive: boolean;
}

export interface IComment {
	id: string;
	userId: string;
	user: IUser;
	postId: string;
	content: string;
	likeCount: number;
	createdAt: string;
	updatedAt: string;
	replies: IComment[];
	isLiked: boolean;
	parentCommentId?: string;
	profile?: IProfile;
}

export interface ITabCell {
	data: string;
	label: string;
}

export interface IAudio {
	url: string;
	title: string;
	description: string;
}

export interface IPlayList {
	id: string;
	title: string;
	description: string;
	thumb: string;
	isPrivate: boolean;
	mediaCounts: number;
	posts: IPost[];
	viewCount: number;
}

export interface ISocialMediaLink {
	id: number;
	title: string;
	iconName: string;
	value: string;
}

export interface ISelectData {
	data: string;
	label: string;
}

export interface IStripeForm {
	firstName: string;
	lastName: string;
	address1: string;
	address2: string;
	city: string;
	state: string;
	zip: string;
	bankRoutingNumber: string;
	bankAccountNumber: string;
}

export interface IRole {
	id: string;
	name: string;
	color: string;
	icon: string;
	level: number | string;
	isEnable?: boolean;
	fans?: number;
}

export interface ISocialLink {
	id: string;
	provider: string;
	url: string;
	title: string;
}

export interface IBundle {
	id?: string;
	subscriptionId?: string;
	title?: string;
	month: number;
	discount: number;
	limit: number;
	isNew?: boolean;
}

export interface IRoleIcon {
	name: string;
	icon: ImageSourcePropType;
	width: number;
	height: number;
}

export interface ISubscription {
	id: string;
	title?: string;
	currency: string;
	price: number;
	bundles: IBundle[];
	campaigns: ICampaign[];
}

export interface ICheckoutOption {
	type: CheckoutType;
	name: string;
}

export interface IGemType {
	title: string;
	price: number;
	icon: ImageSourcePropType;
	// width: number;
	// height: number;
	color: string;
}

export interface ISubscriptionTier {
	id: string;
	title: string;
	currency: string;
	description: string;
	cover: string;
	perks: string[];
	price: number | string;
}

export interface ICampaign {
	id: string;
	endDate: string;
	duration: number | string;
	limit: number | string;
	discount: number | string;
	type: PromotionType;
	applicable: CampaignApplicableType;
	isNew?: boolean;
	durationType: DurationType;
}

export interface ICategory {
	id: string;
	name: string;
	roles: IRole[];
	isActive: boolean;
	posts: IPost[];
	postCount?: number;
}

export interface IThumbImage {
	id: string;
	url: string;
	blurhash?: string;
}

export interface IPaidPost {
	currency: string;
	price: number | string;
	thumb?: IThumbImage;
}

export interface IFundraiser {
	title: string;
	caption: string;
	price: number | string;
	currency: string;
	startDate: string;
	endDate: string;
	timezone: string;
	isXpAdd: boolean;
	thumb: string;
}

export interface IGiveaway {
	prize: string;
	startDate: string;
	endDate: string;
	timezone: string;
	winnerCount: number | string;
	thumb: IPickerMedia;
}

export interface ISchedule {
	startDate: string;
	endDate: string;
	timezone: string;
}

export interface IPoll {
	question: string;
	caption: string;
	answers: string[];
	thumb: string;
	startDate: string;
	endDate: string;
	timezone: string;
}

export interface IPostForm {
	id: string;
	title: string;
	type: PostType;
	caption: string;
	thumb: IPickerMedia;
	medias: IPickerMedia[];
	text?: string;
	roles: string[];
	categories: string[];
	paidPost?: IPaidPostForm;
	fundraiser: IFundraiser;
	giveaway: IGiveaway;
	schedule: ISchedule;
	advanced: IPostAdvanced;
	poll: IPoll;
	audio: IAudioDetail;
	taggedPeoples: ITaggedPeople[];
	locationId: string;
	formIds: string[];
	uploadFiles: IUploadForm[];
	isReleaseForm: boolean;
	isAllSubscribers: boolean;
	carouselIndex: number;
	newUsertags: INewTaggedPeople[];
	categoryForm: IPostCategoryForm;
}

export interface IPostCategoryForm {
	isAll: boolean;
	categoryName: string;
	roleIds: string[];
}

export interface IUserTag {
	id: string;
	userId?: string;
	user?: IUserInfo;
	position: number[];
}

export interface INewTaggedPeople {
	uploadId: string; //mediaId
	usertags: IUserTag[];
}

export interface IAudioDetail {
	title: string;
	episodeNumber: string | number;
	description: string;
	isPrivate: boolean;
	isAudioLeveling: boolean;
	isNoiseReduction: boolean;
}

export interface IMedia {
	id: string;
	type: MediaType;
	url?: string;
	blurhash?: string;
	origin?: string;
	updatedAt: string;
}

export interface IUpload {
	id: string;
	userId: string;
	type: MediaType;
	url: string;
	origin?: string;
	completed: boolean;
	updatedAt: string;
}

export interface IDateRangeResponse {
	firstDate: string | moment.Moment;
	secondDate: string | moment.Moment;
}

export interface IPickerMedia {
	id?: string;
	uri: string;
	isPicker: boolean;
	name?: string;
}

export interface IStoryMedia {
	storyId: string;
	mediaId: string;
	upload: {
		id: string;
		userId: string;
		type: string;
		url: string;
	};
}

export interface IStory {
	id: string;
	profileId: string;
	isHighlight: boolean;
	isArchived: boolean;
	medias: string[];
	likeCount: number;
	commentCount: number;
	updatedAt: string;
	isLiked: boolean;
	shareCount: number;
}
export interface IHighlight {
	id: string;
	title: string;
	cover: string;
	stories: IStory[];
	profileId: string;
}

export interface ICardAction {
	title: string;
	onClick?: () => void;
	iconType: IconTypes;
	iconColor?: string;
	labelClass?: string;
	hide?: boolean;
	iconSize?: number;
}

export interface IPostPropertyLink {
	title: string;
	pathname: string;
	stepType: PostStepTypes;
}

export interface IPaymentMethod {
	id: string;
	customerPaymentProfileId: string;
	cardNumber: string;
	expirationDate: string;
	cardType: string;
	firstName?: string;
	lastName?: string;
	country?: string;
	state?: string;
	city?: string;
	zip?: string;
	address?: string;
}

export interface Bundle {
	id: string;
	month: number;
	discount: number;
	price?: number;
}

export interface Subscription {
	id: string;
	subscriptionId?: string;
	tierId?: string;
	error: string;
	status: string;
	amount: number;
	startDate: string;
	endDate: string;
	creator: IProfile;
	subscription?: {
		id: string;
		price: number;
		bundles?: Bundle[];
	};
	bundle?: Bundle;
	tier?: {
		id: string;
		price: number;
	};
}

export interface PayPalPayoutMethod {
	id: string;
	provider: string;
	bankInfo?: IStripeForm;
	paypalEmail?: string;
	country: string;
	entityType: string;
	usCitizenOrResident: boolean;
}

export interface IBookmark {
	postId: string;
	userId: string;
}

export const enum MessageType {
	TEXT = 0,
	IMAGE = 1,
	TIP = 2,
}

export const enum MessageChannelType {
	DIRECT = 0,
}

export interface IMessage {
	id: string;
	user: IUserBasic;
	createdAt: string;
	messageType: MessageType;
	content: string;
	emoji?: number;
	images?: string[];
	value?: number;
}

export interface PaginatedRespBody {
	page: number;
	size: number;
	total: number;
}

export interface IFansCheckButtonsItem {
	color?: ColorStyle;
	id: number;
	text: string;
	text2: string;
	avatar?: string;
	icon?: React.ReactNode;
	isChecked: boolean;
}

export interface IChipsItem {
	id?: number | string;
	icon1?: Pick<FansSvgProps, "width" | "height" | "svg">;
	gap?: number;
	text?: string;
	badge?: number;

	color?: ColorStyle;
	icon?: IFansSvg | React.FC;
	iconNode?: ReactNode;
}

export interface IReply {
	id: string;
	userId: string;
	user: IUser;
	postId: string;
	content: string;
	parentCommentId?: string;
	likeCount: number;
	createdAt: string;
	updatedAt: string;
	replies: IReply[];
}

export enum NotificationType {
	LikeComment = 1,
	LikePost = 2,
	ViewedPost = 3,
	MadeComment = 4,
	MentionPost = 5,
	PaidPostPurchase = 6,
	Tips = 37,
	TipsOnPost = 6,
	TipsOnChat = 7,
	CongratsRevenue = 8,
	CongratsFollowers = 9,
	WarningPostUnderReview = 10,
	WarningGuidelinesViolation = 11,
	WarningTOSViolation = 12,
	UnreadMessage = 13,
	SubscriptionCharged = 14,
	SubscriptionSubscribed = 15,
	SubscriptionRenewed = 16,
	SubscriptionRenewedCreator = 38,
	SubscriptionRenewedFan = 39,
	SubscriptionCancelled = 17,
	SubscriptionExpiring = 18,
	SubscriptionExpired = 19,
	OrderCustomVideo = 20,
	VideoCallPurchase = 21,
	VideoCallSchedule = 22,
	FanChangedSubscriptionPrice = 23,
	FanRunningPromotion = 24,
	FanSubscriptionExpired = 25,
	FanSubscriptionRenewed = 26,
	FanSubscriptionExpire = 27,
	FanUploadPost = 28,
	FanStartGiveaway = 29,
	FanStartFundraising = 30,
	FanAcceptVideoCall = 31,
	FanLikeComment = 32,
	ReplyComment = 33,
	FanSentTips = 34,
	FanVideoCallSchedule = 35,
	FanCongrats = 36,
}

export interface INotification {
	id: string;
	type: NotificationType;
	users?: IUser[];
	comment?: IComment;
	post?: IPost;
	creator?: IProfile;
	role?: IRole;
	amount?: number;
	price?: string;
	text?: string;
	time?: string;
	mailto?: string;
	link?: string;
	timeLeft?: string;
	postImage?: string;
	rejected?: boolean;
	accepted?: boolean;
	strike?: number;
	from?: string;
	to?: string;
	read?: boolean;
}

export interface IPaymentCard {
	country: string;
	state: string;
	street: string;
	city: string;
	zip: string;
	cardName: string;
	cardNumber: string;
	expireDate: string;
	cvc: string;
}

export interface IAnalyzeFans {
	from: number;
	to: number;
	fans: number;
}

export interface IUploadForm {
	id: string;
	url: string;
	origin: string;
	isPicker?: boolean;
}

export interface ILocation {
	id: string;
	profileId: string;
	title: string;
	address: string;
}

export interface IFansLevel {
	id: string;
	xp: number;
	level: number;
	userId: string;
}

export interface IFansUser extends IUser {
	level: IFansLevel;
}

export type Colors =
	| "black"
	| "blue"
	| "blue-6d"
	| "brown-3b"
	| "green"
	| "green-4d"
	| "green-65"
	| "grey"
	| "grey-66"
	| "grey-70"
	| "grey-b1"
	| "grey-de"
	| "grey-f0"
	| "purple"
	| "purple-5f"
	| "purple-a8"
	| "purple-f6"
	| "purple-6a"
	| "red"
	| "red-FF"
	| "red-eb"
	| "red-fd"
	| "white"
	| "black-2e";

export type Components1 =
	| "button"
	| "chips"
	| "dropdown"
	| "phoneinput"
	| "switch"
	| "tabs"
	| "textinput";
export interface IHoursAndMinutes {
	hours: number;
	minutes: number;
}
export type ICalendarDate = Date | undefined;
export interface IDateRange {
	startDate: ICalendarDate;
	endDate: ICalendarDate;
}

export interface IScheduleForm {
	startDate: ICalendarDate;
	time: IHoursAndMinutes;
	timezone: string;
}

export interface ITransaction {
	id: string;
	creator: {
		id: string;
		username: string;
		displayName: string | null;
		avatar: string | null;
	};
	description: string;
	status: string;
	date: string;
	amount: number;
	processingFee: number;
	platformFee: number;
	totalFee: number;
	total: number;
}

export const TransactionEmpty: ITransactionCreator = {
	id: 0,
	userId: "",
	user: {
		displayName: "",
		username: "",
		avatar: "",
	},
	description: "",
	status: "",
	createdAt: "",
	amount: 0,
	processingFee: 0,
	platformFee: 0,
	totalFees: 0,
	netAmount: 0,
};

export interface ITransactionCreator {
	id: number;
	userId: string;
	user: {
		displayName: string;
		username: string;
		avatar: string;
	};
	description: string;
	status: string;
	createdAt: string;
	amount: number;
	processingFee: number;
	platformFee: number;
	totalFees: number;
	netAmount: number;
}

export interface IVideoReadyForDisplayEvent extends VideoReadyForDisplayEvent {
	target?: {
		offsetHeight: number;
		offsetWidth: number;
	};
}

export interface Timeframe {
	startTime: string;
	endTime: string;
	dayOfTheWeek: string;
}
export interface NotificationsSettings {
	newRequests: boolean;
	cancellations: boolean;
	reminders: boolean;
	notificationsByEmail: boolean;
	notificationsByPhone: boolean;
}

export interface CameoNotificationsSettings {
	newRequests: boolean;
	pendingVideos: boolean;
	completedRequests: boolean;
	notificationsByEmail: boolean;
	notificationsByPhone: boolean;
}

export interface RequestLimitationSettings {
	fulFillmentTimeFrame: string;
	numberRequestsType: string;
	numberRequestsValue: number;
}

export interface PriceDuration {
	price: number;
	duration: number;
	active: boolean;
}

export enum NotificationType {
	NewRequests = "New Requests",
	Cancellations = "Cancellations",
	Reminders = "Reminders",
}

export enum NotificationDeliveryMethod {
	Email = "Email",
	Phone = "Phone",
}

export enum ContentPreference {
	Consultation = "Consultation",
	Advice = "Advice",
	Performance = "Performance",
	Adult = "Adult",
	Sexual = "Sexual",
	Spirituality = "Spirituality",
}

export enum VideoCallWays {
	OneWay = "One-Way",
	TwoWay = "Two-Way",
}

export interface SocialMediaUrl {
	id: string;
	value: string;
	title: string;
}

export interface IProfileSettings {
	video: {
		timeZone: string;
		timeframes: Timeframe[];
		bufferBetweenCalls: number;
		sexualContent: boolean;
		contentPreferences: string[];
		additionalContentPreferences: string;
		videoCallWays: VideoCallWays;
		meetingTitle: string;
		meetingDescription: string;
		notifications: NotificationsSettings;
		customVideoOrdersEnabled: boolean;
		vacationMode: boolean;
		pricesDuration: PriceDuration[];
		videoCallsEnabled: boolean;
	};
	cameo: {
		pricesDuration: PriceDuration[];
		sexualContent: boolean;
		additionalContentPreferences: string;
		contentPreferences: string[];
		timeframes: Timeframe[];
		tos: string;
		requestLimitations: RequestLimitationSettings;
		responseDescription: string;
		uploadPreviews: string;
		notifications: CameoNotificationsSettings;
		customVideoOrdersEnabled: boolean;
		vacationMode: boolean;
		vacationModeInterval: string;
		videoCallsEnabled: boolean;
	};
	fanProfile: {
		bio: string;
		displayName: string;
		socialMedias: SocialMediaUrl[];
	};
}

export interface IBadgeTier {
	type: BadgeType;
	title: string;
	description: string;
	price?: number;
}

export enum UserSettingType {
	VIDEO = "VIDEO",
	CAMEO = "CAMEO",
}

export interface ICarouselMedia {
	mediaType: MediaType;
	url?: string;
	blurhash?: string;
}

export interface AgeCheckerCustomerData {
	fypProfileId: string;
}

export interface ITimeline {
	date: string;
	earnings: number;
}

export interface ISubscriber {
	avatar: string;
	username: string;
	level: number;
	period: number;
	periodLabel: string;
	earnings: number;
}

export interface IPopupStatus {
	showNoticeChargeBackDialog: boolean;
	showFairTransactionDialog: boolean;
	showManageSubscriptionDialog: boolean;
	paymentSubscription: Subscription;
}

export interface ICreatorReferrals {
	creatorReferrals: CreatorReferral[];
}

export interface CreatorReferral {
	id: string;
	profileId: string;
	code: string;
}

export interface CreatorReferralTransaction {
	id: string;
	referentId: string;
	referrerId: string;
	type: string;
	transactionId: string;
	amount: number;
	updatedAt: string;
}

export interface CreatorReferralCreator {
	referentId: string;
	amount: number;
	referent?: {
		id: string;
		userId: string;
		avatar: string;
		displayName: string;
		profileLink?: string;
		bio?: string;
		cover?: string[];
		supportNsfw?: boolean;
		subscriptionType?: string;
		isEnabled?: boolean;
		location?: string;
		migrationLink?: string;
		commentCount?: number;
		likeCount?: number;
		uploadedVideoDuration?: number;
		isReferralEnabled?: boolean;
		revenueShare?: number;
		updatedAt: string;
		createdAt: string;
	};
}

export interface CreatorReferralLinkPerformance {
	id: string;
	code: string;
	amount: number;
	count: number;
}
