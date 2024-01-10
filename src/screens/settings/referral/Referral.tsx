import React, { Fragment, useState } from "react";

import {
	Camera2Svg,
	CameraVideo1Svg,
	CheckStar1Svg,
	CheckStar2Svg,
	ChevronDown4Svg,
	ChevronLeft1Svg,
	ChevronRight3Svg,
	Copy1Svg,
	Dollar2Svg,
	DotsHorizontalSvg,
	Heart3Svg,
	Income1Svg,
	InteractiveSvg,
	Link1Svg,
	LockedSvg,
	Mail1Svg,
	QuestionCircledSvg,
	Search1Svg,
} from "@assets/svgs/common";
import { List1Svg } from "@assets/svgs/common/List";
import {
	SocialInstagram1Image,
	SocialTikTokImage,
	SocialTwitterImage,
} from "@assets/svgs/images/Socials";
import UserAvatar from "@components/avatar/UserAvatar";
import AvatarWithStatus from "@components/common/AvatarWithStatus";
import {
	FansButton3,
	FansChips4,
	FansGap,
	FansHorizontalDivider,
	FansImage2,
	FansScreen3,
	FansSvg,
	FansTabs,
	FansText,
	FansTextInput5,
	FansVerticalDivider,
	FansView,
} from "@components/controls";
import tw from "@lib/tailwind";
import { BlurView } from "expo-blur";
import { ScrollView } from "react-native";
import { useNavigation } from "expo-router";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ReferralProgramNativeStackParams } from ".";
import { isDesktop } from "@utils/global";
import { useFeatureGates } from "@state/featureGates";

const ReferralScreen = () =>
	// props: ReferralProgramNativeStackScreenProps<"ReferralProgram">,
	{
		const navigation =
			useNavigation<
				NativeStackNavigationProp<ReferralProgramNativeStackParams>
			>();
		navigation.setOptions({ headerShown: false });

		const displayName = "Jane Love";
		const name = "janelove";
		const link = "fyp.fans/janelove1";

		const gates = useFeatureGates();

		const [numChips, setChips] = useState(0);
		const [numTab, setTab] = useState(0);

		return (
			<FansScreen3
				contentStyle1={{ flexDirection: { lg: "row" }, padding: 0 }}
			>
				{tw.prefixMatch("lg") && <FansGap width={138} />}
				<FansView width={{ xs: "full", lg: 706 }} padding={{ x: 18 }}>
					<FansImage2
						width="full"
						height={211}
						source={{
							uri: "https://i.postimg.cc/J7vXYBL0/image.png",
						}}
						viewStyle={{
							borderRadius: { b: 15 },
							placement: { t: 0, l: 0 },
							position: "absolute",
						}}
					/>
					<FansGap height={73.7} />
					<FansView
						alignItems="center"
						flexDirection="row"
						justifyContent="between"
					>
						<FansSvg
							width={6.36}
							height={12.72}
							svg={ChevronLeft1Svg}
							color1="white"
						/>
						<FansSvg
							width={17.38}
							height={3.55}
							svg={DotsHorizontalSvg}
							color1="white"
						/>
					</FansView>
					<FansGap height={82.6} />
					<FansView alignSelf="end" flexDirection="row" gap={16}>
						<FansView
							width={25}
							height={25}
							alignItems="center"
							backgroundColor={{ color: "black", opacity: 30 }}
							borderRadius="full"
							justifyContent="center"
						>
							<FansSvg
								width={6.36}
								height={12.72}
								svg={ChevronLeft1Svg}
								color1="white"
							/>
						</FansView>
						<FansView
							width={25}
							height={25}
							alignItems="center"
							backgroundColor={{ color: "black", opacity: 30 }}
							borderRadius="full"
							justifyContent="center"
						>
							<FansSvg
								width={6.36}
								height={12.72}
								svg={ChevronRight3Svg}
								color1="white"
							/>
						</FansView>
					</FansView>
					<FansView
						alignItems="end"
						flexDirection="row"
						justifyContent="between"
						margin={{ t: -11 }}
					>
						<AvatarWithStatus size={79} hasOnlineStatus isOnline />
						<FansView flexDirection="row" gap={7}>
							<FansView
								width={34}
								height={34}
								alignItems="center"
								backgroundColor="grey-f0"
								borderRadius="full"
								justifyContent="center"
							>
								<FansSvg
									width={18.23}
									height={14.6}
									svg={Mail1Svg}
								/>
							</FansView>
							<FansView
								width={34}
								height={34}
								alignItems="center"
								backgroundColor="grey-f0"
								borderRadius="full"
								justifyContent="center"
							>
								<FansSvg
									width={9.4}
									height={19.33}
									svg={Dollar2Svg}
								/>
							</FansView>
							<FansView
								width={34}
								height={34}
								alignItems="center"
								backgroundColor="grey-f0"
								borderRadius="full"
								justifyContent="center"
							>
								<FansSvg
									width={16.72}
									height={15.85}
									svg={List1Svg}
								/>
							</FansView>
							<FansButton3
								height={34}
								title="Preview"
								buttonStyle={{ backgroundColor: "white" }}
								textStyle1={{
									color: "purple-a8",
									fontFamily: "inter-semibold",
									fontSize: 17,
								}}
							/>
						</FansView>
					</FansView>
					<FansGap height={18} />
					<FansView>
						<FansView
							alignItems="center"
							flexDirection="row"
							gap={4}
						>
							<FansText fontFamily="inter-bold" fontSize={19}>
								Jane Love
							</FansText>
							<FansSvg
								width={15.66}
								height={15}
								svg={CheckStar2Svg}
								color1="purple-a8"
							/>
						</FansView>
						<FansText color="grey-70">
							@{name} • Seen 11 hours ago
						</FansText>
					</FansView>
					<FansGap height={19} />
					<FansView alignItems="center" flexDirection="row" gap={7.6}>
						<FansView
							height={34}
							alignItems="center"
							borderColor="grey-f0"
							borderRadius="full"
							flexDirection="row"
							gap={7.5}
							padding={{ r: 16.5, l: 5 }}
						>
							<FansView
								width={24}
								height={24}
								alignItems="center"
								backgroundColor="purple-a8"
								borderRadius="full"
								justifyContent="center"
							>
								<FansSvg
									width={13.91}
									height={13.92}
									svg={Link1Svg}
									color1="white"
								/>
							</FansView>
							<FansText color="purple-a8" fontSize={16}>
								{link}
							</FansText>
						</FansView>
						<FansSvg
							width={14.71}
							height={18.73}
							svg={Copy1Svg}
							color1="purple-a8"
						/>
					</FansView>
					<FansGap height={16} />
					<FansView gap={2}>
						<FansText fontSize={16}>
							Model & content creator. From Australia to the
							world. New photos every week!
						</FansText>
						<FansText color="purple-a8" fontSize={15}>
							More info
						</FansText>
					</FansView>
					<FansGap height={18} />
					<FansView alignItems="center" flexDirection="row">
						<FansView
							alignItems="center"
							flexDirection="row"
							gap={6.7}
						>
							<FansSvg
								width={19.82}
								height={16.55}
								svg={Camera2Svg}
								color1="grey-70"
							/>
							<FansText
								color="grey-70"
								fontFamily="inter-medium"
								fontSize={15}
							>
								123
							</FansText>
						</FansView>
						<FansGap width={10} />
						<FansView
							alignItems="center"
							flexDirection="row"
							gap={7.9}
						>
							<FansSvg
								width={23.99}
								height={15.39}
								svg={CameraVideo1Svg}
								color1="grey-70"
							/>
							<FansText
								color="grey-70"
								fontFamily="inter-medium"
								fontSize={15}
							>
								175
							</FansText>
						</FansView>
						<FansGap width={4.6} />
						<FansView
							alignItems="center"
							flexDirection="row"
							gap={8}
						>
							<FansSvg
								width={16.48}
								height={14.57}
								svg={Heart3Svg}
								color1="grey-70"
							/>
							<FansText
								color="grey-70"
								fontFamily="inter-medium"
								fontSize={15}
							>
								1.5k
							</FansText>
						</FansView>
					</FansView>
					<FansGap height={21} />
					<FansView flexDirection="row" gap={4.5}>
						{[
							{ icon: SocialTikTokImage, text: "TikTok" },
							{ icon: SocialInstagram1Image, text: "Instagram" },
							{ icon: SocialTwitterImage, text: "X" },
						].map((value, index) => {
							const { icon, text } = value;
							return (
								<FansView
									key={index}
									height={34}
									alignItems="center"
									borderColor="grey-f0"
									borderRadius="full"
									flexDirection="row"
									gap={10.5}
									padding={{ r: 15, l: 6 }}
								>
									<FansSvg
										width={24}
										height={24}
										svg={icon}
									/>
									<FansText color="grey-66" fontSize={16}>
										{text}
									</FansText>
								</FansView>
							);
						})}
					</FansView>
					<FansGap height={24} />
					<FansView
						height={42}
						alignItems="center"
						backgroundColor="purple-a8"
						borderRadius="full"
						flexDirection="row"
						justifyContent="between"
						padding={{ r: 19.3, l: 21.7 }}
					>
						<FansText
							color="white"
							fontFamily="inter-bold"
							fontSize={19}
						>
							Subscribe
						</FansText>
						<FansText color="white" fontSize={16}>
							<FansText fontFamily="inter-medium">$15</FansText>
							/month
						</FansText>
					</FansView>
					<FansGap height={24} />
					<FansHorizontalDivider />
					<FansGap height={19} />

					{/* Subscription bundles ~ */}
					<FansView gap={15.2}>
						<FansText fontFamily="inter-semibold" fontSize={17}>
							Subscription bundles
						</FansText>
						<FansView gap={9}>
							{[
								{ month: 3, off: 10, total: 40 },
								{ month: 6, off: 20, total: 72 },
							].map((value, index) => {
								const { month, off, total } = value;
								return (
									<FansView
										key={index}
										height={42}
										alignItems="center"
										borderColor="purple-a8"
										borderRadius="full"
										flexDirection="row"
										justifyContent="between"
										padding={{ r: 19.3, l: 21.7 }}
									>
										<FansText
											color="purple-a8"
											fontSize={16}
										>
											<FansText
												fontFamily="inter-bold"
												fontSize={19}
											>
												{month} months
											</FansText>{" "}
											({off}% off)
										</FansText>
										<FansText
											color="purple-a8"
											fontSize={16}
										>
											<FansText fontFamily="inter-medium">
												${total}
											</FansText>{" "}
											total
										</FansText>
									</FansView>
								);
							})}
						</FansView>
					</FansView>
					{/* ~ Subscription bundles */}

					<FansGap height={23.8} />
					<FansHorizontalDivider />
					<FansGap height={23} />

					<ScrollView
						horizontal
						showsHorizontalScrollIndicator={false}
						style={tw.style("mx-[-17px]", "px-[17px]")}
					>
						<FansView flexDirection="row" gap={15}>
							{[
								"Me!",
								"Home",
								"Food :)",
								"Beauty",
								"Fashion",
							].map((value, index) => (
								<FansView
									key={index}
									alignItems="center"
									gap={5}
								>
									<UserAvatar size="68px" />
									<FansText fontSize={15}>{value}</FansText>
								</FansView>
							))}
						</FansView>
					</ScrollView>

					<FansGap height={23} />

					{gates.has("2023_10-random-future-stuff") && (
						<Fragment>
							<FansView
								borderColor="grey-f0"
								borderRadius={15}
								padding={{ t: 23, r: 17, b: 21, l: 17 }}
							>
								<FansView
									alignItems="center"
									flexDirection="row"
									gap={14.8}
								>
									<FansSvg
										width={80.69}
										height={74.64}
										svg={Income1Svg}
										color1="green-4d"
									/>
									<FansView width={0} grow>
										<FansText
											fontFamily="inter-semibold"
											fontSize={19}
										>
											Refer and earn
										</FansText>
										<FansGap height={10} />
										<FansText fontSize={16}>
											Make 20% lifetime revenue share.{" "}
											<FansText
												color="green-4d"
												fontFamily="inter-semibold"
												textDecorationLine="underline"
											>
												Learn more
											</FansText>
										</FansText>
										<FansGap height={17} />
										<FansButton3
											width={188}
											title="Join program"
											buttonStyle={{
												backgroundColor: "green-4d",
												borderColor: "green-4d",
											}}
										/>
									</FansView>
								</FansView>
								<FansGap height={28} />
								<FansHorizontalDivider />
								<FansGap height={19} />
								<FansView
									alignItems="center"
									flexDirection="row"
								>
									<FansText
										fontFamily="inter-semibold"
										fontSize={17}
									>
										Earnings calculator
									</FansText>
									<FansGap width={5.5} />
									<FansSvg
										width={14.23}
										height={14.23}
										svg={QuestionCircledSvg}
										color1="grey-b1"
									/>
									<FansGap viewStyle={{ grow: true }} />
									<FansSvg
										width={12.28}
										height={6.14}
										svg={ChevronDown4Svg}
										color1="grey-70"
									/>
								</FansView>
							</FansView>

							<FansGap height={15.2} />
						</Fragment>
					)}

					<FansTabs
						data={[
							{ text: "POSTS 123" },
							{ text: "MEDIA 175" },
							{ text: "PLAYLISTS" },
						]}
						value={numTab}
						viewStyle={{ margin: { x: -17 } }}
						onChangeValue={setTab}
					/>
					<FansGap height={19.3} />
					<FansView alignItems="center" flexDirection="row" gap={8.3}>
						<FansSvg
							width={21.71}
							height={23.24}
							svg={InteractiveSvg}
							color1="purple-a8"
						/>
						<FansText
							color="purple-a8"
							fontFamily="inter-semibold"
							fontSize={17}
						>
							Interactive view
						</FansText>
					</FansView>
					<FansGap height={15.2} />
					<FansChips4
						data={[
							{ text: "Latest" },
							{ text: "Popular" },
							{ text: "Creator picks" },
							{ text: "Longest" },
						]}
						value={numChips}
						viewStyle1={{ margin: { x: -17 }, padding: { x: 17 } }}
						onChangeValue={setChips}
					/>
					<FansGap height={31.8} />
					<FansView alignItems="center" flexDirection="row">
						<UserAvatar size="34px" />
						<FansGap width={13} />
						<FansText fontFamily="inter-semibold" fontSize={17}>
							Jane Love
						</FansText>
						<FansGap width={6} />
						<FansSvg
							width={13.66}
							height={13}
							svg={CheckStar1Svg}
							color1="purple-a8"
						/>
						<FansGap width={8} />
						<FansText color="grey-70" fontSize={16}>
							• 17h
						</FansText>
						<FansGap viewStyle={{ grow: true }} />
						<FansSvg
							width={17.38}
							height={3.55}
							svg={DotsHorizontalSvg}
						/>
					</FansView>
					<FansGap height={9.4} />
					<FansText fontSize={16}>
						New podcast! We’ll talk about art (of course), creative
						process, influences… and more!
					</FansText>
					<FansGap height={10} />
					<BlurView style={tw.style("h-[220px]", "mx-[-17px]")}>
						<FansImage2
							width="full"
							height="full"
							source={{
								uri: "https://i.postimg.cc/J7vXYBL0/image.png",
							}}
							viewStyle={{ position: "absolute" }}
						/>
						<FansGap height={40.7} />
						<FansView
							width={84}
							height={84}
							alignItems="center"
							alignSelf="center"
							backgroundColor={{ color: "white", opacity: 50 }}
							borderRadius="full"
							justifyContent="center"
						>
							<FansSvg
								width={34.32}
								height={45.02}
								svg={LockedSvg}
								color1="white"
							/>
						</FansView>
						<FansGap height={37.5} />
						<FansView
							height={42}
							alignItems="center"
							backgroundColor="purple-a8"
							borderRadius="full"
							flexDirection="row"
							justifyContent="between"
							margin={{ x: 17 }}
							padding={{ r: 19.3, l: 21.7 }}
						>
							<FansText
								color="white"
								fontFamily="inter-bold"
								fontSize={19}
							>
								Subscribe
							</FansText>
							<FansText color="white" fontSize={16}>
								<FansText fontFamily="inter-medium">
									$15
								</FansText>
								/month
							</FansText>
						</FansView>
					</BlurView>
				</FansView>
				{tw.prefixMatch("lg") && (
					<Fragment>
						<FansGap width={138} />
						<FansVerticalDivider />
						<FansGap width={40} />
						<FansView width={358} gap={37} padding={{ t: 62 }}>
							<FansTextInput5
								textInputStyle={{
									placeholder: "Search",
									placeholderTextColor: "black",
								}}
								iconNode={
									<FansSvg
										width={13.14}
										height={13.26}
										svg={Search1Svg}
									/>
								}
							/>

							{/* Media ~ */}
							<FansView gap={14}>
								<FansText
									fontFamily="inter-semibold"
									fontSize={20}
								>
									Media
								</FansText>
								<FansView
									borderRadius={15}
									flexDirection="row"
									flexWrap="wrap"
									overflow="hidden"
								>
									{["", "", "", "", "", ""].map(
										(value, index) => (
											<FansImage2
												key={index}
												source={{
													uri: "https://i.postimg.cc/J7vXYBL0/image.png",
												}}
												viewStyle={{
													borderColor: "white",
													flexBasis: "1/3",
													aspectRatio: "square",
												}}
											/>
										),
									)}
								</FansView>
							</FansView>
							{/* ~ Media */}

							{/* Suggested for you ~ */}
							<FansView gap={14}>
								<FansText
									fontFamily="inter-semibold"
									fontSize={20}
								>
									Suggested for you
								</FansText>
								<FansView gap={14}>
									{[
										{
											displayName: "Jason Moon",
											name: "jasonm",
										},
										{
											displayName: "CandyGirl",
											name: "candygirl",
										},
										{
											displayName: "Morris Photo",
											name: "morrisph",
										},
										{
											displayName: "Jason Moon",
											name: "jasonm",
										},
									].map((value, index) => {
										const { displayName, name } = value;
										return (
											<FansView
												height={125}
												borderColor="grey-f0"
												borderRadius={15}
												overflow="hidden"
											>
												<FansImage2
													height={63}
													source={{
														uri: "https://i.postimg.cc/J7vXYBL0/image.png",
													}}
												/>
												<FansView
													alignItems="end"
													flexDirection="row"
													margin={{ t: -41 }}
													padding={{ r: 13, l: 15 }}
												>
													<FansView
														border={4}
														borderColor="white"
														borderRadius="full"
													>
														<UserAvatar size="79px" />
													</FansView>
													<FansGap width={12} />
													<FansView>
														<FansText
															fontFamily="inter-bold"
															fontSize={17}
														>
															{displayName}
														</FansText>
														<FansText
															color="grey-70"
															fontSize={16}
														>
															@{name}
														</FansText>
													</FansView>
													<FansGap
														viewStyle={{
															grow: true,
														}}
													/>
													<FansButton3
														height={34}
														title="View"
														buttonStyle={{
															backgroundColor:
																"white",
														}}
														textStyle1={{
															color: "purple-a8",
														}}
													/>
												</FansView>
											</FansView>
										);
									})}
								</FansView>
							</FansView>
							{/* ~ Suggested for you */}
						</FansView>
					</Fragment>
				)}
			</FansScreen3>
		);
	};

export default ReferralScreen;
