import tw from "@lib/tailwind";
import React, { FC } from "react";
import { View, useWindowDimensions } from "react-native";
import { Button } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface Props {
	value: "POST" | "STORY";
}

const PostStorySwitch: FC<Props> = (props) => {
	const { value } = props;
	const insets = useSafeAreaInsets();
	const { height } = useWindowDimensions();

	return (
		<View
			style={[
				tw.style("absolute left-0 w-full flex-row justify-center"),
				{
					top: height - insets.top - insets.bottom - 16,
				},
			]}
		>
			<View
				style={tw.style(
					"flex-row gap-x-[-4px] bg-[rgba(0,0,0,0.5)] py-1 px-[6px] rounded-[38px]",
				)}
			>
				<Button
					// onPress={() => setUseType("post")}
					labelStyle={tw.style(
						"text-[15px] leading-5 font-semibold m-0 px-6 py-[5px] text-white",
						value === "POST" ? "bg-white text-black" : "",
					)}
				>
					POST
				</Button>
				<Button
					// onPress={() => setUseType("story")}
					labelStyle={tw.style(
						"text-[15px] leading-5 font-semibold m-0 px-6 py-[5px] text-white",
						value === "STORY" ? "bg-white text-black" : "",
					)}
				>
					STORY
				</Button>
			</View>
		</View>
	);
};

export default PostStorySwitch;
