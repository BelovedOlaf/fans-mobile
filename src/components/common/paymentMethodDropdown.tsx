import tw from "@lib/tailwind";
import React, { FC, useState } from "react";
import { Pressable, Text, View } from "react-native";
import Collapsible from "react-native-collapsible";

import { ChevronDownSvg, PlusSvg, VisaSvg } from "@assets/svgs/common";
import { FansDivider } from "@components/controls";
import CustomText from "./customText";

const options = [
	{
		type: "visa",
		data: "1",
		label: "VISA **** **** **** 1234",
	},
	{
		type: "visa",
		data: "2",
		label: "VISA **** **** **** 3456",
	},
];

interface Props {
	onAddMethod: () => void;
	value: string;
	onChange: (val: string) => void;
}

const PaymentMethodDropdown: FC<Props> = (props) => {
	const { onAddMethod, value, onChange } = props;
	const [closeDropdown, setCloseDropdown] = useState(true);

	const getPaymentMethod = () => {
		const selectedPayment = options.find((el) => el.data === value);
		switch (selectedPayment?.type) {
			case "Visa":
				return {
					icon: <VisaSvg width={34} height={34} />,
					label: selectedPayment.label,
				};
			case "MasterCard":
				return {
					icon: <VisaSvg width={34} height={34} />,
					label: selectedPayment.label,
				};
			case "AmericanExpress":
				return {
					icon: <VisaSvg width={34} height={34} />,
					label: selectedPayment.label,
				};
			default:
				return { icon: null, label: "Select card" };
		}
	};

	return (
		<View style={tw.style("border border-fans-dark-grey rounded-[24px]")}>
			<Pressable
				style={tw.style([
					"flex-row items-center py-1 pl-1 pr-[18px] h-[42px]",
				])}
				onPress={() => setCloseDropdown(!closeDropdown)}
			>
				{getPaymentMethod().icon}
				<CustomText size="base" style="ml-2 mr-auto">
					{getPaymentMethod().label}
				</CustomText>
				<ChevronDownSvg width={14} height={8} color="#707070" />
			</Pressable>
			<Collapsible collapsed={closeDropdown}>
				<View style={tw.style("pb-5")}>
					<FansDivider style={tw.style("h-[1px]")} />

					{options.map((option) => (
						<Pressable
							style={tw.style("flex-row items-center px-4 py-2")}
							key={option.data}
							onPress={() => {
								onChange(option.data);
								setCloseDropdown(true);
							}}
						>
							<VisaSvg width={22} height={22} />
							<CustomText size="base" style="ml-2">
								{option.label}
							</CustomText>
						</Pressable>
					))}

					<Pressable
						style={tw.style(
							"bg-fans-purple flex-row items-center pl-4 h-[38px]",
						)}
						onPress={onAddMethod}
					>
						<View
							style={tw.style("w-[22px] justify-center flex-row")}
						>
							<PlusSvg width={14} height={14} color="#fff" />
						</View>
						<Text
							style={tw.style(
								"text-[18px] leading-6 text-white ml-2",
							)}
						>
							Add payment method
						</Text>
					</Pressable>
				</View>
			</Collapsible>
		</View>
	);
};

export default PaymentMethodDropdown;
