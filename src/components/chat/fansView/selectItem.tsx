import {
	AddSvg,
	CheckAllSvg,
	ImageSvg,
	PinSvg,
	PurpleCheckSvg,
	Remove,
	SearchSvg,
	UnNotificationSvg,
	VideoCameraSvg,
	WarningSvg,
} from "@assets/svgs/common";
import tw from "@lib/tailwind";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import Swipeable from "react-native-gesture-handler/Swipeable";

// import base modules
import { FansDivider } from "@components/controls";
import { IChat } from "@screens/fansChat/types";

interface ISelectedItemProps {
	data: IChat;
	selected: string[];
}

export default function SelectedItem({ data, selected }: ISelectedItemProps) {
	return (
		<View style={tw.style(data.warning ? "opacity-50" : "")}>
			<Swipeable>
				<View style={tw.style("flex-row items-center p-[16px] w-full")}>
					<View
						style={tw.style(
							"w-[25px] h-[25px] rounded-full mr-[22px]",
						)}
					>
						{selected.includes(data.id) ? (
							<PurpleCheckSvg />
						) : (
							<AddSvg />
						)}
					</View>
					<View
						style={tw.style(
							"w-[46px] h-[46px] relative flex items-center justify-center",
						)}
					>
						<Image
							source={require("@assets/images/posts/user-1.png")}
							alt="User"
							resizeMode="cover"
							style={tw.style("w-full h-full rounded-full")}
						/>
						<View
							style={tw.style(
								"w-[11px] h-[11px] border-[1.3px] border-white rounded-full bg-fans-green absolute bottom-[-1.3px] right-0",
							)}
						></View>
					</View>
					<View style={tw.style("pl-[13px] w-full")}>
						<View
							style={tw.style(
								"flex-row justify-between items-center w-[85%]",
							)}
						>
							<View style={tw.style("flex-row items-center")}>
								{data.pin ? (
									<PinSvg
										width={22}
										height={22}
										style={tw.style("pr-[9px]")}
									/>
								) : null}
								<Text style={tw.style("text-[19px] pr-[9px]")}>
									{data.name}
								</Text>
								{!data.unread && data.unread === 0 ? null : (
									<TouchableOpacity
										style={tw.style(
											"px-1 rounded-[12px] bg-fans-purple flex-row items-center h-[23px]",
										)}
									>
										<Text
											style={tw.style(
												"text-[14px] text-white",
											)}
										>
											{data.unread}
										</Text>
									</TouchableOpacity>
								)}
								{data.warning ? (
									<WarningSvg width={14} height={14} />
								) : null}
							</View>
						</View>
						<View style={tw.style("flex-row items-center gap-2")}>
							{data.attached === "image" && (
								<>
									<ImageSvg
										width={12}
										height={12}
										style={tw.style("text-fans-dark-grey")}
									/>
								</>
							)}
							{data.attached === "video" && (
								<>
									<VideoCameraSvg
										width={12}
										height={12}
										style={tw.style("text-fans-dark-grey")}
									/>
								</>
							)}
							<View
								style={tw.style("flex-row items-center gap-1")}
							>
								{data.id === data.replyId && data.viewed && (
									<CheckAllSvg
										width={16}
										height={16}
										style={tw.style("text-fans-purple")}
									/>
								)}
								<Text
									style={tw.style(
										"text-[16px] text-fans-dark-grey ",
									)}
								>
									{data.id === data.replyId ? "You: " : null}
									{data.msg[data.msg.length - 1].text}
								</Text>
							</View>
						</View>
					</View>
				</View>
				<FansDivider />
			</Swipeable>
		</View>
	);
}
