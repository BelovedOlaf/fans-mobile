import { View, ScrollView } from "react-native";
import React from "react";
import tw from "@lib/tailwind";

import { TermsText } from "@components/terms";

const FeeScheduleScreen = () => {
	return (
		<View style={[tw.style("flex-1 bg-white")]}>
			<ScrollView style={tw.style("flex-1  px-4.5 pt-6")}>
				<View style={tw.style("mb-10")}>
					<TermsText variant="title" marginBottom={20}>
						FYP.Fans Fee Structure
					</TermsText>
					<TermsText>Last updated: August 20th, 2023</TermsText>
				</View>
				<View style={tw.style("mb-10")}>
					<TermsText variant="subtitle" marginBottom={20}>
						Table of Contents
					</TermsText>
					<TermsText>
						{"\u2022 "}Platform Fees{"\n"}
						{"\u2022 "}Payment Processing Fees{"\n"}
						{"\u2022 "}Currency Conversion Fees{"\n"}
						{"\u2022 "}Payout Fees{"\n"}
						{"\u2022 "}Frequently Asked Questions
					</TermsText>
				</View>
				<View style={tw.style("mb-10")}>
					<TermsText variant="title" marginBottom={20}>
						Introduction
					</TermsText>
					<TermsText>
						Whether you're a creator just starting your journey or a
						seasoned veteran, this guide aims to provide a
						comprehensive understanding of the fees involved when
						using FYP.Fans. {"\n"}
						{"\u2022 "}Sales Tax/VAT: FYP.Fans is legally obligated
						to add sales tax or VAT to certain membership
						transactions, as mandated by law. {"\n"}
						{"\u2022 "}Currency Conversion Fees: If applicable, a
						currency conversion fee of 2.5% will be applied to the
						total amount processed, including any sales tax or VAT,
						for all membership payments made in currencies other
						than USD.
					</TermsText>
				</View>
				<View style={tw.style("mb-10")}>
					<TermsText variant="title" marginBottom={20}>
						Platform Fees
					</TermsText>
					<TermsText>
						Your platform fee is a percentage of the successfully
						processed payments, excluding sales tax. Our fees are as
						follows:
						{"\n\n"}- Creators (for all transaction types): 7%
						{"\n"}- Purchases (fans): 7%
						{"\n"}- Gem purchases (fans): 10%
					</TermsText>
				</View>
				<View style={tw.style("mb-10")}>
					<TermsText variant="title" marginBottom={20}>
						Payment Processing Fees
					</TermsText>
					<TermsText>
						We use Stripe and PayPal for tips. We use Authorize.net
						for subscription payment processing. These fees cover
						the cost of recurring billing, fraud prevention, and
						payment recovery.
						{"\n\n"}- Stripe: 2.9% + 0.30USD {"\n"}- PayPal: 3.9% +
						0.30USD
						{"\n"}- Authorize.net: 2.9% + 30¢
					</TermsText>
				</View>
				<View style={tw.style("mb-10")}>
					<TermsText variant="title" marginBottom={20}>
						Micropayment and Standard Rates
					</TermsText>
					<TermsText>
						The processing rates vary depending on the payment
						method. For example, for payments in USD:
						{"\n\n"}- Credit Card: 2.9% + 0.30USD for payments over
						$3{"\n"}- PayPal & Stripe: 2.9% + 0.30USD for payments
						over $3
					</TermsText>
				</View>
				<View style={tw.style("mb-10")}>
					<TermsText variant="title" marginBottom={20}>
						Currency Conversion Fees
					</TermsText>
					<TermsText>
						All payouts are made in USD. A currency conversion fee
						of 2.5% will be applied to all payments processed in a
						currency other than USD. This fee is reversed if the
						payment is refunded.
					</TermsText>
				</View>
				<View style={tw.style("mb-10")}>
					<TermsText variant="title" marginBottom={20}>
						Payout Fees
					</TermsText>
					<TermsText>
						Your account balance already reflects the deduction of
						platform fees, payment processing fees, and currency
						conversion fees. Additional fees are incurred when
						transferring your balance from your FYP.Fans account.
						{"\n\n"}- Bank Payout: 1% of the amount transferred with
						a minimum of $0.25, capped at $20.00 USD
						{"\n\n"}
						Payouts in Other Currencies If you are receiving payouts
						in a currency other than USD, additional fees may apply.
					</TermsText>
				</View>
			</ScrollView>
		</View>
	);
};

export default FeeScheduleScreen;
