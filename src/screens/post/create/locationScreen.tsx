import { View, ScrollView } from "react-native";
import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import tw from "@lib/tailwind";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import CustomTopNavBar from "@components/common/customTopNavBar";
import { LocationForm } from "@components/posts/share";
import { PostsNavigationStacks } from "@usertypes/navigations";
import { useAppContext, PostsActionType } from "@context/useAppContext";

const LocationScreen = (
	props: NativeStackScreenProps<PostsNavigationStacks, "Location">,
) => {
	const { navigation } = props;
	const insets = useSafeAreaInsets();
	const { state, dispatch } = useAppContext();
	const { postForm } = state.posts;

	const onChangeLocation = (locationId: string) => {
		dispatch.setPosts({
			type: PostsActionType.updatePostForm,
			data: {
				locationId: locationId,
			},
		});
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
				title="Add location"
				onClickLeft={() => navigation.goBack()}
				onClickRight={() => {}}
			/>
			<ScrollView style={tw.style("pt-6 px-[18px]")}>
				<LocationForm
					data={postForm}
					onChangeLocation={onChangeLocation}
				/>
			</ScrollView>
		</View>
	);
};

export default LocationScreen;
