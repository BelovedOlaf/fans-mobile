import React from "react";

import tw from "@lib/tailwind";
import { IFansButton } from "@usertypes/components";
import { FansColors } from "@usertypes/enums";
import { FontFamilyStyle, getBorderColorStyle } from "@usertypes/styles";
import { Colors } from "@usertypes/types";
import { osSelect } from "@utils/global";
import { TouchableOpacity } from "react-native";
import { FansText } from "@components/controls";
import { FansView } from "./View";

const FansButton: IFansButton = (props) => {
	const {
		children,
		color = FansColors.Purple,
		colorFans,
		fillMode = "fill",
		icon,
		style,
		title,
		ver1 = false,
		ver2 = false,
		containerStyle,
		...props_
	} = props;

	if (ver2) {
		const styles = [
			"h-fans-button",
			"flex-row justify-center items-center",
			"rounded-full",
		];
		const containerStyles = ["font-inter-bold", "text-19px"];

		return (
			<TouchableOpacity style={tw.style("")}>
				<FansView style={[tw.style(styles), style]}>
					{icon}
					<FansText
						style={[tw.style(containerStyles), containerStyle]}
					>
						{title}
					</FansText>
				</FansView>
			</TouchableOpacity>
		);
	}

	const buttonStyles = [
		osSelect("h-fans-button", { desktop: "h-fans-button-desktop" }),
	];

	!ver1 &&
		buttonStyles.push(
			fillMode === "fill" ? `bg-${colorFans ?? color}` : "bg-white",
		);
	!ver1 && buttonStyles.push(`border-[1px] border-${colorFans ?? color}`);
	buttonStyles.push("rounded-full");
	buttonStyles.push("justify-center items-center");

	return (
		<FansView style={[tw.style(buttonStyles), style]}>
			<TouchableOpacity {...props_}>
				{children ? (
					children
				) : (
					<FansText
						color={fillMode === "fill" ? "white" : "purple-a8"}
						fontFamily="inter-bold"
						style={[
							tw.style(
								osSelect("text-19px", {
									desktop: "text-24px",
								}),
							),
							containerStyle,
						]}
					>
						{title}
					</FansText>
				)}
			</TouchableOpacity>
		</FansView>
	);
};

const FansButton1: IFansButton = (props) => {
	const {
		children,
		color = FansColors.Purple,
		colorFans,
		fillMode = "fill",
		icon,
		style,
		title,
		containerStyle,
		...props_
	} = props;

	const styles = ["h-fans-button", "border border-fans-purple", "px-[21px]"];
	const containerStyles = [""];

	return (
		<TouchableOpacity>
			<FansView
				style={[tw.style(styles), style]}
				borderRadius="full"
				center
			>
				{icon}
				<FansText
					fontFamily="inter-bold"
					fontSize={19}
					style={[tw.style(containerStyles), containerStyle]}
				>
					{title}
				</FansText>
			</FansView>
		</TouchableOpacity>
	);
};

export const FansButton2: IFansButton = (props) => {
	const {
		height = "button",
		backgroundColor = "purple",
		borderColor = "purple",
		children,
		color = FansColors.Purple,
		colorFans,
		fillMode = "fill",
		icon,
		style,
		textColor = "white",
		title,
		containerStyle,
		textStyle,
		onPress,
		...props_
	} = props;

	const styles = [];
	styles.push("border");
	styles.push(getBorderColorStyle(borderColor));

	const containerStyles = [""];

	return (
		<FansView
			height={height}
			style={[tw.style(styles), style]}
			backgroundColor={backgroundColor}
			borderRadius="full"
			{...props_}
		>
			<TouchableOpacity style={tw.style("grow")} onPress={onPress}>
				<FansView
					grow
					alignItems="center"
					justifyContent="center"
					style={tw.style("px-[21px]")}
				>
					{icon}
					<FansText
						style={[tw.style(containerStyles), containerStyle]}
						color={textColor}
						fontFamily="inter-bold"
						fontSize={19}
					>
						{title}
					</FansText>
				</FansView>
			</TouchableOpacity>
		</FansView>
	);
};

export const FansButton3: IFansButton = (props) => {
	const {
		height = "button",
		title,
		icon,
		buttonStyle,
		textStyle1,

		backgroundColor = "purple",
		children,
		color = FansColors.Purple,
		colorFans,
		fillMode = "fill",
		style,
		textColor = "white",
		textStyle,
		onPress,
		...props_
	} = props;

	const buttonStyle_ = {
		backgroundColor: "purple" as Colors,
		borderColor: "purple" as Colors,
		...buttonStyle,
	};

	const textStyle_ = {
		color: "white" as Colors,
		fontFamily: "inter-bold" as FontFamilyStyle,
		fontSize: 19,
		...textStyle1,
	};

	const buttonStyles = [];
	buttonStyles.push("px-[21px]");

	return (
		<FansView
			height={height}
			touchableOpacityProps={{ onPress: onPress }}
			style={[tw.style(buttonStyles), style]}
			alignItems="center"
			alignSelf={buttonStyle_.alignSelf}
			backgroundColor={buttonStyle_.backgroundColor}
			borderColor={buttonStyle_.borderColor}
			borderRadius="full"
			flex={buttonStyle_.flex}
			flexDirection="row"
			gap={buttonStyle_.gap}
			grow={buttonStyle_.grow}
			justifyContent="center"
			overflow="hidden"
			position="relative"
			{...props_}
		>
			{icon}
			<FansText
				color={textStyle_.color}
				fontFamily={textStyle_.fontFamily}
				fontSize={textStyle_.fontSize}
			>
				{title}
			</FansText>
		</FansView>
	);
};

export const FansPurpleButton: IFansButton = (props) => {
	const { containerStyle, style, ...props_ } = props;

	return (
		<FansButton
			style={[tw.style("bg-fans-purple"), style]}
			containerStyle={[tw.style("text-fans-white"), containerStyle]}
			{...props_}
		/>
	);
};

export const FansWhiteButton: IFansButton = (props) => {
	const { style, textStyle, ...props_ } = props;

	return (
		<FansButton1
			style={[tw.style("bg-fans-white"), style]}
			containerStyle={[tw.style("text-fans-purple"), textStyle]}
			{...props_}
		/>
	);
};

export default FansButton;
