import { View } from "react-native";
import React, { FC } from "react";
import tw from "@lib/tailwind";
import clsx from "clsx";

import { DiscordSvg } from "@assets/svgs/common";
import { ComponentSizeTypes } from "@usertypes/commonEnums";
import { getIconSize } from "@utils/common";

interface Props {
	size: ComponentSizeTypes;
}

const Discord: FC<Props> = (props) => {
	const { size } = props;

	const styles = clsx(
		"rounded-full items-center justify-center bg-[#5865f2]",
		{
			"w-6 h-6": size === ComponentSizeTypes.xs,
			"w-[34px] h-[34px]": size === ComponentSizeTypes.sm, // 34px
			"w-[42px] h-[42px]": size === ComponentSizeTypes.md, // 42px
		},
	);

	return (
		<View style={tw.style(styles)}>
			<View
				style={{
					width: getIconSize(23.7, 17.9, size).width,
					height: getIconSize(23.7, 17.9, size).height,
				}}
			>
				<DiscordSvg color="#fff" />
			</View>
		</View>
	);
};

export default Discord;
