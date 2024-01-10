import { View, Text, Image, Pressable } from "react-native";
import React, { FC } from "react";
import tw from "@lib/tailwind";
import { IconButton } from "react-native-paper";
import { useRouter } from "expo-router";

import { FansText } from "@components/controls";
import {
	PlayListSvg,
	OutlinedPlaySvg,
	TrashSvg,
	DndTriggerSvg,
	EditSvg,
	ThreeDotsVerticalSvg,
} from "@assets/svgs/common";

import { truncateText } from "@utils/stringHelper";
import { IPlayList } from "@usertypes/types";
import { cdnURL } from "@helper/Utils";
import { FansDivider } from "@components/controls";

interface Props {
	data: IPlayList;
	onClickEdit: () => void;
	onClickDelete: () => void;
	onClickMenus: () => void;
	isSuggested?: boolean;
}

const PlayListCard: FC<Props> = (props) => {
	const { data, onClickEdit, onClickDelete, onClickMenus } = props;
	const router = useRouter();

	const onGoToDetail = () => {
		router.push({
			pathname: "playlist",
			params: { screen: "Detail", id: data.id },
		});
	};
	const isSuggested = true;
	return (
		<View>
			<View
				style={tw.style(
					"relative flex-row items-center",
					isSuggested ? "" : "pl-6 lg:pl-[46px]",
				)}
			>
				<View
					style={[
						tw.style(
							"absolute left-0 top-[10px] lg:top-[106px] md:left-1",
							isSuggested && "hidden",
						),
					]}
				>
					<DndTriggerSvg width={10} height={16.14} />
				</View>

				<Pressable
					style={tw.style(
						"relative w-[149px] h-[97px] lg:w-[352px] lg:h-[230px]",
					)}
					onPress={onGoToDetail}
				>
					<Image
						source={{
							uri: cdnURL(data.thumb),
						}}
						resizeMode="cover"
						style={tw.style("w-full h-full rounded-[7px]")}
					/>
					<View
						style={tw.style(
							"absolute bg-[rgba(0,0,0,0.5)] w-full h-5 bottom-0 left-0 rounded-b-[7px] flex-row items-center justify-center md:h-7.5",
						)}
					>
						<PlayListSvg
							width={9.86}
							height={8.65}
							color="#fff"
							style={tw.style("w-3 h-[10.5px]")}
						/>
						<Text
							style={tw.style(
								"text-white text-[10px] font-bold leading-[11px] md:text-[16px]",
							)}
						>
							{` ${data.posts.length} `}
						</Text>
					</View>
				</Pressable>

				<View
					style={tw.style(
						"flex-1 relative ml-[14px] h-full pr-2 md:ml-4 md:pt-20",
					)}
				>
					<View>
						<Pressable
							onPress={onGoToDetail}
							style={tw.style("mb-[2px]")}
						>
							<FansText
								color="black"
								style={tw.style(
									"font-semibold md:text-[19px] md:leading-[26px]",
								)}
								fontSize={16}
								lineHeight={21}
							>
								{truncateText(data.title, 15)}
							</FansText>
						</Pressable>
						<FansText color="grey-70" fontSize={16} lineHeight={21}>
							{`${data.posts.length} posts`}
						</FansText>
					</View>

					<View
						style={tw.style(
							"flex-row items-center mt-7 absolute left-0 bottom-0",
						)}
					>
						<OutlinedPlaySvg
							width={8.37}
							height={9.22}
							color="#707070"
						/>
						<FansText
							color="grey-70"
							style={tw.style("ml-1")}
							fontSize={14}
							lineHeight={21}
						>
							{data.viewCount}
						</FansText>
					</View>
				</View>

				{isSuggested ? (
					<Pressable
						style={tw.style(
							"absolute top-0 right-0 w-5 h-5 flex-row justify-end",
						)}
						onPress={onClickMenus}
					>
						<ThreeDotsVerticalSvg
							width={3.55}
							height={17.4}
							color="#000"
						/>
					</Pressable>
				) : (
					<View
						style={tw.style(
							"flex-row items-center gap-x-2 absolute bottom-0 right-0",
						)}
					>
						<IconButton
							icon={() => (
								<EditSvg
									width={14.54}
									height={14.9}
									color="#000"
								/>
							)}
							containerColor="#f0f0f0"
							style={tw.style("m-0 w-[34px] h-[34px]")}
							onPress={onClickEdit}
						/>
						<IconButton
							icon={() => (
								<TrashSvg
									width={13.4}
									height={16.4}
									color="#eb2121"
								/>
							)}
							containerColor="#f0f0f0"
							style={tw.style("m-0 w-[34px] h-[34px]")}
							onPress={onClickDelete}
						/>
					</View>
				)}
			</View>

			<FansDivider style={tw.style("h-[1px] my-3")} />
		</View>
	);
};

export default PlayListCard;
