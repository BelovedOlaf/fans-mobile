import { View, ScrollView } from "react-native";
import React from "react";
import tw from "@lib/tailwind";

import { TermsText } from "@components/terms";

const SecurityPolicyScreen = () => {
	return (
		<View style={[tw.style("flex-1 bg-white")]}>
			<ScrollView style={tw.style("flex-1  px-4.5 pt-6")}>
				<View style={tw.style("mb-10")}>
					<TermsText variant="title" marginBottom={20}>
						FYP.Fans Security Policy
					</TermsText>
					<TermsText>Last updated: August 20th, 2023</TermsText>
				</View>
				<View style={tw.style("mb-10")}>
					<TermsText variant="title" marginBottom={20}>
						Our Commitment to Security
					</TermsText>
					<TermsText>
						At FYP.Fans, we prioritize the security of your data. We
						never have access to your complete credit card
						information and employ transport layer security (TLS) to
						encrypt sensitive data such as tax records. Our website
						is also PCI DSS 3.2 compliant to further protect your
						security. We also implement advanced security features
						like two-factor authentication, CAPTCHA verification for
						suspicious activities, and IP address monitoring. We
						freeze accounts that have potential high-risk patterns
						of Fraud or Chargebacks with advanced rate-limiting
						systems. All traffic between you and FYP.Fans is
						encrypted using HTTPS.
					</TermsText>
				</View>
				<View style={tw.style("mb-10")}>
					<TermsText variant="title" marginBottom={20}>
						Your Role in Security
					</TermsText>
					<TermsText>
						As a creator or subscriber, you can contribute to the
						security of your account by selecting a robust, unique
						password and storing it in a secure password manager. If
						you have concerns about the security of your personal
						information, reach out to us at security@fyp.fans.
						Security experts and researchers who identify potential
						vulnerabilities in our platform are encouraged to
						responsibly disclose these issues through our bug bounty
						program. Send your detailed bug reports to
						security@fyp.fans.
					</TermsText>
				</View>
				<View style={tw.style("mb-10")}>
					<TermsText variant="title" marginBottom={20}>
						Unacceptable Behavior
					</TermsText>
					<TermsText>
						Engaging in activities that compromise the security of
						our platform and its users is strictly prohibited.
						Examples of such activities include:
						{"\n\n"}- Illegal Activities: Do not engage in or
						promote unlawful activities.
						{"\n\n"}- Misuse of Personal Information: Do not share
						or misuse others' personal information. Creators should
						only use subscriber information for FYP.Fans-related
						purposes.
						{"\n\n"}- Spamming: Do not send unsolicited
						advertisements or spam.
						{"\n\n"}- Malware Distribution: Do not use FYP.Fans to
						host or disseminate malicious software.
						{"\n\n"}- Service Disruption: Do not perform actions
						that degrade the user experience, such as brute force
						attacks or load testing.
						{"\n\n"}- Data Harvesting: Do not scrape or index
						information from FYP.Fans without prior authorization.
						If you believe your feature could be beneficial, consult
						us first.
						{"\n\n"}- Reverse Engineering: Unauthorized access to
						our codebase or reverse engineering of our platform is
						not allowed. If you wish to contribute to improving
						FYP.Fans' security, join our bug bounty program by
						emailing security@fyp.fans.
						{"\n\n"}- Account Hijacking: Do not attempt to gain
						unauthorized access to other users' accounts.
						{"\n\n"}- VPN Usage: Using VPNs to disguise your
						location for fraudulent activities is not allowed.
						{"\n\n"}
						Violation of these guidelines may result in the
						termination of your FYP.Fans account.
					</TermsText>
				</View>
			</ScrollView>
		</View>
	);
};

export default SecurityPolicyScreen;
