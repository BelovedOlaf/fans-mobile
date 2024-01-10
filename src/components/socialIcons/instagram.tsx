import { ImageBackground } from "react-native";
import React, { FC } from "react";
import tw from "@lib/tailwind";
import clsx from "clsx";

import { InstagramSvg } from "@assets/svgs/common";
import { ComponentSizeTypes } from "@usertypes/commonEnums";
import { getIconSize } from "@utils/common";

interface Props {
	size: ComponentSizeTypes;
}

const Instagram: FC<Props> = (props) => {
	const { size } = props;

	const styles = clsx("rounded-full items-center justify-center", {
		"w-6 h-6": size === ComponentSizeTypes.xs,
		"w-[42px] h-[42px]": size === ComponentSizeTypes.md, // 42px
		"w-[34px] h-[34px]": size === ComponentSizeTypes.sm, // 34px
	});

	return (
		<ImageBackground
			style={tw.style(styles)}
			source={require("@assets/images/posts/instagram-bg.png")}
			resizeMode="cover"
		>
			<InstagramSvg
				width={getIconSize(22.22, 22.28, size).width}
				height={getIconSize(22.22, 22.28, size).height}
				color="#fff"
			/>
		</ImageBackground>
	);
};

export default Instagram;
