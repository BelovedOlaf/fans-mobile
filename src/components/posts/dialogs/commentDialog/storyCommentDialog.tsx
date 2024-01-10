import { CloseSvg, SendSvg } from "@assets/svgs/common";
import AvatarWithStatus from "@components/common/AvatarWithStatus";
import RoundTextInput from "@components/common/RoundTextInput";
import BottomSheetWrapper from "@components/common/bottomSheetWrapper";
import { useAppContext } from "@context/useAppContext";
import {
	addStoryComment,
	deleteCommentById,
	getStoryCommentsByPostId,
	likeStoryComment,
	unlikeStoryComment,
} from "@helper/endpoints/stories/apis";
import tw from "@lib/tailwind";
import { IComment } from "@usertypes/types";
import React, { FC, useEffect, useState } from "react";
import {
	Pressable,
	ScrollView,
	Text,
	View,
	useWindowDimensions,
} from "react-native";
import Collapsible from "react-native-collapsible";
import Toast from "react-native-toast-message";
import CommentParent from "./commentParent";

interface Props {
	visible: boolean;
	onDismiss: () => void;
	storyId: string;
	onCallback?: (storyId: string, commentCounts: number) => void;
}

const StoryCommentDialog: FC<Props> = (props) => {
	const { onCallback, visible, storyId, onDismiss } = props;
	const { state } = useAppContext();
	const { userInfo } = state.user;
	const { userId } = state.profile;

	const [totalCounts, setTotalCounts] = useState(0);
	const [comments, setComments] = useState<IComment[]>([]);
	const [commentText, setCommentText] = useState("");
	const [hideForm, setHideForm] = useState(false);
	const [selectedCommentId, setSelectedCommentId] = useState<
		string | undefined
	>(undefined);
	const { height } = useWindowDimensions();

	const onClickReply = (commentId: string) => {
		setSelectedCommentId(commentId);
		setCommentText("");
		setHideForm(true);
		setTimeout(() => setHideForm(false), 1000);
	};

	const setTotalCommentsCounts = (_comments: IComment[]) => {
		let counts = 0;

		_comments.forEach((comment: IComment) => {
			counts = counts + 1 + comment.replies.length;
		});
		setTotalCounts(counts);
	};

	const fetchComments = async () => {
		const resp = await getStoryCommentsByPostId({ id: storyId });
		if (resp.ok) {
			setComments(resp.data.replies);
			setTotalCommentsCounts(resp.data.replies);
		}
	};

	const handleAddComment = async () => {
		const postbody = {
			storyId: storyId,
			content: commentText,
			parentCommentId: selectedCommentId,
		};
		setCommentText("");
		setHideForm(true);
		const resp = await addStoryComment(postbody);
		setSelectedCommentId(undefined);

		if (resp.ok) {
			fetchComments();
		} else {
			Toast.show({
				type: "error",
				text1: resp.data.message,
			});
		}
	};

	const handleToggleLike = async (comment: IComment) => {
		if (comment.isLiked) {
			const resp = await unlikeStoryComment(null, { id: comment.id });
			if (resp.ok) {
				fetchComments();
			}
		} else {
			const resp = await likeStoryComment(null, { id: comment.id });
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

	const handleClose = () => {
		onDismiss();
		if (onCallback) onCallback(storyId, totalCounts);
	};

	const onKeyPress = (keyValue: string) => {
		if (keyValue === "Enter") {
			handleAddComment();
		}
	};

	useEffect(() => {
		setComments([]);
		setTotalCounts(0);
		if (storyId) {
			fetchComments();
			setHideForm(false);
		}
	}, [storyId]);

	return (
		<BottomSheetWrapper open={visible} onClose={handleClose}>
			<View style={tw.style("pb-4")}>
				<Text
					style={tw.style(
						"text-center text-base text-fans-dark-grey font-bold mb-8",
					)}
				>
					{`${totalCounts} comments`}
				</Text>

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
							<Text
								style={tw.style("text-base text-white")}
							>{`Replying to ${
								comments.find(
									(el) => el.id === selectedCommentId,
								)?.user.username ?? ""
							}`}</Text>
							<Pressable
								onPress={() => setSelectedCommentId(undefined)}
							>
								<CloseSvg width={13} height={13} color="#fff" />
							</Pressable>
						</View>
					</Collapsible>
				</View>
				<Collapsible collapsed={hideForm}>
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
								onKeyPress={(e) =>
									onKeyPress(e.nativeEvent.key)
								}
							/>
							{commentText !== "" ? (
								<Pressable
									style={tw.style("absolute right-1 top-1")}
									onPress={handleAddComment}
								>
									<SendSvg
										width={34}
										height={34}
										color="#fff"
									/>
								</Pressable>
							) : null}
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
				</Collapsible>
			</View>
		</BottomSheetWrapper>
	);
};

export default StoryCommentDialog;
