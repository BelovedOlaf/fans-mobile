import React, { useMemo } from "react";
import tw from "@lib/tailwind";
import { View, Text } from "react-native";
import { AnimatedCircularProgress } from "react-native-circular-progress";

type Props = {
	percent: number;
	count: number;
	levels: number[];
};

export default function FansLevelBox({
	percent = 0,
	count = 0,
	levels = [1, 20],
}: Props) {
	const color = useMemo(() => {
		if (levels[0] === 81) return "#23C9B1";
		else if (levels[0] === 61) return "#24A2FF";
		else if (levels[0] === 41) return "#A854F5";
		else if (levels[0] === 21) return "#E53EC6";
		else if (levels[0] === 1) return "#F98C28";
		else return "#23C9B1";
	}, [levels]);

	return (
		<View
			style={tw`flex flex-row justify-center h-[58px] rounded-[70px] bg-fans-grey py-1.5 px-1.5 pr-[19px]`}
		>
			<View style={tw`w-[47px] h-[47px]`}>
				<AnimatedCircularProgress
					size={47}
					width={3}
					backgroundWidth={1}
					fill={percent}
					tintColor={color}
					backgroundColor="#B1B1B1"
					arcSweepAngle={360}
					rotation={0}
					lineCap="round"
					duration={0}
				>
					{(fill) => (
						<Text
							style={tw`text-black text-base font-inter-semibold`}
						>
							{fill}
							<Text
								style={tw`text-black text-[11px] font-inter-regular`}
							>
								%
							</Text>
						</Text>
					)}
				</AnimatedCircularProgress>
			</View>
			<View style={tw`ml-[29px] min-w-[40px] h-full justify-center`}>
				<Text
					style={tw`${color} text-[21px] text-right flex flex-row items-center`}
				>
					{count}
				</Text>
			</View>
			<View style={tw`flex flex-row items-center`}>
				<Text
					style={tw`text-black text-base font-inter-bold ml-[11px]`}
				>
					Fans
				</Text>
			</View>
			<View style={tw`ml-auto flex flex-row items-center`}>
				<Text style={tw`text-black text-base font-inter-regular`}>
					Levels
				</Text>
			</View>
			<View style={tw`flex flex-row items-center justify-end`}>
				<Text style={tw`text-base font-inter-bold ml-[14px] w-[62px] `}>
					{levels.join(" - ")}
				</Text>
			</View>
		</View>
	);
}
