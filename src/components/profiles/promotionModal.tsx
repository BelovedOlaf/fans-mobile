import { View, Text, Image } from "react-native";
import React, { FC } from "react";
import tw from "@lib/tailwind";
import { Modal, Portal, IconButton } from "react-native-paper";
import * as Clipboard from "expo-clipboard";

import CustomText from "@components/common/customText";
import {
	CopyLinkSvg,
	CopySvg,
	RedirectSvg,
	CloseSvg,
} from "@assets/svgs/common";

interface Props {
	visible: boolean;
	handleClose: () => void;
}

const PromotionModal: FC<Props> = (props) => {
	const { visible, handleClose } = props;

	const handleCopy = async () => {
		await Clipboard.setStringAsync("fyp.fans/campaign");
	};

	return (
		<Portal>
			<Modal
				visible={visible}
				onDismiss={handleClose}
				contentContainerStyle={tw.style(
					"bg-white rounded-[15px] mx-[18px]",
				)}
			>
				<View
					style={tw.style(
						"justify-center flex-row bg-[#f6edff] relative rounded-t-[15px]",
					)}
				>
					<Image
						source={require("@assets/images/profile/promotion-congrats.jpg")}
						style={tw.style("w-full h-[148px] rounded-t-[15px]")}
						resizeMode="cover"
					/>
					<IconButton
						icon={() => (
							<CloseSvg width={9.33} height={9.33} color="#fff" />
						)}
						containerColor="rgba(0,0,0,0.3)"
						style={tw.style(
							"m-0 absolute top-[14px] right-[14px] w-[25px] h-[25px]",
						)}
						onPress={handleClose}
					/>
				</View>
				<View style={tw.style("pt-[30px] px-[28px] pb-11")}>
					<Text
						style={tw.style(
							"text-[23px] font-bold leading-[31px] text-center",
						)}
					>
						Congrats,
					</Text>
					<Text
						style={tw.style(
							"text-[23px] font-bold leading-[31px] text-center mb-4",
						)}
					>
						your campaign is live!
					</Text>
					<CustomText size="base" style="text-center mb-7">
						Share the link below to let people use the discount, and
						track your campaigns success
					</CustomText>

					<View
						style={tw.style("flex-row gap-x-[7px] justify-center")}
					>
						<View
							style={tw.style(
								"border rounded-[25px] border-fans-grey p-[5px] flex-row items-center w-[192px]",
							)}
						>
							<View
								style={tw.style(
									"w-6 h-6 rounded-full bg-fans-purple mr-2 items-center justify-center",
								)}
							>
								<CopyLinkSvg
									width={13.91}
									height={13.92}
									color="#fff"
								/>
							</View>
							<CustomText size="base" style="text-fans-purple">
								fyp.fans/campaign
							</CustomText>
						</View>
						<IconButton
							icon={() => (
								<CopySvg
									width={14.71}
									height={18.73}
									color="#fff"
								/>
							)}
							containerColor="#a854f5"
							style={tw.style("m-0 w-[34px] h-[34px]")}
						/>
						<IconButton
							icon={() => (
								<RedirectSvg
									width={17.65}
									height={12.3}
									color="#fff"
								/>
							)}
							containerColor="#a854f5"
							style={tw.style("m-0 w-[34px] h-[34px]")}
						/>
					</View>
				</View>
			</Modal>
		</Portal>
	);
};

export default PromotionModal;
