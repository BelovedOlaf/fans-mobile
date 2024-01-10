import { ReportType } from "@usertypes/commonEnums";
import { ISubscriber, ITransactionCreator } from "@usertypes/types";

export type CreateReportReqBody = {
	userId: string;
	flag: ReportType;
	reason: string;
};

export interface EarningsReqBody {
	startDate?: string;
	endDate?: string;
}

export type EarningsResBody = {
	prevPeriodLabel: string;
	prevPeriodEarnings: number;
	prevPeriodEarningsDifference: number;
	prevPeriodEarningsPercentageDifference: number;
	earnings: number;
	period: string;
	timeline: {
		date: string;
		earnings: number;
	}[];
};

export type SubscribersResBody = {
	subscribers: ISubscriber[];
};

export type TransactionsResBody = {
	transactions: ITransactionCreator[];
};

export interface RefundReqBody {
	id: string;
}
