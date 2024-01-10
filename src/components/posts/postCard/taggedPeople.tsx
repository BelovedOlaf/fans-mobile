import { Pressable, PressableProps } from "react-native";
import React, { FC } from "react";

import tw from "@lib/tailwind";
import { UserSvg } from "@assets/svgs/common";
import { IPost } from "@usertypes/types";

interface Props extends PressableProps {
	data: IPost;
}

const TaggedPeople: FC<Props> = (props) => {
	const { data, ...otherProps } = props;
	return (
		<Pressable
			style={tw.style(
				"absolute w-6 h-6 items-center justify-center bg-[rgba(0,0,0,0.5)] rounded-full bottom-[20px] left-[17px]",
				data.taggedPeoples?.length > 0 ? "flex" : "hidden",
			)}
			{...otherProps}
		>
			<UserSvg width={11.4} height={11.6} />
		</Pressable>
	);
};

export default TaggedPeople;
