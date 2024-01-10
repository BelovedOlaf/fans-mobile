import { View, Text, Image, Pressable } from "react-native";
import React, { FC } from "react";
import tw from "@lib/tailwind";
import { Modal, Portal } from "react-native-paper";
import CustomText from "@components/common/customText";
import ListLine from "@components/common/listLine";
import RoundButton from "@components/common/RoundButton";
import TextButton from "@components/common/TextButton";

interface Props {
	visible: boolean;
	handleClose: () => void;
	onSwitchToSubscription: () => void;
	onKeep: () => void;
}

const SwitchSubscriptionModal: FC<Props> = (props) => {
	const { visible, handleClose, onSwitchToSubscription, onKeep } = props;

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
						"justify-center flex-row bg-[#f6edff] pt-6 pb-10 rounded-t-[15px]",
					)}
				>
					<Image
						source={require("@assets/images/profile/subscription.png")}
						style={tw.style("w-[247px] h-[102px]")}
						resizeMode="cover"
					/>
				</View>
				<View style={tw.style("pt-10 px-[28px] pb-11")}>
					<Text
						style={tw.style(
							"text-[23px] font-bold leading-[31px] text-center mb-[18px]",
						)}
					>
						Subscriptions
					</Text>
					<CustomText size="base" style="text-center">
						Subscription-Based Services allow you to offer exclusive
						content bases on different subscription levels.
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
							text="Design unique subscription packages"
						/>
						<ListLine
							size="lg"
							text="Simpler approach to no overwhelm your fans"
						/>
					</View>

					<View
						style={tw.style(
							"w-[268px] mx-auto mt-[14px] gap-y-[10px]",
						)}
					>
						<RoundButton onPress={onSwitchToSubscription}>
							Switch to subscription
						</RoundButton>
						<TextButton onPress={onKeep}>Keep tiers</TextButton>
					</View>
				</View>
			</Modal>
		</Portal>
	);
};

export default SwitchSubscriptionModal;
