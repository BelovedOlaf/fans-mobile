import React, { FC } from "react";
import { View } from "react-native";

import ModalHeader from "./modalHeader";
import ScreenWrapper from "./screenWrapper";

import { IAppDispatch } from "@context/appContext";
import { PostStepTypes } from "@usertypes/commonEnums";
import {
	IPostForm,
	IRole,
	ICategory,
	IPostCategoryForm,
} from "@usertypes/types";
import { NewCategoryForm } from "../share";
import { PostsActionType } from "@context/useAppContext";

interface Props {
	data: IPostForm;
	roles: IRole[];
	handleChangeTab: (tab: PostStepTypes) => void;
	inProgress: boolean;
	setInProgress: (val: boolean) => void;
	handleChangeRole: (roleId: string) => void;
	dispatch: IAppDispatch;
	categories: ICategory[];
}

const NewCategoryScreen: FC<Props> = (props) => {
	const {
		data,
		roles,
		handleChangeTab,
		setInProgress,
		inProgress,
		handleChangeRole,
		dispatch,
		categories,
	} = props;

	const handlePointerLeave = (formData: IPostCategoryForm) => {
		dispatch.setPosts({
			type: PostsActionType.updatePostForm,
			data: {
				categoryForm: formData,
			},
		});
	};

	return (
		<View>
			<ModalHeader
				title="New category"
				onClickLeft={() => handleChangeTab(PostStepTypes.Categories)}
			/>
			<ScreenWrapper>
				<NewCategoryForm
					roles={roles}
					handleToggleLoading={setInProgress}
					inProgress={inProgress}
					goToBack={() => handleChangeTab(PostStepTypes.Categories)}
					onEditRole={handleChangeRole}
					dispatch={dispatch}
					categories={categories}
					defaultForm={data.categoryForm}
					handlePointerLeave={handlePointerLeave}
				/>
			</ScreenWrapper>
		</View>
	);
};

export default NewCategoryScreen;
