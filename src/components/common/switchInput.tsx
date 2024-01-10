import { View, Text } from "react-native";
import React, { FC } from "react";
import tw from "@lib/tailwind";

import CustomSwitch from "./customSwitch";

interface Props {
	label: string;
	value: boolean;
	onChange: (val: boolean) => void;
}

const SwitchInput: FC<Props> = (props) => {
	const { label, value, onChange } = props;

	return (
		<View
			style={tw.style("flex-row items-center justify-between py-[14px]")}
		>
			<Text style={tw.style("text-[18px] leading-6 text-black")}>
				{label}
			</Text>
			<CustomSwitch value={value} onValueChange={onChange} />
		</View>
	);
};

export default SwitchInput;
