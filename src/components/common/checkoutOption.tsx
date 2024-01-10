import { View, Pressable } from "react-native";
import React, { FC } from "react";
import tw from "@lib/tailwind";
import clsx from "clsx";

import CustomText from "./customText";
import { PayPalSvg, StripeSvg, CreditCardSvg } from "@assets/svgs/common";
import { ICheckoutOption } from "@usertypes/types";
import { CheckoutType } from "@usertypes/commonEnums";

interface Props {
	selected: boolean;
	onSelect: () => void;
	data: ICheckoutOption;
}

const CheckoutOption: FC<Props> = (props) => {
	const { selected, onSelect, data } = props;

	const wrapperStyles = clsx(
		"h-[108px] border border-fans-grey rounded-[7px] justify-center flex-1 items-center relative",
		{
			"border-transparent": selected,
		},
	);

	const getIcons = () => {
		switch (data.type) {
			case CheckoutType.PayPal:
				return <PayPalSvg width={23.17} height={26.5} color="#fff" />;
			case CheckoutType.Stripe:
				return <StripeSvg width={18} height={25.38} color="#fff" />;
			case CheckoutType.CreditCard:
				return (
					<CreditCardSvg width={26.6} height={19.5} color="#fff" />
				);
			default:
				return null;
		}
	};

	return (
		<Pressable style={tw.style(wrapperStyles)} onPress={onSelect}>
			<View
				style={tw.style(
					clsx(
						"w-[46px] h-[46px] flex-row items-center justify-center rounded-full",
						{
							"bg-fans-purple":
								data.type === CheckoutType.CreditCard,
							"bg-[#665bff]": data.type === CheckoutType.Stripe,
							"bg-[#002d91]": data.type === CheckoutType.PayPal,
						},
					),
				)}
			>
				{getIcons()}
			</View>
			<CustomText size="base" style="mt-2 font-medium">
				{data.name}
			</CustomText>
			{selected ? (
				<View
					style={tw.style(
						clsx(
							"w-full h-full absolute top-0 left-0 rounded-[7px] border-[2px]",
							{
								"border-fans-purple":
									data.type === CheckoutType.CreditCard,
								"border-[#665bff]":
									data.type === CheckoutType.Stripe,
								"border-[#002d91]":
									data.type === CheckoutType.PayPal,
							},
						),
					)}
				></View>
			) : null}
		</Pressable>
	);
};

export default CheckoutOption;
