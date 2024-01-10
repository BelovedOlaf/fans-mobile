// import base modules
import { createGET, createPOST } from "@helper/RequesterBase";

// impot main modules
import {
	CreateReportReqBody,
	EarningsReqBody,
	EarningsResBody,
	SubscribersResBody,
	TransactionsResBody,
	RefundReqBody,
} from "./schemas";

export const createReport = createPOST<CreateReportReqBody, never>(
	"/creator/reports",
	true,
);

export const getEarnings = createPOST<EarningsReqBody, EarningsResBody>(
	"/creator/analytics/earnings",
	true,
);

export const getSubscribers = createGET<SubscribersResBody>(
	"/creator/analytics/subscribers",
	true,
);

export const getTransactions = createGET<TransactionsResBody>(
	"/creator/analytics/transactions",
	true,
);

export const refund = createPOST<RefundReqBody, never>(
	"/creator/analytics/refund",
	true,
);
