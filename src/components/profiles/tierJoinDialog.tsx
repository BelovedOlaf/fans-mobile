import RoundButton from "@components/common/RoundButton";
import BottomSheetWrapper from "@components/common/bottomSheetWrapper";
import ListLine from "@components/common/listLine";
import { FansDivider } from "@components/controls";
import tw from "@lib/tailwind";
import { ISubscriptionTier } from "@usertypes/types";
import React, { FC } from "react";
import { Text, View } from "react-native";

interface Props {
	open: boolean;
	onClose: () => void;
	data?: ISubscriptionTier;
	onClickJoin: () => void;
}

const TierJoinDialog: FC<Props> = (props) => {
	const { open, onClose, data, onClickJoin } = props;

	return (
		<BottomSheetWrapper open={open} onClose={onClose}>
			<View style={tw.style("px-[18px]")}>
				<Text
					style={tw.style(
						"text-[23px] leading-[31px] font-bold text-black text-center mb-2",
					)}
				>
					{data?.title ?? ""}
				</Text>
				<Text
					style={tw.style(
						"text-[42px] leading-[56px] text-fans-purple font-medium text-center",
					)}
				>
					{`$${(data?.price as number) ?? 0}`}
				</Text>
				<Text
					style={tw.style(
						"text-[15px] leading-5 text-fans-purple mt-[-3px] mb-3 text-center",
					)}
				>
					PER MONTH
				</Text>

				<View style={tw.style("w-[134px] mx-auto mb-5.5")}>
					<RoundButton onPress={onClickJoin}>Join</RoundButton>
				</View>
				<Text
					style={tw.style(
						"text-base leading-[21px] text-black text-center",
					)}
				>
					{data?.description}
				</Text>

				<FansDivider style={tw.style("bg-fans-grey mt-5.5 mb-5")} />
				<View style={tw.style("gap-y-[18px] px-4")}>
					{data?.perks.map((el, index) => (
						<ListLine text={el} size="lg" key={index} />
					))}
				</View>
			</View>
		</BottomSheetWrapper>
	);
};

export default TierJoinDialog;
