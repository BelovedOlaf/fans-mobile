import {
	BirthdaySvg,
	ChevronRight2Svg,
	DiscordPng,
	GooglePng,
	TwitterSvg,
} from "@assets/svgs/common";
import RoundButton from "@components/common/RoundButton";
import {
	FansButton3,
	FansDivider,
	FansDropdown,
	FansGap,
	FansHorizontalDivider,
	FansScreen3,
	FansSvg,
	FansSwitch1,
	FansText,
	FansTextInput,
	FansView,
} from "@components/controls";
import { DeleteAccountModal } from "@components/modals";
import {
	ProfileActionType,
	UserActionType,
	useAppContext,
} from "@context/useAppContext";
import {
	useDiscordAuthRequest,
	useGoogleAuthRequest,
	useTwitterAuthRequest,
} from "@helper/OAuth2";
import {
	authLogout,
	authOAuth2Link,
	authOAuth2Unlink,
} from "@helper/endpoints/auth/apis";
import { deleteAccount, updateSetting } from "@helper/endpoints/settings/apis";
import tw from "@lib/tailwind";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useFeatureGates } from "@state/featureGates";
import {
	RoundButtonType,
	StorageKeyTypes,
	UserRoleTypes,
} from "@usertypes/commonEnums";
import { defaultProfile } from "@usertypes/defaults";
import { Colors } from "@usertypes/enums";
import { SettingsNativeStackParams } from "@usertypes/navigations";
import {
	AgeVerifyStatus,
	GenderType,
	IFansDropdownItem,
} from "@usertypes/types";
import { setObjectStorage, setStorage } from "@utils/storage";
import { DateTime } from "luxon";
import moment from "moment";
import React, { Fragment, useEffect, useState } from "react";
import { Platform, TouchableOpacity, View } from "react-native";
import { useDeviceContext } from "twrnc";
import {
	default as Toast,
	default as ToastMessage,
} from "react-native-toast-message";

type ItemProps = {
	title: string;
	value: string | React.ReactNode;
	onPress?: () => void;
};

const Item = (props: ItemProps) => {
	const { onPress } = props;

	return (
		<TouchableOpacity onPress={props.onPress}>
			<View style={tw.style("flex-row justify-between items-center")}>
				<View style={tw.style("flex gap-[12px]")}>
					<FansText fontFamily="inter-semibold" fontSize={17}>
						{props.title}
					</FansText>
					<FansText
						style={tw.style("text-[18px] text-fans-grey-dark")}
					>
						{props.value}
					</FansText>
				</View>
				{onPress && (
					<FansSvg
						width={6.14}
						height={12.28}
						svg={ChevronRight2Svg}
					/>
				)}
			</View>
		</TouchableOpacity>
	);
};

function getAgeVerifyStatus(status: AgeVerifyStatus | undefined) {
	if (!status || status === "CANCELLED") {
		return "Not verified";
	} else if (status === "PENDING") {
		return "Pending";
	} else if (status === "APPROVED") {
		return "Verified";
	} else if (status === "REJECTED") {
		return "Rejected";
	}
}

const AccountScreen = (
	props: NativeStackScreenProps<SettingsNativeStackParams, "Account">,
) => {
	const { navigation } = props;

	const [twitterRequest, twitterResponse, twitterPromptAsync] =
		useTwitterAuthRequest("/settings");
	const [googleRequest, googleResponse, googlePromptAsync] =
		useGoogleAuthRequest("/settings");
	const [discordRequest, discordResponse, discordPromptAsync] =
		useDiscordAuthRequest("/settings");

	useDeviceContext(tw);

	const { state, dispatch } = useAppContext();
	const { userInfo } = state.user;
	const {
		birthdate,
		email,
		createdAt,
		linkedAccounts,
		phonenumber,
		type,
		username,
		gender,
		profile = defaultProfile,
	} = userInfo;
	const { displayName } = profile;
	const isGoogleLinked = linkedAccounts?.find((a) => a.provider === "google");
	const isTwitterLinked = linkedAccounts?.find(
		(a) => a.provider === "twitter",
	);
	const isDiscordLinked = linkedAccounts?.find(
		(a) => a.provider === "discord",
	);
	const featureGates = useFeatureGates();

	const genders = [
		{ id: "Male", text: "Male" },
		{ id: "Female", text: "Female" },
		{ id: "NonBinary", text: "Non-binary" },
		{ id: "Other", text: "Other" },
	];
	const handleSelectGender = async (item: IFansDropdownItem) => {
		const { id } = item;
		const res = await updateSetting({
			gender: id as GenderType,
		});
		if (res.ok) {
			dispatch.setUser({
				type: UserActionType.updateUserInfo,
				payload: { data: { gender: id as GenderType } },
			});
		} else {
			ToastMessage.show({
				type: "error",
				text1: res.data.message,
			});
		}
	};

	const [isDeleteAccountModalOpened, setDeleteAccountModalOpened] =
		useState(false);

	const [strBirthDate, setBirthDate] = useState("");
	useEffect(() => {
		birthdate?.length &&
			setBirthDate(DateTime.fromISO(birthdate).toFormat("MM/dd/yyyy"));
	}, [birthdate]);

	const [isReload, setReload] = useState(false);

	const [isShowProfile, setShowProfile] = useState(true);
	const handleValueChangeShowProfile = (value: boolean) => {
		updateSetting({ isShowProfile: value });
		setShowProfile(value);
	};

	const handleChangeTextBirthDate = (value: string) => {
		value = value.replace(/\D/g, "");
		if (value.length > 8) value = value.substring(0, 8);
		if (value.length > 4)
			value = value.substring(0, 4) + "/" + value.substring(4);
		if (value.length > 2)
			value = value.substring(0, 2) + "/" + value.substring(2);
		setBirthDate(value);

		dispatch.setProfile({
			type: ProfileActionType.updateProfile,
			data: { user: { ...state.profile.user!, birthdate: value } },
		});
	};

	const handleCloseDeleteAccountModal = () => {
		setDeleteAccountModalOpened(false);
	};

	const handlePressChangePassword = () =>
		navigation.navigate("ChangePassword");

	const handlePressDeleteAccount = () => {
		deleteAccount(null);
		setDeleteAccountModalOpened(true);
	};

	const handlePressPhone = () => navigation.navigate("Phone");

	const handlePressUsername = () => navigation.navigate("Username");

	const handlePressEmail = () => navigation.navigate("Email");

	const handleSubmitDeleteAccountModal = async () => {
		await authLogout(null);
		await setStorage(StorageKeyTypes.AccessToken, null);
		await setObjectStorage(StorageKeyTypes.UserInfo, null);
		window.location.reload();
	};

	const trigInit = async () => {
		trigReload();
	};

	const trigReload = () => {
		setReload(!isReload);
	};

	React.useEffect(() => {
		trigInit();
	}, []);

	const isCreator = type === UserRoleTypes.Creator;

	const handleGoogleLink = async () => {
		if (!isGoogleLinked) {
			googlePromptAsync();
		} else {
			const resp = await authOAuth2Unlink(undefined, {
				provider: "google",
			});
			if (resp.ok) {
				dispatch.setUser({
					type: UserActionType.unlinkedAccount,
					payload: { provider: "google" },
				});
			}
		}
	};

	const handleTwitterLink = async () => {
		if (!isTwitterLinked) {
			twitterPromptAsync();
		} else {
			const resp = await authOAuth2Unlink(undefined, {
				provider: "twitter",
			});
			if (resp.ok) {
				dispatch.setUser({
					type: UserActionType.unlinkedAccount,
					payload: { provider: "google" },
				});
			} else {
				Toast.show({
					type: "error",
					text1: resp.data.message,
				});
			}
		}
	};

	const handleDiscordLink = async () => {
		if (!isDiscordLinked) {
			discordPromptAsync();
		} else {
			const resp = await authOAuth2Unlink(undefined, {
				provider: "discord",
			});
			if (resp.ok) {
				dispatch.setUser({
					type: UserActionType.unlinkedAccount,
					payload: { provider: "discord" },
				});
			} else {
				Toast.show({
					type: "error",
					text1: resp.data.message,
				});
			}
		}
	};

	useEffect(() => {
		if (!twitterRequest || !twitterResponse) return;
		if (twitterResponse.type !== "success") return;

		const { code } = twitterResponse.params;
		authOAuth2Link(
			{
				code,
				redirectUri: twitterRequest.redirectUri,
				codeVerifier: twitterRequest.codeVerifier,
			},
			{ provider: "twitter" },
		).then(async (resp) => {
			if (resp.ok) {
				const { linkedAccount } = resp.data;
				dispatch.setUser({
					type: UserActionType.linkAccount,
					payload: { linkedAccount },
				});
			} else {
				Toast.show({
					type: "error",
					text1: resp.data.message,
				});
			}
		});
	}, [twitterResponse]);

	useEffect(() => {
		if (!googleRequest || !googleResponse) return;
		if (googleResponse.type !== "success") return;

		const { code } = googleResponse.params;
		authOAuth2Link(
			{
				code,
				redirectUri: googleRequest.redirectUri,
				codeVerifier: googleRequest.codeVerifier,
			},
			{
				provider:
					Platform.OS === "ios"
						? "google_ios"
						: Platform.OS === "android"
						? "google_android"
						: "google_web",
			},
		).then(async (resp) => {
			if (resp.ok) {
				const { linkedAccount } = resp.data;
				dispatch.setUser({
					type: UserActionType.linkAccount,
					payload: { linkedAccount },
				});
			}
		});
	}, [googleResponse]);

	useEffect(() => {
		if (!discordRequest || !discordResponse) return;
		if (discordResponse.type !== "success") return;

		const { code } = discordResponse.params;
		authOAuth2Link(
			{
				code,
				redirectUri: discordRequest.redirectUri,
				codeVerifier: discordRequest.codeVerifier,
			},
			{ provider: "discord" },
		).then(async (resp) => {
			if (resp.ok) {
				const { linkedAccount } = resp.data;
				dispatch.setUser({
					type: UserActionType.linkAccount,
					payload: { linkedAccount },
				});
			} else {
				Toast.show({
					type: "error",
					text1: resp.data.message,
				});
			}
		});
	}, [discordResponse]);

	useEffect(() => {
		(async () => {
			if (strBirthDate.length === 10) {
				await updateSetting({
					birthdate: moment(strBirthDate).toDate(),
				});
			}
		})();
	}, [strBirthDate]);

	return (
		<FansScreen3 contentStyle1={{ maxWidth: { lg: 670 } }}>
			<FansGap height={{ lg: 42.4 }} />
			<FansView gap={18}>
				<Item
					title="Username"
					value={`fyp.fans/${username}`}
					onPress={handlePressUsername}
				/>
				<FansHorizontalDivider />
				{isCreator && (
					<Fragment>
						<Item title="Display name" value={displayName} />
						<FansHorizontalDivider />
					</Fragment>
				)}
				<Item
					title="Phone"
					value={phonenumber ?? "Add phone number"}
					onPress={handlePressPhone}
				/>
				<FansHorizontalDivider />
				<Item title="Email" value={email} onPress={handlePressEmail} />
				<FansHorizontalDivider />
				<Item
					title="ID verified"
					value={
						<Fragment>
							{getAgeVerifyStatus(
								state.user.userInfo.ageVerifyStatus,
							)}

							{/* <FansText
								color="purple"
								textDecorationLine="underline"
							>
								Learn more
							</FansText> */}
						</Fragment>
					}
				/>
			</FansView>
			<FansView style={tw.style("my-[32px]")}>
				<RoundButton
					variant={RoundButtonType.OUTLINE_PRIMARY}
					onPress={handlePressChangePassword}
				>
					Change password
				</RoundButton>
			</FansView>
			<FansText fontFamily="inter-semibold" fontSize={17}>
				Linked accounts
			</FansText>
			{featureGates.has("2023_11-twitter-oauth2") && (
				<>
					<FansView
						style={tw.style(
							"flex-row gap-[10px] items-center",
							"my-[15px]",
						)}
					>
						<FansView
							style={tw.style(
								"bg-fans-blue-light",
								"p-[10px]",
								"rounded-full",
							)}
						>
							<TwitterSvg size={26} color={Colors.White} />
						</FansView>
						<FansView style={tw.style("grow")}>
							<FansText fontFamily="inter-semibold" fontSize={19}>
								Twitter
							</FansText>
						</FansView>
						<FansButton3
							width={106.5}
							title={isTwitterLinked ? "Unlink" : "Link"}
							buttonStyle={
								isTwitterLinked && { backgroundColor: "white" }
							}
							textStyle1={isTwitterLinked && { color: "purple" }}
							onPress={handleTwitterLink}
						/>
					</FansView>
					<FansDivider />
				</>
			)}
			<FansView
				style={tw.style(
					"flex-row gap-[10px] items-center",
					"my-[15px]",
				)}
			>
				<View
					style={tw.style("bg-fans-grey", "p-[11px]", "rounded-full")}
				>
					<GooglePng size={24} />
				</View>
				<View style={tw.style("grow")}>
					<FansText fontFamily="inter-semibold" fontSize={19}>
						Google
					</FansText>
				</View>
				<View>
					<FansButton3
						width={106.5}
						title={isGoogleLinked ? "Unlink" : "Link"}
						buttonStyle={
							isGoogleLinked && { backgroundColor: "white" }
						}
						textStyle1={isGoogleLinked && { color: "purple" }}
						onPress={handleGoogleLink}
					/>
				</View>
			</FansView>
			<FansDivider />
			<FansView
				style={tw.style(
					"flex-row gap-[10px] items-center",
					"my-[15px]",
				)}
			>
				<View
					style={tw.style("bg-fans-grey", "p-[11px]", "rounded-full")}
				>
					<DiscordPng size={24} />
				</View>
				<View style={tw.style("grow")}>
					<FansText fontFamily="inter-semibold" fontSize={19}>
						Discord
					</FansText>
				</View>
				<View>
					<FansButton3
						width={106.5}
						title={isDiscordLinked ? "Unlink" : "Link"}
						buttonStyle={
							isDiscordLinked && { backgroundColor: "white" }
						}
						textStyle1={isDiscordLinked && { color: "purple" }}
						onPress={handleDiscordLink}
					/>
				</View>
			</FansView>
			<FansGap height={21} />
			{/* Account creation ~ */}
			<FansView gap={12}>
				<FansText fontFamily="inter-semibold" fontSize={17}>
					Account creation
				</FansText>
				<FansText color="grey-70" fontSize={18}>
					{DateTime.fromISO(createdAt).toFormat(
						"MMM d, yyyy, h:mm:ss a",
					)}
				</FansText>
			</FansView>
			{/* ~ Account creation */}
			<FansGap height={33} />
			{/* Gender ~ */}
			<FansView gap={15}>
				<FansText fontFamily="inter-semibold" fontSize={17}>
					Gender
				</FansText>
				<FansDropdown
					data={genders}
					value={gender}
					dropdownStyle={{
						defaultButtonText: "Select Gender",
					}}
					onSelect={handleSelectGender}
				/>
			</FansView>
			{/* ~ Gender */}
			<FansGap height={34} />
			<FansText fontFamily="inter-semibold" fontSize={17}>
				Birth date
			</FansText>
			<View style={tw.style("my-[10px]")}>
				<FansTextInput
					icon={BirthdaySvg}
					value={strBirthDate}
					placeholder="MM / DD / YYYY"
					onChangeText={handleChangeTextBirthDate}
				/>
			</View>
			{type === UserRoleTypes.Creator && (
				<FansSwitch1
					value={isShowProfile}
					onValueChange={handleValueChangeShowProfile}
					label="Show on profile page"
				/>
			)}
			<FansGap height={25} />
			<FansDivider />
			<FansGap height={25} />
			<FansView>
				<FansText fontFamily="inter-semibold" fontSize={19}>
					Account management
				</FansText>
			</FansView>
			<FansGap height={25} />
			<View style={tw.style("my-[10px]")}>
				<FansText fontFamily="inter-semibold" fontSize={17}>
					Request my data
				</FansText>
			</View>
			<View style={tw.style("my-[10px]")}>
				<RoundButton variant={RoundButtonType.OUTLINE_PRIMARY}>
					Request
				</RoundButton>
			</View>

			<View style={tw.style("my-[10px]")}>
				<FansText fontFamily="inter-semibold" fontSize={17}>
					Delete account
				</FansText>
			</View>
			<View style={tw.style("my-[10px]")}>
				<FansText style={tw.style("text-[#707070]")} fontSize={16}>
					Erase your profile, ending all subscriptions and removing
					your data. Caution, this is irreversible!
				</FansText>
			</View>
			{/*isCreator && (
				<Fragment>
					<FansText>Unpublish page</FansText>
					<FansGap height={10} />
					<FansText color={Colors.Grey}>
						Suspend fan access and pause billing for your creator
						page, while keeping all content, fan details, and
						pledges intact for potential future publishing.{" "}
						<FansText
							color1="purple-a8"
							textDecorationLine="underline"
						>
							Learn more
						</FansText>
					</FansText>
					<FansGap height={10} />
					<View style={tw.style("my-[10px]")}>
						<RoundButton variant={RoundButtonType.OUTLINE_PRIMARY}>
							Unpublish your page
						</RoundButton>
					</View>
				</Fragment>
			)*/}
			<FansGap height={tw.prefixMatch("lg") ? 19 : 39} />
			<FansButton3
				buttonStyle={{
					backgroundColor: "white",
					borderColor: "red-eb",
				}}
				textStyle1={{
					color: "red-eb",
				}}
				title="Delete account"
				onPress={handlePressDeleteAccount}
				height={42}
			/>
			<DeleteAccountModal
				visible={isDeleteAccountModalOpened}
				onClose={handleCloseDeleteAccountModal}
				onSubmit={handleSubmitDeleteAccountModal}
			/>
			<FansGap height={20} />
		</FansScreen3>
	);
};

export default AccountScreen;
