import { View, ScrollView } from "react-native";
import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import CustomTopNavBar from "@components/common/customTopNavBar";

import { AnalyzeFansLevelsContents } from "@components/posts/share";
import { PostsNavigationStacks } from "@usertypes/navigations";

const AnalyzeFansLevelsScreen = (
	props: NativeStackScreenProps<PostsNavigationStacks, "FansLevels">,
) => {
	const { navigation } = props;
	const insets = useSafeAreaInsets();

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
				title="Analyze your fans levels"
				onClickLeft={() => navigation.goBack()}
			/>
			<ScrollView
				style={{
					paddingTop: 28,
					paddingHorizontal: 18,
				}}
			>
				<AnalyzeFansLevelsContents />
			</ScrollView>
		</View>
	);
};

export default AnalyzeFansLevelsScreen;
