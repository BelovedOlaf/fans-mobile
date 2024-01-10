import { View } from "react-native";
import React, { FC } from "react";
import * as Clipboard from "expo-clipboard";

import tw from "@lib/tailwind";
import { pinPostById, unpinPostById } from "@helper/endpoints/post/apis";

import BottomSheetWrapper from "@components/common/bottomSheetWrapper";
import { MenuItem } from "@components/posts/common";
import { FansText, FansIconButton, FansDivider } from "@components/controls";
import {
	ImageSvg,
	CopyLinkSvg,
	TrashSvg,
	ArchivedPostSvg,
	HideLikeSvg,
	TurnOffCommentSvg,
	HeartSvg,
	CommentSvg,
	OutlinedPinSvg,
	EditSvg,
} from "@assets/svgs/common";
import { IPost, IPostAdvanced } from "@usertypes/types";

// import base modules
import { API_URL } from "@env";

interface FunctionButtonProps {
	title: string;
	icon: React.ReactNode;
	onPress?: () => void;
}

export const FunctionButton: FC<FunctionButtonProps> = (props) => {
	const { title, icon, onPress } = props;
	return (
		<View style={tw.style("items-center")}>
			<FansIconButton
				size={46}
				containerColor="#a854f5"
				onPress={onPress}
			>
				{icon}
			</FansIconButton>
			<FansText
				fontSize={16}
				style={tw.style("font-medium mt-2")}
				lineHeight={21}
			>
				{title}
			</FansText>
		</View>
	);
};

interface Props {
	open: boolean;
	onClose: () => void;
	post?: IPost;
	onClickGoToPost: () => void;
	onClickArchivePost: () => void;
	onClickTrash: () => void;
	updatePostAdvanced: (advanced: IPostAdvanced) => void;
	pinCallback: (post: IPost) => void;
}

const ProfilePostActions: FC<Props> = (props) => {
	const {
		open,
		onClose,
		post,
		onClickGoToPost,
		onClickArchivePost,
		onClickTrash,
		updatePostAdvanced,
		pinCallback,
	} = props;

	const onCopyPostLink = async () => {
		const url = `${API_URL.split("/api")[0]}/p/${post?.id}`;
		await Clipboard.setStringAsync(url);
		onClose();
	};

	const onClickHideLikeCount = () => {
		if (post?.advanced) {
			updatePostAdvanced({
				...post.advanced,
				isHideLikeViewCount: !post.advanced.isHideLikeViewCount,
			});
		}
	};

	const onClickTurnOffComment = () => {
		if (post?.advanced) {
			updatePostAdvanced({
				...post.advanced,
				isTurnOffComment: !post.advanced.isTurnOffComment,
			});
		}
	};

	const onPressPin = async () => {
		if (!post) {
			return;
		}
		if (post.isPinned) {
			const resp = await unpinPostById(null, { id: post.id });
			if (resp.ok) {
				pinCallback(resp.data);
			}
		} else {
			const resp = await pinPostById(null, { id: post.id });
			if (resp.ok) {
				pinCallback(resp.data);
			}
		}
	};

	return (
		<BottomSheetWrapper
			open={open}
			onClose={() => {
				onClose();
			}}
		>
			<View style={tw.style("pt-[50px]")}>
				<View style={tw.style("flex-row justify-around pb-5")}>
					{/* <FunctionButton
						title="Edit"
						icon={<EditSvg color="#fff" size={22} />}
					/> */}
					<FunctionButton
						title={post?.isPinned ? "Unpin" : "Pin"}
						icon={<OutlinedPinSvg color="#fff" size={22} />}
						onPress={onPressPin}
					/>
					<FunctionButton
						title="Copy link"
						icon={
							<CopyLinkSvg
								width={24.4}
								height={24.4}
								color="#fff"
							/>
						}
						onPress={onCopyPostLink}
					/>
				</View>

				<FansDivider />

				<View>
					<MenuItem
						title={`${
							post?.advanced?.isHideLikeViewCount
								? "Show"
								: "Hide"
						} like count`}
						icon={
							post?.advanced?.isHideLikeViewCount ? (
								<HeartSvg width={24} height={22.73} />
							) : (
								<HideLikeSvg width={24} height={22.73} />
							)
						}
						onPress={onClickHideLikeCount}
					/>
					<MenuItem
						title={
							post?.advanced?.isTurnOffComment
								? "Turn on commenting"
								: "Turn off commenting"
						}
						icon={
							post?.advanced?.isTurnOffComment ? (
								<CommentSvg width={23} height={23} />
							) : (
								<TurnOffCommentSvg width={23} height={23} />
							)
						}
						onPress={onClickTurnOffComment}
					/>
					<MenuItem
						title="Go to post"
						icon={
							<ImageSvg width={21.6} height={21.6} color="#000" />
						}
						onPress={onClickGoToPost}
					/>

					<MenuItem
						title={
							post?.isArchived ? "Unarchive post" : "Archive post"
						}
						icon={
							<ArchivedPostSvg
								color="#000"
								width={22.87}
								height={23}
							/>
						}
						onPress={onClickArchivePost}
					/>

					{/* <MenuItem
						title="Embed"
						icon={<CopyLinkSvg width={24.39} height={24.41} />}
						onPress={() => {}}
					/> */}

					<MenuItem
						title="Delete"
						icon={
							<TrashSvg
								width={18.5}
								height={23}
								color="#eb2121"
							/>
						}
						labelClass="text-[#eb2121]"
						onPress={onClickTrash}
					/>
				</View>
			</View>
		</BottomSheetWrapper>
	);
};

export default ProfilePostActions;
