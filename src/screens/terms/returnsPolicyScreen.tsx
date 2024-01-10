import { View, ScrollView } from "react-native";
import React from "react";
import tw from "@lib/tailwind";

import { TermsText } from "@components/terms";

const ReturnsPolicyScreen = () => {
	return (
		<View style={[tw.style("flex-1 bg-white")]}>
			<ScrollView style={tw.style("flex-1  px-4.5 pt-6")}>
				<View style={tw.style("mb-10")}>
					<TermsText variant="title" marginBottom={20}>
						FYP.Fans Refund Policy
					</TermsText>
					<TermsText>
						Welcome to FYP.Fans' official Refund Policy. This
						document serves as a comprehensive guide for both
						creators and fans to understand our approach and
						procedures related to refunds. Our platform facilitates
						a direct channel for fans to support creators, and while
						the issuance of refunds primarily falls under the
						creator's discretion, there are specific scenarios where
						FYP.Fans itself may intervene. Please read through the
						following sections carefully to familiarize yourself
						with our practices on payment processing, refund steps,
						exceptional cases, and more.
					</TermsText>
				</View>
				<View style={tw.style("mb-10")}>
					<TermsText variant="subtitle" marginBottom={20}>
						Creators can issue refunds at their discretion
					</TermsText>
					<TermsText>
						Creators have the ability to refund fans' payments via
						their dashboard, provided they have a sufficient
						FYP.Fans balance to cover the refund amount. Should a
						creator encounter issues while processing a refund, our
						Support team is available for assistance.
					</TermsText>
				</View>
				<View style={tw.style("mb-10")}>
					<TermsText variant="subtitle" marginBottom={20}>
						For fans:
					</TermsText>
					<TermsText>
						Once we process a fan's payment, it's added to the
						creator's balance. Hence, we advise them to directly
						approach the creator for refund inquiries.
						{"\n\n"}
						Steps to Request a Refund:{"\n"}
						1. Message the creator directly on FYP.Fans.{"\n"}
						2. In your message, specify the transaction amount, the
						date of the transaction, and your reason for seeking a
						refund.
						{"\n\n"}
						We tell fans that creators oversee the distribution of
						content and benefits. While we hope all creators fulfill
						their promises, not delivering expected benefits isn't a
						breach of our terms.
					</TermsText>
				</View>
				<View style={tw.style("mb-10")}>
					<TermsText variant="subtitle" marginBottom={20}>
						What if the Creator Declines My Refund Request?
					</TermsText>
					<TermsText>
						Since payments are transferred to the creator's balance,
						it's essential to first approach them for refunds.
						However, FYP.Fans might consider refunds in exceptional
						cases, at our discretion. Note that a refund request
						doesn't guarantee approval. After reviewing your
						request, we'll notify you of our decision. If approved,
						refunds typically process within 5-7 business days.
						Visit our{" "}
						<TermsText variant="link">support page</TermsText> to
						request a refund.
					</TermsText>
				</View>
				<View style={tw.style("mb-10")}>
					<TermsText variant="subtitle" marginBottom={20}>
						Payment Fee Reversals on Refunds
					</TermsText>
					<TermsText>
						In the event that a transaction is refunded, FYP.Fans
						adheres to a clearly defined policy for the reversal of
						associated payment fees. All transaction fees originally
						incurred during the successful processing of the payment
						will be reversed and credited back to the creator's
						FYP.Fans account balance. This ensures that creators are
						not financially penalized for issuing a refund.
					</TermsText>
				</View>
				<View style={tw.style("mb-10")}>
					<TermsText variant="subtitle" marginBottom={20}>
						Dispute Resolution
					</TermsText>
					<TermsText>
						In the interest of maintaining a fair and transparent
						ecosystem for all parties involved, FYP.Fans has
						instituted a rigorous Dispute Resolution Mechanism to
						address disagreements related to refunds between fans
						and creators. Should a dispute arise, the parties are
						first encouraged to engage in good-faith dialogue to
						arrive at a mutually beneficial resolution. If an
						amicable solution cannot be reached, either party may
						escalate the matter to FYP.Fans' internal Dispute
						Resolution Team.
						{"\n\n"}
						The Dispute Resolution Team will conduct an impartial
						review of the situation, taking into account transaction
						records, communication logs, and any other relevant
						documentation submitted by the parties. Based on this
						comprehensive assessment, the Team will issue a binding
						resolution.
						{"\n\n"}
						For issues of considerable magnitude or legal
						complexity, FYP.Fans retains the right to invoke
						third-party arbitration in accordance with the
						prevailing arbitration laws and regulations. Such
						arbitration shall be conducted under the rules of an
						established arbitration body, to be mutually agreed upon
						by both parties. The outcome of such arbitration will be
						considered final and binding.
					</TermsText>
				</View>
				<View style={tw.style("mb-10")}>
					<TermsText variant="subtitle" marginBottom={20}>
						Exceptional Cases
					</TermsText>
					<TermsText>
						FYP.Fans recognizes that there may be rare circumstances
						that warrant exceptional intervention in matters
						typically governed by a creator's discretion. Such
						"exceptional cases" may include, but are not limited to,
						fraudulent activity, extreme non-compliance with our
						platform's Terms of Service, or substantial violations
						of ethical or legal standards.
						{"\n\n"}
						In these unique situations, FYP.Fans reserves the right
						to intercede directly and make determinations on
						refunds, notwithstanding the typical procedures and
						guidelines governing refund issuance. Any decisions
						reached in these exceptional cases are guided by a
						commitment to upholding the highest standards of
						consumer protection, legal compliance, and business
						ethics.
						{"\n\n"}
						Our objective in defining and intervening in exceptional
						cases is to maintain a balanced and safe environment for
						all users while minimizing risk. This ensures not only
						adherence to applicable laws and regulations but also
						safeguards our standing with financial stakeholders,
						including payment processors and banks.
						{"\n\n"}
						For further queries on our Dispute Resolution Mechanism
						or criteria for Exceptional Cases, please contact our
						Legal and Compliance Department at support@fyp.fans.
					</TermsText>
				</View>
				<View style={tw.style("mb-10")}>
					<TermsText variant="subtitle" marginBottom={20}>
						When does FYP.Fans process payments?
					</TermsText>
					<TermsText>
						The processing time for your payment is contingent on
						the billing schedule chosen by the creator. Here are the
						expected billing dates and times for our various billing
						options:
						{"\n\n"}- Subscription billing | Your renewal payment is
						processed on your join date in UTC. Be aware that
						charges might occur up to 24 hours earlier due to time
						zone variations.{"\n"}- Pay per creation: Single
						payments and tips are processed immediately upon
						transaction.
					</TermsText>
				</View>
			</ScrollView>
		</View>
	);
};

export default ReturnsPolicyScreen;
