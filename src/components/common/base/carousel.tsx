import { View, Image, Pressable } from "react-native";
import React, { FC } from "react";
import { snapPoint } from "react-native-redash";
import Animated, {
	useAnimatedStyle,
	useSharedValue,
} from "react-native-reanimated";
import { Gesture, GestureDetector } from "react-native-gesture-handler";

import FypVideo from "./video";
import FypText from "./text";
import FypNullableView from "./nullableView";
import { FansView } from "@components/controls";

import tw from "@lib/tailwind";
import { ICarouselMedia } from "@usertypes/types";
import CarouselContextProvider, {
	useCarouselValues,
} from "@context/carouselContext";
import { MediaType, ResizeMode } from "@usertypes/commonEnums";
import { cdnURL } from "@helper/Utils";

interface IndicatorProps {
	index: number;
	length: number;
	onClickDot: (index: number) => void;
}

const Indicator: FC<IndicatorProps> = (props) => {
	const { index, length, onClickDot } = props;
	return (
		<View
			style={tw.style(
				"absolute bottom-5 gap-x-[5px] left-0 flex-row w-full justify-center",
				length === 0 || length === 1 ? "hidden" : "",
			)}
		>
			{[...Array(length)].map((el, ix) => (
				<Pressable
					key={ix}
					style={tw.style(
						"w-[5px] h-[5px] rounded-full",
						ix === index
							? "bg-white"
							: "bg-[rgba(255,255,255,0.45)]",
					)}
					onPress={() => onClickDot(ix)}
				></Pressable>
			))}
		</View>
	);
};

interface BadgeProps {
	index: number;
	length: number;
}

const Badge: FC<BadgeProps> = (props) => {
	const { index, length } = props;
	return (
		<View
			style={tw.style(
				"absolute top-[20px] right-[17.5px] px-[8.5px] py-[3.5px] rounded-[20px] bg-[rgba(0,0,0,0.5)]",
				(length === 0 || length === 1) && "hidden",
			)}
		>
			<FypText color="white" fontSize={14} lineHeight={20}>
				{`${index + 1}/${length}`}
			</FypText>
		</View>
	);
};

interface CarouselContentProps {
	size: number;
	resizeMode: ResizeMode;
	onClickItem?: () => void;
	showBadge?: boolean;
}

export const CarouselContent: FC<CarouselContentProps> = (props) => {
	const { resizeMode, onClickItem, showBadge } = props;
	const {
		panRef,
		minimumTouchCheck,
		translationX,
		prevSnap,
		currentSnap,
		nextSnap,
		swipe,
		slideWidth,
		slideHeight,
		slideData,
		activeIndex,
	} = useCarouselValues();

	const offsetX = useSharedValue<number>(0);

	const longPressGesture = Gesture.Tap().onEnd((e, success) => {
		if (success && onClickItem) {
			onClickItem();
		}
	});
	const panGesture = Gesture.Pan()
		.onBegin(() => {
			offsetX.value = translationX.value;
		})
		.onUpdate((e) => {
			if (minimumTouchCheck(translationX.value, e.translationX)) {
				translationX.value = offsetX.value + e.translationX;
			}
		})
		.onEnd((e) => {
			const snapPoints = [
				prevSnap.value,
				currentSnap.value,
				nextSnap.value,
			];
			const dest = snapPoint(translationX.value, e.velocityX, snapPoints);
			const direction = e.velocityX < 0 ? "left" : "right";

			swipe(translationX, dest, 5, direction);
		})
		.withRef(panRef);

	const animatedStyle = useAnimatedStyle(() => {
		return {
			transform: [{ translateX: translationX.value }],
		};
	});

	return (
		<FansView position="relative" style={tw.style("h-full")}>
			<GestureDetector gesture={panGesture}>
				<GestureDetector gesture={longPressGesture}>
					<Animated.View
						style={[
							tw.style(
								"items-center flex-row absolute top-0 left-0",
							),
							{
								height: slideHeight,
							},
							animatedStyle,
						]}
					>
						{slideData.map((media, index) => (
							<View
								style={[
									{ width: slideWidth, height: slideHeight },
								]}
								key={`${index}-${media.url}`}
							>
								{media.mediaType === MediaType.Image ? (
									<Image
										source={{
											uri: cdnURL(media.url),
										}}
										style={[tw.style("w-full h-full")]}
										resizeMode="cover"
									/>
								) : (
									<FypVideo
										source={{
											uri: cdnURL(media.url) ?? "",
										}}
										style={[tw.style("w-full h-full")]}
										resizeMode={resizeMode}
									/>
								)}
							</View>
						))}
					</Animated.View>
				</GestureDetector>
			</GestureDetector>
			<FypNullableView visible={!!showBadge}>
				<Badge index={activeIndex} length={slideData.length} />
			</FypNullableView>
			<Indicator
				index={activeIndex}
				length={slideData.length}
				onClickDot={() => {}}
			/>
		</FansView>
	);
};

interface Props {
	size: number;
	medias: Array<ICarouselMedia>;
	resizeMode: ResizeMode;
	onClickItem?: () => void;
	showBadge?: boolean;
}

const FypCarousel: FC<Props> = (props) => {
	const { size, medias, resizeMode, onClickItem, showBadge } = props;
	return (
		<CarouselContextProvider
			data={medias}
			slideWidth={size}
			slideHeight={size}
		>
			<View
				style={[
					tw.style("relative"),
					{ overflow: "hidden", width: size, height: size },
				]}
			>
				<CarouselContent
					size={size}
					resizeMode={resizeMode}
					onClickItem={onClickItem}
					showBadge={showBadge}
				/>
			</View>
		</CarouselContextProvider>
	);
};

export default FypCarousel;
