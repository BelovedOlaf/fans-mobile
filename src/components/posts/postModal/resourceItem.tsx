import { CloseSvg } from "@assets/svgs/common";
import { cdnURL } from "@helper/Utils";
import tw from "@lib/tailwind";
import { MediaType, ResizeMode } from "@usertypes/commonEnums";
import { IPickerMedia } from "@usertypes/types";
import { Video } from "expo-av";
import React, { FC } from "react";
import { Image, Pressable, View } from "react-native";

interface Props {
	data: IPickerMedia;
	onClose: () => void;
	mediaType: MediaType;
	onSelect: () => void;
}

const ResourceItem: FC<Props> = (props) => {
	const { data, onClose, mediaType, onSelect } = props;
	return (
		<View style={tw.style("w-20 h-20 xl:w-[117px] xl:h-[117px] relative")}>
			{mediaType === MediaType.Image ? (
				<Pressable onPress={onSelect} style={tw.style("w-full h-full")}>
					<Image
						source={{
							uri: cdnURL(data.uri),
						}}
						style={tw.style("w-full h-full rounded-[7px]")}
					/>
				</Pressable>
			) : (
				<Pressable onPress={onSelect} style={tw.style("w-full h-full")}>
					<Video
						source={{
							uri: cdnURL(data.uri),
						}}
						style={tw.style("w-full h-full rounded-[7px] bg-black")}
						resizeMode={ResizeMode.CONTAIN}
						videoStyle={tw.style("w-full my-auto")}
					/>
				</Pressable>
			)}

			<Pressable
				style={tw.style(
					"w-5 h-5 xl:w-7.5 xl:h-7.5 bg-[rgba(0,0,0,0.45)] rounded-full items-center justify-center absolute top-2 right-1.5",
				)}
				onPress={onClose}
			>
				<CloseSvg
					size={15}
					color="#fff"
					style={tw.style("w-2.5 xl:w-[15px] h-2.5 xl:h-[15px]")}
				/>
			</Pressable>
		</View>
	);
};

export default ResourceItem;
