import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { Fragment, useEffect, useState } from "react";
import { TouchableOpacity } from "react-native";

import {
	AccountSvg,
	AnalyticsSvg,
	CalendarSvg,
	Chat2Svg,
	ChevronLeft1Svg,
	ChevronRight2Svg,
	HeartSvg,
	NotificationSvg,
	PaymentSvg,
	PrivacySvg,
	SpeakerSvg,
	WarningSvg,
	VideoCallSvg,
	IntegrationSvg,
	CameoVideoSVG,
} from "@assets/svgs/common";
import {
	FansDivider,
	FansGap,
	FansScreen2,
	FansScreen3,
	FansSvg,
	FansText,
	FansView,
} from "@components/controls";
import { useAppContext } from "@context/useAppContext";
import tw from "@lib/tailwind";
import { UserRoleTypes } from "@usertypes/commonEnums";
import { Colors, FansColors } from "@usertypes/enums";
import {
	SettingsNativeStackParams,
	SettingsNativeStackScreens,
} from "@usertypes/navigations";
import { isDesktop } from "@utils/global";
import { SvgProps } from "react-native-svg";
import { useDeviceContext } from "twrnc";
import { useFeatureGates } from "@state/featureGates";
import { useRouter, useSegments } from "expo-router";

interface FansSvgProps extends SvgProps {
	color?: string;
	fill?: string;
	size?: number;
}

type ItemProps = {
	icon?: React.FC<FansSvgProps>;
	iconNode?: React.ReactNode;
	isActive?: boolean;
	text: string;
	onPress?: () => void;
};

interface SettingsScreenContentProps {
	active: SettingsNativeStackScreens;
	onNavigate: (screen: keyof SettingsNativeStackParams) => void;
	onNavigateBack: () => void;
}

const Item = (props: ItemProps) => {
	const { isActive, iconNode } = props;

	return (
		<TouchableOpacity onPress={props.onPress}>
			<FansView
				height={{ xs: 52, lg: 68 }}
				style={tw.style(
					"lg:pl-[37.5px] lg:pr-[39.5px]",
					isActive && "lg:bg-fans-purple/10",
					"flex-row gap-[20px] items-center",
				)}
			>
				{props.icon ? (
					<props.icon size={24} color={Colors.Purple} />
				) : (
					iconNode
				)}
				<FansView style={tw.style("grow")}>
					<FansText
						style={tw.style(
							isActive && "lg:font-inter-bold",
							"text-[18px]",
						)}
					>
						{props.text}
					</FansText>
				</FansView>
				<FansSvg width={6.14} height={12.28} svg={ChevronRight2Svg} />
			</FansView>
		</TouchableOpacity>
	);
};

export const SettingsScreenContent = (props: SettingsScreenContentProps) => {
	const { active, onNavigate, onNavigateBack } = props;

	const router = useRouter();
	const segments = useSegments();

	const { state } = useAppContext();
	const { userInfo } = state.user;
	const { type } = userInfo;
	const isCreator = type === UserRoleTypes.Creator;
	const featureGates = useFeatureGates();

	useDeviceContext(tw);

	useEffect(() => {
		setCurrent(active);
	}, [active]);

	const [current, setCurrent] = useState(
		segments[0] === "(tabs)" &&
			["refer", "refer-analytics", "refer-payout"].includes(segments[1])
			? "ReferCreators"
			: "Account",
	);

	const handleMenuItemPress = (
		current: string,
		screen: keyof SettingsNativeStackParams,
	) => {
		setCurrent(current);
		console.log(`current = ${current}, active = ${active}`);
		onNavigate(screen);
	};

	return (
		<Fragment>
			<FansView display={{ xs: "hidden", lg: "flex" }}>
				<FansGap height={65} />
				<FansView alignItems="center" flexDirection="row">
					<FansGap width={38} />
					<FansView
						touchableOpacityProps={{
							onPress: () => onNavigateBack(),
						}}
						flex="1"
					>
						<FansSvg
							width={6.36}
							height={12.72}
							svg={ChevronLeft1Svg}
							color1="grey-70"
						/>
					</FansView>
					<FansGap width={30.6} />
					<FansText fontFamily="inter-bold" fontSize={23}>
						Settings
					</FansText>
					<FansGap width={68.6} />
					<FansView grow />
				</FansView>
			</FansView>
			<FansView
				style={tw.style("max-w-[339px]")}
				alignSelf="center"
				display={{ lg: "hidden" }}
			>
				<FansText fontSize={16} textAlign="center">
					See information about your account, download an archive of
					your data, or learn about your account deactivation options
				</FansText>
			</FansView>
			<FansGap height={{ xs: 33, sm: 47 }} />
			<Item
				text="Account"
				iconNode={
					<FansSvg
						width={22.59}
						height={23}
						svg={AccountSvg}
						color1="purple"
					/>
				}
				isActive={current === "Account"}
				onPress={() => handleMenuItemPress("Account", "Account")}
			/>
			{featureGates.has("2023_11-custom-videos") && (
				<Item
					text="Fan profile"
					iconNode={
						<FansSvg
							width={22.59}
							height={23}
							svg={AccountSvg}
							color1="purple"
						/>
					}
					isActive={current === "FanProfileSetup"}
					onPress={() =>
						handleMenuItemPress(
							"FanProfileSetup",
							"FanProfileSetup",
						)
					}
				/>
			)}
			<Item
				text="Payments"
				icon={PaymentSvg}
				isActive={current === "Payments"}
				onPress={() => handleMenuItemPress("Payments", "Payments")}
			/>
			{isCreator && (
				<>
					<Item
						text="Analytics"
						icon={AnalyticsSvg}
						isActive={current === "Analytics"}
						onPress={() =>
							handleMenuItemPress("Analytics", "Analytics")
						}
					/>
					{featureGates.has("2023_11-referral-links") &&
						(!isCreator ? (
							<Item
								text="Referral setup"
								icon={SpeakerSvg}
								isActive={current === "ReferralProgram"}
								onPress={() =>
									handleMenuItemPress(
										"ReferralProgram",
										"ReferralProgram",
									)
								}
							/>
						) : (
							<Item
								text="Referral setup"
								icon={SpeakerSvg}
								isActive={
									current === "ReferCreators" ||
									current === "ReferralAnalytics" ||
									current === "ReferralPayments" ||
									current === "ReferralPayoutSetup"
								}
								onPress={() => {
									if (
										segments[0] === "(tabs)" &&
										segments[1] === "refer"
									) {
										handleMenuItemPress(
											"ReferCreators",
											"ReferCreators",
										);
									} else {
										router.replace({
											pathname: "refer",
										});
									}
								}}
							/>
						))}
					{featureGates.has("2023_10-random-future-stuff") && (
						<Item
							text="Privacy & Safety"
							icon={PrivacySvg}
							isActive={current === "Privacy"}
							onPress={() =>
								handleMenuItemPress("Privacy", "Privacy")
							}
						/>
					)}
				</>
			)}
			<FansDivider
				ver1
				style={tw.style(
					"h-[1px]",
					isDesktop && "ml-[37.5px] mr-[39.5px]",
				)}
			/>
			<Item
				text="Notifications"
				isActive={current === "Notifications"}
				iconNode={
					<FansView style={tw.style("w-[22px] h-[25px]")}>
						<NotificationSvg color={FansColors.Purple} />
					</FansView>
				}
				onPress={() =>
					handleMenuItemPress("Notifications", "Notifications")
				}
			/>
			{featureGates.has("2023_10-video-calls") && (
				<Item
					text="Video calls"
					isActive={current === "VideoCallSetup"}
					icon={VideoCallSvg}
					onPress={() =>
						handleMenuItemPress("VideoCallSetup", "VideoCallSetup")
					}
				/>
			)}
			{featureGates.has("2023_11-custom-videos") && (
				<Item
					text="Custom video orders"
					isActive={current === "CameoSetup"}
					icon={CameoVideoSVG}
					onPress={() =>
						handleMenuItemPress("CameoSetup", "CameoSetup")
					}
				/>
			)}
			{featureGates.has("2023_10-discord-integration") && isCreator && (
				<Item
					text="Discord integration"
					isActive={current === "Connections"}
					icon={IntegrationSvg}
					onPress={() =>
						handleMenuItemPress("Connections", "Connections")
					}
				/>
			)}
			<Item
				text="Subscribed"
				icon={HeartSvg}
				isActive={current === "Subscriptions"}
				onPress={() =>
					handleMenuItemPress("Subscriptions", "Subscriptions")
				}
			/>
			{featureGates.has("2023_10-random-future-stuff") && isCreator && (
				<>
					<Item
						text="Automated chats"
						iconNode={
							<FansSvg
								width={23.61}
								height={23.61}
								svg={Chat2Svg}
								color={tw.color("fans-purple")}
							/>
						}
						isActive={current === "AutomatedChats"}
						onPress={() =>
							handleMenuItemPress(
								"AutomatedChats",
								"AutomatedChats",
							)
						}
					/>
					<Item
						text="Scheduled posts"
						icon={CalendarSvg}
						isActive={current === "ScheduledPosts"}
						onPress={() =>
							handleMenuItemPress(
								"ScheduledPosts",
								"ScheduledPosts",
							)
						}
					/>
				</>
			)}
			{!isCreator && (
				<>
					<FansDivider
						ver1
						style={tw.style(
							"h-[1px]",
							isDesktop && "ml-[37.5px] mr-[39.5px]",
						)}
					/>
					<Item
						text="Report creator"
						icon={WarningSvg}
						isActive={current === "REPORTABUSE"}
						onPress={() =>
							handleMenuItemPress("ReportCreator", "REPORTABUSE")
						}
					/>
				</>
			)}
			<FansGap height={20} />
		</Fragment>
	);
};

const SettingsScreen = (
	props: NativeStackScreenProps<SettingsNativeStackParams, "Settings">,
) => {
	const { navigation } = props;
	const segments = useSegments();

	const handleNavigate = (screen: keyof SettingsNativeStackParams) => {
		switch (screen) {
			case "Payments":
				navigation.navigate(screen, { screen: "Payments" });
				break;
			case "Subscriptions":
				navigation.navigate(screen, { screen: "Subscriptions" });
				break;
			case "Privacy":
				navigation.navigate(screen, { screen: "Privacy" });
				break;
			case "AutomatedChats":
				navigation.navigate(screen, { screen: "AutomatedChats" });
				break;
			case "VerifyEmail":
				break;
			default:
				navigation.navigate(screen);
				break;
		}
	};
	const handleNavigateBack = () => {
		console.log("go back");
		navigation.goBack();
	};

	return (
		<FansScreen3>
			<SettingsScreenContent
				active={
					segments[0] === "(tabs)" &&
					["refer", "refer-analytics", "refer-payout"].includes(
						segments[1],
					)
						? "ReferCreators"
						: "Account"
				}
				onNavigate={handleNavigate}
				onNavigateBack={handleNavigateBack}
			/>
		</FansScreen3>
	);
};

export default SettingsScreen;
