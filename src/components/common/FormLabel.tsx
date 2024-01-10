import tw from "@lib/tailwind";
import React from "react";
import { Text } from "react-native";
type Props = {
	title: string;
};

export default function FormLabel({ title = "" }: Props) {
	return (
		<Text
			style={tw`text-[17px] text-black leading-[22px] mb-[14px] font-inter-semibold`}
		>
			{title}
		</Text>
	);
}
