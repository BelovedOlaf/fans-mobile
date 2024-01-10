// This file is supposed to be synced between frontend and backend
// frontend: helper/endpoints/payout/schemas.ts
// backend: web/routes/payout/schemas.ts

import { IStripeForm, PayPalPayoutMethod } from "@usertypes/types";

export type PayPalPayoutMethodsResBody = PayPalPayoutMethod[];

export type PayPalPayoutMethodResBody = PayPalPayoutMethod;

export interface PayoutMethodReqBody {
	paypalEmail?: string;
	bankInfo?: IStripeForm;
	country: string;
	entityType: string;
	usCitizenOrResident: boolean;
}

export interface GetPayoutMethodReqBody {
	id: string;
}

export interface PutPayoutMethodReqBody {
	id: string;
}

export interface DeletePayoutMethodReqBody {
	id: string;
}

export interface PayoutScheduleResBody {
	mode: string;
	threshold?: number;
	maxPayout: number;
	totalPayoutAmount: number;
}

export interface UpdatePayoutScheduleReqBody {
	mode: string;
	threshold?: number;
}
