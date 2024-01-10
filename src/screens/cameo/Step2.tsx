import React, { useState } from "react";
import { View, FlatList, Modal, ScrollView } from "react-native";
import GridItem from "@components/common/GridItem";
import Consultation from "@assets/svgs/common/Consultation";
import SexualContent from "@assets/svgs/common/SexualContent";

import Adult from "@assets/svgs/common/Adult";
import Performance from "@assets/svgs/common/Performance";
import Advice from "@assets/svgs/common/Advice";
import tw from "@lib/tailwind";
import { TextInput } from "react-native-gesture-handler";
import Checkbox from "@components/common/checkbox";
import CustomText from "@components/common/customText";
import CameoModal from "./CameoModal";
import { FansGap, FansSwitch, FansText, FansView } from "@components/controls";
import { ProfileActionType, useAppContext } from "@context/useAppContext";
import { IProfileSettings, VideoCallWays } from "@usertypes/types";
import {
	updateCameoSettings,
	getUserSettings,
} from "@helper/endpoints/profile/apis";

const Step2: React.FC = () => {
	const { state, dispatch } = useAppContext();
	const [isTosVisible, setIsTosVisible] = useState(false);

	const { sexualContent, contentPreferences, additionalContentPreferences } =
		state.profile.settings.cameo;

	const { cameo } = state.profile.settings;

	const [
		localAdditionalContentPreferences,
		setLocalAdditionalContentPreferences,
	] = useState<string>(additionalContentPreferences);

	const handleAdditionalPreferencesChange = (text: string) => {
		setLocalAdditionalContentPreferences(text);
	};

	const handleAdditionalPreferencesBlur = async () => {
		if (
			localAdditionalContentPreferences !== additionalContentPreferences
		) {
			await setAdditionalPreferences(localAdditionalContentPreferences);
		}
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

	const handleVideoCallToggle = async (value: VideoCallWays) => {
		const updatedSettings = {
			...state.profile.settings,
			cameo: {
				...cameo,
				videoCallWays: value,
			},
		};

		await updateSettings(updatedSettings);
	};

	// const handleSexualContentToggle = async (value: boolean) => {
	// 	const updatedSettings = {
	// 		...state.profile.settings,
	// 		cameo: {
	// 			...cameo,
	// 			sexualContent: value,
	// 		},
	// 	};

	// 	await updateSettings(updatedSettings);
	// };

	const handleSexualContentToggle = async (value: boolean) => {
		if (value) {
			// Open TOS window if the user is enabling sexual content
			setIsTosVisible(true);
		} else {
			// If the user is disabling sexual content, update settings directly
			const updatedSettings = {
				...state.profile.settings,
				cameo: {
					...cameo,
					sexualContent: value,
				},
			};

			await updateSettings(updatedSettings);
		}
	};

	const handleChangeTos = async (value: boolean) => {
		// Update settings when the user agrees to terms
		const updatedSettings = {
			...state.profile.settings,
			cameo: {
				...cameo,
				sexualContent: value,
			},
		};

		await updateSettings(updatedSettings);

		// Close the TOS window
		setIsTosVisible(false);
	};

	const setAdditionalPreferences = async (text: string) => {
		const updatedSettings = {
			...state.profile.settings,
			cameo: {
				...cameo,
				additionalContentPreferences: text,
			},
		};

		await updateSettings(updatedSettings);
	};

	const toggleSelection = async (id: string) => {
		const updatedContentPreferences = contentPreferences.includes(id)
			? contentPreferences.filter((item) => item !== id)
			: [...contentPreferences, id];

		const updatedSettings = {
			...state.profile.settings,
			cameo: {
				...cameo,
				contentPreferences: updatedContentPreferences,
			},
		};

		await updateSettings(updatedSettings);
	};

	const options = [
		{
			id: "Consultation",
			title: "Consultation",
			iconToRender: <Consultation />,
			iconColor: "#edfaea",
		},
		{
			id: "Advice",
			title: "Advice",
			iconToRender: <Advice />,
			iconColor: "#e8f6ff",
		},
		{
			id: "Performance",
			title: "Performance",
			iconToRender: <Performance />,
			iconColor: "#f6edff",
		},
		{
			id: "Adult",
			title: "18+ Adult",
			iconToRender: <Adult />,
			iconColor: "#fdebf9",
		},
		{
			id: "Sexual",
			title: "18+ Sexual",
			iconToRender: <SexualContent />,
			iconColor: "#fff3e9",
		},
		{
			id: "Spirituality",
			title: "Spirituality",
			iconToRender: <Consultation />,
			iconColor: "#fffcdb",
		},
		// {
		// 	id: "7",
		// 	title: "Empty",
		// 	iconToRender: <Consultation />,
		// 	empty: true,
		// },
		// {
		// 	id: "8",
		// 	title: "Empty",
		// 	iconToRender: <Consultation />,
		// 	empty: true,
		// },
	];
	// New component for the TOS window
	const TermsOfServiceWindow: React.FC<{}> = () => {
		return (
			<CameoModal
				onAccept={() => handleChangeTos(true)}
				onDeny={() => handleChangeTos(false)}
				visible={isTosVisible}
			/>
		);
	};

	const numColumns = 2; // Number of columns you want
	//const itemWidth = Dimensions.get("window").width / numColumns;
	const itemWidth = 157; // Set the desired width
	const itemHeight = 186; // Set the desired height
	const renderListPreferences = () => {
		return (
			<FlatList
				data={options}
				keyExtractor={(item) => item.id.toString()}
				renderItem={({ item }) => (
					<GridItem
						title={item.title}
						selected={contentPreferences.includes(item.id)}
						onPress={() => toggleSelection(item.id)}
						iconToRender={item.iconToRender}
						iconColor={item.iconColor}
					/>
				)}
				numColumns={numColumns}
				columnWrapperStyle={{
					justifyContent: "space-between",
					margin: 10,
				}}
			/>
		);
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
					Content preferences
				</FansText>
				<FansGap height={12} />
				<FansText textAlign="center" fontSize={16}>
					Select the types of content you are comfortable creating.
				</FansText>
				<FansText textAlign="center" fontSize={16}>
					This guides fans in their requests
				</FansText>
			</FansView>
			<FansGap height={40} />
			<FansSwitch
				text="Allow sexual content"
				value={sexualContent}
				onValueChange={(value) => handleSexualContentToggle(value)}
			/>
			{isTosVisible && <TermsOfServiceWindow />}
			<FansGap height={20} />
			<View>{renderListPreferences()}</View>
			<FansGap height={34} />
			<FansText fontFamily="inter-semibold" fontSize={17}>
				Additional content preferences
			</FansText>
			<FansGap height={15} />

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
					placeholder="Describe additional preferences"
					placeholderTextColor={tw.color("fans-grey-dark")}
					value={localAdditionalContentPreferences}
					onChangeText={handleAdditionalPreferencesChange}
					onBlur={handleAdditionalPreferencesBlur}
				/>
			</FansView>
			<FansGap height={36} />
		</FansView>
	);
};

export default Step2;
