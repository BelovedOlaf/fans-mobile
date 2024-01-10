import { Eye3Svg, EyeHide1Svg } from "@assets/svgs/common";
import tw from "@lib/tailwind";
import { FansViewProps, IFansTextInput } from "@usertypes/components";
import { Components } from "@usertypes/enums";
import {
	BorderRadiusStyle,
	ColorStyle1,
	getBorderRadiusStyle,
	getColorStyle,
	getFontFamilyStyle,
	getFontSizeStyle,
	getHeightStyle,
	getLineHeightStyle,
	getPaddingStyle,
} from "@usertypes/styles";
import React, { Fragment, useState } from "react";
import { Platform, TextInput, TouchableOpacity, View } from "react-native";
import FansGap from "./Gap";
import FansSvg from "./Svg";
import FansText from "./Text";
import { FansView } from "./View";
import { isUndefined } from "lodash";

const FansTextInput: IFansTextInput = (props) => {
	const {
		icon: Icon,
		iconNode,
		label,
		style,
		ver1 = false,
		...props_
	} = props;

	const stylesTextInput = ["leading-[21px]", "text-[18px]"];
	const stylesTextInputView = ["bg-fans-grey"];

	const isTextInputOnly = !(Icon || label);

	stylesTextInputView.push("flex-row gap-[10px] items-center", "pl-[21px]");
	stylesTextInputView.push("rounded-full");

	if (ver1) {
		return (
			<FansView
				style={tw.style(
					"w-full h-fans-textinput",
					"bg-fans-grey",
					"flex-row items-center",
					"px-[15px]",
					"rounded-full",
				)}
			>
				{iconNode && (
					<Fragment>
						{iconNode}
						<FansGap width={12} />
					</Fragment>
				)}
				<FansView style={tw.style("grow")}>
					<TextInput
						style={tw.style("w-full", "text-[18px] leading-[21px]")}
						placeholderTextColor={tw.color("fans-grey-dark")}
						{...props_}
					/>
				</FansView>
			</FansView>
		);
	}

	return label ? (
		<View style={tw.style("flex-row gap-[10px] items-center", "grow")}>
			{label && <FansText>{label}</FansText>}
			<View
				style={tw.style(
					stylesTextInputView,
					"h-fans-textinput",
					"grow",
				)}
			>
				{Icon && <Icon size={16} />}
				{iconNode}
				<TextInput
					style={[
						tw.style(stylesTextInput),
						style,
						Platform.OS === "web"
							? { outlineColor: "#000" }
							: { outlineStyle: "none" },
					]}
					{...props_}
				/>
			</View>
		</View>
	) : (
		<View
			style={[
				tw.style(
					"h-fans-textinput",
					"bg-fans-grey",
					"flex-row gap-[10px] items-center",
					"px-[21px]",
					"rounded-full",
				),
				style,
			]}
		>
			{Icon && <Icon size={16} />}
			{iconNode}
			<TextInput
				style={tw.style("w-[0px]", "grow", "text-[18px]")}
				{...props_}
			/>
		</View>
	);
};

export const FansTextInput1: IFansTextInput = (props) => {
	return (
		<FansView
			style={tw.style(
				"w-full h-fans-textinput",
				"bg-fans-grey",
				"flex-row items-center",
				"px-[15px]",
				"rounded-full",
			)}
		>
			<FansView style={tw.style("grow")}>
				<TextInput
					style={tw.style("w-full", "text-[18px] leading-[21px]")}
					placeholderTextColor={tw.color("fans-grey-dark")}
					{...props}
				/>
			</FansView>
		</FansView>
	);
};

export const FansTextInput2: IFansTextInput = (props) => {
	const { iconNode, placeholderTextColor, style, ...props_ } = props;

	return (
		<FansView
			height={Components.TextInput}
			background={ColorStyle1.Grey}
			borderRadius="full"
			grow
			style={tw.style("flex-row items-center", "pr-[21px]")}
		>
			{iconNode && (
				<FansView width={42} height={42} center>
					{iconNode}
				</FansView>
			)}
			<FansView style={tw.style("grow")}>
				<TextInput
					style={tw.style("text-[18px] leading-[21px]")}
					placeholderTextColor={
						placeholderTextColor ?? tw.color("fans-grey-dark")
					}
					{...props_}
				/>
			</FansView>
		</FansView>
	);
};

export const FansTextInput3: IFansTextInput = (props) => {
	const {
		value,
		height = "textinput",
		textStyle,
		iconNode,
		placeholderTextColor,
		grow,
		placeholder,
		secureTextEntry,
		onChangeText,
		onBlur,
	} = props;

	return (
		<FansView
			height={height}
			alignItems="center"
			backgroundColor="grey"
			borderRadius="full"
			flexDirection="row"
			grow={grow}
			style={tw.style(!iconNode && "pl-[21px]", "pr-[21px]")}
		>
			{iconNode && (
				<FansView width={42} height={42} center>
					{iconNode}
				</FansView>
			)}
			<FansView width={0} grow>
				<TextInput
					value={value}
					style={[tw.style("text-[18px] leading-[21px]"), textStyle]}
					placeholderTextColor={
						placeholderTextColor ?? tw.color("fans-grey-dark")
					}
					placeholder={placeholder}
					secureTextEntry={secureTextEntry}
					onChangeText={onChangeText}
					onBlur={onBlur}
				/>
			</FansView>
		</FansView>
	);
};

export const FansTextInput4: IFansTextInput = (props) => {
	const {
		value,
		viewStyle,
		textInputStyle,

		height = "textinput",
		textStyle,
		iconNode,
		grow,
		placeholder,
		secureTextEntry,
		onChangeText,
	} = props;

	const viewStyle_: { borderRadius: BorderRadiusStyle } = {
		borderRadius: "full",
		...viewStyle,
	};

	const textInputStyle_ = {
		placeholderTextColor: getColorStyle("grey-70"),
		...textInputStyle,
	};

	return (
		<FansView
			height={height}
			alignItems="center"
			backgroundColor="grey"
			borderRadius={viewStyle_.borderRadius}
			flexDirection="row"
			grow={grow}
			style={tw.style(!iconNode && "pl-[21px]", "pr-[21px]")}
		>
			{iconNode && (
				<FansView width={42} height={42} center>
					{iconNode}
				</FansView>
			)}
			<TextInput
				value={value}
				style={[
					tw.style("w-[0px]", "grow", "text-[18px] leading-[21px]"),
					textInputStyle_.style,
				]}
				multiline={textInputStyle_.multiline}
				placeholderTextColor={textInputStyle_.placeholderTextColor}
				placeholder={textInputStyle_.placeholder}
				secureTextEntry={secureTextEntry}
				onChangeText={onChangeText}
			/>
		</FansView>
	);
};

export const FansTextInput5: IFansTextInput = (props) => {
	const {
		height = "textinput",
		value,
		viewStyle,
		textInputStyle,
		iconNode,

		grow,
		onChangeText,
	} = props;

	const viewStyle_ = {
		borderRadius: "full" as BorderRadiusStyle,
		...viewStyle,
	};
	const { borderRadius, padding } = viewStyle_;

	const textInputStyle_ = {
		placeholderTextColor: getColorStyle("grey-70"),
		...textInputStyle,
	};

	const textInputStyles = [];
	textInputStyles.push(getBorderRadiusStyle(borderRadius));
	padding && textInputStyles.push(getPaddingStyle(padding));

	const [isSecure, setSecure] = useState(true);
	const handlePressSecure = () => setSecure(!isSecure);

	return (
		<FansView
			height={height}
			alignItems="stretch"
			backgroundColor="grey"
			borderRadius={viewStyle_.borderRadius}
			flexDirection="row"
			grow={viewStyle_.grow}
			position="relative"
		>
			<TextInput
				value={value}
				style={[
					tw.style(
						"w-[0px]",
						"grow",
						"font-inter-regular text-[18px] leading-[21px]",
						iconNode ? "pl-[43px]" : "pl-[21px]",
						textInputStyle_.secureTextEntry
							? "pr-[43px]"
							: "pr-[21px]",
						textInputStyles,
					),
					textInputStyle_.style,
				]}
				multiline={textInputStyle_.multiline}
				placeholder={textInputStyle_.placeholder}
				placeholderTextColor={textInputStyle_.placeholderTextColor}
				secureTextEntry={textInputStyle_.secureTextEntry && isSecure}
				onChangeText={onChangeText}
				onFocus={textInputStyle_.onFocus}
			/>
			{iconNode && (
				<FansView
					height="full"
					alignItems="center"
					aspectRatio="square"
					justifyContent="center"
					position="absolute"
				>
					{iconNode}
				</FansView>
			)}
			{textInputStyle_.secureTextEntry && (
				<FansView
					height="full"
					alignItems="center"
					aspectRatio="square"
					justifyContent="center"
					position="absolute"
					right={0}
				>
					<TouchableOpacity onPress={handlePressSecure}>
						{isSecure ? (
							<FansSvg
								width={19.02}
								height={14.26}
								svg={Eye3Svg}
							/>
						) : (
							<FansSvg
								width={19.02}
								height={16.31}
								svg={EyeHide1Svg}
							/>
						)}
					</TouchableOpacity>
				</FansView>
			)}
		</FansView>
	);
};

export const FansTextInput6: IFansTextInput = (props) => {
	const {
		value,

		height = "textinput",
		viewStyle,
		textInputStyle,
		errorText,
		iconNode,

		onChangeText: handleChangeText,
	} = props;

	const viewStyle_: Required<
		Pick<FansViewProps, "backgroundColor" | "borderRadius" | "position">
	> = {
		backgroundColor: "grey",
		borderRadius: "full",
		position: "relative",
		...viewStyle,
	};

	const textInputStyle_ = {
		placeholderTextColor: getColorStyle("grey-70"),
		...textInputStyle,
	};

	const textInputStyles = [];
	textInputStyles.push(getBorderRadiusStyle(viewStyle_.borderRadius));
	textInputStyles.push(getFontFamilyStyle("inter-regular"));
	textInputStyles.push(getFontSizeStyle(18));
	textInputStyles.push(getHeightStyle(height));
	textInputStyles.push(getLineHeightStyle(21));
	textInputStyles.push(
		getPaddingStyle({
			r: textInputStyle_.secureTextEntry ? 43 : 21,
			l: iconNode ? 43 : 21,
		}),
	);

	const [isSecure, setSecure] = useState(true);
	const handlePressSecure = () => setSecure(!isSecure);

	return (
		<FansView gap={5}>
			<FansView height={height} {...viewStyle_}>
				<TextInput
					value={value}
					style={tw.style(textInputStyles)}
					multiline={textInputStyle_.multiline}
					placeholder={textInputStyle_.placeholder}
					placeholderTextColor={textInputStyle_.placeholderTextColor}
					secureTextEntry={
						textInputStyle_.secureTextEntry && isSecure
					}
					onChangeText={handleChangeText}
					onFocus={textInputStyle_.onFocus}
				/>
				{iconNode && (
					<FansView
						height="full"
						alignItems="center"
						aspectRatio="square"
						justifyContent="center"
						position="absolute"
						placement={{ l: 0 }}
					>
						{iconNode}
					</FansView>
				)}
				{textInputStyle_.secureTextEntry && (
					<FansView
						height="full"
						touchableOpacityProps={{ onPress: handlePressSecure }}
						alignItems="center"
						aspectRatio="square"
						justifyContent="center"
						position="absolute"
						placement={{ r: 0 }}
					>
						{isSecure ? (
							<FansSvg
								width={19.02}
								height={14.26}
								svg={Eye3Svg}
							/>
						) : (
							<FansSvg
								width={19.02}
								height={16.31}
								svg={EyeHide1Svg}
							/>
						)}
					</FansView>
				)}
			</FansView>

			{!isUndefined(errorText) && errorText.length !== 0 && (
				<FansText color="red-eb">{errorText}</FansText>
			)}
		</FansView>
	);
};

export const FansTextInputWithLabelInside: IFansTextInput = (props) => {
	const {
		icon: Icon,
		iconNode,
		label,
		style,
		ver1 = false,
		...props_
	} = props;

	const stylesTextInput = ["leading-[21px]", "text-[18px]"];
	const stylesTextInputView = ["bg-fans-grey"];

	const isTextInputOnly = !(Icon || label);

	stylesTextInputView.push(
		"flex-row gap-[10px] items-center",
		"pl-[21px]",
		"rounded-full",
	);

	return label ? (
		<View style={tw.style("flex-row gap-[10px] items-center", "grow")}>
			<View
				style={tw.style(
					stylesTextInputView,
					"h-fans-textinput",
					"grow",
					{ flex: 1 },
				)}
			>
				{label && <FansText>{label}</FansText>}
				<TextInput
					style={[
						tw.style(stylesTextInput),
						style,
						Platform.OS === "web"
							? { outlineColor: "#000" }
							: { outlineStyle: "none" },
						{ flex: 1 }, // Apply flex: 1 style conditionally
					]}
					{...props_}
				/>
			</View>
		</View>
	) : (
		<View
			style={[
				tw.style(
					"h-fans-textinput",
					"bg-fans-grey",
					"flex-row gap-[10px] items-center",
					"px-[21px]",
					"rounded-full",
					{ flex: 1 }, // Apply flex: 1 style conditionally
				),
				style,
			]}
		>
			{Icon && <Icon size={16} />}
			{iconNode}
			<TextInput
				style={[
					tw.style("text-[18px]", "flex-1"), // Apply flex-1 style conditionally
				]}
				{...props_}
			/>
		</View>
	);
};

export const FansTextInputWithIconInside: IFansTextInput = (props) => {
	const {
		icon: Icon,
		iconNode,
		label,
		style,
		ver1 = false,
		...props_
	} = props;

	const stylesTextInput = ["leading-[21px]", "text-[18px]"];
	const stylesTextInputView = ["bg-fans-grey"];

	const isTextInputOnly = !(Icon || label);

	stylesTextInputView.push(
		"flex-row gap-[10px] items-center",
		"pl-[21px]",
		"rounded-full",
	);

	if (ver1) {
		return (
			<FansView
				style={tw.style(
					"w-full h-fans-textinput",
					"bg-fans-grey",
					"flex-row items-center",
					"px-[15px]",
					"rounded-full",
				)}
			>
				{iconNode && (
					<Fragment>
						{iconNode}
						<FansGap width={12} />
					</Fragment>
				)}
				<FansView style={tw.style("grow")}>
					<TextInput
						style={tw.style("text-[18px] leading-[21px]", "flex-1")} // Apply flex-1 style conditionally
						placeholderTextColor={tw.color("fans-grey-dark")}
						{...props_}
					/>
				</FansView>
			</FansView>
		);
	}

	return label ? (
		<View style={tw.style("flex-row gap-[10px] items-center", "grow")}>
			<View
				style={tw.style(
					stylesTextInputView,
					"h-fans-textinput",
					"grow",
					{ flex: 1 }, // Apply flex: 1 style conditionally
				)}
			>
				{Icon && <Icon size={16} />}
				{iconNode}
				<TextInput
					style={[
						tw.style(stylesTextInput),
						style,
						Platform.OS === "web"
							? { outlineColor: "#000" }
							: { outlineStyle: "none" },
						{ flex: 1 }, // Apply flex: 1 style conditionally
					]}
					{...props_}
				/>
			</View>
		</View>
	) : (
		<View
			style={[
				tw.style(
					"h-fans-textinput",
					"bg-fans-grey",
					"flex-row gap-[10px] items-center",
					"px-[21px]",
					"rounded-full",
					{ flex: 1 }, // Apply flex: 1 style conditionally
				),
				style,
			]}
		>
			{Icon && <Icon size={16} />}
			{iconNode}
			<TextInput
				style={[
					tw.style("text-[18px]", "flex-1"), // Apply flex-1 style conditionally
				]}
				{...props_}
			/>
		</View>
	);
};
export default FansTextInput;
