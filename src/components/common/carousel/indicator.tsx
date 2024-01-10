import { View, Pressable } from "react-native";
import React, { FC } from "react";

import tw from "@lib/tailwind";

interface Props {
	index: number;
	length: number;
	onClickDot: (index: number) => void;
}

const Indicator: FC<Props> = (props) => {
	const { index, length, onClickDot } = props;
	return (
		<View
			style={tw.style(
				"absolute bottom-5 gap-x-[5px] left-0 flex-row w-full justify-center",
				length === 0 || length === 1 ? "hidden" : "",
			)}
		>
			{[...Array(length)].map((el, ix) => (
				<Pressable
					key={ix}
					style={tw.style(
						"w-[5px] h-[5px] rounded-full",
						ix === index
							? "bg-white"
							: "bg-[rgba(255,255,255,0.45)]",
					)}
					onPress={() => onClickDot(ix)}
				></Pressable>
			))}
		</View>
	);
};

export default Indicator;
