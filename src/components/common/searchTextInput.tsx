import React, { FC } from "react";
import { View, ViewProps } from "react-native";

import RoundTextInput from "./RoundTextInput";
import { SearchSvg } from "@assets/svgs/common";

interface Props extends ViewProps {
	placeholder?: string;
	value: string;
	onChangeText: (val: string) => void;
}

const SearchTextInput: FC<Props> = (props) => {
	const { placeholder, value, onChangeText, ...others } = props;

	return (
		<View {...others}>
			<RoundTextInput
				placeholder={placeholder ?? "Search"}
				value={value}
				onChangeText={onChangeText}
				icon={<SearchSvg width={15.14} height={15.26} color="#000" />}
			/>
		</View>
	);
};

export default SearchTextInput;
