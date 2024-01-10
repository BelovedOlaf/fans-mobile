export { default } from "@screens/settings/referral/Layout";

export type ReferralProgramNativeStackParams = {
	ReferCreators: undefined;
	PayoutSetup: { id: string | null; isGreen?: boolean } | undefined;
	GetPaid: { isGreen?: boolean; refresh?: boolean } | undefined;
	ReferralAnalytics: undefined;
	AddPaymentMethod:
		| {
				id?: string;
				customerPaymentProfileId?: string;
		  }
		| undefined;
	Payments: { refresh?: boolean } | undefined;
	ReferralPayoutSetup: undefined;
};
