import React, { FC, useState } from "react";
import { View } from "react-native";

import ModalHeader from "./modalHeader";
import ScreenWrapper from "./screenWrapper";

import { defaultAudioDetail } from "@constants/defaultFormData";
import { PostsActionType } from "@context/reducer/postsReducer";
import { IconTypes, PostStepTypes } from "@usertypes/commonEnums";
import { IAudioDetail, IPickerMedia, IPostForm } from "@usertypes/types";
import { AudioDetailForm } from "../share";
import { IAppDispatch } from "@context/appContext";
import useDocumentPicker from "@utils/useDocumentPicker";

interface Props {
	data: IPostForm;
	dispatch: IAppDispatch;
	handleChangeTab: (tab: PostStepTypes) => void;
	inProgress: boolean;
}

const AudioDetailScreen: FC<Props> = (props) => {
	const { data, handleChangeTab, inProgress, dispatch } = props;
	const { useImagePicker } = useDocumentPicker();

	const [formData, setFormData] = useState<IAudioDetail>(defaultAudioDetail);
	const [isSubmitted, setIsSubmitted] = useState(false);
	const [coverImg, setCoverImg] = useState<IPickerMedia>({
		id: "0",
		uri: "",
		isPicker: false,
	});

	const onChangeFormData = (name: string, value: string | boolean) => {
		setFormData({
			...formData,
			[name]: value,
		});
	};

	const onChangeImage = async () => {
		const result = await useImagePicker();
		if (result?.ok) {
			const medias = result.data ?? [];
			if (medias.length > 0) {
				setCoverImg(medias[0]);
			}
		}
	};

	const handleNext = async () => {
		setIsSubmitted(true);
		if (formData.title === "") {
			return;
		}
		dispatch.setPosts({
			type: PostsActionType.updatePostForm,
			data: {
				audio: formData,
				thumb: coverImg,
			},
		});
		handleChangeTab(PostStepTypes.Caption);
	};

	return (
		<View>
			<ModalHeader
				title="New post"
				rightLabel="Next"
				onClickRight={handleNext}
				onClickLeft={() => handleChangeTab(PostStepTypes.Thumbnail)}
				titleIcon={IconTypes.Music}
				loading={inProgress}
			/>
			<ScreenWrapper>
				<AudioDetailForm
					formData={formData}
					coverImg={coverImg}
					isSubmitted={isSubmitted}
					onChangeFormData={onChangeFormData}
					onChangeImage={onChangeImage}
				/>
			</ScreenWrapper>
		</View>
	);
};

export default AudioDetailScreen;
