import React, { FC } from "react";
import { Text, TouchableOpacity, View } from "react-native";

import {
	AttachmentSvg,
	CalendarSvg,
	DollarSvg,
	FundSvg,
} from "@assets/svgs/common";
import BottomSheetWrapper from "@components/common/bottomSheetWrapper";
import tw from "@lib/tailwind";
import { SnapPoints } from "@usertypes/commonEnums";

interface Props {
	open: boolean;
	onClose: () => void;
	onSubmit: Function;
}

const ChatFilterDialog: FC<Props> = (props) => {
	const { open, onClose, onSubmit } = props;

	const filters = [
		{
			value: "During",
			text: "During: specific date",
			icon: <CalendarSvg />,
		},
		{
			value: "Tips",
			text: "Tips: money range",
			icon: <DollarSvg />,
		},
		{
			value: "Has",
			text: "Has: image, video or audio file",
			icon: <AttachmentSvg />,
		},
		{
			value: "Months",
			text: "Months subscribed: range",
			icon: <CalendarSvg />,
		},
		{
			value: "Money",
			text: "Money spent: range",
			icon: <FundSvg />,
		},
	];

	const handlePressFilter = (value: string) => {
		onSubmit(value);
	};

	return (
		<BottomSheetWrapper
			open={open}
			onClose={onClose}
			snapPoint={SnapPoints.Fifty}
		>
			{filters.map((filter, index) => (
				<TouchableOpacity
					style={tw.style("m-[10px]")}
					onPress={() => handlePressFilter(filter.value)}
				>
					<View style={tw.style("flex-row gap-4 items-center")}>
						<View style={tw.style("w-[20px] h-[20px]")}>
							{filter.icon}
						</View>
						<Text style={tw.style("text-[18px]")}>
							{filter.text}
						</Text>
					</View>
				</TouchableOpacity>
			))}
		</BottomSheetWrapper>
	);
};

export default ChatFilterDialog;
