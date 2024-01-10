import RoundButton from "@components/common/RoundButton";
import TextButton from "@components/common/TextButton";
import CustomText from "@components/common/customText";
import ListLine from "@components/common/listLine";
import tw from "@lib/tailwind";
import React, { FC } from "react";
import { Image, Pressable, Text, View } from "react-native";
import { Modal, Portal } from "react-native-paper";

interface Props {
	visible: boolean;
	handleClose: () => void;
	onSwitchToTiers: () => void;
	onKeep: () => void;
}

const SwitchTierModal: FC<Props> = (props) => {
	const { visible, handleClose, onSwitchToTiers, onKeep } = props;

	return (
		<Portal>
			<Modal
				visible={visible}
				onDismiss={handleClose}
				contentContainerStyle={tw.style(
					"bg-white rounded-[15px] mx-[18px] md:max-w-150 md:mx-auto",
				)}
			>
				<View
					style={tw.style(
						"justify-center flex-row bg-[#f6edff] py-[30px] rounded-t-[15px]",
					)}
				>
					<Image
						source={require("@assets/images/profile/tierd-subscription.png")}
						style={tw.style("w-[185px] h-[136px]")}
						resizeMode="cover"
					/>
				</View>
				<View style={tw.style("pt-10 px-[28px] pb-11")}>
					<Text
						style={tw.style(
							"text-[23px] font-bold leading-[31px] text-center mb-[18px]",
						)}
					>
						Tiered subscriptions
					</Text>
					<CustomText size="base" style="text-center">
						Tiered subscriptions allow you to offer exclusive
						content based on different membership levels or 'Tiers'.
					</CustomText>
					<Pressable>
						<CustomText
							style="text-center text-fans-purple"
							size="base"
						>
							Learn more
						</CustomText>
					</Pressable>

					<View style={tw.style("gap-y-[18px] mt-[28px]")}>
						<ListLine
							size="lg"
							text="Design distinct membership tiers"
						/>
						<ListLine
							size="lg"
							text="Attract a wider audience with adjustable prices"
						/>
						<ListLine
							size="lg"
							text="Enhance earnings by appealing to diverse tastes"
						/>
					</View>

					<View
						style={tw.style(
							"w-[186px] mx-auto mt-[14px] gap-y-[10px]",
						)}
					>
						<RoundButton onPress={onSwitchToTiers}>
							Switch to tiers
						</RoundButton>
						<TextButton onPress={onKeep}>
							Keep subscription
						</TextButton>
					</View>
				</View>
			</Modal>
		</Portal>
	);
};

export default SwitchTierModal;
