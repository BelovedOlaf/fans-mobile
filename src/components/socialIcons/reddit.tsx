import { View } from "react-native";
import React, { FC } from "react";
import tw from "@lib/tailwind";
import clsx from "clsx";

import { RedditSvg } from "@assets/svgs/common";
import { ComponentSizeTypes } from "@usertypes/commonEnums";
import { getIconSize } from "@utils/common";

interface Props {
	size: ComponentSizeTypes;
}

const Reddit: FC<Props> = (props) => {
	const { size } = props;

	const styles = clsx(
		"rounded-full items-center justify-center bg-[#ff4300]",
		{
			"w-6 h-6": size === ComponentSizeTypes.xs,
			"w-[34px] h-[34px]": size === ComponentSizeTypes.sm, // 34px
			"w-[42px] h-[42px]": size === ComponentSizeTypes.md, // 42px
		},
	);

	return (
		<View style={tw.style(styles)}>
			<RedditSvg
				color="#fff"
				width={getIconSize(25.16, 22.42, size).width}
				height={getIconSize(25.16, 22.42, size).height}
			/>
		</View>
	);
};

export default Reddit;
