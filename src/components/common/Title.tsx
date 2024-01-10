import React, { useMemo } from "react";
import tw from "@lib/tailwind";
import { Text } from "react-native";
import clsx from "clsx";
import { ComponentSizeTypes } from "@usertypes/commonEnums";

type Props = {
	size?: ComponentSizeTypes;
	customStyles?: string;
	children?: React.ReactNode;
	style?: string;
};

export default function Title({
	size = ComponentSizeTypes.md,
	customStyles = "",
	children,
	style = "",
}: Props) {
	const textStyles = useMemo(() => {
		if (size === ComponentSizeTypes.md) {
			return "text-[17px] font-inter-semibold text-black";
		} else return "text-[17px] font-inter-semibold text-black";
	}, []);

	const classes = clsx({
		"text-[17px] font-inter-semibold text-black leading-[22px]":
			size === ComponentSizeTypes.md,
		"text-[19px] leading-[26px] font-bold": size === ComponentSizeTypes.lg,
		[style]: style,
	});

	// return <Text style={tw.style(textStyles, customStyles)}>{children}</Text>;
	return <Text style={tw.style(classes)}>{children}</Text>;
}
