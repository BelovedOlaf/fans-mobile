import { EditNoteSvg } from "@assets/svgs/common";
import CustomRadio from "@components/common/customRadio";
import {
	FansGap,
	FansHorizontalDivider,
	FansPhoneInput,
	FansPurpleButton,
	FansScreen1,
	FansScreen3,
	FansText,
	FansTextInput,
	FansView,
} from "@components/controls";
import tw from "@lib/tailwind";
import { ColorStyle1 } from "@usertypes/styles";
import * as DocumentPicker from "expo-document-picker";
import React, { useState } from "react";
import { TextInput, TouchableOpacity } from "react-native";

const LawEnforcementGuideScreen = () => {
	const [file, setFile] = useState("");

	const [value, setValue] = useState(false);

	const handlePressNo = () => setValue(false);

	const handlePressYes = () => setValue(true);

	const onUpload = async () => {
		const res = await DocumentPicker.getDocumentAsync({
			type: "*/*",
		});

		if (res.canceled === false && res.output) {
			setFile(res.output[0].name);
		}
	};

	return (
		<FansScreen3>
			<FansText fontSize={16} lineHeight={21}>
				This Legal Guidance (“Guidance”) is provided for law enforcement
				agencies and officials to assist them in fulfilling their law
				enforcement duties and conduct investigations. FYP.Fans is
				committed to global collaboration with law enforcement. This
				material does not aim to offer legal counsel. Please examine
				this Guidance thoroughly prior to sending a law enforcement
				request to FYP.Fans.
			</FansText>
			<FansGap height={29} />
			<FansView>
				<FansText fontFamily="inter-semibold" fontSize={17}>
					Enquiries of a General Nature
				</FansText>
				<FansGap height={12} />
				<FansText fontSize={16} lineHeight={21}>
					Law enforcement, military, or government officials can
					submit general inquiries that do not involve requests for
					deletion, preservation, or disclosure of account
					information/content via our Contact Form. For all other
					official requests, please use our Law Enforcement Request
					Form according to the instructions provided.
				</FansText>
			</FansView>
			<FansGap height={28} />
			<FansView>
				<FansText fontFamily="inter-semibold" fontSize={17}>
					Requests to Remove Content
				</FansText>
				<FansGap height={12} />
				<FansText fontSize={16} lineHeight={21}>
					At our absolute discretion, we might process law enforcement
					requests to delete content that contravenes our Terms of
					Service or is deemed illegal, evaluating each request
					individually. These requests should be submitted through our
					Law Enforcement Request Form, providing an official return
					email address, the name and role of the requesting official,
					a hyperlink to the targeted content for deletion, and the
					legal rationale for removal. Our content removal and legal
					departments will examine and respond to such requests.
				</FansText>
			</FansView>
			<FansGap height={29} />
			<FansView>
				<FansText fontFamily="inter-semibold" fontSize={17}>
					Accessible Account Information
				</FansText>
				<FansGap height={12} />
				<FansText fontSize={16} lineHeight={21}>
					Our Privacy Policy outlines our data collection, protection,
					and retention practices. Account type and user activities
					are among the many factors that influence the nature,
					breadth, method of collection, and duration of data
					retention.
				</FansText>
				<FansGap height={12} />
				<FansText fontSize={16} lineHeight={21}>
					For instance, Fans are not obligated to provide the same
					extent of account registration data as Creators, with
					Creators undergoing comprehensive age and identity checks
				</FansText>
				<FansGap height={12} />
				<FansText fontSize={16} lineHeight={21}>
					Law enforcement can easily access some stored profile
					content by viewing or subscribing to the user’s profile.
					This could include username, display name, profile photo,
					biography, URL, subscription offers, tip requests, and
					posts, potentially containing text, photos, videos, and/or
					comments.
				</FansText>
				<FansGap height={12} />
				<FansText fontSize={16} lineHeight={21}>
					Receipt of formal legal process may avail law enforcement to
					further non-public account information. This legal process
					might be in the form of a subpoena, production order,
					judicial authorization, search warrant, or court order,
					depending on jurisdiction and requested records. Such
					non-public account information may include registration
					details (like the associated email address), identification
					documents, tax forms, linked social media accounts, billing
					and revenue data, subscribers, private messages, and user
					activity records, including IP address logs and other data.
				</FansText>
				<FansGap height={12} />
				<FansText fontSize={16} lineHeight={21}>
					It’s vital to understand that users control all stored
					profile content and private messages. Consequently, if a
					user deletes this content before we can process a valid law
					enforcement request, it may not be retrievable. Preservation
					of some profile content in real-time without suspending an
					account may be impossible. The decision to suspend an
					account resides solely with FYP.Fans.
				</FansText>
				<FansGap height={13} />
				<FansText fontSize={16} lineHeight={21}>
					Kindly note that FYP.Fans is based and operated in the
					United Kingdom, meaning all user data is stored there. We do
					not maintain premises or addresses in other countries.
				</FansText>
			</FansView>
			<FansGap height={29} />
			<FansView>
				<FansText fontFamily="inter-semibold" fontSize={17}>
					Preservation Requests
				</FansText>
				<FansGap height={12} />
				<FansText fontSize={16} lineHeight={21}>
					FYP.Fans accepts temporary, informal preservation requests
					from law enforcement under suitable legal circumstances,
					provided the records bear relevance to a legal proceeding or
					investigation. All such requests should be submitted via our
					Law Enforcement Request Form with a valid official return
					email address, the official’s name and position, the
					preservation duration, a description of the information to
					be preserved and its relevance to the investigation, plus at
					least one of the following user identifiers:
				</FansText>
				<FansGap height={14} />
				<FansText fontSize={16} lineHeight={21}>
					• Username{"\n"}• Profile URL{"\n"}• Email address{"\n"}•
					Legal name{"\n"}• Telephone number{"\n"}• Billing address
					{"\n"}• Credit card details (should include the first six
					and last four numbers of the credit card, suspected
					transaction dates and times, and the legal name of the
					account holder)
				</FansText>
			</FansView>
			<FansGap height={29} />
			<FansHorizontalDivider />
			<FansGap height={33.2} />
			<FansView>
				<FansText fontFamily="inter-semibold" fontSize={17}>
					Fill out form
				</FansText>
				<FansGap height={12} />
				<FansText fontSize={16} lineHeight={21}>
					Note: Use of this contact form is limited exclusively to law
					enforcement agencies. If you are not a law enforcement
					representative, please contact us here:{" "}
					<FansText color="purple-a8">fyp.fans/contact</FansText> or
					send an email to{" "}
					<FansText color="purple-a8">support@fyp.fans</FansText>
				</FansText>
				<FansGap height={36.5} />
				<FansView style={tw.style("flex gap-[10px]")}>
					<FansTextInput placeholder="Your name" />
					<FansTextInput placeholder="Email address" />
					<FansTextInput placeholder="Law enforcement agency" />
					<FansTextInput placeholder="Address" />
					<FansPhoneInput value={""} onChange={() => {}} />
					<FansView
						style={tw.style(
							"h-[128px]",
							"bg-fans-grey",
							"px-[19px] py-[13px]",
							"rounded-[7px]",
						)}
					>
						<TextInput
							style={tw.style("h-full", "text-[18px]")}
							multiline
							placeholder="Description of legal inquiry"
						/>
					</FansView>
				</FansView>
			</FansView>
			<FansGap height={33} />
			<FansView>
				<FansText fontFamily="inter-semibold" fontSize={17}>
					Does this inquiry involve a risk of imminent harm to an
					individual?
				</FansText>
				<FansGap height={23} />
				<CustomRadio
					label="No"
					checked={value === false}
					onPress={handlePressNo}
				/>
				<FansGap height={20} />
				<FansHorizontalDivider />
				<FansGap height={20} />
				<CustomRadio
					label="Yes"
					checked={value}
					onPress={handlePressYes}
				/>
			</FansView>
			<FansGap height={34} />
			<FansView>
				<FansText fontFamily="inter-semibold" fontSize={17}>
					Attach any relevant documentation
				</FansText>
				<FansGap height={16.5} />
				<TouchableOpacity onPress={onUpload}>
					<FansView
						height={179}
						alignItems="center"
						style={tw.style(
							"border border-fans-grey-de border-dashed rounded-[6px]",
						)}
						justifyContent="center"
					>
						<FansView width={59.99} height={67.11}>
							<EditNoteSvg />
						</FansView>
						<FansGap height={19.5} />
						<FansText fontSize={17}>
							{file === "" ? (
								<>
									Drop here or{" "}
									<FansText color="purple-a8">
										browse
									</FansText>
								</>
							) : (
								file
							)}
						</FansText>
					</FansView>
				</TouchableOpacity>
				<FansGap height={38.5} />
				<FansPurpleButton title="Send" />
			</FansView>
		</FansScreen3>
	);
};

export default LawEnforcementGuideScreen;
