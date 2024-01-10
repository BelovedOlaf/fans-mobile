import {
	CheckSvg,
	ChevronDownSvg,
	ChevronUp2Svg,
	OutlinedPlaySvg,
	PhonewithCashSvg,
	QuestionMarkInCircleSvg,
} from "@assets/svgs/common";
import RoundButton from "@components/common/RoundButton";
import FansLink from "@components/common/link";
import { FansDivider, FansText, FansView } from "@components/controls";
import tw from "@lib/tailwind";
import Slider from "@react-native-community/slider";
import { RoundButtonType } from "@usertypes/commonEnums";
import { Colors, FansColors } from "@usertypes/enums";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { TouchableOpacity, View } from "react-native";
import { Popable, Popover } from "react-native-popable";

const JoinProgramCard = () => {
	const router = useRouter();
	const [isExpanded, setExpanded] = useState(false);
	const [joined, setJoined] = useState(false);

	const onPress = () => {
		setExpanded(!isExpanded);
	};

	const onJoin = () => {
		// setJoined(!joined);
		router.push({
			pathname: "refer",
			params: {
				screen: "JoinProgram",
			},
		});
	};

	const steps = [1, 50, 100, 150, 200, 250];

	return (
		<View
			style={tw.style(
				"mx-[18px] border rounded-[15px] border-fans-grey px-3 py-4",
			)}
		>
			<View
				style={tw.style(
					"flex flex-row gap-4 justify-center items-center my-2",
				)}
			>
				<View>
					<PhonewithCashSvg width={70} />
				</View>
				<View style={tw.style("flex-1 gap-2")}>
					<FansText fontSize={19}>Refer and earn</FansText>
					<FansText fontSize={17}>
						Make 20% lifetime revenue share.{" "}
						<FansLink color="green-4d">Learn more</FansLink>
					</FansText>
					<View style={tw.style("mt-2")}>
						<RoundButton
							variant={
								!joined
									? RoundButtonType.SECONDARY
									: RoundButtonType.OUTLINE_SECONDARY
							}
							customStyles="max-w-[190px]"
							onPress={onJoin}
						>
							{!joined ? (
								<FansText
									fontSize={18}
									style={tw.style("font-semibold")}
								>
									Join program
								</FansText>
							) : (
								<View
									style={tw.style(
										"flex flex-row items-center gap-2",
									)}
								>
									<CheckSvg width={18} />
									<FansText
										fontSize={18}
										style={tw.style("font-semibold")}
									>
										Joined
									</FansText>
								</View>
							)}
						</RoundButton>
					</View>
				</View>
			</View>
			<FansDivider style={tw.style("my-4")} />

			{joined && (
				<View style={tw.style("flex gap-3 mb-8")}>
					<FansText fontSize={17}>Marketing content</FansText>
					<FansText color="grey-70" fontSize={16}>
						Use these resources as content to post on social media
						platforms
					</FansText>
					<View style={tw.style("mt-2")}>
						<RoundButton
							variant={RoundButtonType.OUTLINE_SECONDARY}
						>
							<View
								style={tw.style(
									"flex flex-row items-center gap-2",
								)}
							>
								<OutlinedPlaySvg
									width={12}
									color={Colors.Green}
								/>
								<FansText
									fontSize={18}
									style={tw.style("font-semibold")}
								>
									View resources
								</FansText>
							</View>
						</RoundButton>
					</View>
				</View>
			)}

			<View>
				<View
					style={tw.style(
						"flex flex-row justify-between items-center",
					)}
				>
					<View style={tw.style("flex flex-row gap-[22px]")}>
						<FansText>Earnings Calculator</FansText>
						<Popable
							content={
								<View
									style={tw.style(
										"bg-fans-purple-light border-none px-2 py-4",
									)}
								>
									<FansText
										color="purple-a8"
										fontSize={16}
										style={tw.style("text-center")}
									>
										Use this calculator to estimate your
										potential earnings in this referral
										program. This is an estimate with no
										promises, revenue varies. Learn more
									</FansText>
								</View>
							}
							position="top"
							style={tw.style("w-[330px] z-50")}
						>
							<QuestionMarkInCircleSvg width={15} />
						</Popable>
					</View>

					<TouchableOpacity onPress={onPress}>
						<FansView width={12.28} height={6.14}>
							{isExpanded ? (
								<ChevronUp2Svg color={Colors.Grey} />
							) : (
								<ChevronDownSvg color={Colors.Grey} />
							)}
						</FansView>
					</TouchableOpacity>
				</View>
				{isExpanded && (
					<View style={tw.style("mt-4")}>
						<View style={tw.style("flex items-center gap-1 mb-3")}>
							<FansText color="green-4d" fontSize={35}>
								$10,456
							</FansText>
							<FansText color="green-4d" fontSize={14}>
								MONTHLY $$$
							</FansText>
						</View>
						<View>
							<FansText color="grey-70" fontSize={16}>
								Referrals
							</FansText>
							<View style={tw.style("mt-2")}>
								<Slider
									maximumValue={100}
									minimumValue={0}
									minimumTrackTintColor="#4DCC36"
									maximumTrackTintColor="#f0f0f0"
									thumbTintColor="#4DCC36"
									step={100 / (steps.length - 1)}
									value={1}
								/>
								<View
									style={tw.style(
										"flex flex-row justify-between mx-2 mt-1",
									)}
								>
									{steps &&
										steps.map((step, index) => (
											<FansText
												key={index}
												color="grey-70"
												fontSize={15}
											>
												{step}
											</FansText>
										))}
								</View>
							</View>
						</View>
					</View>
				)}
			</View>
		</View>
	);
};

export default JoinProgramCard;
