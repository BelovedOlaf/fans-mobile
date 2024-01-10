import CustomTopNavBar from "@components/common/customTopNavBar";
import UploadProgress from "@components/posts/common/uploadProgress";
import { CaptionForm } from "@components/posts/share";
import { defaultPostFormData } from "@constants/defaultFormData";
import { PostsActionType, useAppContext } from "@context/useAppContext";
import { createPost } from "@helper/endpoints/post/apis";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { MediaType, PostStepTypes, PostType } from "@usertypes/commonEnums";
import { PostsNavigationStacks } from "@usertypes/navigations";
import { getCreatePostData, getPostTitleIcon } from "@utils/posts";
import useUploadFiles, { IUploadFileParam } from "@utils/useUploadFile";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { ScrollView, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";

const CaptionScreen = (
	props: NativeStackScreenProps<PostsNavigationStacks, "Caption">,
) => {
	const { navigation } = props;
	const insets = useSafeAreaInsets();
	const router = useRouter();

	const { uploadFiles, progress, cancelUpload, isUploading } =
		useUploadFiles();

	const { state, dispatch } = useAppContext();
	const { postForm } = state.posts;
	const [inProgress, setInProgress] = useState(false);

	const handleCreate = async () => {
		if (postForm.medias.length === 0 && postForm.type !== PostType.Text) {
			Toast.show({
				type: "error",
				text1: "Require at least one media",
			});
		}
		setInProgress(true);

		const medias = [
			...new Set(
				[
					...postForm.medias
						.filter((media) => media.isPicker)
						.map((el) => el.uri),
					postForm.thumb.isPicker ? postForm.thumb.uri : undefined,
					postForm.paidPost?.thumb.isPicker
						? postForm.paidPost?.thumb.uri
						: undefined,
					...postForm.uploadFiles.map((el) => el.url),
				].filter((el) => !!el) as string[],
			),
		];

		const thumbIdx = medias.findIndex((el) => el === postForm.thumb.uri);
		const paidPostThumbIdx = postForm.paidPost
			? medias.findIndex((el) => el === postForm.paidPost?.thumb.uri)
			: -1;
		const mediasIdx = postForm.medias
			.map((el) => medias.findIndex((media) => media === el.uri))
			.filter((idx) => idx >= 0);
		const uploadFilesIdx = postForm.uploadFiles
			.map((el) => medias.findIndex((media) => media === el.url))
			.filter((idx) => idx >= 0);

		const mediaType =
			postForm.type === PostType.Video
				? MediaType.Video
				: postForm.type === PostType.Audio
				? MediaType.Audio
				: MediaType.Image;

		const files: IUploadFileParam[] = medias.map((uri) => ({
			uri,
			type: MediaType.Image,
		}));
		for (const idx of mediasIdx) {
			files[idx].type = mediaType;
		}

		const uploadResp = await uploadFiles(files);
		if (!uploadResp.ok) {
			Toast.show({
				type: "error",
				text1: uploadResp.errorString ?? "Failed to upload files",
			});
			setInProgress(false);
			return;
		}

		const thumb = thumbIdx >= 0 ? uploadResp.data[thumbIdx].id : undefined;
		const paidPostThumb =
			paidPostThumbIdx >= 0
				? uploadResp.data[paidPostThumbIdx].id
				: undefined;
		const mediaIds = mediasIdx.map((idx) => uploadResp.data[idx].id);
		const formIds = uploadFilesIdx.map((idx) => uploadResp.data[idx].id);

		const resp = await createPost(
			getCreatePostData(
				postForm,
				thumb,
				mediaIds,
				formIds,
				paidPostThumb ?? "",
			),
		);

		setInProgress(false);

		if (resp.ok) {
			dispatch.setPosts({
				type: PostsActionType.initPostForm,
				data: defaultPostFormData,
			});

			dispatch.setPosts({
				type: PostsActionType.updateLiveModal,
				data: {
					visible: true,
					postId: resp.data.id,
				},
			});
			// navigation.popToTop();
			router.push({
				pathname: "profile",
				params: { screen: "Profile" },
			});
		} else {
			Toast.show({
				type: "error",
				text1: resp.data.message,
			});
		}
	};

	const handleCancel = () => {
		navigation.goBack();
	};

	const onNavigateLink = (stepType: PostStepTypes) => {
		switch (stepType) {
			case PostStepTypes.ViewSetting:
				return navigation.navigate("ViewSetting");
			case PostStepTypes.Categories:
				return navigation.navigate("Categories");
			case PostStepTypes.PaidPost:
				return navigation.navigate("PaidPost");
			case PostStepTypes.AddPoll:
				return navigation.navigate("PollProperty");
			case PostStepTypes.TagPeople:
				return navigation.navigate("TagPeople");
			case PostStepTypes.AddGiveaway:
				return navigation.navigate("Giveaway");
			case PostStepTypes.Location:
				return navigation.navigate("Location");
			case PostStepTypes.Schedule:
				return navigation.navigate("Schedule");
			case PostStepTypes.AddFundraiser:
				return navigation.navigate("FundraiserProperty");
			case PostStepTypes.AdvancedSettings:
				return navigation.navigate("AdvancedSettings");
			default:
				return navigation.navigate("ViewSetting");
		}
	};

	const onChangeCaption = (val: string) => {
		dispatch.setPosts({
			type: PostsActionType.updatePostForm,
			data: {
				caption: val,
			},
		});
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
				onClickLeft={handleCancel}
				onClickRight={handleCreate}
				rightLabel="Share"
				titleIcon={getPostTitleIcon(postForm.type)}
				loading={inProgress}
			/>
			{inProgress ? (
				<UploadProgress progress={progress} onCancel={cancelUpload} />
			) : (
				<ScrollView
					contentContainerStyle={{
						paddingBottom: insets.bottom,
						paddingTop: 24,
						paddingHorizontal: 18,
					}}
				>
					<CaptionForm
						data={postForm}
						caption={postForm.caption}
						onChangeCaption={onChangeCaption}
						onNavigateLink={(link) => onNavigateLink(link.stepType)}
					/>
				</ScrollView>
			)}
		</View>
	);
};

export default CaptionScreen;
