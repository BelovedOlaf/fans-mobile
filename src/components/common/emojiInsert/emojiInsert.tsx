import { View, TouchableOpacity } from "react-native";
import React, { FC } from "react";
import tw from "@lib/tailwind";
import { Menu } from "react-native-paper";

import EmojiCell from "./emojiCell";
import { EmojiSvg } from "@assets/svgs/common";

interface Props {
	open: boolean;
	onClose: () => void;
	icons: string[];
	onSelect: (val: string) => void;
	onOpen: () => void;
}

const EmojiInsert: FC<Props> = (props) => {
	const { open, onClose, icons, onSelect, onOpen } = props;

	return (
		<Menu
			visible={open}
			onDismiss={onClose}
			anchor={
				<TouchableOpacity onPress={onOpen}>
					<EmojiSvg width={20.78} height={20.77} color="#707070" />
				</TouchableOpacity>
			}
			anchorPosition="top"
			contentStyle={tw.style("bg-white px-3")}
		>
			<View style={tw.style("flex-row gap-x-2 bg-white")}>
				{icons.map((icon, index) => (
					<EmojiCell
						key={index}
						icon={icon}
						onPress={() => onSelect(icon)}
					/>
				))}
			</View>
		</Menu>
	);
};

export default EmojiInsert;
