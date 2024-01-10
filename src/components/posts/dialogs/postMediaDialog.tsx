import { ChevronLeftSvg, CloseSvg, StarCheckSvg } from "@assets/svgs/common";
import AvatarWithStatus from "@components/common/AvatarWithStatus";
import FansCarousel from "@components/common/carousel";
import { FansIconButton, FansText, FansView } from "@components/controls";
import { PostsActionType, useAppContext } from "@context/useAppContext";
import tw from "@lib/tailwind";
import { ResizeMode } from "@usertypes/commonEnums";
import React, { useState } from "react";
import { Modal, Pressable, View, useWindowDimensions } from "react-native";

const PostMediaDialog = () => {
	const { state, dispatch } = useAppContext();
	const { visible, mediaType, mediaUrls, avatar, displayName, index } =
		state.posts.mediaModal;
	const { height } = useWindowDimensions();

	const [imgWidth, setImgWidth] = useState(100);

	const handleClose = () => {
		dispatch.setPosts({
			type: PostsActionType.updateMediaModal,
			data: {
				visible: false,
			},
		});
	};

	return (
		<Modal visible={visible} transparent>
			<FansView
				width="screen"
				height="screen"
				touchableOpacityProps={{
					activeOpacity: 1,
					onPress: handleClose,
				}}
				alignItems="center"
				backgroundColor={{ color: "black", opacity: 31 }}
				justifyContent="center"
			>
				<FansView
					width={{ xs: "full", md: 740 }}
					touchableOpacityProps={{ activeOpacity: 1 }}
					style={tw.style("max-h-full")}
				>
					<View
						style={tw.style("")}
						onLayout={(e) =>
							setImgWidth(e.nativeEvent.layout.width)
						}
					>
						<View
							style={tw.style(
								"flex-row items-center mb-2 pl-4.5",
							)}
						>
							<Pressable
								style={tw.style("w-[15px] h-[15px] mr-5")}
								onPress={handleClose}
							>
								<ChevronLeftSvg size={15} color="#fff" />
							</Pressable>
							<AvatarWithStatus size={34} avatar={avatar} />
							<FansText
								style={tw.style("px-3.5")}
								color="white"
								fontFamily="inter-semibold"
								fontSize={16}
								lineHeight={21}
							>
								{displayName}
							</FansText>
							<StarCheckSvg width={13.66} height={13} />

							<FansIconButton
								size={30}
								containerColor="rgba(0,0,0,0.5)"
								style={tw.style("ml-auto mr-3 md:hidden")}
								onPress={handleClose}
							>
								<CloseSvg size={14} color="#fff" />
							</FansIconButton>
						</View>
						<View style={tw.style("relative flex-1")}>
							<FansCarousel
								id="post-media-carousel"
								width={imgWidth}
								height={
									tw.prefixMatch("md")
										? imgWidth
										: height - 100
								}
								resizeMode={ResizeMode.CONTAIN}
								medias={mediaUrls.map((el) => ({
									url: el,
									mediaType: mediaType,
								}))}
								defaultIndex={index}
							/>
						</View>
					</View>
				</FansView>
			</FansView>
		</Modal>
	);
};

export default PostMediaDialog;
