import { CloseSvg, ThreeDotsSvg } from "@assets/svgs/common";
import AvatarWithStatus from "@components/common/AvatarWithStatus";
import Title from "@components/common/Title";
import tw from "@lib/tailwind";
import { IProfile, IStory } from "@usertypes/types";
import { getAgoTime } from "@utils/common";
import { LinearGradient } from "expo-linear-gradient";
import React, { FC } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { IconButton } from "react-native-paper";

interface Props {
	onClickClose: () => void;
	onClickThreeDots: () => void;
	creator?: IProfile;
	stories: IStory[];
	storyIndex: number;
	onClickIndicator: (index: number) => void;
}

const GradientHeader: FC<Props> = (props) => {
	const {
		onClickClose,
		onClickThreeDots,
		creator,
		stories,
		storyIndex,
		onClickIndicator,
	} = props;
	return (
		<LinearGradient
			colors={[
				"rgba(112,112,112,0.43)",
				"rgba(112,112,112,0.43)",
				"rgba(255,255,255,0)",
			]}
			start={[0, 0]}
			end={[0, 1]}
			locations={[0, 0.3, 1]}
			style={tw.style(
				"px-[18px] absolute top-0 left-0 w-full h-[176px] z-10 pt-3 md:rounded-t-[15px]",
			)}
		>
			<View style={tw.style("flex-row justify-between gap-x-[6px] mb-2")}>
				{stories.map((story, index) => (
					<TouchableOpacity
						key={story.id}
						onPress={() => onClickIndicator(index)}
						style={tw.style(
							"h-1 rounded-[4px] flex-1",
							storyIndex === index
								? "bg-white"
								: "bg-[rgba(255,255,255,0.4)]",
						)}
					/>
				))}
			</View>

			<View style={tw.style("flex-row items-center")}>
				<AvatarWithStatus avatar={creator?.avatar ?? ""} size={46} />

				<View style={tw.style("ml-3")}>
					<Title style="text-white">{creator?.displayName}</Title>
					{stories.length > 0 ? (
						<Text
							style={tw.style(
								"text-[14px] text-white leading-[21px] mt-[-3px]",
							)}
						>
							{getAgoTime(stories[storyIndex].updatedAt)}
						</Text>
					) : null}
				</View>

				<View style={tw.style("ml-auto flex-row items-center")}>
					<IconButton
						icon={() => (
							<ThreeDotsSvg
								color="#fff"
								width={17.4}
								height={3.55}
							/>
						)}
						size={18}
						onPress={onClickThreeDots}
						style={tw.style("w-[30px] h-[30px]")}
					/>
					<IconButton
						icon={() => (
							<CloseSvg color="#fff" width={11.5} height={11.5} />
						)}
						size={11.5}
						onPress={onClickClose}
						style={tw.style(
							"w-[30px] h-[30px] shadow-sm md:hidden",
						)}
						mode="contained"
						containerColor="rgba(0,0,0,0.3)"
					/>
				</View>
			</View>
		</LinearGradient>
	);
};

export default GradientHeader;
