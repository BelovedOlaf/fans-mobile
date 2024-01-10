import React from "react";

import { Close3Svg, OutlinedPinSvg } from "@assets/svgs/common";
import {
	FansGap,
	FansImage,
	FansSvg,
	FansText,
	FansView,
} from "@components/controls";
import tw from "@lib/tailwind";
import { IFansModal } from "@usertypes/components";
import { ColorStyle1 } from "@usertypes/styles";
import { BlurView } from "expo-blur";
import { Modal, TouchableOpacity } from "react-native";

const ImageTimestampModal: IFansModal = (props) => {
	const { visible, onClose } = props;

	return (
		<Modal visible={visible} transparent>
			<BlurView style={tw.style("w-screen h-screen")}>
				<FansView style={tw.style("mx-[17px] my-[20px]")} grow>
					<TouchableOpacity onPress={onClose}>
						<FansView
							width={34}
							height={34}
							alignItems="center"
							alignSelf="end"
							backgroundColor={{ color: "black", opacity: 30 }}
							borderRadius="full"
							justifyContent="center"
						>
							<FansSvg
								width={12.69}
								height={12.69}
								svg={Close3Svg}
								color1="white"
							/>
						</FansView>
					</TouchableOpacity>
					<FansGap height={10.5} />
					<FansView style={tw.style("flex-row items-center")}>
						<FansView width={34} height={34}>
							<FansImage
								source={require("@assets/images/default-avatar.png")}
							/>
						</FansView>
						<FansGap width={13} />
						<FansView style={tw.style("grow")}>
							<FansText fontFamily="inter-semibold" fontSize={16}>
								You
							</FansText>
							<FansText color="grey-70" fontSize={16}>
								2 days ago from camera roll
							</FansText>
						</FansView>
						<FansView
							width={34}
							height={34}
							alignItems="center"
							backgroundColor="grey-f0"
							borderRadius="full"
							justifyContent="center"
						>
							<FansView width={15.43} height={15.43}>
								<OutlinedPinSvg />
							</FansView>
						</FansView>
					</FansView>
					<FansGap height={18.3} />
					<FansView style={tw.style("grow")}>
						<FansImage
							source={{
								uri: "https://i.postimg.cc/fbQBJSf2/image.png",
							}}
							style={tw.style("rounded-[15px]")}
							resizeMode="cover"
						/>
					</FansView>
				</FansView>
			</BlurView>
		</Modal>
	);
};

export default ImageTimestampModal;
