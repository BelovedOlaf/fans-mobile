import React, { FC, Fragment, useState } from "react";
import { Image, Pressable, Text, View } from "react-native";
import { IconButton } from "react-native-paper";
import Collapsible from "react-native-collapsible";
import tw from "@lib/tailwind";
import { cdnURL } from "@helper/Utils";

import {
	ChevronDownSvg,
	MessageSvg,
	ThreeDotsSvg,
	CreditCardSvg,
} from "@assets/svgs/common";

import { FansView, FansImage, FansDivider } from "@components/controls";
import SubscribeDialog from "@components/common/dialog/subscribeDialog";
import PaymentMethodModal from "@components/common/subscriptionCard/paymentMethodModal";
import CustomText from "../customText";
import SubscriptionBundle from "../subscriptionBundle";
import FansLink from "../link";

import {
	SubscriptionFilterTypes,
	SubscribeActionType,
} from "@usertypes/commonEnums";
import { Subscription, Bundle } from "@usertypes/types";
import { CommonActionType, useAppContext } from "@context/useAppContext";

interface Props {
	subscription: Subscription;
	variant: SubscriptionFilterTypes;
	showUpdatePaymentPopup?: boolean;
	onClickShare: () => void;
	onClickMenu: () => void;
	onClickMessage: () => void;
}

const SubscriptionCard: FC<Props> = (props) => {
	const {
		subscription,
		onClickMenu,
		onClickMessage,
		showUpdatePaymentPopup = false,
	} = props;

	const { dispatch } = useAppContext();

	const [collapsed, setCollapsed] = useState(true);
	const [openSubscribe, setOpenSubscribe] = useState(false);
	const [openUpdatePayment, setOpenUpdatePayment] = useState(
		showUpdatePaymentPopup,
	);

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

	const handleOpenSubscribeModal = () => {
		dispatch.setCommon({
			type: CommonActionType.toggleSubscribeModal,
			data: {
				visible: true,
				creator: subscription.creator,
				subscribeActionType: subscription.bundle
					? SubscribeActionType.Bundle
					: subscription.tier
					? SubscribeActionType.Tier
					: SubscribeActionType.Subscribe,
				bundleId: subscription.bundle?.id,
				subscribeTierId: (subscription.subscriptionId?.toString() ??
					subscription.tierId?.toString())!,
				defaultTab: "start",
			},
		});
	};

	const defaultAvatar = require("@assets/images/default-avatar.png");

	const isCanceledButNotExpired =
		new Date(subscription.endDate) >= new Date();

	return (
		<FansView style={tw.style("border border-fans-grey-de rounded-[15px]")}>
			<View style={tw.style("h-[85px] rounded-t-[15px] relative")}>
				<Image
					source={{
						uri: cdnURL(subscription.creator.cover[0]),
					}}
					style={tw.style("w-full h-full rounded-t-[15px]")}
				/>
				{/* {props.variant === SubscriptionFilterTypes.Expired ? (
					<View
						style={tw.style(
							"absolute top-5 left-[18px] bg-[rgba(0,0,0,0.5)] rounded-[15px] py-[3.5px] px-[13.5px]",
						)}
					>
						<Text style={tw.style("text-[14px] text-white")}>
							10 New posts
						</Text>
					</View>
				) : null} */}

				<View
					style={tw.style(
						"absolute top-[18px] right-[18px] gap-x-2 flex-row",
					)}
				>
					{props.variant === SubscriptionFilterTypes.Active ? (
						<Fragment>
							{/* <IconButton
								style={tw.style("w-[34px] h-[34px] m-0")}
								containerColor="#f0f0f0"
								icon={() => (
									<MessageSvg size={18.3} color="#000" />
								)}
								onPress={onClickMessage}
							/> */}
							<IconButton
								style={tw.style("w-[34px] h-[34px] m-0")}
								containerColor="#f0f0f0"
								icon={() => (
									<CreditCardSvg width={19.33} color="#000" />
								)}
								onPress={() => setOpenUpdatePayment(true)}
							/>
						</Fragment>
					) : null}
					<IconButton
						style={tw.style("w-[34px] h-[34px] m-0")}
						containerColor="#f0f0f0"
						icon={() => <ThreeDotsSvg size={18} color="#000" />}
						onPress={onClickMenu}
					/>
				</View>
			</View>
			<View style={tw.style("px-[18px] pb-[18px]")}>
				<View style={tw.style("flex-row items-end mt-[-20px] mb-5")}>
					<FansView
						style={tw.style(
							"w-[79px] h-[79px]",
							"border border-[4px] border-fans-white rounded-full",
							"relative",
						)}
					>
						<FansImage
							source={
								subscription.creator.avatar
									? {
											uri: cdnURL(
												subscription.creator.avatar,
											),
									  }
									: defaultAvatar
							}
						/>
						<FansView
							style={tw.style(
								"w-[15px] h-[15px]",
								"absolute bottom-[2px] right-[6px]",
								"bg-fans-green",
								"border border-[2px] border-fans-white rounded-full",
							)}
						/>
					</FansView>
					<FansLink
						url={`/${subscription.creator.profileLink
							.split("/")
							.splice(-1)}`}
					>
						<View style={tw.style("mb-[5px] ml-[14px] shrink")}>
							<CustomText size="xl" numberOfLines={1}>
								{subscription.creator.displayName}
							</CustomText>
							<CustomText
								size="base"
								style="text-fans-dark-grey"
								numberOfLines={1}
							>
								@
								{
									subscription.creator.profileLink
										.split("/")
										.slice(-1)[0]
								}
							</CustomText>
						</View>
					</FansLink>
				</View>
				{subscription.bundle ? (
					<SubscriptionBundle
						title={`${subscription.bundle.month} months`}
						value={`$${subscription.amount} / month`}
						optionalText={`($${subscription.bundle.discount} off)`}
						onPress={() =>
							props.variant === SubscriptionFilterTypes.Expired
								? handleOpenSubscribeModal()
								: setOpenUpdatePayment(true)
						}
					/>
				) : (
					<SubscriptionBundle
						title={
							props.variant === SubscriptionFilterTypes.Active
								? `$${subscription.amount} / month`
								: "Subscribe"
						}
						value={
							props.variant === SubscriptionFilterTypes.Expired
								? `$${subscription.amount} / month`
								: ""
						}
						variant={
							props.variant === SubscriptionFilterTypes.Active
								? "outlined"
								: "contained"
						}
						onPress={() =>
							props.variant === SubscriptionFilterTypes.Expired
								? handleOpenSubscribeModal()
								: setOpenUpdatePayment(true)
						}
					/>
				)}

				<View
					style={tw.style(
						"flex-row items-center justify-between mt-3",
					)}
				>
					<CustomText style="text-fans-dark-grey">
						{props.variant === SubscriptionFilterTypes.Active
							? "Renews"
							: isCanceledButNotExpired
							? "Expires"
							: "Expired"}
					</CustomText>
					<CustomText style="text-fans-dark-grey">
						{props.variant === SubscriptionFilterTypes.Active
							? formatDateToCustomString(getNextRenewalDate())
							: formatDateToCustomString(
									new Date(subscription.endDate),
							  )}
					</CustomText>
				</View>
				{props.variant === SubscriptionFilterTypes.Expired &&
				(subscription.subscription?.bundles?.length ?? 0) > 0 ? (
					<Fragment>
						<FansDivider style={tw.style("h-[1px] mt-5 mb-4")} />

						<Pressable
							style={tw.style(
								"flex-row items-center justify-between",
							)}
							onPress={() => setCollapsed(!collapsed)}
						>
							<CustomText size="lg">
								Subscription bundles
							</CustomText>
							<ChevronDownSvg size={15.72} color="#707070" />
						</Pressable>
						<Collapsible collapsed={collapsed}>
							<View style={tw.style("pt-4 gap-y-2")}>
								{subscription.subscription?.bundles?.map(
									(bundle: Bundle) => (
										<SubscriptionBundle
											title={`${bundle.month} months`}
											value={`$${bundle.price} / month`}
											optionalText={`($${bundle.discount} off)`}
											onPress={() =>
												props.variant ===
												SubscriptionFilterTypes.Expired
													? handleOpenSubscribeModal()
													: setOpenUpdatePayment(true)
											}
										/>
									),
								)}
							</View>
						</Collapsible>
					</Fragment>
				) : null}
			</View>
			<PaymentMethodModal
				visible={openUpdatePayment}
				handleClose={() => setOpenUpdatePayment(false)}
				subscription={subscription}
			/>
			<SubscribeDialog />
		</FansView>
	);
};

export default SubscriptionCard;
