import { View, Text, Image } from "react-native";
import React, { FC } from "react";
import tw from "@lib/tailwind";
import { IconButton } from "react-native-paper";

import { CloseSvg } from "@assets/svgs/common";
import { IProfile } from "@usertypes/types";

interface Props {
	data: IProfile;
	onCancel: () => void;
}

const CreatorChip: FC<Props> = (props) => {
	const { data, onCancel } = props;

	return (
		<View
			style={tw.style(
				"flex-row items-center py-[2.5px] pl-[3px] pr-[3px] rounded-[30px] bg-white",
			)}
		>
			<Image
				source={require("@assets/images/posts/user-1.png")}
				style={tw.style("w-[29px] h-[29px] rounded-full")}
			/>
			<Text
				style={tw.style(
					"ml-[5.5px] text-[17px] leading-[22px] mr-[18px]",
				)}
			>
				{data.displayName}
			</Text>
			<IconButton
				icon={() => <CloseSvg width={9.1} height={9.1} />}
				size={9.1}
				onPress={onCancel}
				style={tw.style("m-0 w-6 h-6")}
			/>
		</View>
	);
};

export default CreatorChip;
