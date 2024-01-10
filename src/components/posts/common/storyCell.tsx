import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { FC } from "react";
import tw from "@lib/tailwind";

import { RoundedBorderSvg } from "@assets/svgs/common";
import { cdnURL } from "@helper/Utils";

interface Props {
	image: string;
	title: string;
	note?: string;
	isSelected?: boolean;
	onClick: () => void;
}

const StoryCell: FC<Props> = (props) => {
	const { image, title, onClick, isSelected } = props;

	return (
		<TouchableOpacity
			onPress={onClick}
			style={tw.style("items-center max-w-[100px]")}
		>
			<View
				style={tw.style(
					"w-[76px] h-[76px] flex items-center justify-center",
					"rounded-full relative",
					isSelected ? "border-0" : "border border-fans-grey",
				)}
			>
				{image ? (
					<Image
						source={{ uri: cdnURL(image) }}
						resizeMode="cover"
						style={tw.style("w-[68px] h-[68px] rounded-full")}
					/>
				) : (
					<View
						style={tw.style("w-[68px] h-[68px] rounded-full")}
					></View>
				)}

				{isSelected ? (
					<RoundedBorderSvg
						size={76}
						style={tw.style("absolute top-0 left-0")}
					/>
				) : null}
			</View>
			<Text
				style={tw.style(
					"mt-1 text-center text-[15px] leading-[21px] text-black",
				)}
			>
				{title}
			</Text>
		</TouchableOpacity>
	);
};

export default StoryCell;
