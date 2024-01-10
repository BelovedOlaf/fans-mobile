import tw from "@lib/tailwind";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useState } from "react";
import { ScrollView, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import CustomTopNavBar from "@components/common/customTopNavBar";
import { PaidPostForm } from "@components/posts/share";
import { PostsAction } from "@context/reducer/postsReducer";
import { useAppContext } from "@context/useAppContext";
import { PostsNavigationStacks } from "@usertypes/navigations";
import { IPickerMedia } from "@usertypes/types";

const PaidPostScreen = (
	props: NativeStackScreenProps<PostsNavigationStacks, "PaidPost">,
) => {
	const { navigation } = props;

	const insets = useSafeAreaInsets();
	const { state, dispatch } = useAppContext();
	const { postForm } = state.posts;

	const [previewImg, setPreviewImg] = useState<IPickerMedia>({
		uri: "",
		isPicker: false,
	});

	const handleUpdatePostContext = <P extends PostsAction>(
		actionType: P["type"],
		data: P["data"],
	) => {
		dispatch.setPosts({
			type: actionType,
			data: data,
		} as PostsAction);
	};

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
				title="Paid post"
				onClickLeft={() => navigation.goBack()}
				onClickRight={() => {}}
			/>
			<ScrollView style={tw.style("pt-6")}>
				<PaidPostForm
					postForm={postForm}
					inProgress={false}
					onGoToBack={() => navigation.goBack()}
					handleUpdatePostContext={handleUpdatePostContext}
				/>
			</ScrollView>
		</View>
	);
};

export default PaidPostScreen;
