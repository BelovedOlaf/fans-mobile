import { CheckSvg, PlusSvg } from "@assets/svgs/common";
import tw from "@lib/tailwind";
import { IFansCheck } from "@usertypes/components";
import { Colors } from "@usertypes/enums";
import React from "react";
import { View, ViewProps } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { FansView } from "./View";

type Props = {
	value: boolean;
	onChange?: () => void;
} & ViewProps;

const FansCheck: React.FC<Props> = (props) => {
	const { children, value, onChange, ...props_ } = props;

	const checkStyles = ["border", "p-[6.5px]", "rounded-full"];
	checkStyles.push(value ? "bg-fans-purple" : "bg-fans-white");
	checkStyles.push(value ? "border-transparent" : "border-fans-grey-dark");

	const handlePressCheck = () => {
		onChange && onChange();
	};

	return (
		<TouchableOpacity onPress={handlePressCheck}>
			<View
				style={tw.style(
					"flex-row gap-[10px] justify-between items-center",
				)}
			>
				<View style={tw.style(checkStyles)}>
					{value ? (
						<CheckSvg size={12} color={Colors.White} />
					) : (
						<PlusSvg size={12} />
					)}
				</View>
				<View style={tw.style("grow")}>{children}</View>
			</View>
		</TouchableOpacity>
	);
};

export const FansCheck1: IFansCheck = (props) => {
	const {
		height,
		width,
		value,
		gap,
		label,
		onChangeValue: trigChangeValue,
	} = props;

	const handlePress = () => trigChangeValue(!value);

	return (
		<FansView
			height={height}
			width={width}
			alignItems="center"
			flexDirection="row"
			gap={gap}
		>
			<TouchableOpacity onPress={handlePress}>
				<FansView
					width={25}
					height={25}
					alignItems="center"
					borderColor="grey-70"
					borderRadius="full"
					justifyContent="center"
				>
					{value && (
						<FansView
							width={15}
							height={15}
							backgroundColor="purple"
							borderRadius="full"
						/>
					)}
				</FansView>
			</TouchableOpacity>
			{label}
		</FansView>
	);
};

export default FansCheck;
