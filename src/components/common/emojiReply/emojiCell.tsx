import { Text, TouchableOpacity, TouchableOpacityProps } from "react-native";
import React, { FC } from "react";
import tw from "@lib/tailwind";

interface Props extends TouchableOpacityProps {
	icon: string;
}

const EmojiCell: FC<Props> = (props) => {
	const { icon, ...other } = props;

	return (
		<TouchableOpacity {...other}>
			<Text style={tw.style("text-[20px]")}>{icon}</Text>
		</TouchableOpacity>
	);
};

export default EmojiCell;
