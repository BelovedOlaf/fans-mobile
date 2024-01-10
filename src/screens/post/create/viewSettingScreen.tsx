import { View, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import tw from "@lib/tailwind";
import Toast from "react-native-toast-message";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import CustomTopNavBar from "@components/common/customTopNavBar";
import { ViewSettingForm } from "@components/posts/share";
import { IRole } from "@usertypes/types";
import {
	useAppContext,
	PostsActionType,
	ProfileActionType,
} from "@context/useAppContext";
import { deleteRole } from "@helper/endpoints/post/apis";
import { PostsNavigationStacks } from "@usertypes/navigations";

const ViewSettingScreen = (
	props: NativeStackScreenProps<PostsNavigationStacks, "ViewSetting">,
) => {
	const { navigation } = props;
	const insets = useSafeAreaInsets();

	const { state, dispatch } = useAppContext();
	const { postForm } = state.posts;
	const { roles } = state.profile;

	const [localRoles, setLocalRoles] = useState<IRole[]>([]);
	const [inProgress, setInProgress] = useState(false);

	const handleCancel = () => {
		navigation.goBack();
	};

	const handleEditRole = (roleId: string) => {
		navigation.navigate("Role", { id: roleId });
	};

	const handleDeleteRole = async (roleId: string) => {
		setInProgress(true);
		const resp = await deleteRole({ id: roleId }, { id: roleId });

		if (resp.ok) {
			setLocalRoles(localRoles.filter((el) => el.id !== roleId));
			dispatch.setProfile({
				type: ProfileActionType.updateProfile,
				data: {
					roles: state.posts.roles.filter((el) => el.id !== roleId),
				},
			});
		} else {
			Toast.show({
				type: "error",
				text1: resp.data.message,
			});
		}
		setInProgress(false);
	};

	const handleToggleRole = (roleId: string, val: boolean) => {
		const _roles = localRoles.map((el) =>
			el.id === roleId ? { ...el, isEnable: val } : el,
		);
		setLocalRoles(_roles);
	};

	const hanldeCreateRole = () => {
		navigation.navigate("Role", { id: null });
	};

	const onClickAllSubscribers = (val: boolean) => {
		if (val) {
			dispatch.setPosts({
				type: PostsActionType.updatePostForm,
				data: {
					roles: roles.map((el) => el.id),
					isAllSubscribers: val,
				},
			});
			setLocalRoles(roles.map((el) => ({ ...el, isEnable: true })));
		} else {
			dispatch.setPosts({
				type: PostsActionType.updatePostForm,
				data: {
					roles: roles.map((el) => el.id),
					isAllSubscribers: val,
				},
			});
		}
	};

	const onSave = () => {
		dispatch.setPosts({
			type: PostsActionType.updatePostForm,
			data: {
				roles: localRoles
					.filter((role) => role.isEnable)
					.map((el) => el.id),
			},
		});
		navigation.goBack();
	};

	useEffect(() => {
		setLocalRoles(
			roles.map((el) => ({
				...el,
				isEnable: postForm.roles.includes(el.id) ? true : false,
			})),
		);
	}, [postForm.roles]);

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
				title="Everyone can view"
				onClickLeft={handleCancel}
				onClickRight={onSave}
				rightLabel="Save"
				loading={inProgress}
			/>
			<ScrollView style={tw.style("pt-6")}>
				<View style={tw.style("px-[18px]")}>
					<ViewSettingForm
						roles={localRoles}
						isAll={postForm.isAllSubscribers}
						onClickAllSubscribers={onClickAllSubscribers}
						onCreateRole={hanldeCreateRole}
						onEditRole={handleEditRole}
						onDeleteRole={handleDeleteRole}
						onToggleRole={handleToggleRole}
					/>
				</View>
			</ScrollView>
		</View>
	);
};

export default ViewSettingScreen;
