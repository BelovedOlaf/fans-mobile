import { ChevronRightSvg, PhotoCameraSvg } from "@assets/svgs/common";
import AvatarWithStatus from "@components/common/AvatarWithStatus";
import FormControl from "@components/common/FormControl";
import RoundButton from "@components/common/RoundButton";
import RoundTextInput from "@components/common/RoundTextInput";
import CustomMaskInput from "@components/common/customMaskInput";
import AppLayout, { LayoutContentsContainer } from "@components/common/layout";
import { FansView } from "@components/controls";
import { FypText, FypNullableView } from "@components/common/base";
import {
	EditSubLink,
	ProfileCarousel,
	SocialMediaLink,
	TopActions,
	ProfileThreeDotsDialog,
} from "@components/profiles";

import tw from "@lib/tailwind";
import { PROFILE_THREE_DOTS_DIALOG_ID } from "@constants/modal";
import {
	ProfileActionType,
	useAppContext,
	ModalActionType,
} from "@context/useAppContext";
import {
	updateMyProfile,
	updateProfileAvatar,
	updateSocialLinks,
} from "@helper/endpoints/profile/apis";
import { updateSetting } from "@helper/endpoints";
import { ProfileReqBody } from "@helper/endpoints/profile/schemas";
import {
	ComponentSizeTypes,
	MediaType,
	RoundButtonType,
} from "@usertypes/commonEnums";
import { ProfileNavigationStacks } from "@usertypes/navigations";
import useUploadFiles from "@utils/useUploadFile";
import { useFeatureGates } from "@state/featureGates";
import useDocumentPicker from "@utils/useDocumentPicker";

import moment from "moment";
import React, { useCallback, useEffect, useState } from "react";
import { Pressable, ScrollView, View } from "react-native";
import Collapsible from "react-native-collapsible";
import { IconButton, ActivityIndicator } from "react-native-paper";
import Toast from "react-native-toast-message";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

const EditProfileScreen = (
	props: NativeStackScreenProps<ProfileNavigationStacks, "Edit">,
) => {
	const { navigation } = props;
	const { state, dispatch } = useAppContext();

	const profile = state.profile;
	const { userInfo } = state.user;
	const { socialLinks } = profile;
	const datePattern =
		/^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/(19|20)\d{2}$/;

	const { useImagePicker } = useDocumentPicker();
	const { uploadFiles } = useUploadFiles();
	const featureGates = useFeatureGates();
	const job2Enabled = featureGates.has("2023_10-swan-job-2");

	const [formData, setFormData] = useState({
		displayName: "",
		profileLink: "",
		birthday: "",
		location: "",
		bio: "",
	});

	const [isSubmitted, setIsSubmitted] = useState(false);
	const [hideSocials, setHideSocials] = useState(true);
	const [inUpdatingAvatar, setInUpdatingAvatar] = useState(false);
	const [inProgress, setInProgress] = useState(false);

	const onChangeField = (name: string, value: string) => {
		setFormData({
			...formData,
			[name]: value,
		});
	};

	const handleSave = async () => {
		setIsSubmitted(true);
		if (!datePattern.test(formData.birthday) && formData.birthday !== "") {
			return false;
		}

		const currentYear = new Date().getFullYear();
		const age = currentYear - parseInt(formData.birthday.split("/")[2]);
		if (age < 18) {
			Toast.show({
				type: "error",
				text1: "To use our platform you have to be 18 years or older.",
			});
			return;
		}

		if (formData.displayName === "" || formData.profileLink === "") {
			return;
		}

		setInProgress(true);

		/*
		const usernameRes = await updateSetting({
			username: formData.profileLink,
		});
		if (!usernameRes.ok) {
			Toast.show({
				type: "error",
				text1: usernameRes.data.message,
			});
			setInProgress(false);
			return;
		}
		*/

		const updatedProfileLink =
			process.env.API_URL?.split("/api")[0] + "/" + formData.profileLink;
		const birthday = moment(formData.birthday)
			.utcOffset("+000", true)
			.toDate();
		const postbody: ProfileReqBody = {
			displayName: formData.displayName,
			bio: formData.bio,
			location: formData.location,
			birthday: birthday,
		};
		if (
			profile.profileLink &&
			profile.profileLink.split("/").slice(-1)[0] !== formData.profileLink
		) {
			postbody.profileLink = updatedProfileLink;
		}
		const resp = await updateMyProfile(postbody);

		if (resp.ok) {
			dispatch.setProfile({
				type: ProfileActionType.updateProfile,
				data: {
					...formData,
					displayName: formData.displayName.slice(0, 50),
					profileLink: updatedProfileLink,
					birthday: formData.birthday,
				},
			});
			navigation.goBack();
		} else {
			Toast.show({
				type: "error",
				text1: resp.data.message,
			});
		}
		setInProgress(false);
	};

	const handleDiscard = () => {
		navigation.goBack();
	};

	const handleEditSocialMedia = () => {
		navigation.navigate("SocialLinks");
	};

	const handleDeleteSocialMedia = async (id: string) => {
		const postbody = {
			links: profile.socialLinks.map((social) => ({
				provider: social.provider,
				url: social.id === id ? "" : social.url,
			})),
		};

		dispatch.setShowLoading();

		const resp = await updateSocialLinks(postbody);

		if (resp.ok) {
			dispatch.setHideLoading();
			dispatch.setProfile({
				type: ProfileActionType.updateSocialLinks,
				data: resp.data.socialLinks,
			});
		} else {
			Toast.show({
				type: "error",
				text1: "Failed to add links",
			});
		}
	};

	const onChangeAvatar = async () => {
		const result = await useImagePicker();
		if (result?.ok) {
			const medias = result.data ?? [];
			if (medias.length > 0) {
				setInUpdatingAvatar(true);
				const resp = await uploadFiles([
					{ uri: medias[0].uri, type: MediaType.Image },
				]);
				if (resp?.ok) {
					const avatarResp = await updateProfileAvatar({
						avatar: resp.data[0].url as string,
					});
					if (avatarResp.ok) {
						dispatch.fetchUserInfo();
					} else {
						Toast.show({
							type: "error",
							text1: avatarResp.data.message,
						});
					}
				}
				setInUpdatingAvatar(false);
			}
		} else {
			Toast.show({
				type: "error",
				text1: result?.message ?? "",
			});
			setInUpdatingAvatar(false);
		}
	};

	const onClickThreeDots = useCallback(() => {
		dispatch.setModal({
			type: ModalActionType.showModal,
			data: { id: PROFILE_THREE_DOTS_DIALOG_ID, show: true },
		});
	}, []);

	useEffect(() => {
		let _birthday = "";
		if (profile.birthday) {
			const [year, month, day] = new Date(profile.birthday)
				.toJSON()
				.split("T")[0]
				.split("-");
			_birthday = `${month}/${day}/${year}`;
		}
		setFormData({
			displayName: profile.displayName,
			profileLink: profile.profileLink
				? profile.profileLink.split("/").slice(-1)[0]
				: "",
			birthday: _birthday,
			location: profile.location,
			bio: profile.bio,
		});
	}, []);

	return (
		<AppLayout
			title="Edit Profile | FYP.Fans"
			description="FYP.Fans allows creators to make income doing what they love!"
		>
			<View style={tw.style("flex-1")}>
				<ScrollView style={tw.style("flex-1")}>
					<LayoutContentsContainer paddingTop={0}>
						<View style={tw.style("pb-[78px] relative bg-white")}>
							<TopActions
								onClickBack={() => {
									navigation.goBack();
								}}
								onClickMenu={onClickThreeDots}
							/>

							<View style={tw.style("relative bg-white")}>
								<ProfileCarousel images={profile.cover} />
								<View
									style={tw.style(
										"absolute top-[85px] left-0 w-full justify-center flex-row gap-x-2",
									)}
								>
									<IconButton
										icon={() => (
											<PhotoCameraSvg
												width={18.81}
												height={17}
												color="#000"
											/>
										)}
										style={tw.style("m-0 w-10 h-10")}
										containerColor="rgba(255,255,255,0.75)"
										onPress={() =>
											navigation.navigate("Cover")
										}
									/>
								</View>
							</View>

							<View style={tw.style("px-[18px] mb-8")}>
								<View
									style={tw.style(
										"flex-row items-end mt-[-30px] justify-between mb-[18px]",
									)}
								>
									<View style={tw.style("relative")}>
										<AvatarWithStatus
											size={79}
											avatar={userInfo.avatar}
										/>
										{inUpdatingAvatar ? (
											<ActivityIndicator
												animating={true}
												color="#fff"
												style={[
													tw.style(
														"absolute top-1/2 left-1/2",
													),
													{
														transform: [
															{
																translateX: -12,
															},
															{
																translateY: -12,
															},
														],
													},
												]}
											/>
										) : (
											<IconButton
												onPress={onChangeAvatar}
												icon={() => (
													<PhotoCameraSvg
														width={18.81}
														height={17}
														color="#000"
													/>
												)}
												style={[
													tw.style(
														"m-0 w-[34px] h-[34px] absolute top-1/2 left-1/2",
													),
													{
														transform: [
															{
																translateX: -17,
															},
															{
																translateY: -17,
															},
														],
													},
												]}
												containerColor="rgba(255,255,255,0.75)"
											/>
										)}
									</View>

									<View
										style={tw.style("flex-row gap-x-[7px]")}
									>
										<RoundButton
											size={ComponentSizeTypes.md}
											variant={
												RoundButtonType.OUTLINE_PRIMARY
											}
											onPress={handleDiscard}
										>
											Discard
										</RoundButton>
										<RoundButton
											onPress={handleSave}
											size={ComponentSizeTypes.md}
											customStyles="flex-row items-center"
										>
											<View
												style={tw.style(
													"flex-row items-center",
												)}
											>
												<ActivityIndicator
													animating={true}
													size={16}
													color="#fff"
													style={tw.style(
														"mr-1",
														!inProgress && "hidden",
													)}
												/>
												Save
											</View>
										</RoundButton>
									</View>
								</View>

								<FormControl
									label="Display name"
									value={formData.displayName}
									onChangeText={(text: string) =>
										onChangeField("displayName", text)
									}
									placeholder=""
									hasError={
										isSubmitted &&
										formData.displayName === ""
									}
									validateString="Please enter display name"
									styles="mb-6"
									maxLength={50}
								/>

								<View style={tw.style("mb-6")}>
									<FypText
										fontSize={17}
										lineHeight={22}
										fontWeight={600}
										style={tw.style("mb-[14px]")}
									>
										Profile link
									</FypText>
									<FansView>
										<View style={tw.style("flex-row")}>
											<FansView padding={{ t: 9 }}>
												<FypText
													fontSize={18}
													lineHeight={24}
													color="purple"
												>
													fyp.fans/
												</FypText>
											</FansView>

											<FansView
												flex="1"
												margin={{ l: 14 }}
											>
												<RoundTextInput
													value={formData.profileLink}
													onChangeText={(
														text: string,
													) =>
														onChangeField(
															"profileLink",
															text,
														)
													}
													placeholder=""
													customStyles="text-fans-purple"
													autoCapitalize="none"
													hasError={
														isSubmitted &&
														formData.profileLink ===
															""
													}
													helperText="Please enter link name"
													maxLength={100}
												/>
											</FansView>
										</View>
									</FansView>
								</View>

								<FormControl
									label="Bio"
									value={formData.bio}
									onChangeText={(val: string) =>
										onChangeField("bio", val)
									}
									placeholder=""
									isTextArea
									styles="mb-6"
									maxLength={1000}
								/>
								<FormControl
									label="Location"
									value={formData.location}
									onChangeText={(val: string) =>
										onChangeField("location", val)
									}
									placeholder="Enter location"
									styles="mb-6"
									maxLength={50}
								/>

								<View style={tw.style("")}>
									<FypText
										fontSize={17}
										lineHeight={22}
										fontWeight={600}
										style={tw.style("mb-[14px]")}
									>
										Birth date
									</FypText>
									<CustomMaskInput
										value={formData.birthday}
										onChangeText={(val) =>
											onChangeField("birthday", val)
										}
										placeholder="MM/DD/YYYY"
										hasError={
											isSubmitted &&
											!datePattern.test(
												formData.birthday,
											) &&
											formData.birthday !== ""
										}
										helperText="Invalid birth date"
										type="date"
									/>
								</View>
							</View>

							<View style={tw.style("gap-y-1 mb-5")}>
								<EditSubLink
									title="Subscription plans & bundles"
									onPress={() => {
										navigation.navigate("Subscription");
									}}
								/>

								<View>
									<Pressable
										style={tw.style(
											"flex-row items-center justify-between py-[15px] px-[18px]",
										)}
										onPress={() =>
											setHideSocials(!hideSocials)
										}
									>
										<FypText
											fontSize={17}
											lineHeight={22}
											fontWeight={600}
										>
											Social media
										</FypText>
										{hideSocials && (
											<FansView
												style={tw.style(
													"w-[8.14px] h-[14.28px]",
												)}
											>
												<ChevronRightSvg
													color={tw.color(
														"fans-grey-dark",
													)}
												/>
											</FansView>
										)}
									</Pressable>
									<Collapsible collapsed={hideSocials}>
										<View
											style={tw.style("px-[18px] pb-3")}
										>
											<View>
												{socialLinks
													.filter(
														(el) => el.url !== "",
													)
													.map((social) => (
														<SocialMediaLink
															key={social.id}
															data={social}
															onClickEdit={
																handleEditSocialMedia
															}
															onClickDelete={() =>
																handleDeleteSocialMedia(
																	social.id,
																)
															}
														/>
													))}
											</View>
											<RoundButton
												variant={
													RoundButtonType.OUTLINE_PRIMARY
												}
												customStyles="mt-[18px]"
												onPress={() =>
													navigation.navigate(
														"SocialLinks",
													)
												}
											>
												Link social media
											</RoundButton>
										</View>
									</Collapsible>
								</View>
								<FypNullableView visible={job2Enabled}>
									<EditSubLink
										title="Tracking links"
										onPress={() => {
											navigation.navigate(
												"TrackingLinks",
											);
										}}
									/>
								</FypNullableView>

								<EditSubLink
									title="Preview"
									onPress={() => {
										navigation.navigate("Preview");
									}}
								/>
								<EditSubLink
									title="Highlights"
									onPress={() => {
										navigation.navigate("Highlights");
									}}
								/>
								<EditSubLink
									title="Categories"
									onPress={() => {
										navigation.navigate("Categories");
									}}
								/>
								<EditSubLink
									title="Payout Setup"
									onPress={() => {
										navigation.navigate("GetPaid");
									}}
								/>
								<EditSubLink
									title="Fans levels / roles"
									onPress={() => {
										navigation.navigate("Levels");
									}}
								/>
								<FypNullableView visible={job2Enabled}>
									<EditSubLink
										title="Badge system"
										onPress={() => {
											navigation.navigate("Badge");
										}}
									/>
								</FypNullableView>
							</View>

							<View
								style={tw.style(
									"flex-row justify-between gap-x-[14px] px-[18px]",
								)}
							>
								<View style={tw.style("flex-1")}>
									<RoundButton
										variant={
											RoundButtonType.OUTLINE_PRIMARY
										}
										onPress={handleDiscard}
									>
										Discard
									</RoundButton>
								</View>
								<View style={tw.style("flex-1")}>
									<RoundButton
										onPress={handleSave}
										loading={inProgress}
									>
										Save
									</RoundButton>
								</View>
							</View>
						</View>
					</LayoutContentsContainer>
				</ScrollView>
			</View>
			<ProfileThreeDotsDialog navigation={navigation} />
		</AppLayout>
	);
};

export default EditProfileScreen;
