import { View, Text, TouchableOpacity } from "react-native";
import React, { FC } from "react";
import tw from "@lib/tailwind";

import { TagSvg } from "@assets/svgs/common";
import { ITag } from "@usertypes/types";

interface Props {
	data: ITag;
	onClick: () => void;
}

const Tag: FC<Props> = (props) => {
	const { data, onClick } = props;

	return (
		<TouchableOpacity
			onPress={onClick}
			style={tw.style(
				"flex-row items-center pt-[14px] pb-5 pl-3 border-b border-fans-grey",
			)}
		>
			<TagSvg width={20.87} height={23} color="#707070" />
			<View style={tw.style("ml-[26px]")}>
				<Text
					style={tw.style(
						"text-[19px] leading-[26px] font-bold text-black",
					)}
				>
					{data.title}
				</Text>
				<Text
					style={tw.style(
						"text-base leading-[21px] text-fans-dark-grey mt-[-3px]",
					)}
				>
					{`${data.count} posts`}
				</Text>
			</View>
		</TouchableOpacity>
	);
};

export default Tag;
