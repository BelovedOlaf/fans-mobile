import { FansDivider, FansText } from "@components/controls";
import { OutlinedPlaySvg, ShuffleSvg } from "@assets/svgs/common";
import CustomTopNavBar from "@components/common/customTopNavBar";
import CardActions from "@components/common/cardActions";
import AppLayout, { LayoutRightContents } from "@components/common/layout";
import SearchTextInput from "@components/common/searchTextInput";
import {
	CreatorPostActions,
	PostCommentDialog,
} from "@components/posts/dialogs";
import PostCard from "@components/posts/postCard";

import tw from "@lib/tailwind";
import { useAppContext, ModalActionType } from "@context/useAppContext";
import { POST_REPORT_DIALOG_ID } from "@constants/modal";
import { PlaylistNavigationStacks } from "@usertypes/navigations";
import { IPlayList, IPost, ICardAction } from "@usertypes/types";
import { IconTypes } from "@usertypes/commonEnums";
import { cdnURL } from "@helper/Utils";
import * as apis from "@helper/endpoints";

import React, { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import { Image, ScrollView, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

const PlaylistDetailScreen = (
	props: NativeStackScreenProps<PlaylistNavigationStacks, "Detail">,
) => {
	const { navigation, route } = props;
	const { id } = route.params;

	const insets = useSafeAreaInsets();
	const router = useRouter();

	const { state, dispatch } = useAppContext();

	const [playlist, setPlaylist] = useState<IPlayList>();
	const [posts, setPosts] = useState<IPost[]>([]);
	const [searchKey, setSearchKey] = useState("");
	const [openPostActions, setOpenPostActions] = useState(false);
	const [selectedPostId, setSelectedPostId] = useState("");
	const [openThreeDots, setOpenThreeDots] = useState(false);
	const [openCommentModal, setOpenCommentModal] = useState(false);

	const onChangeSearch = (val: string) => {
		setSearchKey(val);
		setPosts(posts.filter((post) => post.caption.includes(val)));
	};

	const onClickBookmark = async (postId: string) => {
		const post = posts.find((el) => el.id === postId);
		if (post?.isBookmarked) {
			const resp = await apis.post.deleteBookmark(null, { id: postId });
			if (resp.ok) {
				setPosts(
					posts.map((el) =>
						el.id === postId ? resp.data.updatedPost : el,
					),
				);
			}
		} else {
			const resp = await apis.post.setBookmark(null, { id: postId });
			if (resp.ok) {
				setPosts(
					posts.map((el) =>
						el.id === postId ? resp.data.updatedPost : el,
					),
				);
			}
		}
	};

	const handleLikePost = async (postId: string) => {
		const post = posts.find((el) => el.id === postId);
		if (post?.isLiked) {
			const resp = await apis.post.unlikePostWidthPostId(null, {
				id: postId,
			});
			if (resp.ok) {
				setPosts(
					posts.map((el) =>
						el.id === postId
							? {
									...el,
									likeCount: resp.data.likeCount,
									isLiked: resp.data.isLiked,
							  }
							: el,
					),
				);
			}
		} else {
			const resp = await apis.post.likePostWithPostId(null, {
				id: postId,
			});
			if (resp.ok) {
				setPosts(
					posts.map((el) =>
						el.id === postId
							? {
									...el,
									likeCount: resp.data.likeCount,
									isLiked: resp.data.isLiked,
							  }
							: el,
					),
				);
			}
		}
	};
	const onClickPostMessage = (postId: string) => {};

	const onClickPostAction = (postId: string) => {
		setSelectedPostId(id);
		setOpenPostActions(true);
	};

	const fetchPlaylistDetail = async () => {
		dispatch.setShowLoading();
		const resp = await apis.profile.getPlaylistById({ id: id as string });
		if (resp.ok) {
			setPlaylist(resp.data);
			setPosts(resp.data.posts);
		} else {
			Toast.show({
				type: "error",
				text1: resp.data.message,
			});
			navigation.goBack();
		}
		dispatch.setHideLoading();
	};

	const handleGoToPost = () => {
		setOpenPostActions(false);
		router.push(`/p/${selectedPostId}`);
	};

	const handleReportPost = () => {
		setOpenPostActions(false);
		dispatch.setModal({
			type: ModalActionType.showModal,
			data: { id: POST_REPORT_DIALOG_ID, show: true },
		});
	};

	const onClickEditPlaylist = () => {
		setOpenThreeDots(false);
		router.push({
			pathname: "profile",
			params: { screen: "Playlist", playlistId: id },
		});
	};

	const onClickDeletePlaylist = async () => {
		setOpenThreeDots(false);
		dispatch.setShowLoading();
		const resp = await apis.profile.deletePlaylist({ id: id }, { id: id });
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
		setPosts(
			posts.map((post) =>
				post.id === postId
					? {
							...post,
							commentCount: commentCounts,
					  }
					: post,
			),
		);
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
		if (id) {
			fetchPlaylistDetail();
		}
	}, [id]);

	return (
		<AppLayout>
			<View style={tw.style("flex-1")}>
				<ScrollView style={tw.style("flex-1")}>
					<View style={tw.style("flex-row flex-1")}>
						<View
							style={tw.style(
								"flex-1 md:border-r border-fans-grey items-center",
							)}
						>
							<View
								style={tw.style(
									"w-full md:max-w-[710px] flex-1 bg-white relative",
								)}
							>
								{playlist ? (
									<View
										style={{
											paddingTop: insets.top,
											flex: 1,
											backgroundColor: "#fff",
										}}
									>
										<CustomTopNavBar
											title="Playlist"
											onClickLeft={() =>
												navigation.goBack()
											}
											onClickRight={() =>
												setOpenThreeDots(true)
											}
											rightIcon="menu"
										/>
										<ScrollView
											contentContainerStyle={{
												paddingBottom:
													insets.bottom + 35,
											}}
										>
											<Image
												source={{
													uri: cdnURL(playlist.thumb),
												}}
												style={tw.style(
													"w-full h-50 rounded-b-[15px]",
												)}
												resizeMode="cover"
											/>
											<View
												style={tw.style(
													"px-[18px] mb-6 mt-4 md:px-0",
												)}
											>
												<FansText
													fontSize={19}
													lineHeight={26}
													style={tw.style(
														"text-center font-bold",
													)}
												>
													{playlist.title}
												</FansText>
												<FansText
													color="grey-70"
													fontSize={17}
													style={tw.style(
														"text-center mb-5",
													)}
												>
													{`${playlist.posts.length} posts`}
												</FansText>
												<FansDivider />
												{/* <View
													style={tw.style(
														"flex-row gap-x-2",
													)}
												>
													<View
														style={tw.style(
															"flex-1",
														)}
													>
														<RoundButton
															icon={() => (
																<OutlinedPlaySvg
																	width={
																		14.35
																	}
																	height={
																		15.5
																	}
																	color="#fff"
																/>
															)}
														>
															View all
														</RoundButton>
													</View>
													<View
														style={tw.style(
															"flex-1",
														)}
													>
														<RoundButton
															variant={
																RoundButtonType.OUTLINE_PRIMARY
															}
															icon={() => (
																<ShuffleSvg
																	width={
																		15.05
																	}
																	height={
																		14.15
																	}
																	color="#a854f5"
																/>
															)}
														>
															Shuffle
														</RoundButton>
													</View>
												</View> */}
												<SearchTextInput
													value={searchKey}
													onChangeText={
														onChangeSearch
													}
													style={tw.style("mt-5")}
												/>
											</View>

											<View style={tw.style("gap-y-4")}>
												{posts.map((post) => (
													<PostCard
														key={post.id}
														data={post}
														onClickBookmark={() => {
															onClickBookmark(
																post.id,
															);
														}}
														onClickLike={() =>
															handleLikePost(
																post.id,
															)
														}
														onClickActionMenu={() =>
															onClickPostAction(
																post.id,
															)
														}
														onClickMessage={() =>
															onClickPostMessage(
																post.id,
															)
														}
														onClickComment={() => {
															setSelectedPostId(
																post.id,
															);
															setOpenCommentModal(
																true,
															);
														}}
													/>
												))}
											</View>
										</ScrollView>

										<CreatorPostActions
											open={openPostActions}
											onClose={() =>
												setOpenPostActions(false)
											}
											onShare={() => {}}
											onReportPost={handleReportPost}
											onOpenPost={handleGoToPost}
										/>
									</View>
								) : null}
							</View>
						</View>
						<LayoutRightContents />
					</View>
				</ScrollView>
			</View>
			<CardActions
				open={openThreeDots}
				onClose={() => setOpenThreeDots(false)}
				actions={playlistActions}
			/>
			<PostCommentDialog
				visible={openCommentModal}
				postId={selectedPostId}
				onDismiss={() => setOpenCommentModal(false)}
				onCallback={onCommentCallback}
			/>
		</AppLayout>
	);
};

export default PlaylistDetailScreen;
