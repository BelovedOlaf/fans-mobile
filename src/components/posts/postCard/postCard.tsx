import {
	LockSvg,
	StarCheckSvg,
	ThreeDotsSvg,
	RoundedBorderSvg,
} from "@assets/svgs/common";
import AvatarWithStatus from "../../common/AvatarWithStatus";
import AudioContent from "./audioContent";
import CardFooter from "./cardFooter";
import FundraiserContent from "./fundraiserContent";
import ImageContent from "./imageContent";
import PollContent from "./pollContent";
import VideoContent from "./videoContent";
import RoundButton from "@components/common/RoundButton";
import TextContent from "./textContent";
import { FypText, FypNullableView } from "@components/common/base";

import tw from "@lib/tailwind";
import {
	CommonActionType,
	PostsActionType,
	useAppContext,
} from "@context/useAppContext";
import { MediaType, PostType } from "@usertypes/commonEnums";
import { IPost } from "@usertypes/types";
import { getAgoTime } from "@utils/common";
import { cdnURL } from "@helper/Utils";

import { useRouter } from "expo-router";
import React, { FC, useState } from "react";
import { Pressable, TouchableOpacity, View } from "react-native";
import { Image as ExpoImage } from "expo-image";
import { FansView } from "@components/controls";

interface Props {
	data: IPost;
	onClickUnlock?: () => void;
	onClickLike: () => void;
	onClickBookmark: () => void;
	onClickActionMenu: () => void;
	onClickMessage: () => void;
	onClickComment: () => void;
}

const PostCard: FC<Props> = (props) => {
	const {
		data,
		onClickBookmark,
		onClickLike,
		onClickActionMenu,
		onClickMessage,
		onClickUnlock,
		onClickComment,
	} = props;

	const router = useRouter();
	const { state, dispatch } = useAppContext();
	const { id: profileId } = state.profile;

	const [width, setWidth] = useState(0);

	const onGoToProfile = () => {
		const profileLink = data.profile?.profileLink;
		if (profileLink?.split("/").slice(-1)) {
			router.push(`/${profileLink?.split("/").slice(-1)}`);
		}
	};

	const handleOpenMediaModal = (index: number) => {
		dispatch.setPosts({
			type: PostsActionType.updateMediaModal,
			data: {
				visible: true,
				mediaUrls: data.medias.map((m) => m.url ?? ""),
				mediaType:
					data.type === PostType.Video
						? MediaType.Video
						: MediaType.Image,
				avatar: data.profile?.avatar ?? "",
				displayName: data.profile?.displayName,
				index: index,
			},
		});
	};

	const onClickSendTip = () => {
		dispatch.setCommon({
			type: CommonActionType.toggleSendTipModal,
			data: {
				visible: true,
				creator: data.profile,
			},
		});
	};

	return (
		<View style={tw.style("pt-3")}>
			<View
				style={tw.style(
					"px-[18px] flex-row items-center justify-between md:px-0",
				)}
			>
				<View
					style={tw.style("flex-row items-center flex-1")}
					onLayout={(e) => setWidth(e.nativeEvent.layout.width)}
				>
					<Pressable onPress={onGoToProfile}>
						<FansView width={34} height={34} position="relative">
							<AvatarWithStatus
								avatar={data.profile?.avatar ?? ""}
								size={34}
							/>
							<FypNullableView
								visible={
									(data.profile?.activeStories?.length ?? 0) >
									0
								}
							>
								<RoundedBorderSvg
									size={38}
									style={tw.style(
										"absolute top-[-2px] left-[-2px]",
									)}
								/>
							</FypNullableView>
						</FansView>
					</Pressable>
					<FansView flexDirection="row" alignItems="center" flex="1">
						<Pressable
							onPress={onGoToProfile}
							style={[
								tw.style("ml-3"),
								{
									maxWidth: width - 174,
								},
							]}
						>
							<FypText
								fontSize={17}
								fontWeight={600}
								color="black"
								numberOfLines={1}
							>
								{data.profile?.displayName ?? ""}
							</FypText>
						</Pressable>

						<StarCheckSvg
							width={13.66}
							height={13}
							style={tw.style("ml-4 mr-2")}
						/>

						<View
							style={tw.style(
								"w-1 h-1 bg-fans-dark-grey rounded-full mr-2",
							)}
						></View>

						<FypText
							fontSize={16}
							lineHeight={21}
							color="grey-70"
							style={tw.style("min-w-20")}
						>
							{getAgoTime(data.updatedAt ?? "")}
						</FypText>
					</FansView>
				</View>

				<TouchableOpacity
					onPress={onClickActionMenu}
					style={tw.style(
						"w-[18px] h-[18px] flex items-center justify-center",
					)}
				>
					<ThreeDotsSvg size={18} color="#000" />
				</TouchableOpacity>
			</View>
			<View
				style={tw.style(
					"px-[18px] mt-[10px] mb-2 md:px-0 md:mb-3",
					data.type === PostType.Text && "hidden",
				)}
			>
				<FypText fontSize={16} lineHeight={21} color="black">
					{data.caption}
					<FypText
						fontWeight={600}
						color="purple"
						style={tw.style(
							!data.advanced?.isPaidLabelDisclaimer && "hidden",
						)}
					>
						&nbsp;#Ad
					</FypText>
				</FypText>
			</View>

			<View style={tw.style("relative")}>
				{data.type === PostType.Video && (
					<VideoContent
						data={data}
						onClickMedia={handleOpenMediaModal}
					/>
				)}
				{data.type === PostType.Photo && (
					<ImageContent
						data={data}
						onClickMedia={handleOpenMediaModal}
					/>
				)}
				{data.type === PostType.Audio && <AudioContent data={data} />}
				{data.type === PostType.Fundraiser && (
					<FundraiserContent data={data} />
				)}
				{data.type === PostType.Poll && <PollContent data={data} />}
				{data.type === PostType.Text && <TextContent data={data} />}
				<FypNullableView visible={data.isPaidPost && !data.isPaidOut}>
					<View
						style={tw.style(
							"absolute w-full h-full top-0 left-0",
							!data.paidPost?.thumb && "bg-fans-dark-grey/50",
						)}
					>
						<FypNullableView visible={!!data.paidPost?.thumb}>
							<ExpoImage
								source={
									profileId === data.profileId
										? {
												uri: cdnURL(
													data.paidPost?.thumb?.url,
												),
										  }
										: data.paidPost?.thumb?.blurhash
								}
								style={tw.style("w-full h-full")}
							/>
						</FypNullableView>

						<View
							style={[
								tw.style(
									"w-21 h-21 rounded-full bg-[rgba(255,255,255,0.5)] flex-row items-center justify-center absolute top-1/2 left-1/2",
								),
								{
									transform: [
										{ translateX: -42 },
										{ translateY: -42 },
									],
								},
							]}
						>
							<LockSvg width={34.32} height={45} color="#fff" />
						</View>
					</View>
					<View
						style={tw.style("absolute w-full px-[18px] bottom-4")}
					>
						<RoundButton onPress={onClickUnlock}>
							<LockSvg
								width={15}
								height={15}
								color="#fff"
								style={tw.style("mr-2")}
							/>
							{`Unlock for $${data.paidPost?.price ?? 0}`}
						</RoundButton>
					</View>
				</FypNullableView>
			</View>
			<CardFooter
				data={data}
				onClickBookmark={onClickBookmark}
				onClickComment={onClickComment}
				onClickSendTip={onClickSendTip}
				onClickMessage={onClickMessage}
				onClickLike={onClickLike}
			/>
		</View>
	);
};

export default PostCard;
