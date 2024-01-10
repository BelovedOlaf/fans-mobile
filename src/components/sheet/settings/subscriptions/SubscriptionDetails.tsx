import React, { FC } from "react";
import { TouchableOpacity } from "react-native";
import {
	BlockSvg,
	CopyLinkSvg,
	ListSvg,
	RenewSvg,
	Trash3Svg,
	WarningSvg,
} from "@assets/svgs/common";
import BottomSheetWrapper from "@components/common/bottomSheetWrapper";
import { FansText, FansView } from "@components/controls";
import tw from "@lib/tailwind";

interface Props {
	isActive: boolean;
	open: boolean;
	onClose: () => void;
	onDeleteSubscription: () => void;
	onRenewSubscription: () => void;
}

const SubscriptionDetailsSheet: FC<Props> = (props) => {
	const {
		open,
		isActive,
		onClose,
		onDeleteSubscription,
		onRenewSubscription,
	} = props;

	return (
		<BottomSheetWrapper open={open} onClose={onClose}>
			{[
				!isActive && {
					label: "Renew subscription",
					icon: (
						<FansView style={tw.style("w-[20.54px] h-[27.53px]")}>
							<RenewSvg />
						</FansView>
					),
					onPress: onRenewSubscription,
				},
				// {
				// 	label: "Copy profile link",
				// 	icon: (
				// 		<FansView style={tw.style("w-[24.39px] h-[24.41px]")}>
				// 			<CopyLinkSvg />
				// 		</FansView>
				// 	),
				// },
				// {
				// 	label: "Add/remove from lists",
				// 	icon: (
				// 		<FansView style={tw.style("w-[24.26px] h-[23px]")}>
				// 			<ListSvg />
				// 		</FansView>
				// 	),
				// },
				isActive && {
					label: "Cancel subscription",
					labelColor: "text-fans-red",
					icon: (
						<FansView style={tw.style("w-[18.5px] h-[23px]")}>
							<Trash3Svg color={tw.color("fans-red")} />
						</FansView>
					),
					onPress: onDeleteSubscription,
				},
				// {
				// 	label: "Block",
				// 	labelColor: "text-fans-red",
				// 	icon: (
				// 		<FansView style={tw.style("w-[24.29px] h-[24.29px]")}>
				// 			<BlockSvg color={tw.color("fans-red")} />
				// 		</FansView>
				// 	),
				// },
				// {
				// 	label: "Report",
				// 	labelColor: "text-fans-red",
				// 	icon: (
				// 		<FansView style={tw.style("w-[25px] h-[22.57px]")}>
				// 			<WarningSvg color={tw.color("fans-red")} />
				// 		</FansView>
				// 	),
				// },
			].map((item, index) => {
				if (!item) return;
				const { label, icon, labelColor, onPress } = item;

				return (
					<TouchableOpacity onPress={onPress} key={index}>
						<FansView
							style={tw.style(
								"h-[52px]",
								"flex-row gap-[20px] items-center",
								"mx-[17px]",
							)}
						>
							{icon}
							<FansText
								style={tw.style("text-[18px]", labelColor)}
							>
								{label}
							</FansText>
						</FansView>
					</TouchableOpacity>
				);
			})}
		</BottomSheetWrapper>
	);
};

export default SubscriptionDetailsSheet;
