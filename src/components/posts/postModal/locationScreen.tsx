import { View } from "react-native";
import React, { FC } from "react";

import ModalHeader from "./modalHeader";
import ScreenWrapper from "./screenWrapper";
import { LocationForm } from "../share";

import { IPostForm } from "@usertypes/types";
import { PostStepTypes } from "@usertypes/commonEnums";
import { PostsAction, PostsActionType } from "@context/reducer/postsReducer";

interface Props {
	data: IPostForm;
	handleChangeTab: (tab: PostStepTypes) => void;
	handleUpdatePostContext: <P extends PostsAction>(
		actionType: P["type"],
		data: P["data"],
	) => void;
}

const LocationScreen: FC<Props> = (props) => {
	const { data, handleChangeTab, handleUpdatePostContext } = props;

	const onChangeLocation = (locationId: string) => {
		handleUpdatePostContext(PostsActionType.updatePostForm, {
			locationId: locationId,
		});
	};

	return (
		<View>
			<ModalHeader
				title="Add location"
				onClickLeft={() => handleChangeTab(PostStepTypes.Caption)}
			/>
			<ScreenWrapper>
				<LocationForm data={data} onChangeLocation={onChangeLocation} />
			</ScreenWrapper>
		</View>
	);
};

export default LocationScreen;
