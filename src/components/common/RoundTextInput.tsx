import React, { useMemo, useState } from "react";
import tw from "@lib/tailwind";
import {
	View,
	TextInput,
	TouchableOpacity,
	TextInputProps,
	Platform,
} from "react-native";
import { EyeHideSvg, EyeShowSvg } from "@assets/svgs/common";
import CustomText from "./customText";

// interface Props extends React.ComponentProps<typeof TextInput> {
interface Props extends TextInputProps {
	customStyles?: string;
	icon?: React.ReactNode;
	hasError?: boolean;
	helperText?: string;
}

export default function RoundTextInput({
	customStyles = "",
	hasError,
	helperText,
	value,
	...props
}: Props) {
	const [focus, setFocus] = useState<boolean>(false);
	const [isShowPWD, setIsShowPWD] = useState<boolean>(false);

	const styles = useMemo(() => {
		const stylesOne = [
			"w-full h-[42px] rounded-[28px] border-[1px]",
			"pt-2 pr-4  pb-2.5",
			"text-left text-black text-lg leading-[24px] font-inter-regular",
		];

		if (focus) {
			stylesOne.push("border-black outline-none");
		}
		if (!focus && hasError) {
			stylesOne.push("border-[#ff0000]");
		}

		if (!focus && !hasError)
			stylesOne.push("border-fans-grey bg-fans-grey");

		if (props.icon) stylesOne.push("pl-11");
		else stylesOne.push("pl-5");

		stylesOne.push(customStyles);

		return tw`${stylesOne.join(" ")}`;
	}, [focus, hasError, customStyles]);

	const onChangeText = (val: string) => {
		if (props.keyboardType === "numeric") {
			if (props.onChangeText) {
				const numberPattern = /^-?\d+\.?\d*$/;
				if (val === "") {
					props.onChangeText(val);
				} else if (numberPattern.test(val)) {
					if (/^-?\d+\.$/.test(val)) {
						props.onChangeText(val);
					} else {
						props.onChangeText(parseFloat(val).toString());
					}
				}
			}
		} else {
			if (props.onChangeText) {
				props.onChangeText(
					props.maxLength ? val.slice(0, props.maxLength) : val,
				);
			}
		}
	};

	return (
		<View>
			<View style={tw`relative flex items-center justify-center`}>
				<TextInput
					style={[
						styles,
						Platform.OS === "web" && { outlineColor: "#000" },
					]}
					onFocus={() => setFocus(true)}
					onBlur={() => {
						setFocus(false);
					}}
					value={value ?? ""}
					{...props}
					onChangeText={onChangeText}
					secureTextEntry={props.secureTextEntry && !isShowPWD}
					autoCapitalize="none"
				/>
				{props.icon && (
					<View
						style={tw.style(
							"absolute left-[18px] flex top-0 justify-center h-[42px]",
						)}
					>
						{props.icon}
					</View>
				)}

				{props.secureTextEntry && (
					<TouchableOpacity
						activeOpacity={0.7}
						onPress={() => {
							setIsShowPWD(!isShowPWD);
						}}
						style={tw`absolute w-[19.02px] right-4 text-fans-dark-grey`}
					>
						{isShowPWD ? (
							<EyeHideSvg size={24} color="#707070" />
						) : (
							<EyeShowSvg size={24} color="#707070" />
						)}
					</TouchableOpacity>
				)}
			</View>
			{helperText && hasError ? (
				<CustomText size="base" style="text-fans-red mt-1">
					{helperText}
				</CustomText>
			) : null}
		</View>
	);
}
