import React, { FC, useEffect, useState } from "react";
import { View } from "react-native";
import Toast from "react-native-toast-message";

import ModalHeader from "./modalHeader";
import ScreenWrapper from "./screenWrapper";

import { PostsAction } from "@context/reducer/postsReducer";
import { PostsActionType, ProfileActionType } from "@context/useAppContext";
import { deleteRole } from "@helper/endpoints/role/apis";
import { PostStepTypes } from "@usertypes/commonEnums";
import { IPostForm, IRole } from "@usertypes/types";
import { ViewSettingForm } from "../share";
import { IAppDispatch } from "@context/appContext";

interface Props {
	data: IPostForm;
	roles: IRole[];
	handleChangeTab: (tab: PostStepTypes) => void;
	handleChangeRole: (roleId: string) => void;
	handleUpdatePostContext: <P extends PostsAction>(
		actionType: P["type"],
		data: P["data"],
	) => void;
	inProgress: boolean;
	setInProgress: (val: boolean) => void;
	dispatch: IAppDispatch;
}

const ViewSettingScreen: FC<Props> = (props) => {
	const {
		data,
		roles,
		handleChangeTab,
		handleChangeRole,
		handleUpdatePostContext,
		inProgress,
		setInProgress,
		dispatch,
	} = props;

	const [localRoles, setLocalRoles] = useState<IRole[]>([]);

	const onClickSave = () => {
		handleUpdatePostContext(PostsActionType.updatePostForm, {
			roles: localRoles
				.filter((role) => role.isEnable)
				.map((el) => el.id),
		});
		handleChangeTab(PostStepTypes.Caption);
	};

	const onClickAllSubscribers = (val: boolean) => {
		if (val) {
			handleUpdatePostContext(PostsActionType.updatePostForm, {
				roles: roles.map((el) => el.id),
				isAllSubscribers: val,
			});
			setLocalRoles(roles.map((el) => ({ ...el, isEnable: true })));
		} else {
			handleUpdatePostContext(PostsActionType.updatePostForm, {
				roles: roles.map((el) => el.id),
				isAllSubscribers: val,
			});
		}
	};

	const onCreateRole = () => {
		handleChangeTab(PostStepTypes.Role);
	};

	const onToggleRole = (roleId: string, val: boolean) => {
		const _roles = localRoles.map((el) =>
			el.id === roleId ? { ...el, isEnable: val } : el,
		);
		setLocalRoles(_roles);
	};

	const handleDeleteRole = async (roleId: string) => {
		setInProgress(true);
		const resp = await deleteRole({ id: roleId }, { id: roleId });

		if (resp.ok) {
			setLocalRoles(localRoles.filter((el) => el.id !== roleId));
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
		setInProgress(false);
	};

	useEffect(() => {
		setLocalRoles(
			roles.map((el) => ({
				...el,
				isEnable: data.roles.includes(el.id) ? true : false,
			})),
		);
	}, [data.roles]);

	return (
		<View>
			<ModalHeader
				title="Everyone can view"
				rightLabel="Save"
				onClickRight={onClickSave}
				onClickLeft={() => handleChangeTab(PostStepTypes.Caption)}
				loading={inProgress}
			/>
			<ScreenWrapper>
				<ViewSettingForm
					roles={localRoles}
					isAll={data.isAllSubscribers}
					onClickAllSubscribers={onClickAllSubscribers}
					onCreateRole={onCreateRole}
					onEditRole={handleChangeRole}
					onDeleteRole={handleDeleteRole}
					onToggleRole={onToggleRole}
				/>
			</ScreenWrapper>
		</View>
	);
};

export default ViewSettingScreen;
