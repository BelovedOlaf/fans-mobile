import { View, ScrollView } from "react-native";
import React from "react";
import tw from "@lib/tailwind";

import { TermsText } from "@components/terms";

const CommunityGuidelinesScreen = () => {
	return (
		<View style={[tw.style("flex-1 bg-white")]}>
			<ScrollView style={tw.style("flex-1  px-4.5 pt-6")}>
				<View style={tw.style("mb-10")}>
					<TermsText variant="title" marginBottom={20}>
						Enforcement of Community Guidelines
					</TermsText>
					<TermsText>
						FYP.Fans is home to a wide array of creators and fans,
						each with their unique perspectives. While you might not
						always align with someone's viewpoint, it doesn't
						necessarily mean they're breaching our Community
						Guidelines. If you come across a page on FYP.Fans that
						you believe breaks our guidelines, we encourage you to
						use our reporting tool. For more details on how to
						report a creator or a post, click here. Our dedicated
						Trust & Safety team will assess the report, and should
						there be any violations, the case manager will reach out
						to the creator to inform them. We will then remove the
						post and in some cases ban the creator.
					</TermsText>
				</View>
				<View style={tw.style("mb-10")}>
					<TermsText variant="title" marginBottom={20}>
						Our Pledge to Creators
					</TermsText>
					<TermsText>
						Your passion and livelihood matter to us. We are
						committed to ensuring fairness and transparency in our
						decision-making processes. We aim to maintain open
						channels of communication with our creators. When it
						comes to moderation, our primary approach is to educate
						creators, helping them grasp the nature of the
						infringement and guiding them towards rectification.
						However, in instances where the breach is severe or
						deliberate, we might resort to escalated measures,
						including account suspension or removal. In extreme
						circumstances, a creator might face a permanent ban from
						FYP.Fans.
					</TermsText>
				</View>
				<View style={tw.style("mb-10")}>
					<TermsText variant="title" marginBottom={20}>
						Report Concerns
					</TermsText>
					<TermsText>
						If you come across content or behavior that seems
						harmful, inappropriate, or against our guidelines,
						please report it. Our user interface lets you report
						users, posts, and individual comments. We rely on our
						community members to help us maintain a safe and
						positive space for everyone.
					</TermsText>
				</View>
				<View style={tw.style("mb-10")}>
					<TermsText variant="title" marginBottom={20}>
						Safety, Respect, and Creation
					</TermsText>
					<TermsText>
						The essence of these Community Guidelines is to mold and
						steer the direction of FYP.Fans and its growing
						community of creators and fans. Our aim isn't to dictate
						a rigid framework of "right" or "wrong." Instead, we
						strive to make FYP.Fans a platform where a myriad of
						creators and their communities feel enthusiastic,
						nurtured, and content, even amidst diverse and
						occasionally opposing viewpoints.
						{"\n\n"}
						These guidelines encapsulate a comprehensive, evolving
						internal policy that we've meticulously crafted with
						insights from community and safety professionals. We
						take pride in these guidelines, confident that they'll
						empower creators to foster a secure and encouraging
						environment, enabling them to consistently produce,
						share, and cultivate deep, enduring bonds with their
						fans.
					</TermsText>
				</View>
				<View style={tw.style("mb-10")}>
					<TermsText variant="title" marginBottom={20}>
						Spam and Community Etiquette:
					</TermsText>
					<TermsText>
						Overview: While building a fan base can be challenging,
						spamming is not the solution. Be innovative and genuine,
						avoid posting repetitive comments, and refrain from
						sending unsolicited messages to community members.
						{"\n\n"}
						Actions considered as spamming on FYP.Fans include:
						{"\n\n"}- Creating pledge schemes or contacting other
						creators for reciprocal pledge agreements.{"\n"}- Using
						FYP.Fans to distribute malware or phishing schemes.
						{"\n"}- Posting misleading content to attract fans.
						{"\n"}- Commenting on other creators' pages to promote
						your own.
						{"\n"}- Sending bulk unsolicited messages soliciting
						support.{"\n"}- Misusing tags to manipulate search
						results.{"\n"}- Posting multiple paid posts daily for
						per-post creators.{"\n"}
						{"\n"}
						{"\n"}
						When assessing spam reports, we differentiate between
						commercial spam and benign over-enthusiasm, such as
						genuine creators excessively posting on others' pages.
						If benign over-enthusiasm is identified, the account
						will be flagged; repeated violations will result in
						account removal. Accounts that are not genuine creators
						and engage in commercial spamming will be removed. In
						essence, be original and creative; no one appreciates
						spam (including the canned variety).
					</TermsText>
				</View>
				<View style={tw.style("mb-10")}>
					<TermsText variant="title" marginBottom={20}>
						Intellectual Property Rights
					</TermsText>
					<TermsText>
						FYP.Fans respects the intellectual property rights of
						others and expects its users to do the same.
						{"\n\n"}
						Copyrighted Content: Posting copyrighted content without
						the necessary rights or permissions is strictly
						prohibited. If you believe your copyrighted work has
						been infringed upon on our platform, please notify us
						immediately at support@fyp.fans.
						{"\n\n"}
						Trademarks: Unauthorized use of trademarks, logos, or
						brand names is not allowed. Any content that infringes
						upon or misuses trademark rights will be removed.
						{"\n\n"}
						Reporting Infringements: If you believe that your
						intellectual property rights have been violated, please
						contact our Intellectual Property Rights team at
						support@fyp.fans with detailed information about the
						alleged infringement.
					</TermsText>
				</View>
				<View style={tw.style("mb-10")}>
					<TermsText variant="title" marginBottom={20}>
						Accountability and Off-Platform Activities
					</TermsText>
					<TermsText>
						Given that you're raising funds on FYP.Fans, it's
						essential to understand that we might be held
						responsible for how those funds are utilized.
						Consequently, we might also monitor activities related
						to your membership outside our platform. When we refer
						to "On FYP.Fans," we're discussing the content you
						finance on and via FYP.Fans. Our review process
						considers how content is disseminated, the external
						links associated with a page, and the origin of the
						traffic. Regardless of the situation, creators always
						have the right to challenge a decision. While we might
						not always reverse our stance, we guarantee that we'll
						always lend an ear.
					</TermsText>
				</View>
				<View style={tw.style("mb-10")}>
					<TermsText variant="title" marginBottom={20}>
						Prohibited Activities and Content Safety
					</TermsText>
					<TermsText>
						Overview: FYP.Fans prohibits the collection of funds for
						endeavors that promote harmful or illegal actions.
						Creations that endorse, threaten, or depict harm to
						oneself, others, or animals are not permitted.
						Similarly, promoting illegal activities such as property
						crimes, illegal weapons distribution, or drug production
						is not allowed.
						{"\n\n"}
						Self-Harm:{"\n"}
						Promotion or glorification of self-harm, including
						encouragement of self-injury, suicide, or eating
						disorders, is strictly forbidden on FYP.Fans. This
						includes content that celebrates self-scarification or
						promotes anorexia. If we identify a genuine risk of
						self-harm by a creator, we will collaborate with law
						enforcement as necessary. However, content that raises
						awareness, like self-harm survival narratives with
						educational intent, is permitted.
						{"\n\n"}
						Illegal Activities:{"\n"}
						Pages that solicit funds for illegal purposes or
						encourage unlawful behavior are not allowed. This
						includes the promotion of illegal weapons, drug
						production or distribution methods, and property crimes.
						Each case is reviewed individually.
						{"\n\n"}
						Dangerous Activities:{"\n"}
						Creators showcasing dangerous stunts must include a
						clear disclaimer. Posts that are graphic or excessively
						risky should be marked.
						{"\n\n"}
						Teen Safety:{"\n"}
						FYP.Fans has a strict policy against content that
						exploits minors, including sexualized portrayals,
						grooming, or solicitation. Users found engaging in such
						activities will be removed and reported to the
						appropriate legal authorities. Additionally, creators
						must be 18 years or older to share content and
						ID-verified.
					</TermsText>
				</View>
				<View style={tw.style("mb-10")}>
					<TermsText variant="title" marginBottom={20}>
						Genuineness
					</TermsText>
					<TermsText>
						In essence, FYP.Fans is a haven for creators who bring
						something positive to the table. As a creator, it's
						imperative that you refrain from posting content that
						violates others' intellectual property rights.
						{"\n\n"}- Creating fictitious pages or soliciting funds
						for activities you aren't genuinely engaged in is
						prohibited. For instance, setting up a fan page on
						behalf of someone else is not allowed.{"\n"}-
						Misrepresenting or impersonating another by leveraging
						their name, brand, or works to mislead fans is strictly
						forbidden. However, we'll evaluate satire and comedy
						differently, recognizing their inherent originality.
						{"\n"}- Using FYP.Fans for jests or to raise funds for
						inaction is not permissible. To illustrate, a creator
						shouldn't solicit funds for *refraining from* a
						particular activity.{"\n"}
						{"\n"}
						{"\n"}
						For a deeper dive into our stance on copyright
						violations, please refer to our Copyright and Trademark
						Policy.
					</TermsText>
				</View>
				<View style={tw.style("mb-10")}>
					<TermsText variant="title" marginBottom={20}>
						Commercial Activities and Partnerships
					</TermsText>
					<TermsText>
						FYP.Fans is primarily a platform for creators to connect
						with their fans. Any commercial activities or
						partnerships must align with our guidelines.
						{"\n\n"}
						Affiliate Marketing: If creators are using affiliate
						links or promoting products, they must disclose this
						information transparently to their fans. Misleading
						promotions or undisclosed affiliate partnerships are not
						allowed.
						{"\n\n"}
						Sponsored Content: Any content that is sponsored or paid
						for by a third party must be clearly labeled as such.
						Creators must ensure that they adhere to all relevant
						advertising standards and regulations.
						{"\n\n"}
						Product Sales: If creators are selling products directly
						through FYP.Fans, they must ensure that they have the
						necessary rights to sell those products and that the
						products comply with all applicable laws and
						regulations.
					</TermsText>
				</View>
				<View style={tw.style("mb-10")}>
					<TermsText variant="title" marginBottom={20}>
						Content Involving Violence and Graphic Imagery
					</TermsText>
					<TermsText>
						Overview: FYP.Fans is committed to fostering a secure
						environment for all its members. We strictly prohibit
						content that endorses or showcases graphic violence,
						especially if it's gratuitous, sadistic, or celebrates
						real-world distress. This includes, but is not limited
						to, depictions of animal cruelty, severe injuries, and
						violent fatalities. However, we recognize that certain
						content, when presented with documentary, educational,
						scientific, or journalistic intent, can be exempted.
						Fictional or dramatized portrayals containing violent or
						graphic elements are permissible, provided creators
						offer sufficient context to clarify its fictional
						nature. Activities rooted in competition or religious
						practices, such as hunting, ritualistic animal
						slaughters, and professional combat sports like boxing
						and MMA, are also permitted. This isn't an exhaustive
						list of exceptions. If you're uncertain about the
						acceptability of your content, please consult our Trust
						and Safety team at guidelines@fyp.fans.
					</TermsText>
				</View>
				<View style={tw.style("mb-10")}>
					<TermsText variant="title" marginBottom={20}>
						Content Involving Violence and Graphic Imagery
					</TermsText>
					<TermsText>
						Overview: FYP.Fans is committed to fostering a secure
						environment for all its members. We strictly prohibit
						content that endorses or showcases graphic violence,
						especially if it's gratuitous, sadistic, or celebrates
						real-world distress. This includes, but is not limited
						to, depictions of animal cruelty, severe injuries, and
						violent fatalities. However, we recognize that certain
						content, when presented with documentary, educational,
						scientific, or journalistic intent, can be exempted.
						Fictional or dramatized portrayals containing violent or
						graphic elements are permissible, provided creators
						offer sufficient context to clarify its fictional
						nature. Activities rooted in competition or religious
						practices, such as hunting, ritualistic animal
						slaughters, and professional combat sports like boxing
						and MMA, are also permitted. This isn't an exhaustive
						list of exceptions. If you're uncertain about the
						acceptability of your content, please consult our Trust
						and Safety team at guidelines@fyp.fans.
						{"\n\n"}
						Prohibited Content on FYP.Fans:
						{"\n\n"}
						Real-World Violence Glorification:{"\n"}- Advocacy or
						celebration of violent acts leading to harm or fatality,
						including acts of terrorism or mass violence.{"\n"}-
						Promotion or endorsement of intimate partner violence or
						any form of abuse.{"\n"}- Footage captured by an
						assailant during a violent or fatal assault where the
						harm or demise of victims is evident.{"\n"}- Content
						that encourages or incites self-harm or suicide.
						{"\n\n"}
						Violence Against Animals:{"\n"}- Depictions of animal
						cruelty, including staged fights, baiting, or any form
						of deliberate harm.
						{"\n"}- Content showcasing animal slaughter or
						maltreatment, unless it's part of a recognized religious
						practice.{"\n"}- Promotion or endorsement of poaching or
						illegal wildlife trade.{"\n"}- Displaying or promoting
						the use of animals for harmful experiments outside of
						regulated scientific research.
						{"\n\n"}
						Violence Against Humans:{"\n"}- Content displaying
						violent mishaps, fatalities, or human remains outside a
						medical or educational context.{"\n"}- Real-world acts
						of extreme violence, such as torture, mutilation, or any
						form of degrading treatment.{"\n"}- Promotion or
						endorsement of hate crimes or acts based on race,
						ethnicity, religion, gender, or sexual orientation.
						{"\n"}- Content that showcases or promotes gang violence
						or organized crime.
						{"\n\n"}
						Fictional or Dramatized Violence:{"\n"}- Fictional
						portrayals that glorify or trivialize domestic or
						intimate partner violence.{"\n"}- Dramatized or
						fictional violent imagery lacking appropriate context or
						disclaimers to inform viewers of its fictional nature.
						{"\n"}- Content that uses graphic violence or gore as a
						means of shock value without artistic, educational, or
						narrative justification.{"\n"}- Horror or thriller
						content that blurs the line between fiction and reality
						without clear disclaimers.
					</TermsText>
				</View>

				<View style={tw.style("mb-10")}>
					<TermsText variant="title" marginBottom={20}>
						Bullying, Harassment, and Threats
					</TermsText>
					<TermsText>
						Overview: FYP.Fans is dedicated to fostering a secure
						environment for its diverse community. While we champion
						freedom of expression, critical discussions, and debates
						on controversial topics, we strictly prohibit any form
						of bullying or harassment.
						{"\n\n"}
						Discussing public figures, media, or celebrities might
						entail stringent criticism, which we recognize as a
						vital component of open discourse. However, we draw a
						clear boundary against harassing private individuals or
						any actions jeopardizing physical safety, irrespective
						of the individual's public or private status.
						{"\n\n"}
						We advocate for open dialogue, but it's paramount that
						every user feels safe expressing their views without
						fear. Even contentious discussions should be approached
						respectfully. Here's our stance on these behaviors:
						{"\n\n"}- Bullying and Harassment: Intimidation, either
						directly or by leveraging influence, is unacceptable.
						Real-life confrontations are treated with heightened
						seriousness compared to online interactions due to
						potential physical harm implications. While public
						figure disputes might be viewed differently, FYP.Fans
						strictly prohibits content featuring non-consensual
						intimate imagery. However, content related to survival
						stories, educational resources, or advocacy concerning
						non-consensual intimate imagery is allowed.
						{"\n\n"}- Threats: Every member of FYP.Fans should be
						able to voice their opinions without posing threats. We
						have a stringent stance against threats of violence. Any
						user found threatening another's well-being will face
						consequences. This encompasses behaviors like stalking
						or inciting violence.
						{"\n\n"}
						If you're subjected to such behavior and your safety is
						compromised, please contact local authorities and report
						the incident to us by emailing support@fyp.fans.
					</TermsText>
				</View>
				<View style={tw.style("mb-10")}>
					<TermsText variant="title" marginBottom={20}>
						Ethical and Safe Adult Content:
					</TermsText>
					<TermsText>
						Overview: FYP.Fans is committed to fostering a safe,
						consensual, and responsible platform for adult content
						creators and consumers. We understand the diversity of
						our community and aim to empower users with choices in
						consuming adult content, while ensuring a high standard
						of ethical and legal compliance.
						{"\n\n"}
						Age Verification and Content Classification:{"\n"}- All
						users posting adult content must undergo a stringent age
						verification process which is done by Ondato age
						verification API, including ID and selfie
						verification/storage.{"\n"}- Adult content is distinctly
						labeled with an 18+ tag and includes any depictions of
						nudity or sexual acts.{"\n"}- Creators must identify
						their content as 18+ if it includes mature themes
						unsuitable for users below 18. Any profiles that post
						sexual content without being marked as 18+ will be
						permanently removed.
						{"\n\n"}
						Content Guidelines:{"\n"}- We support the work of
						independent sexual artists, barring content from
						agencies or entities engaged in commercial pornography.
						{"\n"}- Content featuring nudity or sexual acts must be
						created and posted by the user, featuring only
						themselves or other verified users.{"\n"}- We prohibit
						illegal content, including child exploitation,
						non-consensual acts, and extreme or harmful sexual
						practices.
						{"\n\n"}
						Moral and Social Responsibility:{"\n"}- We pledge 25% of
						net profits from sexually explicit content to charities
						focused on sexual health, human trafficking prevention,
						mental health, etc.{"\n"}- A fund will be established
						for manual audits of 18+ creators and content, ensuring
						adherence to our standards. Our mission is to set a new
						industry standard of safety.
						{"\n\n"}
						Community and Legal Compliance:{"\n"}- Rigorous
						moderation is in place to prevent underage or
						non-consensual content.{"\n"}- For every 18+ creator we
						store a legal identification document. {"\n"}- We
						manually review every 18+ creator to make sure the legal
						document matches that creator. {"\n"}
						{"\n\n"}
						Prohibition of Harmful Content:
						{"\n\n"}
						FYP.Fans is deeply committed to ensuring the safety and
						dignity of all individuals, both within and beyond our
						community. In alignment with this commitment, our
						platform maintains a stringent policy against content
						that could be harmful, offensive, or illegal.
						Specifically, we prohibit any content that glorifies,
						sensationalizes, or in any way endorses harmful sexual
						practices or behaviors. This includes, but is not
						limited to:
						{"\n\n"}
						1. Sexual Violence: Any depiction of sexual violence,
						including implied or explicit acts of non-consensual
						sexual acts, is strictly forbidden. This extends to any
						content that might trivialize or normalize such acts,
						which are not only illegal but deeply harmful to
						individuals and society.
						{"\n\n"}
						2. Bestiality: We strictly prohibit any content
						involving sexual acts with animals.
						{"\n\n"}
						3. Rape and Non-Consensual Acts: Our platform has zero
						tolerance for content that depicts, suggests, or alludes
						to rape or any other non-consensual sexual acts. We are
						committed to promoting a culture of consent and respect,
						and as such, any content that undermines these values is
						strictly prohibited.
						{"\n\n"}
						4. Child Exploitation: Protecting minors is of utmost
						importance to us. Therefore, any content that exploits
						children, either directly or indirectly, is strictly
						forbidden. This includes any sexualized depiction of
						minors or content that could be construed as promoting
						or endorsing child exploitation.
						{"\n\n"}
						5. Extreme Sexual Fetishes: While we respect the
						diversity of sexual expression, certain extreme sexual
						fetishes that involve harm, non-consent, or illegal
						activities are not permitted on our platform. This
						includes content that may involve harmful or dangerous
						practices, or that blurs the lines with non-consensual
						acts.
						{"\n\n"}
						We understand that some of these topics can appear in
						artistic, educational, or narrative contexts. In such
						cases, our Trust and Safety team will review the content
						carefully, considering the broader context and intent.
						However, our overarching commitment to safety and
						legality will guide all decisions.
						{"\n\n"}- We assess content based on its context and
						reserve the right to remove accounts that breach our
						guidelines.
						{"\n\n"}
						ID Verification and Tagging:{"\n"}- ID verification is
						mandatory for all creators.{"\n"}- Any individual
						featured in a creator's content must be tagged and
						either undergo ID verification or submit a consent form.
						{"\n\n"}
						By using FYP.Fans for posting or consuming sexually
						explicit content, you agree to these terms, joining us
						in our mission to create a safe, responsible, and
						artistically free environment for adult content.
					</TermsText>
				</View>
				<View style={tw.style("mb-10")}>
					<TermsText variant="title" marginBottom={20}>
						Doxing and Personal Privacy
					</TermsText>
					<TermsText>
						Overview: FYP.Fans firmly opposes doxing, which entails
						disclosing someone's confidential details or compiling
						their public data to intimidate or harass them.
						{"\n\n"}
						Doxing is a tool often used to suppress or threaten
						individuals with differing online perspectives. It can
						inflict profound emotional distress and jeopardize the
						victim's physical safety. Classic doxing involves
						revealing someone's private details, such as their phone
						number or residential address. The definition of
						"private" can vary, sometimes meaning information that's
						merely challenging to locate. We also classify the
						aggregation of someone's non-private details as doxing.
						For instance, combining a person's profile picture with
						their real name, all known social media handles, and
						their city of residence would be considered doxing. The
						context of information sharing is crucial. If data seems
						to be shared to facilitate mass harassment, it's likely
						deemed doxing. Doxing doesn't promote dialogue; it
						silences voices. It hinders our capacity for
						constructive discourse, personal growth, and maintaining
						a safe disagreement environment.
					</TermsText>
				</View>
				<View style={tw.style("mb-10")}>
					<TermsText variant="title" marginBottom={20}>
						Hate Speech
					</TermsText>
					<TermsText>
						Overview: FYP.Fans serves as a bridge connecting
						creators with fans globally. Our foundation is built on
						nurturing creativity, making inclusivity our core
						principle. Consequently, FYP.Fans strictly prohibits
						content endorsing hate speech, including calls for
						violence, exclusion, or discrimination. This encompasses
						attacks based on race, ethnicity, nationality, religion,
						gender, gender identity, sexual orientation, disability,
						medical conditions, caste, or immigration status.
						{"\n\n"}
						When evaluating potential hate speech violations, we
						consider:{"\n"}- Is there an incitement of violence
						based on the aforementioned characteristics?{"\n"}- Does
						the user employ dehumanizing language based on these
						traits?{"\n"}- Are racial slurs or derogatory depictions
						being used?{"\n"}- Is there a mockery or denial of
						significant hate crimes, like the Holocaust?{"\n"}- Is
						the content discriminatory towards individuals based on
						immigration status or merely discussing immigration
						policies?{"\n"}- Is the content a genuine critique of a
						state or institution, or is it veiled hate speech using
						coded language?{"\n"}
						{"\n"}
						{"\n"}
						This isn't an exhaustive list, but it provides insight
						into our approach towards complex intersections of
						speech and action. Distinguishing between political
						commentary and hate speech can be nuanced. If you
						encounter potential hate speech on FYP.Fans, we urge you
						to report it.
					</TermsText>
				</View>
				<View style={tw.style("mb-10")}>
					<TermsText variant="title" marginBottom={20}>
						Restrictions on FYP.Fans Users
					</TermsText>
					<TermsText>
						Overview: As FYP.Fans plays a pivotal role in financial
						empowerment, we impose limitations on the types of
						content and projects funded through our platform and on
						who can receive funds.
						{"\n\n"}
						After establishing a FYP.Fans page, any creator found
						guilty of making credible violent threats, engaging in
						violent crimes, malicious doxing, orchestrating
						nonviolent harm (like fraud, money laundering, or
						gambling), or urging others to partake in these
						activities may face a FYP.Fans ban.
						{"\n\n"}
						Political Campaigns:{"\n"}
						FYP.Fans cannot be used to finance your political
						campaign or the campaigns of others.
						{"\n\n"}
						Past Criminal or Harmful Activities:{"\n"}
						Individuals who have served their sentences for past
						offenses can showcase their work on FYP.Fans. However,
						creators found guilty of making credible violent
						threats, child abuse, malicious doxing, orchestrating
						nonviolent harm, or urging others to engage in these
						activities may be prohibited from using FYP.Fans.
						{"\n\n"}
						Affiliation with Violent, Criminal, or Hateful
						Organizations:{"\n"}
						Individuals or projects linked to harmful, hateful, or
						violent groups, endorsing related ideologies or
						conspiracy theories, or using their specific jargon may
						face restrictions on FYP.Fans. This includes members of
						terrorist organizations, organized crime groups, hate
						groups, and any group targeting LGBTQI+ individuals.
						While creators can discuss these groups for educational,
						reporting, or debunking purposes, active endorsement or
						support may lead to account termination. We recognize
						that beliefs and affiliations can evolve. If someone
						disassociates from a harmful or hateful group and wishes
						to fund a project adhering to FYP.Fans guidelines, we'll
						evaluate their renunciations on an individual basis.
						Factors considered include the time since the
						renouncement, whether both the group and its ideology
						were renounced, and the project's nature on FYP.Fans.
						For queries regarding a group's compatibility with
						FYP.Fans, please contact our Trust & Safety team at
						support@fyp.fans.
					</TermsText>
				</View>
				<View style={tw.style("mb-10")}>
					<TermsText variant="title" marginBottom={20}>
						Fan Accounts
					</TermsText>
					<TermsText>
						Overview: The principles guiding these Community
						Guidelines are applicable to both creators and fans.
						While we empower creators to oversee their communities,
						there are situations where the Trust and Safety team
						will evaluate reports concerning fans' conduct.
						{"\n\n"}
						Our Trust and Safety team meticulously examines reports
						related to hate speech, harassment, and solicitation.
						Actions will be taken against a fan account if it
						breaches these guidelines. Creators can directly report
						inappropriate posts by fans using the provided
						instructions. Rest assured, our review process remains
						confidential. If you ever feel threatened due to
						stalking or harassment by a fan, it's crucial to seek
						assistance from local law enforcement and the nearest
						cybercrime unit. They possess the necessary tools and
						expertise to assist. FYP.Fans will collaborate
						diligently with law enforcement during any investigation
						and in response to any legal requests.
						{"\n\n"}
						Financial Advice Content: FYP.Fans prioritizes the
						safety of both creators and fans. We urge those
						consuming financial advice content to consult with
						certified financial experts before making any investment
						choices.
						{"\n\n"}
						Chargebacks: Chargebacks occur when individuals, in the
						case of FYP.Fans, fans, approach their banks or
						financial institutions to dispute a transaction. To
						safeguard creators, FYP.Fans will assess excessive or
						potentially deceitful chargebacks and may temporarily
						restrict fans from supporting additional creators during
						this evaluation. If a fan's chargebacks are determined
						to be fraudulent, FYP.Fans reserves the right to suspend
						or terminate their account.
						{"\n\n"}
						For a deeper understanding of chargebacks, refer to this
						link. These policies are integrated into FYP.Fans' Terms
						of Use. For further details, reach out to us at
						support@fyp.fans.
					</TermsText>
				</View>
			</ScrollView>
		</View>
	);
};

export default CommunityGuidelinesScreen;
