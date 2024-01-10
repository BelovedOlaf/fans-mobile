import { View, Pressable, Image } from "react-native";
import React, { FC } from "react";
import { Video } from "expo-av";
import tw from "@lib/tailwind";
import { Image as ExpoImage } from "expo-image";
import { MusicSvg } from "@assets/svgs/common";
import { IMedia } from "@usertypes/types";
import { MediaType, ResizeMode } from "@usertypes/commonEnums";
import { cdnURL } from "@helper/Utils";

interface Props {
	size: number;
	onPress: () => void;
	data: IMedia;
}

const MediaItem: FC<Props> = (props) => {
	const { size, onPress, data } = props;

	return (
		<Pressable
			style={[
				tw.style("border border-white relative"),
				{ width: size, height: size },
			]}
			onPress={onPress}
		>
			{data.type === MediaType.Image && (
				<>
					{data.blurhash ? (
						<ExpoImage
							source={data.blurhash}
							style={tw.style("w-full h-full")}
							contentFit="cover"
						/>
					) : (
						<Image
							source={{
								uri: cdnURL(data.url),
							}}
							style={tw.style("w-full h-full")}
							resizeMode="cover"
						/>
					)}
				</>
			)}
			{data.type === MediaType.Video ? (
				<>
					{data.blurhash ? (
						<ExpoImage
							source={data.blurhash}
							style={tw.style("w-full h-full")}
							contentFit="cover"
						/>
					) : (
						<Video
							source={{
								uri: cdnURL(data.url) ?? "",
							}}
							style={tw.style("w-full h-full")}
							resizeMode={ResizeMode.CONTAIN}
						/>
					)}
				</>
			) : null}
			{data.type === MediaType.Audio ? (
				<View
					style={tw.style(
						"w-full h-full flex-row items-center justify-center",
					)}
				>
					<MusicSvg size={58} color="#a854f5" />
				</View>
			) : null}
		</Pressable>
	);
};

export default MediaItem;
