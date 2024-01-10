import FormControl from "@components/common/FormControl";
import RoundButton from "@components/common/RoundButton";
import CustomSwitch from "@components/common/customSwitch";
import CustomText from "@components/common/customText";
import DropdownSelect from "@components/common/dropdownSelect";
import { PreviewImageField } from "@components/posts/common";
import tw from "@lib/tailwind";
import { RoundButtonType } from "@usertypes/commonEnums";
import { IFundraiser, IPickerMedia } from "@usertypes/types";
import { validateNumberString } from "@utils/stringHelper";
import React, { FC } from "react";
import { View } from "react-native";
import { timezones } from "@constants/timezones";

interface Props {
	formData: IFundraiser;
	isSubmitted: boolean;
	coverImg: IPickerMedia;
	handleChangeForm: (name: string, val: string | boolean) => void;
	onChangeImage: () => void;
	handleAddFundraiser?: () => void;
}

const FundraiserForm: FC<Props> = (props) => {
	const {
		formData,
		handleChangeForm,
		isSubmitted,
		coverImg,
		onChangeImage,
		handleAddFundraiser,
	} = props;

	return (
		<View>
			<View style={tw.style("px-[18px] md:px-0")}>
				<CustomText size="base" style="text-center mb-11">
					Launch a fundraising campaign for personal of meaningful
					causes, set targets, and engage fans in supporting your
					vision
				</CustomText>

				<View style={tw.style("mb-[30px]")}>
					<FormControl
						label="Fundraiser title"
						value={formData.title}
						onChangeText={(val: string) =>
							handleChangeForm("title", val as string)
						}
						placeholder="Enter fundraiser title"
						hasError={isSubmitted && formData.title === ""}
						validateString="Title is mandatory field."
					/>
				</View>
				<FormControl
					label="Description (optional)"
					value={formData.caption}
					onChangeText={(val: string) =>
						handleChangeForm("caption", val as string)
					}
					placeholder="Write a description..."
					isTextArea
					styles="mb-8"
				/>
			</View>

			<PreviewImageField
				label="Cover image (optional)"
				style="mb-[34px]"
				onChangeImage={onChangeImage}
				data={coverImg}
			/>

			<View style={tw.style("px-[18px] pb-[104px] md:px-0 md:pb-10")}>
				<View style={tw.style("mb-[30px]")}>
					<FormControl
						label="Target amount (USD)"
						value={formData.price as string}
						onChangeText={(val: string) =>
							handleChangeForm("price", val)
						}
						placeholder="e.g.25"
						hasError={
							isSubmitted &&
							!validateNumberString(formData.price as string)
						}
						validateString={
							formData.price === ""
								? "Price is mandatory field"
								: "Price must be numeric."
						}
					/>
				</View>

				<View style={tw.style("mb-7")}>
					<CustomText size="lg" style="font-semibold mb-[15px]">
						Time Zone
					</CustomText>
					<DropdownSelect
						data={timezones}
						value={formData.timezone}
						setSelected={(val) => handleChangeForm("timezone", val)}
						hasError={isSubmitted && formData.timezone === ""}
						validateString="Please select timezone"
					/>
				</View>

				<View style={tw.style("mb-5")}>
					<CustomText size="lg" style="mb-3">
						Experience points
					</CustomText>
					<View
						style={tw.style(
							"flex-row items-center justify-between",
						)}
					>
						<CustomText size="lg" style="">
							Give XP for donations?
						</CustomText>
						<CustomSwitch
							value={formData.isXpAdd}
							onValueChange={(val) =>
								handleChangeForm("isXpAdd", val)
							}
						/>
					</View>
				</View>
				{handleAddFundraiser ? (
					<RoundButton
						variant={RoundButtonType.OUTLINE_PRIMARY}
						onPress={handleAddFundraiser}
					>
						Add fundraiser
					</RoundButton>
				) : null}
			</View>
		</View>
	);
};

export default FundraiserForm;
