import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import { View } from "react-native";
import * as Clipboard from "expo-clipboard";
import * as Linking from "expo-linking";

import tw from "@lib/tailwind";
import RoundTextInput from "@components/common/RoundTextInput";
import { ShareDialog } from "@components/posts/dialogs";
import CardActions from "@components/common/cardActions";
import {
	GradientHeader,
	StoryContents,
	StoryFunctionButtons,
	StoryLayout,
} from "@components/stories";
import StoryCommentDialog from "@components/posts/dialogs/commentDialog/storyCommentDialog";

import {
	CommonActionType,
	PostsActionType,
	useAppContext,
} from "@context/useAppContext";
import { StoriesNavigationStacks } from "@usertypes/navigations";
import { IStory, ICardAction, IProfile } from "@usertypes/types";
import { IconTypes } from "@usertypes/commonEnums";
import * as storyApis from "@helper/endpoints/stories/apis";
import * as profileApis from "@helper/endpoints/profile/apis";

const HighlightStoryScreen = (
	props: NativeStackScreenProps<StoriesNavigationStacks, "Highlight">,
) => {
	const { route } = props;
	const { highlightId, userId } = route.params;
	const router = useRouter();

	const { state, dispatch } = useAppContext();
	const { highlightStory } = state.story;
	const [profile, setProfile] = useState<IProfile>();

	const isOwner = userId === state.profile.userId;

	const [stories, setStories] = useState<IStory[]>([]);

	const [storyIndex, setStoryIndex] = useState(0);
	const [message, setMessage] = useState("");
	const [openAction, setOpenAction] = useState(false);

	const [openShare, setOpenShare] = useState(false);
	const [openCommentModal, setOpenCommentModal] = useState(false);
	const [storyId, setStoryId] = useState("");

	const onChangeStoryIndex = (index: number) => {
		setStoryIndex(index);
	};

	const onClickTip = () => {
		dispatch.setCommon({
			type: CommonActionType.toggleSendTipModal,
			data: {
				visible: true,
				creator: highlightStory.profile,
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
			const resp = await storyApis.unlikeStoryById(null, {
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
			const resp = await storyApis.storyLike(null, {
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

	const onClickPrev = () => {
		if (storyIndex === 0 || stories.length === 0) {
			return;
		}
		setStoryIndex(storyIndex - 1);
	};

	const onClickNext = () => {
		if (storyIndex === stories.length - 1 || stories.length === 0) {
			return;
		}
		setStoryIndex(storyIndex + 1);
	};

	const onClickClose = () => {
		if (router.canGoBack()) {
			router.back();
		} else {
			if (profile?.profileLink) {
				const username = profile?.profileLink.split("/").slice(-1);
				router.replace(`/${username[0]}`);
			} else {
				router.replace("/");
			}
		}
	};
	const onUnsubscribe = () => {};

	const onCopyStory = async () => {
		const url = Linking.createURL("stories", {
			queryParams: {
				highlightId: highlightId,
				userId: userId,
				screen: "Highlight",
			},
		});
		await Clipboard.setStringAsync(url);
		setOpenAction(false);
	};

	const onHideStory = () => {};

	const onReportStory = () => {};

	const onAddRemoveList = () => {};

	const fetchStories = async () => {
		const resp = await profileApis.getHighlightById({ id: highlightId });
		if (resp.ok) {
			setStories(resp.data.stories);
		}
	};

	const fetchProfile = async () => {
		const resp = await profileApis.getProfileById({ id: userId });
		if (resp.ok) {
			setProfile(resp.data);
		}
	};

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
		if (highlightStory.profile) {
			setStories(highlightStory.stories);
			setProfile(highlightStory.profile);
		} else {
			fetchStories();
			fetchProfile();
		}
	}, [highlightStory]);

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
					creator={profile}
					stories={stories}
					storyIndex={storyIndex}
					onClickClose={onClickClose}
					onClickThreeDots={() => setOpenAction(true)}
					onClickIndicator={onChangeStoryIndex}
				/>

				<StoryContents
					stories={stories}
					storyIndex={storyIndex}
					onChangeStoryIndex={onChangeStoryIndex}
					onPrev={onClickPrev}
					onNext={onClickNext}
				/>

				<StoryFunctionButtons
					story={stories[storyIndex]}
					onClickComment={onClickComment}
					onClickLike={onClickLike}
					onClickTip={onClickTip}
					onClickShare={onClickShare}
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

export default HighlightStoryScreen;
