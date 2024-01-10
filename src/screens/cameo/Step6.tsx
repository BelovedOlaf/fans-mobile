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
	updateCameoSettings,
	updateVideoSettings,
} from "@helper/endpoints/profile/apis";
import { IProfileSettings } from "@usertypes/types";

const Step5 = () => {
	const { state, dispatch } = useAppContext();

	const { notifications } = state.profile.settings.cameo;
	const { cameo } = state.profile.settings;

	const {
		newRequests,
		pendingVideos,
		completedRequests,
		notificationsByEmail,
		notificationsByPhone,
	} = notifications;

	const handleChangeField = async (name: string, val: boolean) => {
		const updatedNotifications = {
			...state.profile.settings.cameo.notifications,
			[name]: val,
		};

		const updatedSettings = {
			...state.profile.settings,
			cameo: {
				...cameo,
				notifications: updatedNotifications,
			},
		};

		await updateSettings(updatedSettings);
	};

	const updateSettings = async (updatedSettings: IProfileSettings) => {
		const response = await updateCameoSettings(updatedSettings);

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
				<FansText
					textAlign="center"
					fontFamily="inter-semibold"
					fontSize={17}
				>
					Notification Settings
				</FansText>
				<FansGap height={12} />
				<FansText textAlign="center" fontSize={16}>
					Specify the type of responses you will provide, so that fans
					know what to expect
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
					text="Pending videos"
					value={pendingVideos}
					onValueChange={(value: boolean) =>
						handleChangeField("pendingVideos", value)
					}
				/>
				<FansGap height={20} />
				<FansHorizontalDivider />
				<FansGap height={20} />
				<FansSwitch
					text="Completed requests"
					value={completedRequests}
					onValueChange={(value: boolean) =>
						handleChangeField("completedRequests", value)
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
