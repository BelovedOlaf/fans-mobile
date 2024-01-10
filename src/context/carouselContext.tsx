import React, { useContext } from "react";
import { useMemo, useRef } from "react";
import { GestureType } from "react-native-gesture-handler/lib/typescript/handlers/gestures/gesture";
import Animated, {
	useDerivedValue,
	useSharedValue,
	withSpring,
} from "react-native-reanimated";

import { ICarouselMedia } from "@usertypes/types";

type CarouselContextValue = {
	panRef: React.MutableRefObject<GestureType | undefined>; // the panGesture Handler ref from the carousel, needed so we can pass to the drag and drop simultaneousHandlers
	swipe: (
		translateX: Animated.SharedValue<number>,
		dest: number,
		velocity: number,
		direction: "left" | "right",
	) => void;
	minimumTouchCheck: (prev: number, curr: number) => boolean;
	prevSnap: Readonly<Animated.SharedValue<number>>;
	currentSnap: Readonly<Animated.SharedValue<number>>;
	nextSnap: Readonly<Animated.SharedValue<number>>;
	translationX: Animated.SharedValue<number>;
	slideWidth: number;
	slideHeight: number;
	slideData: ICarouselMedia[];
	activeIndex: number;
};

const CarouselContext = React.createContext<CarouselContextValue | undefined>(
	undefined,
);

export default function CarouselContextProvider({
	children,
	data,
	slideWidth,
	slideHeight,
}: {
	children: React.ReactNode;
	data: ICarouselMedia[];
	slideWidth: number;
	slideHeight: number;
}) {
	const panRef = useRef<GestureType | undefined>(undefined); // Store the ref to the carousel's pan gesture so we can pass it to the drag and drop's simultaneous handlers

	const activeIndex = useSharedValue<number>(0); // index of the currently centered slide
	const translationX = useSharedValue<number>(0); // The current translation of the whole carousel

	const currentSnap = useDerivedValue(
		() => -(activeIndex.value * slideWidth),
		[activeIndex.value],
	);

	const prevSnap = useDerivedValue(
		() => -((activeIndex.value - 1) * slideWidth),
		[activeIndex.value],
	);

	const nextSnap = useDerivedValue(
		() => -((activeIndex.value + 1) * slideWidth),
		[activeIndex.value],
	);

	const MIN_TOUCH = 40;

	const minimumTouchCheck = (prev: number, curr: number) => {
		"worklet";
		return prev > curr + MIN_TOUCH || prev < curr - MIN_TOUCH;
	};

	const swipe = (
		translateX: Animated.SharedValue<number>,
		dest: number,
		velocity: number,
		direction: "left" | "right",
	) => {
		"worklet";

		//Prevents carousel swiping to the left of the first slide
		if (activeIndex.value <= 0 && direction === "right") {
			dest = 0;
		}

		//Prevents carousel swiping beyond the last slide
		if (activeIndex.value >= data.length - 1 && direction === "left") {
			dest = -(data.length - 1) * slideWidth;
		}

		translateX.value = withSpring(
			dest,
			{
				mass: 1,
				velocity,
				damping: 20,
			},
			() => {
				// set the active index according to the final destination
				activeIndex.value = Math.ceil(Math.abs(dest / slideWidth));
			},
		);
	};

	const values = useMemo(
		() => ({
			panRef,
			swipe,
			minimumTouchCheck,
			prevSnap,
			currentSnap,
			nextSnap,
			translationX,
			slideWidth,
			slideHeight,
			activeIndex: activeIndex.value,
			slideData: data,
		}),
		[
			panRef,
			swipe,
			minimumTouchCheck,
			prevSnap,
			currentSnap,
			nextSnap,
			translationX,
			slideWidth,
			slideHeight,
			activeIndex.value,
			data,
		],
	);

	return (
		<CarouselContext.Provider value={values}>
			{children}
		</CarouselContext.Provider>
	);
}

export function useCarouselValues() {
	const value = useContext(CarouselContext);
	if (!value) {
		throw new Error(
			"useCarouselValues must be called from within a CarouselContext.Provider!",
		);
	}
	return value as CarouselContextValue;
}
