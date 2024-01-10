import { CloseSvg } from "@assets/svgs/common";
import AvatarWithStatus from "@components/common/AvatarWithStatus";
import { FypText } from "@components/common/base";

import tw from "@lib/tailwind";
import { IProfile } from "@usertypes/types";

import React, { FC } from "react";
import { View } from "react-native";
import { IconButton } from "react-native-paper";

interface Props {
	creator: IProfile;
	onCancel: () => void;
}

const UserChip: FC<Props> = (props) => {
	const { onCancel, creator } = props;

	return (
		<View
			style={tw.style(
				"flex-row items-center py-[2.5px] pl-[3px] pr-[3px] rounded-[30px] bg-white",
			)}
		>
			<AvatarWithStatus avatar={creator.avatar} size={29} />
			<FypText
				fontSize={17}
				lineHeight={22}
				style={tw.style("ml-[5.5px] mr-[18px]")}
				numberOfLines={1}
			>
				{creator.displayName}
			</FypText>
			<IconButton
				icon={() => <CloseSvg width={9.1} height={9.1} />}
				size={9.1}
				onPress={onCancel}
				style={tw.style("m-0 w-6 h-6")}
			/>
		</View>
	);
};

export default UserChip;
