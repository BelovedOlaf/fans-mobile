import AppLayout, { LayoutContentsContainer } from "@components/common/layout";
import FormControl from "@components/common/FormControl";
import RoundButton from "@components/common/RoundButton";
import Checkbox from "@components/common/checkbox";
import NotificationBox from "@components/common/notificationBox";
import CheckoutOption from "@components/common/checkoutOption";
import CustomText from "@components/common/customText";
import CustomTopNavBar from "@components/common/customTopNavBar";
import CustomMaskInput from "@components/common/customMaskInput";
import { FansDivider, FansText, FansView } from "@components/controls";
import { checkoutOptions, gemOptions } from "@constants/common";
import { useAppContext, ModalActionType } from "@context/useAppContext";
import { ANIMATION_LOADING_DIALOG_ID } from "@constants/modal";
import {
	AUTHORIZE_NET_API_LOGIN_ID,
	AUTHORIZE_NET_CLIENT_KEY,
	AUTHORIZE_NET_ENVIRONMENT,
	STRIPE_PUBLISHABLE_KEY,
	GEM_EXCHANGE_RATE,
} from "@env";
import {
	gemsPrice,
	gemsAuthorizeNetPurchase,
	gemsPayPalPurchase,
	gemsStripePurchase,
} from "@helper/endpoints/gems/apis";
import tw from "@lib/tailwind";
import {
	Elements,
	PaymentElement,
	useElements,
	useStripe,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js/pure";
import { CheckoutType, RoundButtonType } from "@usertypes/commonEnums";
import { IGemType } from "@usertypes/types";
import { Link, useLocalSearchParams, useRouter } from "expo-router";
import React, { FC, useEffect, useState } from "react";
import { useAcceptJs } from "react-acceptjs";
import { Image, ScrollView, Text, View } from "react-native";
import Collapsible from "react-native-collapsible";
import { Button } from "react-native-paper";
import Toast from "react-native-toast-message";

const DEFAULT_GEM_AMOUNT = "1000";

interface AmountOptionProps {
	text: string;
	selected: boolean;
	onSelect: () => void;
}

export const AmountOption: FC<AmountOptionProps> = (props) => {
	const { text, selected, onSelect } = props;
	return (
		<Button
			mode="contained"
			style={tw.style(
				"bg-fans-grey m-0 flex-1",
				selected && "bg-fans-purple",
			)}
			labelStyle={tw.style(
				"text-[18px] leading-6 text-black font-medium my-2 mx-0 flex-1",
				selected && "text-white",
			)}
			onPress={onSelect}
		>
			{text}
		</Button>
	);
};

const GetGemsScreen = () => {
	const router = useRouter();
	const { gems = DEFAULT_GEM_AMOUNT } = useLocalSearchParams();

	const stripe = useStripe();
	const elements = useElements();
	const { dispatchData } = useAcceptJs({
		environment: AUTHORIZE_NET_ENVIRONMENT,
		authData: {
			apiLoginID: AUTHORIZE_NET_API_LOGIN_ID,
			clientKey: AUTHORIZE_NET_CLIENT_KEY,
		},
	});
	const { dispatch } = useAppContext();

	const [selectedGem, setSelectedGem] = useState<IGemType | undefined>();
	const [amount, setAmount] = useState("0");
	const [platformFee, setPlatformFee] = useState("");
	const [total, setTotal] = useState("");
	const [otherAmount, setOtherAmount] = useState<boolean>(false);
	const [checkoutOption, setCheckoutOption] = useState<CheckoutType>(
		CheckoutType.Stripe,
	);
	const [cardholderName, setCardholderName] = useState("");
	const [cardNumber, setCardNumber] = useState("");
	const [expireDate, setExpireDate] = useState("");
	const [cvc, setCvc] = useState("");
	const [saveDetails, setSaveDetails] = useState(false);
	const [submitted, setSubmitted] = useState(false);

	useEffect(() => {
		if (typeof gems === "string") {
			const gemNumber = Number(gems);
			const gemExchangeRate = Number(GEM_EXCHANGE_RATE);
			if (!isNaN(gemNumber)) {
				setAmount(String(gemNumber * gemExchangeRate));
			}
		}
	}, []);

	useEffect(() => {
		router.push({
			pathname: "/get-gems",
			params: { gems: Number(amount) / Number(GEM_EXCHANGE_RATE) },
		});
		setSelectedGem(
			gemOptions.find(
				(el) =>
					Number(amount) >= el.price && Number(amount) < el.price * 2,
			) || gemOptions.at(-1),
		);
	}, [amount]);

	useEffect(() => {
		const fetchGemsPrice = async () => {
			const response = await gemsPrice({
				gems: Number(gems),
				service: checkoutOption,
			});
			if (response.ok) {
				const { platformFee, total } = response.data;
				setPlatformFee(platformFee);
				setTotal(total);
			}
		};

		fetchGemsPrice();
	}, [gems, checkoutOption]);

	const showAnimationLoading = () => {
		dispatch.setModal({
			type: ModalActionType.showModal,
			data: { id: ANIMATION_LOADING_DIALOG_ID, show: true },
		});
	};
	const hideAnimationLoading = () => {
		dispatch.setModal({
			type: ModalActionType.showModal,
			data: { id: ANIMATION_LOADING_DIALOG_ID, show: false },
		});
	};

	const handleSelectGems = (gems: string) => {
		setAmount(gems);
		setOtherAmount(false);
	};

	const handlePayPal = async () => {
		try {
			const response = await gemsPayPalPurchase({
				gems: Number(gems),
			});
			if (response.ok) {
				showAnimationLoading();
				setTimeout(() => {
					hideAnimationLoading();
					router.push(response.data.approvalLink);
				}, 3000);
				// router.push(response.data.approvalLink);
			}
		} catch (error) {
			Toast.show({
				type: "error",
				text1: "An error occurred with the PayPal purchase",
			});
		}
	};

	const handleStripe = async () => {
		if (!stripe || !elements) {
			return;
		}

		const { error } = await stripe.confirmPayment({
			elements,
			confirmParams: {
				return_url: `${window.location.origin}/success`,
			},
			redirect: "if_required",
		});

		if (error) {
			Toast.show({
				type: "error",
				text1: "An error occurred with the Stripe purchase",
			});
		} else {
			Toast.show({
				type: "success",
				text1: "Purchase successful",
			});
			showAnimationLoading();
			setTimeout(() => {
				hideAnimationLoading();
				dispatch.fetchUserInfo();
				router.replace("/posts");
			}, 5000);
		}
	};

	const handleAuthorizeNet = async () => {
		type AuthorizeNetError = {
			messages: {
				message: [{ text: string }];
			};
		};

		try {
			const response = await dispatchData({
				cardData: {
					cardNumber: cardNumber.replace(/\s/g, ""),
					fullName: cardholderName,
					cardCode: cvc,
					month: expireDate.split("/")[0],
					year: expireDate.split("/")[1],
				},
			});
			if (response.messages.resultCode === "Error") {
				Toast.show({
					type: "error",
					text1: response.messages.message[0].text,
				});
			} else {
				showAnimationLoading();

				const purchase = await gemsAuthorizeNetPurchase({
					gems: Number(gems),
					opaqueDataValue: response.opaqueData.dataValue,
					customerInformation: {
						firstName: cardholderName.split(" ")[0],
						lastName: cardholderName.split(" ")[1],
					},
				});

				if (purchase.ok) {
					Toast.show({
						type: "success",
						text1: "Purchase successful",
					});
					hideAnimationLoading();
					dispatch.fetchUserInfo();
					router.replace("/posts");
				} else {
					Toast.show({
						type: "error",
						text1: purchase.data.message,
					});
				}
			}
		} catch (error) {
			const typedError = error as AuthorizeNetError;
			Toast.show({
				type: "error",
				text1:
					typedError.messages.message[0].text || "An error occurred",
			});
		}
	};

	const handlePay = () => {
		setSubmitted(true);
		if (otherAmount && parseFloat(amount ?? "0") > 200) {
			return;
		}

		if (amount === "0") {
			Toast.show({
				type: "error",
				text1: "Please enter a valid amount",
			});
			return;
		}

		setSubmitted(false);
		switch (checkoutOption) {
			case CheckoutType.PayPal:
				handlePayPal();
				break;
			case CheckoutType.Stripe:
				handleStripe();
				break;
			case CheckoutType.CreditCard:
				handleAuthorizeNet();
				break;
		}
	};
	return (
		<AppLayout>
			<View style={tw.style("flex-1")}>
				<ScrollView style={tw.style("flex-1")}>
					<LayoutContentsContainer hideRightSection>
						<CustomTopNavBar
							title="Get Gems"
							onClickLeft={() => router.replace("posts")}
						/>
						<View style={tw.style("px-[18px] md:px-0 pt-10")}>
							<View>
								<CustomText size="lg" style="mb-6">
									Select amount to add
								</CustomText>
								<View
									style={tw.style(
										"flex-row flex-wrap gap-x-2 mb-[10px]",
									)}
								>
									<AmountOption
										text="$10.00"
										selected={amount === "10"}
										onSelect={() => handleSelectGems("10")}
									/>
									<AmountOption
										text="$20.00"
										selected={amount === "20"}
										onSelect={() => handleSelectGems("20")}
									/>
									<AmountOption
										text="$50.00"
										selected={amount === "50"}
										onSelect={() => handleSelectGems("50")}
									/>
								</View>
								<View
									style={tw.style(
										"flex-row flex-wrap gap-x-2 mb-[10px]",
									)}
								>
									<AmountOption
										text="$100.00"
										selected={amount === "100"}
										onSelect={() => handleSelectGems("100")}
									/>
									<AmountOption
										text="$200.00"
										selected={amount === "200"}
										onSelect={() => handleSelectGems("200")}
									/>
									<AmountOption
										text="Other..."
										selected={otherAmount}
										onSelect={() => {
											setAmount("0");
											setOtherAmount(true);
										}}
									/>
								</View>
								<Collapsible collapsed={!otherAmount}>
									<View style={tw.style("pt-[34px]")}>
										<FormControl
											label="Enter amount"
											value={amount}
											onChangeText={(val: string) => {
												setAmount(val);
											}}
											placeholder="e.g. 200"
											hasError={
												submitted &&
												otherAmount &&
												parseFloat(amount ?? "0") > 200
											}
											validateString="Amount can be max $200"
											keyboardType="numeric"
										/>
									</View>
								</Collapsible>
							</View>

							<View style={tw.style("mt-8")}>
								<CustomText
									size="sm"
									style="mb-3 font-semibold"
								>
									Amount
								</CustomText>
								<CustomText size="sm" style="">
									${amount} USD
								</CustomText>

								<CustomText
									size="sm"
									style="mt-3 mb-3 font-semibold"
								>
									Platform fee
								</CustomText>
								<CustomText size="sm" style="">
									${platformFee} USD
								</CustomText>
								<CustomText size="lg" style="mt-3 mb-3">
									Total
								</CustomText>
								<View style={tw.style("flex-row items-center")}>
									<CustomText size="xl" style="font-semibold">
										${total} USD
									</CustomText>
									<View
										style={tw.style(
											"flex-row items-center ml-auto",
										)}
									>
										{selectedGem?.icon ? (
											<Image
												source={selectedGem.icon}
												style={{
													// width: selectedGem.width * 0.56,
													// height: selectedGem.height * 0.56,
													width: 41.2,
													height: 38.2,
												}}
											/>
										) : null}
										<CustomText
											size="xl"
											style={`font-medium ml-[10px] ${selectedGem?.color}`}
										>
											{`${gems} Gems`}
										</CustomText>
									</View>
								</View>
							</View>

							<FansDivider
								style={tw.style("my-5 md:mb-7 md:mt-8")}
							/>

							<View style={tw.style("mb-8")}>
								<CustomText size="lg" style="mb-[15px]">
									Checkout
								</CustomText>
								<View style={tw.style("flex-row gap-x-2")}>
									{checkoutOptions.map((el) => (
										<CheckoutOption
											key={el.name}
											data={el}
											selected={
												checkoutOption === el.type
											}
											onSelect={() =>
												setCheckoutOption(el.type)
											}
										/>
									))}
								</View>
							</View>

							{checkoutOption === CheckoutType.CreditCard && (
								<View>
									<FormControl
										label="Cardholder name"
										value={cardholderName}
										onChangeText={(val: string) =>
											setCardholderName(val)
										}
										placeholder="Enter full name"
										styles="mb-8"
									/>

									<FansView margin={{ b: 32 }}>
										<FansText
											fontSize={17}
											lineHeight={21}
											style={tw.style(
												"font-semibold mb-[15px]",
											)}
										>
											Card number
										</FansText>
										<CustomMaskInput
											placeholder="1234 1234 1234 1234"
											customStyles="pr-11"
											value={cardNumber}
											onChangeText={(val) =>
												setCardNumber(val)
											}
											type="creditCard"
										/>
									</FansView>

									<View
										style={tw.style(
											"flex-row justify-between gap-x-[14px] mb-8",
										)}
									>
										<View>
											<FansText
												fontSize={17}
												lineHeight={22}
												style={tw.style(
													"mb-[14px] font-semibold",
												)}
											>
												Expire date
											</FansText>
											<CustomMaskInput
												placeholder="MM / YY"
												value={expireDate}
												onChangeText={(val) =>
													setExpireDate(val)
												}
												type="monthYear"
											/>
										</View>

										<FormControl
											label="CVC"
											value={cvc}
											onChangeText={(val: string) =>
												setCvc(val)
											}
											placeholder="CVC"
											styles="flex-1"
										/>
									</View>

									<NotificationBox style={tw.style("mb-10")}>
										<FansText
											style={tw.style(
												"text-base leading-[21px] text-fans-purple text-center",
											)}
										>
											🔒 Secure Checkout{"\n"} Please note
											that we do not store or process any
											credit/debit card information on our
											site. All payment transactions are
											securely handled through
											Authorize.Net, a Visa solution
											company.”
										</FansText>
									</NotificationBox>
								</View>
							)}

							{checkoutOption === CheckoutType.Stripe && (
								<View style={tw.style("mb-8")}>
									<PaymentElement />
								</View>
							)}

							<View
								style={tw.style(
									"flex-row items-center mb-[20px]",
								)}
							>
								<Checkbox
									checked={saveDetails}
									onPress={() => setSaveDetails(!saveDetails)}
									size="lg"
								/>
								<CustomText size="base" style="ml-[18px]">
									Save details for future purchases
								</CustomText>
							</View>

							<RoundButton
								variant={RoundButtonType.OUTLINE_PRIMARY}
								onPress={handlePay}
							>
								Pay ${total} USD
							</RoundButton>

							<View style={tw.style("mt-[22px] mb-[77px]")}>
								<Text
									style={tw.style(
										"text-[12px] leading-[21px] text-fans-dark-grey text-center",
									)}
								>
									By moving forward, you agree to our{" "}
									<Text
										style={tw.style(
											"text-[12px] leading-[21px] text-fans-purple text-center underline",
										)}
										onPress={() => router.push("/terms")}
									>
										Terms of Use.
									</Text>
								</Text>
							</View>
						</View>
					</LayoutContentsContainer>
				</ScrollView>
			</View>
		</AppLayout>
	);
};

const GetGemsScreenWrapper = () => {
	const { gems = DEFAULT_GEM_AMOUNT } = useLocalSearchParams();
	const stripePromise = loadStripe(STRIPE_PUBLISHABLE_KEY);

	const [stripeClientSecret, setStripeClientSecret] = useState("");

	useEffect(() => {
		const fetchStripeClientSecret = async () => {
			const response = await gemsStripePurchase({
				gems: Number(gems),
			});
			if (response.ok) {
				setStripeClientSecret(response.data.clientSecret);
			}
		};

		fetchStripeClientSecret();
	}, [gems]);

	if (!stripeClientSecret) return null;
	return (
		<Elements
			stripe={stripePromise}
			options={{
				clientSecret: stripeClientSecret,
				appearance: {
					variables: {
						spacingUnit: "6px",
						borderRadius: "5px",
						fontWeightNormal: "700",
						spacingGridColumn: "20px",
					},
				},
			}}
		>
			<GetGemsScreen />
		</Elements>
	);
};

export default GetGemsScreenWrapper;
