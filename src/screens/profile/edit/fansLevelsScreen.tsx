import { View, ScrollView } from "react-native";
import React from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import Toast from "react-native-toast-message";

import tw from "@lib/tailwind";
import AppLayout, { LayoutContentsContainer } from "@components/common/layout";
import CustomTopNavBar from "@components/common/customTopNavBar";
import RoundButton from "@components/common/RoundButton";
import ManageRolesForm from "@components/posts/share/manageRolesForm";
import { FansText } from "@components/controls";
import { AnalyzeFansLevelsContents } from "@components/posts/share";
import { ProfileNavigationStacks } from "@usertypes/navigations";
import { useAppContext, ProfileActionType } from "@context/useAppContext";
import { RoundButtonType } from "@usertypes/commonEnums";
import { deleteRole } from "@helper/endpoints/role/apis";

const FansLevelsScreen = (
	props: NativeStackScreenProps<ProfileNavigationStacks, "Levels">,
) => {
	const { navigation } = props;

	const { state, dispatch } = useAppContext();
	const { roles } = state.profile;

	const onClickCreateRole = () => {
		navigation.navigate("Role", { id: null });
	};

	const onEditRole = (roleId: string) => {
		navigation.navigate("Role", { id: roleId });
	};

	const onDeleteRole = async (roleId: string) => {
		dispatch.setShowLoading();
		const resp = await deleteRole({ id: roleId }, { id: roleId });
		dispatch.setHideLoading();
		if (resp.ok) {
			dispatch.setProfile({
				type: ProfileActionType.updateProfile,
				data: {
					roles: roles.filter((el) => el.id !== roleId),
				},
			});
		} else {
			Toast.show({
				type: "error",
				text1: resp.data.message,
			});
		}
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
							title="Analyze your fans levels"
							onClickLeft={() => navigation.goBack()}
							onClickRight={() => {}}
						/>
						<ScrollView
							style={{
								paddingTop: 28,
								paddingHorizontal: 18,
							}}
						>
							<View style={tw.style("mb-8")}>
								<FansText
									fontSize={16}
									lineHeight={21}
									style={tw.style("text-center mb-9")}
								>
									Monitor your XP levels, manage roles, and
									understand audience engagement
								</FansText>
								<RoundButton
									variant={RoundButtonType.OUTLINE_PRIMARY}
									onPress={onClickCreateRole}
								>
									Create role
								</RoundButton>

								<ManageRolesForm
									collapsed={false}
									roles={roles}
									onEditRole={onEditRole}
									onDeleteRole={onDeleteRole}
								/>
							</View>
							<AnalyzeFansLevelsContents />
						</ScrollView>
					</LayoutContentsContainer>
				</ScrollView>
			</View>
		</AppLayout>
	);
};

export default FansLevelsScreen;
