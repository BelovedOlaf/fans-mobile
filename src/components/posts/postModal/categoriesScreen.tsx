import React, { FC } from "react";
import { View } from "react-native";

import ModalHeader from "./modalHeader";
import ScreenWrapper from "./screenWrapper";
import { CategoriesForm } from "../share";

import { PostsActionType } from "@context/useAppContext";
import { PostStepTypes } from "@usertypes/commonEnums";
import { ICategory, IPostForm } from "@usertypes/types";
import { IAppDispatch } from "@context/appContext";
interface Props {
	data: IPostForm;
	categories: ICategory[];
	handleChangeTab: (tab: PostStepTypes) => void;
	dispatch: IAppDispatch;
}

const CategoriesScreen: FC<Props> = (props) => {
	const { data, handleChangeTab, dispatch, categories } = props;

	const onClickNewCategory = () => {
		handleChangeTab(PostStepTypes.NewCategory);
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
		<View>
			<ModalHeader
				title="Add to category"
				onClickLeft={() => handleChangeTab(PostStepTypes.Caption)}
			/>
			<ScreenWrapper>
				<CategoriesForm
					postForm={data}
					categories={categories}
					onClickNewCategory={onClickNewCategory}
					onUpdateCategories={onUpdateCategories}
				/>
			</ScreenWrapper>
		</View>
	);
};

export default CategoriesScreen;
