import { NativeStackScreenProps } from "@react-navigation/native-stack";

export { default } from "@screens/settings/referral/Layout";

export type ReferralProgramNativeStackParams = {
	Referral: undefined;
	ReferAndEarn: undefined;
	FindReferralPrograms: undefined;
	ReferralsDashboard: undefined;
	JoinProgram: undefined;
	PayoutSetup: { id: string | null; isGreen?: boolean } | undefined;
	GetPaid: { isGreen?: boolean; refresh?: boolean } | undefined;
	ReferralAnalytics: undefined;
};
