import React from "react";
import tw from "@lib/tailwind";
import { Button } from "react-native-paper";

type Props = {
	customStyle?: string;
	customeLabelStyle?: string;
	children?: React.ReactNode;
} & React.ComponentProps<typeof Button>;

export default function TextButton({
	customStyle = "",
	customeLabelStyle = "",
	children,
	...props
}: Props) {
	return (
		<Button
			mode="text"
			{...props}
			style={tw.style(customStyle)}
			labelStyle={tw.style(
				"text-fans-purple text-[17px] font-inter-semibold",
				customeLabelStyle,
			)}
		>
			{children}
		</Button>
	);
}
