import { View, ScrollView } from "react-native";
import React, { useState, useEffect } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import * as Clipboard from "expo-clipboard";

import tw from "@lib/tailwind";
import AppLayout, { LayoutContentsContainer } from "@components/common/layout";
import CustomTopNavBar from "@components/common/customTopNavBar";
import PostCard from "@components/posts/postCard";
import CardActions from "@components/common/cardActions";
import {
	SendMessageDialog,
	PostCommentDialog,
} from "@components/posts/dialogs";
import { useAppContext, ModalActionType } from "@context/useAppContext";
import { getPostById } from "@helper/endpoints/post/apis";
import { IPost, ICardAction } from "@usertypes/types";
import * as apis from "@helper/endpoints";
import { PostDetailNavigationStacks } from "@usertypes/navigations";
import { POST_REPORT_DIALOG_ID } from "@constants/modal";
import { IconTypes } from "@usertypes/commonEnums";
import { API_URL } from "@env";

const PostDetailScreen = (
	props: NativeStackScreenProps<PostDetailNavigationStacks, "Detail">,
) => {
	const { navigation, route } = props;
	const { id } = route.params;
	const insets = useSafeAreaInsets();
	const { dispatch } = useAppContext();

	const [post, setPost] = useState<IPost | null>(null);
	const [openMessageDialog, setOpenMessageDialog] = useState(false);
	const [openActionMenu, setOpenActionMenu] = useState(false);
	const [openCommentModal, setOpenCommentModal] = useState(false);

	const onClickBookmark = async (postId: string) => {
		if (post) {
			setPost({
				...post,
				bookmarkCount: post.isBookmarked
					? post.bookmarkCount - 1
					: post.bookmarkCount + 1,
				isBookmarked: !post.isBookmarked,
			});
		}

		if (post?.isBookmarked) {
			const resp = await apis.post.deleteBookmark(null, { id: postId });
			if (resp.ok) {
				setPost({
					...post,
					bookmarkCount: resp.data.updatedPost.bookmarkCount,
					isBookmarked: resp.data.updatedPost.isBookmarked,
				});
			}
		} else {
			const resp = await apis.post.setBookmark(null, { id: postId });
			if (resp.ok) {
				setPost({
					...post!,
					bookmarkCount: resp.data.updatedPost.bookmarkCount,
					isBookmarked: resp.data.updatedPost.isBookmarked,
				});
			}
		}
	};

	const onChangeLike = async (id: string) => {
		if (post) {
			setPost({
				...post,
				likeCount: post.isLiked
					? post.likeCount - 1
					: post.likeCount + 1,
				isLiked: !post.isLiked,
			});
			if (post?.isLiked) {
				const resp = await apis.post.unlikePostWidthPostId(null, {
					id: id,
				});
				if (resp.ok) {
					setPost({
						...post,
						likeCount: resp.data.likeCount,
						isLiked: resp.data.isLiked,
					});
				}
			} else {
				const resp = await apis.post.likePostWithPostId(null, {
					id: id,
				});
				if (resp.ok) {
					setPost({
						...post,
						likeCount: resp.data.likeCount,
						isLiked: resp.data.isLiked,
					});
				}
			}
		}
	};

	const onClickPostActionMenu = (id: string) => {
		setOpenActionMenu(true);
	};

	const onClickMessage = (id: string) => {
		setOpenMessageDialog(true);
	};

	const handleSendMessage = (message: string) => {
		setOpenMessageDialog(false);
	};

	const handleReportPost = () => {
		setOpenActionMenu(false);
		dispatch.setModal({
			type: ModalActionType.showModal,
			data: {
				id: POST_REPORT_DIALOG_ID,
				show: true,
				payload: {
					postId: post?.id,
				},
			},
		});
	};

	const getPostDetail = async () => {
		const resp = await getPostById({ id: id as string });
		if (resp.ok) {
			setPost({ ...resp.data });
		} else {
			Toast.show({
				type: "error",
				text1: "Failed to fetch data.",
			});
		}
		dispatch.setHideLoading();
	};

	const handleHidePostFeed = async () => {
		setOpenActionMenu(false);
		const resp = await apis.post.hidePostFromFeed(null, {
			id: id,
		});
		if (resp.ok) {
			Toast.show({
				type: "success",
				text1: "Hided post",
			});
		}
	};

	const handleCopyPostLink = async () => {
		setOpenActionMenu(false);
		const url = `${API_URL.split("/api")[0]}/p/${id}`;
		await Clipboard.setStringAsync(url);
	};

	const handleAddRemoveFromList = () => {
		setOpenActionMenu(false);
	};

	const handleUnsubscribe = () => {
		setOpenActionMenu(false);
	};

	const onCommentCallback = (postId: string, commentCounts: number) => {
		if (post) {
			setPost({
				...post,
				commentCount: commentCounts,
			});
		}
	};

	const postActions: ICardAction[] = [
		// {
		// 	title: "Unsubscribe",
		// 	iconType: IconTypes.Unsubscribe,
		// 	onClick: handleUnsubscribe,
		// },
		// {
		// 	title: "Add/remove from lists",
		// 	iconType: IconTypes.AddRemoveFromLists,
		// 	onClick: handleAddRemoveFromList,
		// },
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

	useEffect(() => {
		getPostDetail();
	}, []);

	return (
		<AppLayout>
			<View style={tw.style("flex-1")}>
				<ScrollView style={tw.style("flex-1")}>
					<LayoutContentsContainer>
						<View
							style={{
								paddingTop: insets.top,
								flex: 1,
								backgroundColor: "#fff",
							}}
						>
							<CustomTopNavBar
								title="Post"
								onClickLeft={() => navigation.goBack()}
								onClickRight={() => {}}
								rightLabel=""
							/>
							<View style={tw.style("md:py-10")}>
								{post ? (
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
										onClickComment={() => {
											setOpenCommentModal(true);
										}}
									/>
								) : null}
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

			<CardActions
				open={openActionMenu}
				onClose={() => setOpenActionMenu(false)}
				actions={postActions}
			/>
			<PostCommentDialog
				visible={openCommentModal}
				postId={id}
				onDismiss={() => setOpenCommentModal(false)}
				onCallback={onCommentCallback}
			/>
		</AppLayout>
	);
};

export default PostDetailScreen;
