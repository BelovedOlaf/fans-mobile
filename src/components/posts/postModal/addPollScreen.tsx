import { View } from "react-native";
import React, { FC, useEffect, useState } from "react";
import * as ImagePicker from "expo-image-picker";

import ModalHeader from "./modalHeader";
import ScreenWrapper from "./screenWrapper";

import { PollForm } from "../share";
import { IPostForm, IPoll, IPickerMedia } from "@usertypes/types";
import { PostStepTypes, IconTypes } from "@usertypes/commonEnums";
import { defaultPollFormData } from "@constants/defaultFormData";

interface Props {
	data: IPostForm;
	step: PostStepTypes;
	handleChangeTab: (tab: PostStepTypes) => void;
	handleSave: (poll: IPoll, coverImg: IPickerMedia) => void;
	handleCloseModal: () => void;
}

const AddPollScreen: FC<Props> = (props) => {
	const {
		data: postForm,
		step,
		handleChangeTab,
		handleSave,
		handleCloseModal,
	} = props;

	const [formData, setFormData] = useState<IPoll>(defaultPollFormData);
	const [endTime, setEndTime] = useState("");
	const [coverImg, setCoverImg] = useState<IPickerMedia>({
		uri: "",
		isPicker: false,
	});
	const [isSubmitted, setIsSubmitted] = useState(false);

	const [availableEndTime, setAvailableEndTime] = useState(false);
	const [publicResult, setPublicResult] = useState(false);
	const [voteType, setVoteType] = useState("all");

	const handleAddAnswer = () => {
		setFormData({
			...formData,
			answers: [...formData.answers, ""],
		});
	};

	const handleChangeImage = async () => {
		try {
			const result = await ImagePicker.launchImageLibraryAsync({
				mediaTypes: ImagePicker.MediaTypeOptions.All,
				allowsEditing: false,
				aspect: [4, 3],
				quality: 1,
				allowsMultipleSelection: false,
			});

			if (!result.canceled) {
				setCoverImg({
					uri: result.assets[0].uri,
					isPicker: true,
				});
			}
		} catch (error) {
			console.log("Error picking image:", error);
		}
	};

	const onChangeField = (name: string, val: string | boolean) => {
		setFormData({
			...formData,
			[name]: val,
		});
	};

	const onChangeAnswer = (val: string, index: number) => {
		const answers = formData.answers.map((answer, i) =>
			i === index ? val : answer,
		);
		setFormData({
			...formData,
			answers: answers,
		});
	};

	const onDeleteAnswer = (index: number) => {
		setFormData({
			...formData,
			answers: formData.answers.filter((el, i) => i !== index),
		});
	};

	const onSave = async () => {
		setIsSubmitted(true);
		if (formData.question === "") {
			return;
		}
		handleSave(
			{
				...formData,
			},
			coverImg,
		);
	};

	useEffect(() => {
		setFormData({
			...defaultPollFormData,
			question: postForm.poll.question,
			caption: postForm.poll.caption,
			answers: postForm.poll.answers,
			thumb: postForm.poll.thumb,
			timezone: "",
		});
		if (postForm.poll.thumb !== "") {
			setCoverImg({
				uri: postForm.poll.thumb,
				isPicker: false,
			});
		}
	}, []);

	const onClickLeft = () => {
		if (step === PostStepTypes.NewPollPost) {
			handleCloseModal();
		} else {
			handleChangeTab(PostStepTypes.Caption);
		}
	};

	return (
		<View>
			<ModalHeader
				title={step === PostStepTypes.AddPoll ? "Add poll" : "New post"}
				rightLabel={step === PostStepTypes.AddPoll ? "" : "Share"}
				onClickRight={onSave}
				onClickLeft={onClickLeft}
				titleIcon={
					step === PostStepTypes.NewPollPost
						? IconTypes.Poll
						: undefined
				}
				leftIcon={
					step === PostStepTypes.NewPollPost
						? IconTypes.Close
						: undefined
				}
			/>
			<ScreenWrapper>
				<PollForm
					formData={formData}
					coverImg={coverImg}
					handleAddAnswer={handleAddAnswer}
					onAddPoll={onSave}
					onChangeImage={handleChangeImage}
					onChangeField={onChangeField}
					isSubmitted={isSubmitted}
					onDeleteAnswer={onDeleteAnswer}
					onChangeAnswer={onChangeAnswer}
					voteType={voteType}
					onChangeVoteType={(val) => setVoteType(val)}
					publicResult={publicResult}
					onChangePublicResult={(val) => setPublicResult(val)}
					availableEndTime={availableEndTime}
					onChangeAvailableEndTime={(val) => setAvailableEndTime(val)}
					hideAddBtn={step === PostStepTypes.NewPollPost}
				/>
			</ScreenWrapper>
		</View>
	);
};

export default AddPollScreen;
