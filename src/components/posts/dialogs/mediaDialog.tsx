import { View, Image } from "react-native";
import React, { FC, useState, useEffect } from "react";
import { Modal, Portal, IconButton } from "react-native-paper";
import { Image as ExpoImage } from "expo-image";

import { CloseSvg, ChevronLeftSvg, ChevronRightSvg } from "@assets/svgs/common";
import { FansView } from "@components/controls";
import { FypVideo } from "@components/common/base";

import tw from "@lib/tailwind";
import { cdnURL } from "@helper/Utils";
import { IMedia } from "@usertypes/types";
import { MediaType, ResizeMode } from "@usertypes/commonEnums";

interface Props {
	visible: boolean;
	handleClose: () => void;
	selectedId: string;
	data: IMedia[];
}

const MediaDialog: FC<Props> = (props) => {
	const { visible, handleClose, selectedId, data } = props;
	const [index, setIndex] = useState(0);
	// const [url, setUrl] = useState("");
	const [imgHeight, setImgHeight] = useState(400);

	const handlePrev = () => {
		// setUrl(data[index - 1].url || data[index - 1].blurhash || "");
		setIndex(index - 1);
	};

	const handleNext = () => {
		// setUrl(data[index + 1].url || data[index + 1].blurhash || "");
		setIndex(index + 1);
	};

	useEffect(() => {
		const _index = data.findIndex((media) => media.id === selectedId);
		setIndex(_index);
		// setUrl(data[_index]?.url ?? "");
	}, [selectedId]);

	return (
		<Portal>
			<Modal
				visible={visible}
				onDismiss={handleClose}
				contentContainerStyle={[
					tw.style(
						"mx-[18px] w-full mx-auto h-full relative md:w-full md:max-w-[740px] md:mx-auto",
					),
					{
						shadowOpacity: 0,
					},
				]}
			>
				<View
					style={tw.style("bg-white relative")}
					onLayout={(e) => setImgHeight(e.nativeEvent.layout.width)}
				>
					{data[index]?.type === MediaType.Video ? (
						<>
							{data[index].blurhash ? (
								<ExpoImage
									source={data[index].blurhash}
									contentFit="cover"
									style={[
										tw.style("w-full bg-fans-grey"),
										{ height: imgHeight },
									]}
								/>
							) : (
								<FypVideo
									source={{
										uri: cdnURL(data[index].url) ?? "",
									}}
									style={[
										tw.style("w-full bg-fans-grey"),
										{ height: imgHeight },
									]}
									resizeMode={ResizeMode.CONTAIN}
								/>
							)}
						</>
					) : null}
					{data[index]?.type === MediaType.Image ? (
						<>
							{data[index].blurhash ? (
								<ExpoImage
									source={data[index].blurhash}
									contentFit="cover"
									style={[
										tw.style("w-full bg-fans-grey"),
										{ height: imgHeight },
									]}
								/>
							) : (
								<Image
									source={{
										uri: cdnURL(data[index].url ?? ""),
									}}
									style={[
										tw.style("w-full bg-fans-grey"),
										{ height: imgHeight },
									]}
								/>
							)}
						</>
					) : null}

					{index > 0 ? (
						<IconButton
							icon={() => (
								<ChevronLeftSvg
									height={12.28}
									width={6.14}
									color="#fff"
								/>
							)}
							size={13}
							style={tw.style(
								"absolute left-4 top-1/2 z-10 bg-fans-purple",
							)}
							onPress={handlePrev}
						/>
					) : null}

					{index < data.length - 1 ? (
						<IconButton
							icon={() => (
								<FansView
									style={tw.style("w-[6.14px] h-[12.28px]")}
								>
									<ChevronRightSvg
										color={tw.color("fans-white")}
									/>
								</FansView>
							)}
							size={13}
							style={tw.style(
								"absolute right-4 top-1/2 z-10 bg-fans-purple",
							)}
							onPress={handleNext}
						/>
					) : null}
				</View>
				<IconButton
					icon={() => (
						<CloseSvg width={13} height={13} color="#fff" />
					)}
					containerColor="rgba(0,0,0,0.3)"
					style={tw.style(
						"m-0 w-[30px] h-[30px] absolute top-5 right-5",
					)}
					onPress={handleClose}
				/>
			</Modal>
		</Portal>
	);
};

export default MediaDialog;
