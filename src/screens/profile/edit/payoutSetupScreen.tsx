import RoundButton from "@components/common/RoundButton";
import RoundTextInput from "@components/common/RoundTextInput";
import CustomRadio from "@components/common/customRadio";
import CustomTopNavBar from "@components/common/customTopNavBar";
import DropdownSelect from "@components/common/dropdownSelect";
import AppLayout, { LayoutContentsContainer } from "@components/common/layout";
import { FansDivider } from "@components/controls";
import { FypText } from "@components/common/base";
import {
	createPayPalPayoutMethod,
	fetchPayoutMethod,
	updatePayoutMethod,
} from "@helper/endpoints/payout/apis";
import countries from "@helper/geo/country.json";
import tw from "@lib/tailwind";
import {
	NativeStackNavigationProp,
	NativeStackScreenProps,
} from "@react-navigation/native-stack";
import { ReferralProgramNativeStackParams } from "@screens/settings/referral";
import { RoundButtonType } from "@usertypes/commonEnums";
import { Colors } from "@usertypes/enums";
import { ProfileNavigationStacks } from "@usertypes/navigations";
import { IStripeForm } from "@usertypes/types";
import { useLocalSearchParams, useNavigation } from "expo-router";
import React, { useEffect, useMemo, useState } from "react";
import { ScrollView, View } from "react-native";
import Collapsible from "react-native-collapsible";
import { Button } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";

const PayoutSetupScreen = () => {
	const navigation =
		useNavigation<
			NativeStackNavigationProp<
				ProfileNavigationStacks | ReferralProgramNativeStackParams
			>
		>();
	const { id, isGreen = false } = useLocalSearchParams();
	const insets = useSafeAreaInsets();

	const countryOptions = useMemo(
		() =>
			countries.map((el) => ({
				data: el.isoCode,
				label: el.name,
				flag: el.flag,
			})),
		[],
	);

	const [setUpMethod, setSetUpMethod] = useState("");
	const [isUsCityzen, setIsUsCityzen] = useState<boolean | undefined>();

	const [paidMethod, setPaidMethod] = useState("Bank");
	const [paypalEmail, setPaypalEmail] = useState("");
	const [cPaypalEmail, setCPaypalEmail] = useState("");
	const [country, setCountry] = React.useState("US");

	const [stripeForm, setStripeForm] = useState<IStripeForm>({
		firstName: "",
		lastName: "",
		address1: "",
		address2: "",
		city: "",
		state: "",
		zip: "",
		bankRoutingNumber: "",
		bankAccountNumber: "",
	});

	useEffect(() => {
		const fetchPayoutMethodData = async () => {
			try {
				if (!id) return;

				const response = await fetchPayoutMethod(
					{ id: id as string },
					{ id: id as string },
				);

				if (response.ok) {
					setSetUpMethod(response.data.entityType);
					setIsUsCityzen(response.data.usCitizenOrResident);
					setCountry(response.data.country);
					setPaidMethod(response.data.provider);
					setPaypalEmail(response.data.paypalEmail || "");
					setCPaypalEmail(response.data.paypalEmail || "");
					if (response.data.bankInfo) {
						setStripeForm(response.data.bankInfo);
					}
				}
			} catch (error) {
				Toast.show({
					type: "error",
					text1: "Could not fetch payout method",
				});
			}
		};

		fetchPayoutMethodData();
	}, []);

	const onChangeStripeForm = (name: string, value: string) => {
		setStripeForm({
			...stripeForm,
			[name]: value,
		});
	};

	const onPaypalPayoutMethod = async () => {
		if (!paypalEmail) {
			Toast.show({
				type: "error",
				text1: "PayPal email is required.",
			});
			return;
		}

		if (paypalEmail !== cPaypalEmail) {
			Toast.show({
				type: "error",
				text1: "PayPal emails do not match.",
			});
			return;
		}

		if (id) {
			try {
				const response = await updatePayoutMethod(
					{
						paypalEmail: paypalEmail,
						country: country,
						entityType: setUpMethod,
						usCitizenOrResident: !!isUsCityzen,
					},
					{ id: id as string },
				);

				if (response.ok) {
					Toast.show({
						type: "success",
						text1: "PayPal payout method updated",
					});
					navigation.navigate("GetPaid", { refresh: true });
				} else {
					Toast.show({
						type: "error",
						text1: response.data.message,
					});
				}
			} catch (error) {
				Toast.show({
					type: "error",
					text1: "Could not update PayPal payout method",
				});
			}
		} else {
			try {
				const response = await createPayPalPayoutMethod({
					paypalEmail: paypalEmail,
					country: country,
					entityType: setUpMethod,
					usCitizenOrResident: !!isUsCityzen,
				});

				if (response.ok) {
					Toast.show({
						type: "success",
						text1: "PayPal payout method added",
					});
					navigation.navigate("GetPaid", { refresh: true });
				} else {
					Toast.show({
						type: "error",
						text1: response.data.message,
					});
				}
			} catch (error) {
				Toast.show({
					type: "error",
					text1: "Could not add PayPal payout method",
				});
			}
		}
	};

	const onDepositPayoutMethod = async () => {
		if (!stripeForm.firstName) {
			Toast.show({
				type: "error",
				text1: "First name is required.",
			});
			return;
		}

		if (!stripeForm.lastName) {
			Toast.show({
				type: "error",
				text1: "Last name is required.",
			});
			return;
		}

		if (!stripeForm.address1) {
			Toast.show({
				type: "error",
				text1: "Address 1 is required.",
			});
			return;
		}

		if (!stripeForm.city) {
			Toast.show({
				type: "error",
				text1: "City is required.",
			});
			return;
		}

		if (!stripeForm.state) {
			Toast.show({
				type: "error",
				text1: "State is required.",
			});
			return;
		}

		if (!stripeForm.zip) {
			Toast.show({
				type: "error",
				text1: "ZIP is required.",
			});
			return;
		}

		if (!stripeForm.bankRoutingNumber) {
			Toast.show({
				type: "error",
				text1: "Bank routing number is required.",
			});
			return;
		}

		if (!stripeForm.bankAccountNumber) {
			Toast.show({
				type: "error",
				text1: "Bank account number is required.",
			});
			return;
		}

		if (id) {
			try {
				const response = await updatePayoutMethod(
					{
						bankInfo: stripeForm,
						country: country,
						entityType: setUpMethod,
						usCitizenOrResident: !!isUsCityzen,
					},
					{ id: id as string },
				);

				if (response.ok) {
					Toast.show({
						type: "success",
						text1: "Bank payout method updated",
					});
					navigation.navigate("GetPaid", { refresh: true });
				} else {
					Toast.show({
						type: "error",
						text1: response.data.message,
					});
				}
			} catch (error) {
				Toast.show({
					type: "error",
					text1: "Could not update PayPal payout method",
				});
			}
		} else {
			try {
				const response = await createPayPalPayoutMethod({
					bankInfo: stripeForm,
					country: country,
					entityType: setUpMethod,
					usCitizenOrResident: !!isUsCityzen,
				});

				if (response.ok) {
					Toast.show({
						type: "success",
						text1: "Bank payout method added",
					});
					navigation.navigate("GetPaid", { refresh: true });
				} else {
					Toast.show({
						type: "error",
						text1: response.data.message,
					});
				}
			} catch (error) {
				Toast.show({
					type: "error",
					text1: "Could not add Bank payout method",
				});
			}
		}
	};

	const onPayoutMethod = async () => {
		if (setUpMethod === "") {
			Toast.show({
				type: "error",
				text1: "Set up must select.",
			});
			return;
		}
		if (isUsCityzen === undefined) {
			Toast.show({
				type: "error",
				text1: "Your citizenship must select.",
			});
			return;
		}
		if (isUsCityzen && country !== "US") {
			Toast.show({
				type: "error",
				text1: "US citizens must select 'US' as their country.",
			});
			return;
		}

		if (!isUsCityzen && country === "US") {
			Toast.show({
				type: "error",
				text1: "Only US citizens or residents can select 'US' as their country.",
			});
			return;
		}

		switch (paidMethod) {
			case "PayPal":
				onPaypalPayoutMethod();
				break;
			case "Bank":
				onDepositPayoutMethod();
				break;
		}
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
							title="Payout setup"
							onClickLeft={() => navigation.goBack()}
							onClickRight={onPayoutMethod}
							rightLabel="Add"
							rightLabelColor={
								isGreen ? "fans-green" : "fans-purple"
							}
						/>
						<View
							style={[
								{
									paddingBottom: insets.bottom + 35,
								},
								tw.style("px-[18px] pt-6"),
							]}
						>
							<View style={tw.style("mb-6")}>
								<FypText
									fontSize={19}
									lineHeight={26}
									fontWeight={600}
									color="black"
									margin={{ b: 26 }}
								>
									Business status
								</FypText>
								<View style={tw.style("mb-6")}>
									<FypText
										fontSize={17}
										lineHeight={22}
										fontWeight={600}
										margin={{ b: 10 }}
									>
										How are you set up?
									</FypText>
									<View
										style={tw.style(
											"flex-row items-center py-[14px]",
										)}
									>
										<CustomRadio
											label="I am an individual"
											onPress={() =>
												setSetUpMethod("Individual")
											}
											checked={
												setUpMethod === "Individual"
											}
											bgColor={
												isGreen
													? "fans-green"
													: "fans-purple"
											}
										/>
									</View>
									<FansDivider
										style={tw.style("h-[1px] my-[6px]")}
									/>
									<View
										style={tw.style(
											"flex-row items-center py-[14px]",
										)}
									>
										<CustomRadio
											label="I am or represent a corporation"
											onPress={() =>
												setSetUpMethod("Corporation")
											}
											checked={
												setUpMethod === "Corporation"
											}
											bgColor={
												isGreen
													? "fans-green"
													: "fans-purple"
											}
										/>
									</View>
								</View>

								<View>
									<FypText
										fontSize={17}
										lineHeight={22}
										fontWeight={600}
										margin={{ b: 10 }}
									>
										What's your citizenship status?
									</FypText>
									<View
										style={tw.style(
											"flex-row items-center py-[14px]",
										)}
									>
										<CustomRadio
											label="I am a US citizen or resident"
											onPress={() => setIsUsCityzen(true)}
											checked={!!isUsCityzen}
											bgColor={
												isGreen
													? "fans-green"
													: "fans-purple"
											}
										/>
									</View>
									<FansDivider
										style={tw.style("h-[1px] my-[6px]")}
									/>
									<View
										style={tw.style(
											"flex-row items-center py-[14px]",
										)}
									>
										<CustomRadio
											label="I am not a US citizen or resident"
											onPress={() =>
												setIsUsCityzen(false)
											}
											checked={
												!isUsCityzen &&
												isUsCityzen !== undefined
											}
											bgColor={
												isGreen
													? "fans-green"
													: "fans-purple"
											}
										/>
									</View>
								</View>
							</View>

							<View>
								<FypText
									fontSize={19}
									lineHeight={26}
									fontWeight={600}
									color="black"
									margin={{ b: 26 }}
								>
									Payout method
								</FypText>
								<View style={tw.style("mb-8")}>
									<FypText
										fontSize={17}
										lineHeight={22}
										fontWeight={600}
										margin={{ b: 16 }}
									>
										What's your payout country?
									</FypText>
									<View style={tw.style("relative")}>
										<DropdownSelect
											data={countryOptions}
											value={country}
											setSelected={(val) =>
												setCountry(val)
											}
											customBoxStyles="pl-[46px]"
										/>
										<View
											style={tw.style(
												"w-[22px] h-[22px] flex-row items-center justify-center absolute left-4 top-[10px]",
											)}
										>
											<FypText>
												{
													countryOptions.find(
														(el) =>
															el.data === country,
													)?.flag
												}
											</FypText>
										</View>
									</View>
								</View>

								<View>
									<FypText
										fontSize={17}
										lineHeight={22}
										fontWeight={600}
										margin={{ b: 10 }}
									>
										How would you like to get paid?
									</FypText>

									{/* <View>
										<View style={tw.style("py-[14px]")}>
											<CustomRadio
												label="PayPal"
												onPress={() =>
													setPaidMethod("PayPal")
												}
												checked={
													paidMethod === "PayPal"
												}
												bgColor={
													isGreen
														? "fans-green"
														: "fans-purple"
												}
											/>
										</View>
										<CustomText
											size="base"
											style="text-fans-dark-grey"
										>
											Payout fee is 1% of the amount
											transferred, with a minimum of USD
											$0.25 and a maximum of USD $20{" "}
											<FansLink
												color={
													isGreen
														? "green-4d"
														: "purple-a8"
												}
											>
												Learn more
											</FansLink>
										</CustomText>
										<Collapsible
											collapsed={
												paidMethod === "Bank" ||
												paidMethod === "paxum"
											}
										>
											<View
												style={tw.style(
													"pt-5 gap-y-[10px]",
												)}
											>
												<RoundTextInput
													placeholder="PayPal email"
													value={paypalEmail}
													onChangeText={(val) =>
														setPaypalEmail(val)
													}
												/>
												<RoundTextInput
													placeholder="Confirm PayPal email"
													value={cPaypalEmail}
													onChangeText={(val) =>
														setCPaypalEmail(val)
													}
												/>
											</View>
										</Collapsible>
									</View> */}

									{/* <FansDivider
										style={tw.style(
											"h-[1px] mt-5 mb-[6px]",
										)}
									/> */}

									<View>
										<View style={tw.style("py-[14px]")}>
											<CustomRadio
												label="Direct Bank via Bank Account"
												onPress={() =>
													setPaidMethod("Bank")
												}
												checked={paidMethod === "Bank"}
												bgColor={
													isGreen
														? "fans-green"
														: "fans-purple"
												}
											/>
										</View>
										<FypText
											fontSize={16}
											lineHeight={21}
											color="grey-70"
										>
											1% currency conversion fee + 1%
											platform fee
										</FypText>
										<View style={tw.style("flex-row")}>
											<Button
												style={tw.style("m-0")}
												labelStyle={tw.style(
													"text-fans-purple text-base leading-[21px] m-0",
												)}
											>
												Learn more
											</Button>
										</View>
										<Collapsible
											collapsed={
												paidMethod === "paypal" ||
												paidMethod === "paxum"
											}
										>
											<View style={tw.style("pt-4")}>
												<View style={tw.style("mb-5")}>
													<FypText
														fontSize={17}
														lineHeight={22}
														fontWeight={600}
														color="black"
														margin={{ b: 16 }}
													>
														Name
													</FypText>
													<RoundTextInput
														placeholder="First name"
														value={
															stripeForm.firstName
														}
														onChangeText={(val) =>
															onChangeStripeForm(
																"firstName",
																val,
															)
														}
														customStyles="mb-[10px]"
														maxLength={50}
													/>
													<RoundTextInput
														placeholder="Last name"
														value={
															stripeForm.lastName
														}
														onChangeText={(val) =>
															onChangeStripeForm(
																"lastName",
																val,
															)
														}
														maxLength={50}
													/>
												</View>

												<View style={tw.style("mb-5")}>
													<FypText
														fontSize={17}
														lineHeight={22}
														fontWeight={600}
														color="black"
														margin={{ b: 16 }}
													>
														Address
													</FypText>
													<RoundTextInput
														placeholder="Street Address 1"
														value={
															stripeForm.address1
														}
														onChangeText={(val) =>
															onChangeStripeForm(
																"address1",
																val,
															)
														}
														maxLength={100}
														customStyles="mb-[10px]"
													/>
													<RoundTextInput
														placeholder="Street Address 2"
														value={
															stripeForm.address2
														}
														onChangeText={(val) =>
															onChangeStripeForm(
																"address2",
																val,
															)
														}
														maxLength={100}
														customStyles="mb-[10px]"
													/>
													<RoundTextInput
														placeholder="City"
														value={stripeForm.city}
														onChangeText={(val) =>
															onChangeStripeForm(
																"city",
																val,
															)
														}
														maxLength={100}
														customStyles="mb-[10px]"
													/>
													<RoundTextInput
														placeholder="State"
														value={stripeForm.state}
														onChangeText={(val) =>
															onChangeStripeForm(
																"state",
																val,
															)
														}
														maxLength={100}
														customStyles="mb-[10px]"
													/>
													<RoundTextInput
														placeholder="ZIP"
														value={stripeForm.zip}
														onChangeText={(val) =>
															onChangeStripeForm(
																"zip",
																val,
															)
														}
														maxLength={20}
													/>
												</View>

												{/* <View style={tw.style("mb-5")}>
													<CustomText
														size="lg"
														style="text-black mb-4"
													>
														Birth date
													</CustomText>
												</View> */}

												<View style={tw.style("mb-5")}>
													<FypText
														fontSize={17}
														lineHeight={22}
														fontWeight={600}
														color="black"
														margin={{ b: 16 }}
													>
														Bank information
													</FypText>
													<RoundTextInput
														placeholder="Bank routing number"
														value={
															stripeForm.bankRoutingNumber
														}
														onChangeText={(val) =>
															onChangeStripeForm(
																"bankRoutingNumber",
																val,
															)
														}
														customStyles="mb-[10px]"
														maxLength={100}
													/>
													<RoundTextInput
														placeholder="Bank account number"
														value={
															stripeForm.bankAccountNumber
														}
														onChangeText={(val) =>
															onChangeStripeForm(
																"bankAccountNumber",
																val,
															)
														}
														maxLength={100}
													/>
												</View>
											</View>
										</Collapsible>
									</View>

									{/* <FansDivider
													style={tw.style(
														"bg-fans-grey mt-6 mb-[6px]",
													)}
												/> */}

									{/* <View
													style={tw.style(
														"py-[14px] mb-5",
													)}
												>
													<CustomRadio
														label="Paxum (for + 18 creators)"
														onPress={() =>
															setPaidMethod(
																"paxum",
															)
														}
														checked={
															paidMethod ===
															"paxum"
														}
														bgColor={isGreen ? "fans-green" : "fans-purple" }
													/>
												</View> */}

									<RoundButton
										onPress={onPayoutMethod}
										variant={
											isGreen
												? RoundButtonType.SECONDARY
												: RoundButtonType.PRIMARY
										}
									>
										{id
											? "Edit payout method"
											: "Add payout method"}
									</RoundButton>
									<Button
										labelStyle={tw.style(
											`text-${
												isGreen
													? "fans-green"
													: "fans-purple"
											} text-[17px]`,
										)}
									>
										Cancel
									</Button>
								</View>
							</View>
						</View>
					</LayoutContentsContainer>
				</ScrollView>
			</View>
		</AppLayout>
	);
};

export default PayoutSetupScreen;
