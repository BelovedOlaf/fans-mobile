import { CvcSvg, PhotoCameraSvg, OutlinedInfoSvg } from "@assets/svgs/common";
import RoundButton from "@components/common/RoundButton";
import RoundTextInput from "@components/common/RoundTextInput";
import TextButton from "@components/common/TextButton";
import Checkbox from "@components/common/checkbox";
import CustomMaskInput from "@components/common/customMaskInput";
import CustomText from "@components/common/customText";
import CustomTopNavBar from "@components/common/customTopNavBar";
import DropdownSelect from "@components/common/dropdownSelect";
import NotificationBox from "@components/common/notificationBox";
import AppLayout, { LayoutContentsContainer } from "@components/common/layout";
import { defaultPaymentCardData } from "@constants/defaultFormData";
import {
	CommonActionType,
	ModalActionType,
	useAppContext,
} from "@context/useAppContext";
import {
	AUTHORIZE_NET_API_LOGIN_ID,
	AUTHORIZE_NET_CLIENT_KEY,
	AUTHORIZE_NET_ENVIRONMENT,
} from "@env";
import { addPaymentMethod } from "@helper/endpoints/subscriptions/apis";
import tw from "@lib/tailwind";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ProfileNavigationStacks } from "@usertypes/navigations";
import { IPaymentCard } from "@usertypes/types";
import countries from "@helper/geo/country.json";
import states from "@helper/geo/state.json";
import { useRouter } from "expo-router";
import React, { useMemo, useState } from "react";
import { useAcceptJs } from "react-acceptjs";
import { ScrollView, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ToastMessage from "react-native-toast-message";
import { FansText } from "@components/controls";
import { ANIMATION_LOADING_DIALOG_ID } from "@constants/modal";

const AddCardScreen = (
	props: NativeStackScreenProps<ProfileNavigationStacks, "AddCard">,
) => {
	const { navigation, route } = props;
	const { params } = route;
	const { returnPopup, subscriptionId } = params || {};

	const insets = useSafeAreaInsets();
	const router = useRouter();

	const { dispatch } = useAppContext();
	const countryOptions = useMemo(
		() =>
			countries
				.map((el) => ({
					data: el.isoCode,
					label: el.name,
					flag: el.flag,
				}))
				.sort((a, b) => a.label.localeCompare(b.label)),
		[],
	);

	const [isConfirm, setConfirm] = useState(false);
	const [country, setCountry] = useState("");
	const [state, setState] = useState("");

	const [formData, setFormData] = useState<IPaymentCard>(
		defaultPaymentCardData,
	);
	const [isSubmitted, setIsSubmitted] = useState(false);

	const stateOptions = useMemo(
		() =>
			states
				.filter((s) => s.countryCode === country)
				.sort((a, b) => a.name.localeCompare(b.name))
				.map((el) => ({
					data: el.name,
					label: el.name,
				})),
		[country],
	);

	const onChangeCountry = (val: string) => {
		setCountry(val);
	};

	const handleBack = () => {
		if (returnPopup === "UpdatePaymentMethodSubscriptions") {
			router.push({
				pathname: "settings",
				params: {
					screen: "Subscriptions",
					returnPopup: "UpdatePaymentMethodSubscriptions",
					subscriptionId: subscriptionId,
				},
			});
		} else {
			router.back();
			dispatch.setCommon({
				type: CommonActionType.toggleSubscribeModal,
				data: {
					visible: true,
					defaultTab: "form",
				},
			});
		}
	};

	const onChangeForm = (name: string, value: string) => {
		setFormData({
			...formData,
			[name]: value,
		});
	};

	const { dispatchData } = useAcceptJs({
		environment: AUTHORIZE_NET_ENVIRONMENT,
		authData: {
			apiLoginID: AUTHORIZE_NET_API_LOGIN_ID,
			clientKey: AUTHORIZE_NET_CLIENT_KEY,
		},
	});

	const showLoading = () => {
		dispatch.setModal({
			type: ModalActionType.showModal,
			data: { id: ANIMATION_LOADING_DIALOG_ID, show: true },
		});
	};

	const hideLoading = () => {
		dispatch.setModal({
			type: ModalActionType.showModal,
			data: { id: ANIMATION_LOADING_DIALOG_ID, show: false },
		});
	};

	const handleAuthorizeNet = async () => {
		setIsSubmitted(true);

		type AuthorizeNetError = {
			messages: {
				message: [{ text: string }];
			};
		};

		const { cardNumber, cardName, expireDate, cvc } = formData;
		try {
			const response = await dispatchData({
				cardData: {
					cardNumber: cardNumber.replace(/\s/g, ""),
					fullName: cardName,
					cardCode: cvc,
					month: expireDate.replace(/\s/g, "").split("/")[0],
					year: expireDate.replace(/\s/g, "").split("/")[1],
				},
			});

			if (response.messages.resultCode === "Error") {
				hideLoading();
				ToastMessage.show({
					type: "error",
					text1: response.messages.message[0].text,
				});
			} else {
				const paymentMethod = await addPaymentMethod({
					opaqueDataValue: response.opaqueData.dataValue,
					customerInformation: {
						firstName: cardName.split(" ")[0],
						lastName: cardName.split(" ")[1],
						country,
						state,
						address: formData.street,
						city: formData.city,
						zip: formData.zip,
					},
				});

				hideLoading();

				if (paymentMethod.ok) {
					ToastMessage.show({
						type: "success",
						text1: "Payment method added successfully",
					});
					handleBack();
				} else {
					ToastMessage.show({
						type: "error",
						text1: paymentMethod.data.message,
					});
				}
			}
		} catch (error) {
			hideLoading();
			const typedError = error as AuthorizeNetError;
			ToastMessage.show({
				type: "error",
				text1:
					typedError.messages.message[0].text || "An error occurred",
			});
		}
	};

	const newPaymentMethod = async () => {
		if (!isConfirm) {
			ToastMessage.show({
				type: "error",
				text1: "Need to confirm you're at least 18 years old",
			});
			return;
		}

		showLoading();

		await handleAuthorizeNet();
	};

	return (
		<AppLayout
			title="Edit Profile | FYP.Fans"
			description="FYP.Fans allows creators to make an income doing what they love!"
		>
			<View style={tw.style("flex-1")}>
				<ScrollView style={tw.style("flex-1")}>
					<LayoutContentsContainer>
						<CustomTopNavBar
							title="Add card"
							onClickLeft={handleBack}
							onClickRight={newPaymentMethod}
							rightLabel="Save"
						/>
						<View
							style={[
								{
									paddingBottom: insets.bottom + 35,
								},
								tw.style("px-[18px] pt-6"),
							]}
						>
							<View style={tw.style("mb-8")}>
								<CustomText size="lg" style="mb-[15px]">
									Address
								</CustomText>
								<View style={tw.style("relative mb-[10px]")}>
									<DropdownSelect
										data={countryOptions}
										value={country}
										setSelected={onChangeCountry}
										customBoxStyles={
											country ? "pl-[46px]" : ""
										}
										placeholder="Select Country"
									/>
									<View
										style={tw.style(
											"w-[22px] h-[22px] flex-row items-center justify-center absolute left-4 top-[10px]",
										)}
									>
										<Text>
											{
												countryOptions.find(
													(el) => el.data === country,
												)?.flag
											}
										</Text>
									</View>
								</View>
								{(!country || stateOptions.length > 0) && (
									<View style={tw.style("mb-[10px]")}>
										<DropdownSelect
											data={stateOptions}
											value={state}
											setSelected={(val) => setState(val)}
											placeholder="Select State"
										/>
									</View>
								)}
								<RoundTextInput
									placeholder="Street"
									customStyles="mb-[10px]"
									value={formData.street}
									onChangeText={(val) =>
										onChangeForm("street", val)
									}
									hasError={
										isSubmitted && formData.street === ""
									}
									maxLength={100}
								/>
								<RoundTextInput
									placeholder="City"
									customStyles="mb-[10px]"
									value={formData.city}
									onChangeText={(val) =>
										onChangeForm("city", val)
									}
									hasError={
										isSubmitted && formData.city === ""
									}
									maxLength={100}
								/>
								<RoundTextInput
									placeholder="Zip"
									value={formData.zip}
									onChangeText={(val) =>
										onChangeForm("zip", val)
									}
									hasError={
										isSubmitted && formData.zip === ""
									}
									maxLength={100}
								/>
							</View>

							<View style={tw.style("mb-8")}>
								<CustomText size="lg" style="mb-[15px]">
									Card details
								</CustomText>

								<RoundTextInput
									placeholder="Name on the card"
									customStyles="mb-[10px]"
									value={formData.cardName}
									onChangeText={(val) =>
										onChangeForm("cardName", val)
									}
									hasError={
										isSubmitted && formData.cardName === ""
									}
								/>
								<View style={tw.style("mb-[10px] relative")}>
									<CustomMaskInput
										placeholder="1234 1234 1234 1234"
										customStyles="pr-11"
										value={formData.cardNumber}
										onChangeText={(val) =>
											onChangeForm("cardNumber", val)
										}
										hasError={
											isSubmitted &&
											formData.cardNumber === ""
										}
										type="creditCard"
									/>
									<PhotoCameraSvg
										width={16}
										height={14.43}
										color="#a854f5"
										style={tw.style(
											"absolute right-[13px] top-[13.8px]",
										)}
									/>
								</View>

								<View style={tw.style("flex-row gap-x-[14px]")}>
									<View style={tw.style("flex-1")}>
										<CustomMaskInput
											placeholder="MM / YY"
											value={formData.expireDate}
											onChangeText={(val) =>
												onChangeForm("expireDate", val)
											}
											hasError={
												isSubmitted &&
												formData.expireDate === ""
											}
											type="monthYear"
										/>
									</View>
									<View style={tw.style("flex-1 relative")}>
										<RoundTextInput
											placeholder="CVC"
											value={formData.cvc}
											onChangeText={(val) =>
												onChangeForm("cvc", val)
											}
											hasError={
												isSubmitted &&
												formData.cvc === ""
											}
											helperText="Invalid value"
											keyboardType="numeric"
											customStyles="pr-11"
										/>
										<CvcSvg
											width={17.13}
											height={13.08}
											color="#707070"
											style={tw.style(
												"absolute right-[13px] top-[14px]",
											)}
										/>
									</View>
								</View>
							</View>
							<NotificationBox style={tw.style("mb-10")}>
								<FansText
									style={tw.style(
										"text-base leading-[21px] text-fans-purple text-center",
									)}
								>
									🔒 Secure Checkout{"\n"} Please note that we
									do not store or process any credit/debit
									card information on our site. All payment
									transactions are securely handled through
									Authorize.Net, a Visa solution company.”
								</FansText>
							</NotificationBox>

							<View
								style={tw.style(
									"flex-row mb-[34px] items-center",
								)}
							>
								<Checkbox
									checked={isConfirm}
									onPress={() => setConfirm(!isConfirm)}
								/>
								<CustomText size="base" style="ml-[18px]">
									Confirm you're at least 18 years old and the
									age of majority in your place of residence
								</CustomText>
							</View>

							<RoundButton onPress={newPaymentMethod}>
								Add payment method
							</RoundButton>

							<TextButton>Cancel</TextButton>
						</View>
					</LayoutContentsContainer>
				</ScrollView>
			</View>
		</AppLayout>
	);
};

export default AddCardScreen;
