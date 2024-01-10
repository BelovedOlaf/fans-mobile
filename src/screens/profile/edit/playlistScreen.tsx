import { PlusSvg } from "@assets/svgs/common";
import FormControl from "@components/common/FormControl";
import CustomText from "@components/common/customText";
import CustomTopNavBar from "@components/common/customTopNavBar";
import AppLayout, { LayoutContentsContainer } from "@components/common/layout";
import SearchTextInput from "@components/common/searchTextInput";
import { ImagePostChip, PreviewImageField } from "@components/posts/common";
import { FilterButton } from "@components/profiles";
import { ProfileActionType, useAppContext } from "@context/useAppContext";
import { getPostFeedForProfile } from "@helper/endpoints/post/apis";
import {
	createPlaylist,
	getPlaylistById,
	updatePlaylist,
} from "@helper/endpoints/profile/apis";
import useDocumentPicker from "@utils/useDocumentPicker";
import { PlaylistReqBody } from "@helper/endpoints/profile/schemas";
import tw from "@lib/tailwind";

import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { MediaType } from "@usertypes/commonEnums";
import { ProfileNavigationStacks } from "@usertypes/navigations";
import { IPickerMedia, IPost } from "@usertypes/types";
import useUploadFiles from "@utils/useUploadFile";
import React, { useEffect, useState } from "react";
import { Pressable, ScrollView, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";

const PlaylistScreen = (
	props: NativeStackScreenProps<ProfileNavigationStacks, "Playlist">,
) => {
	const { navigation, route } = props;
	const { id } = route.params;

	const insets = useSafeAreaInsets();

	const { state, dispatch } = useAppContext();
	const { playlists, addedPostIds, userId } = state.profile;
	const { uploadFiles } = useUploadFiles();
	const { useImagePicker } = useDocumentPicker();

	const filters = ["Newest", "Oldest", "Filter by date"];

	const [searchKey, setSearchKey] = useState("");
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [filter, setFilter] = useState("Newest");
	const [selectedPostIds, setSelectedPostIds] = useState<string[]>([]);

	const [allPosts, setAllPosts] = useState<IPost[]>([]);
	const [posts, setPosts] = useState<IPost[]>([]);
	const [isSubmitted, setIsSubmitted] = useState(false);
	const [coverImg, setCoverImg] = useState<IPickerMedia>({
		uri: "",
		isPicker: false,
	});
	const [inProgress, setInProgress] = useState(false);

	const handleChangeImage = async () => {
		const result = await useImagePicker();
		if (result?.ok) {
			const medias = result.data ?? [];
			if (medias.length > 0) {
				setCoverImg(medias[0]);
			}
		} else {
			Toast.show({
				type: "error",
				text1: result?.message ?? "",
			});
		}
	};

	const onClickAddPost = () => {
		// router.push({
		// 	pathname: "/profile/edit/add-posts",
		// 	params: {
		// 		selectedPostIds: selectedPostIds
		// 	},
		// });
		navigation.navigate("AddPosts", { selectedPostIds: selectedPostIds });
	};

	const onChangeSearch = (val: string) => {
		setSearchKey(val);
	};

	const onTogglePost = (postId: string) => {
		setSelectedPostIds(
			selectedPostIds.includes(postId)
				? selectedPostIds.filter((el) => el !== postId)
				: [...selectedPostIds, postId],
		);
	};

	const fetchPlaylistDetail = async () => {
		dispatch.setShowLoading();
		const resp = await getPlaylistById({ id: id as string });
		if (resp.ok) {
			setTitle(resp.data.title);
			setDescription(resp.data.description);
			setSelectedPostIds(resp.data.posts.map((el: IPost) => el.id));
			setPosts(resp.data.posts);
			setCoverImg({
				uri: resp.data.thumb,
				isPicker: false,
			});
		}
		dispatch.setHideLoading();
	};

	const fetchPosts = async () => {
		const resp = await getPostFeedForProfile({ userId: userId });
		if (resp.ok) {
			setAllPosts(resp.data.posts);
			setPosts(resp.data.posts);
		}
	};

	const handleCreate = async (postbody: PlaylistReqBody) => {
		const resp = await createPlaylist(postbody);
		if (resp.ok) {
			dispatch.setProfile({
				type: ProfileActionType.updateProfile,
				data: {
					playlists: [
						...playlists,
						{
							...resp.data,
							posts: posts.filter((post) =>
								postbody.posts.includes(post.id),
							),
						},
					],
				},
			});
			navigation.goBack();
		} else {
			Toast.show({
				type: "error",
				text1: "Failed to create playlist",
			});
		}
		setInProgress(false);
	};

	const handleEdit = async (postbody: PlaylistReqBody) => {
		const resp = await updatePlaylist(postbody, { id: id as string });
		setInProgress(false);
		if (resp.ok) {
			dispatch.setProfile({
				type: ProfileActionType.updateProfile,
				data: {
					playlists: playlists.map((playlist) =>
						playlist.id === id
							? {
									...playlist,
									...postbody,
									id: id,
									posts: posts.filter((post) =>
										postbody.posts.includes(post.id),
									),
							  }
							: playlist,
					),
					addedPostIds: [],
				},
			});
			navigation.goBack();
		} else {
			Toast.show({
				type: "error",
				text1: "Failed to update playlist",
			});
		}
	};

	const handleSave = async () => {
		setIsSubmitted(true);
		if (
			title === "" ||
			description === "" ||
			selectedPostIds.length === 0
		) {
			if (
				title !== "" &&
				description !== "" &&
				selectedPostIds.length === 0
			) {
				Toast.show({
					type: "error",
					text1: "Please select posts.",
				});
			}
			return;
		}
		setInProgress(true);
		let newCoverImg = coverImg.uri;
		if (coverImg.isPicker && coverImg.uri) {
			const uploadingResp = await uploadFiles([
				{ uri: coverImg.uri, type: MediaType.Image },
			]);
			if (uploadingResp?.ok) {
				newCoverImg = uploadingResp.data[0].id as string;
			}
		}
		const data = {
			title: title,
			description: description,
			thumbId: newCoverImg,
			posts: selectedPostIds,
			isPrivate: false,
		};

		if (id) {
			handleEdit(data);
		} else {
			handleCreate(data);
		}
	};

	const handleBack = () => {
		dispatch.setProfile({
			type: ProfileActionType.updateProfile,
			data: {
				addedPostIds: [],
			},
		});
		navigation.goBack();
	};

	useEffect(() => {
		fetchPosts();
		if (id) {
			fetchPlaylistDetail();
		}
	}, [id]);

	useEffect(() => {
		if (addedPostIds.length > 0) {
			setPosts([
				...posts,
				...allPosts.filter((post) => addedPostIds.includes(post.id)),
			]);
		}
	}, [addedPostIds]);

	return (
		<AppLayout
			title="Edit Profile | FYP.Fans"
			description="FYP.Fans allows creators to make an income doing what they love!"
		>
			<View style={tw.style("flex-1")}>
				<ScrollView style={tw.style("flex-1")}>
					<LayoutContentsContainer>
						<CustomTopNavBar
							title={id ? "Edit playlist" : "Create playlist"}
							onClickLeft={handleBack}
							onClickRight={handleSave}
							rightLabel={id ? "Save" : "Create"}
							loading={inProgress}
						/>
						<View
							style={[
								{
									paddingBottom: insets.bottom + 35,
								},
								tw.style("pt-6"),
							]}
						>
							<View style={tw.style("px-[18px]")}>
								<FormControl
									label="Playlist name"
									placeholder="e.g. My Podcast"
									value={title}
									onChangeText={(val: string) =>
										setTitle(val)
									}
									styles="mb-8"
									hasError={isSubmitted && title === ""}
									validateString="Title is required"
									maxLength={50}
								/>

								<FormControl
									label="Playlist description"
									placeholder="Write a description"
									value={description}
									onChangeText={(val: string) =>
										setDescription(val)
									}
									styles="mb-8"
									isTextArea={true}
									hasError={isSubmitted && description === ""}
									validateString="Description is required"
									maxLength={1000}
								/>
							</View>

							<View style={tw.style("md:px-[18px] mb-7.5")}>
								<PreviewImageField
									label="Thumbnail"
									data={coverImg}
									onChangeImage={handleChangeImage}
									sizeRate={0.65}
								/>
							</View>

							<View>
								<View
									style={tw.style(
										"flex-row items-center justify-between px-[18px]",
									)}
								>
									<CustomText size="lg">Posts</CustomText>
									{id && (
										<Pressable
											style={tw.style(
												"flex-row items-center",
											)}
											onPress={onClickAddPost}
										>
											<PlusSvg
												width={10}
												height={10}
												color="#a854f5"
											/>
											<CustomText
												size="lg"
												style="ml-[10px] text-fans-purple"
											>
												Add post
											</CustomText>
										</Pressable>
									)}
								</View>

								<ScrollView
									horizontal
									contentContainerStyle={{
										paddingHorizontal: 18,
										columnGap: 7,
										marginBottom: 24,
										marginTop: 15,
									}}
									showsHorizontalScrollIndicator={false}
								>
									{filters.map((el) => (
										<FilterButton
											title={el}
											selected={filter === el}
											onClick={() => setFilter(el)}
											key={el}
										/>
									))}
								</ScrollView>

								<View style={tw.style("px-[18px] mb-6")}>
									<SearchTextInput
										value={searchKey}
										onChangeText={onChangeSearch}
									/>
								</View>

								<View style={tw.style("flex-row flex-wrap")}>
									{posts.map((post) => (
										<ImagePostChip
											colSpan={3}
											uri={post.thumb?.url ?? ""}
											key={post.id}
											onPress={() =>
												onTogglePost(post.id)
											}
											orderNumber={
												selectedPostIds.findIndex(
													(id) => id === post.id,
												) + 1
											}
											orderAble={true}
										/>
									))}
								</View>
							</View>
						</View>
					</LayoutContentsContainer>
				</ScrollView>
			</View>
		</AppLayout>
	);
};

export default PlaylistScreen;
