import {
	ChatSvg,
	Diamond1Png,
	FilledHomeSvg,
	LargeSearch,
	OutlinedBellSvg,
	OutlinedHomeSvg,
	OutlinedPlusSvg,
	StarCheckSvg,
	ThreeDotsSvg,
} from "@assets/svgs/common";
import {
	FypButton,
	FypLinearGradientView,
	FypNullableView,
	FypText,
} from "@components/common/base";
import { FansSvg } from "@components/controls";
import {
	CommonActionType,
	useAppContext,
	PostsActionType,
} from "@context/useAppContext";
import tw from "@lib/tailwind";
import { chatUnreadCountSelector } from "@state/chat";
import { useFeatureGates } from "@state/featureGates";
import { AuthState, authStateAtom } from "@state/auth";
import { notificationCountSelector } from "@state/notifications";
import {
	RoundButtonType,
	StorageKeyTypes,
	UserRoleTypes,
	PostStepTypes,
} from "@usertypes/commonEnums";
import { setVolatileStorage } from "@utils/storage";
import { usePathname, useRouter } from "expo-router";
import React, { FC, useEffect } from "react";
import {
	Image,
	Platform,
	Pressable,
	PressableProps,
	ScrollView,
	View,
} from "react-native";
import { Divider } from "react-native-paper";
import Animated, {
	Easing,
	useAnimatedStyle,
	useSharedValue,
	withTiming,
} from "react-native-reanimated";
import { useRecoilValue } from "recoil";
import AvatarWithStatus from "../AvatarWithStatus";
import RoundButton from "../RoundButton";

interface LinkItemProps extends PressableProps {
	title: string;
	children: React.ReactNode;
	isSelected: boolean;
	collapsed: boolean;
}

export const LinkItem: FC<LinkItemProps> = (props) => {
	const { title, children, isSelected, collapsed, ...others } = props;

	return (
		<Pressable
			style={tw.style(
				"relative h-[38px] pl-[55px] lg:h-13 lg:pl-19 flex justify-center",
				collapsed ? "w-10.5 pl-0" : "w-[190px] lg:w-[262px]",
			)}
			{...others}
		>
			<View style={tw.style("absolute left-5 lg:left-7")}>
				{children}
			</View>
			<FypNullableView visible={!collapsed}>
				<FypText
					fontSize={{ xs: 14, lg: 20 }}
					lineHeight={{ xs: 17, lg: 27 }}
					fontWeight={isSelected ? 700 : 500}
				>
					{title}
				</FypText>
			</FypNullableView>
		</Pressable>
	);
};

interface Props {
	onToggleMore: () => void;
	collapsed: boolean;
}

const TabMenu: FC<Props> = (props) => {
	const { onToggleMore, collapsed } = props;

	const router = useRouter();
	const pathname = usePathname();

	const { state, dispatch } = useAppContext();
	const { userInfo } = state.user;
	const { profile } = state;
	const { step: postFormStep } = state.posts.modal;
	const loggedIn = userInfo.id !== "0";

	const notificationCount = useRecoilValue(notificationCountSelector);
	const chatUnreadCount = useRecoilValue(chatUnreadCountSelector);
	const authState = useRecoilValue(authStateAtom);

	const featureGates = useFeatureGates();

	const chatEnabled = featureGates.has("2023_10-chat");
	const searchEnabled = featureGates.has("2023_10-search");

	const isLg = tw.prefixMatch("lg");
	const offset = useSharedValue(isLg ? 287 : 210);

	const animationStyle = useAnimatedStyle(() => {
		return {
			width: withTiming(offset.value, {
				duration: 100,
				easing: Easing.linear,
			}),
		};
	});

	const onChangeRouter = (pathname: string) => {
		if (Platform.OS === "web") {
			setVolatileStorage(
				StorageKeyTypes.RedirectAfterLogin,
				window.location.pathname,
			);
		}
		router.replace(pathname);
	};

	const onClickGetGems = () => {
		router.replace({ pathname: "get-gems", params: { gems: "1000" } });
	};

	const onGoToProfile = () => {
		if (userInfo.type === UserRoleTypes.Creator) {
			router.replace({
				pathname: "profile",
				params: { screen: "Profile" },
			});
		} else {
			router.replace({
				pathname: "profile",
				params: { screen: "ProfileName" },
			});
		}
	};

	const onCreate = () => {
		if (userInfo.type === UserRoleTypes.Creator) {
			if (postFormStep === PostStepTypes.Empty) {
				dispatch.setCommon({
					type: CommonActionType.toggleNewPostTypesModal,
					data: true,
				});
			} else {
				dispatch.setPosts({
					type: PostsActionType.updatePostModal,
					data: {
						visible: true,
					},
				});
			}
		} else {
			router.replace({
				pathname: "profile",
				params: { screen: "ProfileName" },
			});
		}
	};

	const onGoToHomePage = () => {
		router.replace({
			pathname: "posts",
			params: { screen: "Home" },
		});
	};

	const onClickDisplayName = () => {
		router.push(`/${profile.profileLink.split("/").splice(-1)}`);
	};

	useEffect(() => {
		if (collapsed) {
			offset.value = isLg ? 88 : 55;
		} else {
			offset.value = isLg ? 287 : 210;
		}
	}, [collapsed, isLg]);

	return (
		<ScrollView
			contentContainerStyle={tw.style("border-r border-[#dedede] flex-1")}
		>
			<Animated.View style={[animationStyle]}>
				<View
					style={tw.style(
						"pb-10 pt-8 lg:pt-[55px] lg:pb-12",
						collapsed ? "pr-3" : "pr-4.5 lg:pr-6",
					)}
				>
					<Pressable
						style={tw.style(
							"mb-9.5 lg:mb-13 pl-4.5",
							collapsed ? "mx-auto lg:mx-0 lg:ml-0" : "lg:pl-7",
						)}
						onPress={onGoToHomePage}
					>
						{collapsed ? (
							<FansSvg
								style={tw.style(
									"w-[28.5px] h-[28.5px] lg:w-10 lg:h-10",
								)}
								svg={Diamond1Png}
							/>
						) : (
							// <LogoSvg
							// 	style={tw.style(
							// 		"w-[142px] h-[28.5px] lg:w-[196px] lg:h-10",
							// 	)}
							// />
							<Image
								source={require("@assets/images/fypfanswebsitelogo.png")}
								style={tw.style(
									"w-[142px] h-[26px] lg:w-[196px] lg:h-9",
								)}
							/>
						)}
					</Pressable>

					<View style={tw.style("gap-y-3 lg:gap-y-4 mb-10")}>
						<FypNullableView visible={loggedIn}>
							<LinkItem
								title="Home"
								isSelected={pathname.startsWith("/posts")}
								collapsed={collapsed}
								onPress={() => onChangeRouter("/posts")}
							>
								{pathname === "/posts" ? (
									<FilledHomeSvg
										color="#000"
										style={tw.style(
											"w-[17.6px] h-[18px] lg:w-[25px] lg:h-[25px]",
										)}
									/>
								) : (
									<OutlinedHomeSvg
										color="#000"
										style={tw.style(
											"w-[17.6px] h-[18px] lg:w-[25px] lg:h-[25px]",
										)}
									/>
								)}
							</LinkItem>
						</FypNullableView>

						{searchEnabled && (
							<LinkItem
								onPress={() => onChangeRouter("/search")}
								title="Search"
								isSelected={pathname === "/search"}
								collapsed={collapsed}
							>
								<LargeSearch
									color="#000"
									style={tw.style(
										"w-[21.6px] h-[21.75px] lg:w-[25px] lg:h-[25px]",
									)}
								/>
							</LinkItem>
						)}
						<FypNullableView visible={loggedIn}>
							<LinkItem
								onPress={() => onChangeRouter("/notifications")}
								title="Notifications"
								isSelected={pathname.startsWith(
									"/notifications",
								)}
								collapsed={collapsed}
							>
								<View style={tw.style("relative")}>
									<OutlinedBellSvg
										style={tw.style(
											"w-[17.8px] h-5 lg:w-[25px] lg:h-7",
										)}
										color="#000"
									/>
									{notificationCount > 0 && (
										<View
											style={tw.style(
												"bg-fans-purple px-1 absolute rounded-[20px] pt-[3px] right-[-9px] top-[-5px] lg:pt-[1px] lg:top-[-6px] lg:right-[-12px]",
											)}
										>
											<FypText
												color="white"
												fontWeight={700}
												fontSize={{ xs: 8, lg: 11 }}
												lineHeight={{ xs: 9, lg: 15 }}
											>
												{notificationCount}
											</FypText>
										</View>
									)}
								</View>
							</LinkItem>
							<LinkItem
								onPress={onCreate}
								title={
									userInfo.type === UserRoleTypes.Creator
										? "Create"
										: "Become Creator"
								}
								isSelected={false}
								collapsed={collapsed}
							>
								<OutlinedPlusSvg
									style={tw.style("w-5 h-5 lg:w-7 lg:h-7")}
									color="#000"
								/>
								{/* {userInfo.type === UserRoleTypes.Creator ? (
								<OutlinedPlusSvg
									style={tw.style("w-5 h-5 lg:w-7 lg:h-7")}
									color="#000"
								/>
							) : (
								<ShortSvg
									style={tw.style("w-5 h-5 lg:w-7 lg:h-7")}
									color="#000"
								/>
							)} */}
							</LinkItem>
							{chatEnabled && (
								<LinkItem
									onPress={() => onChangeRouter("/chat")}
									title="Messages"
									isSelected={pathname.startsWith("/chat")}
									collapsed={collapsed}
								>
									<View style={tw.style("relative")}>
										<ChatSvg
											color="#000"
											style={tw.style(
												"w-5 h-5 lg:w-7 lg:h-7",
											)}
										/>
										{notificationCount > 0 && (
											<View
												style={tw.style(
													"bg-fans-purple px-1 absolute rounded-[20px] pt-[3px] right-[-9px] top-[-5px] lg:pt-[1px] lg:top-[-6px] lg:right-[-12px]",
												)}
											>
												<FypText
													color="white"
													fontWeight={700}
													fontSize={{ xs: 8, lg: 11 }}
													lineHeight={{
														xs: 9,
														lg: 15,
													}}
												>
													{chatUnreadCount}
												</FypText>
											</View>
										)}
									</View>
								</LinkItem>
							)}
							{userInfo.type === UserRoleTypes.Creator ? (
								<LinkItem
									onPress={onGoToProfile}
									title="Profile"
									isSelected={pathname.startsWith("/profile")}
									collapsed={collapsed}
								>
									<AvatarWithStatus
										avatar={
											profile.avatar ?? userInfo.avatar
										}
										size={isLg ? 31 : 22}
										onPress={onGoToProfile}
									/>
								</LinkItem>
							) : null}

							<LinkItem
								title="More"
								isSelected={false}
								collapsed={collapsed}
								onPress={onToggleMore}
							>
								<ThreeDotsSvg
									color="#000"
									style={tw.style(
										"w-5 h-1 lg:w-6 lg:h-[6px]",
									)}
								/>
							</LinkItem>
						</FypNullableView>
					</View>

					<FypNullableView visible={!collapsed && loggedIn}>
						<View
							style={tw.style(
								"pl-4.5 pr-3 mt-auto lg:pl-[26px] lg:pr-4",
							)}
						>
							<Pressable
								style={tw.style("flex-row")}
								onPress={onClickDisplayName}
							>
								<AvatarWithStatus
									avatar={profile.avatar ?? userInfo.avatar}
									size={isLg ? 46 : 31}
									onPress={onClickDisplayName}
								/>

								<View style={tw.style("ml-2 lg:ml-3 flex-1")}>
									<View
										style={tw.style(
											"flex-row items-center",
											!profile.displayName && "hidden",
										)}
									>
										<FypText
											fontSize={{ xs: 13, lg: 19 }}
											lineHeight={{ xs: 13, lg: 26 }}
											fontWeight={700}
											numberOfLines={1}
											style={tw.style("mr-3 flex-1")}
										>
											{profile.displayName}
										</FypText>

										<StarCheckSvg
											style={tw.style(
												"w-[11.3px] h-[10.8px] lg:w-[15.66px] lg:h-[15px]",
											)}
										/>
									</View>
									<FypText
										color="grey-70"
										fontSize={{ xs: 11, lg: 16 }}
										lineHeight={{ xs: 14, lg: 21 }}
									>
										{profile.profileLink
											? `@${
													profile.profileLink
														.split("/")
														.slice(-1)[0]
											  }`
											: ""}
									</FypText>
								</View>
							</Pressable>
							<Divider
								style={tw.style("bg-fans-grey my-4.5 lg:my-6")}
							/>
							<View
								style={tw.style(
									"flex-row items-center mb-4.5 lg:mb-6",
								)}
							>
								<View
									style={tw.style(
										"rounded-full bg-[#f6edff] flex-row items-center justify-center w-7.5 h-7.5 mr-2 lg:w-10 lg:h-10 lg:mr-3",
									)}
								>
									{/* <GemSvg style={tw.style("w-4 h-4 lg:w-5.5 lg:h-5.5")} /> */}
									<Image
										source={require("@assets/images/gem.png")}
										style={tw.style(
											"w-4 h-4 lg:w-5.5 lg:h-5.5",
										)}
									/>
								</View>
								<View>
									<FypText
										fontSize={{ xs: 11, lg: 16 }}
										lineHeight={{ xs: 14, lg: 16 }}
										style={tw.style(
											"text-black lg:text-fans-purple lg:opacity-65 lg:font-semibold",
										)}
									>
										{(userInfo.gemsAmount ?? 0).toFixed(2)}{" "}
										USD
									</FypText>
									<FypText
										color="purple"
										fontWeight={600}
										fontSize={{ xs: 13, lg: 17 }}
										lineHeight={{ xs: 15, lg: 26 }}
									>
										{`${userInfo.gems ?? 0} Gems`}
									</FypText>
								</View>
							</View>
							{/* <Pressable onPress={onClickGetGems}>
							<LinearGradient
								colors={["#a854f5", "#d885ff"]}
								start={{ x: 0, y: 1 }}
								end={{ x: 1, y: 0 }}
								style={tw.style(
									"py-2 pl-[17px] pr-[26px] rounded-[34px] flex-row items-center justify-center",
								)}
							>
								<Text
									style={tw.style(
										"text-white text-[12px] font-semibold leading-[15px] lg:text-[17px] lg:leading-[22px]",
									)}
								>
									Get Gems
								</Text>
							</LinearGradient>
						</Pressable> */}
							<RoundButton
								onPress={onClickGetGems}
								variant={RoundButtonType.OUTLINE_PRIMARY}
								icon={() => (
									<Image
										source={require("@assets/images/gem.png")}
										style={tw.style(
											"w-[18.8px] h-[17.43px]",
										)}
									/>
								)}
							>
								Get Gems
							</RoundButton>
						</View>
					</FypNullableView>

					<FypNullableView
						visible={authState === AuthState.Unauthenticated}
					>
						<FypButton
							textStyle={tw.style(
								"text-[19px] font-bold leading-[26px] text-fans-purple",
							)}
							style={tw.style(
								"border border-fans-grey-de rounded-[28px] h-[42px] max-w-[220px] mb-3",
							)}
							onPress={() => onChangeRouter("/auth/login")}
						>
							Log in
						</FypButton>

						<FypLinearGradientView
							style={tw.style("max-w-[220px]")}
							height={42}
							borderRadius={28}
							colors={["#1d21e5", "#a854f5", "#d885ff"]}
						>
							<Pressable
								style={tw.style(
									"w-full h-full items-center justify-center",
								)}
								onPress={() => onChangeRouter("/auth/register")}
							>
								<FypText
									fontSize={19}
									lineHeight={26}
									fontWeight={700}
									color="white"
								>
									Sign up
								</FypText>
							</Pressable>
						</FypLinearGradientView>
					</FypNullableView>
				</View>
			</Animated.View>
		</ScrollView>
	);
};

export default TabMenu;
