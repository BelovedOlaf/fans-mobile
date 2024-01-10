import React from "react";
import tw from "@lib/tailwind";
import { View, Text, KeyboardTypeOptions } from "react-native";
import FormLabel from "./FormLabel";
import RoundTextInput from "./RoundTextInput";
import { Style } from "twrnc/dist/esm/types";

type Props = {
	styles?: string | Style;
	label?: string;
	value: string;
	onChangeText: Function;
	placeholder: string;
	hasError?: boolean;
	validateString?: string;
	secureTextEntry?: boolean;
	keyboardType?: KeyboardTypeOptions;
	isTextArea?: boolean;
	maxLength?: number;
	onPointerLeave?: () => void;
};

export default function FormControl({
	styles = "",
	label = "",
	value = "",
	onChangeText = (text: string) => {},
	placeholder = "",
	hasError = false,
	validateString = "",
	secureTextEntry = false,
	keyboardType,
	isTextArea = false,
	maxLength = 1000,
	onPointerLeave,
}: Props) {
	return (
		<View style={tw.style("flex", styles)}>
			{label.length > 0 && <FormLabel title={label} />}
			<RoundTextInput
				value={value}
				keyboardType={keyboardType}
				placeholder={placeholder}
				secureTextEntry={secureTextEntry}
				hasError={hasError}
				autoCapitalize="none"
				multiline={isTextArea}
				numberOfLines={isTextArea ? 4 : 1}
				maxLength={maxLength}
				onChangeText={(text: string) => onChangeText(text)}
				customStyles={
					isTextArea ? "py-3 px-5 rounded-[7px] h-[128px]" : ""
				}
				onPointerLeave={() => {
					if (onPointerLeave) {
						onPointerLeave();
					}
				}}
			/>
			{hasError && validateString && (
				<Text
					style={tw`mt-1 text-sm font-inter-regular leading-[21px] text-[#ff0000]`}
				>
					{validateString}
				</Text>
			)}
		</View>
	);
}
