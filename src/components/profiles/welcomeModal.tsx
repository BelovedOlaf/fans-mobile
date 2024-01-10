import { CloseSvg } from "@assets/svgs/common";
import RoundButton from "@components/common/RoundButton";
import CustomText from "@components/common/customText";
import tw from "@lib/tailwind";
import { RoundButtonType } from "@usertypes/commonEnums";
import React, { FC } from "react";
import { Image, Text, View } from "react-native";
import { IconButton, Modal, Portal } from "react-native-paper";

interface Props {
	visible: boolean;
	handleClose: () => void;
}

const WelcomeModal: FC<Props> = (props) => {
	const { visible, handleClose } = props;

	return (
		<Portal>
			<Modal
				visible={visible}
				onDismiss={handleClose}
				contentContainerStyle={tw.style(
					"bg-white rounded-[15px] mx-[18px]",
				)}
			>
				<View style={tw.style("relative")}>
					<Image
						source={require("@assets/images/profile/welcome-hero.jpg")}
						resizeMode="cover"
						style={tw.style("rounded-t-[15px] w-full h-[148px]")}
					/>
					<IconButton
						icon={() => (
							<CloseSvg width={9.33} height={9.33} color="#fff" />
						)}
						mode="contained"
						containerColor="rgba(0,0,0,0.3)"
						style={tw.style(
							"w-[25px] h-[25px] absolute top-[14px] right-[14px]",
						)}
						onPress={handleClose}
					/>
				</View>

				<View style={tw.style("pt-[30px] px-[28px] pb-[34px]")}>
					<Text
						style={tw.style(
							"text-[23px] leading-[31px] text-black font-bold text-center mb-[18px]",
						)}
					>
						Welcome to FYP.Fans!
					</Text>
					<CustomText
						size="base"
						style="text-black text-center mb-[26px]"
					>
						Get set to customize your page and create your
						membership. You're just a few steps away from sharing
						your unique content with the world!
					</CustomText>

					<View style={tw.style("w-[170px] mx-auto")}>
						<RoundButton
							variant={RoundButtonType.OUTLINE_PRIMARY}
							onPress={handleClose}
						>
							Get started
						</RoundButton>
					</View>
				</View>
			</Modal>
		</Portal>
	);
};

export default WelcomeModal;
