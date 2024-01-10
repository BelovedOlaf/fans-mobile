import React, { FC, useMemo, useState } from "react";
import MaskInput, { createNumberMask } from "react-native-mask-input";

import { FansText, FansView } from "@components/controls";
import { BirthdaySvg } from "@assets/svgs/common";

import tw from "@lib/tailwind";

interface Props {
	value: string;
	onChangeText: (val: string) => void;
	hasError?: boolean;
	helperText?: string;
	customStyles?: string;
	type: "date" | "time" | "monthYear" | "creditCard";
	placeholder?: string;
}

const CustomMaskInput: FC<Props> = (props) => {
	const {
		value,
		onChangeText,
		hasError,
		helperText,
		customStyles,
		type,
		placeholder,
	} = props;

	const getMask = () => {
		switch (type) {
			case "date":
				return [
					/\d/,
					/\d/,
					"/",
					/\d/,
					/\d/,
					"/",
					/\d/,
					/\d/,
					/\d/,
					/\d/,
				];
			case "time":
				return [/\d/, /\d/, ":", /\d/, /\d/];
			case "monthYear":
				return [/\d/, /\d/, "/", /\d/, /\d/];
			case "creditCard":
				return [
					/\d/,
					/\d/,
					/\d/,
					/\d/,
					" ",
					/\d/,
					/\d/,
					/\d/,
					/\d/,
					" ",
					/\d/,
					/\d/,
					/\d/,
					/\d/,
					" ",
					/\d/,
					/\d/,
					/\d/,
					/\d/,
				];
			default:
				return [
					/\d/,
					/\d/,
					"/",
					/\d/,
					/\d/,
					"/",
					/\d/,
					/\d/,
					/\d/,
					/\d/,
				];
		}
	};
	// const mask = [/\d/, /\d/, "/", /\d/, /\d/, "/", /\d/, /\d/, /\d/, /\d/];
	const [focus, setFocus] = useState<boolean>(false);

	const styles = useMemo(() => {
		const stylesOne = [
			"w-full h-[42px] rounded-[28px] border-[1px]",
			`pt-2 pr-4  pb-2.5 ${type === "date" ? "pl-11" : "pl-5"}`,
			"text-left text-black text-lg leading-[24px] font-inter-regular",
		];

		if (focus) {
			stylesOne.push("border-fans-purple");
		}
		if (!focus && hasError) {
			stylesOne.push("border-[#ff0000]");
		}

		if (!focus && !hasError)
			stylesOne.push("border-fans-grey bg-fans-grey");
		if (customStyles) {
			stylesOne.push(customStyles);
		}

		return tw`${stylesOne.join(" ")}`;
	}, [focus, hasError, customStyles]);

	return (
		<FansView>
			<FansView position="relative" height={42}>
				<MaskInput
					value={value}
					style={styles}
					onChangeText={(masked) => {
						onChangeText(masked);
					}}
					mask={getMask()}
					placeholder={placeholder}
					onFocus={() => setFocus(true)}
					onBlur={() => {
						setFocus(false);
					}}
				/>
				{type === "date" ? (
					<BirthdaySvg
						width={16.73}
						height={16.73}
						color="#000"
						style={tw.style("absolute left-4 top-[12.6px]")}
					/>
				) : null}
			</FansView>
			{helperText && hasError ? (
				<FansText
					color="brown-3b"
					fontSize={16}
					lineHeight={21}
					style={tw.style("mt-1")}
				>
					{helperText}
				</FansText>
			) : null}
		</FansView>
	);
};

export default CustomMaskInput;
