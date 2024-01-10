import { View } from "react-native";
import React, { FC } from "react";

import ModalHeader from "./modalHeader";
import ScreenWrapper from "./screenWrapper";

import { AdvancedSettingsForm } from "../share";
import { IPostForm } from "@usertypes/types";
import { IAppDispatch } from "@context/appContext";
import { PostsActionType } from "@context/reducer/postsReducer";

interface Props {
	data: IPostForm;
	handlePrev: () => void;
	dispatch: IAppDispatch;
}

const AdvancedSettingsScreen: FC<Props> = (props) => {
	const { data, handlePrev, dispatch } = props;
	const { advanced } = data;
	const handleChange = (name: string, val: boolean) => {
		const updatedAdvanced = {
			...advanced,
			[name]: val,
		};
		dispatch.setPosts({
			type: PostsActionType.updatePostForm,
			data: {
				advanced: updatedAdvanced,
			},
		});
	};

	return (
		<View>
			<ModalHeader title="Advanced settings" onClickLeft={handlePrev} />
			<ScreenWrapper>
				<AdvancedSettingsForm
					data={data.advanced}
					onChange={handleChange}
				/>
			</ScreenWrapper>
		</View>
	);
};

export default AdvancedSettingsScreen;
