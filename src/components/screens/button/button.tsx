import tw from "@lib/tailwind";
import React from "react";
import { Text, TouchableOpacity } from "react-native";

type Props = {
	title: string;
	onClick: () => void;
};

export default function Button({ title, onClick }: Props) {
	return (
		<TouchableOpacity
			onPress={() => onClick}
			style={tw`py-[7px] bg-[#A854F5] rounded-full flex-row justify-center px-[30px]`}
		>
			<Text style={tw`text-[#ffffff] text-sm font-bold`}>{title}</Text>
		</TouchableOpacity>
	);
}
