import { View } from "react-native";
import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import tw from "@lib/tailwind";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import CustomTopNavBar from "@components/common/customTopNavBar";
import { AdvancedSettingsForm } from "@components/posts/share";
import { useAppContext, PostsActionType } from "@context/useAppContext";
import { PostsNavigationStacks } from "@usertypes/navigations";

const AdvancedSettingsScreen = (
	props: NativeStackScreenProps<PostsNavigationStacks, "AdvancedSettings">,
) => {
	const { navigation } = props;
	const insets = useSafeAreaInsets();
	const { state, dispatch } = useAppContext();
	const { advanced } = state.posts.postForm;

	const handleCancel = () => {
		navigation.goBack();
	};

	const onChangeSetting = (name: string, val: boolean) => {
		const updatedAdvanced = {
			...advanced,
			[name]: val,
		};
		dispatch.setPosts({
			type: PostsActionType.updatePostForm,
			data: {
				advanced: updatedAdvanced,
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
				title="Advancced settings"
				onClickLeft={handleCancel}
			/>
			<View style={tw.style("mt-6 px-[18px]")}>
				<AdvancedSettingsForm
					data={advanced}
					onChange={onChangeSetting}
				/>
			</View>
		</View>
	);
};

export default AdvancedSettingsScreen;
