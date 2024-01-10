import { CloseSvg, DndTriggerSvg, ListMarkSvg } from "@assets/svgs/common";
import RoundTextInput from "@components/common/RoundTextInput";
import tw from "@lib/tailwind";
import React, { FC } from "react";
import { Pressable, View } from "react-native";

interface Props {
	onCancel: () => void;
	onChange: (val: string) => void;
	value: string;
}

const TierPerk: FC<Props> = (props) => {
	const { onCancel, onChange, value } = props;

	return (
		<View style={tw.style("relative pl-[42px]")}>
			<RoundTextInput
				value={value}
				onChangeText={onChange}
				icon={
					<ListMarkSvg width={14.88} height={14.89} color="#a854f5" />
				}
				customStyles="pl-11"
				placeholder="Enter perk"
				maxLength={100}
			/>

			<Pressable
				style={tw.style("absolute right-8 top-[14px]")}
				onPress={onCancel}
			>
				<CloseSvg width={13} height={13} color="#707070" />
			</Pressable>

			<Pressable style={tw.style("absolute left-0 top-[13px]")}>
				<DndTriggerSvg width={9.8} height={16.14} color="#000" />
			</Pressable>
		</View>
	);
};

export default TierPerk;
