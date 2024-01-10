import tw from "@lib/tailwind";
import React, { FC } from "react";
import { Pressable, View } from "react-native";

import { CloseSvg, DndTriggerSvg } from "@assets/svgs/common";
import RoundTextInput from "@components/common/RoundTextInput";

interface Props {
	onCancel: () => void;
	onChange: (val: string) => void;
	value: string;
	placeholder?: string;
}

const NewPollAnswer: FC<Props> = (props) => {
	const { onCancel, onChange, value, placeholder } = props;

	return (
		<View style={tw.style("relative pl-12")}>
			<RoundTextInput
				value={value}
				onChangeText={onChange}
				placeholder={placeholder}
				autoCapitalize="none"
				maxLength={100}
			/>

			<Pressable
				style={tw.style("absolute right-4 top-[14px]")}
				onPress={onCancel}
			>
				<CloseSvg width={13} height={13} color="#707070" />
			</Pressable>

			<Pressable style={tw.style("absolute left-2 top-[15px]")}>
				<DndTriggerSvg width={7.2} height={11.84} color="#707070" />
			</Pressable>
		</View>
	);
};

export default NewPollAnswer;
