import * as Svgs from "@assets/svgs/common";
import AvatarWithStatus from "@components/common/AvatarWithStatus";
import { FansText, FansView, FansIconButton } from "@components/controls";
import SubscribeDialog from "@components/common/dialog/subscribeDialog";
import { SubscriptionButton } from "@components/profiles";

import tw from "@lib/tailwind";
import { SubscribeActionType } from "@usertypes/commonEnums";
import { CommonActionType, useAppContext } from "@context/useAppContext";
import * as apis from "@helper/endpoints";
import { cdnURL } from "@helper/Utils";
import { truncateText } from "@utils/stringHelper";

import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { CreatorProfileNavigationStacks } from "@usertypes/navigations";
import { LinearGradient } from "expo-linear-gradient";
import React, { Fragment, useEffect, useRef, useState } from "react";
import {
	Image,
	Platform,
	SafeAreaView,
	TouchableOpacity,
	View,
} from "react-native";
import Animated, {
	Easing,
	useAnimatedStyle,
	useSharedValue,
	withTiming,
} from "react-native-reanimated";
import type { ICarouselInstance } from "react-native-reanimated-carousel";
import Carousel from "react-native-reanimated-carousel";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const PreviewScreen = (
	props: NativeStackScreenProps<CreatorProfileNavigationStacks, "Preview">,
) => {
	const { navigation } = props;
	const insets = useSafeAreaInsets();

	const carouselRef = useRef<ICarouselInstance>(null);

	const { state, dispatch } = useAppContext();
	const { profilePreview: profile } = state.story;
	const { creatorUsername: username } = state.common;
	const offset = useSharedValue(0);

	const [width, setWidth] = useState(494);
	const [imgHeight, setImgHeight] = useState(0);
	const [imgIndex, setImgIndex] = useState(0);
	const [hasAccess, setHasAccess] = useState(true);

	const webCarouselStyles = useAnimatedStyle(() => {
		return {
			transform: [
				{
					translateX: withTiming(offset.value * width * -1, {
						duration: 500,
						easing: Easing.bezier(0.5, 0.01, 0, 1),
					}),
				},
			],
		};
	});

	const onClickIndicator = (index: number) => {
		setImgIndex(index);
		if (Platform.OS !== "web") {
			carouselRef.current?.scrollTo({ index: index });
		} else {
			offset.value = index;
		}
	};

	const onClickClose = () => {
		navigation.goBack();
	};

	const checkAccessSubscribedUser = async (id: string) => {
		const resp = await apis.subscriptions.checkAccessSubscribedUser({
			id: profile?.id ?? id,
		});
		if (resp.ok) {
			setHasAccess(resp.data.hasAccess);
		}
	};

	const onClickPrev = () => {
		setImgIndex(imgIndex - 1);
		offset.value--;
	};

	const onClickNext = () => {
		setImgIndex(imgIndex + 1);
		offset.value++;
	};

	const handleOpenSubscribe = () => {
		dispatch.setCommon({
			type: CommonActionType.toggleSubscribeModal,
			data: {
				visible: true,
				creator: profile,
				subscribeActionType: SubscribeActionType.Subscribe,
				bundleId: "0",
				subscribeTierId: profile.subscriptions[0].id,
				defaultTab: "start",
			},
		});
	};

	useEffect(() => {
		if (profile.id) {
			checkAccessSubscribedUser(profile.id);
		}
	}, [username]);

	return (
		<Fragment>
			<View style={tw.style("bg-black flex-1")}>
				<SafeAreaView
					style={tw.style(
						"relative flex-1 md:pt-[66px] md:pb-[75px]",
					)}
				>
					<View
						style={tw.style(
							"w-full relative flex-1 md:max-w-[494px] md:mx-auto",
						)}
					>
						<LinearGradient
							colors={[
								"rgba(112,112,112,0.43)",
								"rgba(112,112,112,0.43)",
								"rgba(255,255,255,0)",
							]}
							start={[0, 0]}
							end={[0, 1]}
							locations={[0, 0.3, 1]}
							style={[
								tw.style(
									"px-[18px] absolute top-0 left-0 w-full h-[176px] z-10 md:rounded-t-[15px]",
								),
								{
									paddingTop: insets.top + 12,
								},
							]}
						>
							<View
								style={tw.style(
									"flex-row justify-between gap-x-[6px] mb-2",
								)}
							>
								{profile.previews.map((preview, index) => (
									<TouchableOpacity
										key={preview.id}
										onPress={() => onClickIndicator(index)}
										style={tw.style(
											"h-1 rounded-[4px] flex-1",
											{
												"bg-white": imgIndex === index,
												"bg-[rgba(255,255,255,0.4)]":
													imgIndex !== index,
											},
										)}
									/>
								))}
							</View>

							<View style={tw.style("flex-row items-center")}>
								<AvatarWithStatus
									avatar={profile?.avatar ?? ""}
									size={46}
								/>

								<FansView
									margin={{ l: 12 }}
									flexDirection="row"
									alignItems="center"
									flex="1"
								>
									<FansText
										fontSize={17}
										lineHeight={22}
										color="white"
										style={tw.style("font-semibold")}
									>
										{truncateText(profile.displayName, 13)}
									</FansText>
									<FansView
										padding={{ x: 20, y: 6 }}
										borderRadius={30}
										margin={{ l: 24 }}
										style={tw.style("bg-fans-black/50")}
									>
										<FansText
											color="white"
											fontSize={13}
											lineHeight={17}
											style={tw.style("font-semibold")}
										>
											PREVIEW
										</FansText>
									</FansView>
								</FansView>

								<View
									style={tw.style(
										"ml-auto flex-row items-center md:hidden",
									)}
								>
									<FansIconButton
										size={30}
										containerColor="rgba(0,0,0,0.3)"
										onPress={onClickClose}
									>
										<Svgs.CloseSvg
											color="#fff"
											width={14.5}
											height={14.5}
										/>
									</FansIconButton>
								</View>
							</View>
						</LinearGradient>

						<View
							style={tw.style("flex-1")}
							onLayout={(e) => {
								setImgHeight(e.nativeEvent.layout.height);
								setWidth(e.nativeEvent.layout.width);
							}}
						>
							{Platform.OS === "web" ? (
								<View
									style={[
										tw.style(
											"relative h-full md:rounded-[15px] overflow-hidden",
										),
									]}
								>
									<Animated.View
										style={[
											tw.style(
												"absolute flex-row top-0 h-full",
											),
											webCarouselStyles,
										]}
									>
										{profile.previews.map((preview) => (
											<Image
												source={{
													uri: cdnURL(preview.url),
												}}
												key={preview.id}
												style={[
													{ width: width },
													tw.style(
														"h-full md:rounded-[15px]",
													),
												]}
												resizeMode="cover"
											/>
										))}
									</Animated.View>
								</View>
							) : null}

							{Platform.OS === "ios" ||
							Platform.OS === "android" ? (
								<Carousel
									loop={false}
									ref={carouselRef}
									width={width}
									height={imgHeight}
									style={tw.style("h-full")}
									autoPlay={false}
									data={profile.previews.map(
										(preview) => preview.url,
									)}
									scrollAnimationDuration={1000}
									onScrollEnd={(index) => setImgIndex(index)}
									renderItem={({ item }) => (
										<View
											style={tw.style("h-full")}
											key={item}
										>
											<Image
												source={{
													uri: cdnURL(item),
												}}
												style={tw.style(
													"w-full h-full",
												)}
												resizeMode="cover"
											/>
										</View>
									)}
								/>
							) : null}
						</View>
						<FansIconButton
							size={30}
							onPress={onClickPrev}
							containerColor="#fff"
							style={tw.style(
								"absolute top-1/2 left-5 md:left-[-50px] hidden web:flex",
								imgIndex === 0 && "hidden web:hidden",
							)}
						>
							<Svgs.ChevronLeftSvg size={15} color="#000" />
						</FansIconButton>
						<FansIconButton
							size={30}
							onPress={onClickNext}
							containerColor="#fff"
							style={tw.style(
								"absolute top-1/2 right-5 md:right-[-50px] hidden web:flex",
								(imgIndex === profile.previews.length - 1 ||
									profile.previews.length === 0) &&
									"hidden web:hidden",
							)}
						>
							<Svgs.ChevronRightSvg size={15} color="#000" />
						</FansIconButton>
						<View
							style={[
								tw.style(
									"absolute left-0 w-full px-[18px]",
									hasAccess && "hidden",
								),
								{
									bottom: insets.bottom + 8,
								},
							]}
						>
							<SubscriptionButton
								data={profile.subscriptions[0]}
								onPress={handleOpenSubscribe}
							/>
						</View>
					</View>
					<Svgs.TitleSvg
						width={196.6}
						height={39.5}
						color="#fff"
						style={tw.style(
							"hidden md:flex absolute top-[55px] md:left-5 lg:left-[140px]",
						)}
					/>
					<FansIconButton
						size={30}
						onPress={onClickClose}
						containerColor="#fff"
						style={tw.style(
							"absolute top-17 md:right-5 lg:right-35 hidden md:flex",
						)}
					>
						<Svgs.CloseSvg size={13} color="#000" />
					</FansIconButton>
				</SafeAreaView>

				<SubscribeDialog />
			</View>
		</Fragment>
	);
};

export default PreviewScreen;
