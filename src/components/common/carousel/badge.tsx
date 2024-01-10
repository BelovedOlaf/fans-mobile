import { View } from "react-native";
import React, { FC } from "react";

import { FansText } from "@components/controls";

import tw from "@lib/tailwind";

interface Props {
	index: number;
	length: number;
}

const Badge: FC<Props> = (props) => {
	const { index, length } = props;
	return (
		<View
			style={tw.style(
				"absolute top-[20px] right-[17.5px] px-[8.5px] py-[3.5px] rounded-[20px] bg-[rgba(0,0,0,0.5)]",
				(length === 0 || length === 1) && "hidden",
			)}
		>
			<FansText color="white" fontSize={14} lineHeight={20}>
				{`${index + 1}/${length}`}
			</FansText>
		</View>
	);
};

export default Badge;
