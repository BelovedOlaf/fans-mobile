import { DocEditSvg, EditSvg } from "@assets/svgs/common";
import CardActions from "@components/common/cardActions";
import AppLayout, { LayoutContentsContainer } from "@components/common/layout";
import {
	FypNullableView,
	FypHorizontalScrollView,
} from "@components/common/base";
import { FansDivider } from "@components/controls";
import {
	AppBar,
	BecomeCreator,
	CreatorStoryFeed,
	FilterButton,
	YouStoryFeed,
} from "@components/posts/common";
import {
	UserListModal,
	SendMessageDialog,
	PostCommentDialog,
	PostLiveDialog,
} from "@components/posts/dialogs";
import SubscribeDialog from "@components/common/dialog/subscribeDialog";
import PostCard from "@components/posts/postCard";
import SuggestProfiles from "@components/posts/suggestProfiles";
import { defaultPostFormData } from "@constants/defaultFormData";
import { POST_REPORT_DIALOG_ID } from "@constants/modal";
import {
	CommonActionType,
	ModalActionType,
	PostsActionType,
	StoryActionType,
	useAppContext,
} from "@context/useAppContext";
import * as apis from "@helper/endpoints";
import useDocumentPicker from "@utils/useDocumentPicker";
import { PostListRespBody } from "@helper/endpoints/post/schemas";
import { UserlistsRespBody } from "@helper/endpoints/userlist/schemas";
import tw from "@lib/tailwind";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useFeatureGates } from "@state/featureGates";
import {
	IconTypes,
	PostStepTypes,
	PostType,
	UserRoleTypes,
	SubscribeActionType,
} from "@usertypes/commonEnums";
import { PostsNavigationStacks } from "@usertypes/navigations";
import { ICardAction, IProfile, IPost } from "@usertypes/types";

import * as Clipboard from "expo-clipboard";
import { useRouter } from "expo-router";
import React, { Fragment, useEffect, useState } from "react";
import {
	NativeScrollEvent,
	ScrollView,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import * as Linking from "expo-linking";

const PostDesignScreen = (
	props: NativeStackScreenProps<PostsNavigationStacks, "Home">,
) => {
	const { navigation } = props;
	const router = useRouter();
	const insets = useSafeAreaInsets();
	const { useImagePicker } = useDocumentPicker();
	const { state, dispatch } = useAppContext();
	const { userInfo } = state.user;
	const { step: postFormStep } = state.posts.modal;
	const { storiesFeed: creators } = state.story;

	const isMd = tw.prefixMatch("md");

	const [isLoading, setIsLoading] = useState(false);
	const [posts, setPosts] = useState<PostListRespBody>({
		posts: [],
		page: 1,
		size: 10,
		total: 0,
	});
	const [selectedPostId, setSelectedPostId] = useState("");
	const [openMessageDialog, setOpenMessageDialog] = useState(false);
	const [openPostActions, setOpenPostActions] = useState(false);

	const [openCreatingUsers, setOpenCreatingUsers] = useState(false);
	const [openCommentModal, setOpenCommentModal] = useState(false);

	const [userLists, setUserLists] = useState<UserlistsRespBody>({
		userlists: [],
		page: 1,
		size: 10,
		total: 0,
	});
	const [userListId, setUserListId] = useState<string>("all");

	const featureGates = useFeatureGates();

	const onClickCreatorFeed = (creator: IProfile) => {
		// setCreators(
		// 	creators.map((cell) =>
		// 		cell.id === creator.id ? { ...cell, isSelected: true } : cell,
		// 	),
		// );
		dispatch.setStory({
			type: StoryActionType.updateStoryState,
			data: {
				storiesFeed: creators,
			},
		});
		router.push({
			pathname: "stories",
			params: {
				screen: "Creator",
				userId: creator.userId,
			},
		});
	};

	const goToCreateStory = async () => {
		dispatch.setPosts({
			type: PostsActionType.updatePostForm,
			data: {
				...defaultPostFormData,
				type: PostType.Story,
			},
		});
		if (isMd) {
			dispatch.setPosts({
				type: PostsActionType.updatePostModal,
				data: {
					visible: true,
					step: PostStepTypes.Thumbnail,
				},
			});
		} else {
			const result = await useImagePicker();
			if (result?.ok) {
				dispatch.setPosts({
					type: PostsActionType.updatePostForm,
					data: {
						...defaultPostFormData,
						medias: result.data ?? [],
						type: PostType.Story,
					},
				});
				navigation.navigate("Thumbnail");
			} else {
				Toast.show({
					type: "error",
					text1: result?.message ?? "",
				});
			}
		}
	};

	const onChangeLike = async (id: string) => {
		const post = posts.posts.find((el) => el.id === id);
		if (post?.isLiked) {
			const resp = await apis.post.unlikePostWidthPostId(null, {
				id: id,
			});
			if (resp.ok) {
				setPosts({
					...posts,
					posts: posts.posts.map((el) =>
						el.id === id
							? {
									...el,
									likeCount: resp.data.likeCount,
									isLiked: resp.data.isLiked,
							  }
							: el,
					),
				});
			}
		} else {
			const resp = await apis.post.likePostWithPostId(null, { id: id });
			if (resp.ok) {
				setPosts({
					...posts,
					posts: posts.posts.map((el) =>
						el.id === id
							? {
									...el,
									likeCount: resp.data.likeCount,
									isLiked: resp.data.isLiked,
							  }
							: el,
					),
				});
			}
		}
	};

	const onClickBookmark = async (id: string) => {
		const post = posts.posts.find((el) => el.id === id);
		if (post?.isBookmarked) {
			const resp = await apis.post.deleteBookmark(null, { id });
			if (resp.ok) {
				setPosts({
					...posts,
					posts: posts.posts.map((el) =>
						el.id === id
							? {
									...el,
									isBookmarked:
										resp.data.updatedPost.isBookmarked,
									bookmarkCount:
										resp.data.updatedPost.bookmarkCount,
							  }
							: el,
					),
				});
			}
		} else {
			const resp = await apis.post.setBookmark(null, { id });
			if (resp.ok) {
				setPosts({
					...posts,
					posts: posts.posts.map((el) =>
						el.id === id
							? {
									...el,
									isBookmarked:
										resp.data.updatedPost.isBookmarked,
									bookmarkCount:
										resp.data.updatedPost.bookmarkCount,
							  }
							: el,
					),
				});
			}
		}
	};

	const onClickMessage = (id: string) => {
		setOpenMessageDialog(true);
	};

	const onClickPostActionMenu = (id: string) => {
		setSelectedPostId(id);
		setOpenPostActions(true);
	};

	const handleSendMessage = (message: string) => {
		setOpenMessageDialog(false);
	};

	const onChangeUserListActive = async (
		userListId: string,
		active: boolean,
	) => {
		const resp = await apis.userlist.updateUserlist(
			{ isActive: active },
			{ id: userListId },
		);
		if (resp.ok) {
			setUserLists({
				...userLists,
				userlists: userLists.userlists.map((userlist) =>
					userlist.id === userListId
						? {
								...userlist,
								isActive: active,
						  }
						: userlist,
				),
			});
		}
		// setOpenCreatingUsers(false);
	};

	const onCreateNewPost = () => {
		if (postFormStep === PostStepTypes.Empty) {
			dispatch.setCommon({
				type: CommonActionType.toggleNewPostTypesModal,
				data: true,
			});
		} else {
			dispatch.setPosts({
				type: PostsActionType.updatePostModal,
				data: {
					visible: true,
				},
			});
		}
	};

	const handleHidePostFeed = async () => {
		const resp = await apis.post.hidePostFromFeed(null, {
			id: selectedPostId,
		});
		if (resp.ok) {
			setOpenPostActions(false);
			setPosts({
				...posts,
				page: 1,
			});
		}
	};

	const handleCopyPostLink = async () => {
		setOpenPostActions(false);
		const url = Linking.createURL(`p/${selectedPostId}`);
		await Clipboard.setStringAsync(url);
	};

	const handleReportPost = () => {
		setOpenPostActions(false);
		dispatch.setModal({
			type: ModalActionType.showModal,
			data: {
				id: POST_REPORT_DIALOG_ID,
				show: true,
				payload: { postId: selectedPostId },
			},
		});
	};

	const handleViewPostProfile = () => {
		setOpenPostActions(false);
		const post = posts.posts.find((cell) => cell.id === selectedPostId);
		if (post?.profile?.profileLink) {
			router.push(`/${post.profile.profileLink.split("/").slice(-1)}`);
		}
	};

	const getPostFeeds = async () => {
		const query = {
			page: posts.page,
			size: 10,
		};
		const resp = await apis.post.getPostFeedForHomepage(query);
		setIsLoading(false);
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

	const fetchStoriesFeed = async () => {
		const resp = await apis.stories.getStoriesFeed();
		if (resp.ok) {
			dispatch.setStory({
				type: StoryActionType.updateStoryState,
				data: {
					storiesFeed: resp.data.creators,
				},
			});
		}
	};

	const onSelectUserList = (val: string) => {
		setUserListId(val);
	};

	const onClickFilterEdit = () => {
		setOpenCreatingUsers(true);
	};

	const getUserLists = async () => {
		const resp = await apis.userlist.getUserlists();
		if (resp.ok) {
			setUserLists(resp.data);
		}
	};

	const onClickPostUnlock = (post: IPost) => {
		dispatch.setCommon({
			type: CommonActionType.toggleSubscribeModal,
			data: {
				visible: true,
				creator: state.profile,
				subscribeActionType: SubscribeActionType.Post,
				bundleId: "0",
				subscribeTierId: "0",
				defaultTab: "form",
				post: post,
			},
		});
	};

	const onPaidPostCallback = (postId: string) => {
		setPosts({
			...posts,
			posts: posts.posts.map((post) =>
				post.id === postId ? { ...post, isPaidOut: true } : post,
			),
		});
	};

	const onCommentCallback = (postId: string, commentCounts: number) => {
		setPosts({
			...posts,
			posts: posts.posts.map((post) =>
				post.id === postId
					? {
							...post,
							commentCount: commentCounts,
					  }
					: post,
			),
		});
	};

	const postLiveModalCallback = async (postId: string) => {
		if (tw.prefixMatch("md")) {
			const resp = await apis.post.getPostById({ id: postId });
			if (resp.ok) {
				setPosts({
					...posts,
					total: posts.total + 1,
					posts: [resp.data, ...posts.posts],
				});
			}
		} else {
			getPostFeeds();
		}
	};

	const postActions: ICardAction[] = [
		{
			title: "View profile",
			iconType: IconTypes.EyeShow,
			onClick: handleViewPostProfile,
		},
		{
			title: "Copy post link",
			iconType: IconTypes.CopyLink,
			onClick: handleCopyPostLink,
		},
		{
			title: "Hide posts from feed",
			iconType: IconTypes.EyeHide,
			onClick: handleHidePostFeed,
		},
		{
			title: "Report post",
			iconType: IconTypes.Report,
			iconColor: "#eb2121",
			onClick: handleReportPost,
			labelClass: "text-fans-red",
		},
	];

	const onScrollView = (nativeEvent: NativeScrollEvent) => {
		const paddingToBottom = 20;
		const isScrollEnd =
			nativeEvent.layoutMeasurement.height +
				nativeEvent.contentOffset.y >=
			nativeEvent.contentSize.height - paddingToBottom;
		if (isScrollEnd && !isLoading) {
			if (posts.total > 10 * posts.page) {
				setIsLoading(true);
				setPosts({
					...posts,
					page: posts.page + 1,
				});
			}
		}
	};

	useEffect(() => {
		getPostFeeds();
		fetchStoriesFeed();
		getUserLists();
	}, []);

	useEffect(() => {
		getPostFeeds();
	}, [posts.page]);

	useEffect(() => {
		setPosts({
			...posts,
			page: 1,
			total: 0,
		});
	}, [state.posts.modal.visible]);

	return (
		<AppLayout
			title="Homepage Feed | FYP.Fans"
			description="Your feed where you see posts from all the creators you are subscribed to at FYP.Fans."
		>
			<View style={tw.style("flex-1")}>
				<ScrollView
					style={tw.style("flex-1")}
					onScroll={({ nativeEvent }) => onScrollView(nativeEvent)}
					scrollEventThrottle={30}
				>
					<LayoutContentsContainer paddingTop={0}>
						<View
							style={[
								{
									paddingTop: insets.top,
								},
								tw.style("pb-[66px] md:pt-15"),
							]}
						>
							<AppBar />
							<FypHorizontalScrollView
								contentContainerStyle={{
									paddingHorizontal: 18,
									paddingBottom: 9,
									columnGap: 15,
								}}
							>
								<FypNullableView
									visible={
										userInfo.type === UserRoleTypes.Creator
									}
								>
									<YouStoryFeed onPress={goToCreateStory} />
								</FypNullableView>

								{creators.map((creator) => (
									<CreatorStoryFeed
										key={creator.id}
										creator={creator}
										onNavigate={() =>
											onClickCreatorFeed(creator)
										}
									/>
								))}
							</FypHorizontalScrollView>
							<FansDivider style={tw.style("mb-5")} />
							<FypNullableView
								visible={
									userInfo.type === UserRoleTypes.Fan &&
									userInfo.id !== "0"
								}
							>
								<View style={tw.style("px-[18px] mb-5")}>
									<BecomeCreator />
								</View>
							</FypNullableView>
							<FypNullableView
								visible={
									userInfo.type === UserRoleTypes.Creator
								}
							>
								<View style={tw.style("px-[18px] md:px-0")}>
									<TouchableOpacity
										style={tw.style(
											"w-full flex flex-row items-center justify-center py-2 border border-fans-purple rounded-[42px]",
										)}
										onPress={onCreateNewPost}
									>
										<DocEditSvg
											width={16.3}
											height={16.3}
											color="#a854f5"
										/>
										<Text
											style={tw.style(
												"text-[19px] font-bold text-fans-purple ml-2",
											)}
										>
											New Post
										</Text>
									</TouchableOpacity>
								</View>
							</FypNullableView>

							{featureGates.has("2023_10-user-lists") && (
								<View style={tw.style("mt-5")}>
									<FypHorizontalScrollView
										contentContainerStyle={{
											paddingHorizontal: 18,
											columnGap: 8,
										}}
									>
										<FilterButton
											title="All"
											onClick={() =>
												onSelectUserList("all")
											}
											isSelected={userListId === "all"}
										/>
										{userLists.userlists.map((userList) => (
											<FilterButton
												key={userList.id}
												title={userList.title}
												onClick={() =>
													onSelectUserList(
														userList.id,
													)
												}
												isSelected={
													userListId === userList.id
												}
											/>
										))}
										<TouchableOpacity
											style={tw.style(
												"py-[6px] flex-row items-center",
											)}
											onPress={onClickFilterEdit}
										>
											<EditSvg
												width={13}
												height={13.5}
												color="#a854f5"
											/>
											<Text
												style={tw.style(
													"text-fans-purple font-bold text-[17px] leading-[22px] ml-[6.5px]",
												)}
											>
												Edit
											</Text>
										</TouchableOpacity>
									</FypHorizontalScrollView>
								</View>
							)}

							<View style={tw.style("gap-y-4 mt-5")}>
								{posts.posts.map((post) => (
									<Fragment key={post.id}>
										<PostCard
											data={post}
											onClickBookmark={() =>
												onClickBookmark(post.id)
											}
											onClickLike={() =>
												onChangeLike(post.id)
											}
											onClickActionMenu={() =>
												onClickPostActionMenu(post.id)
											}
											onClickMessage={() =>
												onClickMessage(post.id)
											}
											onClickUnlock={() =>
												onClickPostUnlock(post)
											}
											onClickComment={() => {
												setSelectedPostId(post.id);
												setOpenCommentModal(true);
											}}
										/>
										<FansDivider
											style={tw.style(
												"mt-4 mb-2 mx-[18px] md:mx-0 md:mt-4.5 md:mb-2.5",
											)}
											size={1}
										/>
									</Fragment>
								))}
								<View style={tw.style("md:mx-[-18px]")}>
									<SuggestProfiles />
								</View>
							</View>
						</View>
					</LayoutContentsContainer>
				</ScrollView>
			</View>
			<SendMessageDialog
				open={openMessageDialog}
				onClose={() => setOpenMessageDialog(false)}
				onSubmit={handleSendMessage}
			/>

			<UserListModal
				open={openCreatingUsers}
				onClose={() => {
					setOpenCreatingUsers(false);
					getUserLists();
				}}
				usersLists={userLists.userlists}
				onChangeUserListActive={onChangeUserListActive}
			/>

			<CardActions
				open={openPostActions}
				onClose={() => {
					setOpenPostActions(false);
				}}
				actions={postActions}
			/>
			<SubscribeDialog paidPostCallback={onPaidPostCallback} />
			<PostCommentDialog
				visible={openCommentModal}
				postId={selectedPostId}
				onDismiss={() => setOpenCommentModal(false)}
				onCallback={onCommentCallback}
			/>
			<PostLiveDialog closeCallback={postLiveModalCallback} />
		</AppLayout>
	);
};

export default PostDesignScreen;
