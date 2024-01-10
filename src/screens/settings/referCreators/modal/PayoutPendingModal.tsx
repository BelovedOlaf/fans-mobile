import React from "react";

// import base modules
import { CloseSvg } from "@assets/svgs/common";
import {
	FansButton,
	FansGap,
	FansImage2,
	FansText,
	FansView,
} from "@components/controls";
import tw from "@lib/tailwind";
import { IFansModal } from "@usertypes/components";
import { FansModal3 } from "@components/controls/Modal";
import { IconButton } from "react-native-paper";
import { View } from "react-native";
import { useRouter } from "expo-router";
import { Dollar4Svg } from "@assets/svgs/common/Dollar";

const PayoutPendingModal: IFansModal = (props) => {
	const { visible, onClose, onSubmit, ...props_ } = props;

	const router = useRouter();

	const handlePressReturnHome = async () => {
		onClose();
		router.replace({
			pathname: "posts",
			params: { screen: "Home" },
		});
	};

	const defaultAvatar = require("@assets/images/default-avatar.png");

	return (
		<FansModal3 {...props}>
			<View
				style={tw.style(
					"absolute right-[15px] top-[15px] md:flex w-7.5 h-7.5",
				)}
			>
				<IconButton
					icon={() => <CloseSvg size={13.2} color="#fff" />}
					containerColor="rgba(0,0,0,0.3)"
					style={tw.style("m-0 w-7.5 h-7.5 ")}
					onPress={onClose}
				/>
			</View>

			<FansView
				style={tw.style("flex items-center", "mx-[20px] my-[15px]")}
			>
				<FansImage2
					width={95}
					height={95}
					viewStyle={{ borderRadius: "full" }}
					source={defaultAvatar}
				/>
				<FansView
					style={tw.style(
						"w-[42px] h-[42px] rounded-full bg-fans-white items-center justify-center mt-[-30px] mr-[-60px]",
					)}
				>
					<FansView
						style={tw.style(
							"w-[34px] h-[34px] rounded-full bg-fans-green-4d items-center justify-center",
						)}
					>
						<Dollar4Svg
							width={20.331}
							height={20.254}
							color="#fff"
						/>
					</FansView>
				</FansView>

				<FansGap height={17} />
				<FansText
					style={tw.style(
						"font-inter-bold",
						"text-center",
						"text-[23px]",
					)}
				>
					Payout pending{"\n"}for $20
				</FansText>
				<FansGap height={18} />
				<FansText
					style={tw.style("text-[16px] text-center leading-[21px]")}
				>
					We are currently processing your payment.{"\n"} Expect to
					receive within{"\n"} 2 business days
				</FansText>
				<FansGap height={{ lg: 34.5, xs: 25 }} />
				<FansView style={tw.style("w-full h-[42px]")}>
					<FansButton
						title="Return to home"
						colorFans="fans-green"
						onPress={handlePressReturnHome}
						style={{ flex: 1, height: 42 }}
						containerStyle={tw.style("text-19px")}
					/>
				</FansView>
			</FansView>
		</FansModal3>
	);
};

export default PayoutPendingModal;
