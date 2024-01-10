import { createPOST } from "@helper/RequesterBase";
import {
	PriceReqBody,
	TipReqBody,
	PayPalGemPurchaseReqBody,
	StripeGemPurchaseReqBody,
	AuthorizeNetGemPurchaseReqBody,
	PayPalPurchaseRespBody,
	StripePurchaseRespBody,
} from "./schemas";

export const gemsPrice = createPOST<PriceReqBody, never>("/gems/price", true);

export const gemsPayPalPurchase = createPOST<
	PayPalGemPurchaseReqBody,
	PayPalPurchaseRespBody
>("/gems/purchase/paypal", true);

export const gemsStripePurchase = createPOST<
	StripeGemPurchaseReqBody,
	StripePurchaseRespBody
>("/gems/purchase/stripe", true);

export const gemsAuthorizeNetPurchase = createPOST<
	AuthorizeNetGemPurchaseReqBody,
	never
>("/gems/purchase/authorize-net", true);

export const tipCreator = createPOST<TipReqBody, never>("/gems/tip", true);
