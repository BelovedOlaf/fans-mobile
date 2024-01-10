export enum UserRoleTypes {
	Creator = "Creator",
	Fan = "Fan",
}

export enum RoundButtonType {
	PRIMARY = "primary",
	SECONDARY = "secondary",
	OUTLINE = "outline",
	OUTLINE_PRIMARY = "outline-primary",
	OUTLINE_WHITE = "outline-white",
	TEXT = "text",
	CONTAINED_WHITE = "contained-white",
	OUTLINE_RED = "outline-red",
	OUTLINE_SECONDARY = "outline-secondary",
}

export enum ConfirmDialogIconTypes {
	SUCCESS = "success",
	QUESTION = "question",
	WARNING = "warning",
	ERROR = "error",
}

export enum StorageKeyTypes {
	AccessToken = "accessToken",
	UserInfo = "userInfo",
	FeatureGates = "featureGates",
	CreateProfileIsNSFW = "createProfileIsNSFW",
	RedirectAfterLogin = "redirectAfterLogin",
	FeatureReferrralCode = "featureReferralCode",
}

export enum ComponentSizeTypes {
	xs = "xs",
	sm = "sm",
	md = "md",
	lg = "lg",
}

export enum SearchTabTypes {
	Creators = "Creators",
	Posts = "Posts",
	Tags = "Tags",
	RecentSearches = "Recent Searches",
}

export enum SnapPoints {
	TwentyFive = "25%",
	Fourty = "40%",
	Fifty = "50%",
	Sixty = "60%",
	Ninety = "90%",
}

export enum HttpMethods {
	GET = "GET",
	POST = "POST",
	PUT = "PUT",
	DELETE = "DELETE",
}

export enum PostType {
	Photo = "Photo",
	Audio = "Audio",
	Video = "Video",
	Text = "Text",
	Poll = "Poll",
	Fundraiser = "Fundraiser",
	Story = "Story",
}

export enum OTPPageTypes {
	"VerifyAccountOTP" = "Confirm your registration",
	"VerifyForgotPasswordOTP" = "Reset your password",
}

export enum ProfileThemeType {
	Minimalist = "Minimalist",
	Dark = "Dark",
	Space = "Space",
}

export enum SubscriptionTypes {
	Flat = "Flat",
	Tier = "Tier",
	OneTimePayment = "OneTimePayment",
}

export enum CheckoutType {
	PayPal = "PayPal",
	Stripe = "Stripe",
	CreditCard = "CreditCard",
}

export enum PromotionType {
	FreeTrial = "Free_Trial",
	Discount = "Discount",
}

export enum CampaignApplicableType {
	New = "NEW",
	Existing = "EXISTING",
	Both = "BOTH",
}
export enum MediaType {
	All = "All",
	Image = "Image",
	Video = "Video",
	Audio = "Audio",
	Form = "Form",
}

export enum ResizeMode {
	CONTAIN = "contain",
	COVER = "cover",
	STRETCH = "stretch",
}

export enum SubscriptionFilterTypes {
	All = "All",
	Active = "Active",
	Expired = "Expired",
	NeedAttention = "Need attention",
}

export enum IconTypes {
	Close = "Close",
	Renew = "Renew",
	CopyLink = "Copy Link",
	AddRemoveFromLists = "Add/remove from lists",
	Block = "Block",
	Report = "Report",
	Cancel = "Cancel",
	EyeHide = "Eye Hide",
	EyeShow = "Eye Show",
	Unsubscribe = "Unsubscribe",

	Image = "Image",
	VideoCamera = "Video Camera",
	Poll = "Poll",
	Text = "Text",
	Fundraiser = "Fundraiser",
	ArchivedPost = "Archived Post",
	Story = "Story",
	Music = "Music",

	Edit = "Edit",
	Statistics = "Statistics",
}

export enum PostStepTypes {
	Empty = "Empty",
	Thumbnail = "Thumbnail",
	Caption = "Caption",
	AdvancedSettings = "Advanced Settings",
	Schedule = "Schedule",
	ViewSetting = "View Setting",
	Role = "Role",
	AnalyzeFansLevels = "Analyze Fans Levels",
	Categories = "Categories",
	NewCategory = "New Category",
	Location = "Location",
	PaidPost = "Paid Post",
	AddPoll = "Add Poll",
	NewPollPost = "New Poll Post",
	TagPeople = "Tag People",
	TagPeopleSearch = "Tag People Search",
	InviteNewUser = "Invite New User",
	AddGiveaway = "Add giveaway",
	AddFundraiser = "Add Fundraiser",
	NewFundraiserPost = "New Fundraiser Post",
	AudioDetail = "Audio Detail",
	Text = "Text",
}

export enum SubscribeActionType {
	Subscribe = "Subscribe",
	Bundle = "Bundle",
	Tier = "Tier",
	Post = "Post",
}

export enum ReportType {
	UNDERAGE_USER = "UNDERAGE_USER",
}

export enum PaymentMethodType {
	PayPal = "PayPal",
	Bank = "Bank",
}

export enum DurationType {
	Hours = "Hours",
	Days = "Days",
	Weeks = "Weeks",
	Months = "Months",
}

export enum SortType {
	Popular = "Popular",
	Latest = "Latest",
}

export enum BadgeType {
	NewFan = "New Fan",
	Enthusiast = "Enthusiast",
	BronzeSupporter = "Bronze Supporter",
	SilverSponsor = "Silver Sponsor",
	GoldPatron = "Gold Patron",
	RubyGuardian = "Ruby Guardian",
	EmeraldAmbassador = "Emerald Ambassador",
	PlatinumPartner = "Platinum Partner",
	SapphireChampion = "SapphireChampion",
	DiamondDevotee = "Diamond Devotee",
}

export enum ProfileViewType {
	Creator = "Creator",
	Members = "Members",
	Public = "Public",
}
