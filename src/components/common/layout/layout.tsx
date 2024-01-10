import { useEffect } from "react";
import { View } from "react-native";
import React, { FC } from "react";
import Head from "expo-router/head";

import tw from "@lib/tailwind";

import Sidebar from "./sidebar";
import MobileSidebar from "./mobileSidebar";
import {
	LoadingModal,
	ManageSubscriptionDialog,
	NoticeChargeBackDialog,
	FairTransactionDialog,
	AnimationLoadingModal,
} from "@components/common/dialog";
import PostModal from "@components/posts/postModal";
import {
	SendTipDialog,
	PostTypesDialog,
	PostLiveDialog,
	PostMediaDialog,
	SendTipSuccessDialog,
} from "@components/posts/dialogs";

import { popupStatus } from "@helper/endpoints/profile/apis";
import { ModalActionType, useAppContext } from "@context/useAppContext";
import {
	FAIR_TRANSACTION_DIALOG_ID,
	NOTICE_CHARGEBACKS_DIALOG_ID,
	MANAGE_SUBSCRIPTION_DIALOG_ID,
} from "@constants/modal";
import { Subscription } from "@usertypes/types";
import { Text } from "react-native-paper";

interface Props {
	title?: string;
	description?: string;
	children: React.ReactNode;
}

const AppLayout: FC<Props> = (props) => {
	const { children, title = "FYP.Fans", description = "" } = props;

	const { state, dispatch } = useAppContext();

	const [subscription, setSubscription] = React.useState<Subscription>();

	// useEffect(() => {
	// 	if (state.user.userInfo.id === "0") return;

	// 	const fetchPopupStatus = async () => {
	// 		const resp = await popupStatus();

	// 		if (resp.ok) {
	// 			if (resp.data.popupStatus.showFairTransactionDialog) {
	// 				dispatch.setModal({
	// 					type: ModalActionType.showModal,
	// 					data: { id: FAIR_TRANSACTION_DIALOG_ID, show: true },
	// 				});
	// 			}

	// 			if (resp.data.popupStatus.showNoticeChargeBackDialog) {
	// 				dispatch.setModal({
	// 					type: ModalActionType.showModal,
	// 					data: { id: NOTICE_CHARGEBACKS_DIALOG_ID, show: true },
	// 				});
	// 			}

	// 			if (resp.data.popupStatus.showManageSubscriptionDialog) {
	// 				dispatch.setModal({
	// 					type: ModalActionType.showModal,
	// 					data: { id: MANAGE_SUBSCRIPTION_DIALOG_ID, show: true },
	// 				});
	// 			}

	// 			if (resp.data.popupStatus.paymentSubscription) {
	// 				setSubscription(resp.data.popupStatus.paymentSubscription);
	// 			}
	// 		}
	// 	};
	// 	fetchPopupStatus();
	// }, [state.user.userInfo.id]);

	return (
		<View
			style={tw.style(
				"flex-1 bg-white relative flex-row md:pl-[251px] lg:pl-[343px] xl:pl-[417px]",
			)}
		>
			<Head>
				<title>{title}</title>
				<meta name="description" content={description} />
			</Head>
			<Sidebar />
			{children}
			<PostTypesDialog />
			<MobileSidebar />

			{/* <SendTipDialog /> */}
			{/* <SendTipSuccessDialog /> */}

			<PostModal />
			{/* <PostLiveDialog /> */}
			<PostMediaDialog />
			<LoadingModal />
			<ManageSubscriptionDialog subscription={subscription} />
			<NoticeChargeBackDialog />
			<FairTransactionDialog />
			{/* <AnimationLoadingModal /> */}
		</View>
	);
};

export default AppLayout;
