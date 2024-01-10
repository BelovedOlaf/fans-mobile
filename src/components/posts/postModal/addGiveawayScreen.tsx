import { View } from "react-native";
import React, { FC, useState, useEffect } from "react";

import ModalHeader from "./modalHeader";
import ScreenWrapper from "./screenWrapper";

import { AddGiveawayForm } from "../share";
import { IPostForm, IGiveaway, IPickerMedia } from "@usertypes/types";
import { PostStepTypes } from "@usertypes/commonEnums";
import { PostsAction, PostsActionType } from "@context/reducer/postsReducer";
import { defaultAddGiveawayFormData } from "@constants/defaultFormData";

interface Props {
	data: IPostForm;
	handleChangeTab: (tab: PostStepTypes) => void;
	handleUpdatePostContext: <P extends PostsAction>(
		actionType: P["type"],
		data: P["data"],
	) => void;
}

const AddGiveawayScreen: FC<Props> = (props) => {
	const { data, handleChangeTab, handleUpdatePostContext } = props;

	const [formData, setFormData] = useState<IGiveaway>(
		defaultAddGiveawayFormData,
	);
	const [isSubmitted, setIsSubmitted] = useState(false);

	const handleChangeForm = (name: string, val: string | IPickerMedia) => {
		setFormData({
			...formData,
			[name]: val,
		});
	};

	const onSave = () => {
		setIsSubmitted(true);
		if (
			formData.prize === "" ||
			formData.winnerCount === "" ||
			formData.timezone === ""
		) {
			return;
		}
		handleUpdatePostContext(PostsActionType.updatePostForm, {
			giveaway: formData,
		});
		handleChangeTab(PostStepTypes.Caption);
	};

	useEffect(() => {
		setFormData(data.giveaway);
	}, []);

	return (
		<View>
			<ModalHeader
				title="Add giveaway"
				onClickLeft={() => handleChangeTab(PostStepTypes.Caption)}
			/>
			<ScreenWrapper>
				<AddGiveawayForm
					data={formData}
					isSubmitted={isSubmitted}
					onChangeForm={handleChangeForm}
					onSave={onSave}
				/>
			</ScreenWrapper>
		</View>
	);
};

export default AddGiveawayScreen;
