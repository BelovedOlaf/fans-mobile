import { FypModal, FypNullableView } from "@components/common/base";
import { FansView } from "@components/controls";
import { PostsAction } from "@context/reducer/postsReducer";
import {
	PostsActionType,
	ProfileActionType,
	useAppContext,
} from "@context/useAppContext";
import { createPost, createStory } from "@helper/endpoints/post/apis";
import {
	IconTypes,
	MediaType,
	PostStepTypes,
	PostType,
} from "@usertypes/commonEnums";
import { IFundraiser, IPickerMedia, IPoll } from "@usertypes/types";
import useUploadFiles, { IUploadFileParam } from "@utils/useUploadFile";
import useUploadPostForm from "@utils/useUploadPostForm";
import React, { useState } from "react";
import Toast from "react-native-toast-message";
import AddGiveawayScreen from "./addGiveawayScreen";
import AddPollScreen from "./addPollScreen";
import AdvancedSettingsScreen from "./advancedSettingsScreen";
import AnalyzeFansLevelScreen from "./analyzeFansLevelScreen";
import AudioDetailScreen from "./audioDetailScreen";
import CaptionScreen from "./captionScreen";
import CategoriesScreen from "./categoriesScreen";
import FundraiserScreen from "./fundraiserScreen";
import InviteNewUserScreen from "./inviteNewUserScreen";
import LocationScreen from "./locationScreen";
import NewCategoryScreen from "./newCategoryScreen";
import PaidPostScreen from "./paidPostScreen";
import RoleScreen from "./roleScreen";
import ScheduleScreen from "./scheduleScreen";
import TagPeopleScreen from "./tagPeopleScreen";
import TagPeopleSearchScreen from "./tagPeopleSearchScreen";
import TextScreen from "./textScreen";
import ThumbnailScreen from "./thumbnailScreen";
import ViewSettingScreen from "./viewSettingScreen";
import { defaultPostFormData } from "@constants/defaultFormData";
import { getCreatePostData } from "@utils/posts";

export const titleIcons = {
	[PostType.Photo]: IconTypes.Image,
	[PostType.Video]: IconTypes.VideoCamera,
	[PostType.Audio]: IconTypes.Music,
	[PostType.Fundraiser]: IconTypes.Fundraiser,
	[PostType.Poll]: IconTypes.Poll,
	[PostType.Story]: IconTypes.Story,
	[PostType.Text]: IconTypes.Text,
};

const PostModal = () => {
	const { uploadFiles, progress, cancelUpload } = useUploadFiles();
	const [uploadPostForm] = useUploadPostForm();
	const { state, dispatch } = useAppContext();

	const { postForm } = state.posts;
	const { roles, categories, stories } = state.profile;
	const { visible, step } = state.posts.modal;

	const [roleId, setRoleId] = useState("");
	const [inProgress, setInProgress] = useState(false);
	const [rolePrevScreen, setRolePrevScreen] = useState<PostStepTypes>(
		PostStepTypes.ViewSetting,
	);

	const handleUpdatePostContext = <P extends PostsAction>(
		actionType: P["type"],
		data: P["data"],
	) => {
		dispatch.setPosts({
			type: actionType,
			data: data,
		} as PostsAction);
	};

	const handleClose = () => {
		dispatch.setPosts({
			type: PostsActionType.updatePostModal,
			data: {
				visible: false,
			},
		});
	};

	const handleClearForm = () => {
		dispatch.setPosts({
			type: PostsActionType.updatePostModal,
			data: {
				visible: false,
				step: PostStepTypes.Empty,
			},
		});
		dispatch.setPosts({
			type: PostsActionType.initPostForm,
			data: defaultPostFormData,
		});
	};

	const handleChangeTab = (tab: PostStepTypes) => {
		dispatch.setPosts({
			type: PostsActionType.updatePostModal,
			data: {
				visible: true,
				step: tab,
			},
		});
	};

	const createNewStory = async (medias: IPickerMedia[]) => {
		setInProgress(true);
		const uploaded = await uploadFiles(
			medias
				.filter((media) => media.isPicker)
				.map((el) => ({ uri: el.uri, type: MediaType.Image })),
		);
		if (!uploaded.ok) {
			Toast.show({
				type: "error",
				text1: uploaded.error?.message ?? "Failed to upload files",
			});
			return;
		}

		const postBody = {
			mediaIds: uploaded.data.map((sm) => sm.id),
		};
		const resp = await createStory(postBody);
		setInProgress(false);
		if (resp.ok) {
			handleClearForm();
			dispatch.setPosts({
				type: PostsActionType.updateLiveModal,
				data: {
					visible: true,
					postId: resp.data.id,
				},
			});
			dispatch.setProfile({
				type: ProfileActionType.updateProfile,
				data: {
					stories: [...stories, resp.data],
				},
			});
		} else {
			Toast.show({
				type: "error",
				text1: "Failed to create new story",
			});
		}
	};

	const handleCreatePost = async () => {
		if (postForm.medias.length === 0 && postForm.type !== PostType.Text) {
			Toast.show({
				type: "error",
				text1: "Require at least one media",
			});
			return;
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
		handleClearForm();
		dispatch.setPosts({
			type: PostsActionType.initPostForm,
			data: defaultPostFormData,
		});
		if (resp.ok) {
			dispatch.setPosts({
				type: PostsActionType.updateLiveModal,
				data: {
					visible: true,
					postId: resp.data.id,
				},
			});
		} else {
			Toast.show({
				type: "error",
				text1: resp.data.message,
			});
		}
	};

	const handleSavePoll = async (poll: IPoll, coverImg: IPickerMedia) => {
		let newCoverImg = coverImg.uri;
		if (coverImg.isPicker && coverImg.uri) {
			setInProgress(true);
			const uploadingResp = await uploadFiles([
				{ uri: coverImg.uri, type: MediaType.Image },
			]);
			setInProgress(false);
			if (uploadingResp?.ok) {
				newCoverImg = uploadingResp.data[0].id as string;
			}
		}

		if (postForm.type === PostType.Poll) {
			setInProgress(true);
			const postBody = {
				title: poll.question,
				caption: poll.caption,
				type: PostType.Poll,
				thumbId: newCoverImg,
				mediaIds: [],
				poll: { ...poll, thumbId: newCoverImg },
			};

			const resp = await createPost(postBody);
			setInProgress(false);
			if (resp.ok) {
				dispatch.setPosts({
					type: PostsActionType.updatePostModal,
					data: {
						visible: false,
					},
				});
			} else {
				Toast.show({
					type: "error",
					text1: "Failed to create new post",
				});
			}
		} else {
			dispatch.setPosts({
				type: PostsActionType.updatePostForm,
				data: {
					poll: {
						...poll,
						thumb: newCoverImg,
					},
				},
			});
			handleChangeTab(PostStepTypes.Caption);
		}
	};

	const handleAddFundraiser = async (
		fundraiser: IFundraiser,
		coverImg: IPickerMedia,
	) => {
		let newCoverImg = coverImg.uri;
		if (coverImg.isPicker && coverImg.uri) {
			setInProgress(true);
			const uploadingResp = await uploadFiles([
				{ uri: coverImg.uri, type: MediaType.Image },
			]);
			if (uploadingResp?.ok) {
				newCoverImg = uploadingResp.data[0].id as string;
			}
		}
		if (step === PostStepTypes.AddFundraiser) {
			setInProgress(false);
			dispatch.setPosts({
				type: PostsActionType.updatePostForm,
				data: {
					fundraiser: {
						...fundraiser,
						price: fundraiser.price as string,
						thumb: newCoverImg,
					},
				},
			});
			handleChangeTab(PostStepTypes.Caption);
		} else {
			const postBody = {
				title: fundraiser.title,
				caption: fundraiser.caption,
				type: PostType.Fundraiser,
				thumbId: newCoverImg,
				mediaIds: [],
				fundraiser: {
					...fundraiser,
					price: parseFloat(fundraiser.price as string),
					thumbId: newCoverImg,
				},
			};

			const resp = await createPost(postBody);
			setInProgress(false);
			if (resp.ok) {
				dispatch.setPosts({
					type: PostsActionType.updatePostModal,
					data: {
						visible: false,
					},
				});
			} else {
				Toast.show({
					type: "error",
					text1: "Failed to create new post",
				});
			}
		}
	};

	return (
		<FypModal
			visible={visible}
			onDismiss={handleClose}
			width={{
				xs: "full",
				md: step !== PostStepTypes.Thumbnail ? 950 : 740,
				xl: step !== PostStepTypes.Thumbnail ? 1050 : 740,
			}}
		>
			<FansView position="relative" padding={{ t: 100 }}>
				<FypNullableView visible={postForm.type !== PostType.Text}>
					<ThumbnailScreen
						inProgress={inProgress}
						data={postForm}
						handlePrev={handleClearForm}
						titleIcon={titleIcons[postForm.type]}
						handleCreateStory={createNewStory}
						handleChangeTab={handleChangeTab}
						step={step}
						dispatch={dispatch}
						progress={progress}
						handleCancelUpload={cancelUpload}
					/>
				</FypNullableView>

				<FypNullableView visible={step === PostStepTypes.Text}>
					<TextScreen
						data={postForm}
						titleIcon={titleIcons[postForm.type]}
						handlePrev={handleClearForm}
						handleChangeTab={handleChangeTab}
						dispatch={dispatch}
					/>
				</FypNullableView>
				<FypNullableView visible={step === PostStepTypes.Caption}>
					<CaptionScreen
						data={postForm}
						inProgress={inProgress}
						progress={progress}
						titleIcon={titleIcons[postForm.type]}
						handleNext={handleCreatePost}
						handleChangeTab={handleChangeTab}
						handleUpdatePostContext={handleUpdatePostContext}
					/>
				</FypNullableView>
				<FypNullableView
					visible={step === PostStepTypes.AdvancedSettings}
				>
					<AdvancedSettingsScreen
						data={postForm}
						handlePrev={() =>
							handleChangeTab(PostStepTypes.Caption)
						}
						dispatch={dispatch}
					/>
				</FypNullableView>
				<FypNullableView visible={step === PostStepTypes.Schedule}>
					<ScheduleScreen
						data={postForm}
						handlePrev={() =>
							handleChangeTab(PostStepTypes.Caption)
						}
						dispatch={dispatch}
						handleChangeTab={handleChangeTab}
					/>
				</FypNullableView>
				<FypNullableView visible={step === PostStepTypes.ViewSetting}>
					<ViewSettingScreen
						data={postForm}
						inProgress={inProgress}
						roles={roles}
						handleChangeTab={handleChangeTab}
						handleChangeRole={(roleId) => {
							setRoleId(roleId);
							setRolePrevScreen(PostStepTypes.ViewSetting);
							handleChangeTab(PostStepTypes.Role);
						}}
						setInProgress={setInProgress}
						handleUpdatePostContext={handleUpdatePostContext}
						dispatch={dispatch}
					/>
				</FypNullableView>
				<FypNullableView visible={step === PostStepTypes.Role}>
					<RoleScreen
						data={postForm}
						inProgress={inProgress}
						roles={roles}
						roleId={roleId}
						handleChangeTab={handleChangeTab}
						setInProgress={setInProgress}
						dispatch={dispatch}
						prevScreen={rolePrevScreen}
					/>
				</FypNullableView>
				<FypNullableView
					visible={step === PostStepTypes.AnalyzeFansLevels}
				>
					<AnalyzeFansLevelScreen
						data={postForm}
						handleChangeTab={handleChangeTab}
					/>
				</FypNullableView>
				<FypNullableView visible={step === PostStepTypes.Categories}>
					<CategoriesScreen
						categories={categories}
						data={postForm}
						handleChangeTab={handleChangeTab}
						dispatch={dispatch}
					/>
				</FypNullableView>
				<FypNullableView visible={step === PostStepTypes.NewCategory}>
					<NewCategoryScreen
						data={postForm}
						roles={roles}
						inProgress={inProgress}
						handleChangeTab={handleChangeTab}
						setInProgress={setInProgress}
						handleChangeRole={(roleId) => {
							setRoleId(roleId);
							setRolePrevScreen(PostStepTypes.NewCategory);
							handleChangeTab(PostStepTypes.Role);
						}}
						dispatch={dispatch}
						categories={categories}
					/>
				</FypNullableView>
				<FypNullableView visible={step === PostStepTypes.Location}>
					<LocationScreen
						data={postForm}
						handleChangeTab={handleChangeTab}
						handleUpdatePostContext={handleUpdatePostContext}
					/>
				</FypNullableView>
				<FypNullableView visible={step === PostStepTypes.PaidPost}>
					<PaidPostScreen
						data={postForm}
						inProgress={inProgress}
						handleChangeTab={handleChangeTab}
						handleUpdatePostContext={handleUpdatePostContext}
					/>
				</FypNullableView>
				<FypNullableView
					visible={
						step === PostStepTypes.AddPoll ||
						step === PostStepTypes.NewPollPost
					}
				>
					<AddPollScreen
						data={postForm}
						handleChangeTab={handleChangeTab}
						handleSave={handleSavePoll}
						step={step}
						handleCloseModal={handleClose}
					/>
				</FypNullableView>
				<FypNullableView visible={step === PostStepTypes.TagPeople}>
					<TagPeopleScreen
						data={postForm}
						handleChangeTab={handleChangeTab}
						dispatch={dispatch}
					/>
				</FypNullableView>
				<FypNullableView
					visible={step === PostStepTypes.TagPeopleSearch}
				>
					<TagPeopleSearchScreen
						data={postForm}
						handleChangeTab={handleChangeTab}
						dispatch={dispatch}
					/>
				</FypNullableView>
				<FypNullableView visible={step === PostStepTypes.InviteNewUser}>
					<InviteNewUserScreen
						data={postForm}
						inProgress={inProgress}
						setInProgress={setInProgress}
						handleChangeTab={handleChangeTab}
					/>
				</FypNullableView>
				<FypNullableView visible={step === PostStepTypes.AddGiveaway}>
					<AddGiveawayScreen
						data={postForm}
						handleChangeTab={handleChangeTab}
						handleUpdatePostContext={handleUpdatePostContext}
					/>
				</FypNullableView>
				<FypNullableView
					visible={
						step === PostStepTypes.AddFundraiser ||
						step === PostStepTypes.NewFundraiserPost
					}
				>
					<FundraiserScreen
						data={postForm}
						step={step}
						handleChangeTab={handleChangeTab}
						handleAddFundraiser={handleAddFundraiser}
						handleCloseModal={handleClose}
					/>
				</FypNullableView>
				<FypNullableView visible={step === PostStepTypes.AudioDetail}>
					<AudioDetailScreen
						data={postForm}
						inProgress={inProgress}
						dispatch={dispatch}
						handleChangeTab={handleChangeTab}
					/>
				</FypNullableView>
			</FansView>
		</FypModal>
	);
};

export default PostModal;
