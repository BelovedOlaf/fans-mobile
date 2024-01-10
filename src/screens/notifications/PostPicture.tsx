import { cdnURL } from "@helper/Utils";
import tw from "@lib/tailwind";
import React from "react";
import { View, Image, Text } from "react-native";

interface PostPictureProps {
	image: string;
}

const PostPicture = ({ image }: PostPictureProps) => {
	return (
		<View
			style={tw.style(
				"w-[46px] h-[46px] relative border-fans-grey border-2 rounded-[5px]",
			)}
		>
			<Image
				source={{ uri: cdnURL(image) }}
				resizeMode="cover"
				style={tw.style("w-full h-full rounded-[5px]")}
			/>
		</View>
	);
};

export default PostPicture;
