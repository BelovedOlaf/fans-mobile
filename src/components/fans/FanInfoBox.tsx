import React from "react";
import tw from "@lib/tailwind";
import { View, Image, Text } from "react-native";
import { SimpleFanInfoType } from "@usertypes/fan";
import { CheckSvg, DiamondSvg } from "@assets/svgs/common";
import { addCommasPerThreeNumber } from "@utils/stringHelper";

type Props = {
	fanInfo: SimpleFanInfoType;
};

export default function FanInfoBox({ fanInfo }: Props) {
	return (
		<View style={tw`w-full flex flex-row items-center py-4`}>
			<View
				style={tw`w-[25px] h-[25px] bg-fans-purple rounded-full flex items-center justify-center`}
			>
				<CheckSvg width={13.188} height={9.048} />
			</View>
			<View style={tw`ml-[22px] w-[46px] h-[46px] rounded-full`}>
				<Image
					source={require("@assets/profile.png")}
					style={{ width: "100%", height: "100%" }}
				/>
			</View>
			<View style={tw`ml-[13px] flex flex-col justify-center`}>
				<Text
					style={tw`text-[19px] text-black font-inter-bold leading-[26px]`}
				>
					{fanInfo.username}
				</Text>
				<Text
					style={tw`mt-[-4px] text-base leading-[21px] text-fans-dark-grey font-inter-regular`}
				>
					{`Level ${fanInfo.level}`}
				</Text>
			</View>
			<View style={tw`ml-auto flex flex-row items-center`}>
				<DiamondSvg width={15} height={15} />
				<Text
					style={tw`ml-2 text-fans-purple text-base leading-normal font-inter-medium pb-1`}
				>
					{addCommasPerThreeNumber(fanInfo.favoriteCount)}
				</Text>
			</View>
		</View>
	);
}
