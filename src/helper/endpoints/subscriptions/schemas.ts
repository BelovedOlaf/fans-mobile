// This file is supposed to be synced between frontend and backend
// frontend: helper/endpoints/payments/schemas.ts
// backend: web/routes/payments/schemas.ts

import { IPaymentMethod, Subscription } from "@usertypes/types";

export type SubscriptionRespBody = Subscription[];

export interface SubscribeFreeReqBody {
	id: string;
}

export interface SubscribeReqBody {
	id: string;
	bundleId?: string;
	customerPaymentProfileId: string;
}

export interface SubscribePaymentMethodReqBody {
	id: string;
	customerPaymentProfileId: string;
}

export interface UnsubscribeReqBody {
	id: string;
}

export type PaymentMethodsResBody = IPaymentMethod[];

export type PaymentMethodResBody = IPaymentMethod;

export interface FetchPaymentMethodReqBody {
	paymentMethodId: string;
	customerPaymentProfileId: string;
}

export interface DeletePaymentMethodReqBody {
	paymentMethodId: string;
	customerPaymentProfileId: string;
}

export interface PaymentMethodReqParams {
	id: string;
}

export interface PaymentMethodReqBody {
	opaqueDataValue: string;
	customerInformation: {
		firstName: string;
		lastName: string;
		country: string;
		address: string;
		city: string;
		state: string;
		zip: string;
	};
}

export interface UpdatePaymentMethodReqBody {
	customerPaymentProfileId: string;
	opaqueDataValue: string;
	customerInformation: {
		firstName: string;
		lastName: string;
		country: string;
		address: string;
		city: string;
		state: string;
		zip: string;
	};
}

export interface CheckAccessRespBody {
	hasAccess: boolean;
}

export interface SubscriptionPriceResBody {
	amount: number;
	platformFee: number;
	totalAmount: number;
	campaignId?: bigint;
	freeTrial?: boolean;
	freeTrialPeriod?: number;
	discount?: number;
	discountPeriod?: number;
}
