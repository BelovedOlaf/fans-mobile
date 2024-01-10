import {
	View,
	Text,
	Image,
	TouchableOpacity,
	Dimensions,
	Platform,
	useWindowDimensions,
} from "react-native";
import React, { useState, useRef, useEffect } from "react";
import { useRouter, Stack, useNavigation } from "expo-router";
import tw from "@lib/tailwind";
import { LinearGradient } from "expo-linear-gradient";
import { IconButton } from "react-native-paper";
import type { ICarouselInstance } from "react-native-reanimated-carousel";
import Carousel from "react-native-reanimated-carousel";
import clsx from "clsx";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { ShareDialog, CommentDialog } from "@components/posts/dialogs";
import Title from "@components/common/Title";
import {
	CommentSvg,
	CloseSvg,
	HeartSvg,
	TipSvg,
	RedirectSvg,
	FilledHeartSvg,
	OutlinedHomeSvg,
	ThreeLineSvg,
	FypFansSvg,
	StarCheckSvg,
	ChevronDownSvg,
	ChevronLeftSvg,
	ChevronRightSvg,
} from "@assets/svgs/common";
import { ComponentSizeTypes } from "@usertypes/commonEnums";
import { useAppContext, CommonActionType } from "@context/useAppContext";
import { FansView } from "@components/controls";

const InteractiveScreen = () => {
	const router = useRouter();
	const navigation = useNavigation();

	const { state, dispatch } = useAppContext();
	const insets = useSafeAreaInsets();
	const carouselRef = useRef<ICarouselInstance>(null);

	const [imgIndex, setImgIndex] = useState(0);
	const [isLiked, setIsLiked] = useState(false);
	const [data, setData] = useState([
		"https://images.unsplash.com/photo-1612144431180-2d672779556c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=735&q=80",
		"https://images.unsplash.com/photo-1556742044-3c52d6e88c62?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
	]);

	const [openShare, setOpenShare] = useState(false);
	const [openComment, setOpenComment] = useState(false);

	const { width, height } = useWindowDimensions();

	const handleOpenGemModal = () => {
		dispatch.setCommon({
			type: CommonActionType.toggleSendTipModal,
			data: {
				visible: true,
				creator: state.profile,
			},
		});
	};

	const handleOpenSidebar = () => {
		dispatch.setCommon({
			type: CommonActionType.toggleSidebar,
			data: true,
		});
	};

	useEffect(() => {
		navigation
			.getParent()
			?.setOptions({ tabBarStyle: { display: "none" } });
		return () => {
			navigation
				.getParent()
				?.setOptions({ tabBarStyle: { display: "block" } });
		};
	}, [navigation]);

	return (
		<View style={tw.style("bg-black flex-1 relative")}>
			<LinearGradient
				colors={[
					"rgba(112,112,112,0.43)",
					"rgba(112,112,112,0.43)",
					"rgba(255,255,255,0)",
				]}
				start={[0, 0]}
				end={[0, 1]}
				locations={[0, 0.3, 1]}
				style={tw.style(
					"px-[18px] absolute top-0 left-0 w-full h-[176px] z-10 pt-3",
				)}
			>
				<IconButton
					icon={() => (
						<CloseSvg color="#fff" width={11.5} height={11.5} />
					)}
					size={11.5}
					onPress={() => router.back()}
					style={{
						width: 30,
						height: 30,
						marginTop: insets.top,
						marginLeft: "auto",
					}}
					mode="contained"
					containerColor="rgba(0,0,0,0.3)"
				/>
			</LinearGradient>

			<View style={tw.style("flex-1 relative")}>
				{Platform.OS === "web" &&
					data.map((el, index) => (
						<Image
							source={{ uri: el }}
							key={index}
							style={tw.style(
								clsx("w-full h-full transition-all", {
									hidden: index !== imgIndex,
								}),
							)}
						/>
					))}
				{(Platform.OS === "ios" || Platform.OS === "android") && (
					<Carousel
						loop={false}
						ref={carouselRef}
						width={width}
						height={height}
						style={tw.style("h-full")}
						autoPlay={false}
						data={data}
						scrollAnimationDuration={1000}
						onScrollEnd={(index) => setImgIndex(index)}
						renderItem={({ item, index }) => (
							<View style={tw.style("h-full")} key={index}>
								<Image
									source={{ uri: item }}
									style={tw.style("w-full h-full")}
								/>
							</View>
						)}
					/>
				)}
			</View>
			{Platform.OS === "web" && (
				<>
					{imgIndex !== 0 && (
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
								"absolute left-4 top-1/3 z-10 bg-fans-purple",
							)}
							onPress={() => setImgIndex(imgIndex - 1)}
						/>
					)}
					{imgIndex !== data.length - 1 && (
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
								"absolute right-4 top-1/3 z-10 bg-fans-purple",
							)}
							onPress={() => setImgIndex(imgIndex + 1)}
						/>
					)}
				</>
			)}
			<View
				style={{
					bottom: 0,
					position: "absolute",
					width: "100%",
					paddingBottom: insets.bottom,
					backgroundColor: "#000",
				}}
			>
				<View
					style={tw.style(
						"relative h-16 bg-black items-center justify-center",
					)}
				>
					<TouchableOpacity
						style={tw.style("absolute left-[27px] top-[13px]")}
						onPress={() => router.push("/home/posts")}
					>
						<OutlinedHomeSvg
							width={24.4}
							height={25}
							color="#fff"
						/>
					</TouchableOpacity>

					<FypFansSvg width={113} height={22.7} />

					<TouchableOpacity
						style={tw.style("absolute right-[29px] top-[17px]")}
						onPress={handleOpenSidebar}
					>
						<ThreeLineSvg width={24.23} height={21} color="#fff" />
					</TouchableOpacity>
				</View>

				<View
					style={{
						position: "absolute",
						right: 6,
						width: 55,
						rowGap: 5,
						bottom: 20 + insets.bottom + 54,
					}}
				>
					<View style={tw.style("items-center")}>
						<TouchableOpacity onPress={() => setIsLiked(true)}>
							{isLiked ? (
								<FilledHeartSvg
									width={25.63}
									height={22.65}
									color="#fff"
								/>
							) : (
								<HeartSvg
									width={25.63}
									height={22.65}
									color="#fff"
								/>
							)}
						</TouchableOpacity>
						<Text
							style={tw.style(
								"text-[15px] font-bold leading-5 text-white mt-1",
							)}
						>
							90K
						</Text>
					</View>

					<View style={tw.style("items-center")}>
						<TouchableOpacity onPress={() => setOpenComment(true)}>
							<CommentSvg
								width={25.84}
								height={25.84}
								color="#fff"
							/>
						</TouchableOpacity>
						<Text
							style={tw.style(
								"text-[15px] font-bold leading-5 text-white mt-1",
							)}
						>
							743
						</Text>
					</View>

					<View style={tw.style("items-center")}>
						<TouchableOpacity onPress={() => setOpenShare(true)}>
							<RedirectSvg
								width={26.05}
								height={18.14}
								color="#fff"
							/>
						</TouchableOpacity>
						<Text
							style={tw.style(
								"text-[15px] font-bold leading-5 text-white mt-3",
							)}
						>
							13.7K
						</Text>
					</View>

					<View style={tw.style("items-center")}>
						<TouchableOpacity onPress={handleOpenGemModal}>
							<TipSvg width={12.14} height={25} />
						</TouchableOpacity>
						<Text
							style={tw.style(
								"text-[15px] font-bold leading-5 text-white mt-[6.5px]",
							)}
						>
							TIP
						</Text>
					</View>
				</View>

				<View
					style={{
						position: "absolute",
						left: 17,
						bottom: 20 + insets.bottom + 54,
					}}
				>
					<View style={tw.style("flex-row items-center")}>
						<Title
							size={ComponentSizeTypes.lg}
							style="text-white mr-[11px]"
						>
							Jane Love
						</Title>
						<StarCheckSvg width={16} height={15} color="#fff" />
					</View>
					<Text
						style={tw.style(
							"text-white text-[14px] leading-[21px] mt-[-3px]",
						)}
					>
						34 minutes ago
					</Text>

					<View
						style={tw.style("flex-row items-center mt-3 mb-[3px]")}
					>
						<Text
							style={tw.style(
								"text-base leading-[21px] text-white mr-2",
							)}
						>
							Loving the podcast life!
						</Text>
						<ChevronDownSvg width={8.3} height={4.2} color="#fff" />
					</View>

					<Text
						style={tw.style(
							"text-base text-white leading-[21px] font-bold",
						)}
					>
						#aesthetic #girl
					</Text>
				</View>
			</View>

			<ShareDialog open={openShare} onClose={() => setOpenShare(false)} />

			<CommentDialog
				open={openComment}
				onClose={() => setOpenComment(false)}
			/>
		</View>
	);
};

export default InteractiveScreen;
