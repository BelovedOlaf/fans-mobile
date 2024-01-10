import { CloseSvg, SendSvg } from "@assets/svgs/common";
import AvatarWithStatus from "@components/common/AvatarWithStatus";
import RoundTextInput from "@components/common/RoundTextInput";
import { FypNullableView, FypText } from "@components/common/base";
import BottomSheetWrapper from "@components/common/bottomSheetWrapper";
import CommentParent from "./commentParent";

import { useAppContext } from "@context/useAppContext";
import {
	addPostComment,
	deleteCommentById,
	getPostCommentsByPostId,
	likeCommentById,
	unLikeCommentById,
} from "@helper/endpoints/post/apis";
import tw from "@lib/tailwind";
import { IComment } from "@usertypes/types";
import { usePathname } from "expo-router";
import React, { FC, useEffect, useState, useCallback } from "react";
import { Pressable, ScrollView, View, useWindowDimensions } from "react-native";
import Collapsible from "react-native-collapsible";
import Toast from "react-native-toast-message";

interface Props {
	onCallback?: (postId: string, commentCounts: number) => void;
	visible: boolean;
	onDismiss: () => void;
	postId: string;
}

const PostCommentDialog: FC<Props> = (props) => {
	const { onCallback, visible, onDismiss, postId } = props;
	const { state } = useAppContext();
	const { userId } = state.profile;
	const { userInfo } = state.user;
	const { height } = useWindowDimensions();
	const pathname = usePathname();

	const [totalCounts, setTotalCounts] = useState(0);
	const [comments, setComments] = useState<IComment[]>([]);
	const [commentText, setCommentText] = useState("");
	const [selectedCommentId, setSelectedCommentId] = useState<
		string | undefined
	>(undefined);

	const onClickReply = (commentId: string) => {
		setSelectedCommentId(commentId);
		setCommentText("");
	};

	const setTotalCommentsCounts = useCallback((_comments: IComment[]) => {
		let counts = 0;

		_comments.forEach((comment: IComment) => {
			counts = counts + 1 + comment.replies.length;
		});
		setTotalCounts(counts);
	}, []);

	const fetchComments = async () => {
		const resp = await getPostCommentsByPostId({ id: postId });
		if (resp.ok) {
			setComments(resp.data.replies);
			setTotalCommentsCounts(resp.data.replies);
		}
	};

	const handleAddComment = useCallback(async () => {
		const postbody = {
			postId: postId,
			content: commentText,
			parentCommentId: selectedCommentId,
		};
		setCommentText("");
		const resp = await addPostComment(postbody);
		setSelectedCommentId(undefined);

		if (resp.ok) {
			fetchComments();
		} else {
			Toast.show({
				type: "error",
				text1: resp.data.message,
			});
		}
	}, [postId, selectedCommentId, commentText]);

	const handleToggleLike = async (comment: IComment) => {
		if (comment.isLiked) {
			const resp = await unLikeCommentById(null, { id: comment.id });
			if (resp.ok) {
				fetchComments();
			}
		} else {
			const resp = await likeCommentById(null, { id: comment.id });
			if (resp.ok) {
				fetchComments();
			}
		}
	};

	const handleDeleteComment = async (commentId: string) => {
		const isParent = comments.find((el) => el.id === commentId);
		let _comments: IComment[] = [];
		if (isParent) {
			_comments = comments.filter((el) => el.id !== commentId);
		} else {
			_comments = comments.map((comment) => ({
				...comment,
				replies: comment.replies.filter((el) => el.id !== commentId),
			}));
		}
		setComments(_comments);
		setTotalCommentsCounts(_comments);
		const resp = await deleteCommentById(null, { id: commentId });
		if (resp.ok) {
			fetchComments();
		}
	};

	const checkEnableDelete = (comment: IComment) => {
		if (pathname === "/profile") {
			return true;
		} else {
			if (comment.userId === state.profile.userId) {
				return true;
			} else {
				return false;
			}
		}
	};

	const handleClose = () => {
		if (onCallback) onCallback(postId, totalCounts);
		onDismiss();
	};

	const onKeyPress = (keyValue: string) => {
		if (keyValue === "Enter") {
			handleAddComment();
		}
	};

	useEffect(() => {
		setComments([]);
		setTotalCounts(0);
		if (postId) {
			fetchComments();
		}
	}, [postId]);

	return (
		<BottomSheetWrapper open={visible} onClose={handleClose}>
			<View style={tw.style("pb-3 md:pb-0")}>
				<FypText
					fontSize={16}
					lineHeight={21}
					color="grey-70"
					fontWeight={700}
					textAlign="center"
					style={tw.style("mb-[22px]")}
				>
					{`${totalCounts} comments`}
				</FypText>

				<View
					style={{
						height: height * 0.4,
						position: "relative",
					}}
				>
					<ScrollView
						contentContainerStyle={{
							paddingHorizontal: 18,
						}}
					>
						{comments.map((comment) => (
							<CommentParent
								key={comment.id}
								data={comment}
								userId={userId}
								onClickReply={onClickReply}
								onClickLike={handleToggleLike}
								onDelete={handleDeleteComment}
							/>
						))}
					</ScrollView>
					<Collapsible
						collapsed={!selectedCommentId}
						style={tw.style(
							"absolute bottom-0 left-0 w-full",
							!selectedCommentId && "hidden",
						)}
					>
						<View
							style={tw.style(
								"h-[38px] bg-fans-purple flex-row items-center justify-between px-[18px]",
							)}
						>
							<FypText
								fontSize={16}
								lineHeight={21}
								color="white"
							>{`Replying to ${
								comments.find(
									(el) => el.id === selectedCommentId,
								)?.user.username ?? ""
							}`}</FypText>
							<Pressable
								onPress={() => setSelectedCommentId(undefined)}
							>
								<CloseSvg width={13} height={13} color="#fff" />
							</Pressable>
						</View>
					</Collapsible>
				</View>
				<View
					style={tw.style(
						"border-t border-fans-grey mt-2 p-[18px] flex-row items-center gap-x-[18px]",
					)}
				>
					<View style={tw.style("relative flex-1")}>
						<RoundTextInput
							value={commentText}
							onChangeText={(text) => setCommentText(text)}
							placeholder="Add comment"
							customStyles="px-11"
							onKeyPress={(e) => onKeyPress(e.nativeEvent.key)}
						/>
						<FypNullableView visible={commentText !== ""}>
							<Pressable
								style={tw.style("absolute right-1 top-1")}
								onPress={handleAddComment}
							>
								<SendSvg width={34} height={34} color="#fff" />
							</Pressable>
						</FypNullableView>
						<AvatarWithStatus
							avatar={userInfo.avatar}
							size={34}
							style="absolute top-1 left-1"
						/>
					</View>

					{/* <Pressable>
							<ImageSvg width={18.7} height={18.7} color="#000" />
						</Pressable>

						<Pressable>
							<SmileDocSvg width={19.06} height={19.07} />
						</Pressable> */}
				</View>
			</View>
		</BottomSheetWrapper>
	);
};

export default PostCommentDialog;
