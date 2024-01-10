import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import { useRouter } from "expo-router";
import tw from "@lib/tailwind";
import { LinearGradient } from "expo-linear-gradient";
import { IconButton } from "react-native-paper";
import { Video } from "expo-av";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

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
} from "@assets/svgs/common";
import {
	ComponentSizeTypes,
	PostType,
	ResizeMode,
} from "@usertypes/commonEnums";
import { IPost } from "@usertypes/types";
import { useAppContext, CommonActionType } from "@context/useAppContext";
import * as apis from "@helper/endpoints";
import { CreatorProfileNavigationStacks } from "@usertypes/navigations";
import { cdnURL } from "@helper/Utils";

const PostInteractiveScreen = (
	props: NativeStackScreenProps<CreatorProfileNavigationStacks, "Post">,
) => {
	const { navigation, route } = props;
	const { id } = route.params;
	const router = useRouter();
	// const navigation = useNavigation();

	const insets = useSafeAreaInsets();
	const { dispatch } = useAppContext();

	const [post, setPost] = useState<IPost>();

	const [isLiked, setIsLiked] = useState(false);

	const [openShare, setOpenShare] = useState(false);
	const [openComment, setOpenComment] = useState(false);

	const handleOpenGemModal = () => {
		// dispatch.setCommon({
		// 	type: CommonActionType.toggleGemModal,
		// 	data: {
		// 		visible: true,
		// 		creator: post?.profile,
		// 	},
		// });
	};

	const handleOpenSidebar = () => {
		dispatch.setCommon({
			type: CommonActionType.toggleSidebar,
			data: true,
		});
	};

	const getPostDetail = async () => {
		dispatch.setShowLoading();
		const resp = await apis.post.getPostById({ id: id as string });
		if (resp.ok) {
			setPost({ ...resp.data });
		} else {
			Toast.show({
				type: "error",
				text1: "Failed to fetch data.",
			});
		}
		dispatch.setHideLoading();
	};

	// useEffect(() => {
	// 	navigation.getParent()?.setOptions({ tabBarStyle: { display: "none" } });
	// 	return () => {
	// 		navigation.getParent()?.setOptions({ tabBarStyle: { display: "block" } });
	// 	};
	// }, [navigation]);

	useEffect(() => {
		getPostDetail();
	}, []);

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
					onPress={() => navigation.goBack()}
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
				{post?.type === PostType.Photo ? (
					<Image
						source={{ uri: cdnURL(post.medias[0].url) }}
						style={tw.style("w-full h-full")}
						resizeMode="cover"
					/>
				) : null}
				{post?.type === PostType.Video ? (
					<Video
						source={{ uri: cdnURL(post.medias[0].url) ?? "" }}
						useNativeControls
						resizeMode={ResizeMode.CONTAIN}
						style={tw.style("w-full h-full")}
					/>
				) : null}
			</View>
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

export default PostInteractiveScreen;
