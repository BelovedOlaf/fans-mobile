import { View } from "react-native";
import React, { FC } from "react";
import tw from "@lib/tailwind";
import clsx from "clsx";

import { FacebookSvg } from "@assets/svgs/common";
import { ComponentSizeTypes } from "@usertypes/commonEnums";
import { getIconSize } from "@utils/common";

interface Props {
	size: ComponentSizeTypes;
}

const Facebook: FC<Props> = (props) => {
	const { size } = props;

	const styles = clsx(
		"rounded-full items-center justify-center bg-[#3b5998]",
		{
			"w-6 h-6": size === ComponentSizeTypes.xs,
			"w-[34px] h-[34px]": size === ComponentSizeTypes.sm, // 34px
			"w-[42px] h-[42px]": size === ComponentSizeTypes.md, // 42px
		},
	);

	return (
		<View style={tw.style(styles)}>
			<FacebookSvg
				color="#fff"
				width={getIconSize(14.23, 23.94, size).width}
				height={getIconSize(14.23, 23.94, size).height}
			/>
		</View>
	);
};

export default Facebook;
