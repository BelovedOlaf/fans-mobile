import { View } from "react-native";
import React, { FC } from "react";

import RoundTextInput from "@components/common/RoundTextInput";

interface Props {
	value: string;
	onChange: (val: string) => void;
	onPointerLeave?: () => void;
}

const TextPostForm: FC<Props> = (props) => {
	const { value, onChange, onPointerLeave } = props;
	return (
		<View>
			<RoundTextInput
				value={value}
				onChangeText={(val) => onChange(val)}
				placeholder="Enter text..."
				multiline
				numberOfLines={4}
				maxLength={1000}
				customStyles="py-3 px-5 rounded-[7px] min-h-[250px] md:h-[250px]"
				onPointerLeave={() => {
					if (onPointerLeave) {
						onPointerLeave();
					}
				}}
			/>
		</View>
	);
};

export default TextPostForm;
