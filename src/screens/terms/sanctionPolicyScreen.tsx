import { View, ScrollView } from "react-native";
import React from "react";
import tw from "@lib/tailwind";

import { TermsText } from "@components/terms";

const SanctionPolicyScreen = () => {
	return (
		<View style={[tw.style("flex-1 bg-white")]}>
			<ScrollView style={tw.style("flex-1  px-4.5 pt-6")}>
				<View style={tw.style("mb-10")}>
					<TermsText variant="title" marginBottom={20}>
						FYP.Fans Sanctions Compliance Policy
					</TermsText>
					<TermsText>Last updated: August 20th, 2023</TermsText>
				</View>

				<View style={tw.style("mb-10")}>
					<TermsText variant="title" marginBottom={20}>
						Introduction
					</TermsText>
					<TermsText>
						As a U.S.-based organization with a global footprint,
						FYP.Fans is obligated to adhere to international trade
						laws and economic sanctions, including those enforced by
						the U.S. Department of the Treasury's Office of Foreign
						Assets Control (OFAC). This policy outlines our
						commitment to ensuring that FYP.Fans does not engage in
						transactions with restricted or sanctioned parties,
						locations, or items, as identified by regulatory bodies
						like OFAC.
					</TermsText>
				</View>
				<View style={tw.style("mb-10")}>
					<TermsText variant="title" marginBottom={20}>
						Applicability
					</TermsText>
					<TermsText>
						This policy is applicable to all users, irrespective of
						their geographical location.
						{"\n\n"}
						When registering or updating your FYP.Fans account, you
						are required to furnish accurate and truthful
						information about your identity and country of
						residence. Failure to do so may lead to the deactivation
						of your account.
					</TermsText>
				</View>
				<View style={tw.style("mb-10")}>
					<TermsText variant="title" marginBottom={20}>
						Compliance Measures
					</TermsText>
					<TermsText>
						FYP.Fans is committed to complying with the economic
						sanctions and trade restrictions of every country in
						which we operate. Such restrictions typically forbid
						transactions that involve:
						{"\n\n"}- Specific regions, including but not limited to
						Crimea, Cuba, Iran, North Korea, Syria, Donetsk People’s
						Republic, and Luhansk People’s Republic, or any
						individuals or entities situated in these areas.{"\n"}-
						Parties listed on sanctions registries such as OFAC’s
						Specially Designated Nationals (SDN) List or Foreign
						Sanctions Evaders (FSE) List.
						{"\n\n"}
						To safeguard our community, we employ various strategies
						to ensure compliance, including:
						{"\n\n"}- Restricting access to FYP.Fans from sanctioned
						territories.{"\n"}- Generally disallowing creators from
						offering perks or benefits that originate from
						restricted areas.{"\n"}- Potentially requiring
						additional information from you or requesting that you
						undertake specific actions to assist us in fulfilling
						our compliance obligations.
						{"\n\n"}
						If we suspect that you are accessing your account from a
						restricted area or are in breach of any trade
						restriction or economic sanction, we reserve the right
						to suspend, terminate, or take other appropriate actions
						concerning your account.
						{"\n\n"}
						You are also forbidden from utilizing FYP.Fans for the
						advantage of any individual, entity, or organization
						listed on a sanctions registry.
					</TermsText>
				</View>
				<View style={tw.style("mb-10")}>
					<TermsText variant="title" marginBottom={20}>
						Additional Considerations
					</TermsText>
					<TermsText>
						Other nations may impose their own trade restrictions,
						and certain goods may be prohibited from export or
						import under international laws. It is your
						responsibility to be aware of these laws when engaging
						in international transactions. For legal guidance,
						consult a qualified expert.
						{"\n\n"}
						Our financial partners, including PayPal, Stripe Visa,
						and Mastercard, may have their own sanctions compliance
						programs and may block transactions in accordance with
						those programs. FYP.Fans has no influence over the
						independent decisions made by these providers.
					</TermsText>
				</View>
				<View style={tw.style("mb-10")}>
					<TermsText variant="title" marginBottom={20}>
						Updates and Amendments
					</TermsText>
					<TermsText>
						Trade laws and economic sanctions are subject to
						frequent updates, which may affect our ability to
						collaborate with you or impose further limitations on
						the benefits that can be offered.
					</TermsText>
				</View>
				<View style={tw.style("mb-10")}>
					<TermsText variant="title" marginBottom={20}>
						Additional Resources:
					</TermsText>
					<TermsText>
						- U.S. Department of the Treasury{"\n"}- Bureau of
						Industry and Security at the U.S. Department of Commerce
						{"\n"}- U.S. Department of State{"\n"}- European
						Commission
					</TermsText>
				</View>
			</ScrollView>
		</View>
	);
};

export default SanctionPolicyScreen;
