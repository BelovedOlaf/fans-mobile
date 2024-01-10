import { OutlinedInfoSvg, StarCheckSvg } from "@assets/svgs/common";
import PaymentMethodModal from "@components/common/subscriptionCard/paymentMethodModal";
import { FansText, FansView } from "@components/controls";
import tw from "@lib/tailwind";
import { RoundButtonType } from "@usertypes/commonEnums";
import { Subscription } from "@usertypes/types";
import React, { FC, useState } from "react";
import { Text, View } from "react-native";
import AvatarWithStatus from "../AvatarWithStatus";
import CustomText from "../customText";
import RoundButton from "./RoundButton";

interface Props {
	subscription: Subscription;
	onDeleteSubscription: (subscription: Subscription) => void;
}

const AttentionCard: FC<Props> = (props) => {
	const { subscription, onDeleteSubscription } = props;

	const [openUpdatePayment, setOpenUpdatePayment] = useState(false);

	function getNextRenewalDate() {
		const today = new Date();
		const nextMonth = new Date(today);

		nextMonth.setMonth(today.getMonth() + 1);

		if (nextMonth.getDate() !== today.getDate()) {
			nextMonth.setDate(0);
		}

		return nextMonth;
	}

	function formatDateToCustomString(date: Date) {
		return date.toLocaleDateString("en-US", {
			year: "numeric",
			month: "long",
			day: "numeric",
		});
	}

	return (
		<View
			style={tw.style(
				"rounded-[15px] border border-[#dedede] px-4 pb-5 pt-[18px]",
			)}
		>
			<View
				style={tw.style("flex-row items-center justify-between mb-5")}
			>
				<View style={tw.style("flex-row")}>
					<AvatarWithStatus size={46} avatar="" />
					<View style={tw.style("ml-3")}>
						<View style={tw.style("flex-row items-center")}>
							<Text
								style={tw.style(
									"text-[19px] font-bold leading-[26px] mr-3",
								)}
							>
								{subscription.creator.displayName}
							</Text>
							<StarCheckSvg width={15.66} height={15} />
						</View>
						<Text
							style={tw.style(
								"text-base text-fans-dark-grey leading-[21px]",
							)}
						>
							@
							{
								subscription.creator.profileLink
									.split("/")
									.slice(-1)[0]
							}
						</Text>
					</View>
				</View>
				<FansView style={tw.style("flex items-end")}>
					<FansText
						style={tw.style(
							"font-inter-semibold",
							"text-[16px] text-fans-purple",
						)}
					>
						${subscription.amount}/month
					</FansText>
					<CustomText
						size="sm"
						style="text-fans-dark-grey text-right"
					>
						{formatDateToCustomString(getNextRenewalDate())}
					</CustomText>
				</FansView>
			</View>
			<View
				style={tw.style(
					"flex-row items-center py-[14px] px-5 bg-[#f6edff] rounded-[15px] mb-2",
				)}
			>
				<OutlinedInfoSvg size={14.23} color="#a854f5" />
				<CustomText size="base" style="text-fans-purple ml-2.5">
					{subscription.error}
				</CustomText>
			</View>
			<View style={tw.style("flex-row gap-x-[14px]")}>
				<View style={tw.style("flex-1")}>
					<RoundButton
						variant={RoundButtonType.OUTLINE_PRIMARY}
						onPress={() => onDeleteSubscription(subscription)}
					>
						Cancel
					</RoundButton>
				</View>
				<View style={tw.style("flex-1")}>
					<RoundButton onPress={() => setOpenUpdatePayment(true)}>
						Resume
					</RoundButton>
				</View>
			</View>
			<PaymentMethodModal
				visible={openUpdatePayment}
				handleClose={() => setOpenUpdatePayment(false)}
				subscription={subscription}
			/>
		</View>
	);
};

export default AttentionCard;
