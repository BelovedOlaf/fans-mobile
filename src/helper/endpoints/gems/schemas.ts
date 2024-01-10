// This file is supposed to be synced between app and backend
// frontend: helper/endpoints/gems/schemas.ts
// backend: web/routes/gems/schemas.ts

export interface PriceReqBody {
	gems: number;
	service: string;
}

export interface TipReqBody {
	creatorId: string;
	gems: number;
	message?: string;
}

export interface StripeGemPurchaseReqBody {
	gems: number;
}

export interface PayPalGemPurchaseReqBody {
	gems: number;
}

export interface AuthorizeNetGemPurchaseReqBody {
	gems: number;
	opaqueDataValue: string;
	customerInformation: {
		firstName: string;
		lastName: string;
	};
}

export interface PayPalPurchaseRespBody {
	approvalLink: string;
}

export interface StripePurchaseRespBody {
	clientSecret: string;
}
