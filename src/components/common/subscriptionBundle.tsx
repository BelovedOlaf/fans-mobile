import { View, Pressable, PressableProps } from "react-native";
import React, { FC } from "react";
import tw from "@lib/tailwind";

import CustomText from "./customText";

interface Props extends PressableProps {
	title: string;
	value: string;
	optionalText?: string;
	variant?: "outlined" | "contained";
}

const SubscriptionBundle: FC<Props> = (props) => {
	const { title, value, optionalText, variant, ...others } = props;

	return (
		<Pressable
			style={tw.style(
				"border border-fans-purple pl-[21px] pr-[18px] h-[42px] rounded-[28px] flex-row items-center justify-between",
				{
					"bg-fans-purple": variant === "contained",
				},
			)}
			{...others}
		>
			<View style={tw.style("flex-row items-center")}>
				<CustomText
					size="xl"
					style={
						variant === "contained"
							? "text-white"
							: "text-fans-purple"
					}
				>
					{title}
				</CustomText>

				{optionalText && (
					<CustomText
						size="base"
						style={
							variant === "contained"
								? "text-white"
								: "text-fans-purple"
						}
					>
						{` ${optionalText}`}
					</CustomText>
				)}
			</View>

			<CustomText
				style={
					variant === "contained" ? "text-white" : "text-fans-purple"
				}
				size="sm"
			>
				{value}
			</CustomText>
		</Pressable>
	);
};

export default SubscriptionBundle;
