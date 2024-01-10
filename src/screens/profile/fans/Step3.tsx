import React, { useState } from "react";
import { View, FlatList, Dimensions, Text } from "react-native";
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

// import base modules
import {
	FansGap,
	FansHorizontalDivider,
	FansSwitch,
	FansText,
	FansView,
	FansDivider,
} from "@components/controls";
import { ProfileActionType, useAppContext } from "@context/useAppContext";
import { IProfileSettings, VideoCallWays } from "@usertypes/types";
import {
	updateVideoSettings,
	getUserSettings,
} from "@helper/endpoints/profile/apis";

const Step3: React.FC = () => {
	const { state, dispatch } = useAppContext();

	const {
		sexualContent,
		contentPreferences,
		additionalContentPreferences,
		videoCallWays,
	} = state.profile.settings.video;

	const { video } = state.profile.settings;

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

	const handleVideoCallToggle = async (value: VideoCallWays) => {
		const updatedSettings = {
			...state.profile.settings,
			video: {
				...video,
				videoCallWays: value,
			},
		};

		await updateSettings(updatedSettings);
	};

	const handleSexualContentToggle = async (value: boolean) => {
		const updatedSettings = {
			...state.profile.settings,
			video: {
				...video,
				sexualContent: value,
			},
		};

		await updateSettings(updatedSettings);
	};

	const setAdditionalPreferences = async (text: string) => {
		const updatedSettings = {
			...state.profile.settings,
			video: {
				...video,
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
			video: {
				...video,
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
					This guides fans in their requests
				</FansText>
			</FansView>
			<FansGap height={40} />
			<FansSwitch
				text="Allow sexual content"
				value={sexualContent}
				onValueChange={(value) => handleSexualContentToggle(value)}
			/>
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
					value={additionalContentPreferences}
					onChangeText={(text) => setAdditionalPreferences(text)}
				/>
			</FansView>
			<FansGap height={36} />
			<FansText fontFamily="inter-semibold" fontSize={17}>
				One-way or Two-way video calls?
			</FansText>
			<FansGap height={12} />
			<FansText style={tw.style("text-[#707070]")}>
				Choose if you want to see the fan, or if they will only be able
				to see you
			</FansText>
			<FansGap height={25} />
			<View style={tw.style("mb-[34px]")}>
				<View style={tw.style("flex-row items-center")}>
					<Checkbox
						checked={videoCallWays === VideoCallWays.TwoWay}
						onPress={() =>
							handleVideoCallToggle(VideoCallWays.TwoWay)
						}
						size={"lg"}
					/>
					<CustomText size="base" style="ml-[18px]">
						Two-way
					</CustomText>
				</View>
				<FansGap height={15} />

				<FansHorizontalDivider />

				<View style={tw.style("flex-row items-center mt-[20px]")}>
					<Checkbox
						checked={videoCallWays === VideoCallWays.OneWay}
						onPress={() =>
							handleVideoCallToggle(VideoCallWays.OneWay)
						}
						size={"lg"}
					/>
					<CustomText size="base" style="ml-[18px]">
						One-Way
					</CustomText>
				</View>
			</View>
		</FansView>
	);
};

export default Step3;
