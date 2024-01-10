import { View, Pressable, PressableProps } from "react-native";
import React, { FC } from "react";

import tw from "@lib/tailwind";
import FansText from "@components/controls/Text";
import { ISubscription } from "@usertypes/types";
import { PromotionType } from "@usertypes/commonEnums";

interface Props extends PressableProps {
	data: ISubscription;
}

const SubscriptionButton: FC<Props> = (props) => {
	const { data, ...others } = props;
	const campaign = data.campaigns ? data.campaigns[0] : null;

	const getTitle = () => {
		if (campaign) {
			if (campaign.type === PromotionType.FreeTrial) {
				return "Free trial";
			} else {
				return "Subscribe";
			}
		} else {
			return "Subscribe";
		}
	};
	const getValueString = () => {
		if (campaign) {
			if (campaign.type === PromotionType.FreeTrial) {
				return campaign.duration === 0
					? ""
					: `for ${
							campaign.duration
					  } ${campaign.durationType.toLocaleLowerCase()}`;
			} else {
				return `$${Math.fround(
					(data.price *
						(100 - parseFloat(campaign.discount as string))) /
						100,
				).toFixed(2)}/month`;
			}
		} else {
			return data.price === 0 ? "FOR FREE" : `$${data.price}/month`;
		}
	};

	return (
		<Pressable
			style={tw.style(
				"border border-fans-purple pl-[21px] pr-[18px] h-[42px] rounded-[28px] flex-row items-center justify-between bg-fans-purple",
				campaign && "pr-1.5",
			)}
			{...others}
		>
			<FansText
				fontSize={19}
				lineHeight={26}
				style={tw.style("text-white font-bold")}
			>
				{getTitle()}
			</FansText>
			<View style={tw.style("flex-row items-center")}>
				<FansText
					fontSize={16}
					lineHeight={21}
					style={tw.style("text-white")}
				>
					{getValueString()}
				</FansText>
				{campaign ? (
					<View
						style={tw.style(
							"h-7.5 rounded-[15px] bg-fans-purple-light flex-row items-center px-4 ml-2",
						)}
					>
						<FansText
							fontSize={13}
							lineHeight={17}
							style={tw.style("text-fans-purple font-semibold")}
						>
							{campaign.type === PromotionType.Discount
								? `${campaign.discount}% OFF`
								: "FREE"}
						</FansText>
					</View>
				) : null}
			</View>
		</Pressable>
	);
};

export default SubscriptionButton;
