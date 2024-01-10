import {
	Check3Svg,
	CheckSvg,
	ErrorSvg,
	OutlinedInfoSvg,
	RejectSvg,
} from "@assets/svgs/common";
import RoundButton from "@components/common/RoundButton";
import RoundTextInput from "@components/common/RoundTextInput";
import CustomRadio from "@components/common/customRadio";
import CustomTopNavBar from "@components/common/customTopNavBar";
import AppLayout, { LayoutContentsContainer } from "@components/common/layout";
import { FansDivider, FansText, FansView } from "@components/controls";
import { ProfileActionType, useAppContext } from "@context/useAppContext";
import {
	createAgeVerifyOndato,
	createMigration,
} from "@helper/endpoints/profile/apis";
import tw from "@lib/tailwind";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import {
	ComponentSizeTypes,
	RoundButtonType,
	StorageKeyTypes,
} from "@usertypes/commonEnums";
import { ProfileNavigationStacks } from "@usertypes/navigations";
import { AgeVerifyStatus } from "@usertypes/types";
import { getObjectStorage, setObjectStorage } from "@utils/storage";
import { validateMigrationLink } from "@utils/stringHelper";
import { useRouter } from "expo-router";
import { openBrowserAsync } from "expo-web-browser";
import React, { Fragment, useEffect, useState } from "react";
import {
	ActivityIndicator,
	Platform,
	ScrollView,
	TouchableOpacity,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";

const AgeVerifyForm = (props: {
	ageVerifyId?: string;
	ageVerifyStatus?: AgeVerifyStatus;
	onClickAgeVerify?: () => void;
}) => {
	const { ageVerifyId, ageVerifyStatus, onClickAgeVerify } = props;

	return (
		<Fragment>
			<FansView
				padding={{ y: 18, x: 20 }}
				borderRadius={15}
				margin={{ b: 18 }}
				background="fans-purple"
			>
				<FansView
					style={tw`mb-3`}
					flexDirection="row"
					alignItems="center"
				>
					<OutlinedInfoSvg width={16} height={16} style={tw`mr-2`} />
					<FansText
						color="white"
						fontSize={16}
						lineHeight={28}
						fontFamily={"inter-semibold"}
					>
						FYP.Fans requires all adult creators to verify their age
						with a valid photo ID.
					</FansText>
				</FansView>
				<FansText color="white" fontSize={16} lineHeight={21}>
					We respect your privacy. The data you provide as part of the
					process is handled by our partner, Ondato UAB, and gets
					processed by FYP.Fans for compliance with the law according
					to our privacy policy.
				</FansText>

				<FansText
					style={tw`mt-2`}
					color="white"
					fontSize={16}
					lineHeight={21}
				>
					Pressing the button below will redirect you to our partner's
					site to handle the verification process.
				</FansText>

				{(!ageVerifyStatus ||
					ageVerifyStatus === "PENDING" ||
					ageVerifyStatus === "CANCELLED") && (
					<FansView margin={{ t: 12 }} style={tw.style("mx-auto")}>
						<RoundButton
							id="verify-age-button"
							variant={RoundButtonType.CONTAINED_WHITE}
							onPress={onClickAgeVerify}
							size={ComponentSizeTypes.md}
						>
							Proceed with verification
						</RoundButton>
					</FansView>
				)}
			</FansView>
			{ageVerifyStatus && (
				<FansView
					padding={{ x: 20, t: 18, b: 20 }}
					borderRadius={15}
					margin={{ b: 40 }}
					background="fans-purple-light"
				>
					<FansText
						color="purple"
						fontSize={16}
						lineHeight={28}
						fontFamily={"inter-semibold"}
					>
						Your ID verification is in progress.
					</FansText>
					<FansText color="purple-a8" fontSize={16} lineHeight={21}>
						The status is updated in real time. Please wait for the
						verification to complete.
					</FansText>

					{ageVerifyStatus && (
						<FansView
							style={tw`mt-2`}
							flexDirection="row"
							alignItems="center"
						>
							{ageVerifyStatus === "PENDING" && (
								<ActivityIndicator
									animating={true}
									style={tw`mr-2`}
								/>
							)}
							{(ageVerifyStatus === "CANCELLED" ||
								ageVerifyStatus === "REJECTED") && (
								<OutlinedInfoSvg
									color={tw.color("fans-purple")}
									width={16}
									height={16}
									style={tw`mr-2`}
								/>
							)}
							{ageVerifyStatus === "APPROVED" && (
								<CheckSvg
									color={tw.color("fans-purple")}
									width={16}
									height={16}
									style={tw`mr-2`}
								/>
							)}
							<FansText color="purple" fontSize={16}>
								Status: {ageVerifyStatus}
							</FansText>
						</FansView>
					)}
				</FansView>
			)}
			{/* <FansView
		padding={{ x: 20, t: 18, b: 20 }}
		borderRadius={15}
		margin={{ b: 40 }}
		background="fans-purple-light"
	>
		<FansText
			color="purple-a8"
			fontSize={16}
			lineHeight={21}
			textAlign="center"
		>
			<OutlinedInfoSvg
				width={14.3}
				height={14.3}
				color="#a854f5"
			/>{" "}
			Adult creators must sign up and
			use the web version. Mobile app
			is restricted to SFW content
			only.
		</FansText>
	</FansView> */}
		</Fragment>
	);
};

const CreateNameScreen = (
	props: NativeStackScreenProps<ProfileNavigationStacks, "ProfileName">,
) => {
	const { navigation } = props;
	const router = useRouter();
	const insets = useSafeAreaInsets();
	const { state, dispatch } = useAppContext();
	const [displayName, setDisplayName] = useState("");
	const [isSubmitted, setIsSubmitted] = useState(false);
	const [migrationLink, setMigrationLink] = useState("");
	const [migrationLinkError, setMigrationLinkError] = useState(false);
	const [isSexuallyPost, setIsSexuallyPost] = useState<boolean | null>(null);
	const ageVerifyId = state.user.userInfo?.ageVerifyId;
	const ageVerifyStatus = state.user.userInfo?.ageVerifyStatus;

	const onClickMigrateInfo = async () => {
		if (migrationLink !== "" && !validateMigrationLink(migrationLink)) {
			setMigrationLinkError(true);
			return;
		}
		setMigrationLinkError(false);

		dispatch.setShowLoading();

		const resp = await createMigration({ migrationLink: migrationLink });
		if (resp.ok) {
			Toast.show({
				type: "success",
				text1: "Migrated successfully",
			});
		} else {
			Toast.show({
				type: "error",
				text1: resp.data.message,
			});
		}

		dispatch.setHideLoading();
	};

	const onClickContinue = () => {
		setIsSubmitted(true);
		if (displayName === "") {
			return;
		}
		if (migrationLink !== "" && !validateMigrationLink(migrationLink)) {
			setMigrationLinkError(true);
			return;
		}
		// if (isSexuallyPost === null) {
		// 	Toast.show({
		// 		type: "error",
		// 		text1: "Please confirm if your content is 18+ or not.",
		// 	});
		// 	return;
		// }
		dispatch.setProfile({
			type: ProfileActionType.updateProfile,
			data: {
				displayName: displayName,
				migrationLink: migrationLink,
				supportNsfw: !!isSexuallyPost,
			},
		});
		setMigrationLinkError(false);
		navigation.navigate("ProfileStyle");

		setObjectStorage(StorageKeyTypes.CreateProfileIsNSFW, null);
	};

	const onClickGoBack = () => {
		router.push("/posts");
	};

	const onClickAgeVerify = async () => {
		// navigation.navigate("AgeVerifyForm");
		try {
			dispatch.setShowLoading();
			const resp = await createAgeVerifyOndato({});
			if (!resp.ok) {
				Toast.show({
					type: "error",
					text1: resp.data.message,
				});
				return;
			}

			await setObjectStorage(
				StorageKeyTypes.CreateProfileIsNSFW,
				isSexuallyPost,
			);

			if (Platform.OS === "web") {
				window.location.href = resp.data.url;
			} else {
				const result = await openBrowserAsync(resp.data.url);
				console.log(result);
			}
		} finally {
			dispatch.setHideLoading();
		}
	};

	const onKeyPress = (keyValue: string) => {
		if (keyValue === "Enter") {
			onClickContinue();
		}
	};

	const onGoToTerms = () => {
		router.push("/terms");
	};

	useEffect(() => {
		setDisplayName(state.profile.displayName);
		setMigrationLink(state.profile.migrationLink);
		setIsSexuallyPost(state.profile.supportNsfw);

		getObjectStorage(StorageKeyTypes.CreateProfileIsNSFW).then((val) => {
			if (typeof val === "boolean") {
				setIsSexuallyPost(val);
			}
		});
	}, []);

	return (
		<AppLayout>
			<FansView flex="1">
				<ScrollView style={tw.style("flex-1")}>
					<LayoutContentsContainer>
						<CustomTopNavBar
							title="Name your page"
							onClickLeft={() => router.replace("/posts")}
							onClickRight={onClickContinue}
							rightLabel="Next"
						/>
						<FansView
							padding={{ x: 18, t: 24, b: insets.bottom + 35 }}
						>
							<FansView margin={{ b: 40 }}>
								<FansText
									fontSize={16}
									lineHeight={28}
									textAlign="center"
								>
									Your page title is your digital identity -
									it's how users recognize and locate you.
									{"\n"}You can always change it later
								</FansText>
							</FansView>

							<FansView margin={{ b: 32 }}>
								<RoundTextInput
									value={displayName}
									onChangeText={(val) => setDisplayName(val)}
									placeholder="Display name"
									placeholderTextColor="#000"
									autoCapitalize="none"
									hasError={isSubmitted && displayName === ""}
									helperText="Display name is required"
									onKeyPress={(e) =>
										onKeyPress(e.nativeEvent.key)
									}
									maxLength={50}
								/>
							</FansView>

							<FansView margin={{ b: 24 }}>
								<FansText
									fontSize={17}
									lineHeight={21}
									style={tw.style("mb-[10px] font-semibold")}
								>
									Is your content sexually explicit/adults
									only?
								</FansText>

								<FansView
									flexDirection="row"
									height={52}
									alignItems="center"
								>
									<CustomRadio
										label="Yes"
										onPress={() => setIsSexuallyPost(true)}
										checked={isSexuallyPost === true}
									/>
								</FansView>
								<FansDivider style={tw.style("my-1.5")} />
								<FansView
									flexDirection="row"
									height={52}
									alignItems="center"
								>
									<CustomRadio
										label="No"
										onPress={() => setIsSexuallyPost(false)}
										checked={isSexuallyPost === false}
									/>
								</FansView>
							</FansView>

							{isSexuallyPost && (
								<AgeVerifyForm
									ageVerifyId={ageVerifyId}
									ageVerifyStatus={ageVerifyStatus}
									onClickAgeVerify={onClickAgeVerify}
								/>
							)}

							{/* {!isSexuallyPost && (
								<FansView
									padding={{ x: 20, t: 18, b: 20 }}
									margin={{ b: 40 }}
									borderRadius={15}
									background="fans-purple-light"
								>
									<FansText
										color="purple-a8"
										fontSize={16}
										lineHeight={21}
										textAlign="center"
									>
										<OutlinedInfoSvg
											width={14.3}
											height={14.3}
											color="#a854f5"
										/>{" "}
										Posting explicit content without age
										verification leads to instant account
										termination and legal action. Using
										FYP.Fans means you're over 18 and accept
										our{" "}
										<FansText onPress={onGoToTerms}>
											Terms of Service
										</FansText>
									</FansText>
								</FansView>
							)} */}

							<FansView>
								<RoundButton
									variant={RoundButtonType.PRIMARY}
									onPress={onClickContinue}
									disabled={
										!!(
											isSexuallyPost &&
											ageVerifyStatus !== "APPROVED"
										)
									}
								>
									Continue
								</RoundButton>

								<FansView
									flexDirection="row"
									alignItems="center"
									justifyContent="center"
									margin={{ t: 14 }}
								>
									<FansText
										fontSize={17}
										lineHeight={22}
										style={tw.style("font-semibold")}
									>
										Not a creator?
									</FansText>
									<TouchableOpacity
										style={tw.style("ml-1")}
										onPress={onClickGoBack}
									>
										<FansText
											color="purple-a8"
											fontSize={17}
											lineHeight={22}
										>
											Go back
										</FansText>
									</TouchableOpacity>
								</FansView>
							</FansView>
						</FansView>
					</LayoutContentsContainer>
				</ScrollView>
			</FansView>
		</AppLayout>
	);
};

export default CreateNameScreen;
