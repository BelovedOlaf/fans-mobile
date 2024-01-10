import { IProfileState } from "@context/state/profileState";
import {
	CampaignApplicableType,
	CheckoutType,
	DurationType,
	PostStepTypes,
	PromotionType,
	SubscriptionTypes,
	BadgeType,
	ProfileViewType,
	PostType,
} from "@usertypes/commonEnums";
import {
	IAnalyzeFans,
	IProfileSettings,
	VideoCallWays,
	IBadgeTier,
	IFansDropdownItem,
	IProfile,
	IPost,
} from "@usertypes/types";
import { SocialMediaTypes } from "./socialMediaTypes";

export const promotionCampaignOptions = [
	{
		data: PromotionType.FreeTrial,
		label: "Free Trial",
	},
	{
		data: PromotionType.Discount,
		label: "Discount",
	},
];

export const durationOptions = [
	// {
	// 	data: DurationType.Hours,
	// 	label: "Hours",
	// },
	// {
	// 	data: DurationType.Days,
	// 	label: "Days",
	// },
	// {
	// 	data: DurationType.Weeks,
	// 	label: "Weeks",
	// },
	{
		data: DurationType.Months,
		label: "Months",
	},
];

export const promotionOfferedOptions = [
	{
		data: CampaignApplicableType.New,
		label: "New fans",
	},
	{
		data: CampaignApplicableType.Both,
		label: "All fans",
	},
	{
		data: CampaignApplicableType.Existing,
		label: "Old fans",
	},
];

export const discountOptions = [
	{
		data: "20",
		label: "20 %",
	},
	{
		data: "25",
		label: "25 %",
	},
	{
		data: "30",
		label: "30 %",
	},
];

export const defaultSocialLinks = [
	{
		id: "0",
		title: "Website link",
		url: "",
		provider: "website",
	},
	{
		id: "0",
		title: "Amazon wishlist link",
		url: "",
		provider: "amazon",
	},
	{
		id: "0",
		title: "Instagram link",
		url: "",
		provider: "instagram",
	},
	{
		id: "0",
		title: "Twitter link",
		url: "",
		provider: "twitter",
	},
	{
		id: "0",
		title: "TikTok link",
		url: "",
		provider: "tiktok",
	},
	{
		id: "0",
		title: "Snapchat link",
		url: "",
		provider: "snapchat",
	},
	{
		id: "0",
		title: "YouTube link",
		url: "",
		provider: "youtube",
	},
	{
		id: "0",
		title: "Facebook link",
		url: "",
		provider: "facebook",
	},
	{
		id: "0",
		title: "Reddit link",
		url: "",
		provider: "reddit",
	},
	{
		id: "0",
		title: "Discord server invite link",
		url: "",
		provider: "discord",
	},
	{
		id: "0",
		title: "Twitch link",
		url: "",
		provider: "twitch",
	},
];

export const roleColors = [
	"transparent",
	"#faf290",
	"#fa9b43",
	"#f55d5d",
	"#e53ec6",
	"#e6bfff",
	"#000",
	"#9b9b9b",
	"#d1faaf",
	"#50ddc2",
	"#64c7f9",
	"#484cff",
	"#a854f5",
];

export const roleIcons = [
	{
		name: "icon1",
		width: 18.91,
		height: 29.4,
		icon: require("@assets/images/roles/icon1.png"),
	},
	{
		name: "icon2",
		width: 24.14,
		height: 28.65,
		icon: require("@assets/images/roles/icon2.png"),
	},
	{
		name: "icon3",
		width: 27.13,
		height: 27.22,
		icon: require("@assets/images/roles/icon3.png"),
	},
	{
		name: "icon4",
		width: 29.29,
		height: 25.36,
		icon: require("@assets/images/roles/icon4.png"),
	},
	{
		name: "icon5",
		width: 29.31,
		height: 29.31,
		icon: require("@assets/images/roles/icon5.png"),
	},
	{
		name: "icon6",
		width: 25.96,
		height: 25.96,
		icon: require("@assets/images/roles/icon6.png"),
	},
	{
		name: "icon7",
		width: 27.13,
		height: 27.22,
		icon: require("@assets/images/roles/icon7.png"),
	},
];

export const winnerOptions = [
	{
		data: "1",
		label: "1",
	},
	{
		data: "2",
		label: "2",
	},
	{
		data: "3",
		label: "3",
	},
	{
		data: "4",
		label: "4",
	},
	{
		data: "5",
		label: "5",
	},
	{
		data: "6",
		label: "6",
	},
	{
		data: "7",
		label: "7",
	},
	{
		data: "8",
		label: "8",
	},
	{
		data: "9",
		label: "9",
	},
	{
		data: "10",
		label: "10",
	},
];

export const pageStyleOptions = [
	{ data: SubscriptionTypes.Flat, label: "Subscription" },
	{ data: SubscriptionTypes.Tier, label: "Tiers" },
	{ data: SubscriptionTypes.OneTimePayment, label: "One-time payment" },
];

export const gemOptions = [
	{
		title: "500",
		price: 5,
		// icon: YellowGemSvg,
		icon: require("@assets/images/gems/yellow-gem.png"),
		color: "text-fans-yellow",
	},
	{
		title: "1,000",
		price: 10,
		// icon: PinkGemSvg,
		icon: require("@assets/images/gems/pink-gem.png"),
		color: "text-fans-pink",
	},
	{
		title: "5,000",
		price: 50,
		// icon: BlueGemSvg,
		icon: require("@assets/images/gems/blue-gem.png"),
		color: "text-fans-blue",
	},
	{
		title: "10,000",
		price: 100,
		// icon: GreenGemSvg,
		icon: require("@assets/images/gems/green-gem.png"),
		color: "text-fans-green-second",
	},
];

export const checkoutOptions = [
	// {
	// 	name: "PayPal",
	// 	type: CheckoutType.PayPal,
	// },
	{
		name: "Stripe",
		type: CheckoutType.Stripe,
	},
	// {
	// 	name: "Credit Card",
	// 	type: CheckoutType.CreditCard,
	// },
];

export const defaultSubscriptions = {
	id: "0",
	title: "",
	price: 0,
	currency: "USD",
	bundles: [],
	campaigns: [],
};

export const defaultHighlight = {
	id: "",
	title: "",
	cover: "",
	stories: [],
	profileId: "",
};

export const postPropertyLinks = [
	{
		title: "Who can view",
		pathname: "/posts/create/view-setting",
		stepType: PostStepTypes.ViewSetting,
	},
	{
		title: "Add to category",
		pathname: "/posts/create/categories",
		stepType: PostStepTypes.Categories,
	},
	{
		title: "Paid post",
		pathname: "/posts/create/paid-post",
		stepType: PostStepTypes.PaidPost,
	},
	// {
	// 	title: "Add poll",
	// 	pathname: "/posts/create/add-poll",
	// 	stepType: PostStepTypes.AddPoll,
	// },
	{
		title: "Tag people",
		pathname: "/posts/create/tag-people",
		stepType: PostStepTypes.TagPeople,
	},
	// {
	// 	title: "Add giveaway",
	// 	pathname: "/posts/create/giveaway",
	// 	stepType: PostStepTypes.AddGiveaway,
	// },
	// {
	// 	title: "Add location",
	// 	pathname: "/posts/create/location",
	// 	stepType: PostStepTypes.Location,
	// },
	{
		title: "Schedule post",
		pathname: "/posts/create/schedule",
		stepType: PostStepTypes.Schedule,
	},
	// {
	// 	title: "Add fundraiser",
	// 	pathname: "/posts/create/add-fundraiser",
	// 	stepType: PostStepTypes.AddFundraiser,
	// },
	{
		title: "Advanced settings",
		pathname: "/posts/create/advanced-settings",
		stepType: PostStepTypes.AdvancedSettings,
	},
];

const generateSocialMediaUrls = () => {
	return SocialMediaTypes.map((socialMedia) => ({
		id: socialMedia,
		value: "",
		title:
			socialMedia.charAt(0).toUpperCase() +
			socialMedia.slice(1).toLowerCase(),
	}));
};

export const defaultProfileSettings: IProfileSettings = {
	video: {
		timeZone: "Your Default Timezone",
		timeframes: [], // Provide default values based on the 'Timeframe' structure
		bufferBetweenCalls: 15,
		sexualContent: false,
		contentPreferences: [],
		additionalContentPreferences: "",
		videoCallWays: VideoCallWays.OneWay,
		meetingTitle: "Default Meeting Title",
		meetingDescription: "Default Meeting Description",
		notifications: {
			reminders: true,
			newRequests: true,
			cancellations: true,
			notificationsByPhone: true,
			notificationsByEmail: true,
		},
		customVideoOrdersEnabled: false,
		vacationMode: false,
		pricesDuration: [],
		videoCallsEnabled: false,
	},
	cameo: {
		pricesDuration: [],
		contentPreferences: [],
		timeframes: [],
		tos: "",
		requestLimitations: {
			fulFillmentTimeFrame: "",
			numberRequestsType: "",
			numberRequestsValue: 0,
		},
		responseDescription: "",
		uploadPreviews: "",
		notifications: {
			newRequests: false,
			pendingVideos: false,
			completedRequests: false,
			notificationsByPhone: false,
			notificationsByEmail: false,
		},
		customVideoOrdersEnabled: false,
		vacationMode: false,
		vacationModeInterval: "",
		videoCallsEnabled: false,
		sexualContent: false,
		additionalContentPreferences: "",
	},
	fanProfile: {
		bio: "",
		displayName: "",
		socialMedias: generateSocialMediaUrls(),
	},
};

export const defaultProfileStateData: IProfileState = {
	id: "0",
	userId: "0",
	displayName: "",
	migrationLink: "",
	profileLink: "",
	bio: "",
	cover: [],
	previews: [],
	supportNsfw: null,
	subscriptionType: SubscriptionTypes.Flat,
	isEnabled: false,
	location: "",
	birthday: "",
	imageCount: 0,
	videoCount: 0,
	commentCount: 0,
	likeCount: 0,
	socialLinks: defaultSocialLinks,
	subscriptions: [defaultSubscriptions],
	tiers: [],
	roles: [],
	categories: [],

	posts: [],
	playlists: [],
	medias: [],
	highlights: [],

	addedPostIds: [],
	highlightForm: defaultHighlight,
	stories: [],
	settings: defaultProfileSettings,
};

export const defaultAnalyzeFans: IAnalyzeFans[] = [
	{
		from: 1,
		to: 20,
		fans: 0,
	},
	{
		from: 21,
		to: 40,
		fans: 0,
	},
	{
		from: 41,
		to: 60,
		fans: 0,
	},
	{
		from: 61,
		to: 80,
		fans: 0,
	},
	{
		from: 81,
		to: 100,
		fans: 0,
	},
];

export const badgeTiers: IBadgeTier[] = [
	{
		type: BadgeType.NewFan,
		title: "New Fan",
		description: "Get started with your first purchase",
	},
	{
		type: BadgeType.Enthusiast,
		title: "Enthusiast",
		description: "Total spend reaches",
		price: 50,
	},
	{
		type: BadgeType.BronzeSupporter,
		title: "Bronze Supporter",
		description: "Total spend reaches",
		price: 100,
	},
	{
		type: BadgeType.SilverSponsor,
		title: "Silver Sponsor",
		description: "Total spend reaches",
		price: 250,
	},
	{
		type: BadgeType.GoldPatron,
		title: "Gold Patron",
		description: "Total spend reaches",
		price: 500,
	},
	{
		type: BadgeType.RubyGuardian,
		title: "Ruby Guardian",
		description: "Total spend reaches",
		price: 1000,
	},
	{
		type: BadgeType.EmeraldAmbassador,
		title: "Emerald Ambassador",
		description: "Total spend reaches",
		price: 2500,
	},
	{
		type: BadgeType.PlatinumPartner,
		title: "Platinum Partner",
		description: "Total spend reaches",
		price: 5000,
	},
	{
		type: BadgeType.SapphireChampion,
		title: "Sapphire Champion",
		description: "Total spend reaches",
		price: 7500,
	},
	{
		type: BadgeType.DiamondDevotee,
		title: "Diamond Devotee",
		description: "Total spend reaches",
		price: 10000,
	},
];

export const createLinkOfferLimitOptions: IFansDropdownItem[] = [
	{
		id: "",
		text: "Not Limit",
	},
	{
		id: 5,
		text: "5 subscribers",
	},
	{
		id: 10,
		text: "10 subscribers",
	},
	{
		id: 25,
		text: "25 subscribers",
	},
	{
		id: 50,
		text: "50 subscribers",
	},
	{
		id: 100,
		text: "100 subscribers",
	},
	{
		id: 250,
		text: "250 subscribers",
	},
	{
		id: 500,
		text: "500 subscribers",
	},
	{
		id: 1000,
		text: "1,000 subscribers",
	},
	{
		id: 2500,
		text: "2,500 subscribers",
	},
	{
		id: 5000,
		text: "5,000 subscribers",
	},
	{
		id: 10000,
		text: "10,000 subscribers",
	},
];

export const createLinkDurationOptions: IFansDropdownItem[] = [
	{
		id: 1,
		text: "1 month",
	},
	{
		id: 3,
		text: "3 months",
	},
	{
		id: 6,
		text: "6 months",
	},
];

export const documentTypes: IFansDropdownItem[] = [
	{
		id: "Passport",
		text: "Passport",
	},
	{
		id: "ID Card",
		text: "ID Card",
	},
	{
		id: "Drivers License",
		text: "Drivers License",
	},
];

export const emptyProfileData: IProfile = {
	id: "0",
	userId: "0",
	displayName: "",
	migrationLink: "",
	profileLink: "",
	bio: "",
	cover: [],
	previews: [],
	supportNsfw: null,
	subscriptionType: SubscriptionTypes.Flat,
	isEnabled: false,
	location: "",
	birthday: "",
	imageCount: 0,
	videoCount: 0,
	commentCount: 0,
	likeCount: 0,
	socialLinks: [],
	subscriptions: [],
	tiers: [],
	roles: [],
	categories: [],
	stories: [],
};

export const emptyPostData: IPost = {
	id: "0",
	profileId: "0",
	profile: emptyProfileData,
	title: "",
	type: PostType.Audio,
	caption: "",
	thumb: {
		id: "0",
		url: "",
	},
	medias: [],
	isArchived: false,
	isHidden: false,
	isPaidPost: false,
	commentCount: 0,
	likeCount: 0,
	createdAt: "2023-09-05T23:39:10.318Z",
	updatedAt: "2023-09-05T23:39:10.318Z",
	bookmarkCount: 0,
	taggedPeoples: [],
	isPaidOut: false,
	isPinned: false,
};

export const allowedAudioFileTypes = [
	"audio/mpeg",
	"video/mp4",
	"audio/wav",
	"audio/aac",
	"audio/flac",
];
