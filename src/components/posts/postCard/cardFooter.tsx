import { View, Text, TouchableOpacity } from "react-native";
import React, { FC } from "react";
import tw from "@lib/tailwind";

import {
	HeartSvg,
	CommentSvg,
	BookmarkSvg,
	PostMailSvg,
	RoundedTipSvg,
} from "@assets/svgs/common";

import { IPost } from "@usertypes/types";

interface Props {
	data: IPost;
	onClickLike: () => void;
	onClickBookmark: () => void;
	onClickComment: () => void;
	onClickMessage: () => void;
	onClickSendTip: () => void;
}

const CardFooter: FC<Props> = (props) => {
	const {
		data,
		onClickLike,
		onClickComment,
		onClickBookmark,
		onClickMessage,
		onClickSendTip,
	} = props;
	return (
		<View
			style={tw.style(
				"px-[18px] flex-row items-center py-3 justify-between md:px-0 md:pt-7.5 md:px-0 md:pt-7.5 md:pb-3",
			)}
		>
			<View style={tw.style("flex flex-row items-center gap-x-[18px]")}>
				<TouchableOpacity
					onPress={onClickLike}
					style={tw.style("flex-row items-center")}
				>
					<HeartSvg
						width={21.5}
						height={19}
						color={data.isLiked ? "#eb2121" : "#000"}
					/>
					<Text
						style={tw.style(
							"ml-[6px] text-[13px] leading-[17px] text-black font-bold",
							data.advanced?.isHideLikeViewCount && "hidden",
						)}
					>
						{data.likeCount}
					</Text>
				</TouchableOpacity>

				<TouchableOpacity
					onPress={onClickComment}
					style={tw.style(
						"flex-row items-center",
						data.advanced?.isTurnOffComment && "hidden",
					)}
				>
					<CommentSvg width={21.3} height={21.3} color="#000" />
					<Text
						style={tw.style(
							"ml-[6px] text-[13px] leading-[17px] text-black font-bold",
						)}
					>
						{data.commentCount}
					</Text>
				</TouchableOpacity>

				<TouchableOpacity
					onPress={onClickBookmark}
					style={tw.style("flex-row items-center")}
				>
					<BookmarkSvg
						size={21.7}
						color={data.isBookmarked ? "#F98C28" : "#000"}
					/>
					<Text
						style={tw.style(
							"ml-[6px] text-[13px] leading-[17px] text-black font-bold",
						)}
					>
						{data.bookmarkCount}
					</Text>
				</TouchableOpacity>

				{/* <TouchableOpacity
					onPress={onClickMessage}
					style={tw.style("flex-row")}
				>
					<PostMailSvg width={23.73} height={19} color="#000" />
				</TouchableOpacity> */}
			</View>

			<TouchableOpacity
				style={tw.style("flex-row items-center")}
				onPress={onClickSendTip}
			>
				<Text
					style={tw.style(
						"text-[14px] leading-[19px] font-semibold text-black mr-2",
					)}
				>
					Send tip
				</Text>
				<RoundedTipSvg width={23} height={23} />
			</TouchableOpacity>
		</View>
	);
};

export default CardFooter;
