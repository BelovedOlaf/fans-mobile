import { View } from "react-native";
import React, { FC } from "react";
import tw from "@lib/tailwind";
import { IconButton } from "react-native-paper";

import { PayPalSvg, ThreeDotsSvg, BankSvg } from "@assets/svgs/common";
import { FansText } from "@components/controls";
import { PaymentMethodType } from "@usertypes/commonEnums";

interface Props {
	paymentMethodType: PaymentMethodType;
	title: string;
	paymentInformation: string;
	onClickDots: () => void;
}

const PaymentMethod: FC<Props> = (props) => {
	const { paymentMethodType, title, paymentInformation, onClickDots } = props;

	const getIcons = () => {
		switch (paymentMethodType) {
			case PaymentMethodType.Bank:
				return <BankSvg size={25} color="#fff" />;
			case PaymentMethodType.PayPal:
				return <PayPalSvg size={26.5} color="#fff" />;
			default:
				return <BankSvg size={25} color="#fff" />;
		}
	};

	return (
		<View style={tw.style("flex-row items-center")}>
			<View
				style={tw.style(
					"w-[46px] h-[46px] rounded-full items-center justify-center mr-3",
					{
						"bg-fans-purple":
							paymentMethodType === PaymentMethodType.Bank,
						"bg-[#002d91]":
							paymentMethodType === PaymentMethodType.PayPal,
					},
				)}
			>
				{getIcons()}
			</View>
			<View>
				<FansText
					fontSize={19}
					lineHeight={26}
					style={tw.style("font-semibold")}
				>
					{title}
				</FansText>
				<FansText
					color="grey-70"
					fontSize={16}
					lineHeight={21}
					style={tw.style("mt-[-3px]")}
				>
					{paymentInformation}
				</FansText>
			</View>
			<IconButton
				icon={() => <ThreeDotsSvg size={18} color="#000" />}
				style={tw.style("w-[18px] h-[18px] p-0 ml-auto")}
				onPress={onClickDots}
			/>
		</View>
	);
};

export default PaymentMethod;
