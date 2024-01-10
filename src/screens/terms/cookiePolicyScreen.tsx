import { View, ScrollView } from "react-native";
import React from "react";
import tw from "@lib/tailwind";

import { TermsText } from "@components/terms";

const CookiePolicyScreen = () => {
	return (
		<View style={[tw.style("flex-1 bg-white")]}>
			<ScrollView style={tw.style("flex-1  px-4.5 pt-6")}>
				<View style={tw.style("mb-10")}>
					<TermsText variant="title" marginBottom={20}>
						FYP.Fans Cookie Policy
					</TermsText>
					<TermsText marginBottom={20}>
						Last updated: August 20th, 2023
					</TermsText>
					<TermsText variant="subtitle" marginBottom={20}>
						Introduction
					</TermsText>
					<TermsText marginBottom={20}>
						Welcome to FYP.Fans! Our Cookie Policy aims to elucidate
						how we employ cookies and similar tracking technologies
						to offer you an optimized service. While cookies are not
						essential for our website to function, they
						significantly enhance your browsing experience. If you
						opt to disable or delete these cookies, some
						functionalities of our platform may not operate as
						expected. Rest assured, cookies are not utilized to
						personally identify you and are only employed for the
						purposes outlined herein.
					</TermsText>

					<TermsText variant="subtitle" marginBottom={20}>
						Types of Cookies We Use
					</TermsText>
					<TermsText>
						- Session Cookies: These cookies are indispensable for
						ensuring the seamless operation of FYP.Fans. They play a
						crucial role in user authentication and maintaining the
						overall security of the platform.
						{"\n\n"}- Google Analytics: These cookies collect data
						on user interactions with our website, aiding us in
						continually refining and improving our services.
					</TermsText>
				</View>

				<View style={tw.style("")}>
					<TermsText variant="title" marginBottom={20}>
						Why We Use Cookies:
					</TermsText>
					<View style={tw.style("mb-7.5")}>
						<TermsText variant="subtitle" marginBottom={20}>
							Security and Authentication
						</TermsText>
						<TermsText>
							Some cookies are essential for safeguarding the
							integrity of FYP.Fans. They assist in user
							authentication, secure login, and remember
							permissions and consents you've granted, thereby
							ensuring secure transaction processes.
						</TermsText>
					</View>
					<View style={tw.style("mb-7.5")}>
						<TermsText variant="subtitle" marginBottom={20}>
							Performance, Analytics, and Research
						</TermsText>
						<TermsText>
							We employ certain technologies to gather performance
							metrics on how FYP.Fans is functioning. This data,
							which includes site functionality, speed, and user
							engagement, is invaluable for enhancing our platform
							and services. It also aids in identifying and
							resolving bugs.
						</TermsText>
					</View>
					<View style={tw.style("mb-7.5")}>
						<TermsText variant="subtitle" marginBottom={20}>
							Preferences and Localization
						</TermsText>
						<TermsText>
							Cookies are instrumental in customizing your
							experience on our platform. They remember your
							settings and views, and can even provide a localized
							experience by displaying the website in your
							preferred language.
						</TermsText>
					</View>
					<View style={tw.style("mb-7.5")}>
						<TermsText variant="subtitle" marginBottom={20}>
							Social Networks and Marketing
						</TermsText>
						<TermsText>
							Some cookies facilitate your interaction with social
							networks you're logged into while using FYP.Fans.
							These cookies are governed by the respective social
							networks' privacy policies and may include features
							like social login.
						</TermsText>
					</View>
					<View style={tw.style("mb-7.5")}>
						<TermsText variant="subtitle" marginBottom={20}>
							"Do-Not-Track" Technologies
						</TermsText>
						<TermsText>
							We do not currently respond to web browser
							"Do-Not-Track" signals.
						</TermsText>
					</View>
					<View style={tw.style("mb-7.5")}>
						<TermsText variant="subtitle" marginBottom={20}>
							Managing Cookies
						</TermsText>
						<TermsText>
							You have the ability to manage cookies at the
							individual browser level. Should you choose to
							reject or delete cookies, please note that our
							services may not function as intended. For guidance
							on modifying your browser's cookie settings, please
							consult your browser's help menu.
						</TermsText>
					</View>
					<View style={tw.style("mb-7.5")}>
						<TermsText variant="subtitle" marginBottom={20}>
							Changes to This Cookie Policy
						</TermsText>
						<TermsText>
							We may periodically revise this Cookie Policy to
							reflect changes in legal or operational
							requirements, to describe new cookies and tracking
							technologies, and to update how these changes impact
							our use of your information. Material changes will
							be communicated through a prominent notice on our
							website.
						</TermsText>
					</View>
					<View style={tw.style("mb-7.5")}>
						<TermsText variant="subtitle" marginBottom={20}>
							Compliance and Contact
						</TermsText>
						<TermsText>
							This Cookie Policy is in accordance with GDPR, CCPA,
							and other relevant data protection laws. It forms
							part of FYP.Fans' Terms of Use and Privacy Policy.
							For further information, please contact us at
							support@fyp.fans.
						</TermsText>
					</View>
				</View>
			</ScrollView>
		</View>
	);
};

export default CookiePolicyScreen;
