import { View, Image, Pressable, ImageBackground } from "react-native";
import React, { FC } from "react";
import tw from "@lib/tailwind";
import { Modal, Portal, IconButton } from "react-native-paper";
import { openBrowserAsync } from "expo-web-browser";

import {
	CloseSvg,
	CopyLinkSvg,
	PinterestSvg,
	InstagramSvg,
	OutlinedTweetSvg,
} from "@assets/svgs/common";

import { FansText } from "@components/controls";

import { PostsActionType, useAppContext } from "@context/useAppContext";

interface Props {
	closeCallback?: (postId: string) => void;
}

const PostLiveDialog: FC<Props> = (props) => {
	const { closeCallback } = props;
	const { state, dispatch } = useAppContext();
	const { visible, postId } = state.posts.liveModal;

	const onClose = () => {
		if (closeCallback) {
			closeCallback(postId);
		}
		dispatch.setPosts({
			type: PostsActionType.updateLiveModal,
			data: {
				visible: false,
			},
		});
	};

	const onClickCopy = () => {};

	const onClickTweet = () => {
		openBrowserAsync("https://tweet.com");
	};

	const onClickShare = () => {};

	const onClickPinterest = () => {
		openBrowserAsync("https://test.com");
	};

	return (
		<Portal>
			<Modal
				visible={visible}
				onDismiss={onClose}
				contentContainerStyle={tw.style(
					"bg-white rounded-[15px] mx-auto w-full max-w-[358px]",
				)}
			>
				<View>
					<View style={tw.style("relative")}>
						<Image
							source={require("@assets/images/posts/post-live-1.png")}
							style={tw.style(
								"w-full h-[148px] rounded-t-[15px]",
							)}
							resizeMode="cover"
						/>
						<IconButton
							icon={() => <CloseSvg size={10.5} color="#fff" />}
							containerColor="rgba(0,0,0,0.3)"
							style={tw.style(
								"m-0 p-0 w-[25px] h-[25px] absolute top-3.5 right-3.5",
							)}
							onPress={onClose}
						/>
					</View>
					<View
						style={tw.style(
							"bg-white rounded-b-[15px] pt-7.5 px-9.5 pb-5.5",
						)}
					>
						<FansText
							fontSize={23}
							lineHeight={31}
							style={tw.style("font-bold text-center mb-4.5")}
						>
							Your post is live!
						</FansText>
						<FansText
							fontSize={16}
							lineHeight={21}
							style={tw.style("text-center mb-7")}
						>
							Spread the word and inspire your community to be
							active fans by sharing your fresh content
						</FansText>
						{/* <View style={tw.style("flex-row justify-between")}>
							<View style={tw.style("items-center")}>
								<Pressable
									style={tw.style("mb-2 w-11.5 h-11.5")}
									onPress={onClickCopy}
								>
									<View
										style={tw.style(
											"bg-fans-purple rounded-full w-full h-full flex items-center justify-center",
										)}
									>
										<CopyLinkSvg
											size={24.35}
											color="#fff"
										/>
									</View>
								</Pressable>
								<FansText fontSize={14} lineHeight={21}>
									Copy link
								</FansText>
							</View>
							<View style={tw.style("items-center")}>
								<Pressable
									style={tw.style("mb-2 w-11.5 h-11.5")}
									onPress={onClickTweet}
								>
									<View
										style={tw.style(
											"bg-[#00acee] rounded-full w-full h-full items-center justify-center",
										)}
									>
										<OutlinedTweetSvg
											size={26}
											color="#fff"
										/>
									</View>
								</Pressable>
								<FansText fontSize={14} lineHeight={21}>
									Tweet
								</FansText>
							</View>

							<View style={tw.style("items-center")}>
								<Pressable
									style={tw.style("mb-2 w-11.5 h-11.5")}
									onPress={onClickShare}
								>
									<ImageBackground
										style={tw.style(
											"rounded-full w-full h-full flex items-center justify-center",
										)}
										source={require("@assets/images/posts/instagram-bg.png")}
										resizeMode="cover"
									>
										<InstagramSvg
											size={24.5}
											color="#fff"
										/>
									</ImageBackground>
								</Pressable>
								<FansText fontSize={14} lineHeight={21}>
									Share
								</FansText>
							</View>

							<View style={tw.style("items-center")}>
								<Pressable
									style={tw.style("mb-2 w-11.5 h-11.5")}
									onPress={onClickPinterest}
								>
									<View
										style={tw.style(
											"bg-[#e60023] rounded-full w-full h-full flex items-center justify-center",
										)}
									>
										<PinterestSvg size={27} color="#fff" />
									</View>
								</Pressable>
								<FansText fontSize={14} lineHeight={21}>
									Pin
								</FansText>
							</View>
						</View> */}
					</View>
				</View>
			</Modal>
		</Portal>
	);
};

export default PostLiveDialog;
