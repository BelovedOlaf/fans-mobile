import {
	AttachmentSvg,
	BlockSvg,
	EyeHideSvg,
	ImageSvg,
	ListSvg,
	Note2Svg,
	OutlinedPinSvg,
	StarCheckSvg,
	UnNotificationSvg,
	WarningSvg,
} from "@assets/svgs/common";
import {
	FansDivider,
	FansGap,
	FansImage,
	FansSheet,
	FansText,
	FansView,
} from "@components/controls";
import tw from "@lib/tailwind";
import { IFansSheet } from "@usertypes/components";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

interface IData {
	name: string;
	nickname: string;
}

const ProfileSheet: IFansSheet<IData> = (props) => {
	const { visible, data, onClose: trigClose, onSubmit: trigSubmit } = props;
	const { name, nickname } = data ?? { name: "", nickname: "" };

	const handlePressMedia = () => {
		trigClose();
		trigSubmit("Media");
	};

	const handlePressNotes = () => {
		trigClose();
		trigSubmit("Notes");
	};

	const handlePressPinned = () => {
		trigClose();
		trigSubmit("Pinned");
	};

	return (
		<FansSheet visible={visible} onClose={trigClose} onSubmit={trigSubmit}>
			<FansGap height={46} />
			<FansView
				style={tw.style("lg:w-[433px]", "px-[17px] lg:px-[37px]")}
			>
				<View style={tw.style("flex items-center")}>
					<FansView style={tw.style("w-[95px] h-[95px]")}>
						<FansImage
							source={require("@assets/images/default-avatar.png")}
						/>
					</FansView>
					<FansGap height={8} />
					<View style={tw.style("flex-row gap-[6px] items-center")}>
						<Text
							style={tw.style("font-inter-bold", "text-[19px]")}
						>
							{name}
						</Text>
						<View style={tw.style("w-[15.66px] h-[15px]")}>
							<StarCheckSvg />
						</View>
					</View>
					<FansGap height={1} />
					<Text style={tw.style("text-[16px] text-fans-grey-dark")}>
						@{nickname}
					</Text>
					<FansGap height={24} />
					<View style={tw.style("flex-row gap-[40px] items-center")}>
						{[
							{
								icon: (
									<FansView
										style={tw.style(
											"w-[21.69px] h-[21.69px]",
										)}
									>
										<ImageSvg color="white" />
									</FansView>
								),
								text: "Media",
								onPress: handlePressMedia,
							},
							{
								icon: (
									<FansView
										style={tw.style(
											"w-[20.88px] h-[20.88px]",
										)}
									>
										<OutlinedPinSvg
											color={tw.color("fans-white")}
										/>
									</FansView>
								),
								text: "Pinned",
								onPress: handlePressPinned,
							},
							{
								icon: (
									<FansView
										style={tw.style(
											"w-[20.46px] h-[20.46px]",
										)}
									>
										<Note2Svg
											color={tw.color("fans-white")}
										/>
									</FansView>
								),
								text: "Notes",
								onPress: handlePressNotes,
							},
						].map((item, index) => {
							const { icon, text, onPress } = item;
							return (
								<View
									key={text}
									style={tw.style("flex items-center")}
								>
									<FansView
										width={46}
										height={46}
										alignItems="center"
										backgroundColor="purple-a8"
										borderRadius="full"
										justifyContent="center"
									>
										<TouchableOpacity onPress={onPress}>
											{icon}
										</TouchableOpacity>
									</FansView>
									<FansGap height={8} />
									<FansText
										fontFamily="inter-medium"
										fontSize={16}
									>
										{text}
									</FansText>
								</View>
							);
						})}
					</View>
				</View>
				<FansGap height={19.5} />
				<FansDivider ver1 />
				<FansGap height={7.5} />
				{[
					{
						icon: (
							<FansView
								style={tw.style("w-[24.39px] h-[24.41px]")}
							>
								<AttachmentSvg color="black" />
							</FansView>
						),
						text: "Copy profile link",
					},
					{
						icon: (
							<FansView style={tw.style("w-[24.26px] h-[23px]")}>
								<ListSvg color="black" />
							</FansView>
						),
						text: "Add/remove from lists",
					},
					{
						icon: (
							<FansView style={tw.style("w-[25px] h-[21.45px]")}>
								<EyeHideSvg color="black" />
							</FansView>
						),
						text: "Hide chat",
					},
					{
						icon: (
							<FansView
								style={tw.style("w-[23.16px] h-[23.17px]")}
							>
								<UnNotificationSvg color="black" />
							</FansView>
						),
						text: "Mute notifications",
					},
					{
						icon: (
							<FansView
								style={tw.style("w-[24.29px] h-[24.29px]")}
							>
								<BlockSvg color="red" />
							</FansView>
						),
						text: "Block",
						textColor: "text-fans-red",
					},
					{
						icon: (
							<FansView style={tw.style("w-[25px] h-[22.57px]")}>
								<WarningSvg color="red" />
							</FansView>
						),
						text: "Report profile",
						textColor: "text-fans-red",
					},
				].map((item, index) => {
					const { icon, text, textColor } = item;
					return (
						<FansView
							key={text}
							style={tw.style(
								"h-[52px]",
								"flex-row gap-[20px] items-center",
							)}
						>
							{icon}
							<FansText
								style={tw.style("text-[18px]", textColor)}
							>
								{text}
							</FansText>
						</FansView>
					);
				})}
			</FansView>
		</FansSheet>
	);
};

export default ProfileSheet;
