import {
	ChevronDownSvg,
	MusicSvg,
	PlusSvg,
	SearchSvg,
} from "@assets/svgs/common";
import { FypNullableView } from "@components/common/base";
import CustomTopNavBar from "@components/common/customTopNavBar";
import { FansIconButton, FansText } from "@components/controls";
import { AudioItem, ImagePostChip } from "@components/posts/common";
import { defaultPostFormData } from "@constants/defaultFormData";
import {
	PostsActionType,
	ProfileActionType,
	useAppContext,
} from "@context/useAppContext";
import * as apis from "@helper/endpoints";
import tw from "@lib/tailwind";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { MediaType, PostType } from "@usertypes/commonEnums";
import { PostsNavigationStacks } from "@usertypes/navigations";
import { IPickerMedia } from "@usertypes/types";
import { getPostTitleIcon } from "@utils/posts";
import useDocumentPicker from "@utils/useDocumentPicker";
import useUploadFiles from "@utils/useUploadFile";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Pressable, View } from "react-native";
import { Button } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";

const ThumbnailScreen = (
	props: NativeStackScreenProps<PostsNavigationStacks, "Thumbnail">,
) => {
	const { navigation } = props;

	const insets = useSafeAreaInsets();
	const router = useRouter();
	const { state, dispatch } = useAppContext();
	const { postForm } = state.posts;
	const { stories } = state.profile;

	const { uploadFiles } = useUploadFiles();
	const { useVideoPicker, useAudioPicker, useImagePicker } =
		useDocumentPicker();

	const [medias, setMedias] = useState<IPickerMedia[]>([]);
	const [selectedMedias, setSelectedMedias] = useState<IPickerMedia[]>([]);
	const [inProgress, setInProgress] = useState(false);

	const createNewStory = async () => {
		setInProgress(true);
		let uploadedUrls: { id: string; url: string }[] = [];
		if (medias.length > 0) {
			const resp = await uploadFiles(
				medias.map((m) => ({ uri: m.uri, type: MediaType.Image })),
			);

			if (resp?.ok) {
				uploadedUrls = resp.data;
			} else {
				Toast.show({
					type: "error",
					text1: "Failed to upload videos",
				});
			}
		}
		const postBody = {
			mediaIds: uploadedUrls.map((el) => el.id),
		};
		const resp = await apis.post.createStory(postBody);
		setInProgress(false);
		if (resp.ok) {
			dispatch.setProfile({
				type: ProfileActionType.updateProfile,
				data: {
					stories: [...stories, resp.data],
				},
			});
			router.push({
				pathname: "profile",
				params: { screen: "Profile" },
			});
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
		} else {
			Toast.show({
				type: "error",
				text1: "Failed to create new story",
			});
		}
	};

	const handleNext = async () => {
		if (selectedMedias.length === 0) {
			return;
		}
		if (postForm.type === PostType.Audio) {
			dispatch.setPosts({
				type: PostsActionType.updatePostForm,
				data: {
					medias: medias,
				},
			});
			navigation.navigate("AudioDetail");
		} else if (postForm.type === PostType.Story) {
			createNewStory();
		} else {
			if (postForm.type === PostType.Video) {
				dispatch.setPosts({
					type: PostsActionType.updatePostForm,
					data: {
						medias: selectedMedias,
					},
				});
			} else {
				dispatch.setPosts({
					type: PostsActionType.updatePostForm,
					data: {
						thumb: selectedMedias[0],
						medias: selectedMedias,
					},
				});
			}
			navigation.navigate("Caption");
		}
	};

	const handleCancel = () => {
		dispatch.setPosts({
			type: PostsActionType.updatePostForm,
			data: defaultPostFormData,
		});
		navigation.goBack();
	};

	const onToggleMedia = (media: IPickerMedia) => {
		let reorderedVideos = [];
		if (selectedMedias.map((el) => el.uri).includes(media.uri)) {
			reorderedVideos = selectedMedias.filter(
				(el) => el.uri !== media.uri,
			);
		} else {
			reorderedVideos = [...selectedMedias, media];
		}
		setSelectedMedias(reorderedVideos);
	};

	const onSelectMore = async () => {
		if (postForm.type === PostType.Video) {
			const videoResult = await useVideoPicker(true);
			if (videoResult?.ok) {
				setMedias([...medias, ...(videoResult.data ?? [])]);
				setSelectedMedias([
					...selectedMedias,
					...(videoResult.data ?? []),
				]);
			} else {
				Toast.show({
					type: "error",
					text1: videoResult?.message ?? "",
				});
			}
		} else {
			const imgResult = await useImagePicker(true);
			if (imgResult?.ok) {
				setMedias([...medias, ...(imgResult.data ?? [])]);
				setSelectedMedias([
					...selectedMedias,
					...(imgResult.data ?? []),
				]);
			} else {
				Toast.show({
					type: "error",
					text1: imgResult?.message ?? "",
				});
			}
		}
	};

	const openAudioPicker = async () => {
		const result = await useAudioPicker();
		if (result?.ok) {
			setMedias(result.data ?? []);
			setSelectedMedias(result.data ?? []);
		} else {
			Toast.show({
				type: "error",
				text1: result?.message ?? "",
			});
		}
	};

	useEffect(() => {
		setMedias(postForm.medias);
		setSelectedMedias(postForm.medias);
	}, [postForm.medias]);

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
				title={
					postForm.type === PostType.Story ? "New Story" : "New post"
				}
				onClickLeft={handleCancel}
				onClickRight={handleNext}
				rightLabel={
					postForm.type === PostType.Story ? "Publish" : "Next"
				}
				titleIcon={getPostTitleIcon(postForm.type)}
				leftIcon="close"
				loading={inProgress}
			/>
			<View
				style={[{ paddingBottom: insets.bottom }, tw.style("flex-1")]}
			>
				<View style={tw.style("flex-row flex-wrap")}>
					<FypNullableView visible={postForm.type !== PostType.Audio}>
						{medias.map((media) => (
							<ImagePostChip
								colSpan={medias.length > 1 ? 2 : 1}
								uri={media.uri}
								key={media.uri}
								onPress={() => onToggleMedia(media)}
								orderNumber={
									selectedMedias.findIndex(
										(cell) => cell.uri === media.uri,
									) + 1
								}
								orderAble={
									medias.length > 1 &&
									postForm.type !== PostType.Story &&
									postForm.type !== PostType.Audio
								}
								isVideo={postForm.type === PostType.Video}
							/>
						))}
					</FypNullableView>
					<FypNullableView visible={postForm.type === PostType.Audio}>
						<View
							style={tw.style(
								"w-full h-[393px] flex-row items-center justify-center",
							)}
						>
							<MusicSvg size={58.5} color="#a854f5" />
						</View>

						<View
							style={tw.style(
								"flex-row w-full items-center justify-between py-[10px] pr-[18px] pl-[30px] border-b border-fans-grey",
							)}
						>
							<View style={tw.style("flex-row items-center")}>
								<FansText
									style={tw.style("font-bold mr-4")}
									fontSize={19}
									lineHeight={26}
								>
									Recents
								</FansText>
								<ChevronDownSvg size={10} color="#000" />
							</View>

							<View style={tw.style("flex-row gap-x-2 ml-auto")}>
								<Button
									style={tw.style("bg-fans-grey ml-auto")}
									labelStyle={tw.style(
										"text-[17px] leading-[22px] m-0 px-5 py-[6px] text-black font-normal",
									)}
									onPress={openAudioPicker}
								>
									Upload audio
								</Button>
								<FansIconButton>
									<SearchSvg size={13.26} color="#000" />
								</FansIconButton>
							</View>
						</View>

						<View style={tw.style("px-[18px] w-full")}>
							{medias.map((audio) => (
								<AudioItem
									key={audio.uri}
									data={audio}
									onDelete={() => {
										setMedias([]);
										setSelectedMedias([]);
									}}
									textProps={{
										numberOfLines: 1,
									}}
								/>
							))}
						</View>
					</FypNullableView>
				</View>
				<FypNullableView
					visible={
						![PostType.Story, PostType.Audio].includes(
							postForm.type,
						)
					}
				>
					<View style={tw.style("px-[18px] mt-auto pb-5")}>
						<Pressable
							style={tw.style(
								"w-full flex flex-row items-center justify-center py-2 border border-fans-purple rounded-[42px]",
							)}
							onPress={onSelectMore}
						>
							<PlusSvg size={12} color="#a854f5" />
							<FansText
								fontSize={19}
								lineHeight={26}
								style={tw.style(
									"font-bold text-fans-purple ml-2",
								)}
							>
								Select more
							</FansText>
						</Pressable>
					</View>
				</FypNullableView>
			</View>
		</View>
	);
};

export default ThumbnailScreen;
