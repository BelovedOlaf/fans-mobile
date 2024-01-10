import {
	getNotifications,
	markNotificationRead,
} from "@helper/endpoints/notifications/apis";
import { INotification } from "@usertypes/types";
import { atom, selector, useRecoilCallback } from "recoil";

export const notificationListAtom = atom({
	key: "notificationList",
	default: [] as INotification[],
});

export const notificationCountSelector = selector({
	key: "notificationCount",
	get: ({ get }) => {
		const notifications = get(notificationListAtom);
		return notifications.reduce((acc, curr) => {
			if (curr.read) return acc;
			return acc + 1;
		}, 0);
	},
});

export const useRefreshNotifications = () => {
	const refreshNotifications = useRecoilCallback(({ set }) => async () => {
		const resp = await getNotifications();
		if (!resp.ok) return;

		set(notificationListAtom, resp.data.notifications);
	});

	return refreshNotifications;
};

export const useMarkNotificationAsRead = () => {
	const markNotificationAsRead = useRecoilCallback(
		({ set }) =>
			async (notificationId: string) => {
				set(notificationListAtom, (prev) =>
					prev.map((notification) => {
						if (notification.id !== notificationId)
							return notification;

						if (!notification.read)
							markNotificationRead(
								{},
								{
									id: notificationId,
								},
							).catch((err) => console.error(err));

						return { ...notification, read: true };
					}),
				);
			},
	);

	return markNotificationAsRead;
};
