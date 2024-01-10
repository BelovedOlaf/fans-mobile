import React, { Fragment, useEffect, useMemo, useState } from "react";

import { COUNTRIES, STATES } from "@assets/data";
import RoundButton from "@components/common/RoundButton";
import RoundTextInput from "@components/common/RoundTextInput";
import DropdownSelect from "@components/common/dropdownSelect";
import NotificationBox from "@components/common/notificationBox";
import {
	FansDropdown,
	FansGap,
	FansScreen3,
	FansText,
	FansTextInput,
	FansTextInput5,
	FansView,
} from "@components/controls";
import {
	AUTHORIZE_NET_API_LOGIN_ID,
	AUTHORIZE_NET_CLIENT_KEY,
	AUTHORIZE_NET_ENVIRONMENT,
} from "@env";
import { addPaymentMethod } from "@helper/endpoints/subscriptions/apis";
import tw from "@lib/tailwind";
import {
	CommonActionType,
	ModalActionType,
	PostsActionType,
	StoryActionType,
	useAppContext,
} from "@context/useAppContext";
import { RoundButtonType } from "@usertypes/commonEnums";
import { SettingsPaymentsStackScreenProps } from "@usertypes/navigations";
import { useAcceptJs } from "react-acceptjs";
import { View } from "react-native";
import { Checkbox } from "react-native-paper";
import ToastMessage from "react-native-toast-message";
import {
	fetchPaymentMethod,
	editPaymentMethod,
} from "@helper/endpoints/subscriptions/apis";
import { IFansDropdownItem } from "@usertypes/types";
import { formatWithMask } from "react-native-mask-input";
import countries1 from "@helper/geo/country.json";
import states1 from "@helper/geo/state.json";

const AddPaymentMethodScreen = (
	props: SettingsPaymentsStackScreenProps<"AddPaymentMethod">,
) => {
	const { navigation, route } = props;
	const { id, customerPaymentProfileId } = route.params ?? {};

	const { dispatch } = useAppContext();

	const [country, setCountry] = useState<string>();
	const [state, setState] = useState<string>();
	const [street, setStreet] = useState("");
	const [city, setCity] = useState("");
	const [zip, setZip] = useState("");
	const [cardholderName, setCardholderName] = useState("");
	const [cardNumber, setCardNumber] = useState("");
	const [strExpireDate, setExpireDate] = useState("");
	const [cvc, setCvc] = useState("");
	const [isConfirm, setConfirm] = useState(false);

	const isEditMode = id && customerPaymentProfileId;

	useEffect(() => {
		const fetchPaymentMethodData = async () => {
			if (!isEditMode) return;

			const paymentMethod = await fetchPaymentMethod(
				{
					paymentMethodId: id,
					customerPaymentProfileId,
				},
				{
					paymentMethodId: id,
					customerPaymentProfileId,
				},
			);

			if (paymentMethod.ok) {
				const { data } = paymentMethod;
				setCountry(data.country ?? "");
				setState(data.state ?? "");
				setStreet(data.address ?? "");
				setCity(data.city ?? "");
				setZip(data.zip ?? "");
				setCardholderName(data.firstName + " " + data.lastName);
				setExpireDate(
					data.expirationDate
						.split("-")
						.reverse()
						.map((part, index) => {
							return index === 0 ? part : part.slice(-2);
						})
						.join(" / "),
				);
			}
		};

		fetchPaymentMethodData();
	}, [id, customerPaymentProfileId]);
	useEffect(() => setState(undefined), [country]);

	const handleChangeCardNumber = (str: string) => {
		setCardNumber(
			str
				.replace(/[^0-9]/g, "")
				.replace(
					/(\d{0,4})(\d{0,4})(\d{0,4})(\d{0,4})/g,
					(_, $1, $2, $3, $4) =>
						[$1, $2, $3, $4].filter((value) => !!value).join(" "),
				),
		);
	};

	const handleChangeTextExpireDate = (value: string) => {
		setExpireDate(value);
		/*setExpireDate(
			value
				.replace(/[^0-9]/g, "")
				.substring(0, 4)
				.replace(/(\d{0,2})(\d{0,2})/g, (_, $1, $2) => {
					return $1 + ($1.length === 2 ? " / " : "") + $2;
				}),
		);*/
	};

	const { dispatchData } = useAcceptJs({
		environment: AUTHORIZE_NET_ENVIRONMENT,
		authData: {
			apiLoginID: AUTHORIZE_NET_API_LOGIN_ID,
			clientKey: AUTHORIZE_NET_CLIENT_KEY,
		},
	});

	const handleAuthorizeNet = async () => {
		type AuthorizeNetError = {
			messages: {
				message: [{ text: string }];
			};
		};

		try {
			dispatch.setShowLoading();
			const response = await dispatchData({
				cardData: {
					cardNumber: cardNumber.replace(/\s/g, ""),
					fullName: cardholderName,
					cardCode: cvc,
					month: strExpireDate.replace(/\s/g, "").split("/")[0],
					year: strExpireDate.replace(/\s/g, "").split("/")[1],
				},
			});

			if (response.messages.resultCode === "Error") {
				dispatch.setHideLoading();
				ToastMessage.show({
					type: "error",
					text1: response.messages.message[0].text,
				});
			} else {
				if (isEditMode) {
					const paymentMethod = await editPaymentMethod({
						customerPaymentProfileId,
						opaqueDataValue: response.opaqueData.dataValue,
						customerInformation: {
							firstName: cardholderName.split(" ")[0],
							lastName: cardholderName.split(" ")[1],
							country: country ?? "",
							state: state ?? "",
							address: street,
							city,
							zip,
						},
					});
					dispatch.setHideLoading();
					if (paymentMethod.ok) {
						ToastMessage.show({
							type: "success",
							text1: "Payment method added successfully",
						});
						navigation.navigate("Payments", { refresh: true });
					} else {
						ToastMessage.show({
							type: "error",
							text1: paymentMethod.data.message,
						});
					}
				} else {
					const paymentMethod = await addPaymentMethod({
						opaqueDataValue: response.opaqueData.dataValue,
						customerInformation: {
							firstName: cardholderName.split(" ")[0],
							lastName: cardholderName.split(" ")[1],
							country: country ?? "",
							state: state ?? "",
							address: street,
							city,
							zip,
						},
					});
					dispatch.setHideLoading();
					if (paymentMethod.ok) {
						ToastMessage.show({
							type: "success",
							text1: "Payment method added successfully",
						});
						navigation.navigate("Payments", { refresh: true });
					} else {
						ToastMessage.show({
							type: "error",
							text1: paymentMethod.data.message,
						});
					}
				}
			}
		} catch (error) {
			dispatch.setHideLoading();
			const typedError = error as AuthorizeNetError;
			ToastMessage.show({
				type: "error",
				text1:
					typedError.messages.message[0].text || "An error occurred",
			});
		}
	};

	const onPaymentMethod = async () => {
		if (!isConfirm) {
			ToastMessage.show({
				type: "error",
				text1: "Please confirm you're at least 18 years old",
			});
			return;
		}

		await handleAuthorizeNet();
	};

	const handlePressCancel = () => {
		navigation.goBack();
	};

	const states = useMemo(() => {
		console.log(
			country,
			STATES.filter((s) => s.countryCode === country),
		);
		return STATES.filter((s) => s.countryCode === country)
			.sort((a, b) => a.name.localeCompare(b.name))
			.map((value) => ({
				text: value.name,
			}));
	}, [country]);

	return (
		<FansScreen3 contentStyle1={{ maxWidth: { lg: 670 } }}>
			{/* Address ~ */}
			<FansView gap={15}>
				<FansText fontFamily="inter-semibold" fontSize={17}>
					Address
				</FansText>
				<FansView gap={10}>
					<FansDropdown
						data={COUNTRIES.map((value) => ({
							text: value.name,
							value: value.code,
						}))}
						value={country}
						dropdownStyle={{
							defaultButtonText: "Select Country",
							search: true,
						}}
						onSelect={(value) => setCountry(value.value)}
					/>
					{(!country || states.length > 0) && (
						<FansDropdown
							data={states}
							value={state}
							dropdownStyle={{
								defaultButtonText: "Select State/Province",
							}}
							onSelect={(value) => setState(value.value)}
						/>
					)}
					<RoundTextInput
						placeholder="Street"
						onChange={(e) => setStreet(e.nativeEvent.text)}
						value={street}
						maxLength={100}
					/>
					<RoundTextInput
						placeholder="City"
						onChange={(e) => setCity(e.nativeEvent.text)}
						value={city}
						maxLength={100}
					/>
					<RoundTextInput
						placeholder="Zip"
						onChange={(e) => setZip(e.nativeEvent.text)}
						value={zip}
						maxLength={50}
					/>
				</FansView>
			</FansView>
			{/* ~ Address */}

			<FansGap height={33} />

			{/* Card details ~ */}
			<FansView gap={14}>
				<FansText fontFamily="inter-semibold" fontSize={17}>
					Card details
				</FansText>
				<FansView gap={10}>
					<RoundTextInput
						placeholder="Name on the card"
						onChange={(e) => setCardholderName(e.nativeEvent.text)}
						value={cardholderName}
					/>
					<FansTextInput
						value={cardNumber}
						keyboardType="numeric"
						placeholder="1234 1234 1234 1234"
						onChangeText={handleChangeCardNumber}
					/>
					<FansView flexDirection="row" gap={14}>
						<FansTextInput5
							value={
								formatWithMask({
									text: strExpireDate,
									mask: [/\d/, /\d/, "/", /\d/, /\d/],
								}).masked
							}
							viewStyle={{ grow: true }}
							textInputStyle={{ placeholder: "MM / YY" }}
							onChangeText={handleChangeTextExpireDate}
						/>
						<FansTextInput
							value={cvc}
							style={tw.style("grow")}
							placeholder="CVC"
							onChange={(e) => setCvc(e.nativeEvent.text)}
						/>
					</FansView>
				</FansView>
			</FansView>
			{/* ~ Card details */}

			<FansGap height={40} />

			<NotificationBox>
				<FansText
					style={tw.style(
						"text-base leading-[21px] text-fans-purple text-center",
					)}
				>
					🔒 Secure Checkout{"\n"} Please note that we do not store or
					process any credit/debit card information on our site. All
					payment transactions are securely handled through
					Authorize.Net, a Visa solution company.”
				</FansText>
			</NotificationBox>

			<FansGap height={40} />

			<FansView>
				<View style={tw.style("flex-row items-center")}>
					<Checkbox
						status={isConfirm ? "checked" : "unchecked"}
						onPress={() => setConfirm(!isConfirm)}
					/>
					<FansText>
						Confirm you're at least 18 years old and the age of
						majority in your place of residence
					</FansText>
				</View>
			</FansView>
			<FansGap height={36} />

			{/* Add payment method ~ */}
			<FansView gap={16}>
				<RoundButton onPress={onPaymentMethod}>
					{isEditMode ? "Edit payment method" : "Add payment method"}
				</RoundButton>
				<FansView
					touchableOpacityProps={{ onPress: handlePressCancel }}
					alignSelf="center"
				>
					<FansText
						color="purple-a8"
						fontFamily="inter-semibold"
						fontSize={17}
					>
						Cancel
					</FansText>
				</FansView>
			</FansView>
			{/* ~ Add payment method */}

			<FansGap height={20} />
		</FansScreen3>
	);
};

export default AddPaymentMethodScreen;
