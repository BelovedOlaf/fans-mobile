import { FansText, FansView } from "@components/controls";
import {
	FilledHeartSvg,
	HeartSvg,
	TrashSvg,
	RoundedBorderSvg,
} from "@assets/svgs/common";
import AvatarWithStatus from "@components/common/AvatarWithStatus";
import { FypNullableView } from "@components/common/base";

import tw from "@lib/tailwind";
import { IComment } from "@usertypes/types";
import { getAgoTime } from "@utils/common";

import React, { FC, useState } from "react";
import { Pressable, TouchableOpacity, View } from "react-native";
import Collapsible from "react-native-collapsible";
import { IconButton } from "react-native-paper";

interface Props {
	data: IComment;
	children?: React.ReactNode;
	onClickReply: () => void;
	onClickLike: () => void;
	isChildren?: boolean;
	onDelete: (commentId: string) => void;
	userId: string;
}

const Comment: FC<Props> = (props) => {
	const {
		data,
		children,
		onClickReply,
		isChildren,
		onClickLike,
		onDelete,
		userId,
	} = props;
	const [hideReplies, setHideReplies] = useState(true);
	return (
		<View style={tw.style("flex-row")}>
			<FansView width={34} height={34} position="relative">
				<FypNullableView
					visible={(data.profile?.activeStories?.length ?? 0) > 0}
				>
					<RoundedBorderSvg
						size={38}
						style={tw.style("absolute top-[-2px] left-[-2px]")}
					/>
				</FypNullableView>

				<AvatarWithStatus avatar={data.user.avatar ?? ""} size={34} />
			</FansView>

			<View style={tw.style("ml-3 flex-1")}>
				<View style={tw.style("flex-row items-center mb-[5px]")}>
					<FansView flexDirection="row" alignItems="center" gap={6}>
						<FansText
							color="purple-a8"
							fontSize={15}
							lineHeight={20}
							style={tw.style("font-semibold")}
						>
							{data.user.username}
						</FansText>
						<View
							style={tw.style(
								"w-1 h-1 rounded-full bg-fans-dark-grey",
							)}
						></View>
						<FansText color="grey-70" fontSize={14} lineHeight={20}>
							{getAgoTime(data.updatedAt)}
						</FansText>
					</FansView>

					<View style={tw.style("ml-auto flex-row items-center")}>
						<FansText
							color="grey-70"
							fontSize={14}
							lineHeight={20}
							style={tw.style("mr-[6.6px]")}
						>
							{data.likeCount}
						</FansText>
						<TouchableOpacity
							onPress={() => {
								onClickLike();
							}}
						>
							{data.isLiked ? (
								<FilledHeartSvg
									width={15}
									height={15}
									color="#a854f5"
								/>
							) : (
								<HeartSvg
									width={15}
									height={15}
									color="#707070"
								/>
							)}
						</TouchableOpacity>
					</View>
				</View>

				<FansText
					fontSize={16}
					lineHeight={21}
					style={tw.style("mb-1")}
				>
					{data.content}
				</FansText>
				<FypNullableView visible={!isChildren}>
					<View style={tw.style("flex-row items-center relative")}>
						<Pressable onPress={onClickReply}>
							<FansText
								color="grey-70"
								fontSize={15}
								lineHeight={20}
							>
								Reply
							</FansText>
						</Pressable>
						<Pressable
							style={tw.style(
								"flex-row items-center ml-3",
								data.replies.length === 0 && "hidden",
							)}
							onPress={() => setHideReplies(!hideReplies)}
						>
							<View
								style={tw.style(
									"w-1 h-1 rounded-full bg-fans-dark-grey",
								)}
							></View>
							<FansText
								color="grey-70"
								fontSize={15}
								lineHeight={24}
								style={tw.style("ml-2")}
							>
								{`${hideReplies ? "View" : "Hide"} ${
									data.replies.length
								} replies`}
							</FansText>
						</Pressable>
						<FypNullableView visible={data.userId === userId}>
							<IconButton
								icon={() => (
									<TrashSvg size={15} color="#eb2121" />
								)}
								style={tw.style(
									"m-0 p-0 w-[34px] h-[34px] absolute bottom-0 right-0",
									isChildren && "hidden",
								)}
								containerColor="#f0f0f0"
								onPress={() => onDelete(data.id)}
							/>
						</FypNullableView>
					</View>
				</FypNullableView>
				<FypNullableView
					visible={data.replies.length > 0 && !isChildren}
				>
					<Collapsible collapsed={hideReplies}>
						<View style={tw.style("mt-4 gap-y-2")}>{children}</View>
					</Collapsible>
				</FypNullableView>
			</View>
		</View>
	);
};

export default Comment;
