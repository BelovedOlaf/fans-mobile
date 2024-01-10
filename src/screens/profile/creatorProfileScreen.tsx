import {
	FansDivider,
	FansView,
	FansIconButton,
	FansText,
} from "@components/controls";
import {
	AddressSvg,
	ArchivedPostSvg,
	BirthdaySvg,
	DocEditSvg,
	EditSvg,
	RoundedBorderSvg,
	StarCheckSvg,
	StatisticsSvg,
} from "@assets/svgs/common";
import AvatarWithStatus from "@components/common/AvatarWithStatus";
import CardActions from "@components/common/cardActions";
import RoundButton from "@components/common/RoundButton";
import CopyLink from "@components/common/copyLink";
import AppLayout, { LayoutContentsContainer } from "@components/common/layout";
import Tabs from "@components/common/tabs";
import { StoryCell } from "@components/posts/common";
import {
	SendMessageDialog,
	ShareDialog,
	PostCommentDialog,
	PostLiveDialog,
} from "@components/posts/dialogs";
import {
	BioText,
	CountsDetails,
	MediaTabContents,
	PlaylistsTabContents,
	PostsTabContents,
	ProfileCarousel,
	ProfilePostActions,
	SocialLinkList,
	SubscriptionPart,
	TopActions,
	WelcomeModal,
	StickyHeader,
	ProfileThreeDotsDialog,
} from "@components/profiles";
import { JoinProgramCard } from "@components/refer";

import tw from "@lib/tailwind";
import { PROFILE_THREE_DOTS_DIALOG_ID } from "@constants/modal";
import {
	CommonActionType,
	ProfileActionType,
	StoryActionType,
	ModalActionType,
	useAppContext,
	PostsActionType,
} from "@context/useAppContext";
import {
	MediaType,
	RoundButtonType,
	SortType,
	SubscriptionTypes,
	IconTypes,
	PostStepTypes,
} from "@usertypes/commonEnums";
import { ProfileNavigationStacks } from "@usertypes/navigations";
import { IMediaFilterQuery, IPostFilterQuery } from "@usertypes/params";
import {
	IHighlight,
	IPostAdvanced,
	ICardAction,
	IPost,
} from "@usertypes/types";
import * as apis from "@helper/endpoints";
import { MediasRespBody } from "@helper/endpoints/media/schemas";
import { PostListRespBody } from "@helper/endpoints/post/schemas";
import { checkEnableMediasLoadingMore } from "@utils/common";
import { getBirthdayString } from "@utils/stringHelper";
import { useBlankLink } from "@utils/useBlankLink";

import { useFocusEffect } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useRouter } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import { NativeScrollEvent, ScrollView } from "react-native";
import { Button } from "react-native-paper";
import Toast from "react-native-toast-message";
import { FypNullableView } from "@components/common/base";

const CreatorProfileScreen = (
	props: NativeStackScreenProps<ProfileNavigationStacks, "Profile">,
) => {
	const { navigation } = props;
	const router = useRouter();

	const [openLink] = useBlankLink();
	const { state, dispatch } = useAppContext();
	const { playlists, highlights, socialLinks, tiers } = state.profile;
	const profile = state.profile;
	const { step: postFormStep } = state.posts.modal;

	const [inLoadingMore, setInLoadingMore] = useState<{
		post: Boolean;
		media: boolean;
	}>({
		post: false,
		media: false,
	});
	const [filter, setFilter] = useState<{
		post: SortType | string;
		media: MediaType;
	}>({
		post: SortType.Latest,
		media: MediaType.All,
	});
	const [posts, setPosts] = useState<PostListRespBody>({
		posts: [],
		page: 1,
		size: 10,
		total: 0,
	});
	const [medias, setMedias] = useState<MediasRespBody>({
		medias: [],
		page: 1,
		size: 10,
		total: 0,
		videoTotal: 0,
		imageTotal: 0,
	});
	const [showWelcome, setShowWelcome] = useState(false);
	const [tab, setTab] = useState("post");
	const [openShare, setOpenShare] = useState(false);

	const [selectedPostId, setSelectedPostId] = useState("");
	const [openPostActions, setOpenPostActions] = useState(false);
	const [openMessageDialog, setOpenMessageDialog] = useState(false);
	const [showStickyHeader, setShowStickyHeader] = useState(false);
	const [playlistId, setPlaylistId] = useState("");
	const [openPlaylistMenus, setOpenPlaylistMenus] = useState(false);
	const [openCommentModal, setOpenCommentModal] = useState(false);

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

	const onClickHighlight = async (highlight: IHighlight) => {
		const resp = await apis.profile.getHighlightById({ id: highlight.id });
		if (resp.ok) {
			dispatch.setStory({
				type: StoryActionType.updateStoryState,
				data: {
					highlightStory: {
						profile: state.profile,
						stories: resp.data.stories,
					},
				},
			});
			router.push({
				pathname: "stories",
				params: {
					screen: "Highlight",
					highlightId: highlight.id,
					userId: profile.userId,
				},
			});
		}
	};

	const onClickAddTier = () => {
		navigation.navigate("Tier", { id: null });
	};

	const onClickEditTier = (id: string) => {
		navigation.navigate("Tier", { id: id });
	};

	const onClickDeleteTier = async (id: string) => {
		dispatch.setShowLoading();
		const resp = await apis.profile.deleteTier({ id: id }, { id: id });
		if (resp.ok) {
			dispatch.setProfile({
				type: ProfileActionType.updateProfile,
				data: {
					tiers: tiers.filter((el) => el.id !== id),
				},
			});
		} else {
			Toast.show({
				type: "error",
				text1: "Failed to delete tier",
			});
		}
		dispatch.setHideLoading();
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

	const fetchPlaylists = async () => {
		const resp = await apis.profile.getPlaylists();
		if (resp.ok) {
			dispatch.setProfile({
				type: ProfileActionType.updateProfile,
				data: {
					playlists: resp.data.playlists,
				},
			});
		}
	};

	const fetchPosts = async () => {
		if (profile.userId === "0") {
			return;
		}
		const filterObject: IPostFilterQuery = {
			page: posts.page,
			size: 10,
		};
		if (
			filter.post === SortType.Latest ||
			filter.post === SortType.Popular
		) {
			filterObject.sort = filter.post as SortType;
		} else {
			filterObject.categoryId = filter.post;
		}
		const resp = await apis.post.getPostFeedForProfile(
			{
				userId: profile.userId,
			},
			filterObject,
		);
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

	const handleArchivePost = async () => {
		setOpenPostActions(false);
		const resp = await apis.post.updatePostArchive({ id: selectedPostId });
		if (resp.ok) {
			setPosts({
				...posts,
				posts: posts.posts.filter((post) => post.id !== selectedPostId),
			});
		}
	};

	const handleDeletePost = async () => {
		setOpenPostActions(false);
		const resp = await apis.post.deletePostById(
			{ id: selectedPostId },
			{ id: selectedPostId },
		);
		if (resp.ok) {
			setPosts({
				...posts,
				posts: posts.posts.filter((post) => post.id !== selectedPostId),
			});
		}
	};

	const handleLikePost = async (postId: string) => {
		const post = posts.posts.find((el) => el.id === postId);
		if (post?.isLiked) {
			const resp = await apis.post.unlikePostWidthPostId(null, {
				id: postId,
			});
			if (resp.ok) {
				setPosts({
					...posts,
					posts: posts.posts.map((el) =>
						el.id === postId
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
			const resp = await apis.post.likePostWithPostId(null, {
				id: postId,
			});
			if (resp.ok) {
				setPosts({
					...posts,
					posts: posts.posts.map((el) =>
						el.id === postId
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

	const onClickSocialLink = (url: string) => {
		openLink(url.includes("https://") ? url : `https://${url}`);
	};

	const onGoToPost = () => {
		setOpenPostActions(false);
		router.push(`/p/${selectedPostId}`);
	};

	const onGoToAnalytics = () => {
		dispatch.setModal({
			type: ModalActionType.showModal,
			data: { id: PROFILE_THREE_DOTS_DIALOG_ID, show: false },
		});
		router.push({ pathname: "settings", params: { screen: "Analytics" } });
	};

	const onGoToEdit = () => {
		dispatch.setModal({
			type: ModalActionType.showModal,
			data: { id: PROFILE_THREE_DOTS_DIALOG_ID, show: false },
		});
		navigation.navigate("Edit");
	};

	// useEffect(() => {
	// 	if (newAccount) {
	// 		setShowWelcome(true);
	// 	}
	// }, [setShowWelcome, newAccount]);
	const initPosts = () => {
		setPosts({
			posts: [],
			page: 1,
			total: 0,
			size: 10,
		});
		fetchPosts();
	};
	useFocusEffect(
		useCallback(() => {
			initPosts();
		}, [profile.userId]),
	);

	const onScrollView = (nativeEvent: NativeScrollEvent) => {
		const paddingToBottom = 20;
		setShowStickyHeader(nativeEvent.contentOffset.y > 80);
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
		if (isScrollEnd && !inLoadingMore.media && tab === "media") {
			const enableLoadingMore = checkEnableMediasLoadingMore(
				filter.media,
				medias,
			);
			if (enableLoadingMore) {
				setInLoadingMore({
					...inLoadingMore,
					media: true,
				});
				setMedias({
					...medias,
					page: medias.page + 1,
				});
			}
		}
	};

	const onChangeFilter = (_filter: string | SortType) => {
		setFilter({
			...filter,
			post: _filter,
		});
		setPosts({
			...posts,
			page: 1,
			total: 0,
			size: 10,
		});
	};

	const fetchMedias = async () => {
		const filterObj: IMediaFilterQuery = {
			page: medias.page,
			size: 10,
		};
		if (filter.media !== MediaType.All) {
			filterObj.type = filter.media;
		}
		const resp = await apis.media.getPostMedias(filterObj);
		setInLoadingMore({
			...inLoadingMore,
			media: false,
		});
		if (resp.ok) {
			setMedias({
				...resp.data,
				medias:
					resp.data.page === 1
						? resp.data.medias
						: [...medias.medias, ...resp.data.medias],
			});
		}
	};

	const onFilterMedia = (val: MediaType) => {
		setFilter({
			...filter,
			media: val,
		});
		setMedias({
			...medias,
			page: 1,
		});
	};

	const updatePostAdvanced = async (advanced: IPostAdvanced) => {
		setOpenPostActions(false);
		const resp = await apis.post.updatePostById(
			{ advanced: advanced },
			{
				id: selectedPostId,
			},
		);
		if (resp.ok) {
			setPosts({
				...posts,
				posts: posts.posts.map((post) =>
					post.id === selectedPostId
						? { ...post, advanced: advanced }
						: post,
				),
			});
		}
	};

	const onClickAvatar = () => {
		if (profile.stories.length > 0) {
			router.push({
				pathname: "stories",
				params: {
					screen: "Profile",
					userId: profile.userId,
				},
			});
		}
	};

	const onClickThreeDots = () => {
		dispatch.setModal({
			type: ModalActionType.showModal,
			data: { id: PROFILE_THREE_DOTS_DIALOG_ID, show: true },
		});
	};

	const onGoToArchivePost = () => {
		dispatch.setModal({
			type: ModalActionType.showModal,
			data: { id: PROFILE_THREE_DOTS_DIALOG_ID, show: false },
		});
		navigation.navigate("ArchivedPosts");
	};

	const onClickEditPlaylist = () => {
		setOpenPlaylistMenus(false);
		navigation.navigate("Playlist", { id: playlistId });
	};

	const onClickDeletePlaylist = async () => {
		setOpenPlaylistMenus(false);
		dispatch.setShowLoading();
		const resp = await apis.profile.deletePlaylist(
			{ id: playlistId },
			{ id: playlistId },
		);
		dispatch.setHideLoading();
		if (resp.ok) {
			router.back();
		} else {
			Toast.show({
				type: "error",
				text1: resp.data.message,
			});
		}
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

	const onPinCallback = (post: IPost) => {
		setOpenPostActions(false);
		setPosts({
			...posts,
			posts: posts.posts.map((_post) =>
				_post.id === post.id
					? {
							..._post,
							isPinned: post.isPinned,
					  }
					: _post,
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
			fetchPosts();
		}
	};

	const playlistActions: ICardAction[] = [
		{
			title: "Edit Playlist",
			iconType: IconTypes.Edit,
			onClick: onClickEditPlaylist,
			iconSize: 18,
		},
		{
			title: "Delete",
			iconType: IconTypes.Cancel,
			iconColor: "#eb2121",
			onClick: onClickDeletePlaylist,
			labelClass: "text-fans-red",
		},
	];

	useEffect(() => {
		if (profile.userId) {
			fetchPlaylists();
		}
	}, [profile.userId]);

	useEffect(() => {
		if (profile.userId) {
			fetchPosts();
		}
	}, [filter.post, profile.userId, posts.page, tab]);

	useEffect(() => {
		if (profile.userId) {
			fetchMedias();
		}
	}, [profile.userId, medias.page, filter.media]);

	return (
		<AppLayout
			title={`${profile.displayName} | FYP.Fans`}
			description={profile.bio}
		>
			<FansView flex="1" position="relative">
				<StickyHeader
					visible={showStickyHeader}
					profile={profile}
					onClickBack={() => router.push("/posts")}
					onClickArchive={onGoToArchivePost}
					onClickAnalytics={onGoToAnalytics}
					onClickMenu={onClickThreeDots}
				/>
				<ScrollView
					style={tw.style("flex-1")}
					onScroll={({ nativeEvent }) => onScrollView(nativeEvent)}
					scrollEventThrottle={16}
					showsVerticalScrollIndicator
				>
					<LayoutContentsContainer>
						<TopActions
							onClickBack={() => {
								router.push("/posts");
							}}
							onClickMenu={onClickThreeDots}
						/>

						<ProfileCarousel images={profile.cover} />

						<FansView padding={{ x: 18 }}>
							<FansView
								flexDirection="row"
								alignItems="end"
								margin={{ t: -30 }}
								justifyContent="between"
							>
								<FansView position="relative">
									<RoundedBorderSvg
										size={91}
										style={tw.style(
											"absolute top-[-2px] left-[-2px]",
											profile.stories.length === 0 &&
												"hidden",
										)}
									/>
									<AvatarWithStatus
										size={79}
										avatar={profile.avatar}
										onPress={onClickAvatar}
									/>
								</FansView>

								<FansView flexDirection="row" gap={7}>
									{/* <IconButton
										icon={() => (
											<RedirectSvg
												width={17.65}
												height={12.3}
												color="#000"
											/>
										)}
										mode="contained"
										containerColor="#F0F0F0"
										style={tw.style(
											"w-[34px] h-[34px] m-0",
										)}
										onPressIn={() => setOpenShare(true)}
									/> */}
									<FansIconButton onPress={onGoToArchivePost}>
										<ArchivedPostSvg
											width={17.4}
											height={17.5}
											color="#000"
										/>
									</FansIconButton>
									<FansIconButton onPress={onGoToAnalytics}>
										<StatisticsSvg
											width={15.84}
											height={15.8}
											color="#000"
										/>
									</FansIconButton>

									<Button
										icon={() => (
											<EditSvg
												width={12.12}
												height={12.56}
												color="#fff"
											/>
										)}
										onPress={onGoToEdit}
										textColor="#fff"
										buttonColor="#a854f5"
										style={tw.style(
											"items-center h-[34px] flex-row",
										)}
										labelStyle={tw.style(
											"text-[17px] font-bold leading-[22px] my-0 mr-[15px]",
										)}
										mode="contained"
									>
										Edit profile
									</Button>
								</FansView>
							</FansView>

							<FansView margin={{ t: 16, b: 20 }}>
								<FansView
									flexDirection="row"
									alignItems="center"
								>
									<FansText
										fontSize={19}
										lineHeight={26}
										style={tw.style("mr-3 font-bold")}
										numberOfLines={1}
									>
										{profile.displayName}
									</FansText>

									<StarCheckSvg width={15.66} height={15} />
								</FansView>
								<FansText
									color="grey-70"
									fontSize={16}
									lineHeight={21}
								>
									{profile.profileLink
										? `@${
												profile.profileLink
													.split("/")
													.slice(-1)[0]
										  }`
										: ""}
								</FansText>
							</FansView>
							<CopyLink url={profile.profileLink} />

							<FansView margin={{ t: 16 }}>
								<BioText text={profile.bio} />
							</FansView>

							<FansView
								margin={{ t: 18 }}
								flexDirection="row"
								alignItems="center"
								gap={16}
							>
								{profile.location ? (
									<FansView
										flexDirection="row"
										alignItems="center"
										gap={4}
									>
										<AddressSvg size={18} color="#000" />
										<FansText
											color="black"
											fontSize={16}
											lineHeight={21}
										>
											{profile.location}
										</FansText>
									</FansView>
								) : null}
								{profile.user?.birthdate ? (
									<FansView
										flexDirection="row"
										alignItems="center"
										gap={1}
									>
										<BirthdaySvg size={18} color="#000" />
										<FansText
											color="black"
											fontSize={16}
											lineHeight={21}
										>
											{getBirthdayString(
												profile.user?.birthdate,
											)}
										</FansText>
									</FansView>
								) : null}
							</FansView>

							<FansView margin={{ t: 18, b: 26 }}>
								<CountsDetails
									photos={profile.imageCount}
									videos={profile.videoCount}
									likes={profile.likeCount}
								/>
							</FansView>
							<SocialLinkList
								data={socialLinks}
								onClickLink={onClickSocialLink}
							/>
							<FansView
								margin={{ b: 24 }}
								style={tw.style(
									profile.subscriptionType ===
										SubscriptionTypes.Tier
										? "flex"
										: "hidden",
								)}
							>
								<RoundButton
									variant={RoundButtonType.PRIMARY}
									onPress={() =>
										navigation.navigate("Tier", {
											id: null,
										})
									}
								>
									Create Tier
								</RoundButton>
							</FansView>

							<RoundButton
								icon={() => (
									<DocEditSvg
										width={15.44}
										height={15.15}
										color="#fff"
									/>
								)}
								variant={RoundButtonType.PRIMARY}
								onPress={onCreateNewPost}
							>
								New Post
							</RoundButton>

							<FansDivider
								style={tw.style("mb-4 mt-6 h-[1px]")}
							/>
							<SubscriptionPart
								profile={profile}
								onClickAddTier={onClickAddTier}
								onClickEditTier={onClickEditTier}
								onClickDeleteTier={onClickDeleteTier}
							/>
						</FansView>
						<FypNullableView visible={highlights.length > 0}>
							<ScrollView
								horizontal
								contentContainerStyle={{
									paddingHorizontal: 18,
									columnGap: 15,
								}}
								showsHorizontalScrollIndicator={false}
							>
								{highlights.map((highlight) => (
									<StoryCell
										key={highlight.id}
										title={highlight.title}
										image={highlight.cover}
										onClick={() =>
											onClickHighlight(highlight)
										}
									/>
								))}
							</ScrollView>
						</FypNullableView>

						{/* <JoinProgramCard /> */}

						<FansView margin={{ t: 24 }}>
							<FansView style={tw.style("md:px-[18px]")}>
								<Tabs
									tabs={[
										{
											data: "post",
											label: `POSTS ${posts.total}`,
										},
										{
											data: "media",
											label: `MEDIA ${
												profile.imageCount +
												profile.videoCount
											}`,
										},
										{
											data: "playlists",
											label: "PLAYLISTS",
										},
									]}
									selectedTab={tab}
									onChangeTab={(val) => setTab(val)}
								/>
							</FansView>
							{tab === "post" && (
								<PostsTabContents
									posts={posts.posts}
									filter={filter.post}
									onChangeFilter={onChangeFilter}
									categories={profile.categories.filter(
										(category) => category.isActive,
									)}
									onClickPostAction={(id) => {
										setSelectedPostId(id);
										setOpenPostActions(true);
									}}
									onClickBookmark={(id) => {
										onClickBookmark(id);
									}}
									onClickPostMessage={(id) => {
										setSelectedPostId(id);
										setOpenMessageDialog(true);
									}}
									onClickPostLike={handleLikePost}
									onClickComment={(id) => {
										setSelectedPostId(id);
										setOpenCommentModal(true);
									}}
								/>
							)}
							{tab === "media" && (
								<MediaTabContents
									allCounts={
										profile.imageCount + profile.videoCount
									}
									medias={medias}
									mediaType={filter.media}
									onChangeFilter={onFilterMedia}
								/>
							)}
							{tab === "playlists" && (
								<PlaylistsTabContents
									playlists={playlists}
									onClickMenus={(id) => {
										setPlaylistId(id);
										setOpenPlaylistMenus(true);
									}}
									handleAdd={() =>
										navigation.navigate("Playlist", {
											id: null,
										})
									}
									handleEdit={(id) =>
										navigation.navigate("Playlist", {
											id: id,
										})
									}
								/>
							)}
						</FansView>
					</LayoutContentsContainer>
				</ScrollView>
			</FansView>

			<WelcomeModal
				visible={showWelcome}
				handleClose={() => setShowWelcome(false)}
			/>

			<ProfilePostActions
				post={posts.posts.find((post) => post.id === selectedPostId)}
				open={openPostActions}
				onClose={() => setOpenPostActions(false)}
				onClickGoToPost={onGoToPost}
				onClickArchivePost={handleArchivePost}
				onClickTrash={handleDeletePost}
				updatePostAdvanced={updatePostAdvanced}
				pinCallback={onPinCallback}
			/>

			<ShareDialog open={openShare} onClose={() => setOpenShare(false)} />

			<SendMessageDialog
				open={openMessageDialog}
				onClose={() => setOpenMessageDialog(false)}
				onSubmit={() => {}}
			/>
			<ProfileThreeDotsDialog navigation={navigation} />
			<CardActions
				open={openPlaylistMenus}
				onClose={() => setOpenPlaylistMenus(false)}
				actions={playlistActions}
			/>
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

export default CreatorProfileScreen;
