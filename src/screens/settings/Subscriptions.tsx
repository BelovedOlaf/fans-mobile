import React, { useEffect, useState } from "react";
import Toast from "react-native-toast-message";

import {
	AttentionCard,
	CancelSubscriptionModal,
	SubscriptionCard,
} from "@components/common/subscriptionCard";
import {
	FansChips,
	FansGap,
	FansScreen3,
	FansView,
} from "@components/controls";
import { SendMessageDialog } from "@components/posts/dialogs";
import SubscriptionDetailsSheet from "@components/sheet/settings/subscriptions/SubscriptionDetails";
import {
	getSubscriptions,
	unsubscribe,
} from "@helper/endpoints/subscriptions/apis";
import tw from "@lib/tailwind";

import {
	SubscribeActionType,
	SubscriptionFilterTypes,
} from "@usertypes/commonEnums";
import { Subscription } from "@usertypes/types";
import { CommonActionType, useAppContext } from "@context/useAppContext";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { SettingsNativeStackParams } from "@usertypes/navigations";

const SubscriptionsScreen = (
	props: NativeStackScreenProps<SettingsNativeStackParams, "Subscriptions">,
) => {
	const { route } = props;
	const { params } = route;
	const { returnPopup, subscriptionId } = params || {};

	const { dispatch } = useAppContext();

	const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);

	const [activeSubscriptions, setActiveSubscriptions] = useState<
		Subscription[]
	>([]);

	const [expiredSubscriptions, setExpiredSubscriptions] = useState<
		Subscription[]
	>([]);

	const [needAttentionSubscriptions, setNeedAttentionSubscriptions] =
		useState<Subscription[]>([]);

	const items = [
		{ text: `All ${subscriptions.length}` },
		{ text: `Active ${activeSubscriptions.length}` },
		{ text: `Expired ${expiredSubscriptions.length}` },
		{ text: `Need attention ${needAttentionSubscriptions.length}` },
	];

	const [selected, setSelected] = useState(0);
	const [
		isCancelSubscriptionModalVisible,
		setCancelSubscriptionModalVisible,
	] = useState(false);
	const [isMessageDialogOpened, setMessageDialogOpened] = useState(false);

	const handlePressMessage = () => setMessageDialogOpened(true);
	const handleCloseMessageDialog = () => setMessageDialogOpened(false);

	const [openActions, setOpenActions] = useState(0);
	const [selectedSubscription, setSelectedSubscription] =
		useState<Subscription>();

	const fetchSubscriptions = async () => {
		try {
			const response = await getSubscriptions();

			if (response.ok) {
				const activeSubscriptions = response.data.filter(
					(subscription) =>
						subscription.status === "Active" ||
						new Date(subscription.endDate) >= new Date(),
				);

				const expiredSubscriptions = response.data.filter(
					(subscription) =>
						subscription.status === "Cancelled" &&
						new Date(subscription.endDate) < new Date(),
				);

				const needAttentionSubscriptions = response.data.filter(
					(subscription) => subscription.error,
				);

				setSubscriptions(response.data);
				setActiveSubscriptions(activeSubscriptions);
				setExpiredSubscriptions(expiredSubscriptions);
				setNeedAttentionSubscriptions(needAttentionSubscriptions);
			} else {
				Toast.show({
					type: "error",
					text1: response.data.message,
				});
			}
		} catch (error) {
			Toast.show({
				type: "error",
				text1: "Something went wrong",
			});
		}
	};

	useEffect(() => {
		fetchSubscriptions();
	}, []);

	const onDeleteSubscription = async (subscription?: Subscription) => {
		if (!selectedSubscription && !subscription) return;
		const subscriptionId = subscription?.id || selectedSubscription?.id;
		if (!subscriptionId) return;

		try {
			const response = await unsubscribe({
				id: subscriptionId,
			});

			if (response.ok) {
				fetchSubscriptions();
				Toast.show({
					type: "success",
					text1: "Subscription deleted",
				});
			} else {
				Toast.show({
					type: "error",
					text1: response.data.message,
				});
			}
		} catch (error) {
			Toast.show({
				type: "error",
				text1: "Something went wrong",
			});
		}
	};

	const handleOpenSubscribeModal = (subscription?: Subscription) => {
		if (!subscription) return;

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
				onSuccess: fetchSubscriptions,
			},
		});
	};

	return (
		<FansScreen3 contentStyle1={{ maxWidth: { lg: 670 } }}>
			<FansView style={tw.style("flex-column gap-[20px]")}>
				<FansChips
					data={items}
					value={selected}
					onChangeValue={setSelected}
				/>

				{(selected === 0 || selected === 1) &&
					activeSubscriptions.map((subscription) => (
						<SubscriptionCard
							subscription={subscription}
							variant={
								subscription.status === "Active" ||
								new Date(subscription.endDate) >= new Date()
									? SubscriptionFilterTypes.Active
									: SubscriptionFilterTypes.Expired
							}
							onClickShare={() => {}}
							onClickMenu={() => {
								setOpenActions(1);
								setSelectedSubscription(subscription);
							}}
							onClickMessage={handlePressMessage}
							showUpdatePaymentPopup={
								returnPopup ===
									"UpdatePaymentMethodSubscriptions" &&
								subscriptionId === subscription.id
							}
						/>
					))}
				{(selected === 0 || selected === 2) &&
					expiredSubscriptions.map((subscription) => (
						<SubscriptionCard
							subscription={subscription}
							variant={SubscriptionFilterTypes.Expired}
							onClickShare={() => {}}
							onClickMenu={() => {
								setOpenActions(1);
								setSelectedSubscription(subscription);
							}}
							onClickMessage={handlePressMessage}
						/>
					))}
				{(selected === 0 || selected === 3) &&
					needAttentionSubscriptions.map((subscription) => (
						<FansView style={tw.style("mt-6 gap-y-4")}>
							<AttentionCard
								subscription={subscription}
								onDeleteSubscription={onDeleteSubscription}
							/>
						</FansView>
					))}
			</FansView>
			<SubscriptionDetailsSheet
				isActive={
					selectedSubscription?.status ===
					SubscriptionFilterTypes.Active
				}
				open={openActions !== 0}
				onClose={() => setOpenActions(0)}
				onDeleteSubscription={() =>
					setCancelSubscriptionModalVisible(true)
				}
				onRenewSubscription={() =>
					handleOpenSubscribeModal(selectedSubscription)
				}
			/>
			<CancelSubscriptionModal
				visible={isCancelSubscriptionModalVisible}
				onClose={() => setCancelSubscriptionModalVisible(false)}
				onSubmit={() => {
					setCancelSubscriptionModalVisible(false);
					onDeleteSubscription();
				}}
			/>
			<SendMessageDialog
				open={isMessageDialogOpened}
				onClose={handleCloseMessageDialog}
				onSubmit={() => {}}
			/>
			<FansGap height={20} />
		</FansScreen3>
	);
};

export default SubscriptionsScreen;
