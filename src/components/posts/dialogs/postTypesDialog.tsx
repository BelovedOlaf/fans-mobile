import {
	CloseSvg,
	ImageSvg,
	MusicSvg,
	StorySvg,
	TextSvg,
	VideoCallSvg,
} from "@assets/svgs/common";
import { FypText } from "@components/common/base";
import BottomSheetWrapper from "@components/common/bottomSheetWrapper";
import { FansDivider } from "@components/controls";
import { defaultPostFormData } from "@constants/defaultFormData";
import {
	CommonActionType,
	PostsActionType,
	useAppContext,
} from "@context/useAppContext";
import tw from "@lib/tailwind";
import { PostStepTypes, PostType } from "@usertypes/commonEnums";
import useDocumentPicker from "@utils/useDocumentPicker";
import { useRouter } from "expo-router";
import React, { FC, Fragment, useMemo, useRef, useState } from "react";
import { Platform, Pressable, View, useWindowDimensions } from "react-native";
import { IconButton } from "react-native-paper";
import Animated, {
	useAnimatedStyle,
	useSharedValue,
	withSpring,
} from "react-native-reanimated";
import type { ICarouselInstance } from "react-native-reanimated-carousel";
import Carousel from "react-native-reanimated-carousel";
import Toast from "react-native-toast-message";

interface PostItemInterface {
	title: string;
	icon: React.ReactNode;
	onSelect: () => void;
}

export const PostTypeItem: FC<PostItemInterface> = (props) => {
	const { onSelect, title, icon } = props;

	return (
		<Pressable style={tw.style("w-1/3")} onPress={onSelect}>
			<View
				style={tw.style(
					"h-10 mb-2 items-center justify-center md:mb-[18px] md:h-14",
				)}
			>
				{icon}
			</View>
			<FypText
				fontSize={{ xs: 19, md: 21 }}
				lineHeight={{ xs: 26, md: 28 }}
				textAlign="center"
				style={tw.style("font-normal md:font-medium")}
			>
				{title}
			</FypText>
		</Pressable>
	);
};

const postTypes = [
	{
		title: "Photo",
		type: PostType.Photo,
		icon: (
			<ImageSvg
				width={32.4}
				height={32.4}
				color="#a854f5"
				style={tw.style("md:w-[57.5px] md:h-[57.5px]")}
			/>
		),
	},
	{
		title: "Video",
		type: PostType.Video,
		icon: (
			<VideoCallSvg
				width={35.6}
				height={33}
				color="#a854f5"
				style={tw.style("md:w-[63px] md:h-[58.5px]")}
			/>
		),
	},

	{
		title: "Story",
		type: PostType.Story,
		icon: (
			<StorySvg
				width={35.54}
				height={35.45}
				color="#a854f5"
				style={tw.style("md:w-[63px] md:h-[62.85px]")}
			/>
		),
	},
	{
		title: "Audio",
		type: PostType.Audio,
		icon: (
			<MusicSvg
				width={29.28}
				height={33}
				color="#a854f5"
				style={tw.style("md:w-[52px] md:h-[58.5px]")}
			/>
		),
	},
	// {
	// 	title: "Fundraiser",
	// 	type: PostType.Fundraiser,
	// 	icon: (
	// 		<FundSvg
	// 			width={27.34}
	// 			height={38.6}
	// 			color="#a854f5"
	// 			style={tw.style("md:w-[48.5px] md:h-[68.5px]")}
	// 		/>
	// 	),
	// },
	{
		title: "Text",
		type: PostType.Text,
		icon: (
			<TextSvg
				width={40.3}
				height={29.1}
				color="#a854f5"
				style={tw.style("md:w-[71.5px] md:h-[51.6px]")}
			/>
		),
	},
	// {
	// 	title: "Poll",
	// 	type: PostType.Poll,
	// 	icon: (
	// 		<PollSvg
	// 			width={30.89}
	// 			height={30.8}
	// 			color="#a854f5"
	// 			style={tw.style("md:w-[55px] md:h-[54.6px]")}
	// 		/>
	// 	),
	// },
];

const PostTypesDialog = () => {
	const router = useRouter();
	const { state, dispatch } = useAppContext();
	const { openNewPostTypesModal } = state.common;
	const { roles } = state.posts;

	const open = useMemo(
		() => (openNewPostTypesModal ? true : false),
		[openNewPostTypesModal],
	);
	const { useAudioPicker, useVideoPicker, useImagePicker } =
		useDocumentPicker();
	const carouselRef = useRef<ICarouselInstance>(null);
	const [tabIndex, setTabIndex] = useState(0);

	const { width } = useWindowDimensions();
	const offset = useSharedValue(0);

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

	const onClose = () => {
		dispatch.setCommon({
			type: CommonActionType.toggleNewPostTypesModal,
			data: false,
		});
	};

	const handleClickDot = (index: number) => {
		if (Platform.OS === "ios" || Platform.OS === "android") {
			if (index === 1) {
				carouselRef.current?.next();
			} else {
				carouselRef.current?.prev();
			}
		} else {
			offset.value = index;
		}
		setTabIndex(index);
	};

	const handleOpenImagePicker = async (
		postType: PostType,
		allowMultiple: boolean,
	) => {
		const result = await useImagePicker(allowMultiple);
		if (result?.ok) {
			const medias = result.data ?? [];
			dispatch.setPosts({
				type: PostsActionType.updatePostForm,
				data: {
					...defaultPostFormData,
					type: postType,
					roles: roles.map((role) => role.id),
					medias: medias,
					thumb:
						medias.length > 0
							? medias[0]
							: defaultPostFormData.thumb,
				},
			});
			onClose();
			router.push({
				pathname: "posts",
				params: { screen: "Thumbnail" },
			});
		} else {
			Toast.show({
				type: "error",
				text1: result?.message ?? "",
			});
		}
	};

	const handleOpenVideoPicker = async () => {
		const result = await useVideoPicker();
		if (result?.ok) {
			dispatch.setPosts({
				type: PostsActionType.updatePostForm,
				data: {
					type: PostType.Video,
					medias: result.data ?? [],
				},
			});
			onClose();
			router.push({ pathname: "posts", params: { screen: "Thumbnail" } });
		} else {
			Toast.show({
				type: "error",
				text1: result?.message ?? "",
			});
		}
	};

	const handleOpenAudioPicker = async () => {
		const result = await useAudioPicker();
		if (result?.ok) {
			dispatch.setPosts({
				type: PostsActionType.updatePostForm,
				data: {
					type: PostType.Audio,
					medias: result.data ?? [],
				},
			});
			onClose();
			router.push({
				pathname: "posts",
				params: { screen: "Thumbnail" },
			});
		} else {
			Toast.show({
				type: "error",
				text1: result?.message ?? "",
			});
		}
	};

	const onSelect = async (postType: PostType, desktopMode: boolean) => {
		if (desktopMode) {
			dispatch.setPosts({
				type: PostsActionType.updatePostForm,
				data: {
					...defaultPostFormData,
					type: postType,
					roles: roles.map((role) => role.id),
				},
			});
			onClose();
			let postStep: PostStepTypes = PostStepTypes.Thumbnail;
			switch (postType) {
				case PostType.Poll:
					postStep = PostStepTypes.NewPollPost;
					break;
				case PostType.Fundraiser:
					postStep = PostStepTypes.NewFundraiserPost;
					break;
				case PostType.Text:
					postStep = PostStepTypes.Text;
					break;
				default:
					postStep = PostStepTypes.Thumbnail;
					break;
			}
			dispatch.setPosts({
				type: PostsActionType.updatePostModal,
				data: {
					visible: true,
					step: postStep,
				},
			});
		} else {
			switch (postType) {
				case PostType.Story:
				case PostType.Photo:
					handleOpenImagePicker(
						postType,
						postType === PostType.Photo,
					);
					break;
				case PostType.Video:
					handleOpenVideoPicker();
					break;
				case PostType.Text:
					onClose();
					router.push({
						pathname: "posts",
						params: { screen: "Text" },
					});
					break;
				case PostType.Audio:
					handleOpenAudioPicker();
					break;
				default:
					break;
			}
		}
	};

	return (
		<BottomSheetWrapper
			open={open}
			onClose={onClose}
			dialogWrapperStyle="md:max-w-[740px]"
			topLineStyle="md:hidden"
		>
			<View style={tw.style("pb-3 md:pb-0")}>
				<View style={tw.style("relative md:py-[34px]")}>
					<FypText
						fontSize={{ xs: 19, md: 23 }}
						lineHeight={{ xs: 26, md: 31 }}
						fontWeight={700}
						textAlign="center"
						style={tw.style("mb-[50px] md:mb-0")}
					>
						Create post
					</FypText>
					<View
						style={tw.style(
							"hidden absolute right-[34px] top-[35px] md:flex w-7.5 h-7.5",
						)}
					>
						<IconButton
							icon={() => <CloseSvg size={13.2} color="#fff" />}
							containerColor="rgba(0,0,0,0.3)"
							style={tw.style("m-0 w-7.5 h-7.5 ")}
							onPress={onClose}
						/>
					</View>
				</View>
				<FansDivider
					style={tw.style("hidden md:flex mx-[34px] mb-[38px]")}
				/>

				{Platform.OS === "web" ? (
					<Fragment>
						<View
							style={tw.style(
								"h-[190px] relative overflow-hidden md:hidden",
							)}
						>
							<Animated.View
								style={[
									tw.style("absolute flex-row top-0"),
									animationStyles,
								]}
							>
								<View
									style={[
										tw.style(
											"flex-row flex-wrap gap-y-[45px]",
										),
										{ width: width },
									]}
								>
									{postTypes.slice(0, 6).map((postType) => (
										<PostTypeItem
											key={postType.type}
											title={postType.title}
											onSelect={() =>
												onSelect(postType.type, false)
											}
											icon={postType.icon}
										/>
									))}
								</View>
								{/* <View
								style={[
									tw.style("flex-row flex-wrap gap-y-[45px]"),
									{ width: width },
								]}
							>
								{postTypes
									.slice(6, postTypes.length)
									.map((postType) => (
										<PostTypeItem
											key={postType.type}
											title={postType.title}
											onSelect={() =>
												onSelect(postType.type, false)
											}
											icon={postType.icon}
										/>
									))}
							</View> */}
							</Animated.View>
						</View>
						<View
							style={tw.style(
								"hidden md:flex px-[34px] pb-[42px] flex-wrap flex-row justify-center gap-y-9",
							)}
						>
							{postTypes.map((postType) => (
								<PostTypeItem
									key={postType.type}
									title={postType.title}
									onSelect={() =>
										onSelect(postType.type, true)
									}
									icon={postType.icon}
								/>
							))}
						</View>
					</Fragment>
				) : (
					<Carousel
						loop={false}
						ref={carouselRef}
						width={width}
						height={190}
						style={tw.style("h-full h-[190px]")}
						autoPlay={false}
						data={[0, 1]}
						scrollAnimationDuration={1000}
						onScrollEnd={(index) => setTabIndex(index)}
						renderItem={({ item }) => (
							<View
								style={tw.style(
									"flex-row flex-wrap gap-y-[45px]",
								)}
								key={item}
							>
								{postTypes
									.slice(item * 6, (item + 1) * 6)
									.map((postType) => (
										<PostTypeItem
											key={postType.type}
											title={postType.title}
											onSelect={() =>
												onSelect(postType.type, false)
											}
											icon={postType.icon}
										/>
									))}
							</View>
						)}
					/>
				)}

				{/* <View
				style={tw.style(
					"flex-row justify-center mt-[46px] gap-x-2 pb-3 md:hidden",
				)}
			>
				<Pressable
					style={[
						tw.style("w-[5px] h-[5px] rounded-full bg-[#dedede]", {
							"bg-black": tabIndex === 0,
						}),
						{
							transform: [{ scale: tabIndex === 0 ? 1.5 : 1 }],
						},
					]}
					onPress={() => handleClickDot(0)}
				></Pressable>
				<Pressable
					style={[
						tw.style("w-[5px] h-[5px] rounded-full bg-[#dedede]", {
							"bg-black": tabIndex === 1,
						}),
						{
							transform: [{ scale: tabIndex === 1 ? 1.5 : 1 }],
						},
					]}
					onPress={() => handleClickDot(1)}
				></Pressable>
			</View> */}
			</View>
		</BottomSheetWrapper>
	);
};

export default PostTypesDialog;
