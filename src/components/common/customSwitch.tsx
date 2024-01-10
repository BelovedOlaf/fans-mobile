import { Pressable } from "react-native";
import React, { FC, useEffect } from "react";
import tw from "@lib/tailwind";
import Animated, {
	useSharedValue,
	useAnimatedStyle,
	withTiming,
	Easing,
} from "react-native-reanimated";

interface Props {
	value: boolean;
	onValueChange: (val: boolean) => void;
	primary?: boolean;
}

const CustomSwitch: FC<Props> = (props) => {
	const { value, onValueChange, primary = true } = props;

	const offset = useSharedValue(0);

	const timingStyles = useAnimatedStyle(() => {
		return {
			transform: [
				{
					translateX: withTiming(offset.value * 14.4 + 3.8, {
						duration: 300,
						easing: Easing.bezier(0.5, 0.01, 0, 1),
					}),
				},
			],
		};
	});

	useEffect(() => {
		offset.value = value ? 1 : 0;
	}, [value]);

	return (
		<Pressable
			style={tw.style(
				"w-10 h-[26px] rounded-[25px] relative",
				primary
					? {
							"bg-fans-purple": value,
							"bg-[#b1b1b1]": !value,
					  }
					: {
							"bg-fans-green": value,
							"bg-[#b1b1b1]": !value,
					  },
			)}
			onPress={() => onValueChange(!value)}
		>
			<Animated.View
				style={[
					tw.style(
						"w-[18px] h-[18px] bg-white rounded-full absolute top-1",
					),
					timingStyles,
				]}
			></Animated.View>
		</Pressable>
	);
};

export default CustomSwitch;
