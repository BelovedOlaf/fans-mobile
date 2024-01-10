import { View, Text } from "react-native";
import React, { FC } from "react";
import tw from "@lib/tailwind";
import { IconButton } from "react-native-paper";

import {
	CalendarSvg,
	EditSvg,
	TrashSvg,
	CopyLinkSvg,
} from "@assets/svgs/common";
import { ICampaign } from "@usertypes/types";
import { PromotionType } from "@usertypes/commonEnums";

interface Props {
	data: ICampaign;
	onClickEdit: () => void;
	onClickDelete: () => void;
}

const PromotionCampaign: FC<Props> = (props) => {
	const { data, onClickDelete, onClickEdit } = props;

	return (
		<View
			style={tw.style(
				"flex-row items-center border border-fans-grey rounded-[25px] h-[42px] pl-3 pr-1",
			)}
		>
			<CopyLinkSvg width={17.3} height={17.3} color="#a854f5" />
			<Text style={tw.style("text-[18px] leading-6 text-black ml-4")}>
				{data.type === PromotionType.Discount
					? `${data.discount}% OFF`
					: "Free Trial"}
			</Text>

			<View style={tw.style("ml-auto flex-row items-center")}>
				{data.endDate ? (
					<View
						style={tw.style(
							"flex-row items-center py-[2px] pr-4 pl-[10px] bg-[#f6edff] rounded-[25px]",
						)}
					>
						<CalendarSvg
							width={10.92}
							height={12.23}
							color="#a854f5"
						/>
						<Text
							style={tw.style(
								"text-base leading-[21px] text-fans-purple ml-1",
							)}
						>
							{new Date(data.endDate).toJSON().split("T")[0]}
						</Text>
					</View>
				) : null}

				<IconButton
					icon={() => (
						<EditSvg width={12.94} height={13.5} color="#000" />
					)}
					containerColor="#f0f0f0"
					style={tw.style("m-0 w-[34px] h-[34px] ml-2")}
					onPress={onClickEdit}
				/>
				<IconButton
					icon={() => (
						<TrashSvg
							width={11.87}
							height={14.76}
							color="#eb2121"
						/>
					)}
					containerColor="#f0f0f0"
					style={tw.style("m-0 w-[34px] h-[34px] ml-2")}
					onPress={onClickDelete}
				/>
			</View>
		</View>
	);
};

export default PromotionCampaign;
