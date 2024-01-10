import tw from "@lib/tailwind";
import React, { FC, useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";

import { StarCheckSvg } from "@assets/svgs/common";
import BottomSheetWrapper from "@components/common/bottomSheetWrapper";
import { SnapPoints } from "@usertypes/commonEnums";

interface Props {
	open: boolean;
	onClose: () => void;
	onSubmit: (value: string) => void;
}

const DiscountDlg: FC<Props> = (props) => {
	const { open, onClose, onSubmit } = props;
	const [discount, setDiscount] = useState("10%");
	const [months, setMonths] = useState("6");

	return (
		<BottomSheetWrapper
			open={open}
			onClose={onClose}
			snapPoint={SnapPoints.Sixty}
		>
			<View style={tw.style("flex px-[20px]")}>
				{/* title */}
				<View
					style={tw.style(
						"flex flex-row justify-center items-center my-[20px]",
					)}
				>
					<View style={tw.style("h-[20px] w-[20px] mr-[20px]")}>
						<StarCheckSvg />
					</View>
					<Text style={tw.style("text-[20px] text-center font-bold")}>
						Send discount to Kim
					</Text>
				</View>
				{/* form start */}
				<View>
					<Text style={tw.style("text-[16px]")}>Discount</Text>
				</View>
				<View style={tw.style("my-[20px]")}>
					<TextInput
						style={tw.style(
							"bg-gray-100 h-[40px] rounded-full px-[15px]",
						)}
						value={discount}
						onChangeText={setDiscount}
					/>
				</View>
				<View>
					<Text style={tw.style("text-[16px]")}>Months</Text>
				</View>
				<View style={tw.style("my-[20px]")}>
					<TextInput
						style={tw.style(
							"bg-gray-100 h-[40px] rounded-full px-[15px]",
						)}
						value={months}
						onChangeText={setMonths}
					/>
				</View>
				<View style={tw.style("my-[20px]")}>
					<TouchableOpacity
						style={tw.style("bg-purple-500 p-[10px] rounded-full")}
					>
						<Text
							style={tw.style(
								"text-white text-center font-bold text-[16px]",
							)}
						>
							Send discount
						</Text>
					</TouchableOpacity>
				</View>
			</View>
		</BottomSheetWrapper>
	);
};

export default DiscountDlg;
