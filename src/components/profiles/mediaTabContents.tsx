import {
	FilterSvg,
	MediaDocSvg,
	OutlineCamera,
	RecordSvg,
	SearchSvg,
} from "@assets/svgs/common";
import RoundTextInput from "@components/common/RoundTextInput";
import { MediaDialog } from "@components/posts/dialogs";
import MediaItem from "./mediaItem";
import { SubscribeAlert } from "@components/profiles";

import tw from "@lib/tailwind";
import { MediasRespBody } from "@helper/endpoints/media/schemas";
import { MediaType } from "@usertypes/commonEnums";
import { ISubscription } from "@usertypes/types";

import React, { FC, useState } from "react";
import { Pressable, Text, View } from "react-native";
import Collapsible from "react-native-collapsible";

interface Props {
	allCounts: number;
	medias: MediasRespBody;
	mediaType: MediaType;
	onChangeFilter: (val: MediaType) => void;
	needToSubscribe?: boolean;
	onClickSubscribe?: () => void;
	subscription?: ISubscription;
}

const MediaTabContents: FC<Props> = (props) => {
	const {
		medias,
		mediaType,
		onChangeFilter,
		allCounts,
		needToSubscribe,
		onClickSubscribe,
		subscription,
	} = props;

	const [width, setWidth] = useState(0);
	const [actionType, setActionType] = useState("");
	const [openModal, setOpenModal] = useState(false);
	const [selectedMediaId, setSelectedMediaId] = useState("");

	const onClickMedia = (mediaId: string) => {
		setSelectedMediaId(mediaId);
		setOpenModal(true);
	};

	return (
		<View
			style={tw.style("pt-4")}
			onLayout={(e) => setWidth(e.nativeEvent.layout.width)}
		>
			<View style={tw.style("px-[18px] md:px-0")}>
				<SubscribeAlert
					icon="media"
					hide={!needToSubscribe}
					text={`To view ${allCounts} medias, subscribe to this creator`}
					onSubscribe={onClickSubscribe}
				/>
			</View>

			<View
				style={tw.style("flex-row mb-4", needToSubscribe && "hidden")}
			>
				<View
					style={tw.style(
						"items-center gap-x-6 flex-row ml-auto pr-[26px]",
					)}
				>
					{/* <Pressable onPress={() => setActionType("search")}>
						<SearchSvg
							width={18}
							height={18.13}
							color={actionType === "search" ? "#a854f5" : "#000"}
						/>
					</Pressable> */}

					<Pressable>
						<MediaDocSvg width={17} height={18} color="#000" />
					</Pressable>

					<Pressable onPress={() => setActionType("filter")}>
						<FilterSvg
							width={16.76}
							height={14.05}
							color={actionType === "filter" ? "#a854f5" : "#000"}
						/>
					</Pressable>
				</View>
			</View>

			{/* <ScrollView
				horizontal
				contentContainerStyle={{
					paddingHorizontal: 18,
					columnGap: 7,
					marginBottom: 24,
				}}
				showsHorizontalScrollIndicator={false}
			>
				{filters.map((el) => (
					<FilterButton
						title={el}
						selected={filter === el}
						onClick={() => setFilter(el)}
						key={el}
					/>
				))}
			</ScrollView> */}
			<Collapsible collapsed={actionType === ""}>
				<View
					style={tw.style("mx-[18px] border-t border-fans-grey py-3")}
				>
					{actionType === "search" && (
						<RoundTextInput
							placeholder="Search media"
							customStyles="pl-11"
							icon={
								<SearchSvg
									width={15.14}
									height={15.26}
									color="#000"
								/>
							}
						/>
					)}
					{actionType === "filter" && (
						<View
							style={tw.style(
								"flex-row items-center justify-between",
							)}
						>
							<Pressable
								onPress={() => onChangeFilter(MediaType.All)}
							>
								<Text
									style={tw.style(
										"text-[17px] leading-[22px] font-medium text-[#9d9d9d]",
										{
											"text-fans-purple":
												mediaType === MediaType.All,
										},
									)}
								>
									{`All ${allCounts}`}
								</Text>
							</Pressable>

							<Pressable
								onPress={() => onChangeFilter(MediaType.Image)}
								style={tw.style("flex-row items-center")}
							>
								<OutlineCamera
									width={23.54}
									height={20.42}
									color={
										mediaType === MediaType.Image
											? "#a854f5"
											: "#9d9d9d"
									}
								/>
								<Text
									style={tw.style(
										"text-[17px] leading-[22px] font-medium text-[#9d9d9d] ml-2",
										{
											"text-fans-purple":
												mediaType === MediaType.Image,
										},
									)}
								>
									{medias.imageTotal}
								</Text>
							</Pressable>

							<Pressable
								onPress={() => onChangeFilter(MediaType.Video)}
								style={tw.style("flex-row items-center")}
							>
								<RecordSvg
									width={23.54}
									height={20.42}
									color={
										mediaType === MediaType.Video
											? "#a854f5"
											: "#9d9d9d"
									}
								/>
								<Text
									style={tw.style(
										"text-[17px] leading-[22px] font-medium text-[#9d9d9d] ml-2",
										{
											"text-fans-purple":
												mediaType === MediaType.Video,
										},
									)}
								>
									{medias.videoTotal}
								</Text>
							</Pressable>
						</View>
					)}
				</View>
			</Collapsible>

			<View style={tw.style("flex-row flex-wrap relative")}>
				{(needToSubscribe ? [] : medias.medias).map((media) => (
					<MediaItem
						key={media.id}
						data={media}
						onPress={() => onClickMedia(media.id)}
						size={width / 3}
					/>
				))}
			</View>

			<MediaDialog
				visible={openModal}
				handleClose={() => setOpenModal(false)}
				selectedId={selectedMediaId}
				data={medias.medias}
			/>
		</View>
	);
};

export default MediaTabContents;
