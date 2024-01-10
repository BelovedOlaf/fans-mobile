import { DateTime } from "luxon";

import React, { useState } from "react";
import { TouchableOpacity } from "react-native";

import {
	Calendar2Svg,
	Check3Svg,
	Clock1Svg,
	Edit2Svg,
	EditNote1Svg,
	Trash2Svg,
} from "@assets/svgs/common";
import {
	FansButton3,
	FansGap,
	FansHorizontalDivider,
	FansScreen2,
	FansScreen3,
	FansSvg,
	FansView,
} from "@components/controls";
import { FansImage2 } from "@components/controls/Image";
import { FansText } from "@components/controls/Text";
import tw from "@lib/tailwind";
import { SettingsNativeStackScreenProps } from "@usertypes/navigations";

const ScheduledPostsScreen = (
	props: SettingsNativeStackScreenProps<"ScheduledPosts">,
) => {
	const [posts, setPosts] = useState([
		{
			id: 1,
			image: "https://i.postimg.cc/J7vXYBL0/image.png",
			text: "Hello everyone! I’m back! Hope you’re all having a nice week",
			time: "2023-09-05T23:39:10.318Z",
		},
		{
			id: 2,
			image: "https://i.postimg.cc/J7vXYBL0/image.png",
			text: "Hello everyone! I’m back! Hope you’re all having a nice week",
			time: "2023-09-05T23:39:10.318Z",
		},
		{
			id: 3,
			image: "https://i.postimg.cc/J7vXYBL0/image.png",
			text: "Hello everyone! I’m back! Hope you’re all having a nice week",
			time: "2023-09-05T23:39:10.318Z",
		},
		{
			id: 4,
			posted: true,
			image: "https://i.postimg.cc/J7vXYBL0/image.png",
			text: "Hello everyone! I’m back! Hope you’re all having a nice week",
			time: "2023-09-05T23:39:10.318Z",
		},
	]);

	const trigDelete = (id: number) => {
		const items = posts.filter((value) => value.id !== id);
		setPosts(items);
	};

	return (
		<FansScreen3 contentStyle1={{ maxWidth: { lg: 670 } }}>
			<FansGap height={{ lg: 43.4 }} />
			<FansButton3
				title="New Post"
				icon={
					<FansSvg
						width={13.72}
						height={13.69}
						svg={EditNote1Svg}
						color1="purple"
					/>
				}
				buttonStyle={{ backgroundColor: "white", gap: 7.1 }}
				textStyle1={{ color: "purple" }}
			/>
			<FansGap height={27.3} />
			<FansView gap={9}>
				{posts
					.filter((item) => !item.posted)
					.map((item, index) => {
						const { id, image, text, time } = item;

						const handlePress = () => trigDelete(id);

						return (
							<FansView
								key={index}
								alignItems="center"
								flexDirection="row"
							>
								<FansView
									width={0}
									style={tw.style("p-[17px]")}
									borderColor="grey-f0"
									borderRadius={15}
									grow
								>
									<FansView
										alignItems={{ lg: "center" }}
										flexDirection="row"
										gap={15.8}
									>
										<FansImage2
											width={95}
											height={95}
											source={{ uri: image }}
											viewStyle={{ borderRadius: 7 }}
											imageStyle={{ resizeMode: "cover" }}
										/>
										<FansText
											color="grey-70"
											fontSize={16}
											lineHeight={21}
										>
											{text}
										</FansText>
									</FansView>
									<FansGap height={16.8} />
									<FansHorizontalDivider />
									<FansGap height={14.7} />
									<FansView flexDirection="row" gap={17.1}>
										<FansView flexDirection="row" gap={7.5}>
											<FansSvg
												width={16.18}
												height={18.09}
												svg={Calendar2Svg}
												color1="purple"
											/>
											<FansText
												fontFamily="inter-semibold"
												fontSize={17}
												textTransform="uppercase"
											>
												{DateTime.fromISO(
													time,
												).toFormat("MMM d")}{" "}
											</FansText>
										</FansView>
										<FansView flexDirection="row" gap={6.4}>
											<FansSvg
												width={18.38}
												height={18.38}
												svg={Clock1Svg}
												color1="purple"
											/>
											<FansText
												fontFamily="inter-semibold"
												fontSize={17}
											>
												{DateTime.fromISO(
													time,
												).toFormat("hh:mm a")}
											</FansText>
										</FansView>
									</FansView>
								</FansView>
								<FansGap width={18} />
								<FansView gap={7}>
									<FansView
										width={34}
										height={34}
										alignItems="center"
										backgroundColor="grey-f0"
										borderRadius="full"
										justifyContent="center"
									>
										<FansSvg
											width={12.94}
											height={13.5}
											svg={Edit2Svg}
										/>
									</FansView>
									<TouchableOpacity onPress={handlePress}>
										<FansView
											width={34}
											height={34}
											alignItems="center"
											backgroundColor="grey-f0"
											borderRadius="full"
											justifyContent="center"
										>
											<FansSvg
												width={11.87}
												height={14.76}
												svg={Trash2Svg}
												color1="red"
											/>
										</FansView>
									</TouchableOpacity>
								</FansView>
							</FansView>
						);
					})}
			</FansView>
			<FansGap height={13.4} />
			<FansHorizontalDivider />
			<FansGap height={13.6} />
			<FansView gap={9} opacity={50}>
				{posts
					.filter((item) => item.posted)
					.map((item, index) => {
						const { image, text, time } = item;

						return (
							<FansView
								key={index}
								style={tw.style("p-[17px]")}
								borderColor="grey-f0"
								borderRadius={15}
							>
								<FansView
									alignItems={{ lg: "center" }}
									flexDirection="row"
									gap={15.8}
								>
									<FansImage2
										width={95}
										height={95}
										source={{ uri: image }}
										viewStyle={{ borderRadius: 7 }}
										imageStyle={{ resizeMode: "cover" }}
									/>
									<FansText
										color="grey-70"
										fontSize={16}
										lineHeight={21}
									>
										{text}
									</FansText>
								</FansView>
								<FansGap height={16.8} />
								<FansHorizontalDivider />
								<FansGap height={14.7} />
								<FansView
									alignItems="center"
									flexDirection="row"
									justifyContent="between"
								>
									<FansView flexDirection="row" gap={17.1}>
										<FansView flexDirection="row" gap={7.5}>
											<FansSvg
												width={16.18}
												height={18.09}
												svg={Calendar2Svg}
												color1="purple"
											/>
											<FansText
												fontFamily="inter-semibold"
												fontSize={17}
												textTransform="uppercase"
											>
												{DateTime.fromISO(
													time,
												).toFormat("MMM d")}{" "}
											</FansText>
										</FansView>
										<FansView flexDirection="row" gap={6.4}>
											<FansSvg
												width={18.38}
												height={18.38}
												svg={Clock1Svg}
												color1="purple"
											/>
											<FansText
												fontFamily="inter-semibold"
												fontSize={17}
											>
												{DateTime.fromISO(
													time,
												).toFormat("hh:mm a")}
											</FansText>
										</FansView>
									</FansView>
									<FansView
										width={103.76}
										height={30}
										style={tw.style("bg-fans-purple/20")}
										alignItems="center"
										borderRadius="full"
										flexDirection="row"
										gap={9.1}
										justifyContent="center"
									>
										<FansSvg
											width={10.8}
											height={7.19}
											svg={Check3Svg}
											color1="purple"
										/>
										<FansText
											color="purple"
											fontFamily="inter-semibold"
											fontSize={13}
										>
											POSTED
										</FansText>
									</FansView>
								</FansView>
							</FansView>
						);
					})}
			</FansView>
			<FansGap height={20} />
		</FansScreen3>
	);
};

export default ScheduledPostsScreen;
