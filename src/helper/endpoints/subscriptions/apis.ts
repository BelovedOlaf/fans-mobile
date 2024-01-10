import {
	createDELETE,
	createGET,
	createGETWithParams,
	createPOST,
	createPUT,
} from "@helper/RequesterBase";
import {
	SubscriptionRespBody,
	SubscribeReqBody,
	SubscribeFreeReqBody,
	SubscribePaymentMethodReqBody,
	UnsubscribeReqBody,
	PaymentMethodResBody,
	PaymentMethodReqParams,
	PaymentMethodsResBody,
	PaymentMethodReqBody,
	CheckAccessRespBody,
	SubscriptionPriceResBody,
	FetchPaymentMethodReqBody,
	UpdatePaymentMethodReqBody,
	DeletePaymentMethodReqBody,
} from "./schemas";
import { IdParams } from "@usertypes/params";

export const getSubscriptions = createGET<SubscriptionRespBody>(
	"/subscriptions/subscriptions",
	true,
);

export const subscribe = createPOST<SubscribeReqBody, never>(
	"/subscriptions/subscribe",
	true,
);

export const freeSubscribe = createPOST<SubscribeFreeReqBody, never>(
	"/subscriptions/subscribe/free",
	true,
);

export const unsubscribe = createPOST<UnsubscribeReqBody, never>(
	"/subscriptions/unsubscribe",
	true,
);

export const getSubscriptionPrice = createGET<SubscriptionPriceResBody>(
	"/subscriptions/price",
	true,
);

export const checkAccessSubscribedUser = createGETWithParams<
	CheckAccessRespBody,
	IdParams
>("/subscriptions/has-access/:id", true);

export const getPaymentMethod = createGETWithParams<
	PaymentMethodResBody,
	PaymentMethodReqParams
>("/subscriptions/payment-method/:id", true);

export const getPaymentMethods = createGET<PaymentMethodsResBody>(
	"/profile/payments/payment-methods",
	true,
);

export const fetchPaymentMethod = createGETWithParams<
	PaymentMethodResBody,
	FetchPaymentMethodReqBody
>("/profile/payments/payment-method", true);

export const editPaymentMethod = createPUT<UpdatePaymentMethodReqBody, never>(
	"/profile/payments/payment-method",
	true,
);

export const deletePaymentMethod = createDELETE<
	DeletePaymentMethodReqBody,
	never
>("/profile/payments/payment-method", true);

export const addPaymentMethod = createPOST<PaymentMethodReqBody, never>(
	"/profile/payments/payment-method",
	true,
);

export const updatePaymentMethod = createPUT<
	SubscribePaymentMethodReqBody,
	never
>("/subscriptions/payment-method", true);
