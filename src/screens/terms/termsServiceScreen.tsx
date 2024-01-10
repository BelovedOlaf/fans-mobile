import { View, ScrollView } from "react-native";
import React from "react";
import tw from "@lib/tailwind";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { openBrowserAsync } from "expo-web-browser";

import { TermsText } from "@components/terms";
import { TermsNavigationStacks } from "@usertypes/navigations";

const TermsServiceScreen = (
	props: NativeStackScreenProps<TermsNavigationStacks, "Terms">,
) => {
	const { navigation } = props;

	const handleNavigate = (pathname: string) => {
		// navigation.navigate(pathname);
	};

	const onGoToCommunity = () => {
		navigation.navigate("Community");
	};

	const onGoToBenefits = () => {
		navigation.navigate("Benefits");
	};

	const onGoToSecurity = () => {
		navigation.navigate("Security");
	};

	const onGoToSanction = () => {
		navigation.navigate("Sanction");
	};

	const onGoToCookie = () => {
		navigation.navigate("Cookies");
	};

	const onGoToDataAgreement = () => {
		navigation.navigate("DataAgreement");
	};

	const onGoToFees = () => {
		navigation.navigate("Fees");
	};

	const onGoToReturns = () => {
		navigation.navigate("Returns");
	};

	const onGoToPrivacy = () => {
		openBrowserAsync(
			"https://app.termly.io/document/privacy-policy/8234c269-74cc-48b6-9adb-be080aaaee11",
		);
	};

	const onGoToTerms = () => {
		navigation.navigate("Terms");
	};

	return (
		<View style={[tw.style("flex-1 bg-white")]}>
			<ScrollView style={tw.style("flex-1  px-4.5 pt-6")}>
				<View style={tw.style("mb-10")}>
					<TermsText variant="title">Terms of Use</TermsText>
					<TermsText>
						Last updated: August 20th, 2023{"\n\n"}
						FYP.Fans is a membership platform created to connect
						fans with the best content creators in the world. Our
						ultimate goal is to get out of the way and empower
						creators to have a voice so that they can communicate
						directly with their fans. These Terms of Service (
						<TermsText onPress={onGoToTerms} variant="link">
							TOS
						</TermsText>
						) represent our best attempt to do that. But, for
						everyone’s protection, it is important for you and for
						us to understand the rules that will help us create a
						safe and meaningful environment. You are an important
						part of this community. We have worked hard to make our{" "}
						<TermsText onPress={onGoToTerms} variant="link">
							TOS
						</TermsText>{" "}
						easy to read and understandable. Please review,
						understand and stick to the terms and enjoy everything
						about your experience on FYP.Fans.
						{"\n"}
						{"\n"}
						{"\u2022 Welcome"}
						{"\n"}
						{"\u2022 Your account"}
						{"\n"}
						{"\u2022 Abusive conduct"}
						{"\n"}
						{"\u2022 YOU are the creator"}
						{"\n"}
						{"\u2022 It is YOUR creator page"}
						{"\n"}
						{"\u2022 Getting paid"}
						{"\n"}
						{"\u2022 Fees"}
						{"\n"}
						{"\u2022 Tax Obligations"}
						{"\n"}
						{"\u2022 Restrictions"}
						{"\n"}
						{"\u2022 Fans are …"}
						{"\n"}
						{"\u2022 Doing our part at FYP.Fans"}
						{"\n"}
						{"\u2022 Account deletion"}
						{"\n"}
						{"\u2022 They’re YOUR creations, you own them"}
						{"\n"}
						{"\u2022 Third-party apps and services"}
						{"\n"}
						{"\u2022 Our creations"}
						{"\n"}
						{"\u2022 Indemnity"}
						{"\n"}
						{"\u2022 Warranty disclaimer"}
						{"\n"}
						{"\u2022 Limitation of liability"}
						{"\n"}
						{"\u2022 Dispute resolution"}
						{"\n"}
						{"\u2022 That’s it …"}
					</TermsText>
				</View>

				<View style={tw.style("mb-10")}>
					<TermsText variant="title" marginBottom={20}>
						Welcome!
					</TermsText>
					<TermsText>
						By using FYP.Fans you agree to these Terms of Service (
						<TermsText onPress={onGoToTerms} variant="link">
							TOS
						</TermsText>
						) which apply to all users of the FYP.Fans platform and
						any other services we provide to you. When we use the
						terms “we,” “us,” or “our,” we are referring to the
						company FYP.Fans, LLC and “FYP.Fans” refers to our
						platform. When you use FYP.Fans, you agree to all of our
						posted policies including these{" "}
						<TermsText onPress={onGoToTerms} variant="link">
							TOS
						</TermsText>
						, our{" "}
						<TermsText onPress={onGoToPrivacy} variant="link">
							PRIVACY POLICY
						</TermsText>
						, our{" "}
						<TermsText onPress={onGoToCookie} variant="link">
							DATA AND COOKIE
						</TermsText>
						, our{" "}
						<TermsText onPress={onGoToBenefits} variant="link">
							BENEFIT GUIDELINES
						</TermsText>{" "}
						as well as our{" "}
						<TermsText onPress={onGoToCommunity} variant="link">
							COMMUNITY GUIDELINES
						</TermsText>
						. Please read and understand these policies and
						guidelines prior to using the FYP.Fans platform. If you
						violate the rules, we may terminate or restrict your
						account.
					</TermsText>
				</View>

				<View style={tw.style("mb-10")}>
					<TermsText variant="title" marginBottom={20}>
						Your account
					</TermsText>
					<TermsText>
						You are responsible for your own account, including the
						security of the account and anything that happens when
						anyone is signed onto your account. All information that
						you provide to us must be accurate, in good faith and
						updated if anything changes. You must be 18 years old to
						use FYP.Fans and you must be old enough to consent to
						the processing of your data in your country and
						jurisdiction. It is important for all of us that you
						know and follow all laws and regulations in your area.
						{"\n"}
						{"\n"}
						Immediately{" "}
						<TermsText
							onPress={() => handleNavigate("")}
							variant="link"
						>
							CONTACT US
						</TermsText>{" "}
						if you think that someone has compromised your account.
						Please see our full{" "}
						<TermsText onPress={onGoToSecurity} variant="link">
							SECURITY POLICY
						</TermsText>
						.
					</TermsText>
				</View>

				<View style={tw.style("mb-10")}>
					<TermsText variant="title" marginBottom={20}>
						Abusive Conduct
					</TermsText>
					<TermsText>
						Our policy is pretty simple here. You are responsible
						for all activity on your account. We ask you to be
						responsible users and not to violate our policies,
						guidelines or terms of service. This is critical for us
						to create an environment that is safe and vibrant. If
						you violate any of the rules, we may terminate or
						restrict your account. So, please, don’t do anything
						abusive towards others, don’t use FYP.Fans for something
						other than its intended purpose and, of course, don’t do
						anything illegal. Creators and their fans are the
						primary focus of FYP.Fans. For that reason, our{" "}
						<TermsText onPress={onGoToCommunity} variant="link">
							COMMUNITY GUIDELINES
						</TermsText>{" "}
						and{" "}
						<TermsText onPress={onGoToSecurity} variant="link">
							SECURITY POLICY
						</TermsText>{" "}
						make it clear that we may take action to prevent any
						user from harming FYP.Fans or its community.
					</TermsText>
				</View>

				<View style={tw.style("mb-10")}>
					<TermsText variant="title" marginBottom={20}>
						YOU are the creator
					</TermsText>
					<TermsText>
						It is simple to become a creator on FYP.Fans. In a few
						clicks, you can engage with your fans using our
						industry-leading tools. We make it easy to do everything
						from content creation to payments to taxes. Make sure
						you read and understand all of the services, fees, and
						restrictions if you are a creator.{"\n\n"}
					</TermsText>
					<TermsText variant="subtitle">
						It Is YOUR creator page
					</TermsText>
					<TermsText>
						We have spent years developing what we believe to be the
						best creator experience in the industry. When you launch
						your creator page, you become a member of our community.
						But, we want you to know that we truly believe that
						FYP.Fans is about YOU and your fans. We work every day
						to make it easier for you to showcase your talents,
						engage with your fans and maximize your earnings.
					</TermsText>
				</View>

				<View style={tw.style("mb-10")}>
					<TermsText variant="title" marginBottom={20}>
						Getting Paid
					</TermsText>
					<TermsText>
						All recurring subscriptions or one-time payments made on
						FYP.Fans are automatically converted from your fan’s
						local currency, based on a currency conversion rate
						determined by our payment processors. We try to provide
						quick and timely access to the funds you earn on
						FYP.Fans, while at the same time balancing the need to
						handle fraud, chargebacks, payment disputes and the
						like. If issues arise, we try to reach out quickly and
						let you know why. But, if you have any questions, please{" "}
						<TermsText
							variant="link"
							onPress={() => handleNavigate("")}
						>
							CONTACT US
						</TermsText>
						. Violations of our terms or policies may require us to
						block or withhold access to funds, including for
						compliance reasons like collection of tax reporting
						information. If we believe payments from a fan to be
						fraudulent, we may block the payments for your and our
						protection. If activities like chargebacks and refunds
						create a negative balance in your account, we may
						recover those funds from future payments to you. If we
						detect potentially fraudulent behavior on your account,
						at our sole discretion, we can freeze funds and will
						manually review your activity. Responsible Creators and
						safe communities: You need to obtain all necessary
						consents and legal rights to all content on your creator
						page (One example is music rights). As you know,
						FYP.Fans is an 18+ platform. We rely on you to ensure
						that any and all persons included in your content meet
						our published terms and policies. Creators MUST tag all
						persons appearing in their videos and ensure they are
						either verified or upload a consent form. You agree to
						promptly provide any verifications or information we may
						request in this or any other regard.
					</TermsText>
				</View>

				<View style={tw.style("mb-10")}>
					<TermsText variant="title" marginBottom={20}>
						Fees
					</TermsText>
					<TermsText>
						We work hard to make FYP.Fans fees some of the lowest in
						the industry. Our mission is to empower you as creators
						and your fans as fans. That being said, the low fees we
						do charge make it possible for us to deliver on our
						mission of empowering creators and their fans. Our most
						recent fee schedule can be found on our{" "}
						<TermsText variant="link" onPress={onGoToFees}>
							FEE SCHEDULE
						</TermsText>{" "}
						page. Fees may vary and may need to increase over time,
						with notice to you as a creator. The following is a
						quick summary of the fees we charge:
						{"\n\n"}
						Platform fee: A flat fee and/or percentage of
						successfully processed payments taken from the creator;
						{"\n\n"}
						Payment processing fee: a percentage of successfully
						processed payments (may vary with different payment
						processors) and a flat fee per successfully processed
						Payment taken from the fan. This fee is related to the
						cost of processing one-time and recurring payments from
						fans, recovering chargebacks and ensuring fraud
						prevention;
						{"\n\n"}
						Feature-specific fees: for use of certain FYP.Fans
						features and may include a percentage of successfully
						processed payments and/or a flat fee;
						{"\n\n"}
						Payout fee: for transferring money earned on FYP.Fans to
						your specified payout method (may vary for different
						payment methods); and Currency conversion fee: a
						percentage of successfully processed payments made in a
						currency other than your selected payout currency.
						{"\n\n"}
						All membership subscription and other fees can be seen
						on your{" "}
						<TermsText variant="link">
							CREATOR ANALYTICS
						</TermsText>{" "}
						(not including payout fee). “Founding creators” may have
						a legacy fee structure that is different (so long as
						they have continued to adhere to our terms and policies
						and the terms of the founding creator promotion). We may
						discontinue or change the fees of founding creators at
						ANY TIME. Any foreign transaction fees that financial
						institutions charge us to change currencies will be
						deducted from creator payments prior to payout. We do
						not receive any participation in foreign transaction
						fees.
					</TermsText>
				</View>

				<View style={tw.style("mb-10")}>
					<TermsText variant="title" marginBottom={20}>
						Tax Obligations
					</TermsText>
					<TermsText>
						To satisfy FYP.Fans’ tax obligations, we collect tax
						identification information and, when required, report
						necessary information to tax authorities. If you are in
						the US, for example, and you earn more than 600 US
						dollars, we will issue you a 1099-K form before taxes
						are due. We treat all creator income as “Goods or
						Services.” Of course, you are responsible for reporting
						any income that you make on FYP.Fans to the appropriate
						tax authorities, paying any relevant taxes and complying
						with the tax laws of your jurisdiction.{"\n"} There are
						a number of other taxes around the world that we are
						responsible for paying, including what is called the VAT
						tax (referred to as the Value Added Tax or Goods and
						Services Tax). Any tax collected will be reflected at
						payout for creators and at checkout for fans. Creators
						need to use a good faith effort to select which benefit
						category they assign to memberships, offers, etc. to
						assist us in complying with applicable tax laws. You
						agree to provide accurate information when using
						FYP.Fans tools and to provide us with any additional
						documentation that we request for tax compliance
						purposes.
					</TermsText>
				</View>

				<View style={tw.style("mb-10")}>
					<TermsText variant="title" marginBottom={20}>
						Restrictions
					</TermsText>
					<TermsText>
						Creations and benefits are not allowed that violate our
						terms and policies. You can find more details in our{" "}
						<TermsText variant="link" onPress={onGoToCommunity}>
							COMMUNITY GUIDELINES
						</TermsText>{" "}
						and{" "}
						<TermsText variant="link" onPress={onGoToBenefits}>
							BENEFIT GUIDELINES
						</TermsText>
						, but some of the things we restrict are: {"\n"}
						{"\u2022 Anything illegal;"}
						{"\n"}
						{"\u2022 Anything abusive towards other people;"}
						{"\n"}
						{"\u2022 Anything misleading or deceptive;"}
						{"\n"}
						{
							"\u2022 Anything that uses intellectual property that is not your own without written permission or fair use protection;"
						}
						{"\n"}
						{
							"\u2022 Any content where people are paying actors to engage in content or sexual acts. And anything bordering on extreme graphical content. See more here"
						}
						{"\n"}
						{"\u2022"}
						All explicit material needs to be handled with great
						care. FYP.Fans is an 18+ platform, but all creators
						should be vigilant to keep materials from reaching
						audiences that are not appropriate for their content. We
						are not required to allow anyone to access any offering
						on FYP.Fans.
						{"\n"}
						{"\n"}
						Creators agree to our{" "}
						<TermsText variant="link" onPress={onGoToDataAgreement}>
							DATA AGREEMENT
						</TermsText>{" "}
						and are responsible for keeping FYP.Fans data safe. Your
						FYP.Fans account is yours and yours only. It cannot be
						sold or transferred to another creator. We may enable,
						disable, add, remove or test any features, promotions or
						elements without restriction or limitation and at our
						sole discretion, including offerings to any subset of
						creators or fans. These features, promotions or elements
						may be subject to additional restrictions and
						limitations.
					</TermsText>
				</View>

				<View style={tw.style("mb-10")}>
					<TermsText variant="title" marginBottom={20}>
						Fans are…
					</TermsText>
					<TermsText>
						people who use our tools to engage with creators, help
						build communities, receive benefits and subscribe to or
						make purchases on FYP.Fans. We work hard every day to
						create the best creator/fan engagement in the industry.
						Fans support the work of creators they love through
						one-time payments or auto-renewal subscriptions.
						FYP.Fans, LLC is the entity you will see associated with
						any charges. To become a Fan, all you need to do is
						support a creator by purchasing a subscription or other
						offering. You can review all details of the offering
						before you purchase it and see ACTIVE SUBSCRIPTIONS and
						BILLING HISTORY in your account. The details of each
						subscription or offer will depend on the creator you
						support and the offer(s) you choose.{"\n"}
						Subject to all FYP.Fans terms and policies and the
						payment of all applicable charges, subscriptions or
						offerings may include access to one or more of a
						creator’s creations. What you receive is a limited,
						non-transferable, non-exclusive, non-sublicensable
						license to view the creations for your own personal and
						private use, You cannot use any of these creations for
						commercial, promotional or any other kind of non-private
						use. Creations may stop being available at any time.
						Creators may offer a number of types of automatically
						renewing subscription options on FYP.Fans in addition to
						one-time purchases. Subscription options may include a
						monthly and yearly subscription and/or a
						pay-per-creation posted by the creator option. Creators
						decide what options to offer and may change those
						options at any time. Subscriptions automatically renew
						until you cancel via{" "}
						<TermsText variant="link">SUBSCRIPTION PAGE</TermsText>.
						After any free trials offered to you by the creator, you
						will be charged automatically at the beginning of each
						period (12am Eastern Standard Time) if you do not cancel
						through{" "}
						<TermsText variant="link">SUBSCRIPTION PAGE</TermsText>{" "}
						prior to the trial period or subscription period ending.
						Make sure to pay attention to time zone differences and
						monthly calendar differences. Subscription amounts may
						change with notice to you. This allows creators to grow
						their offerings, address cost increases, etc. FYP.Fans
						does not control currency exchange rates or applicable
						taxes. These may be increased without notice to you. You
						are responsible for keeping your location information
						correct and up-to-date on FYP.Fans for tax and other
						regulatory purposes. If you are in a country or
						jurisdiction that requires us to charge, VAT or other
						sales tax, we will add the tax at check-out.
						{"\n"}
						{"\n"}
						You are free to cancel your membership at any time or
						your free trial prior to the time and date of your first
						charge. No charge will be incurred if free trials are
						canceled prior to the end of the free trial period.
						Canceling monthly, yearly or other memberships will
						impact your next recurring charge, but will not generate
						a refund of any kind. Lowering the tier of monthly
						subscriptions will impact your next recurring charge,
						but will not generate a refund of any kind. Yearly
						subscription tiers can not be decreased, but can be
						increased (and will take effect in the current payment
						term). When you upgrade during a payment period, you may
						be credited for the amount you have already paid. Be
						aware that canceling your membership or lowering your
						tier of support may result in a loss of benefits,
						including creator posts and subscription benefits.{"\n"}
						Other things that may cause you to lose access to the
						offerings and membership subscriptions you have
						purchased include a failure of your payment method, our
						termination of your account, a creator or us blocking
						you, a creator deleting their account or no longer
						making offerings or subscriptions, a creator or us
						changing who has access to an offering or membership, a
						creator or us removing an offering or post from their
						account and us removing a creator from FYP.Fans, We are
						not required to allow you access to or interaction with
						anything on FYP.Fans, including any particular
						creator(s), offering(s) or benefit(s). Membership
						offerings and subscriptions vary and we have limited
						control over the specific benefits and quality of
						offerings by creators. We cannot guarantee the identity
						of creators or the validity of any claims they make.
						Please{" "}
						<TermsText variant="link" onPress={onGoToReturns}>
							REPORT
						</TermsText>{" "}
						suspicious creator pages to help protect our
						communities.{"\n"}
						You are responsible for knowing what fees you may be
						charged by your financial institution(s) for currency
						exchanges, foreign transaction fees, etc. We have no
						control over any of those fees and do not receive any
						participation in those fees, but our choice of payment
						processing may impact or give rise to the fee(s).{"\n"}
						We may enable, disable, add, remove or test any
						features, promotions or elements without restriction or
						limitation and at our sole discretion, including
						offerings to any subset of creators or fans. These
						features, promotions or elements may be subject to
						additional restrictions and limitations.{"\n"}
						Refund Policy. Our policy is not to provide refunds.
						Reach out to creators to request a refund, they can
						refund transactions at their sole discretion. This
						policy includes if you lose access to offerings and/or
						membership subscription benefits as described in our
						terms and policies. Any exceptions will be rare and made
						at our sole discretion. To request a refund{" "}
						<TermsText variant="link">CONTACT US</TermsText>.
					</TermsText>
				</View>

				<View style={tw.style("mb-10")}>
					<TermsText variant="title" marginBottom={20}>
						Doing Our Part at FYP.Fans
					</TermsText>
					<TermsText>
						FYP.Fans is all about empowering creators and fans with
						what we believe to be the best tools of engagement in
						the industry. We try to stay out of the way as much as
						possible, but we take our role seriously and reserve the
						right to enforce our terms and policies, at our sole
						discretion, by restricting or removing content, access
						to content or services, including removing creators or
						fans from our platform and/or services. Some
						investigations may take time to resolve and may involve
						looking at things outside of FYP.Fans in order to comply
						with regulations and internal risk assessments. We are
						all working together to build this healthy community, so
						please let us know if you see any potential violations
						of our{" "}
						<TermsText variant="link" onPress={onGoToCommunity}>
							COMMUNITY GUIDELINES
						</TermsText>
						.{"\n"}
						United States-based companies doing business globally
						like FYP.Fans, LLC must comply with trade restrictions
						and economic sanctions, including those published by the
						Office of Foreign Assets Control (OFAC). Our sanctions
						policy can be accessed{" "}
						<TermsText variant="link" onPress={onGoToSanction}>
							HERE
						</TermsText>
						. We are not allowed to participate in transactions with
						the people, places or items that originate from those
						places.
					</TermsText>
				</View>

				<View style={tw.style("mb-10")}>
					<TermsText variant="title" marginBottom={20}>
						Account deletion
					</TermsText>
					<TermsText>
						At any time you can permanently delete your account in
						your settings or{" "}
						<TermsText variant="link">CONTACT US</TermsText>. You
						may not bring a claim against us for any actions we take
						to restrict or terminate your account or any other
						person’s account. If you try to bring such a claim, you
						are responsible for all damages caused, including
						attorney’s fees and costs. These terms remain in effect
						even after you no long have an account with FYP.Fans.
					</TermsText>
				</View>

				<View style={tw.style("mb-10")}>
					<TermsText variant="title" marginBottom={20}>
						They’re YOUR creations … you own them
					</TermsText>
					<TermsText>
						Creators keep full ownership of their creations and fans
						keep full ownership of everything they post on FYP.Fans,
						but we cannot help creators make money and fans connect
						with their favorite creators without having a license to
						do all of that. So … when you make creations available
						or post on FYP.Fans, you grant us a non- exclusive,
						royalty-free, irrevocable, perpetual, sublicensable,
						worldwide license covering your creation or post in all
						formats and channels now known or later developed
						anywhere in the world to use, copy, reproduce, store,
						translate, transmit, distribute, perform, prepare
						derivative works, publicly display, and display in
						connection with any name, username, voice, or likeness
						provided in connection with it. If your creations
						contain any personal data, you also recognize our
						“legitimate interest” in it in accordance with the scope
						of this license.{"\n"}
						Fans may not use creations or posts by creators in any
						way not authorized by the creator, including sharing
						those creations with others who have not purchased the
						offering or subscription in order to have access to
						those creations or posts.
					</TermsText>
				</View>

				<View style={tw.style("mb-10")}>
					<TermsText variant="title" marginBottom={20}>
						Third-party apps and services
					</TermsText>
					<TermsText>
						When you connect your FYP.Fans account to other apps,
						websites or services they may ask you for access to your
						FYP.Fans account and/or ask for permission to perform
						actions within your FYP.Fans account on your behalf. If
						you choose to give any or all of those permissions, we
						will follow your lead and grant the access and/or
						permissions you have selected. More information may be
						available in our{" "}
						<TermsText onPress={onGoToPrivacy} variant="link">
							PRIVACY POLICY
						</TermsText>
						.
					</TermsText>
				</View>

				<View style={tw.style("mb-10")}>
					<TermsText variant="title" marginBottom={20}>
						Our creations
					</TermsText>
					<TermsText>
						All FYP.Fans creations are protected by copyright,
						trademark, patent, and trade secret laws. We authorize
						creators a license to use our logo, website materials,
						etc. to promote their FYP.Fans pages. We love to get
						your feedback on our products, beta tests, etc., but any
						such input or suggestions will be fully owned by
						FYP.Fans.
					</TermsText>
				</View>

				<View style={tw.style("mb-10")}>
					<TermsText variant="title" marginBottom={20}>
						Indemnity
					</TermsText>
					<TermsText>
						If we are sued because of your use of our products or
						services, you will indemnify us for all losses and
						liabilities, including attorney’s fees, arising from
						your use of our platform or services. We will retain
						exclusive control over the defense of any such claims.
						You agree that you will help us in any such defense.
						Your indemnity obligation in this clause extends to all
						of our subsidiaries, affiliates, officers, directors,
						employees, agents and third-party providers.
					</TermsText>
				</View>

				<View style={tw.style("mb-10")}>
					<TermsText variant="title" marginBottom={20}>
						Warranty Disclaimer
					</TermsText>
					<TermsText>
						FYP.Fans and its services are provided “as is” with any
						warranty of any kind. Any and all warranties, whether
						express or implied are excluded and disclaimed to the
						fullest extent permitted by law, including, any warranty
						of merchantability, fitness for a particular purpose and
						warranty of non-infringement. This warranty disclaimer
						clause applies to our affiliates, subsidiaries and
						third-party providers.
					</TermsText>
				</View>

				<View style={tw.style("mb-10")}>
					<TermsText variant="title" marginBottom={20}>
						Limitation of liability
					</TermsText>
					<TermsText>
						To the greatest extent permitted by law, we are not
						liable to you for any incidental, consequential, or
						punitive damages arising out of these terms, or your use
						or attempted use of FYP.Fans. To the greatest extent
						permitted by law, our liability for damages is limited
						to the amount of money we have earned through your use
						of FYP.Fans. We are specifically not liable for loss
						associated with unfulfilled offerings and benefits and
						from losses caused by conflicting contractual
						agreements. The limitation of liability in this clause
						also applies to our subsidiaries, affiliates, officers,
						directors, employees, agents, and third-party service
						providers.
					</TermsText>
				</View>

				<View style={tw.style("mb-10")}>
					<TermsText variant="title" marginBottom={20}>
						Dispute resolution
					</TermsText>
					<TermsText>
						The best way to resolve any issue is to reach out to us.
						But, if a dispute arise between, it be resolved in state
						or federal court in Cheyenne, Wyoming. Both parties
						consent to exclusive jurisdiction in Cheyenne under the
						laws of Wyoming, excluding any conflict of laws and
						venue provisions to the contrary. This clause governs
						these{" "}
						<TermsText onPress={onGoToTerms} variant="link">
							TOS
						</TermsText>
						, all other FYP.Fans policies as well as any dispute
						that arises between you and us.
					</TermsText>
				</View>

				<View style={tw.style("mb-10")}>
					<TermsText variant="title" marginBottom={20}>
						Communications from us
					</TermsText>
					<TermsText>
						If you sign-up for text messages from us, you agree to
						receive promotional and marketing texts from us,
						including automated telephone dialing systems. Message
						and data rates may apply and we do not condition any
						purchase on your signing up for text message. We may
						alter the frequency of messages or short code or phone
						number(s) from which texts are sent at any time. We, our
						service providers and the mobile carriers supported by
						the program are not liable for delayed or undelivered
						messages.
					</TermsText>
				</View>

				<View style={tw.style("mb-10")}>
					<TermsText variant="title" marginBottom={20}>
						That’s it
					</TermsText>
					<TermsText>
						These terms and any referenced policies are the entire
						agreement between you and us, they replace and supersede
						all prior agreements, they do not create any
						partnership, joint venture, employee-employer or
						franchiser-franchisee relationship between you and us.
						If any provision of these terms is held to be
						unenforceable, then that provision is modified to the
						extent necessary to enforce it. If a provision cannot be
						modified to make it enforceable, then it is severed from
						these terms, and all other provisions remain in force.
						If either party fails to enforce a right provided by
						these terms, then it does not waive the ability to
						enforce any rights in the future. We may make changes
						from time-to-time to these terms. If we make a change
						that we determine, in our sole discretion, is material,
						then we will let you know before the changes come into
						effect. Continuing to use FYP.Fans after a change means
						you accept the new terms or policies. The street address
						of FYP.Fans is 1113 W Plum St APT B302, Fort Collins, CO
						80521
					</TermsText>
				</View>
			</ScrollView>
		</View>
	);
};

export default TermsServiceScreen;
