import { View, Image, ScrollView, TouchableOpacity } from "react-native";
import React, { FC } from "react";
import tw from "@lib/tailwind";

interface Props {
	searchKey: string;
}

const PostsTab: FC<Props> = (props) => {
	const { searchKey } = props;

	return (
		<ScrollView
			style={tw.style("mt-5")}
			showsVerticalScrollIndicator={false}
			contentContainerStyle={{
				paddingBottom: 60,
			}}
		>
			<View style={tw.style("flex flex-row flex-wrap")}>
				{[...Array(19)].map((el, index) => (
					<TouchableOpacity
						key={index}
						style={tw.style("w-1/3 h-[130px] border border-white")}
					>
						<Image
							source={require("@assets/images/posts/post-img.png")}
							resizeMode="cover"
							style={tw.style("w-full h-full")}
						/>
					</TouchableOpacity>
				))}
			</View>
		</ScrollView>
	);
};

export default PostsTab;
