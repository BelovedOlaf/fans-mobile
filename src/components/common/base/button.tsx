import { Pressable, PressableProps, TextStyle, ViewStyle } from "react-native";
import React, { FC } from "react";

import FypText from "./text";
import FypNullableView from "./nullableView";

import tw from "@lib/tailwind";

interface Props extends PressableProps {
	children: React.ReactNode;
	textStyle?: TextStyle;
	icon?: React.ReactNode;
}

const FypButton: FC<Props> = (props) => {
	const { children, textStyle, style, icon, ..._props } = props;
	return (
		<Pressable
			style={[
				tw.style("flex-row items-center justify-center"),
				style as ViewStyle,
			]}
			{..._props}
		>
			<FypNullableView visible={!!icon}>{icon}</FypNullableView>
			<FypText style={textStyle}>{children}</FypText>
		</Pressable>
	);
};

export default FypButton;
