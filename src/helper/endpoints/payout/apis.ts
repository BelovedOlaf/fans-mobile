import {
	createGET,
	createPOST,
	createPUT,
	createDELETEWithParams,
	createGETWithParams,
	createPUTWithParams,
} from "@helper/RequesterBase";
import {
	PayPalPayoutMethodsResBody,
	PayoutMethodReqBody,
	PayPalPayoutMethodResBody,
	PayoutScheduleResBody,
	UpdatePayoutScheduleReqBody,
	GetPayoutMethodReqBody,
	PutPayoutMethodReqBody,
	DeletePayoutMethodReqBody,
} from "./schemas";

export const executePayout = createGET("/payout/execute-payout", true);

export const fetchPayoutPaymentMethods = createGET<PayPalPayoutMethodsResBody>(
	"/payout/payment-methods",
	true,
);

export const fetchPayoutMethod = createGETWithParams<
	PayPalPayoutMethodResBody,
	GetPayoutMethodReqBody
>("/payout/payment-method/:id", true);

export const updatePayoutMethod = createPUTWithParams<
	PayoutMethodReqBody,
	never,
	PutPayoutMethodReqBody
>("/payout/payment-method/:id", true);

export const createPayPalPayoutMethod = createPOST<PayoutMethodReqBody, never>(
	"/payout/payment-method",
	true,
);

export const deletePayoutMethod = createDELETEWithParams<
	DeletePayoutMethodReqBody,
	never,
	DeletePayoutMethodReqBody
>("/payout/payment-method/:id", true);

export const fetchPayoutSchedule = createGET<PayoutScheduleResBody>(
	"/payout/payout-schedule",
	true,
);

export const updatePayoutSchedule = createPUT<
	UpdatePayoutScheduleReqBody,
	never
>("/payout/payout-schedule", true);
