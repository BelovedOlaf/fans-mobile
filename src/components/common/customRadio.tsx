import { View, Text, Pressable } from "react-native";
import React, { FC } from "react";
import tw from "@lib/tailwind";

interface Props {
	label: string;
	onPress: () => void;
	checked: boolean;
	svg?: React.ReactNode;
	labelStyles?: string;
	bgColor?: string;
}

const CustomRadio: FC<Props> = (props) => {
	const {
		label,
		onPress,
		checked,
		svg,
		labelStyles,
		bgColor = "fans-purple",
	} = props;

	return (
		<Pressable style={tw.style("flex-row items-center")} onPress={onPress}>
			<View
				style={tw.style(
					"w-[25px] h-[25px] items-center justify-center border border-fans-dark-grey rounded-full",
				)}
			>
				{checked ? (
					<View
						style={tw.style(
							`w-[15px] h-[15px] rounded-full bg-${bgColor}`,
						)}
					></View>
				) : null}
			</View>
			{svg ? <View style={tw.style("ml-[18px]")}>{svg}</View> : null}
			<Text
				style={tw.style("text-[18px] leading-6 ml-[18px]", labelStyles)}
			>
				{label}
			</Text>
		</Pressable>
	);
};

export default CustomRadio;
