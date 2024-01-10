import { Text, TouchableOpacity, TouchableOpacityProps } from "react-native";
import React, { FC } from "react";

interface Props extends TouchableOpacityProps {
	icon: string;
}

const EmojiCell: FC<Props> = (props) => {
	const { icon, ...other } = props;

	return (
		<TouchableOpacity {...other}>
			<Text>{icon}</Text>
		</TouchableOpacity>
	);
};

export default EmojiCell;
