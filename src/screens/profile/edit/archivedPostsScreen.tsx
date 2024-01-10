import CustomTopNavBar from "@components/common/customTopNavBar";
import AppLayout, { LayoutContentsContainer } from "@components/common/layout";
import SearchTextInput from "@components/common/searchTextInput";
import Tabs from "@components/common/tabs";
import { ArchivedPostActions } from "@components/profiles";
import { FypVideo } from "@components/common/base";

import tw from "@lib/tailwind";
import { useAppContext } from "@context/useAppContext";
import {
	deletePostById,
	deleteStory,
	getArchivedPosts,
	getStories,
	updatePostArchive,
} from "@helper/endpoints/post/apis";
import {
	PostListRespBody,
	StoriesRespBody,
} from "@helper/endpoints/post/schemas";
import { IPostFilterQuery } from "@usertypes/params";
import { cdnURL } from "@helper/Utils";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ProfileNavigationStacks } from "@usertypes/navigations";

import React, { useEffect, useState } from "react";
import {
	Image,
	Pressable,
	ScrollView,
	View,
	NativeScrollEvent,
} from "react-native";
import Toast from "react-native-toast-message";
import { PostType, ResizeMode } from "@usertypes/commonEnums";

const ArchivedPostsScreen = (
	props: NativeStackScreenProps<ProfileNavigationStacks, "ArchivedPosts">,
) => {
	const { navigation } = props;

	const { state, dispatch } = useAppContext();

	const [tab, setTab] = useState<"post" | "story">("post");
	const [stories, setStories] = useState<StoriesRespBody>({
		stories: [],
		page: 1,
		size: 10,
		total: 0,
	});
	const [searchKey, setSearchKey] = useState("");
	const [openActions, setOpenActions] = useState(false);
	const [selectedId, setSelectedId] = useState("");
	const [size, setSize] = useState(0);
	const [posts, setPosts] = useState<PostListRespBody>({
		posts: [],
		page: 1,
		size: 10,
		total: 0,
	});
	const [inLoadingMore, setInLoadingMore] = useState<{
		post: Boolean;
		story: boolean;
	}>({
		post: false,
		story: false,
	});

	const onChangeSearch = (val: string) => {
		setSearchKey(val);
	};

	const onClickPost = (postId: string) => {
		setSelectedId(postId);
		setOpenActions(true);
	};

	const onClickStory = (storyId: string) => {
		setSelectedId(storyId);
		setOpenActions(true);
	};

	const fetchArchivedPosts = async () => {
		dispatch.setShowLoading();
		const filterObject: IPostFilterQuery = {
			page: posts.page,
			size: 10,
		};
		const resp = await getArchivedPosts(filterObject);
		dispatch.setHideLoading();
		setInLoadingMore({
			...inLoadingMore,
			post: false,
		});
		if (resp.ok) {
			setPosts({
				...resp.data,
				posts:
					resp.data.page === 1
						? resp.data.posts
						: [...posts.posts, ...resp.data.posts],
			});
		}
	};

	const fetchStories = async () => {
		const filterObject: IPostFilterQuery = {
			page: stories.page,
			size: 10,
		};
		const resp = await getStories(filterObject);
		setInLoadingMore({
			...inLoadingMore,
			story: false,
		});
		if (resp.ok) {
			setStories({
				...resp.data,
				stories:
					resp.data.page === 1
						? resp.data.stories
						: [...stories.stories, ...resp.data.stories],
			});
		}
	};

	const handleUnArchivePost = async () => {
		setOpenActions(false);
		dispatch.setShowLoading();
		if (tab === "post") {
			const resp = await updatePostArchive({ id: selectedId });
			if (resp.ok) {
				setPosts({
					...posts,
					posts: posts.posts.filter((post) => post.id !== selectedId),
				});
			}
		}

		dispatch.setHideLoading();
	};

	const handleDeletePost = async () => {
		setOpenActions(false);
		dispatch.setShowLoading();
		const resp = await deletePostById(
			{ id: selectedId },
			{ id: selectedId },
		);
		if (tab === "post") {
			if (resp.ok) {
				setPosts({
					...posts,
					posts: posts.posts.filter((post) => post.id !== selectedId),
				});
			}
		}
		dispatch.setHideLoading();
	};

	const handleDeleteStory = async () => {
		setOpenActions(false);
		dispatch.setShowLoading();
		const resp = await deleteStory({ id: selectedId }, { id: selectedId });
		if (resp.ok) {
			setStories({
				...stories,
				stories: stories.stories.filter(
					(story) => story.id !== selectedId,
				),
			});
		} else {
			Toast.show({
				type: "error",
				text1: "Failed to delete story",
			});
		}
		dispatch.setHideLoading();
	};

	const onScrollView = (nativeEvent: NativeScrollEvent) => {
		const paddingToBottom = 20;
		const isScrollEnd =
			nativeEvent.layoutMeasurement.height +
				nativeEvent.contentOffset.y >=
			nativeEvent.contentSize.height - paddingToBottom;
		if (isScrollEnd && !inLoadingMore.post && tab === "post") {
			if (posts.total > 10 * posts.page) {
				setInLoadingMore({
					...inLoadingMore,
					post: true,
				});
				setPosts({
					...posts,
					page: posts.page + 1,
				});
			}
		}
		if (isScrollEnd && !inLoadingMore.story && tab === "story") {
			if (stories.total > 10 * stories.page) {
				setInLoadingMore({
					...inLoadingMore,
					story: true,
				});
				setStories({
					...stories,
					page: stories.page + 1,
				});
			}
		}
	};
	useEffect(() => {
		fetchStories();
	}, [stories.page]);

	useEffect(() => {
		fetchArchivedPosts();
	}, [posts.page]);
	return (
		<AppLayout
			title="Edit Profile | FYP.Fans"
			description="FYP.Fans allows creators to make an income doing what they love!"
		>
			<View style={tw.style("flex-1")}>
				<ScrollView
					style={tw.style("flex-1")}
					onScroll={({ nativeEvent }) => onScrollView(nativeEvent)}
					scrollEventThrottle={30}
				>
					<LayoutContentsContainer>
						<CustomTopNavBar
							title="Archived posts"
							onClickLeft={() => navigation.goBack()}
							onClickRight={() => {}}
							rightLabel=""
							titleIcon="archived-post"
						/>
						<View>
							<Tabs
								tabs={[
									{
										data: "post",
										label: "Posts",
									},
									{
										data: "story",
										label: "Stories",
									},
								]}
								selectedTab={tab}
								onChangeTab={(val) =>
									setTab(val as "post" | "story")
								}
							/>
							<View style={tw.style("px-[18px] pt-5 pb-[18px]")}>
								<SearchTextInput
									placeholder={
										tab === "post"
											? "Search post"
											: "Search story"
									}
									onChangeText={onChangeSearch}
									value={searchKey}
								/>
							</View>

							{tab === "post" ? (
								<View style={tw.style("flex-row flex-wrap")}>
									{posts.posts.map((post) => (
										<Pressable
											style={tw.style(
												"w-1/3 border border-white",
												`h-[${size}px]`,
											)}
											key={post.id}
											onPress={() => onClickPost(post.id)}
											onLayout={(e) =>
												setSize(
													e.nativeEvent.layout.width,
												)
											}
										>
											{post.type === PostType.Video ? (
												<FypVideo
													source={{
														uri:
															cdnURL(
																post.medias[0]
																	.url,
															) ?? "",
													}}
													resizeMode={
														ResizeMode.CONTAIN
													}
													style={tw.style(
														"w-full h-full",
													)}
												/>
											) : (
												<Image
													source={{
														uri: cdnURL(
															post.thumb?.url,
														),
													}}
													style={tw.style(
														"w-full h-full",
													)}
													resizeMode="cover"
												/>
											)}
										</Pressable>
									))}
								</View>
							) : (
								<View style={tw.style("flex-row flex-wrap")}>
									{stories.stories.map((story) => (
										<Pressable
											style={[
												tw.style(
													"w-1/3 border border-white",
													{ height: size },
												),
											]}
											key={story.id}
											onPress={() =>
												onClickStory(story.id)
											}
											onLayout={(e) =>
												setSize(
													e.nativeEvent.layout.width,
												)
											}
										>
											<Image
												source={{
													uri: cdnURL(
														story.medias[0],
													),
												}}
												style={tw.style(
													"w-full h-full",
												)}
												resizeMode="cover"
											/>
										</Pressable>
									))}
								</View>
							)}
						</View>

						<ArchivedPostActions
							open={openActions}
							onClose={() => setOpenActions(false)}
							onClickDelete={() => {
								if (tab === "post") {
									handleDeletePost();
								} else {
									handleDeleteStory();
								}
							}}
							onClickUnarchive={handleUnArchivePost}
							tab={tab}
						/>
					</LayoutContentsContainer>
				</ScrollView>
			</View>
		</AppLayout>
	);
};

export default ArchivedPostsScreen;
