import React from "react";
import tw from "@lib/tailwind";
import { View, Image, Text } from "react-native";
import { CheckSvg, DiamondSvg, WarningSvg } from "@assets/svgs/common";
import { warningNotification } from "@usertypes/notifications";

// import base modules
import { FansDivider } from "@components/controls";

type Props = {
	data: warningNotification;
};

export default function WarningNotification({ data }: Props) {
	return (
		<View>
			<View style={tw.style("flex flex-row py-[16px]")}>
				<WarningSvg width={46} height={46} style={tw` mr-3`} />
				<Text style={tw.style("w-[300px] text-lg")}>
					{" "}
					{data.description}{" "}
					<Text style={tw.style("text-fans-purple")}>
						{data.link}
					</Text>{" "}
					<Text style={tw.style("text-fans-dark-grey")}>
						.{data.date}
					</Text>
				</Text>
				{data.postImage ? (
					<Image
						source={{ uri: data.postImage }}
						alt="User"
						resizeMode="cover"
						style={tw.style("w-[46px] h-[46px] rounded-lg ml-3")}
					/>
				) : null}
			</View>
			<FansDivider />
		</View>
	);
}
