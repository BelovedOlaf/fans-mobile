import { View } from "react-native";
import React, { FC } from "react";
import tw from "@lib/tailwind";

import CustomText from "@components/common/customText";
import UserAvatar from "@components/avatar/UserAvatar";
import { GemSvg } from "@assets/svgs/common";
import { IFansUser } from "@usertypes/types";

interface Props {
	data: IFansUser;
}

const IndividualFan: FC<Props> = (props) => {
	const { data } = props;
	return (
		<View
			style={tw.style(
				"flex-row items-center py-3 border-b border-fans-grey",
			)}
		>
			<UserAvatar size="46px" image={data.avatar ?? ""} />

			<View style={tw.style("ml-3")}>
				<CustomText size="xl">{data.username}</CustomText>
				<CustomText size="base" style="mt-[-3px]">
					{`Level ${data.level?.level ?? 1}`}
				</CustomText>
			</View>

			<View style={tw.style("flex-row items-center ml-auto")}>
				<GemSvg size={15} />
				<CustomText
					size="base"
					style="font-medium text-fans-purple ml-2"
				>
					{data.level?.xp ?? 0}
				</CustomText>
			</View>
		</View>
	);
};

export default IndividualFan;
