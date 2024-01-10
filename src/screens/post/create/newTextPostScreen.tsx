import CustomTopNavBar from "@components/common/customTopNavBar";
import { TextPostForm } from "@components/posts/share";

import tw from "@lib/tailwind";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { PostsNavigationStacks } from "@usertypes/navigations";
import { PostsActionType, useAppContext } from "@context/useAppContext";

import React, { useState, useEffect } from "react";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import { PostType } from "@usertypes/commonEnums";

const NewTextPostScreen = (
	props: NativeStackScreenProps<PostsNavigationStacks, "Text">,
) => {
	const { navigation } = props;

	const insets = useSafeAreaInsets();

	const { state, dispatch } = useAppContext();
	const { postForm } = state.posts;

	const [text, setText] = useState("");

	const handleShare = () => {
		const textTrimmed = text.trim();

		dispatch.setPosts({
			type: PostsActionType.updatePostForm,
			data: {
				caption: textTrimmed,
				type: PostType.Text,
			},
		});
		if (textTrimmed.length === 0) {
			Toast.show({
				type: "error",
				text1: "You must enter content of your post.",
			});
			return;
		}
		navigation.navigate("Caption");
	};

	useEffect(() => {
		setText(postForm.caption);
	}, [postForm.caption]);

	return (
		<View
			style={{
				paddingTop: insets.top,
				flex: 1,
				backgroundColor: "#fff",
				position: "relative",
			}}
		>
			<CustomTopNavBar
				title="New post"
				onClickLeft={() => navigation.goBack()}
				onClickRight={handleShare}
				titleIcon="text"
				rightLabel="Share"
			/>

			<View style={tw.style("w-full min-h-150 px-8 mt-7")}>
				<TextPostForm value={text} onChange={(val) => setText(val)} />
			</View>
		</View>
	);
};

export default NewTextPostScreen;
