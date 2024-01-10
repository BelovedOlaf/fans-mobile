import { Pressable, PressableProps } from "react-native";
import React, { FC } from "react";
import tw from "@lib/tailwind";

import CustomText from "@components/common/customText";
import { ChevronRightSvg } from "@assets/svgs/common";
import { FansView } from "@components/controls";

interface Props extends PressableProps {
	title: string;
}

const EditSubLink: FC<Props> = (props) => {
	const { title, ...others } = props;

	return (
		<Pressable
			style={tw.style(
				"flex-row items-center justify-between py-[15px] px-[18px]",
			)}
			{...others}
		>
			<CustomText size="lg">{title}</CustomText>
			<FansView style={tw.style("w-[8.14px] h-[14.28px]")}>
				<ChevronRightSvg color={tw.color("fans-grey-dark")} />
			</FansView>
		</Pressable>
	);
};

export default EditSubLink;
