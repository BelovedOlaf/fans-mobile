import RoundButton from "@components/common/RoundButton";
import RoundTextInput from "@components/common/RoundTextInput";
import CustomRadio from "@components/common/customRadio";
import DatePicker from "@components/common/datePicker";
import CustomText from "@components/common/customText";
import CustomTopNavBar from "@components/common/customTopNavBar";
import DropdownSelect from "@components/common/dropdownSelect";
import AppLayout, { LayoutContentsContainer } from "@components/common/layout";
import { FansDivider } from "@components/controls";
import { PromotionModal } from "@components/profiles";
import {
	durationOptions,
	promotionCampaignOptions,
	promotionOfferedOptions,
} from "@constants/common";
import { ProfileActionType, useAppContext } from "@context/useAppContext";
import { createCampaign, updateCampaign } from "@helper/endpoints/profile/apis";
import { defaultCampaignFormData } from "@constants/defaultFormData";
import tw from "@lib/tailwind";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import {
	CampaignApplicableType,
	PromotionType,
	DurationType,
} from "@usertypes/commonEnums";
import { ProfileNavigationStacks } from "@usertypes/navigations";
import { ICampaign, ICalendarDate } from "@usertypes/types";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import Collapsible from "react-native-collapsible";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";

const PromotionCampaignScreen = (
	props: NativeStackScreenProps<ProfileNavigationStacks, "PromotionCampaign">,
) => {
	const { navigation, route } = props;
	const { id } = route.params;
	const insets = useSafeAreaInsets();

	const isEditPage = !!id;

	const { state, dispatch } = useAppContext();
	const { subscriptions } = state.profile;

	const [formData, setFormData] = useState<ICampaign>(
		defaultCampaignFormData,
	);
	const [isSubmitted, setIsSubmitted] = useState(false);
	const [endDate, setEndDate] = useState<ICalendarDate>(undefined);

	const [isNoLimit, setIsNoLimit] = useState(true);

	const [openCongrats, setOpenCongrats] = useState(false);
	const [inProgress, setInProgress] = useState(false);

	const onChangeField = (name: string, value: string | DurationType) => {
		setFormData({
			...formData,
			[name]: value,
		});
	};

	const integrateWithApi = async () => {
		setInProgress(true);
		let _endDate = "";
		if (endDate) {
			_endDate = moment(endDate).utcOffset("+000", true).format();
		}
		const postbody = {
			endDate: _endDate,
			type: formData.type,
			applicable: formData.applicable,
			duration: parseInt(formData.duration as string),
			discount: formData.discount
				? parseInt(formData.discount as string)
				: 0,
			limit: parseInt(formData.limit as string),
			durationType: formData.durationType,
		};

		if (!isEditPage) {
			const resp = await createCampaign(postbody);
			if (resp.ok) {
				dispatch.setProfile({
					type: ProfileActionType.updateSubscription,
					data: {
						campaigns: [
							{
								id: resp.data.id,
								endDate: resp.data.endDate,
								type: resp.data.type,
								applicable: resp.data.applicable,
								discount: resp.data.discount.toString(),
								limit: resp.data.limit.toString(),
								duration: resp.data.duration.toString(),
								durationType: resp.data.durationType,
							},
						],
					},
				});
				navigation.goBack();
			} else {
				Toast.show({
					type: "error",
					text1: resp.data.message,
				});
			}
		} else {
			const resp = await updateCampaign(postbody, { id: id as string });
			if (resp.ok) {
				dispatch.setProfile({
					type: ProfileActionType.updateSubscription,
					data: {
						campaigns: [
							{
								id: id as string,
								...postbody,
							},
						],
					},
				});
				navigation.goBack();
			} else {
				Toast.show({
					type: "error",
					text1: "Failed to update",
				});
			}
		}
		setInProgress(false);
	};

	const handleSave = async () => {
		setIsSubmitted(true);
		if (
			(formData.type === PromotionType.Discount &&
				formData.discount === "") ||
			formData.limit === ""
		) {
			return;
		}
		integrateWithApi();
	};

	const onChangeDiscount = (val: string) => {
		if (val !== "") {
			if (parseFloat(val) <= 99) {
				onChangeField("discount", val);
			}
		} else {
			onChangeField("discount", val);
		}
	};

	useEffect(() => {
		if (id) {
			const campaign = subscriptions[0].campaigns.find(
				(el) => el.id === id,
			);
			setFormData({
				id: id,
				discount: campaign?.discount ?? "",
				limit: campaign?.limit ?? "",
				duration: campaign?.duration ?? "",
				endDate: "",
				type: campaign?.type ?? PromotionType.FreeTrial,
				applicable: campaign?.applicable ?? CampaignApplicableType.New,
				durationType: campaign?.durationType ?? DurationType.Days,
			});
			setEndDate(
				campaign?.endDate ? new Date(campaign.endDate) : undefined,
			);
		} else {
			setFormData(defaultCampaignFormData);
		}
	}, [id]);

	return (
		<AppLayout
			title="Edit Profile | FYP.Fans"
			description="FYP.Fans allows creators to make an income doing what they love!"
		>
			<View style={tw.style("flex-1")}>
				<ScrollView style={tw.style("flex-1")}>
					<LayoutContentsContainer>
						<CustomTopNavBar
							title={
								isEditPage
									? "Edit promotion campaign"
									: "Create promotion campaign"
							}
							onClickLeft={() => navigation.goBack()}
							onClickRight={handleSave}
							rightLabel="Save"
							loading={inProgress}
						/>
						<View
							style={[
								tw.style("px-[18px] pt-6"),
								{
									paddingBottom: insets.bottom + 35,
								},
							]}
						>
							<View style={tw.style("mb-8")}>
								<CustomText
									size="lg"
									style="mb-[14px] text-black"
								>
									Promotion type
								</CustomText>
								<DropdownSelect
									data={promotionCampaignOptions}
									value={formData.type}
									setSelected={(val) =>
										onChangeField(
											"type",
											val as PromotionType,
										)
									}
								/>
								<Collapsible
									collapsed={
										formData.type !== PromotionType.Discount
									}
								>
									<View style={tw.style("mt-8")}>
										<CustomText
											size="lg"
											style="mb-3 text-black"
										>
											Discount (%)
										</CustomText>
										<CustomText
											size="base"
											style="text-fans-dark-grey mb-9"
										>
											Set how much in percent discount
											you're giving for bundle compared to
											subscription price
										</CustomText>
										<RoundTextInput
											placeholder="e.g. 25"
											value={formData.discount as string}
											onChangeText={onChangeDiscount}
											hasError={
												isSubmitted &&
												formData.type ===
													PromotionType.Discount &&
												formData.discount === ""
											}
											helperText="Invalid value"
											keyboardType="numeric"
										/>
									</View>
								</Collapsible>
							</View>
							<View style={tw.style("mb-8")}>
								<CustomText
									size="lg"
									style="mb-[14px] text-black"
								>
									Duration (optional)
								</CustomText>
								<View
									style={tw.style(
										"flex-row justify-between gap-x-3",
									)}
								>
									<View style={tw.style("flex-1")}>
										<RoundTextInput
											placeholder="e.g. 7"
											value={formData.duration as string}
											onChangeText={(val) =>
												onChangeField("duration", val)
											}
											keyboardType="numeric"
										/>
									</View>
									<View style={tw.style("flex-1")}>
										<DropdownSelect
											data={durationOptions}
											value={formData.durationType}
											setSelected={(val) =>
												onChangeField(
													"durationType",
													// val,
													DurationType.Months,
												)
											}
										/>
									</View>
								</View>
							</View>

							<View style={tw.style("mb-[26px]")}>
								<CustomText
									size="lg"
									style="font-semibold mb-3"
								>
									Limit
								</CustomText>
								<CustomText
									size="base"
									style="text-fans-dark-grey mb-[10px]"
								>
									Specify the maximum number of subscribers
									who can sign up for the promotion
								</CustomText>

								<View
									style={tw.style(
										"h-13 flex-row items-center",
									)}
								>
									<CustomRadio
										label="No limit"
										onPress={() => {
											setIsNoLimit(true);
											onChangeField("limit", "0");
										}}
										checked={isNoLimit}
									/>
								</View>
								<FansDivider />
								<View
									style={tw.style(
										"h-13 flex-row items-center",
									)}
								>
									<CustomRadio
										label="Specify limit"
										onPress={() => setIsNoLimit(false)}
										checked={!isNoLimit}
									/>
								</View>
								<Collapsible collapsed={isNoLimit}>
									<View style={tw.style("pt-[6px]")}>
										<RoundTextInput
											value={formData.limit as string}
											onChangeText={(val) =>
												onChangeField("limit", val)
											}
											placeholder="e.g. 25"
											hasError={
												isSubmitted &&
												formData.limit === ""
											}
											helperText="invalid value"
											keyboardType="numeric"
										/>
									</View>
								</Collapsible>
							</View>

							<View style={tw.style("mb-[30px]")}>
								<CustomText
									size="lg"
									style="font-semibold mb-3"
								>
									End date
								</CustomText>
								<DatePicker
									value={endDate}
									onChangeValue={(val) => setEndDate(val)}
								/>
							</View>

							<View style={tw.style("mb-8")}>
								<CustomText
									size="lg"
									style="mb-[14px] text-black"
								>
									Offered to
								</CustomText>
								<DropdownSelect
									data={promotionOfferedOptions}
									value={formData.applicable}
									setSelected={(val) =>
										onChangeField(
											"applicable",
											val as CampaignApplicableType,
										)
									}
								/>
							</View>

							<RoundButton
								onPress={handleSave}
								loading={inProgress}
							>
								Save and launch
							</RoundButton>
						</View>

						<PromotionModal
							visible={openCongrats}
							handleClose={() => setOpenCongrats(false)}
						/>
					</LayoutContentsContainer>
				</ScrollView>
			</View>
		</AppLayout>
	);
};

export default PromotionCampaignScreen;
