import tw from "@lib/tailwind";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useState } from "react";
import { ScrollView, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import CustomTopNavBar from "@components/common/customTopNavBar";
import { NewCategoryForm } from "@components/posts/share";
import { useAppContext } from "@context/useAppContext";
import { PostsNavigationStacks } from "@usertypes/navigations";

const NewCategoryScreen = (
	props: NativeStackScreenProps<PostsNavigationStacks, "NewCategory">,
) => {
	const { navigation } = props;
	const insets = useSafeAreaInsets();

	const { state, dispatch } = useAppContext();
	const { roles, categories } = state.profile;

	const [inProgress, setInProgress] = useState(false);

	const handleCancel = () => {
		navigation.goBack();
	};

	const handleEditRole = (roleId: string) => {
		navigation.navigate("Role", { id: roleId });
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
				title="New category"
				onClickLeft={handleCancel}
				onClickRight={() => {}}
			/>
			<ScrollView style={tw.style("pt-6 px-[18px]")}>
				<NewCategoryForm
					roles={roles}
					categories={categories}
					inProgress={inProgress}
					handleToggleLoading={setInProgress}
					goToBack={() => navigation.goBack()}
					onEditRole={handleEditRole}
					dispatch={dispatch}
				/>
			</ScrollView>
		</View>
	);
};

export default NewCategoryScreen;
