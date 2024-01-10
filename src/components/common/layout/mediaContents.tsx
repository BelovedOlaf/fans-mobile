import { View, Text, Image, Pressable } from "react-native";
import React, { useEffect, useState, Fragment } from "react";
import { Video, ResizeMode } from "expo-av";
import { useSegments, useLocalSearchParams } from "expo-router";
import { Image as ExpoImage } from "expo-image";

import { MediaDialog } from "@components/posts/dialogs";
import { FypNullableView } from "@components/common/base";

import tw from "@lib/tailwind";
import * as apis from "@helper/endpoints";
import { CommonActionType, useAppContext } from "@context/useAppContext";
import { MediaType } from "@usertypes/commonEnums";
import { cdnURL } from "@helper/Utils";

const MediaContents = () => {
	const segments = useSegments();
	const { username } = useLocalSearchParams();

	const { state, dispatch } = useAppContext();
	const { userInfo } = state.user;
	const { profile } = state;
	const { suggestedCreators, postMedias } = state.common;

	const [openModal, setOpenModal] = useState(false);
	const [selectedMediaId, setSelectedMediaId] = useState("");

	const fetchCreatorMedias = async () => {
		const creator = await apis.profile.getCreatorProfileByLink({
			profileLink: username as string,
		});
		if (creator.ok) {
			fetchMedias(creator.data.userId);
		}
	};

	const fetchMedias = async (userId: string) => {
		if (userId === "0") {
			return;
		}
		const resp = await apis.media.getPostMediasByUserId({ id: userId });
		if (resp.ok) {
			dispatch.setCommon({
				type: CommonActionType.setPostMedias,
				data: resp.data.medias.filter(
					(media) =>
						media.type === MediaType.Image ||
						media.type === MediaType.Video,
				),
			});
		}
	};

	const handleClickMedia = (mediaId: string) => {
		setSelectedMediaId(mediaId);
		setOpenModal(true);
	};

	useEffect(() => {
		if (userInfo.id !== "0") {
			if (segments.join("/") === "(tabs)/[username]") {
				fetchCreatorMedias();
			} else {
				fetchMedias(state.profile.userId);
			}
		}
	}, [userInfo.id, suggestedCreators, profile.userId]);

	return (
		<View>
			<FypNullableView visible={postMedias.length > 0}>
				<Text
					style={tw.style(
						"text-[20px] leading-[27px] font-semibold mb-3.5",
					)}
				>
					Media
				</Text>
				<View style={tw.style("flex-row flex-wrap")}>
					{postMedias.slice(0, 6).map((media, index) => (
						<Pressable
							key={media.id}
							style={tw.style("w-1/3 border border-white h-30")}
							onPress={() => handleClickMedia(media.id)}
						>
							{media.type === MediaType.Image ? (
								<>
									{media.blurhash ? (
										<ExpoImage
											source={media.blurhash}
											style={tw.style(
												"w-full border border-white h-full",
												index === 0
													? "rounded-tl-[15px]"
													: "",
												index === 2
													? "rounded-tr-[15px]"
													: "",
												index === 3
													? "rounded-bl-[15px]"
													: "",
												index === 5
													? "rounded-br-[15px]"
													: "",
											)}
											contentFit="cover"
										/>
									) : (
										<Image
											source={{
												uri: cdnURL(media.url),
											}}
											style={tw.style(
												"w-full border border-white h-full",
												index === 0
													? "rounded-tl-[15px]"
													: "",
												index === 2
													? "rounded-tr-[15px]"
													: "",
												index === 3
													? "rounded-bl-[15px]"
													: "",
												index === 5
													? "rounded-br-[15px]"
													: "",
											)}
											resizeMode="cover"
										/>
									)}
								</>
							) : (
								<>
									{media.blurhash ? (
										<ExpoImage
											source={media.blurhash}
											style={tw.style(
												"w-full border border-white h-full",
												index === 0
													? "rounded-tl-[15px]"
													: "",
												index === 2
													? "rounded-tr-[15px]"
													: "",
												index === 3
													? "rounded-bl-[15px]"
													: "",
												index === 5
													? "rounded-br-[15px]"
													: "",
											)}
											contentFit="cover"
										/>
									) : (
										<Video
											source={{
												uri: cdnURL(media.url) ?? "",
											}}
											resizeMode={ResizeMode.CONTAIN}
											shouldPlay={false}
											style={tw.style(
												"w-full border border-white h-full",
												index === 0
													? "rounded-tl-[15px]"
													: "",
												index === 2
													? "rounded-tr-[15px]"
													: "",
												index === 3
													? "rounded-bl-[15px]"
													: "",
												index === 5
													? "rounded-br-[15px]"
													: "",
											)}
										/>
									)}
								</>
							)}
						</Pressable>
					))}
				</View>
			</FypNullableView>
			<MediaDialog
				visible={openModal}
				handleClose={() => setOpenModal(false)}
				selectedId={selectedMediaId}
				data={postMedias.slice(0, 6)}
			/>
		</View>
	);
};

export default MediaContents;
