import { View, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import tw from "@lib/tailwind";
import * as ImagePicker from "expo-image-picker";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import CustomTopNavBar from "@components/common/customTopNavBar";
import { useAppContext, PostsActionType } from "@context/useAppContext";
import { MediaType } from "@usertypes/commonEnums";
import { IPickerMedia, IPoll } from "@usertypes/types";
import useUploadFiles from "@utils/useUploadFile";

import { PollForm } from "@components/posts/share";
import { PostsNavigationStacks } from "@usertypes/navigations";
import { defaultPollFormData } from "@constants/defaultFormData";

const AddPollScreen = (
	props: NativeStackScreenProps<PostsNavigationStacks, "PollProperty">,
) => {
	const { navigation } = props;

	const insets = useSafeAreaInsets();
	const { uploadFiles } = useUploadFiles();

	const { state, dispatch } = useAppContext();
	const { postForm } = state.posts;

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
		handleSavePoll(
			{
				...formData,
			},
			coverImg,
		);
	};

	const handleSavePoll = async (poll: IPoll, coverImg: IPickerMedia) => {
		let newCoverImg = coverImg.uri;
		if (coverImg.isPicker && coverImg.uri) {
			dispatch.setShowLoading();
			const uploadingResp = await uploadFiles([
				{ uri: coverImg.uri, type: MediaType.Image },
			]);
			dispatch.setHideLoading();
			if (uploadingResp?.ok) {
				newCoverImg = uploadingResp.data[0].id as string;
			}
		}

		dispatch.setPosts({
			type: PostsActionType.updatePostForm,
			data: {
				poll: {
					...poll,
					thumb: newCoverImg,
				},
			},
		});
		navigation.goBack();
	};

	useEffect(() => {
		setFormData({
			...defaultPollFormData,
			question: postForm.poll.question,
			caption: postForm.poll.caption,
			answers: postForm.poll.answers,
			thumb: postForm.poll.thumb,
			// startDate: "2023-07-20T15:06:40.472Z",
			// endDate: "2023-07-25T15:06:40.472Z",
			timezone: "",
		});
		if (postForm.poll.thumb !== "") {
			setCoverImg({
				uri: postForm.poll.thumb,
				isPicker: false,
			});
		}
	}, []);

	return (
		<View
			style={{
				paddingTop: insets.top,
				flex: 1,
				backgroundColor: "#fff",
				position: "relative",
			}}
		>
			<CustomTopNavBar
				title="Add poll"
				onClickLeft={() => navigation.goBack()}
				onClickRight={() => {}}
			/>
			<ScrollView style={tw.style("pt-6")}>
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
				/>
			</ScrollView>
		</View>
	);
};

export default AddPollScreen;
