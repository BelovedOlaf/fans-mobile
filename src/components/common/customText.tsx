import { Text } from "react-native";
import React, { FC } from "react";
import clsx from "clsx";
import tw from "@lib/tailwind";

interface Props {
	children: React.ReactNode;
	size?: "sm" | "base" | "lg" | "xl";
	style?: string;
	numberOfLines?: number;
}

const CustomText: FC<Props> = (props) => {
	const { size, children, style, numberOfLines } = props;

	const styles = clsx({
		"text-[15px] leading-[20px]": size === "sm",
		"text-base leading-[21px]": size === "base" || !size,
		"text-[17px] leading-[22px] font-semibold": size === "lg",
		"text-[19px] leading-[26px] font-bold": size === "xl",

		[style ?? ""]: style,
	});

	return (
		<Text style={tw.style(styles)} numberOfLines={numberOfLines}>
			{children}
		</Text>
	);
};

export default CustomText;
