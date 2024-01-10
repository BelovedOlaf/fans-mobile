import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useState } from "react";
import { ScrollView, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import CustomTopNavBar from "@components/common/customTopNavBar";
import { RoleForm } from "@components/posts/share";
import { PostsAction } from "@context/reducer/postsReducer";
import { useAppContext } from "@context/useAppContext";
import { PostsNavigationStacks } from "@usertypes/navigations";

const RoleScreen = (
	props: NativeStackScreenProps<PostsNavigationStacks, "Role">,
) => {
	const { navigation, route } = props;
	const { id } = route.params;
	const insets = useSafeAreaInsets();

	const { state, dispatch } = useAppContext();
	const { roles } = state.profile;

	const [inProgress, setInProgress] = useState(false);

	const handleViewFansLevel = () => {
		navigation.navigate("FansLevels");
	};

	const handleToggleLoading = (val: boolean) => {
		if (val) {
			setInProgress(true);
		} else {
			setInProgress(false);
		}
	};

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
				title="Add or edit role"
				onClickLeft={() => navigation.goBack()}
				onClickRight={() => {}}
			/>
			<ScrollView
				style={{
					paddingTop: 24,
					paddingHorizontal: 18,
				}}
			>
				<RoleForm
					id={(id as string) ?? ""}
					roles={roles}
					inProgress={inProgress}
					handleBack={() => navigation.goBack()}
					onViewFansLevel={handleViewFansLevel}
					handleToggleLoading={handleToggleLoading}
					dispatch={dispatch}
				/>
			</ScrollView>
		</View>
	);
};

export default RoleScreen;
