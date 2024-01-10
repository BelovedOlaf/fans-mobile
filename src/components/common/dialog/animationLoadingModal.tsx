import { Modal, Dimensions, useWindowDimensions } from "react-native";
import React, { useEffect, useState } from "react";
import Animated, {
	useAnimatedStyle,
	useSharedValue,
	withRepeat,
	withTiming,
} from "react-native-reanimated";

import { FansView } from "@components/controls";
import { FypLinearGradientView, FypText } from "@components/common/base";
import { ChevronUp1Svg, SingleGem } from "@assets/svgs/common";

import tw from "@lib/tailwind";
import { ANIMATION_LOADING_DIALOG_ID } from "@constants/modal";
import { ModalState } from "@context/state/modalState";
import { useAppContext } from "@context/useAppContext";

const duration = 12000;

const textArray = [
	"You can download our app for easy access and push notifications",
	"A bolt of lightning is five times hotter than the sun's surface.",
	"The Eiffel Tower can be 15 cm taller during the summer.",
	"Cleopatra lived closer to the invention of smartphones than to pyramids.",
	"Sharks have been around longer than trees in Earth's history.",
	"There are more stars in the universe than grains of sand on Earth.",
	"The Sahara Desert used to be a lush, tropical rainforest.",
	"A group of flamingos is called a 'flamboyance'.",
	"A snail can sleep for three years while waiting for suitable weather.",
	"Penguins can leap 6 feet out of water onto land.",
	"The moon moves 3.8 cm away from Earth every year.",
	"Experience innovation: New unique features launched weekly on FYP.Fans!",
	"FYP.Fans: First premium platform integrating AI tools for creative minds.",
	"Discover FYP.Bio, the ultimate link-in-bio tool, part of our family.",
	"Earn XP and level up by supporting creators on FYP.Fans.",
	"Customize your fan profile on FYP.Fans and showcase your unique style.",
	"Join FYP.Fans, where anyone can become a creator and monetize content.",
	"Need help? Reach out to support@fyp.fans for prompt assistance.",
	"Unsatisfied? FYP.Fans offers a 100% refund for content concerns.",
	"Your creativity, our platform: Elevate your content on FYP.Fans.",
];

const AnimationLoadingModal = () => {
	const { state } = useAppContext();
	const modals = state.modal.modals;
	const modal = modals.find(
		(m) => m.id === ANIMATION_LOADING_DIALOG_ID,
	) as ModalState<{
		postId: string;
	}>;
	const visible = !!modal && modal.show;

	const sv = useSharedValue(0);
	const { height: screenHeight } = useWindowDimensions();

	const iconWidth = tw.prefixMatch("md") ? 158 : 116;
	const [textIndex, setTextIndex] = useState(Math.floor(Math.random() * 19));

	useEffect(() => {
		sv.value = withRepeat(withTiming(1, { duration }), -1);
	}, []);

	const animatedStyle = useAnimatedStyle(() => ({
		width: iconWidth * sv.value,
	}));

	useEffect(() => {
		if (visible) {
			const interval = setInterval(() => {
				setTextIndex(textIndex === 19 ? 0 : textIndex + 1);
			}, 5000);
			return () => clearInterval(interval);
		}
	}, [textIndex, visible]);

	return (
		<Modal transparent visible={visible}>
			<FansView width="screen" height="screen" position="relative">
				<FypLinearGradientView
					colors={["#1d23e5", "#a854f5", "#d885ff"]}
					style={tw.style("w-full h-full top-0 left-0 opacity-74")}
					position="absolute"
				></FypLinearGradientView>
				<FansView
					position="relative"
					style={tw.style(
						"w-full h-full justify-between md:justify-start",
						`pt-[${screenHeight * 0.41}px] pb-12 md:pb-0`,
					)}
					alignItems="center"
				>
					<FansView
						position="relative"
						width={{ xs: 116, md: 158 }}
						height={{ xs: 116, md: 158 }}
					>
						<SingleGem
							style={tw.style("w-full h-full")}
							color="rgba(255,255,255,0.26)"
						/>
						<Animated.View
							style={[
								tw.style(
									"h-[116px] md:h-[158px] absolute top-0 left-0",
								),
								animatedStyle,
								{
									overflow: "hidden",
								},
							]}
						>
							<SingleGem
								style={tw.style(
									"h-[116px] md:h-[158px] w-[116px] md:w-[158px]",
								)}
								color="#fff"
							/>
						</Animated.View>
					</FansView>
					<FansView
						gap={{ xs: 18, md: 16 }}
						padding={{ x: 34 }}
						style={tw.style("md:mt-[86px]")}
					>
						<FypText
							fontSize={{ xs: 19, md: 23 }}
							lineHeight={{ xs: 26, md: 31 }}
							fontWeight={700}
							color="white"
							textAlign="center"
						>
							DID YOU KNOW
						</FypText>
						<FypText
							fontSize={{ xs: 16, md: 20 }}
							lineHeight={{ xs: 21, md: 24 }}
							fontWeight={500}
							color="white"
							textAlign="center"
						>
							{textArray[textIndex]}
						</FypText>
					</FansView>
				</FansView>
			</FansView>
		</Modal>
	);
};

export default AnimationLoadingModal;
