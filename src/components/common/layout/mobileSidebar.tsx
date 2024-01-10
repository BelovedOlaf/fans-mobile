import tw from "@lib/tailwind";
import { useRouter } from "expo-router";
import { openBrowserAsync } from "expo-web-browser";
import React, { FC, useCallback, useState } from "react";
import {
	Pressable,
	ScrollView,
	Text,
	TouchableOpacity,
	View,
	useWindowDimensions,
} from "react-native";
import {
	Easing,
	useAnimatedStyle,
	useSharedValue,
	withTiming,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useSetRecoilState } from "recoil";
import {
	BookmarkSvg,
	EditUserSvg,
	GemSvg,
	HeartSvg,
	LogoutSvg,
	PaymentSvg,
	RefferalSvg,
	SettingSvg,
	StarCheckSvg,
	SupportSvg,
} from "@assets/svgs/common";
import { FypText } from "@components/common/base";
import BottomSheetWrapper from "@components/common/bottomSheetWrapper";
import { FansDivider } from "@components/controls";
import { MenuItem } from "@components/posts/common";
import AvatarWithStatus from "../AvatarWithStatus";

import {
	CommonActionType,
	ProfileActionType,
	useAppContext,
} from "@context/useAppContext";
import { authLogout } from "@helper/endpoints/auth/apis";
import { authAtom } from "@state/auth";
import { SnapPoints, UserRoleTypes } from "@usertypes/commonEnums";
import { useBlankLink } from "@utils/useBlankLink";

const MobileSidebar: FC = () => {
	const router = useRouter();
	const insets = useSafeAreaInsets();
	const { state, dispatch } = useAppContext();
	const setAuth = useSetRecoilState(authAtom);
	const { profile, user, common } = state;
	const { openSidebar } = common;
	const [openLink] = useBlankLink();
	const { height } = useWindowDimensions();

	const offset = useSharedValue(1);

	const [isLightMode, setIsLightMode] = useState(true);

	const [language, setLanguage] = useState("en");
	const [openLangMenu, setOpenLangMenu] = React.useState(false);

	const { userInfo } = state.user;
	const { type } = userInfo;

	const isCreator = type === UserRoleTypes.Creator;

	const onClose = () => {
		dispatch.setCommon({
			type: CommonActionType.toggleSidebar,
			data: false,
		});
	};

	const onChangeLanguage = (lang: string) => {
		setLanguage(lang);
		setOpenLangMenu(false);
	};

	const onLogout = async () => {
		dispatch.setShowLoading();
		// await clearAllStorage();
		await authLogout(null);
		dispatch.setProfile({
			type: ProfileActionType.initProfile,
			data: {},
		});
		dispatch.setHideLoading();
		setAuth(undefined);
		onClose();
		router.push("/auth/login");
	};

	const onClickProfileLink = () => {
		onClose();
		if (user.userInfo.type === UserRoleTypes.Creator) {
			onClose();
			router.push("/profile");
		} else {
			router.push({
				pathname: "/profile",
				params: { screen: "ProfileName" },
			});
		}
	};

	const onSupport = useCallback(() => {
		onClose();
		openLink("https://support.fyp.fans/hc/en-us");
		// router.push("/support");
	}, []);

	const springStyles = useAnimatedStyle(() => {
		return {
			transform: [
				{
					translateX: withTiming(offset.value * 37 + 4.5, {
						duration: 300,
						easing: Easing.bezier(0.5, 0.01, 0, 1),
					}),
				},
			],
		};
	});

	const handleToggleTheme = () => {
		setIsLightMode(!isLightMode);
		offset.value = offset.value === 0 ? 1 : 0;
	};

	const handlePressSettings = () => {
		onClose();
		router.push("/settings");
	};

	const handlePressYourCards = () => {
		onClose();
		router.replace({
			pathname: "settings",
			params: { screen: "Payments" },
		});
	};

	const onGoToSubscriptions = () => {
		onClose();
		router.replace({
			pathname: "settings",
			params: { screen: "Subscriptions" },
		});
	};

	const onGoToReferCreators = () => {
		onClose();
		router.replace({
			pathname: "refer",
		});
	};

	const onGoToSettings = () => {
		onClose();
		router.replace({
			pathname: "settings",
			params: { screen: "Account" },
		});
	};

	const onNavigate = (pathname: string) => {
		onClose();
		router.push(pathname);
	};

	const onClickGetGem = () => {
		onClose();
		router.replace({ pathname: "get-gems", params: { gems: "1000" } });
	};

	const onGoToPrivacy = () => {
		openBrowserAsync(
			"https://app.termly.io/document/privacy-policy/8234c269-74cc-48b6-9adb-be080aaaee11",
		);
	};

	return (
		<BottomSheetWrapper
			open={openSidebar}
			onClose={onClose}
			snapPoint={SnapPoints.Ninety}
		>
			<View
				style={{
					height: height * 0.9 - 50,
				}}
			>
				<ScrollView
					style={{
						paddingBottom: insets.bottom + 20,
					}}
				>
					<View style={tw.style("px-[18px] flex-row mb-[30px]")}>
						<View
							style={tw.style("w-[95px] h-[95px] rounded-full")}
						>
							<AvatarWithStatus
								avatar={user.userInfo.avatar}
								size={95}
							/>
						</View>

						<View style={tw.style("ml-4")}>
							{profile.displayName && (
								<View style={tw.style("flex-row items-center")}>
									<Text
										style={tw.style(
											"text-[19px] font-bold leading-[26px] mr-3",
										)}
									>
										{profile.displayName}
									</Text>
									<StarCheckSvg width={15.66} height={15} />
								</View>
							)}
							<Text
								style={tw.style(
									"text-base text-fans-dark-grey leading-[21px]",
								)}
							>
								{user.userInfo.username
									? `@${user.userInfo.username}`
									: ""}
							</Text>

							<TouchableOpacity
								style={tw.style(
									"mt-[14px] w-[145px] h-[34px] pl-[17px] rounded-[34px] flex-row items-center border border-fans-purple",
								)}
								onPress={() => {
									onClose();
									onClickGetGem();
								}}
							>
								<GemSvg size={17.4} />
								<Text
									style={tw.style(
										"text-[17px] font-semibold leading-[22px] text-fans-purple ml-[5px]",
									)}
								>
									Get Gems
								</Text>
							</TouchableOpacity>
						</View>
					</View>

					{/* <MenuItem
						title="Search"
						icon={<SearchSvg width={19.22} height={19.4} color="#000" />}
						onPress={() => onNavigate("/search")}
					/> */}
					<MenuItem
						title="Subscriptions"
						icon={<HeartSvg width={23.5} height={21} />}
						onPress={onGoToSubscriptions}
					/>
					<MenuItem
						title="Collections"
						icon={<BookmarkSvg width={16.26} height={20.12} />}
						onPress={() => onNavigate("/bookmarks")}
					/>
					{isCreator && (
						<MenuItem
							title="Refer creators"
							icon={<RefferalSvg width={25} height={25} />}
							onPress={onGoToReferCreators}
						/>
					)}
					<MenuItem
						title="Settings"
						icon={<SettingSvg width={25} height={25} />}
						onPress={onGoToSettings}
					/>

					<FansDivider style={tw.style("mx-4.5 h-[1px]")} />

					<MenuItem
						title="Your cards"
						icon={
							<PaymentSvg width={24} height={17.6} color="#000" />
						}
						onPress={handlePressYourCards}
					/>
					<MenuItem
						title={
							user.userInfo.type === UserRoleTypes.Creator
								? "View profile page"
								: "Become a creator"
						}
						icon={<EditUserSvg width={27.27} height={26.23} />}
						onPress={onClickProfileLink}
					/>

					<FansDivider style={tw.style("mx-4.5 h-[1px]")} />

					<MenuItem
						title="Support"
						icon={<SupportSvg width={25} height={25} />}
						onPress={onSupport}
					/>

					{/* <View style={tw.style("relative")}>
						<Menu
							visible={openLangMenu}
							onDismiss={() => setOpenLangMenu(false)}
							anchor={
								<MenuItem
									title={
										languages.find(
											(lang) => lang.data === language,
										)?.label ?? "English"
									}
									icon={
										<LanguageSvg width={24} height={24} />
									}
									onPress={() => setOpenLangMenu(true)}
									endIcon={
										<ChevronDownSvg
											width={12.28}
											height={6.14}
										/>
									}
								/>
							}
							contentStyle={tw.style("max-w-full bg-white")}
							style={tw.style(
								"left-[18px] right-[18px] bg-white",
							)}
						>
							{languages.map((lang) => (
								<Menu.Item
									key={lang.data}
									onPress={() => onChangeLanguage(lang.data)}
									title={lang.label}
									style={tw.style("w-full max-w-full")}
								/>
							))}
						</Menu>
					</View> */}

					<FansDivider style={tw.style("mx-4.5")} />

					<MenuItem
						title="Log out"
						icon={<LogoutSvg width={23.33} height={24} />}
						onPress={onLogout}
					/>

					{/* <View style={tw.style("mt-15 pl-5")}>
						<Pressable
							style={tw.style(
								"w-20 h-[42px] rounded-[25px] relative",
								{
									"bg-fans-purple": isLightMode,
									"bg-[#b1b1b1]": !isLightMode,
								},
							)}
							onPress={handleToggleTheme}
						>
							<SunSvg
								width={25.3}
								height={25.3}
								style={tw.style(
									"absolute top-[8.5px] left-[9px]",
								)}
							/>
							<MoonSvg
								width={24.06}
								height={24.05}
								style={tw.style(
									"absolute top-[9px] right-[10px]",
								)}
							/>
							<Animated.View
								style={[
									tw.style(
										"w-[34px] h-[34px] bg-white rounded-full absolute top-1",
									),
									springStyles,
								]}
							></Animated.View>
						</Pressable>
					</View> */}

					<View style={tw.style("flex-row pl-5 items-center mt-3")}>
						<Pressable
							onPress={() => {
								onClose();
								onGoToPrivacy();
							}}
						>
							<FypText
								fontSize={16}
								lineHeight={21}
								color="grey-70"
							>
								Privacy policy
							</FypText>
						</Pressable>
						<View
							style={tw.style(
								"w-1 h-1 bg-fans-dark-grey rounded-full mx-2",
							)}
						></View>
						<Pressable
							onPress={() => {
								onClose();
								router.push("/terms");
							}}
						>
							<FypText
								fontSize={16}
								lineHeight={21}
								color="grey-70"
							>
								Terms of service
							</FypText>
						</Pressable>
					</View>
				</ScrollView>
			</View>
		</BottomSheetWrapper>
	);
};

export default MobileSidebar;
