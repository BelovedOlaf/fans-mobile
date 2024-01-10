import { PlusSvg } from "@assets/svgs/common";
import AvatarWithStatus from "@components/common/AvatarWithStatus";
import { useAppContext } from "@context/useAppContext";
import tw from "@lib/tailwind";
import React, { FC } from "react";
import { Pressable, PressableProps, Text, View } from "react-native";

interface Props extends PressableProps {}

const YouStoryFeed: FC<Props> = (props) => {
	const { onPress, ..._props } = props;
	const { state } = useAppContext();
	const { avatar } = state.profile;

	return (
		<Pressable
			style={tw.style("items-center max-w-[100px]")}
			onPress={onPress}
			{..._props}
		>
			<View
				style={tw.style(
					"w-[76px] h-[76px] flex items-center justify-center rounded-full relative",
				)}
			>
				<AvatarWithStatus
					size={68}
					avatar={avatar ?? ""}
					onPress={() => {
						if (onPress) onPress;
					}}
				/>
				<Pressable
					style={[
						tw.style(
							"w-[25px] h-[25px] rounded-full bg-[rgba(255,255,255,0.7)] flex items-center justify-center absolute top-1/2 left-1/2",
						),
						{
							transform: [
								{ translateX: -12.5 },
								{ translateY: -12.5 },
							],
						},
					]}
					onPress={onPress}
				>
					<PlusSvg width={15.35} height={15.35} color="#000" />
				</Pressable>
			</View>
			<Text
				style={tw.style(
					"mt-1 text-center text-[15px] leading-[21px] text-black",
				)}
			>
				You
			</Text>
		</Pressable>
	);
};

export default YouStoryFeed;
