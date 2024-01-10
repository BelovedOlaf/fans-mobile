import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import { View } from "react-native";
import { IconButton } from "react-native-paper";
import * as Clipboard from "expo-clipboard";
import * as Linking from "expo-linking";

import tw from "@lib/tailwind";
import { ChevronLeftSvg, ChevronRightSvg } from "@assets/svgs/common";
import RoundTextInput from "@components/common/RoundTextInput";
import { ShareDialog } from "@components/posts/dialogs";
import {
	GradientHeader,
	StoryContents,
	StoryFunctionButtons,
	StoryLayout,
} from "@components/stories";
import CardActions from "@components/common/cardActions";
import StoryCommentDialog from "@components/posts/dialogs/commentDialog/storyCommentDialog";
import {
	CommonActionType,
	useAppContext,
	PostsActionType,
} from "@context/useAppContext";
import { StoriesNavigationStacks } from "@usertypes/navigations";
import { IStory, IProfile, ICardAction } from "@usertypes/types";
import { IconTypes } from "@usertypes/commonEnums";
import * as apis from "@helper/endpoints";

const CreatorStoriesScreen = (
	props: NativeStackScreenProps<StoriesNavigationStacks, "Creator">,
) => {
	const { route } = props;
	const { userId } = route.params;
	const router = useRouter();
	const { state, dispatch } = useAppContext();
	const { storiesFeed: creators } = state.story;

	const [creator, setCreator] = useState<IProfile>();
	const [stories, setStories] = useState<IStory[]>([]);
	const [storyIndex, setStoryIndex] = useState(0);
	const [creatorIndex, setCreatorIndex] = useState(0);

	const [message, setMessage] = useState("");
	const [openAction, setOpenAction] = useState(false);
	const [openShare, setOpenShare] = useState(false);
	const [loading, setLoading] = useState(false);
	const [openCommentModal, setOpenCommentModal] = useState(false);
	const [storyId, setStoryId] = useState("");

	const isOwner = creator?.userId === state.profile.userId;

	const onChangeStoryIndex = (index: number) => {
		setStoryIndex(index);
	};

	const onClickTip = () => {
		dispatch.setCommon({
			type: CommonActionType.toggleSendTipModal,
			data: {
				visible: true,
				creator: creator,
			},
		});
	};

	const onClickComment = () => {
		setStoryId(stories[storyIndex].id);
		setOpenCommentModal(true);
	};

	const onClickShare = () => {
		setOpenShare(true);
	};

	const onClickLike = async () => {
		const story = stories[storyIndex];
		if (story.isLiked) {
			const resp = await apis.stories.unlikeStoryById(null, {
				id: story.id,
			});
			if (resp.ok) {
				setStories(
					stories.map((el, index) =>
						index === storyIndex
							? {
									...el,
									isLiked: resp.data.isLiked,
									likeCount: resp.data.likeCount,
							  }
							: el,
					),
				);
			}
		} else {
			const resp = await apis.stories.storyLike(null, {
				id: story.id,
			});
			if (resp.ok) {
				setStories(
					stories.map((el, index) =>
						index === storyIndex
							? {
									...el,
									isLiked: resp.data.isLiked,
									likeCount: resp.data.likeCount,
							  }
							: el,
					),
				);
			}
		}
	};

	const onClickClose = () => {
		if (router.canGoBack()) {
			router.back();
		} else {
			if (creator?.profileLink) {
				const username = creator?.profileLink.split("/").slice(-1);
				router.replace(`/${username[0]}`);
			} else {
				router.replace("/");
			}
		}
	};

	const onClickPrev = () => {
		if (storyIndex === 0) {
			setCreator(creators[creatorIndex - 1]);
			setCreatorIndex(creatorIndex - 1);
			setStories(creators[creatorIndex - 1].stories);
			setStoryIndex(0);
		} else {
			setStoryIndex(storyIndex - 1);
		}
	};

	const onClickNext = () => {
		if (storyIndex === stories.length - 1 || stories.length === 0) {
			setCreator(creators[creatorIndex + 1]);
			setCreatorIndex(creatorIndex + 1);
			setStories(creators[creatorIndex + 1].stories);
			setStoryIndex(0);
		} else {
			setStoryIndex(storyIndex + 1);
		}
	};

	const onUnsubscribe = () => {};

	const onCopyStory = async () => {
		const url = Linking.createURL("stories", {
			queryParams: {
				userId: creator?.userId,
				screen: "Profile",
			},
		});
		await Clipboard.setStringAsync(url);
		setOpenAction(false);
	};

	const onHideStory = () => {};

	const onReportStory = () => {};

	const onAddRemoveList = () => {};

	const commentCallback = (storyId: string, commentCounts: number) => {
		setStories(
			stories.map((story) =>
				story.id === storyId
					? {
							...story,
							commentCount: commentCounts,
					  }
					: story,
			),
		);
	};

	useEffect(() => {
		if (creators.length > 0) {
			setCreator(creators.find((el) => el.userId === userId));
			setStories(
				creators.find((el) => el.userId === userId)?.stories ?? [],
			);
			setCreatorIndex(
				creators.findIndex((user) => user.userId === userId),
			);
		}
	}, [creators]);

	const storyActions: ICardAction[] = [
		{
			title: "Unsubscribe",
			iconType: IconTypes.Unsubscribe,
			onClick: onUnsubscribe,
			hide: isOwner,
		},
		{
			title: "Add/remove from lists",
			iconType: IconTypes.AddRemoveFromLists,
			onClick: onAddRemoveList,
		},
		{
			title: "Copy story",
			iconType: IconTypes.CopyLink,
			onClick: onCopyStory,
		},
		{
			title: "Hide story from feed",
			iconType: IconTypes.EyeHide,
			onClick: onHideStory,
			hide: isOwner,
		},
		{
			title: "Report story",
			iconType: IconTypes.Report,
			iconColor: "#eb2121",
			onClick: onReportStory,
			labelClass: "text-fans-red",
			hide: isOwner,
		},
	];

	return (
		<StoryLayout onClose={onClickClose}>
			<View
				style={tw.style(
					"w-full relative flex-1 md:max-w-[494px] md:mx-auto",
				)}
			>
				<GradientHeader
					creator={creator}
					stories={stories}
					storyIndex={storyIndex}
					onClickClose={onClickClose}
					onClickThreeDots={() => setOpenAction(true)}
					onClickIndicator={onChangeStoryIndex}
				/>

				<StoryContents
					stories={stories}
					storyIndex={storyIndex}
					loading={loading}
					onChangeStoryIndex={onChangeStoryIndex}
					onPrev={onClickPrev}
					onNext={onClickNext}
				/>

				<StoryFunctionButtons
					onClickComment={onClickComment}
					onClickLike={onClickLike}
					onClickTip={onClickTip}
					onClickShare={onClickShare}
					story={stories[storyIndex]}
					isOwner={isOwner}
				/>

				<View
					style={tw.style(
						"px-[18px] pt-4 pb-2 bg-black w-full md:px-0 md:pb-0",
						isOwner && "hidden",
					)}
				>
					<RoundTextInput
						value={message}
						placeholder="Send message"
						onChangeText={(val) => setMessage(val)}
						customStyles="text-white bg-transparent border-white text-white"
						placeholderTextColor="#fff"
					/>
				</View>

				<IconButton
					icon={() => <ChevronLeftSvg size={15} color="#000" />}
					containerColor="#fff"
					style={tw.style(
						"p-0 m-0 w-7.5 h-7.5 absolute top-1/2 left-5 md:left-[-50px] hidden web:flex",
						storyIndex === 0 &&
							creatorIndex === 0 &&
							"hidden web:hidden",
					)}
					onPress={onClickPrev}
				/>
				<IconButton
					icon={() => <ChevronRightSvg size={15} color="#000" />}
					containerColor="#fff"
					style={tw.style(
						"p-0 m-0 w-7.5 h-7.5 absolute top-1/2 right-5 md:right-[-50px] hidden web:flex",
						(storyIndex === stories.length - 1 ||
							stories.length === 0) &&
							creatorIndex === creators.length - 1 &&
							"hidden web:hidden",
					)}
					onPress={onClickNext}
				/>
			</View>

			<CardActions
				open={openAction}
				onClose={() => setOpenAction(false)}
				actions={storyActions}
			/>

			<ShareDialog
				open={openShare}
				onClose={() => setOpenShare(false)}
				onCopyLink={onCopyStory}
			/>
			<StoryCommentDialog
				storyId={storyId}
				visible={openCommentModal}
				onDismiss={() => setOpenCommentModal(false)}
				onCallback={commentCallback}
			/>
		</StoryLayout>
	);
};

export default CreatorStoriesScreen;
