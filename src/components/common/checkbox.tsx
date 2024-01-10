import { Pressable } from "react-native";
import React, { FC } from "react";
import tw from "@lib/tailwind";
import clsx from "clsx";

import { CheckSvg } from "@assets/svgs/common";

interface Props {
	checked: boolean;
	onPress: () => void;
	style?: string;
	size?: "lg";
}

const Checkbox: FC<Props> = (props) => {
	const { checked, onPress, style, size } = props;

	const styles = clsx(
		"w-5 h-5 rounded-full flex-row items-center justify-center",
		{
			"bg-fans-purple": checked,
			"border border-fans-grey-70": !checked,
			"w-[25px] h-[25px]": size === "lg",
		},
		style,
	);

	return (
		<Pressable style={tw.style(styles)} onPress={onPress}>
			{checked && (
				<CheckSvg
					width={size === "lg" ? 13.77 : 9.89}
					height={size === "lg" ? 9.84 : 6.59}
					color="#fff"
				/>
			)}
		</Pressable>
	);
};

export default Checkbox;
