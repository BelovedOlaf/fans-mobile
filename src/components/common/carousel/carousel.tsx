import { View, Platform, Pressable, Image } from "react-native";
import React, { FC, useState, useEffect } from "react";
import Carousel from "react-native-reanimated-carousel";
import Animated, {
	useSharedValue,
	useAnimatedStyle,
	withSpring,
} from "react-native-reanimated";
import { Image as EImage } from "expo-image";
import { Gesture, GestureDetector } from "react-native-gesture-handler";

import Indicator from "./indicator";
import Badge from "./badge";
import { FansView } from "@components/controls";
import ArrowButton from "./arrowButton";
import { FypNullableView, FypVideo } from "@components/common/base";

import tw from "@lib/tailwind";
import { MediaType, ResizeMode } from "@usertypes/commonEnums";
import { cdnURL } from "@helper/Utils";

interface Props {
	id?: string;
	width: number;
	height: number;
	medias: Array<{ url?: string; blurhash?: string; mediaType: MediaType }>;
	resizeMode: ResizeMode;
	onClickItem?: (index: number) => void;
	showBadge?: boolean;
	defaultIndex?: number;
	useButtons?: boolean;
}

const FansCarousel: FC<Props> = (props) => {
	const {
		id,
		width,
		height,
		medias,
		resizeMode,
		onClickItem,
		showBadge,
		defaultIndex = 0,
		useButtons,
	} = props;
	const [imgIndex, setImgIndex] = useState(0);
	const offset = useSharedValue(0);
	const positionX = useSharedValue(0);

	const [carouselPayingVideoId, setCarouselPlayingVideoId] = useState("");

	const carouselStyles = useAnimatedStyle(() => {
		return {
			transform: [
				{
					translateX: withSpring(offset.value * width * -1, {
						damping: 90,
						stiffness: 90,
					}),
				},
			],
		};
	});

	const handlePrev = () => {
		if (imgIndex === 0 || medias.length === 0) {
			return;
		}
		setCarouselPlayingVideoId(`${id}-${imgIndex - 1}`);
		setImgIndex(imgIndex - 1);
		offset.value = offset.value - 1;
	};

	const handleNext = () => {
		if (imgIndex === medias.length - 1 || medias.length === 0) {
			return;
		}
		setCarouselPlayingVideoId(`${id}-${imgIndex + 1}`);
		setImgIndex(imgIndex + 1);
		offset.value = offset.value + 1;
	};

	const handleGoToIndex = (index: number) => {
		setCarouselPlayingVideoId(`${id}-${index}`);
		setImgIndex(index);
		offset.value = index;
	};

	const panGesture = Gesture.Pan()
		.onBegin((e) => {
			positionX.value = e.translationX;
		})
		.onUpdate(() => {
			return;
		})
		.onEnd((e) => {
			if (positionX.value < e.translationX) {
				handlePrev();
			} else {
				handleNext();
			}
		});

	const longPressGesture = Gesture.Tap().onEnd((e, success) => {
		if (success && onClickItem) {
			if (medias[imgIndex].mediaType !== MediaType.Video && onClickItem) {
				onClickItem(imgIndex);
			}
		}
	});
	useEffect(() => {
		setImgIndex(defaultIndex);
		offset.value = defaultIndex;
	}, [defaultIndex]);

	return (
		<View>
			<FypNullableView visible={Platform.OS === "web" && !useButtons}>
				<GestureDetector gesture={panGesture}>
					<View
						style={[
							tw.style("relative"),
							{ height: height, overflow: "hidden" },
						]}
					>
						<GestureDetector gesture={longPressGesture}>
							<Animated.View
								style={[
									tw.style("absolute flex-row top-0"),
									carouselStyles,
								]}
							>
								{medias.map((el, index) => (
									<View
										key={index}
										style={{ width: width, height: height }}
									>
										{el.mediaType === MediaType.Image ? (
											<FansView
												position="relative"
												style={tw.style(
													"w-full h-full",
												)}
											>
												<EImage
													source={{
														uri: cdnURL(el.url),
													}}
													style={[
														tw.style(
															"w-full h-full",
														),
													]}
													resizeMode={resizeMode}
												/>
												<FansView
													position="absolute"
													style={tw.style(
														"w-full h-full top-0 left-0",
													)}
												></FansView>
											</FansView>
										) : (
											<FypVideo
												id={`${id}-${index}`}
												carouselPayingVideoId={
													carouselPayingVideoId
												}
												source={{
													uri: cdnURL(el.url) ?? "",
												}}
												style={[
													tw.style("w-full h-full"),
												]}
												resizeMode={resizeMode}
											/>
										)}
									</View>
								))}
							</Animated.View>
						</GestureDetector>
					</View>
				</GestureDetector>
			</FypNullableView>

			<FypNullableView visible={Platform.OS === "web" && !!useButtons}>
				<View
					style={[
						tw.style("relative"),
						{ height: height, overflow: "hidden" },
					]}
				>
					<Animated.View
						style={[
							tw.style("absolute flex-row top-0"),
							carouselStyles,
						]}
					>
						{medias.map((item, index) => (
							<Pressable
								key={index}
								style={{ width: width, height: height }}
								onPress={() => {
									if (
										onClickItem &&
										item.mediaType !== MediaType.Video
									) {
										onClickItem(index);
									}
								}}
							>
								{item.mediaType === MediaType.Image ? (
									<Image
										source={{
											uri: cdnURL(item.url),
										}}
										style={[tw.style("w-full h-full")]}
										resizeMode={resizeMode}
									/>
								) : (
									<FypVideo
										id={`${id}-${index}`}
										carouselPayingVideoId={
											carouselPayingVideoId
										}
										source={{
											uri: cdnURL(item.url) ?? "",
										}}
										style={[tw.style("w-full h-full")]}
										resizeMode={resizeMode}
									/>
								)}
							</Pressable>
						))}
					</Animated.View>
				</View>
				<ArrowButton
					type="left"
					onPress={handlePrev}
					style={tw.style("left-4 top-1/2")}
					hide={imgIndex === 0 || medias.length === 0}
				/>
				<ArrowButton
					type="right"
					onPress={handleNext}
					style={tw.style("right-4 top-1/2")}
					hide={imgIndex === medias.length - 1 || medias.length === 0}
				/>
			</FypNullableView>
			<Indicator
				index={imgIndex}
				length={medias.length}
				onClickDot={handleGoToIndex}
			/>
			{(Platform.OS === "ios" || Platform.OS === "android") && (
				<Carousel
					loop={false}
					width={width}
					height={height}
					style={tw.style("h-full")}
					autoPlay={false}
					data={medias}
					scrollAnimationDuration={1000}
					onScrollEnd={(index) => setImgIndex(index)}
					renderItem={({ item, index }) => {
						return (
							<Pressable
								style={tw.style("w-full h-full")}
								onPress={() => {
									if (
										onClickItem &&
										item.mediaType !== MediaType.Video
									) {
										onClickItem(index);
									}
								}}
								key={index}
							>
								{item.mediaType === MediaType.Image ? (
									<EImage
										source={{
											uri: cdnURL(item.url),
										}}
										style={[tw.style("w-full h-full")]}
										resizeMode={resizeMode}
									/>
								) : (
									<FypVideo
										id={`${id}-${index}`}
										source={{
											uri: cdnURL(item.url) ?? "",
										}}
										resizeMode={resizeMode}
									/>
								)}
							</Pressable>
						);
					}}
				/>
			)}
			<FypNullableView visible={!!showBadge}>
				<Badge index={imgIndex} length={medias.length} />
			</FypNullableView>
		</View>
	);
};

export default FansCarousel;
