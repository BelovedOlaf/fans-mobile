import { NavigatorScreenParams } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AutomatedChatsNativeStackParams } from "@screens/settings/automatedChats";
import { PrivacyNativeStackParams } from "@screens/settings/privacy";

export type ChatNativeStackParams = {
	Camera: undefined;
	Chat: { id: string } | undefined;
	FanAnalysis: undefined;
	Gallery: undefined;
	Messages: undefined;
	MessageSelect: undefined;
	NewMessage: undefined;
	PinnedMessages: undefined;
	SendMessage: undefined;
	ShareNote: undefined;
	Notes: undefined;
};
export type ChatNativeStackScreens = keyof ChatNativeStackParams;
export type ChatNativeStackScreenProps<T extends ChatNativeStackScreens> =
	NativeStackScreenProps<ChatNativeStackParams, T>;

export type SettingsNativeStackParams = {
	Account: undefined;
	Analytics: undefined;
	AutomatedChats: NavigatorScreenParams<AutomatedChatsNativeStackParams>;
	ChangePassword: undefined;
	Connections: undefined;
	DisplayName: undefined;
	Email: undefined;
	Notifications: undefined;
	Payments: NavigatorScreenParams<SettingsPaymentsStackParams>;
	Phone: undefined;
	Privacy: NavigatorScreenParams<PrivacyNativeStackParams>;
	REPORTABUSE: undefined;
	Settings: undefined;
	Subscriptions: {
		screen?: string;
		returnPopup?: string | string[];
		subscriptionId?: string | string[];
	};
	Username: undefined;
	ReferralProgram: { isSetting: boolean } | undefined;
	ReferCreators: undefined;
	ReferralAnalytics: undefined;
	ReferralPayments: undefined;
	ReferralPayoutSetup: undefined;
	AddPaymentMethod: undefined;
	VerifyEmail: { email: string };
	ScheduledPosts: undefined;
	VideoCallSetup: undefined;
	CameoSetup: undefined;
	FanProfileSetup: undefined;
};
export type SettingsNativeStackScreens = keyof SettingsNativeStackParams;
export type SettingsNativeStackScreenProps<
	T extends SettingsNativeStackScreens,
> = NativeStackScreenProps<SettingsNativeStackParams, T>;

export type SettingsPaymentsStackParams = {
	AddPaymentMethod:
		| {
				id?: string;
				customerPaymentProfileId?: string;
		  }
		| undefined;
	Payments: { refresh?: boolean } | undefined;
};
export type SettingsPaymentsStackScreenProps<
	T extends keyof SettingsPaymentsStackParams,
> = NativeStackScreenProps<SettingsPaymentsStackParams, T>;

export type TabNavigationStacks = {};

export type MainNavigationStacks = {
	chat: undefined;
};

export type NotificationsNavigationStacks = {
	Notifications: undefined;
};

export type TermsNavigationStacks = {
	Terms: undefined;
	Sanction: undefined;
	Benefits: undefined;
	Community: undefined;
	Security: undefined;
	Cookies: undefined;
	DataAgreement: undefined;
	Fees: undefined;
	Returns: undefined;
};

export type ProfileNavigationStacks = {
	Profile: undefined;
	ProfileName: undefined;
	ProfileStyle: undefined;
	ReferralProgram: undefined;
	ReferCreators: undefined;
	Edit: undefined;
	SocialLinks: undefined;
	Cover: undefined;
	Levels: undefined;
	GetPaid: { isGreen?: boolean; refresh?: boolean } | undefined;
	PayoutSetup: { id: string | null; isGreen?: boolean } | undefined;
	Preview: undefined;
	Subscription: undefined;
	Bundle: { id: string | null; price: number };
	PromotionCampaign: { id: string | null };
	Tier: { id: string | null };
	Playlist: { id: string | null };
	Highlights: undefined;
	HighlightStories: undefined;
	HighlightCover: undefined;
	Categories: undefined;
	NewCategory: undefined;
	EditCategory: { id: string | null };
	AddPostsCategory: undefined;
	AddPosts: { selectedPostIds: string[] };
	ArchivedPosts: undefined;
	AddCard: {
		screen?: string;
		returnPopup?: string | string[];
		subscriptionId?: string | string[];
	};
	Role: { id: string | null };
	Badge: undefined;
	TrackingLinks: undefined;
	AgeVerifyForm: undefined;
	AgeVerifyFailed: undefined;
	AgeVerifyPending: undefined;
};

export type CreatorProfileNavigationStacks = {
	Creator: { username: string };
	Preview: { username: string };
	Post: { id: string };
};

export type PrivacyPolicyNavigationStacks = {
	Privacy: undefined;
};

export type PostsNavigationStacks = {
	Home: undefined;
	Fundraiser: undefined;
	Poll: undefined;
	Text: undefined;
	Thumbnail: undefined;
	Caption: undefined;
	AudioDetail: undefined;
	ViewSetting: undefined;
	Role: { id: string | null };
	FansLevels: undefined;
	Categories: undefined;
	NewCategory: undefined;
	PaidPost: undefined;
	PollProperty: undefined;
	TagPeople: undefined;
	TagPeopleSearch: undefined;
	Invite: undefined;
	Giveaway: undefined;
	Location: undefined;
	Schedule: undefined;
	FundraiserProperty: undefined;
	AdvancedSettings: undefined;
};

export type StoriesNavigationStacks = {
	Highlight: { highlightId: string; userId: string };
	Creator: { userId: string };
	Profile: { userId: string };
};

export type PlaylistNavigationStacks = {
	Detail: { id: string };
};

export type PostDetailNavigationStacks = {
	Detail: { id: string };
};
