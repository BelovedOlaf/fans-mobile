import { View, Text } from "react-native";
import React, { FC } from "react";
import tw from "@lib/tailwind";

import { Svg, Circle } from "react-native-svg";
import CustomText from "@components/common/customText";

interface Props {
	percent: number;
	fans: number;
	levels: string;
	color: string;
}

const OverviewFansLevel: FC<Props> = (props) => {
	const { percent, fans, levels, color } = props;

	const strokeWidth = 2;
	const size = 48;
	const radius = (size - strokeWidth) / 2;
	const circum = radius * 2 * Math.PI;
	const svgProgress = 100 - percent;

	return (
		<View
			style={tw.style(
				"flex-row items-center bg-fans-grey rounded-[58px] px-2 py-[5px] justify-between",
			)}
		>
			<View
				style={tw.style(
					"relative w-12 h-12 flex-row items-center justify-center",
				)}
			>
				<View
					style={tw.style(
						"w-[46px] h-[46px] rounded-full bg-white flex-row items-center justify-center",
					)}
				>
					<CustomText size="base" style="font-semibold">
						{percent}
					</CustomText>
					<Text style={tw.style("text-[11px] leading-[15px]")}>
						%
					</Text>
				</View>
				<Svg
					width={size}
					height={size}
					style={tw.style("absolute top-0 left-0")}
				>
					<Circle
						stroke={color}
						fill="none"
						cx={size / 2}
						cy={size / 2}
						r={radius}
						strokeDasharray={`${circum} ${circum}`}
						strokeDashoffset={
							radius * Math.PI * 2 * (svgProgress / 100)
						}
						strokeLinecap="round"
						transform={`rotate(-90, ${size / 2}, ${size / 2})`}
						strokeWidth={strokeWidth}
					/>
				</Svg>
			</View>

			<View style={tw.style("flex-row items-center")}>
				<Text
					style={{
						fontWeight: "600",
						fontSize: 21,
						lineHeight: 28,
						color: color,
						marginRight: 12,
					}}
				>
					{fans}
				</Text>
				<CustomText size="base" style="font-bold">
					Fans
				</CustomText>
			</View>

			<View style={tw.style("flex-row items-center")}>
				<CustomText size="base" style="font-medium mr-[14px]">
					Levels
				</CustomText>
				<CustomText size="base" style="font-bold w-16">
					{levels}
				</CustomText>
			</View>
		</View>
	);
};

export default OverviewFansLevel;
