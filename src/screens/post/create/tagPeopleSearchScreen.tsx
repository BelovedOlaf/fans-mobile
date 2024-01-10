import { View, ScrollView } from "react-native";
import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import CustomTopNavBar from "@components/common/customTopNavBar";
import { TagPeopleSearchForm } from "@components/posts/share";

import tw from "@lib/tailwind";
import { useAppContext } from "@context/useAppContext";
import { PostsNavigationStacks } from "@usertypes/navigations";

const TagPeopleSearchScreen = (
	props: NativeStackScreenProps<PostsNavigationStacks, "TagPeopleSearch">,
) => {
	const { navigation } = props;
	const insets = useSafeAreaInsets();
	const { state, dispatch } = useAppContext();
	const { postForm } = state.posts;

	const onBack = () => {
		navigation.navigate("TagPeople");
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
				title="Tag people"
				onClickLeft={onBack}
				rightLabel="Save"
				onClickRight={onBack}
			/>
			<ScrollView style={tw.style("py-6 px-[18px]")}>
				<TagPeopleSearchForm
					postForm={postForm}
					dispatch={dispatch}
					onSaveCallback={onBack}
				/>
			</ScrollView>
		</View>
	);
};

export default TagPeopleSearchScreen;
