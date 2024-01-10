import React, { FC } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import tw from "@lib/tailwind";

import {
	CommentSvg,
	FilledHeartSvg,
	HeartSvg,
	RedirectSvg,
	TipSvg,
} from "@assets/svgs/common";
import { IStory } from "@usertypes/types";

interface Props {
	story?: IStory;
	onClickComment: () => void;
	onClickLike: () => void;
	onClickShare: () => void;
	onClickTip?: () => void;
	isOwner: boolean;
}

const StoryFunctionButtons: FC<Props> = (props) => {
	const {
		onClickComment,
		onClickLike,
		onClickShare,
		onClickTip,
		story,
		isOwner,
	} = props;

	return (
		<View
			style={tw.style(
				"absolute bottom-20 right-[6px] w-[55px] items-center gap-y-5",
				!story && "hidden",
			)}
		>
			<View style={tw.style("items-center")}>
				<TouchableOpacity onPress={onClickLike}>
					{story?.isLiked ? (
						<FilledHeartSvg
							width={25.63}
							height={22.65}
							color="#fff"
						/>
					) : (
						<HeartSvg width={25.63} height={22.65} color="#fff" />
					)}
				</TouchableOpacity>
				<Text
					style={tw.style(
						"text-[15px] font-bold leading-5 text-white mt-1",
					)}
				>
					{story?.likeCount ?? 0}
				</Text>
			</View>

			<View style={tw.style("items-center")}>
				<TouchableOpacity onPress={onClickComment}>
					<CommentSvg width={25.84} height={25.84} color="#fff" />
				</TouchableOpacity>
				<Text
					style={tw.style(
						"text-[15px] font-bold leading-5 text-white mt-1",
					)}
				>
					{story?.commentCount ?? 0}
				</Text>
			</View>

			<View style={tw.style("items-center")}>
				<TouchableOpacity onPress={onClickShare}>
					<RedirectSvg width={26.05} height={18.14} color="#fff" />
				</TouchableOpacity>
				<Text
					style={tw.style(
						"text-[15px] font-bold leading-5 text-white mt-3",
					)}
				>
					{story?.shareCount}
				</Text>
			</View>

			<View
				style={tw.style(
					"items-center",
					(!onClickTip || isOwner) && "hidden",
				)}
			>
				<TouchableOpacity onPress={onClickTip}>
					<TipSvg width={12.14} height={25} />
				</TouchableOpacity>
				<Text
					style={tw.style(
						"text-[15px] font-bold leading-5 text-white mt-[6.5px]",
					)}
				>
					TIP
				</Text>
			</View>
		</View>
	);
};

export default StoryFunctionButtons;
