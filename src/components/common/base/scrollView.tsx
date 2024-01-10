import {
	ScrollView,
	Animated,
	NativeScrollEvent,
	ScrollViewProps,
} from "react-native";
import React, { FC, useState, useRef, MutableRefObject } from "react";
import {
	PanGestureHandler,
	PanGestureHandlerGestureEvent,
} from "react-native-gesture-handler";
import {
	useAnimatedGestureHandler,
	useSharedValue,
} from "react-native-reanimated";

import { FansView } from "@components/controls";
import FypNullableView from "./nullableView";

import tw from "@lib/tailwind";

type ContextType = {
	x: number;
	y: number;
};

export const FypHorizontalScrollView: FC<ScrollViewProps> = (props) => {
	const { children, ..._props } = props;
	const x = useSharedValue(0);
	const [completeScrollBarWidth, setCompleteScrollBarWidth] = useState(1);
	const [visibleScrollBarWidth, setVisibleScrollBarWidth] = useState(0);

	const scrollIndicatorSize =
		completeScrollBarWidth > visibleScrollBarWidth
			? (visibleScrollBarWidth * visibleScrollBarWidth) /
			  completeScrollBarWidth
			: visibleScrollBarWidth;
	const scrollIndicator = useRef(new Animated.Value(0)).current;

	const difference =
		visibleScrollBarWidth > scrollIndicatorSize
			? visibleScrollBarWidth - scrollIndicatorSize
			: 1;

	const scrollIndicatorPosition = Animated.multiply(
		scrollIndicator,
		visibleScrollBarWidth / completeScrollBarWidth,
	).interpolate({
		inputRange: [0, difference],
		outputRange: [0, difference],
		extrapolate: "clamp",
	});

	const panGestureEvent = useAnimatedGestureHandler<
		PanGestureHandlerGestureEvent,
		ContextType
	>({
		onActive: (event, context) => {
			context.x = event.translationX + x.value;
			scrollRef.current?.scrollTo({
				x: Math.min(
					Math.max(0, context.x),
					completeScrollBarWidth - visibleScrollBarWidth,
				),
				animated: false,
			});
		},
	});
	const scrollRef =
		useRef<ScrollView | null>() as MutableRefObject<ScrollView | null>;
	return (
		<FansView>
			<ScrollView
				ref={scrollRef}
				horizontal
				scrollEventThrottle={16}
				showsHorizontalScrollIndicator={false}
				onContentSizeChange={(width, _) => {
					setCompleteScrollBarWidth(width);
				}}
				onLayout={(e) => {
					setVisibleScrollBarWidth(e.nativeEvent.layout.width);
				}}
				onScroll={Animated.event(
					[
						{
							nativeEvent: {
								contentOffset: { x: scrollIndicator },
							},
						},
					],
					{
						useNativeDriver: false,
						listener: (event) => {
							x.value = (
								event.nativeEvent as NativeScrollEvent
							).contentOffset.x;
						},
					},
				)}
				{..._props}
			>
				{children}
			</ScrollView>
			<FypNullableView
				visible={completeScrollBarWidth > visibleScrollBarWidth}
			>
				<FansView
					height={6}
					borderRadius={8}
					// background="fans-purple/50"
					style={tw.style("w-full")}
					margin={{ t: 20 }}
				>
					<PanGestureHandler onGestureEvent={panGestureEvent}>
						<Animated.View
							style={{
								height: 6,
								borderRadius: 8,
								backgroundColor: "#bc6ff1",
								width: scrollIndicatorSize,
								transform: [
									{ translateX: scrollIndicatorPosition },
								],
								cursor: "pointer",
							}}
						/>
					</PanGestureHandler>
				</FansView>
			</FypNullableView>
		</FansView>
	);
};
