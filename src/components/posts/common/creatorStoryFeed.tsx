import { RoundedBorderSvg } from "@assets/svgs/common";
import AvatarWithStatus from "@components/common/AvatarWithStatus";
import tw from "@lib/tailwind";
import { IProfile } from "@usertypes/types";
import React, { FC } from "react";
import { Pressable, PressableProps, Text, View } from "react-native";

interface Props extends PressableProps {
	creator: IProfile;
	onNavigate: () => void;
}

const CreatorStoryFeed: FC<Props> = (props) => {
	const { creator, onNavigate, ...otherProps } = props;

	return (
		<Pressable
			style={tw.style("items-center max-w-[100px]")}
			onPress={onNavigate}
			{...otherProps}
		>
			<View
				style={tw.style(
					"w-[76px] h-[76px] flex items-center justify-center",
					"rounded-full relative",
					creator.isSelected ? "border-0" : "border border-fans-grey",
				)}
			>
				<AvatarWithStatus
					size={68}
					avatar={creator.avatar ?? ""}
					onPress={onNavigate}
				/>

				{creator.isSelected ? (
					<RoundedBorderSvg
						size={76}
						style={tw.style("absolute top-0 left-0")}
					/>
				) : null}
			</View>
			<Text
				style={tw.style(
					"mt-1 text-center text-[15px] leading-[21px] text-black",
				)}
			>
				{creator.profileLink
					? creator.profileLink.split("/").slice(-1)[0]
					: ""}
			</Text>
		</Pressable>
	);
};

export default CreatorStoryFeed;
