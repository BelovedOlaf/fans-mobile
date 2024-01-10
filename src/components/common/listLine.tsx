import { View, Text } from "react-native";
import React, { FC } from "react";
import tw from "@lib/tailwind";
import clsx from "clsx";

import { ListMarkSvg } from "@assets/svgs/common";

interface Props {
	text: string;
	size?: "lg";
}

const ListLine: FC<Props> = (props) => {
	const { text, size } = props;

	return (
		<View style={tw.style("flex-row items-start")}>
			<View style={tw.style({ "mt-1": size === "lg" })}>
				<ListMarkSvg
					width={size === "lg" ? 13 : 12}
					height={size === "lg" ? 13 : 12}
				/>
			</View>
			<Text
				style={tw.style(
					clsx("text-[13px] leading-[17px] ml-2", {
						"text-base leading-[21px] ml-[10px]": size === "lg",
					}),
				)}
			>
				{text}
			</Text>
		</View>
	);
};

export default ListLine;
