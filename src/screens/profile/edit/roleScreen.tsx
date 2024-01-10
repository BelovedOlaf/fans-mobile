import { View, ScrollView } from "react-native";
import React, { useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import AppLayout, { LayoutContentsContainer } from "@components/common/layout";
import CustomTopNavBar from "@components/common/customTopNavBar";
import RoleForm from "@components/posts/share/roleForm";

import tw from "@lib/tailwind";
import { ProfileNavigationStacks } from "@usertypes/navigations";
import { useAppContext } from "@context/useAppContext";

const RoleScreen = (
	props: NativeStackScreenProps<ProfileNavigationStacks, "Role">,
) => {
	const { navigation, route } = props;
	const { id } = route.params;

	const { state, dispatch } = useAppContext();
	const { roles } = state.profile;

	const [inProgress, setInProgress] = useState(false);

	const handleBack = () => {
		navigation.goBack();
	};

	const onViewFansLevel = () => {
		navigation.goBack();
	};

	return (
		<AppLayout
			title="Edit Profile | FYP.Fans"
			description="FYP.Fans allows creators to make an income doing what they love!"
		>
			<View style={tw.style("flex-1")}>
				<ScrollView style={tw.style("flex-1")}>
					<LayoutContentsContainer>
						<CustomTopNavBar
							title={id ? "Edit role" : "Add role"}
							onClickLeft={() => navigation.goBack()}
							onClickRight={() => {}}
						/>
						<ScrollView
							style={{
								paddingTop: 28,
								paddingHorizontal: 18,
							}}
						>
							<RoleForm
								id={id ?? ""}
								roles={roles}
								inProgress={inProgress}
								handleBack={handleBack}
								onViewFansLevel={onViewFansLevel}
								handleToggleLoading={setInProgress}
								dispatch={dispatch}
							/>
						</ScrollView>
					</LayoutContentsContainer>
				</ScrollView>
			</View>
		</AppLayout>
	);
};

export default RoleScreen;
