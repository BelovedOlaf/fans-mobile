import { View, Text, Pressable } from "react-native";
import React, { FC } from "react";
import tw from "@lib/tailwind";

import IconComponents from "@helper/iconComponents";
import { ICardAction } from "@usertypes/types";

interface Props {
	data: ICardAction;
}

const MenuItem: FC<Props> = (props) => {
	const { title, iconType, iconColor, onClick, labelClass, iconSize } =
		props.data;

	const IconComponent = Object.hasOwnProperty.call(IconComponents, iconType)
		? IconComponents[iconType]
		: undefined;

	return (
		<Pressable
			style={tw.style("flex-row items-center px-[18px] h-[52px]")}
			onPress={onClick}
		>
			<View
				style={tw.style(
					"w-7 flex items-center justify-center mr-[18px]",
				)}
			>
				{IconComponent ? (
					<IconComponent
						size={iconSize ?? 24}
						color={iconColor ?? "#000"}
					/>
				) : null}
			</View>
			<Text style={tw.style("text-[18px] leading-6", labelClass)}>
				{title}
			</Text>
		</Pressable>
	);
};

export default MenuItem;
