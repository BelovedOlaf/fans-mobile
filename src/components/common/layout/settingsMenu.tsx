import { View, ScrollView, Pressable, Text } from "react-native";
import React, { FC } from "react";
import { IconButton } from "react-native-paper";
import tw from "@lib/tailwind";

import MenuItem from "./menuItem";
import FansDivider from "../../controls/Divider";
import { CloseSvg, ChevronLeftSvg } from "@assets/svgs/common";

interface Props {
	onClose: () => void;
	onClickBack: () => void;
}

const SettingsMenu: FC<Props> = (props) => {
	const { onClose, onClickBack } = props;

	return (
		<ScrollView
			contentContainerStyle={tw.style(
				"border-r border-[#dedede] flex-1 pb-5",
			)}
		>
			<View
				style={tw.style("pt-8 pl-3 pr-5 lg:pt-15.5 lg:pl-5 lg:pr-7.5")}
			>
				<View
					style={tw.style(
						"flex-row items-center pl-[55px] lg:pl-[62px] relative",
					)}
				>
					<Pressable
						style={tw.style(
							"absolute left-[15px] w-5 h-5 justify-center",
						)}
						onPress={onClickBack}
					>
						<ChevronLeftSvg
							color="#707070"
							style={tw.style(
								"h-[14.5px] w-[8.3px] lg:w-[9.5px] lg:h-4",
							)}
						/>
					</Pressable>
					<Text
						style={tw.style(
							"text-base leading-[21px] lg:text-[23px] lg:leading-[31px] font-bold",
						)}
					>
						Settings
					</Text>
					<IconButton
						icon={() => (
							<CloseSvg
								style={tw.style(
									"w-3 h-3 lg:w-[14.45px] lg:h-[14.45px]",
								)}
								color="#fff"
							/>
						)}
						containerColor="bg-[rgba(0,0,0,0.3)]"
						style={tw.style(
							"w-6 h-6 lg:w-7.5 lg:h-7.5 ml-auto my-0 mr-0",
						)}
						onPress={onClose}
					/>
				</View>

				<View
					style={tw.style(
						"w-[214px] lg:w-[298px] gap-y-3 mt-[38px] lg:mt-14 lg:gap-y-4",
					)}
				>
					<MenuItem title="Account" />
					<MenuItem title="Payments" />
					<MenuItem title="Analytics" />
					<MenuItem title="Referral setup" />
					<MenuItem title="Privacy & Safety" />
					<FansDivider />
					<MenuItem title="Notifications" />
					<MenuItem title="Discord integration" />
					<MenuItem title="Automated chats" />
					<MenuItem title="Scheduled posts" />
				</View>
			</View>
		</ScrollView>
	);
};

export default SettingsMenu;
