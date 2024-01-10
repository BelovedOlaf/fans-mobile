import FormControl from "@components/common/FormControl";
import RoundButton from "@components/common/RoundButton";
import CustomRadio from "@components/common/customRadio";
import CustomText from "@components/common/customText";
import TimePicker from "@components/common/timePicker";
import DropdownSelect from "@components/common/dropdownSelect";
import { FansDivider } from "@components/controls";
import { PreviewImageField } from "@components/posts/common";
import { winnerOptions } from "@constants/common";
import tw from "@lib/tailwind";
import { RoundButtonType } from "@usertypes/commonEnums";
import { IGiveaway, IPickerMedia } from "@usertypes/types";
import * as ImagePicker from "expo-image-picker";
import React, { FC, useState } from "react";
import { View } from "react-native";
import { timezones } from "@constants/timezones";

interface Props {
	data: IGiveaway;
	isSubmitted: boolean;
	onChangeForm: (name: string, value: string | IPickerMedia) => void;
	onSave: () => void;
}

const AddGiveawayForm: FC<Props> = (props) => {
	const { data, onChangeForm, isSubmitted, onSave } = props;

	const [enableOption, setEnableOption] = useState("all");

	const onChangeImage = async () => {
		try {
			const result = await ImagePicker.launchImageLibraryAsync({
				mediaTypes: ImagePicker.MediaTypeOptions.All,
				allowsEditing: false,
				aspect: [4, 3],
				quality: 1,
				allowsMultipleSelection: false,
			});

			if (!result.canceled) {
				onChangeForm("thumb", {
					uri: result.assets[0].uri,
					isPicker: true,
				});
			}
		} catch (error) {
			console.log("Error picking image:", error);
		}
	};

	return (
		<View>
			<View style={tw.style("px-[18px] md:px-0")}>
				<CustomText size="base" style="text-center mb-8">
					Strengthen your fan community by organizing exciting
					giveaways and rewarding your loyal supporters
				</CustomText>

				<View style={tw.style("mb-[30px]")}>
					<FormControl
						label="Prize"
						placeholder="Enter product name or link..."
						value={data.prize}
						onChangeText={(val: string) =>
							onChangeForm("prize", val)
						}
						hasError={isSubmitted && data.prize === ""}
						validateString="This is mandatory field."
					/>
				</View>
			</View>
			<PreviewImageField
				label="Cover image (optional)"
				style="mb-[34px]"
				onChangeImage={onChangeImage}
				data={data.thumb}
			/>

			<View style={tw.style("px-[18px] pb-[104px] md:px-0 md:pb-10")}>
				{/* <View style={tw.style("mb-[30px]")}>
					<CustomText size="lg" style="mb-4">
						Duration
					</CustomText>
				</View>

				<View style={tw.style("mb-[30px]")}>
					<CustomText size="lg" style="">
						End time
					</CustomText>
				</View> */}

				<View style={tw.style("mb-[30px]")}>
					<CustomText size="lg" style="font-semibold mb-[15px]">
						Time Zone
					</CustomText>
					<DropdownSelect
						data={timezones}
						value={data.timezone}
						setSelected={(val) => onChangeForm("timezone", val)}
						hasError={isSubmitted && data.timezone === ""}
						validateString="please select timezone."
					/>
				</View>

				<View style={tw.style("mb-7")}>
					<CustomText size="lg" style="font-semibold mb-[15px]">
						Number of winners
					</CustomText>
					<DropdownSelect
						data={winnerOptions}
						value={data.winnerCount as string}
						setSelected={(val) => onChangeForm("winnerCount", val)}
						hasError={isSubmitted && data.winnerCount === ""}
						validateString="please select number of winners."
					/>
				</View>
				<View style={tw.style("mb-5")}>
					<CustomText size="lg" style="mb-3">
						Who can enter
					</CustomText>
					<View
						style={tw.style(
							"flex-row items-center justify-between h-13",
						)}
					>
						<CustomRadio
							label="All subscribers"
							onPress={() => setEnableOption("all")}
							checked={enableOption === "all"}
						/>
					</View>

					<FansDivider style={tw.style("my-1.5")} />

					<View
						style={tw.style(
							"flex-row items-center justify-between h-13",
						)}
					>
						<CustomRadio
							label="Some roles"
							onPress={() => setEnableOption("role")}
							checked={enableOption === "role"}
						/>
					</View>
				</View>

				<RoundButton
					variant={RoundButtonType.OUTLINE_PRIMARY}
					onPress={onSave}
				>
					Add giveaway
				</RoundButton>
			</View>
		</View>
	);
};

export default AddGiveawayForm;
