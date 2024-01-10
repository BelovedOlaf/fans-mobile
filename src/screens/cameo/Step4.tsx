// Step4.tsx
import React, { useState } from "react";
import { FansGap, FansText, FansView } from "@components/controls";
import { TextInput, TouchableOpacity, Image } from "react-native";
import { ProfileActionType, useAppContext } from "@context/useAppContext";
import {
	updateVideoSettings,
	getUserSettings,
	updateCameoSettings,
} from "@helper/endpoints/profile/apis";
import tw from "@lib/tailwind";
import { IProfileSettings } from "@usertypes/types";
import { ImageImage } from "@assets/svgs";
import * as DocumentPicker from "expo-document-picker";

const LIMIT_OF_FILES = 8;

interface File {
	uri?: string;
	name: string;
	type: string;
}

const Step4 = () => {
	const { state, dispatch } = useAppContext();
	const { responseDescription } = state.profile.settings.cameo;
	const { cameo } = state.profile.settings;
	const [files, setFiles] = useState<File[]>([]);
	const [localResponseDescription, setlocalResponseDescription] =
		useState<string>(responseDescription);

	const handleChangeresponseDescription = (val: string) => {
		setlocalResponseDescription(val);
	};

	const handleresponseDescriptionBlur = async () => {
		if (localResponseDescription !== responseDescription) {
			const updatedSettings = {
				...state.profile.settings,
				cameo: {
					...cameo,
					responseDescription: localResponseDescription,
				},
			};
			await updateSettings(updatedSettings);
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
	const onUpload = async () => {
		const result = await DocumentPicker.getDocumentAsync({
			type: "image/*", // Specify that only image files are allowed
			multiple: true, // Allow multiple file selection
		});

		if (!result.canceled && result.output) {
			const filesArray: File[] = [];

			if (result.output instanceof FileList) {
				for (
					let i = 0;
					i < Math.min(result.output.length, LIMIT_OF_FILES);
					i++
				) {
					const file = result.output[i];
					filesArray.push({
						name: file.name,
						type: file.type || "",
						uri: URL.createObjectURL(file),
					});
				}
			}

			setFiles(filesArray);
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
					Description (optional)
				</FansText>
				<FansGap height={12} />
				<FansText textAlign="center" fontSize={16}>
					Choose when and how you want to be notified about updates to
					your requests
				</FansText>
				<FansGap height={42} />
			</FansView>
			<FansView>
				<FansText fontFamily="inter-semibold" fontSize={17}>
					Description
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
						placeholder="Enter description here"
						placeholderTextColor={tw.color("fans-grey-dark")}
						value={localResponseDescription}
						onChangeText={(value) =>
							handleChangeresponseDescription(value)
						}
						onBlur={handleresponseDescriptionBlur}
					/>
				</FansView>
				<FansGap height={23} />
				<FansView>
					<FansText fontFamily="inter-semibold" fontSize={17}>
						Upload previews
					</FansText>
					<FansGap height={21} />
					<TouchableOpacity onPress={onUpload}>
						<FansView
							style={tw.style(
								"h-[162px]",
								"border border-fans-grey-dark border-dashed rounded-[7px]",
								"flex justify-center items-center",
							)}
						>
							<FansView
								style={tw.style("w-[77.44px] h-[70.96px]")}
							>
								<ImageImage />
							</FansView>
							<FansGap height={13.3} />
							<FansText style={tw.style("text-[17px]")}>
								Drop image here or{" "}
								<FansText
									style={tw.style(
										"font-inter-semibold",
										"text-[17px] text-fans-purple",
									)}
								>
									browse
								</FansText>
							</FansText>
						</FansView>
					</TouchableOpacity>
					<FansGap height={21} />
					{files.length !== 0 && (
						<FansView style={tw.style("flex flex-row flex-wrap")}>
							{files.map((file, index) => (
								<FansView
									key={index}
									style={tw.style(
										"w-[77.44px] h-[70.96px] m-2",
										"border border-fans-grey-dark rounded-[7px]",
									)}
								>
									{/* Assuming file.type.startsWith("image/") for image files */}
									{file.type.startsWith("image/") ? (
										<Image
											source={{
												uri: file.uri,
											}}
											style={tw.style(
												"flex-1 rounded-[7px]",
											)}
											resizeMode="cover"
										/>
									) : (
										<FansText
											style={tw.style("text-[17px]")}
										>
											{file.name}
										</FansText>
									)}
								</FansView>
							))}
						</FansView>
					)}
				</FansView>
				<FansGap height={30} />
			</FansView>
		</FansView>
	);
};

export default Step4;
