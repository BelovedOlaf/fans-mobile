import { View } from "react-native";
import React, { FC } from "react";
import tw from "@lib/tailwind";
import clsx from "clsx";

import { SnapchatSvg } from "@assets/svgs/common";
import { ComponentSizeTypes } from "@usertypes/commonEnums";
import { getIconSize } from "@utils/common";

interface Props {
	size: ComponentSizeTypes;
}

const Snapchat: FC<Props> = (props) => {
	const { size } = props;

	const styles = clsx(
		"rounded-full items-center justify-center bg-[#fffc00]",
		{
			"w-6 h-6": size === ComponentSizeTypes.xs, // 24px
			"w-[34px] h-[34px]": size === ComponentSizeTypes.sm, // 34px
			"w-[42px] h-[42px]": size === ComponentSizeTypes.md, // 42px
		},
	);

	return (
		<View style={tw.style(styles)}>
			<SnapchatSvg
				color="#000"
				width={getIconSize(24.3, 23.94, size).width}
				height={getIconSize(24.3, 23.94, size).height}
			/>
		</View>
	);
};

export default Snapchat;
