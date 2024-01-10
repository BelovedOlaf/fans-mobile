import React, { FC, useState, useRef, useEffect } from "react";
import { Image, Platform, View } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import type { ICarouselInstance } from "react-native-reanimated-carousel";
import Carousel from "react-native-reanimated-carousel";
import Animated, {
	useSharedValue,
	useAnimatedStyle,
	withSpring,
} from "react-native-reanimated";
import { Gesture, GestureDetector } from "react-native-gesture-handler";

import tw from "@lib/tailwind";
import { IStory } from "@usertypes/types";
import { cdnURL } from "@helper/Utils";

interface Props {
	stories: IStory[];
	storyIndex: number;
	loading?: boolean;
	onChangeStoryIndex: (index: number) => void;
	onPrev: () => void;
	onNext: () => void;
}

const StoryContents: FC<Props> = (props) => {
	const { stories, onChangeStoryIndex, storyIndex, loading, onPrev, onNext } =
		props;
	const carouselRef = useRef<ICarouselInstance>(null);

	const [width, setWidth] = useState(0);
	const [imgHeight, setImgHeight] = useState(0);

	const offset = useSharedValue(0);
	const positionX = useSharedValue(0);

	const animationStyles = useAnimatedStyle(() => {
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

	const panGesture = Gesture.Pan()
		.onBegin((e) => {
			positionX.value = e.translationX;
		})
		.onEnd((e) => {
			if (positionX.value < e.translationX) {
				onPrev();
			} else {
				onNext();
			}
		});

	useEffect(() => {
		offset.value = storyIndex;
		if (Platform.OS !== "web") {
			carouselRef.current?.scrollTo({ index: storyIndex });
		}
	}, [storyIndex]);

	return (
		<View
			style={tw.style("flex-1 relative")}
			onLayout={(e) => {
				setImgHeight(e.nativeEvent.layout.height);
				setWidth(e.nativeEvent.layout.width);
			}}
		>
			{Platform.OS === "web" && (
				<GestureDetector gesture={panGesture}>
					<View
						style={tw.style(
							"flex-1 relative overflow-hidden md:rounded-[15px]",
						)}
					>
						<Animated.View
							style={[
								tw.style("absolute flex-row top-0 h-full"),
								animationStyles,
							]}
						>
							{stories.map((story, index) => (
								<View
									key={index}
									style={[
										{ width: width },
										tw.style("h-full"),
									]}
								>
									{storyIndex === index ? (
										<Image
											source={{
												uri: cdnURL(story.medias[0]),
											}}
											style={[
												tw.style(
													"h-full md:rounded-[15px]",
												),
											]}
										/>
									) : null}
								</View>
							))}
						</Animated.View>
					</View>
				</GestureDetector>
			)}
			{(Platform.OS === "ios" || Platform.OS === "android") && (
				<Carousel
					loop={false}
					ref={carouselRef}
					width={width}
					height={imgHeight}
					style={tw.style("h-full")}
					autoPlay={false}
					data={stories}
					scrollAnimationDuration={1000}
					onScrollEnd={(index) => onChangeStoryIndex(index)}
					renderItem={({ item, index }) => (
						<View style={tw.style("h-full")} key={index}>
							<Image
								source={{
									uri: cdnURL(item.medias[0]),
								}}
								style={tw.style("w-full h-full")}
							/>
						</View>
					)}
				/>
			)}
			<ActivityIndicator
				animating={true}
				color="#fff"
				style={[
					tw.style("absolute top-1/2 left-1/2", !loading && "hidden"),
					{
						transform: [{ translateX: -12 }, { translateY: -12 }],
					},
				]}
			/>
		</View>
	);
};

export default StoryContents;
