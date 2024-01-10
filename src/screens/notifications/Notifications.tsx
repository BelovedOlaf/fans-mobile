import DiscountDlg from "@components/chat/common/dialogs/DiscountDlg";
import {
	FansChips,
	FansScreen1,
	FansScreen3,
	FansText,
} from "@components/controls";
import tw from "@lib/tailwind";
import {
	notificationListAtom,
	useRefreshNotifications,
} from "@state/notifications";
import { NotificationType } from "@usertypes/types";
import React, { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import { useRecoilValue } from "recoil";
import CreatorNotificationCard from "./CreatorNotificationCard";

interface INotificationFilter {
	text: string;
	notificationTypes?: Array<NotificationType>;
}

const items: Array<INotificationFilter> = [
	{
		text: "All",
	},
	{
		text: "Engagement",
		notificationTypes: [
			NotificationType.LikeComment,
			NotificationType.LikePost,
			NotificationType.MadeComment,
			NotificationType.FanLikeComment,
			NotificationType.ReplyComment,
			NotificationType.MentionPost,
			NotificationType.ViewedPost,
		],
	},
	{
		text: "Subscriptions",
		notificationTypes: [
			NotificationType.SubscriptionCharged,
			NotificationType.SubscriptionSubscribed,
			NotificationType.SubscriptionRenewedCreator,
			NotificationType.SubscriptionRenewedFan,
			NotificationType.SubscriptionCancelled,
			NotificationType.SubscriptionExpiring,
			NotificationType.SubscriptionExpired,
			NotificationType.FanChangedSubscriptionPrice,
			NotificationType.FanRunningPromotion,
			NotificationType.FanSubscriptionExpired,
			NotificationType.FanSubscriptionRenewed,
			NotificationType.FanSubscriptionExpire,
		],
	},
	{
		text: "Tips",
		notificationTypes: [
			NotificationType.Tips,
			NotificationType.TipsOnChat,
			NotificationType.TipsOnPost,
			NotificationType.FanSentTips,
		],
	},
	{
		text: "Mentions",
		notificationTypes: [NotificationType.MentionPost],
	},
	{
		text: "Warnings",
		notificationTypes: [
			NotificationType.WarningGuidelinesViolation,
			NotificationType.WarningPostUnderReview,
			NotificationType.WarningTOSViolation,
		],
	},
];

const NotificationsScreen = () => {
	const [selected, setSelected] = useState(0);
	const filter = items[selected] ?? items[0];

	const [formType, setFormType] = useState("");
	const notifications = useRecoilValue(notificationListAtom);
	const refreshNotifications = useRefreshNotifications();

	useEffect(() => {
		refreshNotifications();
	}, []);

	return (
		<FansScreen3>
			<View style={tw`pb-4 md:px-4`}>
				<FansChips
					data={items}
					value={selected}
					onChangeValue={setSelected}
				/>
			</View>
			<ScrollView
				showsVerticalScrollIndicator={false}
				contentContainerStyle={tw.style("flex gap-[25px]")}
			>
				<FansText
					fontFamily="inter-bold"
					fontSize={19}
					style={tw`md:px-4`}
				>
					New
				</FansText>
				<View style={tw.style("flex")}>
					{notifications
						.filter((n) => {
							if (!filter.notificationTypes) return true;
							return filter.notificationTypes.includes(n.type);
						})
						.map((n, i) => (
							<CreatorNotificationCard notify={n} key={n.id} />
						))}
				</View>
			</ScrollView>
			<DiscountDlg
				open={formType === "discount"}
				onClose={() => setFormType("")}
				onSubmit={() => {}}
			/>
		</FansScreen3>
	);
};

export default NotificationsScreen;
