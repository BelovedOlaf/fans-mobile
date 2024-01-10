import {
	DSSCardImage,
	DiscoverCardImage,
	ExpressCardImage,
	GDPRCardImage,
	MasterCardImage,
	VisaCardImage,
	LogoImage1,
} from "@assets/svgs";
import {
	Check2Svg,
	Close2Svg,
	DiscordSvg,
	TikTokSvg,
	Twitter2Svg,
	YouTubeSvg,
	TitleSvg,
	InstagramSvg,
	SingleGem,
	DiamondTextLogoSvg,
	SearchSvg,
	CloseSvg,
} from "@assets/svgs/common";
import {
	FansDivider,
	FansGap,
	FansImage1,
	FansScreen1,
	FansSvg,
	FansText,
	FansView,
	FansIconButton,
} from "@components/controls";
import UserAvatar from "@components/avatar/UserAvatar";
import { FypText, FypButton, FypNullableView } from "@components/common/base";

import tw from "@lib/tailwind";
import { IProfile } from "@usertypes/types";
import { useBlankLink } from "@utils/useBlankLink";
import { formatNumber } from "@utils/stringHelper";
import { creatorRoles, creatorsData } from "@constants/homepage";

import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { FC, useState, useEffect } from "react";
import {
	NativeScrollEvent,
	ScrollView,
	TouchableOpacity,
	Pressable,
	Image,
	TextInput,
	Platform,
	View,
	PressableProps,
	ImageSourcePropType,
} from "react-native";
import * as Linking from "expo-linking";
import Animated, {
	useSharedValue,
	withTiming,
	Easing,
	useAnimatedStyle,
} from "react-native-reanimated";
import { searchCreators } from "@helper/endpoints/profile/apis";
import { ProfilesRespBody } from "@helper/endpoints/profile/schemas";

export const FooterSection = () => {
	const router = useRouter();
	const [openLink] = useBlankLink();
	const onPressDiscord = () => {
		openLink("https://discord.gg/fypfans");
	};

	const onPressTikTok = () => {
		openLink("https://www.tiktok.com/@fypfansreal");
	};

	const onPressTwitter = () => {
		openLink("https://twitter.com/FypFans");
	};

	const onPressYouTube = () => {
		openLink("https://www.youtube.com/channel/UCLA19FFPTxux2Z50_MRNBEg");
	};

	const onPressInstagram = () => {
		openLink("https://instagram.com/fyp.fans_/");
	};

	const onPressSupport = () => {
		openLink("https://support.fyp.fans/");
	};

	const onPressContact = () => {
		openLink("https://support.fyp.fans/");
	};

	const onPressBlog = () => {
		openLink("https://blog.fyp.fans/");
	};

	const onPressTerm = () => {
		router.push("/terms");
	};
	const onPressPrivacy = () => {
		openLink(
			"https://app.termly.io/document/privacy-policy/8234c269-74cc-48b6-9adb-be080aaaee11",
		);
	};

	const onPressCookie = () => {
		router.push({ pathname: "terms", params: { screen: "Cookies" } });
	};

	const onPressCompany = () => {
		openLink("https://www.fyp.llc/");
	};

	const Socials = () => (
		<FansView flexDirection="row" gap={10}>
			{[
				{
					icon: (
						<FansView
							style={tw.style(
								"w-[17.88px] h-[16.95px] md:w-[18.73px] md:h-[17.76px]",
							)}
						>
							<Twitter2Svg />
						</FansView>
					),
					onPress: onPressTwitter,
				},
				{
					icon: (
						<FansView
							style={tw.style(
								"w-[21.54px] h-[16.3px] md:w-[22.56px] md:h-[17.06px]",
							)}
						>
							<DiscordSvg />
						</FansView>
					),
					onPress: onPressDiscord,
				},
				{
					icon: (
						<FansView
							style={tw.style(
								"w-[19.72px] h-[13.72px] md:w-[20.66px] md:h-[14.38px]",
							)}
						>
							<YouTubeSvg />
						</FansView>
					),
					onPress: onPressYouTube,
				},
				{
					icon: (
						<FansView
							style={tw.style(
								"w-[19.6px] h-[19.66px] md:w-[20.55px] md:h-[20.6px]",
							)}
						>
							<InstagramSvg color="#000" />
						</FansView>
					),
					onPress: onPressInstagram,
				},
				{
					icon: (
						<FansView
							style={tw.style(
								"w-[16.96px] h-[19.34px] md:w-[17.77px] md:h-[20.26px]",
							)}
						>
							<TikTokSvg />
						</FansView>
					),
					onPress: onPressTikTok,
				},
			].map((item, i) => (
				<TouchableOpacity key={i} onPress={item.onPress}>
					<FansView
						style={tw.style(
							"w-[45px] h-[45px]",
							"border border-fans-grey rounded-full",
						)}
						center
					>
						{item.icon}
					</FansView>
				</TouchableOpacity>
			))}
		</FansView>
	);

	return (
		<FansView
			background="fans-white"
			style={tw.style("py-[54px] md:py-17")}
		>
			<FansView
				flexWrap="wrap"
				style={tw.style(
					"px-[18px] md:px-[140px] md:flex-col lg:flex-row",
				)}
			>
				<FansView style={tw.style("md:w-full lg:w-1/2 mb-15 lg:mb-0")}>
					<FypText
						fontSize={{ xs: 29, md: 32 }}
						fontWeight={700}
						lineHeight={41}
						color="black-2e"
						style={tw.style("text-center lg:text-left")}
					>
						Where visionaries{"\n"}build empires
					</FypText>
					<FansView
						margin={{ t: 50 }}
						style={tw.style("hidden md:flex md:mx-auto lg:mx-0")}
					>
						<Socials />
					</FansView>
					<FansView
						style={tw.style(
							"flex-row gap-[10px] hidden md:flex md:mx-auto lg:mx-0",
						)}
						margin={{ t: 34 }}
					>
						<FansView style={tw.style("w-[42px] h-[27px]")}>
							<VisaCardImage />
						</FansView>
						<FansView style={tw.style("w-[41px] h-[27px]")}>
							<MasterCardImage />
						</FansView>
						<FansView style={tw.style("w-[42px] h-[27px]")}>
							<ExpressCardImage />
						</FansView>
						<FansView style={tw.style("w-[41px] h-[27px]")}>
							<DiscoverCardImage />
						</FansView>
						<FansView style={tw.style("w-[68.91px] h-[26.36px]")}>
							<DSSCardImage />
						</FansView>
						<FansView style={tw.style("w-[73px] h-[27px]")}>
							<GDPRCardImage />
						</FansView>
					</FansView>
					<FansView
						margin={{ t: 16 }}
						style={tw.style("hidden lg:flex")}
					>
						<FypText fontSize={19} lineHeight={33} color="black">
							©2023 FYP.Fans
						</FypText>
					</FansView>
				</FansView>
				<FansView
					style={tw.style(
						"flex-col md:flex-row flex-1 gap-[56px] md:gap-0",
					)}
				>
					<FansView
						style={tw.style("flex-1 items-center md:items-start")}
					>
						<FypText
							fontSize={{ xs: 16, md: 19 }}
							lineHeight={33}
							fontWeight={700}
							color="black-2e"
							style={tw.style("mb-[25px] md:mb-[55px]")}
						>
							RESOURCES
						</FypText>
						<FansView
							style={tw.style(
								"gap-6 items-center md:items-start",
							)}
						>
							<FansText
								fontSize={{ xs: 16, md: 20 }}
								lineHeight={33}
								color="black"
								onPress={onPressSupport}
							>
								Support
							</FansText>
							<FansText
								fontSize={{ xs: 16, md: 20 }}
								lineHeight={33}
								color="black"
								onPress={onPressContact}
							>
								Contact
							</FansText>
							<FansText
								fontSize={{ xs: 16, md: 20 }}
								lineHeight={33}
								color="black"
								onPress={onPressBlog}
							>
								Blog
							</FansText>
						</FansView>
					</FansView>
					<FansView
						style={tw.style("flex-1 items-center md:items-start")}
					>
						<FypText
							fontSize={{ xs: 16, md: 19 }}
							lineHeight={33}
							fontWeight={700}
							color="black-2e"
							style={tw.style("mb-[25px] md:mb-[55px]")}
						>
							POLICY
						</FypText>
						<FansView style={tw.style("gap-6")}>
							<FansText
								fontSize={{ xs: 16, md: 20 }}
								lineHeight={33}
								color="black"
								onPress={onPressTerm}
							>
								Terms of Use
							</FansText>
							<FansText
								fontSize={{ xs: 16, md: 20 }}
								lineHeight={33}
								color="black"
								onPress={onPressPrivacy}
							>
								Privacy Policy
							</FansText>
							<FansText
								fontSize={{ xs: 16, md: 20 }}
								lineHeight={33}
								color="black"
								onPress={onPressCookie}
							>
								Cookie Notice
							</FansText>
						</FansView>
					</FansView>
					<FansView
						style={tw.style("flex-1 items-center md:items-start")}
					>
						<FypText
							fontSize={{ xs: 16, md: 19 }}
							lineHeight={33}
							fontWeight={700}
							color="black-2e"
							style={tw.style("mb-[25px] md:mb-[55px]")}
						>
							INFO
						</FypText>
						<FansView
							style={tw.style(
								"gap-6 items-center md:items-start",
							)}
						>
							<FansText
								fontSize={{ xs: 16, md: 20 }}
								lineHeight={33}
								color="black"
								onPress={onPressCompany}
							>
								Company
							</FansText>
							<FansText
								fontSize={{ xs: 16, md: 20 }}
								lineHeight={33}
								color="black"
								onPress={onPressDiscord}
							>
								Discord Community
							</FansText>
							<FansText
								fontSize={{ xs: 16, md: 20 }}
								lineHeight={33}
								color="black"
							>
								support@fyp.fans
							</FansText>
						</FansView>
					</FansView>
				</FansView>
			</FansView>

			<FansView
				alignItems="center"
				style={tw.style("flex lg:hidden mt-14")}
			>
				<FansView style={tw.style("md:hidden")}>
					<Socials />
				</FansView>
				<FansView
					style={tw.style(
						"flex-row gap-[4px] sm:gap-[10px] md:mx-auto lg:mx-0 md:hidden",
					)}
					margin={{ t: 34 }}
				>
					<FansView style={tw.style("w-[42px] h-[27px]")}>
						<VisaCardImage />
					</FansView>
					<FansView style={tw.style("w-[41px] h-[27px]")}>
						<MasterCardImage />
					</FansView>
					<FansView style={tw.style("w-[42px] h-[27px]")}>
						<ExpressCardImage />
					</FansView>
					<FansView style={tw.style("w-[41px] h-[27px]")}>
						<DiscoverCardImage />
					</FansView>
					<FansView style={tw.style("w-[68.91px] h-[26.36px]")}>
						<DSSCardImage />
					</FansView>
					<FansView style={tw.style("w-[73px] h-[27px]")}>
						<GDPRCardImage />
					</FansView>
				</FansView>
				<FansView margin={{ t: 20 }}>
					<FypText fontSize={16} lineHeight={33} color="black">
						©2023 FYP.Fans
					</FypText>
				</FansView>
			</FansView>

			<FansView
				style={tw.style(
					"pl-6 pr-1 md:pl-[140px] md:pr-8 mt-[58px] lg:mt-[126px]",
				)}
			>
				<TitleSvg color="#000" style={tw.style("w-full h-auto")} />
			</FansView>
		</FansView>
	);
};

export const FeaturesSection = () => {
	return (
		<LinearGradient
			start={{ x: -0.378, y: 1.064 }}
			end={{ x: 1.051, y: 0.125 }}
			colors={[
				tw.color("fans-blue-1D") ?? "",
				tw.color("fans-purple") ?? "",
				tw.color("fans-purple-D8") ?? "",
			]}
			style={tw.style(
				"py-[88px] md:py-[228px] px-[18px]",
				"flex justify-center items-center",
			)}
		>
			<FansView
				background="fans-white"
				style={tw.style(
					"rounded-[15px] md:rounded-[35px] w-full sm:max-w-[600px] md:max-w-[772px]",
				)}
			>
				<FansView
					flexDirection="row"
					alignItems="center"
					style={tw.style(
						"py-4 px-[18px] md:py-[38px] md:pl-[71px] md:pr-[64px]",
					)}
				>
					<FansView flex="1">
						<FypText
							fontSize={{ xs: 14, md: 23 }}
							lineHeight={{ xs: 18, md: 28 }}
							fontWeight={700}
						>
							Features
						</FypText>
					</FansView>
					<FansView
						flexDirection="row"
						alignItems="center"
						gap={{ xs: 14, md: 49 }}
					>
						<FansView
							flexDirection="row"
							justifyContent="center"
							style={tw.style("w-[75px] md:w-[140px]")}
						>
							<FansSvg
								width={{ xs: 74.31, md: 138.77 }}
								height={{ xs: 14.93, md: 27.88 }}
								svg={LogoImage1}
							/>
						</FansView>
						<FansView style={tw.style("w-[55px] md:w-[90px]")}>
							<FypText
								fontSize={{ xs: 14, md: 23 }}
								lineHeight={{ xs: 18, md: 28 }}
								fontWeight={700}
								textAlign="center"
							>
								Others
							</FypText>
						</FansView>
					</FansView>
				</FansView>
				<FansView style={tw.style("md:px-[33.5px] px-[18px]")}>
					<FansDivider color="fans-grey-f0" />
				</FansView>
				<FansView
					gap={{ xs: 17, md: 47 }}
					style={tw.style(
						"px-[18px] pt-4 pb-[26px] md:pl-[71px] md:pr-[64px] md:pt-11 md:pb-12",
					)}
				>
					<FansView flexDirection="row" alignItems="center">
						<FansView flex="1">
							<FypText
								fontSize={{ xs: 14, md: 23 }}
								lineHeight={{ xs: 18, md: 28 }}
							>
								Platform Fee
							</FypText>
						</FansView>
						<FansView
							flexDirection="row"
							alignItems="center"
							gap={{ xs: 14, md: 49 }}
						>
							<FansView style={tw.style("w-[75px] md:w-[140px]")}>
								<FypText
									fontSize={{ xs: 14, md: 23 }}
									lineHeight={{ xs: 18, md: 28 }}
									fontWeight={600}
									color="green"
									textAlign="center"
								>
									7%
								</FypText>
							</FansView>
							<FansView style={tw.style("w-[55px] md:w-[90px]")}>
								<FypText
									fontSize={{ xs: 14, md: 23 }}
									lineHeight={{ xs: 18, md: 28 }}
									fontWeight={600}
									color="red-FF"
									textAlign="center"
								>
									15-50%
								</FypText>
							</FansView>
						</FansView>
					</FansView>
					{[
						"Mobile PWA Application",
						"AI Creator Tools",
						"Modern Interface",
						"Subscription and Tier Options",
						"Complete Customizability",
					].map((row) => (
						<FansView
							flexDirection="row"
							alignItems="center"
							key={row}
						>
							<FansView flex="1">
								<FypText
									fontSize={{ xs: 14, md: 23 }}
									lineHeight={{ xs: 18, md: 28 }}
								>
									{row}
								</FypText>
							</FansView>
							<FansView
								flexDirection="row"
								alignItems="center"
								gap={{ xs: 14, md: 49 }}
							>
								<FansView
									center
									style={tw.style("w-[75px] md:w-[140px]")}
								>
									<FansSvg
										width={{ xs: 10.45, md: 22.54 }}
										height={{ xs: 6.82, md: 14.71 }}
										svg={Check2Svg}
										color={tw.color("fans-green")}
									/>
								</FansView>
								<FansView
									center
									style={tw.style("w-[55px] md:w-[90px]")}
								>
									<FansSvg
										width={{ xs: 7.07, md: 15.25 }}
										height={{ xs: 7.07, md: 15.25 }}
										svg={Close2Svg}
										color={tw.color("fans-red-FF")}
									/>
								</FansView>
							</FansView>
						</FansView>
					))}
				</FansView>
			</FansView>
		</LinearGradient>
	);
};

interface RoleButtonProps extends PressableProps {
	title: string;
	isSelected: boolean;
}

export const RoleButton: FC<RoleButtonProps> = (props) => {
	const { title, isSelected, ..._props } = props;
	return (
		<Pressable
			style={tw.style(
				"px-[23.5px] py-[6px] md:px-[34px] md:py-[17px] rounded-100px",
				isSelected ? "bg-fans-black" : "border border-fans-grey-de",
			)}
			{..._props}
		>
			<FypText
				fontSize={{ xs: 17, md: 24 }}
				lineHeight={{ xs: 22, md: 32 }}
				fontWeight={700}
				color={isSelected ? "white" : "black"}
			>
				{title}
			</FypText>
		</Pressable>
	);
};

interface CreatorProps {
	name: string;
	description: string;
	picture?: string;
	link: string;
	count?: number;
	localImage?: ImageSourcePropType;
}

export const CreatorCard: FC<CreatorProps> = (props) => {
	const { name, description, picture, link, count, localImage } = props;
	const [openLink] = useBlankLink();

	const onPress = () => {
		if (link !== "") {
			openLink(link);
		}
	};

	return (
		<Pressable
			onPress={onPress}
			style={tw.style(
				"w-[285px] md:flex-1 md:max-w-[360px] border border-fans-grey-f0 rounded-[15px]",
			)}
		>
			<FansView height={{ xs: 285, md: 360 }}>
				<Image
					source={localImage ? localImage : { uri: picture }}
					style={tw.style("w-full h-full rounded-t-[15px]")}
					resizeMode="cover"
				/>
			</FansView>
			<FansView
				style={tw.style(
					"pt-[14.4px] px-4 pb-5 md:pt-5 md:px-4 md:pb-[26px]",
				)}
			>
				<FypText
					fontSize={{ xs: 21, md: 27 }}
					lineHeight={{ xs: 28, md: 36 }}
					color="black-2e"
					fontWeight={700}
					style={tw.style("mb-3 md:mb-4")}
				>
					{name}
				</FypText>
				<FypText
					fontSize={{ xs: 16, md: 17 }}
					lineHeight={{ xs: 21, md: 26 }}
					numberOfLines={2}
					style={tw.style("mb-[14.4px] md:mb-[16.5px]")}
				>
					{description}
				</FypText>
				<FypNullableView visible={!!count}>
					<FansView flexDirection="row" alignItems="center">
						<SingleGem
							color="#000"
							style={tw.style(
								"w-[21.53px] h-[19.96px] md:w-[25.68px] md:h-[23.81px]",
							)}
						/>

						<FypText
							fontSize={{ xs: 17, md: 19 }}
							lineHeight={{ xs: 17, md: 19 }}
							fontWeight={600}
							style={tw.style("ml-[6.5px] md:ml-[12.3px]")}
						>
							{`${formatNumber(count ?? null)} followers`}
						</FypText>
					</FansView>
				</FypNullableView>
			</FansView>
		</Pressable>
	);
};

export const CreatorsSection = () => {
	const [role, setRole] = useState(creatorRoles[0]);

	return (
		<FansView
			background="fans-white"
			style={tw.style(
				"pt-10 pb-[46px] md:pt-[198px] md:pb-[203px] md:px-5 lg:px-[60px] xl:px-[148px]",
			)}
		>
			<FansView
				style={tw.style("mb-[38px] md:mb-[62px] px-[18px] md:px-0")}
			>
				<FypNullableView visible={!tw.prefixMatch("md")}>
					<ScrollView style={tw.style("w-full")} horizontal>
						<FansView
							flexDirection="row"
							gap={{ xs: 7, md: 23 }}
							justifyContent="center"
						>
							{creatorRoles.map((el) => (
								<RoleButton
									key={el}
									title={el}
									isSelected={el === role}
									onPress={() => setRole(el)}
								/>
							))}
						</FansView>
					</ScrollView>
				</FypNullableView>

				<FypNullableView visible={tw.prefixMatch("md")}>
					<FansView
						flexDirection="row"
						gap={{ xs: 7, md: 23 }}
						justifyContent="center"
					>
						{creatorRoles.map((el) => (
							<RoleButton
								key={el}
								title={el}
								isSelected={el === role}
								onPress={() => setRole(el)}
							/>
						))}
					</FansView>
				</FypNullableView>
			</FansView>

			<ScrollView
				style={tw.style("w-full px-[18px] md:px-0 md:hidden")}
				horizontal
			>
				<FansView flexDirection="row" gap={{ xs: 21, md: 63 }}>
					{creatorsData
						.filter((el) => el.type === role)
						.map((creator) => (
							<CreatorCard
								key={creator.name}
								name={creator.name}
								description={creator.description}
								picture={creator.picture}
								link={creator.link}
								count={creator.count}
								localImage={creator.localImage}
							/>
						))}
				</FansView>
			</ScrollView>
			<FansView
				flexDirection="row"
				gap={{ xs: 21, xl: 63 }}
				style={tw.style("hidden md:flex")}
			>
				{creatorsData
					.filter((el) => el.type === role)
					.map((creator) => (
						<CreatorCard
							key={creator.name}
							name={creator.name}
							description={creator.description}
							picture={creator.picture}
							link={creator.link}
							count={creator.count}
							localImage={creator.localImage}
						/>
					))}
			</FansView>
		</FansView>
	);
};

interface CreatorUserInfo {
	data: IProfile & { username?: string };
}

export const CreatorUser: FC<CreatorUserInfo> = (props) => {
	const { data } = props;
	const [openLink] = useBlankLink();

	const onPress = () => {
		const url = Linking.createURL(`/${data.username}`);
		openLink(url);
	};

	return (
		<Pressable
			style={tw.style("gap-[18px] md:gap-[21px]")}
			onPress={onPress}
		>
			<FansView
				flexDirection="row"
				alignItems="center"
				gap={{ xs: 20, md: 23 }}
			>
				<UserAvatar
					image={data.avatar}
					size={tw.prefixMatch("md") ? "71px" : "60px"}
				/>
				<FansView flex="1">
					<FypText
						fontSize={{ xs: 17, md: 19 }}
						lineHeight={{ xs: 22, md: 26 }}
						fontWeight={700}
						color="black-2e"
						style={tw.style("mb-1")}
						numberOfLines={1}
					>
						{data.displayName}
					</FypText>
					<FypText
						fontSize={16}
						lineHeight={21}
						color="grey-70"
						numberOfLines={2}
					>
						{data.bio}
					</FypText>
				</FansView>
			</FansView>
			<FansDivider />
		</Pressable>
	);
};

export const BannerSection = () => {
	const router = useRouter();

	const [showSearchForm, setShowSearchForm] = useState(false);
	const [searchQuery, setSearchQuery] = useState("");
	const [users, setUsers] = useState<ProfilesRespBody>({
		profiles: [],
		page: 1,
		total: 0,
		size: 10,
	});

	const [isLoading, setIsLoading] = useState(false);
	const [username, setUsername] = useState("");
	const [prefixWidth, setPrefixWidth] = useState(0);

	const searchFormOpacity = useSharedValue(0);
	const findBtnOpacity = useSharedValue(1);

	const searchFormStyle = useAnimatedStyle(() => {
		return {
			opacity: searchFormOpacity.value,
		};
	});
	const findBtnStyle = useAnimatedStyle(() => {
		return {
			opacity: findBtnOpacity.value,
		};
	});

	const onClickFindCreator = () => {
		findBtnOpacity.value = withTiming(0, {
			duration: 0,
			easing: Easing.linear,
		});
		searchFormOpacity.value = withTiming(1, {
			duration: 500,
			easing: Easing.linear,
		});
		setShowSearchForm(true);
	};

	const onCancelSearch = () => {
		searchFormOpacity.value = withTiming(0, {
			duration: 500,
			easing: Easing.linear,
		});
		findBtnOpacity.value = withTiming(1, {
			duration: 500,
			easing: Easing.linear,
		});
		setShowSearchForm(false);
	};

	const onChangeSearch = (query: string) => {
		setSearchQuery(query);
		setUsers({
			...users,
			page: 1,
			total: 0,
		});
	};

	const handlePressLogIn = () => {
		router.push("/auth/login");
	};

	const handlePressSignUp = () => {
		router.push("/auth/register");
	};

	const fetchUsers = async () => {
		if (searchQuery === "") {
			return;
		}
		const params = {
			page: users.page,
			size: 10,
			query: searchQuery,
		};
		const resp = await searchCreators(params);
		if (resp.ok) {
			setUsers({
				...resp.data,
				profiles:
					resp.data.page === 1
						? resp.data.profiles
						: [...users.profiles, ...resp.data.profiles],
			});
			setIsLoading(false);
		}
	};

	const onScrollView = (nativeEvent: NativeScrollEvent) => {
		const paddingToBottom = 20;
		const isScrollEnd =
			nativeEvent.layoutMeasurement.height +
				nativeEvent.contentOffset.y >=
			nativeEvent.contentSize.height - paddingToBottom;
		if (isScrollEnd && !isLoading) {
			if (users.total > 10 * users.page) {
				setIsLoading(true);
				setUsers({
					...users,
					page: users.page + 1,
				});
			}
		}
	};

	const onStartCreate = () => {
		router.push(`/auth/register?username=${username}`);
	};

	useEffect(() => {
		setSearchQuery("");
	}, []);

	useEffect(() => {
		fetchUsers();
	}, [searchQuery, users.page]);

	return (
		<FansView
			position="relative"
			style={tw.style(
				"pt-[165px] pb-[122px] md:pt-[324px] md:pb-[245px]",
			)}
		>
			<Image
				source={require("@assets/images/landing/banner-bg.webp")}
				style={tw.style(
					"w-full h-full absolute top-0 left-0 hidden sm:flex",
				)}
				resizeMode="cover"
			/>
			<Image
				source={require("@assets/images/landing/banner-bg-mobile.jpg")}
				style={tw.style(
					"w-full h-full absolute top-0 left-0 sm:hidden",
				)}
				resizeMode="cover"
			/>

			<FansView
				position="absolute"
				style={tw.style(
					"w-full px-[18px] md:px-5 lg:px-[60px] xl:px-[148px] top-6 md:top-[58px] z-90",
				)}
			>
				<FansView
					position="relative"
					style={tw.style("w-full")}
					flexDirection="row"
					justifyContent="center"
					alignItems="center"
					height={{ xs: 34, md: 66 }}
				>
					<FansView
						position="absolute"
						style={tw.style(
							"top-0 left-0 w-full md:w-[320px] lg:w-[37%] md:max-w-[602px]",
						)}
					>
						<FypNullableView visible={!showSearchForm}>
							<Animated.View style={findBtnStyle}>
								<FypButton
									style={tw.style(
										"border border-white rounded-[100px] w-[255px] h-[66px] gap-[14px] hidden md:flex",
									)}
									textStyle={tw.style(
										"text-[24px] leading-[32px] text-white font-bold",
									)}
									icon={<SearchSvg color="#fff" size={20} />}
									onPress={onClickFindCreator}
								>
									Find a creator
								</FypButton>
							</Animated.View>
						</FypNullableView>
						<FypNullableView visible={showSearchForm}>
							<Animated.View
								style={[tw.style("relative"), searchFormStyle]}
							>
								<FansView
									width={{ xs: 13, md: 20 }}
									height={{ xs: 13, md: 20 }}
									position="absolute"
									style={tw.style(
										"top-[10px] left-[18px] md:top-[24px] md:left-[27px]",
									)}
								>
									<SearchSvg color="#fff" />
								</FansView>
								<TextInput
									style={[
										tw.style(
											"text-[17px] leading-[22px] md:text-[24px] md:leading-[32px] text-white md:font-medium bg-fans-white/30 rounded-[100px]",
											"px-10 md:px-[59px] h-[34px] md:h-[66px]",
										),
										Platform.OS === "web" && {
											outlineColor:
												"rgba(255,255,255,0.3)",
										},
									]}
									value={searchQuery}
									onChangeText={(val) => onChangeSearch(val)}
								/>
								<FansIconButton
									containerColor="#000"
									style={tw.style(
										"absolute top-[4.5px] right-[4.5px] md:top-[18px] md:right-[19px]",
									)}
									size={tw.prefixMatch("md") ? 30 : 25}
									onPress={onCancelSearch}
								>
									<FansView
										width={{ xs: 10, md: 13 }}
										height={{ xs: 10, md: 13 }}
									>
										<CloseSvg color="#fff" />
									</FansView>
								</FansIconButton>
							</Animated.View>

							<FypNullableView
								visible={users.profiles.length > 0}
							>
								<FansView
									background="fans-white"
									borderRadius={15}
									style={tw.style(
										"pt-7 pb-[30px] px-[18px] mt-[17px] md:p-7 md:mt-6 max-h-[536px] md:max-h-[740px] z-90",
									)}
								>
									<ScrollView
										style={tw.style("")}
										showsVerticalScrollIndicator={true}
										onScroll={({ nativeEvent }) =>
											onScrollView(nativeEvent)
										}
										scrollEventThrottle={30}
									>
										<FansView gap={17}>
											{users.profiles.map(
												(user, index) => (
													<CreatorUser
														data={user}
														key={`${user.id}-${index}`}
													/>
												),
											)}
										</FansView>
									</ScrollView>
								</FansView>
							</FypNullableView>
						</FypNullableView>
					</FansView>

					<FypNullableView visible={!showSearchForm}>
						<FansView
							position="absolute"
							style={tw.style("left-0 md:hidden")}
						>
							<SingleGem color="#fff" size={45} />
						</FansView>
					</FypNullableView>
					<DiamondTextLogoSvg
						width={269}
						height={52}
						style={tw.style("hidden md:flex")}
					/>

					<FansView
						flexDirection="row"
						alignItems="center"
						gap={{ xs: 14, md: 40 }}
						position="absolute"
						style={tw.style(
							"top-0 right-0",
							showSearchForm ? "hidden md:flex" : "",
						)}
					>
						<FypButton
							textStyle={tw.style(
								"text-[17px] leading-[22px] font-semibold md:text-[24px] md:leading-[32px] text-white",
							)}
							onPress={handlePressLogIn}
						>
							Log in
						</FypButton>
						<FypButton
							textStyle={tw.style(
								"text-[17px] leading-[22px] font-semibold md:text-[24px] md:leading-[32px]",
							)}
							style={tw.style(
								"w-[136px] h-[34px] rounded-[21px] bg-fans-white md:w-[196px] md:h-[66px] md:rounded-[100px]",
							)}
							onPress={handlePressSignUp}
						>
							Get started
						</FypButton>
						<FansIconButton
							size={34}
							containerColor="rgba(255,255,255,0.25)"
							onPress={onClickFindCreator}
							style={tw.style("md:hidden")}
						>
							<SearchSvg size={15} color="#fff" />
						</FansIconButton>
					</FansView>
				</FansView>
			</FansView>

			<FansView
				style={tw.style(
					"px-[18px] max-w-[700px] md:max-w-[910px] sm:mx-auto",
				)}
			>
				<FypText
					fontSize={{ xs: 30, md: 75 }}
					lineHeight={{ xs: 42, md: 92 }}
					fontWeight={700}
					color="white"
					textAlign="center"
					style={tw.style("mb-[23px] md:mb-[35px]")}
				>
					Make money creating the content you love
				</FypText>
				<FypText
					fontSize={{ xs: 16, md: 27 }}
					lineHeight={{ xs: 29, md: 43 }}
					color="white"
					textAlign="center"
				>
					Start a membership, set up a digital shop, accept donations.
					{tw.prefixMatch("sm") ? "\n" : " "}
					Sell anything you like.
					{tw.prefixMatch("md") ? " It’s easier than you think" : ""}
				</FypText>

				<FansView
					style={tw.style("mt-7.5 md:mt-14")}
					position="relative"
				>
					<FansView position="relative">
						<TextInput
							style={[
								tw.style(
									"bg-fans-white h-14 md:h-[82px] rounded-[100px] text-[21px] leading-[28px] md:text-[28px] md:leading-[37px] font-semibold",
									"pl-[117px] md:pl-[173px]",
								),
								Platform.OS === "web" && {
									outlineColor: "#fff",
								},
							]}
							autoCapitalize="none"
							value={username}
							onChangeText={setUsername}
							placeholder="yourname"
							placeholderTextColor="#b1b1b1"
						/>
						<View
							style={[
								tw.style(
									"absolute left-[117px] md:left-[173px] top-[14.5px] md:top-[22.5px]",
									prefixWidth === 0 && "opacity-0",
								),
								{
									transform: [
										{ translateX: prefixWidth * -1 },
									],
								},
							]}
						>
							<FypText
								fontSize={{ xs: 21, md: 28 }}
								lineHeight={{ xs: 28, md: 37 }}
								fontWeight={600}
								onLayout={(e) => {
									setPrefixWidth(e.nativeEvent.layout.width);
								}}
							>
								fyp.fans/
							</FypText>
						</View>
					</FansView>
					<Pressable
						style={tw.style(
							"flex-row items-center justify-center",
							"mt-[15px] md:mt-0 md:absolute",
							"h-14 md:h-[66px] w-full md:w-[245px] rounded-[100px] bg-fans-black",
							"md:top-8px md:right-2",
						)}
						onPress={onStartCreate}
					>
						<FypText
							fontSize={{ xs: 19, md: 24 }}
							lineHeight={{ xs: 26, md: 32 }}
							fontWeight={700}
							color="white"
						>
							Start creating
						</FypText>
					</Pressable>
				</FansView>

				<FypText
					fontSize={{ xs: 15, md: 19 }}
					lineHeight={33}
					style={tw.style(
						"font-semibold md:font-normal mt-4 md:mt-9",
					)}
					color="white"
					textAlign="center"
				>
					It's free, and takes only one minute
				</FypText>
			</FansView>
		</FansView>
	);
};

const LandingScreen = () => {
	const router = useRouter();

	const handlePressSignUp = () => {
		router.push("/auth/register");
	};

	return (
		<FansScreen1 contentStyle={tw.style("h-full", "p-0")}>
			<ScrollView style={tw.style("grow")}>
				<BannerSection />

				<CreatorsSection />

				<FeaturesSection />

				<FansView
					style={tw.style(
						"w-full px-[18px] sm:px-0 md:max-w-[1300px] md:mx-auto py-[70px] md:pt-[154px] md:pb-[210px]",
					)}
				>
					<FansView
						style={tw.style(
							"mb-15 md:mb-[134px] md:max-w-[1088px] md:mx-auto",
						)}
					>
						<FypText
							fontSize={{ xs: 25, md: 53 }}
							lineHeight={{ xs: 33, md: 63 }}
							style={tw.style("mb-6 md:mb-[50px]")}
							fontWeight={700}
							textAlign="center"
						>
							What is FYP.Fans?
						</FypText>
						<FypText
							fontSize={{ xs: 17, md: 27 }}
							lineHeight={{ xs: 26, md: 47 }}
							textAlign="center"
						>
							Unlock your earning potential: effortlessly monetize
							your content behind a paywall and boost long-term
							fan engagement with our innovative platform
						</FypText>
					</FansView>

					<FansView
						flexWrap="wrap"
						flexDirection="row"
						style={tw.style("gap-y-[70px] md:gap-y-[110px] flex-1")}
					>
						<FansView
							style={tw.style(
								"w-full sm:w-1/2 sm:px-4 lg:px-[40px]",
							)}
						>
							<FansView
								flexDirection="row"
								alignItems="center"
								justifyContent="center"
								style={tw.style("h-[250px] md:h-[420px] mb-9")}
							>
								<Image
									source={require("@assets/images/landing/image4.webp")}
									style={tw.style(
										"w-full h-full md:max-h-[404px] md:max-w-[515px]",
									)}
									resizeMode="contain"
								/>
							</FansView>
							<FypText
								fontSize={{ xs: 25, md: 35 }}
								lineHeight={{ xs: 33, md: 47 }}
								fontWeight={700}
								textAlign="center"
								style={tw.style("mb-6 md:mb-7")}
							>
								Unleash your{" "}
								<FypText color="purple" fontWeight={700}>
									creativity
								</FypText>
							</FypText>
							<FypText
								fontSize={{ xs: 17, md: 19 }}
								lineHeight={{ xs: 26, md: 33 }}
								textAlign="center"
							>
								Unleashing potential, redefining boundaries.
								Your vision, our platform. Together, we stand
								unmatched
							</FypText>
						</FansView>

						<FansView
							style={tw.style(
								"w-full sm:w-1/2 sm:px-4 lg:px-[40px]",
							)}
						>
							<FansView
								flexDirection="row"
								alignItems="center"
								justifyContent="center"
								style={tw.style("h-[250px] md:h-[420px] mb-9")}
							>
								<Image
									source={require("@assets/images/landing/image5.webp")}
									style={tw.style(
										"w-full h-full sm:max-h-[362px] sm:max-w-[384px]",
									)}
									resizeMode="contain"
								/>
								{/* <EarningImage /> */}
							</FansView>
							<FypText
								fontSize={{ xs: 25, md: 35 }}
								lineHeight={{ xs: 33, md: 47 }}
								fontWeight={700}
								textAlign="center"
								style={tw.style("mb-6 md:mb-7")}
							>
								More earnings, more{" "}
								<FypText color="purple" fontWeight={700}>
									freedom
								</FypText>
							</FypText>
							<FypText
								fontSize={{ xs: 17, md: 19 }}
								lineHeight={{ xs: 26, md: 33 }}
								textAlign="center"
							>
								We champion creators with much lower fees,
								giving you more control over your success —
								unlike some others we know
							</FypText>
						</FansView>

						<FansView
							style={tw.style(
								"w-full sm:w-1/2 sm:px-4 lg:px-[40px]",
							)}
						>
							<FansView
								flexDirection="row"
								alignItems="center"
								justifyContent="center"
								style={tw.style("h-[250px] md:h-[420px] mb-9")}
							>
								<Image
									source={require("@assets/images/landing/image6.webp")}
									style={tw.style(
										"w-full h-full md:max-h-[378px] md:max-w-[394px]",
									)}
									resizeMode="contain"
								/>
							</FansView>
							<FypText
								fontSize={{ xs: 25, md: 35 }}
								lineHeight={{ xs: 33, md: 47 }}
								fontWeight={700}
								textAlign="center"
								style={tw.style("mb-6 md:mb-7")}
							>
								<FypText color="purple" fontWeight={700}>
									Smart tools
								</FypText>{" "}
								for smarter creativity
							</FypText>
							<FypText
								fontSize={{ xs: 17, md: 19 }}
								lineHeight={{ xs: 26, md: 33 }}
								textAlign="center"
							>
								Embrace the new age of digital creation with our
								cutting-edge GPT-powered AI tools. Don’t just
								evolve — lead
							</FypText>
						</FansView>

						<FansView
							style={tw.style(
								"w-full sm:w-1/2 sm:px-4 lg:px-[40px]",
							)}
						>
							<FansView
								flexDirection="row"
								alignItems="center"
								justifyContent="center"
								style={tw.style("h-[250px] md:h-[420px] mb-9")}
							>
								<Image
									source={require("@assets/images/landing/image7.webp")}
									style={tw.style(
										"w-full h-full md:max-h-[420px] md:max-w-[483px]",
									)}
									resizeMode="contain"
								/>
							</FansView>
							<FypText
								fontSize={{ xs: 25, md: 35 }}
								lineHeight={{ xs: 33, md: 47 }}
								fontWeight={700}
								textAlign="center"
								style={tw.style("mb-6 md:mb-7")}
							>
								Your{" "}
								<FypText color="purple" fontWeight={700}>
									talent
								</FypText>
								, multiplied
							</FypText>
							<FypText
								fontSize={{ xs: 17, md: 19 }}
								lineHeight={{ xs: 26, md: 33 }}
								textAlign="center"
							>
								Sell custom content, video calls, and more on
								FYP.Fans. Elevate your profitability with the
								ultimate platform
							</FypText>
						</FansView>
					</FansView>
				</FansView>

				<FansView
					position="relative"
					alignItems="center"
					justifyContent="center"
					style={tw.style("py-15 md:py-[164px]")}
				>
					<FansImage1
						width="full"
						height="full"
						source={require("@assets/images/landing/empower-bg.webp")}
						position="absolute"
						resizeMode="cover"
					/>
					<FansView>
						<FypText
							color="white"
							fontWeight={700}
							fontSize={{ xs: 29, md: 75 }}
							lineHeight={{ xs: 40, md: 104 }}
							textAlign="center"
						>
							Empower your creator journey
						</FypText>
					</FansView>
					<FansGap height={{ xs: 28, md: 50 }} />
					<Pressable
						onPress={handlePressSignUp}
						style={tw.style(
							"w-[236px] md:w-292px border border-fans-white rounded-[100px] h-[42px] md:h-[66px] flex items-center justify-center",
						)}
					>
						<FypText
							fontSize={{ xs: 19, md: 24 }}
							lineHeight={{ xs: 26, md: 32 }}
							fontWeight={700}
							color="white"
						>
							Create an account
						</FypText>
					</Pressable>
				</FansView>

				<FooterSection />
			</ScrollView>
		</FansScreen1>
	);
};

export default LandingScreen;
