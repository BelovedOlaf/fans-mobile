// Step1.tsx
import React, { useEffect, useState } from "react";
import { View } from "react-native";
import {
	FansGap,
	FansText,
	FansTextInput3,
	FansView,
} from "@components/controls";

import { ProfileActionType, useAppContext } from "@context/useAppContext";
import {
	getUserSettings,
	updateFanProfileSettings,
} from "@helper/endpoints/profile/apis";
import { IProfileSettings } from "@usertypes/types";

const Step1 = () => {
	const { state, dispatch } = useAppContext();

	const { fanProfile } = state.profile.settings;

	const { bio, displayName } = state.profile.settings.fanProfile;

	useEffect(() => {
		fetchProfileSettings();
	}, []);

	const [localDisplayName, setLocalDisplayName] =
		useState<string>(displayName);

	const [localBio, setLocalBio] = useState<string>(bio);

	const handleChangeDisplayName = (value: string) => {
		setLocalDisplayName(value);
	};

	const handleChangeBio = (value: string) => {
		setLocalBio(value);
	};

	const handleDisplayNameBlur = async () => {
		if (localDisplayName !== fanProfile.displayName) {
			const updatedSettings = {
				...state.profile.settings,
				fanProfile: {
					...fanProfile,
					displayName: localDisplayName,
				},
			};
			await updateSettings(updatedSettings);
		}
	};

	const handleBioBlur = async () => {
		if (localBio !== fanProfile.bio) {
			const updatedSettings = {
				...state.profile.settings,
				fanProfile: {
					...fanProfile,
					bio: localBio,
				},
			};
			await updateSettings(updatedSettings);
		}
	};

	const handleChangeField = async (name: string, val: string | number) => {
		const updatedSettings = {
			...state.profile.settings,
			fanProfile: {
				...fanProfile,
				[name]: val,
			},
		};

		await updateSettings(updatedSettings);
	};

	const updateSettings = async (updatedSettings: IProfileSettings) => {
		const response = await updateFanProfileSettings(updatedSettings);

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
		<View>
			<FansView>
				<FansView>
					<FansGap height={12} />
					<FansText
						textAlign="center"
						fontFamily="inter-semibold"
						fontSize={27}
					>
						Display name
					</FansText>
					<FansGap height={12} />
					<FansText textAlign="center" fontSize={16}>
						Your page title is your digital identity - it's how
						users recognize and locate you. You can always change it
						later
					</FansText>
				</FansView>
				<FansGap height={28} />
				<FansView>
					<FansText fontFamily="inter-semibold" fontSize={17}>
						Display name
					</FansText>
					<FansGap height={15.2} />

					<FansTextInput3
						value={localDisplayName}
						grow
						placeholder="Enter name"
						onChangeText={handleChangeDisplayName}
						onBlur={handleDisplayNameBlur}
					/>
				</FansView>
				<FansGap height={28} />
				<FansView>
					<FansText fontFamily="inter-semibold" fontSize={17}>
						Bio
					</FansText>
					<FansGap height={15.2} />

					<FansTextInput3
						value={localBio}
						grow
						placeholder="Enter description about yourself"
						onChangeText={handleChangeBio}
						onBlur={handleBioBlur}
					/>
				</FansView>
			</FansView>
			<FansGap height={180} />
		</View>
	);
};

export default Step1;
