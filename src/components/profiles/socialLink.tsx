import { TouchableOpacity, TouchableOpacityProps } from "react-native";
import React, { FC } from "react";
import tw from "@lib/tailwind";

import CustomText from "@components/common/customText";
import getSocialIconComponent from "@components/socialIcons";
import { ISocialLink } from "@usertypes/types";
import { ComponentSizeTypes } from "@usertypes/commonEnums";

interface Props extends TouchableOpacityProps {
	data: ISocialLink;
}

const SocialLink: FC<Props> = (props) => {
	const { data, ...others } = props;

	return (
		<TouchableOpacity
			style={tw.style(
				"flex-row items-center py-[5px] pl-[6px] pr-5 border border-fans-grey rounded-[34px]",
			)}
			{...others}
		>
			{getSocialIconComponent({
				iconName: data.provider,
				size: ComponentSizeTypes.xs,
			})}
			<CustomText size="base" style="text-fans-dark-grey ml-[10px]">
				{data.provider}
			</CustomText>
		</TouchableOpacity>
	);
};

export default SocialLink;
