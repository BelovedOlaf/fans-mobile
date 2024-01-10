import {
	PostType,
	PromotionType,
	DurationType,
	CampaignApplicableType,
} from "@usertypes/commonEnums";
import { IPostForm, IPaymentCard } from "@usertypes/types";

export const defaultAudioDetail = {
	title: "",
	episodeNumber: "",
	description: "",
	isPrivate: false,
	isAudioLeveling: true,
	isNoiseReduction: true,
};

export const defaultPollFormData = {
	question: "",
	caption: "",
	answers: [""],
	thumb: "",
	startDate: "2023-07-20T15:06:40.472Z",
	endDate: "2023-07-25T15:06:40.472Z",
	timezone: "",
};

export const defaultFundraiserFormData = {
	title: "",
	caption: "",
	price: "",
	currency: "USD",
	startDate: "2023-07-20T15:06:40.472Z",
	endDate: "2023-07-24T15:06:40.472Z",
	timezone: "GMT +0:00",
	isXpAdd: false,
	thumb: "",
};

export const defaultAddGiveawayFormData = {
	prize: "",
	startDate: "",
	endDate: "",
	timezone: "GMT +0:00",
	winnerCount: "",
	thumb: {
		uri: "",
		isPicker: true,
	},
};

export const defaultPostFormData: IPostForm = {
	id: "0",
	title: "",
	type: PostType.Photo,
	caption: "",
	thumb: {
		uri: "",
		isPicker: true,
	},
	medias: [],
	roles: [],
	categories: [],
	// paidPost: {
	// 	currency: "USD",
	// 	price: "0",
	// 	thumb: "",
	// },
	fundraiser: defaultFundraiserFormData,
	giveaway: defaultAddGiveawayFormData,
	schedule: {
		startDate: "",
		endDate: "",
		timezone: "",
	},
	advanced: {
		isHideLikeViewCount: false,
		isTurnOffComment: false,
		isPaidLabelDisclaimer: false,
	},
	poll: defaultPollFormData,
	audio: defaultAudioDetail,
	taggedPeoples: [],
	locationId: "",
	formIds: [],
	uploadFiles: [],
	isReleaseForm: false,
	isAllSubscribers: true,
	carouselIndex: 0,
	newUsertags: [],
	categoryForm: {
		isAll: true,
		categoryName: "",
		roleIds: [],
	},
};

export const defaultPaymentCardData: IPaymentCard = {
	country: "",
	state: "",
	street: "",
	city: "",
	zip: "",
	cardName: "",
	cardNumber: "",
	expireDate: "",
	cvc: "",
};

export const defaultCampaignFormData = {
	id: "0",
	endDate: "",
	duration: "",
	limit: "0",
	discount: "",
	type: PromotionType.FreeTrial,
	applicable: CampaignApplicableType.New,
	durationType: DurationType.Months,
};
