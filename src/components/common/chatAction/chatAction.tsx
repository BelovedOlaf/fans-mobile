import { View, Text, TouchableOpacity } from "react-native";
import React, { FC } from "react";
import tw from "@lib/tailwind";
import { Menu } from "react-native-paper";
import {
	CopyLinkSvg,
	OutlinedPinSvg,
	ReplySvg,
	UnsendSvg,
	WarningSvg,
} from "@assets/svgs/common";

interface Props {
	open: boolean;
	onClose: () => void;
	onSelect: (val: string) => void;
	onOpen: () => void;
	message: unknown;
	id: string;
}

const ChatAction: FC<Props> = (props) => {
	const { open, onClose, onSelect, onOpen, message, id } = props;

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
			contentStyle={tw.style("bg-white px-5 top-[50px] rounded-[21px]")}
		>
			<View
				style={tw.style(
					"flex-row items-center gap-x-2 bg-white py-[8px]",
				)}
			>
				<ReplySvg width={18} height={18} />
				<Text style={tw.style("text-[17px]")}>Reply</Text>
			</View>
			<View
				style={tw.style(
					"flex-row items-center gap-x-2 bg-white py-[8px]",
				)}
			>
				<CopyLinkSvg width={18} height={18} />
				<Text style={tw.style("text-[17px]")}>Copy</Text>
			</View>
			<View
				style={tw.style(
					"flex-row items-center gap-x-2 bg-white py-[8px]",
				)}
			>
				<OutlinedPinSvg width={18} height={18} />
				<Text style={tw.style("text-[17px]")}>Pin</Text>
			</View>
			<View
				style={tw.style(
					"flex-row items-center gap-x-2 bg-white py-[8px]",
				)}
			>
				<UnsendSvg width={18} height={18} />
				<Text style={tw.style("text-[17px]")}>Unsend 300s</Text>
			</View>
			<View
				style={tw.style(
					"flex-row items-center gap-x-2 bg-white py-[8px]",
				)}
			>
				<WarningSvg width={18} height={18} />
				<Text style={tw.style("text-[#EB2121] text-[17px]")}>
					Report
				</Text>
			</View>
		</Menu>
	);
};

export default ChatAction;
