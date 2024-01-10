import { View, ScrollView } from "react-native";
import React, { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import tw from "@lib/tailwind";
import Toast from "react-native-toast-message";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import CustomTopNavBar from "@components/common/customTopNavBar";
import { PollForm } from "@components/posts/share";
import { PostType, MediaType } from "@usertypes/commonEnums";
import { IPoll, IPickerMedia } from "@usertypes/types";
import { useAppContext } from "@context/useAppContext";
import { createPost } from "@helper/endpoints/post/apis";
import useUploadFiles from "@utils/useUploadFile";
import { PostsNavigationStacks } from "@usertypes/navigations";
import { defaultPollFormData } from "@constants/defaultFormData";

const NewPollPostScreen = (
	props: NativeStackScreenProps<PostsNavigationStacks, "Poll">,
) => {
	const { navigation } = props;
	const insets = useSafeAreaInsets();

	const { dispatch } = useAppContext();
	const { uploadFiles } = useUploadFiles();

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

	const handleSave = async (poll: IPoll, coverImg: IPickerMedia) => {
		let newCoverImg = coverImg.uri;
		if (coverImg.isPicker && coverImg.uri) {
			dispatch.setShowLoading();
			const uploadingResp = await uploadFiles([
				{ uri: coverImg.uri, type: MediaType.Image },
			]);
			if (uploadingResp?.ok) {
				newCoverImg = uploadingResp.data[0].id as string;
			}
		}

		const postbody = {
			title: poll.question,
			caption: poll.caption,
			type: PostType.Poll,
			thumbId: newCoverImg,
			mediaIds: [],
			poll: { ...poll, thumbId: newCoverImg },
		};

		const resp = await createPost(postbody);
		if (resp.ok) {
			navigation.goBack();
		} else {
			Toast.show({
				type: "error",
				text1: "Failed to create new post",
			});
		}
		// dispatch.fetchPosts({ page: 1, size: 10 });
		dispatch.setHideLoading();
	};

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
				title="New post"
				onClickLeft={() => navigation.goBack()}
				onClickRight={onSave}
				titleIcon="poll"
				rightLabel="Share"
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
					// availableEndTime={availableEndTime}
					// onChangeAvailableEndTime={(val) => setAvailableEndTime(val)}
					hideAddBtn
				/>
			</ScrollView>
		</View>
	);
};

export default NewPollPostScreen;
