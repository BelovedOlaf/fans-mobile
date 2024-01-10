import React, { useState } from "react";

import {
	FansGap,
	FansHorizontalDivider,
	FansPhoneInput,
	FansScreen2,
	FansSwitch,
	FansText,
	FansView,
} from "@components/controls";

import {
	ProfileActionType,
	UserActionType,
	useAppContext,
} from "@context/useAppContext";
import {
	getUserSettings,
	updateCameoSettings,
} from "@helper/endpoints/profile/apis";
import { IProfileSettings } from "@usertypes/types";
import RoundButton from "@components/common/RoundButton";
import tw from "@lib/tailwind";
import { TouchableOpacity, View } from "react-native";
import { updateSetting } from "@helper/endpoints";
import ToastMessage from "react-native-toast-message";

const Step6 = () => {
	const { state, dispatch } = useAppContext();

	const { notifications } = state.profile.settings.cameo;
	const { cameo } = state.profile.settings;
	const { userInfo } = state.user;
	const { phonenumber } = userInfo;

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

	const handleChangePhoneNumber = async (newPhoneNumber: string) => {
		console.log("New number");
		console.log(phonenumber);
		console.log(newPhoneNumber);
		const res = await updateSetting({ phonenumber: newPhoneNumber });
		if (res.ok) {
			dispatch.setUser({
				type: UserActionType.updateUserInfo,
				payload: { data: { phonenumber: newPhoneNumber } },
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
					disabled={!phonenumber}
					onValueChange={(value: boolean) => {
						// user can only set not by phone if phoneNumber is set
						if (phonenumber) {
							handleChangeField("notificationsByPhone", value);
						}
					}}
				/>

				<FansGap height={12} />
				<FansView>
					<FansPhoneInput
						value={phonenumber}
						onChange={(value: string) =>
							handleChangePhoneNumber(value)
						}
					/>
				</FansView>

				<FansGap height={29} />
			</FansView>
		</FansScreen2>
	);
};

export default Step6;
