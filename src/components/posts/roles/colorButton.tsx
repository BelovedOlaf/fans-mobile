import { View, Pressable } from "react-native";
import React, { FC } from "react";
import tw from "@lib/tailwind";
import clsx from "clsx";

interface Props {
	onSelect: () => void;
	isSelected: boolean;
	value: string;
}

const ColorButton: FC<Props> = (props) => {
	const { onSelect, isSelected, value } = props;

	return (
		<View style={tw.style(clsx("w-11 h-11 relative"))}>
			<Pressable
				style={{
					width: 44,
					height: 44,
					borderRadius: 44,
					backgroundColor: value,
					borderWidth: value === "transparent" ? 1 : 0,
					borderColor: "#e0e0e0",
				}}
				onPress={onSelect}
			></Pressable>
			{isSelected ? (
				<View
					style={tw.style(
						"border border-black w-[50px] h-[50px] rounded-full absolute top-[-3px] left-[-3px]",
					)}
				></View>
			) : null}
		</View>
	);
};

export default ColorButton;
