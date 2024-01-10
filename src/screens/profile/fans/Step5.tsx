import React, { useState } from "react";

import {
	FansGap,
	FansHorizontalDivider,
	FansScreen2,
	FansSwitch,
	FansText,
	FansView,
} from "@components/controls";

import { ProfileActionType, useAppContext } from "@context/useAppContext";
import {
	getUserSettings,
	updateVideoSettings,
} from "@helper/endpoints/profile/apis";
import { IProfileSettings } from "@usertypes/types";

const Step5 = () => {
	const { state, dispatch } = useAppContext();

	const { notifications } = state.profile.settings.video;
	const { video } = state.profile.settings;

	const {
		newRequests,
		cancellations,
		reminders,
		notificationsByEmail,
		notificationsByPhone,
	} = notifications;

	const handleChangeField = async (name: string, val: boolean) => {
		const updatedNotifications = {
			...state.profile.settings.video.notifications,
			[name]: val,
		};

		const updatedSettings = {
			...state.profile.settings,
			video: {
				...video,
				notifications: updatedNotifications,
			},
		};

		await updateSettings(updatedSettings);
	};

	const updateSettings = async (updatedSettings: IProfileSettings) => {
		const response = await updateVideoSettings(updatedSettings);

		if (response.ok) {
			fetchProfileSettings();
		}
	};

	const fetchProfileSettings = async () => {
		const response = await getUserSettings();
		if (response.ok) {
			const profileSettings = response.data;
			dispatch.setProfile({
				type: ProfileActionType.updateSettings,
				data: profileSettings,
			});
		}
	};

	return (
		<FansScreen2>
			<FansView>
				<FansText fontFamily="inter-semibold" fontSize={17}>
					Notify top fans
				</FansText>
				<FansGap height={40} />
				<FansSwitch
					text="New requests"
					value={newRequests}
					onValueChange={(value: boolean) =>
						handleChangeField("newRequests", value)
					}
				/>
				<FansGap height={20} />
				<FansHorizontalDivider />
				<FansGap height={20} />
				<FansSwitch
					text="Cancellations"
					value={cancellations}
					onValueChange={(value: boolean) =>
						handleChangeField("cancellations", value)
					}
				/>
				<FansGap height={20} />
				<FansHorizontalDivider />
				<FansGap height={20} />
				<FansSwitch
					text="Reminders"
					value={reminders}
					onValueChange={(value: boolean) =>
						handleChangeField("reminders", value)
					}
				/>
				<FansGap height={53.5} />
				<FansText fontFamily="inter-semibold" fontSize={17}>
					Notification methods
				</FansText>
				<FansGap height={41.5} />
				<FansSwitch
					text="Email"
					value={notificationsByEmail}
					onValueChange={(value: boolean) =>
						handleChangeField("notificationsByEmail", value)
					}
				/>
				<FansGap height={20} />
				<FansHorizontalDivider />
				<FansGap height={20} />
				<FansSwitch
					text="Phone"
					value={notificationsByPhone}
					onValueChange={(value: boolean) =>
						handleChangeField("notificationsByPhone", value)
					}
				/>
			</FansView>
		</FansScreen2>
	);
};

export default Step5;
