import React, { FC } from "react";
import { View } from "react-native";

import ModalHeader from "./modalHeader";
import ScreenWrapper from "./screenWrapper";

import { PostsAction } from "@context/reducer/postsReducer";
import { PostStepTypes } from "@usertypes/commonEnums";
import { IPostForm } from "@usertypes/types";
import { PaidPostForm } from "../share";

interface Props {
	data: IPostForm;
	inProgress: boolean;
	handleChangeTab: (tab: PostStepTypes) => void;
	handleUpdatePostContext: <P extends PostsAction>(
		actionType: P["type"],
		data: P["data"],
	) => void;
}
const PaidPostScreen: FC<Props> = (props) => {
	const { data, handleChangeTab, handleUpdatePostContext, inProgress } =
		props;
	return (
		<View>
			<ModalHeader
				title="Paid post"
				onClickLeft={() => handleChangeTab(PostStepTypes.Caption)}
			/>
			<ScreenWrapper>
				<PaidPostForm
					postForm={data}
					inProgress={inProgress}
					onGoToBack={() => handleChangeTab(PostStepTypes.Caption)}
					handleUpdatePostContext={handleUpdatePostContext}
				/>
			</ScreenWrapper>
		</View>
	);
};

export default PaidPostScreen;
