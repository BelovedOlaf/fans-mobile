import {
	FansView,
	FansDivider,
	FansDropdown,
	FansCountryDropdown,
	FansIconButton,
	FansText,
} from "@components/controls";
import FileDropzone from "@components/common/fileDropzone";
import CustomMaskInput from "@components/common/customMaskInput";
import RoundButton from "@components/common/RoundButton";
import RoundTextInput from "@components/common/RoundTextInput";
import CustomTopNavBar from "@components/common/customTopNavBar";
import AppLayout, { LayoutContentsContainer } from "@components/common/layout";
import { TrashSvg, DocumentEditSvg } from "@assets/svgs/common";
import { MediaSetImage } from "@assets/svgs/images";
import getSocialIconComponent from "@components/socialIcons";

import tw from "@lib/tailwind";
import { MediaType, ComponentSizeTypes } from "@usertypes/commonEnums";
import { ProfileNavigationStacks } from "@usertypes/navigations";
import { ISocialLink, IPickerMedia } from "@usertypes/types";
import states from "@helper/geo/state.json";
import { documentTypes } from "@constants/common";
import useDocumentPicker from "@utils/useDocumentPicker";

import React, { FC, useState, useMemo } from "react";
import { Image, ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

export const socialAccounts = [
	{
		id: "0",
		title: "Instagram username",
		url: "",
		provider: "instagram",
	},
	{
		id: "0",
		title: "X link",
		url: "",
		provider: "xlink",
	},
	{
		id: "0",
		title: "Other link",
		url: "",
		provider: "website",
	},
];

interface UploadedFileProps {
	mediaType: MediaType;
	onDelete: () => void;
}

export const UploadedFile: FC<UploadedFileProps> = (props) => {
	const { mediaType, onDelete } = props;
	return (
		<FansView
			border={1}
			borderRadius={15}
			borderColor="grey-f0"
			height={110}
			flexDirection="row"
			padding={{ r: 12 }}
		>
			<FansView
				width={94}
				height={97}
				margin={{ r: 18 }}
				border={1}
				borderColor="grey-f0"
				style={tw.style("rounded-l-[7px]")}
				alignItems="center"
				justifyContent="center"
			>
				{mediaType === MediaType.Form ? (
					<DocumentEditSvg size={50} />
				) : (
					<MediaSetImage size={55} />
				)}
			</FansView>
			<FansView flex="1" style={tw.style("my-auto")}>
				<FansText
					fontSize={16}
					lineHeight={21}
					style={tw.style("font-semibold mb-[1.5px]")}
				>
					photo1.png
				</FansText>
				<FansText color="grey-70" fontSize={16}>
					20 MB
				</FansText>
			</FansView>
			<FansIconButton onPress={onDelete} style={tw.style("my-auto")}>
				<TrashSvg size={15} color="#eb2121" />
			</FansIconButton>
		</FansView>
	);
};

const AgeVerificationFormScreen = (
	props: NativeStackScreenProps<ProfileNavigationStacks, "AgeVerifyForm">,
) => {
	const { navigation } = props;
	const insets = useSafeAreaInsets();
	const { useImagePicker } = useDocumentPicker();

	const [country, setCountry] = useState("");
	const [state, setState] = useState("");
	const [birthday, setBirthday] = useState("");
	const [documentType, setDocumentType] = useState("");
	const [images, setImages] = useState<IPickerMedia[]>([]);

	const stateOptions = useMemo(
		() =>
			states
				.filter((s) => s.countryCode === country)
				.sort((a, b) => a.name.localeCompare(b.name))
				.map((el) => ({
					id: el.name,
					text: el.name,
				})),
		[country],
	);

	const handleSubmit = () => {
		navigation.navigate("AgeVerifyFailed");
		// navigation.navigate("AgeVerifyPending");
	};

	const onChangeSocial = (social: ISocialLink, val: string) => {};

	const onOpenImages = async () => {
		const result = await useImagePicker(true);
		if (result?.ok) {
			setImages([...images, ...(result.data ?? [])]);
		}
	};

	return (
		<AppLayout>
			<FansView flex="1">
				<ScrollView style={tw.style("flex-1")}>
					<LayoutContentsContainer>
						<CustomTopNavBar
							title="Age verification"
							onClickLeft={() => navigation.goBack()}
						/>
						<FansView
							padding={{ x: 18, t: 24, b: insets.bottom + 24 }}
						>
							<FansView margin={{ b: 32 }}>
								<FansText
									fontSize={17}
									lineHeight={22}
									style={tw.style("font-semibold mb-[15px]")}
								>
									Personal info
								</FansText>
								<FansView gap={9} margin={{ b: 40 }}>
									<RoundTextInput
										placeholder="First name"
										maxLength={50}
									/>
									<RoundTextInput
										placeholder="Last name"
										maxLength={50}
									/>
								</FansView>
								<FansView gap={9}>
									<FansCountryDropdown
										data={[]}
										value={country}
										onSelect={(val) =>
											setCountry(val.id as string)
										}
									/>
									<RoundTextInput
										placeholder="Address"
										maxLength={100}
									/>
									<RoundTextInput
										placeholder="City"
										maxLength={100}
									/>
									<FansDropdown
										data={stateOptions}
										value={state}
										onSelect={(val) =>
											setState(val.id as string)
										}
										dropdownStyle={{
											defaultButtonText:
												"Select State / Province",
										}}
									/>
									<RoundTextInput
										placeholder="Zip code"
										maxLength={50}
									/>
								</FansView>
							</FansView>

							<FansView margin={{ b: 32 }}>
								<FansText
									fontSize={17}
									lineHeight={22}
									style={tw.style("font-semibold mb-[15px]")}
								>
									Social media accounts (optional)
								</FansText>

								<FansView gap={9}>
									{socialAccounts.map((social) => (
										<FansView
											position="relative"
											key={social.provider}
										>
											<RoundTextInput
												value={social.url}
												onChangeText={(val) =>
													onChangeSocial(social, val)
												}
												customStyles="pl-12"
												autoCapitalize="none"
												placeholder={social.title}
												maxLength={100}
											/>
											<FansView
												position="absolute"
												style={tw.style("top-1 left-1")}
											>
												{getSocialIconComponent({
													iconName: social.provider,
													size: ComponentSizeTypes.sm,
												})}
											</FansView>
										</FansView>
									))}
								</FansView>
							</FansView>

							<FansView margin={{ b: 40 }}>
								<FansText
									fontSize={17}
									lineHeight={22}
									style={tw.style("font-semibold mb-[15px]")}
								>
									Birth date
								</FansText>
								<CustomMaskInput
									value={birthday}
									onChangeText={(val) => setBirthday(val)}
									placeholder="MM/DD/YYYY"
									helperText="Invalid birth date"
									type="date"
								/>
							</FansView>

							<FansDivider color="fans-grey-f0" />

							<FansView margin={{ t: 30, b: 32 }}>
								<FansText
									fontSize={17}
									lineHeight={22}
									style={tw.style("font-semibold mb-[15px]")}
								>
									Document type
								</FansText>
								<FansDropdown
									data={documentTypes}
									value={documentType}
									onSelect={(val) =>
										setDocumentType(val.id as string)
									}
									dropdownStyle={{
										defaultButtonText: "Select",
									}}
								/>
							</FansView>

							<FansView margin={{ b: 32 }}>
								<FansText
									fontSize={17}
									lineHeight={22}
									style={tw.style("font-semibold mb-[11px]")}
								>
									Photo of your ID
								</FansText>
								<FansText
									color="grey-70"
									fontSize={16}
									lineHeight={21}
									style={tw.style("mb-[18px]")}
								>
									Upload a photo of your picture ID Document
									(e.g. ID card). It must be valid in date.
									Only PNG or JPEG files accepted, under 7 MB
								</FansText>
								<FansView
									borderRadius={15}
									background="fans-purple-light"
									padding={17}
									flexDirection="row"
									alignItems="center"
									gap={16}
								>
									<FansView
										width={95}
										height={95}
										background="fans-white"
										borderRadius={7}
										alignItems="center"
										justifyContent="center"
									>
										<Image
											source={require("@assets/images/common/id-card.png")}
											style={{
												width: 85,
												height: 42.5,
											}}
										/>
									</FansView>
									<FansText
										color="purple-a8"
										fontSize={16}
										lineHeight={21}
									>
										Submit a clear, unedited, in-frame and
										full-color ID photo, with clear text and
										minimal background
									</FansText>
								</FansView>
								<FansView margin={{ t: 9 }} gap={9}>
									<UploadedFile
										mediaType={MediaType.Image}
										onDelete={() => {}}
									/>
									<FileDropzone
										onPress={onOpenImages}
										fileCounts={images.length}
										textButtonMode
									/>
								</FansView>
							</FansView>

							<FansView>
								<FansText
									fontSize={17}
									lineHeight={22}
									style={tw.style("font-semibold mb-[11px]")}
								>
									Photo of you holding your ID
								</FansText>
								<FansText
									color="grey-70"
									fontSize={16}
									lineHeight={21}
									style={tw.style("mb-[18px]")}
								>
									Upload a photo holding your ID, ensuring
									your face is clearly visible (e.g. a
									selfie). Only PNG or JPEG files accepted,
									under 7 MB
								</FansText>
								<FansView
									borderRadius={15}
									background="fans-purple-light"
									padding={17}
									flexDirection="row"
									alignItems="center"
									gap={16}
								>
									<FansView
										width={95}
										height={95}
										background="fans-white"
										borderRadius={7}
										alignItems="center"
										justifyContent="center"
									>
										<Image
											source={require("@assets/images/common/holding-id-card.png")}
											style={{
												width: 95,
												height: 95,
											}}
										/>
									</FansView>
									<FansText
										color="purple-a8"
										fontSize={16}
										lineHeight={21}
									>
										Submit a clear, unedited, in-frame and
										full-color ID photo, with clear text and
										minimal background
									</FansText>
								</FansView>
								<FansView margin={{ t: 9 }} gap={9}>
									<UploadedFile
										mediaType={MediaType.Image}
										onDelete={() => {}}
									/>
									<FileDropzone
										onPress={onOpenImages}
										fileCounts={images.length}
										textButtonMode
									/>
								</FansView>
							</FansView>

							<FansDivider
								color="fans-grey-f0"
								style={tw.style("mt-9 mb-[30px]")}
							/>

							<FansView margin={{ b: 38 }}>
								<FansText
									fontSize={17}
									lineHeight={22}
									style={tw.style("font-semibold mb-[11px]")}
								>
									Release forms
								</FansText>
								<FansText
									color="grey-70"
									fontSize={16}
									lineHeight={21}
									style={tw.style("mb-[30px]")}
								>
									If your content contains someone other than
									you, you will need to provide a copy or
									their photo ID and release documents before
									the content can be posted. Submitted
									documents must be a high quality photo or a
									scanned copy, signed by the additional
									participant for the account holder.
								</FansText>
								<FansText
									color="purple-a8"
									fontSize={17}
									lineHeight={22}
									style={tw.style("font-semibold")}
								>
									Sample of the release form
								</FansText>
								<FansView margin={{ t: 20 }} gap={9}>
									<UploadedFile
										mediaType={MediaType.Form}
										onDelete={() => {}}
									/>
									<FileDropzone
										onPress={onOpenImages}
										fileCounts={images.length}
										textButtonMode
										mediaType={MediaType.Form}
										buttonText="Drop files here"
									/>
								</FansView>
							</FansView>

							<RoundButton onPress={handleSubmit}>
								Send for approval
							</RoundButton>
						</FansView>
					</LayoutContentsContainer>
				</ScrollView>
			</FansView>
		</AppLayout>
	);
};

export default AgeVerificationFormScreen;
