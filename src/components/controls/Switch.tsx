import tw from "@lib/tailwind";
import { IFansSwitch } from "@usertypes/components";
import React, { isValidElement } from "react";
import { SwitchProps, TouchableOpacity, View } from "react-native";
import Animated, {
	Easing,
	useAnimatedStyle,
	useSharedValue,
	withTiming,
} from "react-native-reanimated";
import { FansText } from "@components/controls";
import { FansView } from "./View";
import { Colors } from "@usertypes/types";

type Props = { text?: string; justifyContent?: string } & SwitchProps;

const FansSwitch: React.FC<Props> = (props) => {
	const { value, onValueChange, justifyContent } = props;

	const offset = useSharedValue(1);

	const timingStyles = useAnimatedStyle(() => {
		return {
			transform: [
				{
					translateX: withTiming(value ? 17.6 : 3.8, {
						duration: 500,
						easing: Easing.out(Easing.ease),
					}),
				},
			],
		};
	});

	const justifyValue = justifyContent || "justify-between";

	return (
		<View
			style={tw.style(`flex-row gap-[10px] ${justifyValue} items-center`)}
		>
			{props.text && <FansText fontSize={17}>{props.text}</FansText>}
			<TouchableOpacity
				activeOpacity={1}
				onPress={() => onValueChange && onValueChange(!value ?? false)}
			>
				<FansView
					style={tw.style(
						"w-fans-switch h-fans-switch",
						value ? "bg-fans-purple" : "bg-fans-grey-de",
						"flex justify-center",
						"rounded-full",
					)}
				>
					<Animated.View
						style={[
							tw.style(
								"w-[18px] h-[18px]",
								"bg-white",
								"rounded-full",
							),
							timingStyles,
						]}
					></Animated.View>
				</FansView>
			</TouchableOpacity>
		</View>
	);
};

export const FansSwitch1: IFansSwitch = (props) => {
	const { width, height, switchStyle, label, value, style, onValueChange } =
		props;

	const switchStyle_ = {
		backgroundColor: "purple-a8" as Colors,
		...switchStyle,
	};

	const animatedStyles = useAnimatedStyle(() => {
		return {
			transform: [
				{
					translateX: withTiming(value ? 13.8 : 0, {
						duration: 500,
						easing: Easing.out(Easing.ease),
					}),
				},
			],
		};
	});

	const handlePress = () => {
		onValueChange && onValueChange(!value);
	};

	const Label = (() => {
		if (typeof label === "string")
			return <FansText fontSize={18}>{label}</FansText>;
		if (isValidElement(label)) return label;
		return undefined;
	})();

	return (
		<FansView
			width={width}
			height={height}
			alignItems="center"
			flexDirection="row"
			justifyContent="between"
			style={[style]}
		>
			{Label}
			<FansView
				width="switch"
				height="switch"
				style={tw.style("px-[3.8px]")}
				alignItems="center"
				backgroundColor={
					value ? switchStyle_.backgroundColor : "grey-de"
				}
				borderRadius="full"
				flexDirection="row"
			>
				<TouchableOpacity activeOpacity={1} onPress={handlePress}>
					<Animated.View
						style={[
							tw.style(
								"w-[18px] h-[18px]",
								"bg-white",
								"rounded-full",
							),
							animatedStyles,
						]}
					/>
				</TouchableOpacity>
			</FansView>
		</FansView>
	);

	return <></>;
};

export default FansSwitch;
