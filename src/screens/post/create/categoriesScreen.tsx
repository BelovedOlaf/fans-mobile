import { View, ScrollView } from "react-native";
import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import CustomTopNavBar from "@components/common/customTopNavBar";
import { useAppContext, PostsActionType } from "@context/useAppContext";

import { CategoriesForm } from "@components/posts/share";
import { PostsNavigationStacks } from "@usertypes/navigations";

const CategoriesScreen = (
	props: NativeStackScreenProps<PostsNavigationStacks, "Categories">,
) => {
	const { navigation } = props;
	const insets = useSafeAreaInsets();

	const { state, dispatch } = useAppContext();
	const { postForm } = state.posts;
	const { categories } = state.profile;

	const handleClickNewCategory = () => {
		navigation.navigate("NewCategory");
	};

	const onUpdateCategories = (categoryIds: string[]) => {
		dispatch.setPosts({
			type: PostsActionType.updatePostForm,
			data: {
				categories: categoryIds,
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
				title="Add to category"
				onClickLeft={() => navigation.goBack()}
			/>
			<ScrollView
				style={{
					paddingTop: 24,
					paddingHorizontal: 18,
				}}
			>
				<CategoriesForm
					postForm={postForm}
					categories={categories}
					onClickNewCategory={handleClickNewCategory}
					onUpdateCategories={onUpdateCategories}
				/>
			</ScrollView>
		</View>
	);
};

export default CategoriesScreen;
