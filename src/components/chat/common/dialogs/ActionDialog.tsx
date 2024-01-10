import { View, Text, TouchableOpacity, Dimensions } from "react-native";
import React, { FC, useState } from "react";
import tw from "@lib/tailwind";

import BottomSheetWrapper from "@components/common/bottomSheetWrapper";
import { SnapPoints } from "@usertypes/commonEnums";
import {
	CopySvg,
	EyeHideSvg,
	HeartSvg,
	PinSvg,
	ReplySvg,
	SearchSvg,
	WarningSvg,
} from "@assets/svgs/common";

interface Props {
	open: boolean;
	onClose: () => void;
	onSubmit: (value: string) => void;
}

const ActionDialog: FC<Props> = (props) => {
	const { open, onClose, onSubmit } = props;

	const actions = [
		{
			text: "Search",
			svg: <SearchSvg />,
		},
		{
			text: "Reply",
			svg: <ReplySvg />,
		},
		{
			text: "Copy",
			svg: <CopySvg />,
		},
		{
			text: "Pin",
			svg: <PinSvg />,
		},
		{
			text: "Like",
			svg: <HeartSvg />,
		},
		{
			text: "Hide",
			svg: <EyeHideSvg />,
		},
		{
			text: "Report",
			svg: <WarningSvg />,
		},
	];

	return (
		<BottomSheetWrapper
			open={open}
			onClose={onClose}
			snapPoint={SnapPoints.Ninety}
		>
			<View style={tw.style("flex px-[10px]")}>
				{actions.map((action, index) => (
					<TouchableOpacity
						key={index}
						style={tw.style("flex m-[10px]")}
					>
						<View style={tw.style("flex-row")}>
							<View style={tw.style("h-[15px] w-[15px]")}>
								{action.svg}
							</View>
							<View style={tw.style("ml-[20px]")}>
								<Text>{action.text}</Text>
							</View>
						</View>
					</TouchableOpacity>
				))}
			</View>
		</BottomSheetWrapper>
	);
};

export default ActionDialog;
