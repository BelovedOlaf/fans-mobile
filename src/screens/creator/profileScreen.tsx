import { FypNullableView } from "@components/common/base";
import { FansText, FansView, FansIconButton } from "@components/controls";
import * as CommonSvg from "@assets/svgs/common";
import AvatarWithStatus from "@components/common/AvatarWithStatus";
import CardActions from "@components/common/cardActions";
import CopyLink from "@components/common/copyLink";
import SubscribeDialog from "@components/common/dialog/subscribeDialog";
import AppLayout, {
	LayoutRightContents,
	BottomNav,
} from "@components/common/layout";
import Tabs from "@components/common/tabs";
import { StoryCell } from "@components/posts/common";
import {
	CreatorPostActions,
	SendMessageDialog,
	PostCommentDialog,
} from "@components/posts/dialogs";
import {
	BioText,
	CountsDetails,
	MediaTabContents,
	PlaylistsTabContents,
	PostsTabContents,
	ProfileCarousel,
	SocialLinkList,
	SubscriptionPart,
	TierJoinDialog,
	TopActions,
	StickyHeader,
	AddPaymentCardDialog,
	ProfileThreeDotsDialog,
} from "@components/profiles";
import { AuthModal } from "@components/auth";

import tw from "@lib/tailwind";
import {
	POST_REPORT_DIALOG_ID,
	PROFILE_REPORT_DIALOG_ID,
	SUBSCRIBE_LOGIN_DIALOG_ID,
	PROFILE_THREE_DOTS_DIALOG_ID,
} from "@constants/modal";
import {
	CommonActionType,
	ModalActionType,
	StoryActionType,
	useAppContext,
} from "@context/useAppContext";
import { IPostFilterQuery, IMediaFilterQuery } from "@usertypes/params";
import * as apis from "@helper/endpoints";
import { PostListRespBody } from "@helper/endpoints/post/schemas";
import { MediasRespBody } from "@helper/endpoints/media/schemas";
import { checkEnableMediasLoadingMore } from "@utils/common";
import {
	IconTypes,
	MediaType,
	SubscribeActionType,
	SortType,
} from "@usertypes/commonEnums";
import { authAtom } from "@state/auth";
import { CreatorProfileNavigationStacks } from "@usertypes/navigations";
import {
	ICardAction,
	IHighlight,
	IPlayList,
	IPost,
	IProfile,
} from "@usertypes/types";
import { defaultProfileStateData } from "@constants/common";

import * as Clipboard from "expo-clipboard";
import { useRouter } from "expo-router";
import { openBrowserAsync } from "expo-web-browser";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { Fragment, useCallback, useEffect, useState } from "react";
import { NativeScrollEvent, ScrollView } from "react-native";
import { Button } from "react-native-paper";
import Toast from "react-native-toast-message";
import { useRecoilValue } from "recoil";
import { getOrCreateConversation } from "@helper/endpoints/chat/apis";
import { updateInbox } from "@state/chat";

const defaultPosts = {
	posts: [],
	page: 1,
	size: 10,
	total: 0,
};
const defaultMedias = {
	medias: [],
	page: 1,
	size: 10,
	total: 0,
	videoTotal: 0,
	imageTotal: 0,
};

const ProfileScreen = (
	props: NativeStackScreenProps<CreatorProfileNavigationStacks, "Creator">,
) => {
	const { navigation } = props;
	const router = useRouter();

	const { state, dispatch } = useAppContext();
	const { creatorUsername: username } = state.common;
	const auth = useRecoilValue(authAtom);

	const [profile, setProfile] = useState<IProfile>(defaultProfileStateData);
	const [posts, setPosts] = useState<PostListRespBody>(defaultPosts);
	const [playlists, setPlaylists] = useState<IPlayList[]>([]);
	const [hasAccess, setHasAccess] = useState(false);

	const [tab, setTab] = useState("post");
	const [highlights, setHighlights] = useState<IHighlight[]>([]);

	const [selectedPostId, setSelectedPostId] = useState("");
	const [openPostActions, setOpenPostActions] = useState(false);
	const [openMessageDialog, setOpenMessageDialog] = useState(false);
	const [openJoinTier, setOpenJoinTier] = useState(false);
	const [tierId, setTierId] = useState("");
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
	const [medias, setMedias] = useState<MediasRespBody>(defaultMedias);

	const [openProfileActions, setOpenProfileActions] = useState(false);
	const [showStickyHeader, setShowStickyHeader] = useState(false);
	const [openCommentModal, setOpenCommentModal] = useState(false);

	const handleOpenGemModal = () => {
		dispatch.setCommon({
			type: CommonActionType.toggleSendTipModal,
			data: {
				visible: true,
				creator: profile,
			},
		});
	};

	const onClickHighlight = (highlight: IHighlight) => {
		router.push({
			pathname: "stories",
			params: {
				screen: "Highlight",
				highlightId: highlight.id,
				userId: profile?.userId,
			},
		});
	};

	const fetchPosts = async () => {
		if (!profile) return;

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
		setInLoadingMore({ ...inLoadingMore, post: false });
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

	const fetchProfileData = async () => {
		const resp = await apis.profile.getCreatorProfileByLink({
			profileLink: username as string,
		});
		if (resp.ok) {
			setProfile(resp.data);
			setPlaylists(resp.data.playlists);
			setHighlights(resp.data.highlights);
			setHasAccess(resp.data.hasAccess);
			fetchPosts();
			fetchMedias();
		} else {
			Toast.show({
				type: "error",
				text1: resp.data.message,
			});
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
						el.id === id ? resp.data.updatedPost : el,
					),
				});
			}
		} else {
			const resp = await apis.post.setBookmark(null, { id });
			if (resp.ok) {
				setPosts({
					...posts,
					posts: posts.posts.map((el) =>
						el.id === id ? resp.data.updatedPost : el,
					),
				});
			}
		}
	};

	const onClickPreview = () => {
		dispatch.setStory({
			type: StoryActionType.updateStoryState,
			data: {
				profilePreview: profile,
			},
		});
		navigation.navigate("Preview", { username: username as string });
	};

	const handleOpenSubscribe = (
		_subscribeType: SubscribeActionType,
		_subscribeTierId: string,
		_bundleId: string,
		_price?: number,
	) => {
		dispatch.setCommon({
			type: CommonActionType.toggleSubscribeModal,
			data: {
				visible: !!auth,
				creator: profile,
				subscribeActionType: _subscribeType,
				bundleId: _bundleId,
				subscribeTierId: _subscribeTierId,
				defaultTab:
					_subscribeType === SubscribeActionType.Post
						? "form"
						: "start",
			},
		});
		if (!auth) {
			dispatch.setModal({
				type: ModalActionType.showModal,
				data: {
					id: SUBSCRIBE_LOGIN_DIALOG_ID,
					show: true,
					payload: {
						tab: "signup",
						avatar: profile.avatar,
					},
				},
			});
		}
	};

	const checkAccessSubscribedUser = async () => {
		if (profile?.id) {
			return fetchProfileData();
		}
	};

	const onClickSocialLink = (url: string) => {
		openBrowserAsync(url.includes("https://") ? url : `https://${url}`);
	};

	const handleOpenMessage = async () => {
		try {
			dispatch.setShowLoading();
			const resp = await getOrCreateConversation(
				{},
				{
					userId: profile.userId,
				},
			);

			if (resp.ok) {
				updateInbox(resp.data);
				router.push(`/chat/${resp.data.id}`);
			} else {
				Toast.show({
					type: "error",
					text1: resp.data.message,
				});
			}
		} finally {
			dispatch.setHideLoading();
		}
	};

	const handleCopyProfileUrl = async () => {
		await Clipboard.setStringAsync(profile?.profileLink ?? "");
		setOpenProfileActions(false);
	};

	const handleReportProfile = () => {
		setOpenProfileActions(false);
		dispatch.setModal({
			type: ModalActionType.showModal,
			data: {
				id: PROFILE_REPORT_DIALOG_ID,
				show: true,
				payload: {
					profileId: profile?.id,
					username: username,
				},
			},
		});
	};

	const handleGoToPost = () => {
		setOpenPostActions(false);
		router.push(`/p/${selectedPostId}`);
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

	const onClickAddToList = () => {};

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

	const onScrollView = (nativeEvent: NativeScrollEvent) => {
		const paddingToBottom = 20;
		setShowStickyHeader(nativeEvent.contentOffset.y > 80);
		if (!hasAccess) {
			return;
		}
		const isScrollEnd =
			nativeEvent.layoutMeasurement.height +
				nativeEvent.contentOffset.y >=
			nativeEvent.contentSize.height - paddingToBottom;
		if (isScrollEnd && !inLoadingMore.post && tab === "post" && hasAccess) {
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

	const profileActions: ICardAction[] = [
		{
			title: "Add to list",
			iconType: IconTypes.AddRemoveFromLists,
			onClick: onClickAddToList,
		},
		{
			title: "Copy URL",
			iconType: IconTypes.CopyLink,
			onClick: handleCopyProfileUrl,
		},
		{
			title: "Report",
			iconType: IconTypes.Report,
			iconColor: "#eb2121",
			onClick: handleReportProfile,
			labelClass: "text-fans-red",
		},
	];

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
		const resp = await apis.media.getPostMediasByUserId(
			{ id: profile?.userId ?? "" },
			filterObj,
		);
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

	const onClickPostUnlock = (post: IPost) => {
		dispatch.setCommon({
			type: CommonActionType.toggleSubscribeModal,
			data: {
				visible: true,
				creator: profile,
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

	const onPressMenus = () => {
		if (
			state.profile.userId !== "0" &&
			state.profile.userId === profile.userId
		) {
			dispatch.setModal({
				type: ModalActionType.showModal,
				data: { id: PROFILE_THREE_DOTS_DIALOG_ID, show: true },
			});
		} else {
			setOpenProfileActions(true);
		}
	};

	useEffect(() => {
		setProfile(defaultProfileStateData);
		setPlaylists([]);
		setHighlights([]);
		setPosts(defaultPosts);
		setMedias(defaultMedias);
		if (username) {
			fetchProfileData();
		}
	}, [username]);

	useEffect(() => {
		if ((profile?.userId ?? "0") !== "0" && auth) {
			fetchPosts();
		}
	}, [profile?.userId, filter.post, posts.page, auth]);

	useEffect(() => {
		if ((profile?.userId ?? "0") !== "0" && auth) {
			fetchMedias();
		}
	}, [profile?.userId, medias.page, filter.media, auth]);

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
					onClickMenu={onPressMenus}
					onClickTip={handleOpenGemModal}
					onClickMail={handleOpenMessage}
				/>
				<ScrollView
					style={tw.style("flex-1")}
					onScroll={({ nativeEvent }) => onScrollView(nativeEvent)}
					scrollEventThrottle={30}
				>
					<FansView flexDirection="row" flex="1">
						<FansView
							flex="1"
							alignItems="center"
							style={tw.style("md:border-r border-fans-grey")}
						>
							<FansView
								flex="1"
								position="relative"
								style={tw.style(
									"w-full md:max-w-[710px] bg-white",
								)}
							>
								{profile ? (
									<Fragment>
										<FansView
											position="relative"
											padding={{ b: 40 }}
										>
											<TopActions
												onClickMenu={onPressMenus}
											/>

											<ProfileCarousel
												images={profile.cover}
											/>
											<FansView padding={{ x: 18 }}>
												<FansView
													flexDirection="row"
													alignItems="end"
													margin={{ t: -30 }}
													justifyContent="between"
												>
													<AvatarWithStatus
														size={79}
														avatar={profile?.avatar}
													/>

													<FansView
														flexDirection="row"
														gap={7}
													>
														{/* <Button
															onPress={() =>
																setHasAccess(
																	(s) => !s,
																)
															}
														>
															Toggle hasAccess
														</Button> */}
														{hasAccess && (
															<FansIconButton
																onPress={
																	handleOpenMessage
																}
															>
																<CommonSvg.MailSvg
																	width={
																		18.23
																	}
																	height={
																		14.6
																	}
																	color="#000"
																/>
															</FansIconButton>
														)}
														{hasAccess && (
															<FansIconButton
																onPress={
																	handleOpenGemModal
																}
															>
																<CommonSvg.TipSvg
																	width={9.4}
																	height={
																		19.33
																	}
																	color="#000"
																/>
															</FansIconButton>
														)}

														<Button
															onPress={
																onClickPreview
															}
															style={tw.style(
																"items-center h-[34px] flex-row border-fans-purple",
																profile.previews
																	.length ===
																	0 &&
																	"hidden",
																hasAccess &&
																	"hidden",
															)}
															labelStyle={tw.style(
																"text-[17px] font-bold leading-[22px] my-0 text-fans-purple",
															)}
															mode="outlined"
														>
															Preview
														</Button>
													</FansView>
												</FansView>

												<FansView
													margin={{ t: 16, b: 20 }}
												>
													<FansView
														flexDirection="row"
														alignItems="center"
													>
														<FansText
															fontSize={19}
															lineHeight={26}
															style={tw.style(
																"mr-3 font-bold",
															)}
															numberOfLines={1}
														>
															{
																profile.displayName
															}
														</FansText>

														<CommonSvg.StarCheckSvg
															width={15.66}
															height={15}
														/>
													</FansView>
													<FansView
														flexDirection="row"
														alignItems="center"
													>
														<FansText
															color="grey-70"
															fontSize={16}
															lineHeight={21}
														>
															{`@${
																profile.profileLink
																	.split("/")
																	.slice(
																		-1,
																	) ?? ""
															}`}
														</FansText>
													</FansView>
												</FansView>

												<CopyLink
													url={`fyp.fans/${
														profile.profileLink
															.split("/")
															.slice(-1) ?? ""
													}`}
												/>

												<FansView margin={{ t: 16 }}>
													<BioText
														text={profile.bio}
													/>
												</FansView>

												<FansView
													margin={{ t: 18, b: 26 }}
												>
													<CountsDetails
														photos={
															profile.imageCount
														}
														videos={
															profile.videoCount
														}
														likes={
															profile.likeCount
														}
													/>
												</FansView>
												<SocialLinkList
													data={profile.socialLinks}
													onClickLink={
														onClickSocialLink
													}
												/>
												<FansView
													style={tw.style(
														hasAccess && "hidden",
													)}
												>
													<SubscriptionPart
														profile={profile}
														isPreview
														onClickSubscribe={
															handleOpenSubscribe
														}
													/>
												</FansView>
											</FansView>
											<FypNullableView
												visible={highlights.length > 0}
											>
												<ScrollView
													horizontal
													contentContainerStyle={{
														paddingHorizontal: 18,
														columnGap: 15,
														// marginBottom: 18,
													}}
													showsHorizontalScrollIndicator={
														false
													}
												>
													{highlights.map(
														(highlight) => (
															<StoryCell
																key={
																	highlight.id
																}
																title={
																	highlight.title
																}
																image={
																	highlight.cover
																}
																onClick={() =>
																	onClickHighlight(
																		highlight,
																	)
																}
																// isSelected={cell.isSelected}
															/>
														),
													)}
												</ScrollView>
											</FypNullableView>

											<FansView>
												<Tabs
													tabs={[
														{
															data: "post",
															label: `POSTS ${posts.total}`,
														},
														{
															data: "media",
															label: `MEDIA ${
																medias.imageTotal +
																medias.videoTotal
															}`,
														},
														{
															data: "playlists",
															label: "PLAYLISTS",
														},
													]}
													selectedTab={tab}
													onChangeTab={(val) =>
														setTab(val)
													}
												/>
												{tab === "post" && (
													<PostsTabContents
														posts={posts.posts}
														totalPostsCount={
															posts.total
														}
														categories={
															profile.categories
														}
														filter={filter.post}
														onChangeFilter={
															onChangeFilter
														}
														needToSubscribe={
															!hasAccess
														}
														subscription={
															profile
																.subscriptions[0]
														}
														onClickSubscribe={() =>
															handleOpenSubscribe(
																SubscribeActionType.Subscribe,
																profile
																	.subscriptions[0]
																	.id,
																"",
															)
														}
														onClickPostAction={(
															id,
														) => {
															setSelectedPostId(
																id,
															);
															setOpenPostActions(
																true,
															);
														}}
														onClickBookmark={(
															id,
														) => {
															onClickBookmark(id);
														}}
														onClickPostMessage={(
															id,
														) => {
															setSelectedPostId(
																id,
															);
															// setOpenMessageDialog(
															// 	true,
															// );
														}}
														onClickPostLike={
															handleLikePost
														}
														onClickUnlock={
															onClickPostUnlock
														}
														onClickComment={(
															id,
														) => {
															setSelectedPostId(
																id,
															);
															setOpenCommentModal(
																true,
															);
														}}
													/>
												)}
												{tab === "media" && (
													<MediaTabContents
														allCounts={medias.total}
														medias={medias}
														mediaType={filter.media}
														onChangeFilter={
															onFilterMedia
														}
														needToSubscribe={
															!hasAccess
														}
														onClickSubscribe={() =>
															handleOpenSubscribe(
																SubscribeActionType.Subscribe,
																profile
																	.subscriptions[0]
																	.id,
																"",
															)
														}
														subscription={
															profile
																.subscriptions[0]
														}
													/>
												)}
												{tab === "playlists" && (
													<PlaylistsTabContents
														playlists={playlists}
														needToSubscribe={
															!hasAccess
														}
														isSuggested={true}
														onClickMenus={() => {}}
														handleAdd={() => {}}
														handleEdit={() => {}}
														onClickSubscribe={() =>
															handleOpenSubscribe(
																SubscribeActionType.Subscribe,
																profile
																	.subscriptions[0]
																	.id,
																"",
															)
														}
													/>
												)}
											</FansView>
										</FansView>

										<SendMessageDialog
											open={openMessageDialog}
											onClose={() =>
												setOpenMessageDialog(false)
											}
											onSubmit={() => {}}
										/>

										<CreatorPostActions
											open={openPostActions}
											onClose={() =>
												setOpenPostActions(false)
											}
											onShare={() => {}}
											onReportPost={handleReportPost}
											onOpenPost={handleGoToPost}
										/>

										<TierJoinDialog
											open={openJoinTier}
											onClose={() =>
												setOpenJoinTier(false)
											}
											data={profile.tiers.find(
												(tier) => tier.id === tierId,
											)}
											onClickJoin={() =>
												setOpenJoinTier(false)
											}
										/>
										<SubscribeDialog
											checkAccessSubscribedUser={
												checkAccessSubscribedUser
											}
											paidPostCallback={
												onPaidPostCallback
											}
										/>
										<AddPaymentCardDialog />
										<CardActions
											open={openProfileActions}
											onClose={() =>
												setOpenProfileActions(false)
											}
											actions={profileActions}
										/>
										<AuthModal />
										<ProfileThreeDotsDialog />
									</Fragment>
								) : (
									<FansView></FansView>
								)}
							</FansView>
						</FansView>
						<LayoutRightContents />
					</FansView>
				</ScrollView>
				<BottomNav />
			</FansView>
			<PostCommentDialog
				visible={openCommentModal}
				postId={selectedPostId}
				onDismiss={() => setOpenCommentModal(false)}
				onCallback={onCommentCallback}
			/>
		</AppLayout>
	);
};

export default ProfileScreen;
