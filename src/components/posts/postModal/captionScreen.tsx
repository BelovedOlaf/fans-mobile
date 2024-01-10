import { PostsAction } from "@context/reducer/postsReducer";
import { PostsActionType } from "@context/useAppContext";
import { IconTypes, PostStepTypes, PostType } from "@usertypes/commonEnums";
import { IPostForm } from "@usertypes/types";
import React, { FC } from "react";
import { View } from "react-native";
import { CaptionForm } from "../share";
import ModalHeader from "./modalHeader";
import ScreenWrapper from "./screenWrapper";

interface Props {
	data: IPostForm;
	inProgress: boolean;
	progress: number;
	titleIcon: IconTypes;
	handleNext: () => void;
	handleChangeTab: (tab: PostStepTypes) => void;
	handleUpdatePostContext: <P extends PostsAction>(
		actionType: P["type"],
		data: P["data"],
	) => void;
}

const CaptionScreen: FC<Props> = (props) => {
	const {
		data,
		inProgress,
		progress,
		titleIcon,
		handleNext,
		handleChangeTab,
		handleUpdatePostContext,
	} = props;

	const handleSave = () => {
		handleNext();
	};

	const handleChangeCaption = (val: string) => {
		handleUpdatePostContext(PostsActionType.updatePostForm, {
			caption: val,
		});
	};

	const getRightLabel = () => {
		if (data.type === PostType.Text) {
			return "Share";
		} else {
			return data.medias.length > 0 ? "Share" : "";
		}
	};

	const handlePrev = () => {
		if (data.type === PostType.Text) {
			handleChangeTab(PostStepTypes.Text);
		} else {
			handleChangeTab(PostStepTypes.Thumbnail);
		}
	};

	return (
		<View>
			<ModalHeader
				title="New post"
				rightLabel={getRightLabel()}
				onClickRight={handleSave}
				onClickLeft={handlePrev}
				titleIcon={titleIcon}
				loading={inProgress}
			/>
			<ScreenWrapper>
				<CaptionForm
					data={data}
					caption={data.caption}
					onChangeCaption={handleChangeCaption}
					onNavigateLink={(link) => handleChangeTab(link.stepType)}
				/>
			</ScreenWrapper>
		</View>
	);
};

export default CaptionScreen;
