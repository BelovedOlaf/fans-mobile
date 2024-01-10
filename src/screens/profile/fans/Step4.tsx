// Step2.tsx
import React, { useState } from "react";

import {
	FansGap,
	FansText,
	FansView,
	FansTextInput3,
} from "@components/controls";
import { TextInput } from "react-native-gesture-handler";
import { ProfileActionType, useAppContext } from "@context/useAppContext";
import {
	updateVideoSettings,
	getUserSettings,
} from "@helper/endpoints/profile/apis";
import tw from "@lib/tailwind";
import { IProfileSettings } from "@usertypes/types";

const Step4 = () => {
	//const [title, setTitle] = useState(""); // Initialize the state variable
	//const [description, setDescription] = useState("");

	const { state, dispatch } = useAppContext();

	const { meetingTitle, meetingDescription } = state.profile.settings.video;
	const { video } = state.profile.settings;

	const handleChangeField = async (name: string, val: string | number) => {
		const updatedSettings = {
			...state.profile.settings,
			video: {
				...video,
				[name]: val,
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
		<FansView>
			<FansGap height={34} />
			<FansView>
				<FansText
					textAlign="center"
					fontFamily="inter-semibold"
					fontSize={27}
				>
					Title & description
				</FansText>
				<FansGap height={12} />
				<FansText textAlign="center" fontSize={16}>
					Specify the type of video call you will provide, so that
					fans know what to expect
				</FansText>
				<FansGap height={42} />
			</FansView>
			<FansView>
				<FansText fontFamily="inter-semibold" fontSize={17}>
					Meeting title
				</FansText>
				<FansGap height={15.2} />

				<FansTextInput3
					value={meetingTitle}
					grow
					placeholder="Enter here"
					onChangeText={(value) =>
						handleChangeField("meetingTitle", value)
					}
				/>
				<FansGap height={15.2} />
				<FansText fontFamily="inter-semibold" fontSize={17}>
					Description
				</FansText>
				<FansGap height={15.2} />

				<FansView
					style={tw.style(
						"h-[128px]",
						"bg-fans-grey",
						"px-[18px] py-[13px]",
						"rounded-[7px]",
					)}
				>
					<TextInput
						style={tw.style("font-inter-regular text-[16px]")}
						placeholder="Enter description here"
						placeholderTextColor={tw.color("fans-grey-dark")}
						value={meetingDescription}
						onChangeText={(value) =>
							handleChangeField("meetingDescription", value)
						}
					/>
				</FansView>
				<FansGap height={355} />
			</FansView>
		</FansView>
	);
};

export default Step4;
