import { View, Pressable } from "react-native";
import React, { FC } from "react";
import { IconButton } from "react-native-paper";

import tw from "@lib/tailwind";
import CustomText from "@components/common/customText";
import { AddressSvg, TrashSvg } from "@assets/svgs/common";
import { ILocation } from "@usertypes/types";

interface Props {
	data: ILocation;
	isSelected: boolean;
	onPress: () => void;
}

const Location: FC<Props> = (props) => {
	const { data, isSelected, onPress } = props;

	const handleClick = () => {
		if (!isSelected) {
			onPress();
		}
	};
	return (
		<Pressable
			style={tw.style("flex-row items-center pt-[14px] pb-[18px] px-3")}
			onPress={handleClick}
		>
			<View style={tw.style("flex-1 flex-row items-center")}>
				<AddressSvg width={19.34} height={24.91} color="#707070" />
				<View style={tw.style("ml-[28px]")}>
					<CustomText size="xl">{data.title}</CustomText>
					<CustomText
						size="base"
						style="text-fans-dark-grey mt-[-3px]"
					>
						{data.address}
					</CustomText>
				</View>
			</View>
			<IconButton
				icon={() => <TrashSvg size={15} color="#eb2121" />}
				containerColor="#f0f0f0"
				style={tw.style(
					"p-0 m-0 w-[34px] h-[34px]",
					!isSelected && "hidden",
				)}
				onPress={onPress}
			/>
		</Pressable>
	);
};

export default Location;
