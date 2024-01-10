import { View, ScrollView } from "react-native";
import React from "react";
import tw from "@lib/tailwind";

import { TermsText } from "@components/terms";

const BenefitGuidelinesScreen = () => {
	return (
		<View style={[tw.style("flex-1 bg-white")]}>
			<ScrollView style={tw.style("flex-1  px-4.5 pt-6")}>
				<View style={tw.style("mb-10")}>
					<TermsText variant="title">
						How do we uphold these guidelines?
					</TermsText>
					<TermsText>
						We understand that the majority of creators are
						passionate about crafting unique content for their fans.
						However, there are specific benefits that are limited.
						In determining what qualifies as a benefit, our Trust
						and Integrity team conducts a comprehensive and
						context-aware assessment to ascertain what fans are
						contributing towards and the value they derive. It's
						also crucial for us to ensure that creators are not
						bypassing our guidelines by offering disallowed benefits
						outside of FYP.Fans that aren't disclosed on FYP.Fans.
						{"\n\n"}
						Consequently, the Trust and Integrity team evaluates a
						creator's complete digital footprint when examining
						benefit levels.
					</TermsText>
				</View>
				<View style={tw.style("mb-10")}>
					<TermsText variant="title" marginBottom={20}>
						Prohibited Content and Benefits:
					</TermsText>
					<TermsText>
						Legal boundaries can be intricate, given the diverse
						laws across various countries and regions. Consequently,
						our guidelines are crafted with a global perspective,
						rather than being solely based on your specific
						location. Below are certain benefits that are strictly
						forbidden on FYP.Fans. In certain instances, we will not
						only take action against the account but will also
						collaborate with legal authorities to trace the origin.
						In instances related to minors or acts of cruelty, we
						will work with legal authorities to pursue and address
						the matter to the fullest extent of the law. The
						following benefits are strictly prohibited:
						{"\n\n"}- Visual content that exploits minors or
						showcases child maltreatment.{"\n"}- Visual
						representations of cruelty towards humans or animals.
						{"\n"}- Visual depictions of extreme violence or gore
						without educational or documentary context.{"\n"}
						-Materials that support or glorify acts of terrorism or
						extremist ideologies.{"\n"}- Visual or textual content
						that promotes or glorifies sexual assault or
						non-consensual acts.{"\n"}- Content that promotes
						dangerous or harmful challenges that could lead to
						physical harm or death.{"\n"}
						{"\n"}
						For details on benefits that violate intellectual
						property rights, kindly refer to our Intellectual
						Property Rights Policy.
					</TermsText>
				</View>
				<View style={tw.style("mb-10")}>
					<TermsText variant="title" marginBottom={20}>
						Substances, Medications, and Health Supplements
					</TermsText>
					<TermsText>
						We recognize that many individuals wish to share their
						personal journeys, detailing challenges they've
						overcome, in hopes of supporting others in similar
						situations. While we encourage such sharing, we are
						committed to ensuring the safety and well-being of our
						community. Therefore, the following cannot be offered as
						benefits on FYP.Fans:
						{"\n\n"}- Any form of illicit substances or related
						equipment.{"\n"}- Incentives, including but not limited
						to coupons or gift cards, that contribute towards the
						purchase of drugs, medications, or supplements.{"\n"}-
						Over-the-counter medications or dietary supplements that
						promise outcomes like weight reduction, energy
						enhancement, or miraculous remedies.{"\n"}- Educational
						resources or literature suggesting they possess the
						solution to curing ailments.
						{"\n"}
						{"\n"}
						It's worth noting that FYP.Fans permits content that
						delves into or debates alternative medicine, provided it
						doesn't jeopardize the safety of individuals. It's a
						nuanced distinction, but there's a clear difference
						between "Scientific exploration of CBD oil's potential
						benefits for dementia" and "Curing cancer exclusively
						with Yoga." Our team diligently monitors content that
						might lean towards the latter.
					</TermsText>
				</View>
				<View style={tw.style("mb-10")}>
					<TermsText variant="title" marginBottom={20}>
						Misinformation and False Claims
					</TermsText>
					<TermsText>
						In our digital age, misinformation can spread rapidly
						and have real-world consequences. FYP.Fans expects its
						creators to uphold the principles of truth and accuracy.
						Benefits or content that spread misinformation,
						especially in sensitive areas like health, politics, or
						public safety, are not allowed. This includes, but is
						not limited to, false claims, conspiracy theories, or
						unverified rumors. Creators are encouraged to fact-check
						their content and provide sources where necessary. Any
						content found to be spreading misinformation will be
						subject to review and potential removal.
					</TermsText>
				</View>
				<View style={tw.style("mb-10")}>
					<TermsText variant="title" marginBottom={20}>
						Adult Content and Intimate Services
					</TermsText>
					<TermsText>
						FYP.Fans is open to content that includes nudity,
						provided creators adhere to both our Community
						Guidelines and these Benefit Guidelines. The distinction
						between creative expression and explicit content is
						further elaborated in our Community Guidelines. We
						recognize that creators may sometimes challenge societal
						norms, but FYP.Fans does not support the funding of
						explicit adult content or intimate services.
						Consequently, the following benefits are strictly
						prohibited:
						{"\n\n"}- Using FYP.Fans to grant access to explicit
						adult content, such as providing entry to a website or
						exclusive access to explicit creations, irrespective of
						the platform. Explicit content is characterized by real
						individuals partaking in sexual activities, like
						masturbation or sexual intercourse, captured on camera.
						{"\n"}- Offering items or experiences of a sexually
						stimulating or personal nature.{"\n"}- Utilizing
						FYP.Fans' payment infrastructure to support escort
						services.{"\n"}- Proposing erotic webcam interactions to
						your fans. This implies that we enforce a strict
						no-nudity rule for creators utilizing CrowdCast.{"\n"}-
						Adult content creators showcasing real individuals
						cannot provide benefits exclusive to a single fan, like
						a personalized video or audio recording, or a dedicated
						page. However, this doesn't restrict you from engaging
						fans in polls or involving them in your creative
						journey, as long as the benefits cater to a broader
						fanbase and align with our guidelines.
					</TermsText>
				</View>
				<View style={tw.style("mb-10")}>
					<TermsText variant="title" marginBottom={20}>
						Arms and Explosive Materials
					</TermsText>
					<TermsText>
						While FYP.Fans is open to content related to firearms
						and various armaments, our global reach necessitates
						certain limitations on the benefits creators can
						provide. The following are strictly not permissible as
						benefits on FYP.Fans:
						{"\n\n"}- Providing deadly weapons or ammo as rewards.
						{"\n"}- Distributing fireworks or similar explosive
						materials.{"\n"}- Incentives, including but not limited
						to discount vouchers or gift cards, that facilitate the
						acquisition of firearms or explosive substances.{"\n"}-
						Guides, walkthroughs, or demonstrations on the creation
						or alteration of weapons, including 3D printing
						blueprints, firearm production, and other hands-on (DIY)
						projects.{"\n"}- No auto auto-sears or any modifications
						to firearms.
					</TermsText>
				</View>
				<View style={tw.style("mb-10")}>
					<TermsText variant="title" marginBottom={20}>
						Hate Speech and Discrimination
					</TermsText>
					<TermsText>
						FYP.Fans is committed to fostering a diverse and
						inclusive community. We strictly prohibit content or
						benefits that promote hate speech, discrimination, or
						violence against individuals or groups based on
						attributes such as race, religion, ethnic origin, sexual
						orientation, disability, or gender. Creators must ensure
						that their content and benefits uphold the values of
						respect, tolerance, and understanding. Any content found
						to be promoting hate or discrimination will be subject
						to immediate review and potential removal.
					</TermsText>
				</View>
				<View style={tw.style("mb-10")}>
					<TermsText variant="title" marginBottom={20}>
						Intoxicants and Smoking
					</TermsText>
					<TermsText>
						FYP.Fans welcomes creators who wish to delve into the
						world of wine sampling, cocktail crafting, or even
						discussing cigars and the rich tapestry of tobacco's
						history. However, there are specific restrictions on the
						benefits you can provide. The following are not
						permissible:
						{"\n\n"}- Alcoholic beverages and smoking-related items,
						including but not limited to tobacco, cigars,
						vaporizers, e-cigarettes, and rolling papers.{"\n"}-
						Promotional offers, discount codes, or any incentives
						related to the purchase of alcoholic or smoking
						products.
						{"\n"}- Kits or equipment for homebrewing alcoholic
						drinks.{"\n"}
					</TermsText>
				</View>
				<View style={tw.style("mb-10")}>
					<TermsText variant="title" marginBottom={20}>
						Digital Privacy and Data Protection
					</TermsText>
					<TermsText>
						At FYP.Fans, we prioritize the digital privacy of our
						creators and fans. While creators are encouraged to
						share their experiences and stories, they should be
						cautious not to disclose sensitive personal information,
						either their own or that of others. Benefits that
						involve sharing or accessing personal data, such as home
						addresses, phone numbers, or other private details, are
						strictly prohibited. All creators must adhere to global
						data protection regulations and ensure that any content
						or benefit does not infringe upon the privacy rights of
						individuals.
					</TermsText>
				</View>
				<View style={tw.style("mb-10")}>
					<TermsText variant="title" marginBottom={20}>
						Financial Ventures and Digital Currency
					</TermsText>
					<TermsText>
						FYP.Fans isn't intended as a platform for initiating
						Coin Offerings or establishing investment ventures.
						While sharing personal investment experiences and
						guidance is allowed, the following benefits are strictly
						prohibited:
						{"\n\n"}- Digital coins meant for direct monetary gain
						for the creator or fan.{"\n"}- Coins presented as part
						of an investment strategy.{"\n"}- Incentives, such as
						discount vouchers or gift cards, encouraging the
						acquisition of digital currency.{"\n"}- Benefits
						structured with fraudulent intent, like pyramid or Ponzi
						schemes.{"\n"}- Benefits that guarantee fans a monetary
						return based on the advice given, e.g., "By contributing
						$50 monthly, my guidance will yield a tenfold return."
						{"\n"}- Creators can offer digital tokens within a
						membership level, provided these tokens grant access to
						exclusive creator perks. For a deeper understanding of
						creator coins and tokens, please consult our dedicated
						Help Center article.
						{"\n"}
						{"\n"}
						{"\n"}
						*Disclaimer:* Any financial counsel provided on FYP.Fans
						must adhere to the consumer protection regulations of
						the creator's residing country. FYP.Fans will not
						support content that breaches these regulations.
					</TermsText>
				</View>
				<View style={tw.style("mb-10")}>
					<TermsText variant="title" marginBottom={20}>
						Wellness, Cleanliness, and Edibles
					</TermsText>
					<TermsText>
						While FYP.Fans supports content centered around culinary
						arts, DIY product creation, and health discussions,
						creators are prohibited from offering consumable
						ingredients or products as benefits. However, offering
						external products like creams or fragrances as benefits
						is permissible.
					</TermsText>
				</View>

				<View style={tw.style("mb-10")}>
					<TermsText variant="title" marginBottom={20}>
						Lucky Draws
					</TermsText>
					<TermsText>
						The allure of securing a prize makes lucky draws an
						enticing method to expand one's audience. Yet, you're
						not allowed to charge for participation in lucky draws
						or giveaways as a benefit. Simply put, fans shouldn't be
						required to pay for a chance to secure a prize. This
						encompasses lotteries, lucky draws, or even surprise
						packages if the package's worth isn't assured. If you're
						keen on presenting giveaways, ensure they're available
						to your entire fan community, not just exclusive to
						paying fans, and adhere to relevant regulations.
					</TermsText>
				</View>

				<View style={tw.style("mb-10")}>
					<TermsText variant="title" marginBottom={20}>
						Direct Sales and Network Marketing
					</TermsText>
					<TermsText>
						FYP.Fans is not tailored for initiating direct sales
						ventures or promoting Network Marketing (often referred
						to as MLM). FYP.Fans is envisioned as a hub for creators
						to embark on artistic projects. Products produced and
						retailed by direct marketing enterprises cannot be
						presented as benefits on FYP.Fans.
					</TermsText>
				</View>

				<View style={tw.style("mb-10")}>
					<TermsText variant="title">
						Intellectual Property in Merchandise
					</TermsText>
					<TermsText>
						Adhering to these guidelines is the creator's
						responsibility. By uploading content to FYP.Fans, you
						acknowledge its alignment with both FYP.Fans' guidelines
						and Terms of Use.
						{"\n\n"}
						Merchandise that explicitly intimidates or jeopardizes
						an individual or a collective's safety won't be
						endorsed. This encompasses content or visuals that
						provoke others to resort to violent actions or partake
						in menacing activities like stalking. For a deeper dive,
						please consult this support article.
					</TermsText>
				</View>

				<View style={tw.style("mb-10")}>
					<TermsText variant="title" marginBottom={20}>
						Additional Points to Consider
					</TermsText>
					<TermsText>
						This guideline list isn't all-encompassing and may
						undergo modifications as technology progresses and
						circumstances change. If you're uncertain about your
						initiatives, please reach out to our Trust and Integrity
						team through this form. We're always here to assist.
						{"\n\n"}
						This policy is an integral component of FYP.Fans' Terms
						of Use and Community Guidelines. For further insights,
						contact FYP.Fans at support@fyp.fans.
					</TermsText>
				</View>
			</ScrollView>
		</View>
	);
};

export default BenefitGuidelinesScreen;
