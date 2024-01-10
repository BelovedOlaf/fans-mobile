import React, { useState } from "react";
import { View, TouchableOpacity, ScrollView } from "react-native";
import {
	FansGap,
	FansText,
	FansView,
	FansDivider,
	FansTextInput3,
} from "@components/controls";
import DropdownSelect from "@components/common/dropdownSelect";
import DropdownSelectReadOnly from "@components/common/dropdownSelectReadOnly";
import { generateTimeFrames } from "../../helper/HoursGenerator";
import { RoundButtonType } from "@usertypes/commonEnums";
import RoundButton from "@components/common/RoundButton";
import tw from "@lib/tailwind";

import {
	updateVideoSettings,
	getUserSettings,
	updateCameoSettings,
} from "@helper/endpoints/profile/apis";
import { ProfileActionType, useAppContext } from "@context/useAppContext";
import { IProfileSettings, ISelectData } from "@usertypes/types";
import { timezones } from "@constants/timezones";

const fulFillmentOptions: ISelectData[] = [
	{ data: "24", label: "24 hours" },
	{ data: "48", label: "48 hours" },
	{ data: "72", label: "3 days" },
	{ data: "120", label: "5 days" },
	{ data: "168", label: "7 days" },
	{ data: "336", label: "14 days" },
	{ data: "720", label: "30 days" },
];

const requestTypeOptions: ISelectData[] = [
	{ data: "Daily", label: "Daily" },
	{ data: "Weekly", label: "Weekly" },
	{ data: "Monthly", label: "Monthly" },
];

const Step2: React.FC = () => {
	const { state, dispatch } = useAppContext();

	const { cameo } = state.profile.settings;
	const { requestLimitations } = state.profile.settings.cameo;
	const { fulFillmentTimeFrame, numberRequestsValue, numberRequestsType } =
		requestLimitations;

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

	const handleChangeField = async (name: string, val: string | number) => {
		const updatedSettings = {
			...state.profile.settings,
			cameo: {
				...cameo,
				[name]: val,
			},
		};

		await updateSettings(updatedSettings);
	};

	const handleChangeRequestLimitationSettings = async (
		name: string,
		val: string | number,
	) => {
		const { profile } = state;

		const updatedSettings: IProfileSettings = {
			...profile.settings,
			cameo: {
				...cameo,
				requestLimitations: {
					...cameo.requestLimitations,
					[name]: val,
				},
			},
		};

		await updateSettings(updatedSettings);
	};

	return (
		<View style={{ flex: 1 }}>
			<FansView>
				<FansView>
					<FansGap height={34} />
					<FansText
						textAlign="center"
						fontFamily="inter-semibold"
						fontSize={27}
					>
						Request limitations
					</FansText>
					<FansGap height={12} />
					<FansText textAlign="center" fontSize={16}>
						Select the maximum time you need to fulfill a request &
						limit the number you receive
					</FansText>
				</FansView>
				<FansGap height={42} />
			</FansView>
			<FansView>
				<FansText fontFamily="inter-semibold" fontSize={17}>
					Fullfilment timeframe
				</FansText>
				<FansGap height={12} />
			</FansView>
			<FansView>
				<DropdownSelect
					data={fulFillmentOptions}
					value={fulFillmentTimeFrame}
					setSelected={(val) =>
						handleChangeRequestLimitationSettings(
							"fulFillmentTimeFrame",
							val,
						)
					}
				/>
			</FansView>

			<FansView>
				<FansGap height={28.5} />
				<FansText fontFamily="inter-semibold" fontSize={17}>
					Limit volume (optional)
				</FansText>
				<FansGap height={12} />
				<FansText color="grey-70" fontSize={16}>
					Limit the number of requests by selecting a timeframe and
					the quantity of requests within it
				</FansText>
				<FansGap height={12} />
				<View
					style={{
						flex: 1,
						flexDirection: "row",
						alignItems: "center",
					}}
				>
					<View style={{ flex: 0.5, marginRight: 18 }}>
						<DropdownSelect
							data={requestTypeOptions}
							value={numberRequestsType}
							setSelected={(val) =>
								handleChangeRequestLimitationSettings(
									"numberRequestsType",
									val,
								)
							}
						/>
					</View>
					<View style={{ flex: 0.5 }}>
						<FansTextInput3
							value={numberRequestsValue.toString()} // Convert number to string for input value
							grow
							placeholder="Enter here"
							onChangeText={(value) =>
								handleChangeRequestLimitationSettings(
									"numberRequestsValue",
									parseInt(value, 10) || 0,
								)
							}
						/>
					</View>
				</View>
				<FansGap height={12} />
				<FansText color="grey-70" fontSize={16}>
					You will be limited to{" "}
					<FansText color="purple-a8">{numberRequestsValue}</FansText>{" "}
					requests per{" "}
					<FansText color="purple-a8">
						{numberRequestsType === "Weekly"
							? "week"
							: numberRequestsType === "Monthly"
							? "month"
							: "day"}
					</FansText>
				</FansText>
			</FansView>
			<FansGap height={183} />
		</View>
	);
};

export default Step2;
