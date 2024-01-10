import { View } from "react-native";
import React, { FC } from "react";
import tw from "@lib/tailwind";
import clsx from "clsx";

import { TwitchSvg } from "@assets/svgs/common";
import { ComponentSizeTypes } from "@usertypes/commonEnums";
import { getIconSize } from "@utils/common";

interface Props {
	size: ComponentSizeTypes;
}

const Twitch: FC<Props> = (props) => {
	const { size } = props;

	const styles = clsx(
		"rounded-full items-center justify-center bg-[#9147fe]",
		{
			"w-6 h-6": size === ComponentSizeTypes.xs,
			"w-[34px] h-[34px]": size === ComponentSizeTypes.sm, // 34px
			"w-[42px] h-[42px]": size === ComponentSizeTypes.md, // 42px
		},
	);

	const getIconSizes = () => {
		switch (size) {
			case ComponentSizeTypes.sm:
				return { width: 15.46, height: 16.17 };
			case ComponentSizeTypes.md:
				return { width: 18.55, height: 19.4 };
			default:
				return { width: 18.55, height: 19.4 };
		}
	};

	return (
		<View style={tw.style(styles)}>
			<TwitchSvg
				color="#fff"
				width={getIconSize(18.55, 19.4, size).width}
				height={getIconSize(18.55, 19.4, size).height}
			/>
		</View>
	);
};

export default Twitch;
