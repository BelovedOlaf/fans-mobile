import {
	View,
	Text,
	TouchableOpacity,
	TouchableOpacityProps,
} from "react-native";
import React, { FC } from "react";
import tw from "@lib/tailwind";

interface Props extends TouchableOpacityProps {
	title: string;
	icon: React.ReactNode;
	labelClass?: string;
	endIcon?: React.ReactNode;
}

const MenuItem: FC<Props> = (props) => {
	const { title, icon, labelClass, endIcon, ...others } = props;

	return (
		<TouchableOpacity
			style={tw.style("flex-row items-center px-[18px] h-[52px]")}
			{...others}
		>
			<View
				style={tw.style(
					"w-7 flex items-center justify-center mr-[18px]",
				)}
			>
				{icon}
			</View>
			<Text style={tw.style("text-[18px] leading-6", labelClass)}>
				{title}
			</Text>
			<View style={tw.style("ml-auto")}>{endIcon}</View>
		</TouchableOpacity>
	);
};

export default MenuItem;
