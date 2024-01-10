import { View, Text, TouchableOpacity } from "react-native";
import React, { FC } from "react";
import tw from "@lib/tailwind";
import { Menu } from "react-native-paper";
import EmojiCell from "./emojiCell";

interface Props {
	open: boolean;
	onClose: () => void;
	onSelect: (val: string) => void;
	onOpen: () => void;
	message: unknown;
	id: string;
}

const EmojiReply: FC<Props> = (props) => {
	const { open, onClose, onSelect, onOpen, message, id } = props;

	const icons = ["❤", "👏", "🔥", "🙌", "😍", "😂", "😮"];

	return (
		<Menu
			visible={open}
			onDismiss={onClose}
			anchor={
				<TouchableOpacity>
					<Text style={tw.style("text-[1px] text-white")}>Emoji</Text>
				</TouchableOpacity>
			}
			anchorPosition="top"
			contentStyle={tw.style("bg-white px-3 top-[-40px]")}
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

export default EmojiReply;
