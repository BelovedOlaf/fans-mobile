import { View, Text, Image, Pressable } from "react-native";
import React, { FC, useState, useEffect } from "react";
import { Modal, Portal, IconButton } from "react-native-paper";
import Collapsible from "react-native-collapsible";
import Toast from "react-native-toast-message";

import RoundButton from "../RoundButton";
import { FypText } from "@components/common/base";
import ListLine from "../listLine";
import SubscriptionBundle from "../subscriptionBundle";
import { SubscriptionButton } from "@components/profiles";
import * as CommonSvg from "@assets/svgs/common";
import {
	IBundle,
	ISubscription,
	ISubscriptionTier,
	IPaymentMethod,
} from "@usertypes/types";
import { SubscribeActionType } from "@usertypes/commonEnums";
// import base modules
import { FansDivider, FansText } from "@components/controls";
import UserAvatar from "@components/avatar/UserAvatar";

import tw from "@lib/tailwind";
import { getPriceString, getBundlePrice } from "@utils/stringHelper";
import {
	subscribe,
	getPaymentMethods,
	getSubscriptionPrice,
	freeSubscribe,
} from "@helper/endpoints/subscriptions/apis";
import {
	getPaidPostPrice,
	purchasePaidPost,
} from "@helper/endpoints/post/apis";
import {
	ADD_PAYMENT_CARD_DIALOG_ID,
	ANIMATION_LOADING_DIALOG_ID,
} from "@constants/modal";
import {
	CommonActionType,
	useAppContext,
	ModalActionType,
} from "@context/useAppContext";

interface Props {
	checkAccessSubscribedUser?: () => Promise<void>;
	paidPostCallback?: (postId: string) => void;
}

const SubscribeDialog: FC<Props> = ({
	checkAccessSubscribedUser,
	paidPostCallback,
}) => {
	const { state, dispatch } = useAppContext();
	const {
		visible,
		creator,
		subscribeActionType,
		subscribeTierId,
		bundleId,
		defaultTab,
		post,
		onSuccess,
	} = state.common.subscribeModal;

	const [tab, setTab] = useState("start");
	const [closeDropdown, setCloseDropdown] = useState(true);
	const [paymentMethods, setPaymentMethods] = useState<IPaymentMethod[]>([]);
	const [payment, setPayment] = useState("");
	const [subscription, setSubscription] = useState<ISubscription>();
	const [bundle, setBundle] = useState<IBundle>();
	const [tier, setTier] = useState<ISubscriptionTier>();
	const [price, setPrice] = useState(0);
	const [platformFee, setPlatformFee] = useState(0);
	const [total, setTotal] = useState(0);
	const [freeTrial, setFreeTrial] = useState(false);
	const [freeTrialDays, setFreeTrialDays] = useState<number | undefined>();
	const [discount, setDiscount] = useState<number | undefined>();
	const [discountDays, setDiscountDays] = useState<number | undefined>();
	const [error, setError] = useState("");

	const handleClose = () => {
		dispatch.setCommon({
			type: CommonActionType.toggleSubscribeModal,
			data: {
				visible: false,
				defaultTab: "start",
			},
		});
	};

	const handleSelectPaymentStep = () => {
		dispatch.setCommon({
			type: CommonActionType.toggleSubscribeModal,
			data: {
				visible: true,
				defaultTab: "form",
			},
		});
	};

	const getPaymentMethod = () => {
		const selectedPayment = paymentMethods.find(
			(el) => el.customerPaymentProfileId === payment,
		);

		const label = `**** **** **** ${selectedPayment?.cardNumber.slice(-4)}`;
		switch (selectedPayment?.cardType) {
			case "Visa":
				return {
					icon: <CommonSvg.VisaSvg width={34} height={34} />,
					label: label,
				};
			case "MasterCard":
				return {
					icon: <CommonSvg.VisaSvg width={34} height={34} />,
					label: label,
				};
			case "AmericanExpress":
				return {
					icon: <CommonSvg.VisaSvg width={34} height={34} />,
					label: label,
				};
			case "Discover":
				return {
					icon: <CommonSvg.VisaSvg width={34} height={34} />,
					label: label,
				};
			default:
				return { icon: null, label: "Select card" };
		}
	};

	useEffect(() => {
		const getPaymentMethodsData = async () => {
			const paymentMethodsData = await getPaymentMethods();
			if (paymentMethodsData.ok) {
				setPaymentMethods(paymentMethodsData.data);
			}
		};
		getPaymentMethodsData();
	}, [state.common.subscribeModal]);

	useEffect(() => {
		if (visible) {
			const getSubscriptionPriceData = async () => {
				if (!subscribeTierId) return;

				const subscriptionPriceData = await getSubscriptionPrice({
					id: subscribeTierId,
					...(bundleId ? { bundleId } : {}),
				});
				if (subscriptionPriceData.ok) {
					setPrice(subscriptionPriceData.data.amount);
					setPlatformFee(subscriptionPriceData.data.platformFee);
					setTotal(subscriptionPriceData.data.totalAmount);
					setFreeTrial(!!subscriptionPriceData.data.freeTrial);
					setFreeTrialDays(
						subscriptionPriceData.data.freeTrialPeriod,
					);
					setDiscount(subscriptionPriceData.data.discount);
					setDiscountDays(subscriptionPriceData.data.discountPeriod);
				}
			};

			const getPaidPostPriceData = async () => {
				if (!post) return;

				const paidPostPriceData = await getPaidPostPrice({
					id: post.id,
				});
				if (paidPostPriceData.ok) {
					setPrice(paidPostPriceData.data.amount);
					setPlatformFee(paidPostPriceData.data.platformFee);
					setTotal(paidPostPriceData.data.totalAmount);
				}
			};

			switch (subscribeActionType) {
				case SubscribeActionType.Subscribe:
					getSubscriptionPriceData();
					break;
				case SubscribeActionType.Tier:
					getSubscriptionPriceData();
					break;
				case SubscribeActionType.Bundle:
					getSubscriptionPriceData();
					break;
				case SubscribeActionType.Post:
					getPaidPostPriceData();
					break;
				default:
					break;
			}
		}
	}, [subscribeTierId, bundleId, subscribeActionType, post, visible]);

	const handleAddMethod = () => {
		dispatch.setCommon({
			type: CommonActionType.toggleSubscribeModal,
			data: {
				visible: false,
			},
		});
		dispatch.setModal({
			type: ModalActionType.showModal,
			data: { id: ADD_PAYMENT_CARD_DIALOG_ID, show: true },
		});
	};

	useEffect(() => {
		setTab(defaultTab ?? "start");
	}, [visible, defaultTab]);

	useEffect(() => {
		if (visible) {
			if (subscribeActionType === SubscribeActionType.Subscribe) {
				setSubscription(
					creator.subscriptions.find(
						(el) => el.id === subscribeTierId,
					),
				);
			}
			if (subscribeActionType === SubscribeActionType.Tier) {
				setTier(creator.tiers.find((el) => el.id === subscribeTierId));
			}
			if (subscribeActionType === SubscribeActionType.Bundle) {
				setSubscription(
					creator.subscriptions.find(
						(el) => el.id === subscribeTierId,
					),
				);
				setBundle(
					creator.subscriptions
						.find((el) => el.id === subscribeTierId)
						?.bundles.find((cell) => cell.id === bundleId),
				);
			}
		}
	}, [subscribeActionType, bundleId, subscribeTierId, visible]);

	const showLoading = () => {
		dispatch.setCommon({
			type: CommonActionType.toggleSubscribeModal,
			data: {
				visible: false,
			},
		});
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
		dispatch.setCommon({
			type: CommonActionType.toggleSubscribeModal,
			data: {
				visible: true,
			},
		});
	};

	const onSubscribe = async () => {
		let subscribeData;

		if (price === 0) {
			subscribeData = await freeSubscribe({
				id: subscribeTierId,
			});
		} else {
			subscribeData = await subscribe({
				id: subscribeTierId,
				bundleId: bundleId,
				customerPaymentProfileId: payment,
			});
		}

		if (checkAccessSubscribedUser) await checkAccessSubscribedUser();

		hideLoading();
		if (subscribeData.ok) {
			handleClose();
			if (onSuccess) onSuccess();
			Toast.show({
				type: "success",
				text1: "Success",
				text2: `You have successfully subscribed to ${creator.displayName}`,
			});
		} else {
			handleSelectPaymentStep();
			hideLoading();
			setError(subscribeData.data.message);
			Toast.show({
				type: "error",
				text1: "Error",
				text2: subscribeData.data.message,
			});
		}
	};

	const onPurchasePost = async () => {
		if (!post) return;

		const purchasePaidPostData = await purchasePaidPost({
			postId: post.id,
			customerPaymentProfileId: payment,
		});
		hideLoading();
		if (purchasePaidPostData.ok) {
			handleClose();
			Toast.show({
				type: "success",
				text1: "Success",
				text2: `You have successfully purchased post from ${creator.displayName}`,
			});
			if (paidPostCallback) paidPostCallback(post.id);
		} else {
			Toast.show({
				type: "error",
				text1: "Error",
				text2: purchasePaidPostData.data.message,
			});
		}
	};

	const onPayment = () => {
		if (!payment) {
			Toast.show({
				type: "error",
				text1: "Error",
				text2: "Please select payment method",
			});
			return;
		}
		showLoading();

		switch (subscribeActionType) {
			case SubscribeActionType.Subscribe:
			case SubscribeActionType.Tier:
			case SubscribeActionType.Bundle:
				onSubscribe();
				break;
			case SubscribeActionType.Post:
				onPurchasePost();
				break;
			default:
				break;
		}
	};

	const onPaymentButtonClick = () => setTab("form");

	return (
		<Portal>
			<Modal
				visible={visible}
				onDismiss={handleClose}
				contentContainerStyle={tw.style(
					"bg-white rounded-[15px] mx-[18px] md:max-w-150 md:mx-auto md:w-full",
				)}
			>
				{tab === "start" ? (
					<View>
						<View style={tw.style("relative")}>
							<Image
								source={require("@assets/images/profile/welcome-hero.jpg")}
								resizeMode="cover"
								style={tw.style(
									"rounded-t-[15px] w-full h-[85px]",
								)}
							/>
							<IconButton
								icon={() => (
									<CommonSvg.CloseSvg
										width={9.33}
										height={9.33}
										color="#fff"
									/>
								)}
								mode="contained"
								containerColor="rgba(0,0,0,0.3)"
								style={tw.style(
									"w-[25px] h-[25px] absolute top-[14px] right-[14px]",
								)}
								onPress={handleClose}
							/>
						</View>
						<View
							style={tw.style(
								"px-[15px] pb-5 bg-white rounded-b-[15px]",
							)}
						>
							<View
								style={tw.style(
									"mt-[-20px] flex-row items-end mb-[22px]",
								)}
							>
								<View
									style={tw.style(
										"border-[4px] border-white rounded-full w-[79px] h-[79px] bg-white",
									)}
								>
									<UserAvatar
										image={creator.avatar}
										size="75px"
									/>
								</View>
								<View style={tw.style("ml-[14px]")}>
									<FypText
										fontSize={19}
										lineHeight={26}
										fontWeight={700}
									>
										{creator.displayName}
									</FypText>
									<FypText
										fontSize={16}
										lineHeight={21}
										color="grey-70"
									>
										{`@${creator.user?.username}`}
									</FypText>
								</View>
							</View>

							<FypText
								fontSize={17}
								lineHeight={22}
								fontWeight={600}
								style={tw.style("mb-5")}
							>
								Subscription benefits
							</FypText>
							<View style={tw.style("gap-y-[14px] mb-6")}>
								<ListLine
									text="Full access to this creator's content"
									size="lg"
								/>
								<ListLine
									text="Direct message with this creator"
									size="lg"
								/>
								<ListLine
									text="Cancel your subscription at any time"
									size="lg"
								/>
							</View>
							{subscribeActionType ===
								SubscribeActionType.Subscribe &&
							subscription ? (
								<SubscriptionButton
									data={subscription}
									onPress={onPaymentButtonClick}
								/>
							) : null}
							{subscribeActionType ===
							SubscribeActionType.Bundle ? (
								<SubscriptionBundle
									title={`${bundle?.month} months (${bundle?.discount}% off)`}
									value={`${getBundlePrice(
										subscription?.price ?? 0,
										bundle?.month ?? 0,
										bundle?.discount ?? 0,
										subscription?.currency ?? "USD",
									)} total`}
									variant="outlined"
									onPress={onPaymentButtonClick}
								/>
							) : null}
							{subscribeActionType ===
							SubscribeActionType.Tier ? (
								<SubscriptionBundle
									title="Subscribe"
									value={`${getPriceString(
										(tier?.price as number) ?? 0,
										tier?.currency ?? "",
									)}/month`}
									variant="contained"
									onPress={onPaymentButtonClick}
								/>
							) : null}
						</View>
					</View>
				) : (
					<View
						style={tw.style(
							"relative pt-6 px-[18px] pb-5 bg-white rounded-[15px]",
						)}
					>
						<IconButton
							icon={() => (
								<CommonSvg.CloseSvg
									width={9.33}
									height={9.33}
									color="#fff"
								/>
							)}
							mode="contained"
							containerColor="rgba(0,0,0,0.3)"
							style={tw.style(
								"w-[25px] h-[25px] absolute top-[14px] right-[14px]",
							)}
							onPress={handleClose}
						/>
						<UserAvatar image={creator.avatar} size="78px" />
						<FansDivider
							style={tw.style("bg-fans-grey mt-5 mb-4")}
						/>

						<FypText fontSize={16} lineHeight={21} fontWeight={500}>
							{freeTrial && freeTrialDays
								? `After ${freeTrialDays} month(s) you will be charged $${total}`
								: `You will be charged $${total}`}
						</FypText>

						<FypText
							fontSize={15}
							lineHeight={20}
							color="grey-70"
							style={tw.style("mb-[25px]")}
						>
							${price} + ${platformFee} platform fee
						</FypText>

						{/* {freeTrial && freeTrialDays && (
							<CustomText
								size="sm"
								style="text-fans-dark-grey mb-[25px]"
							>
								After {freeTrialDays} months you renew at $
								{total}
							</CustomText>
						)} */}

						{discount && discountDays && (
							<FypText
								fontSize={15}
								lineHeight={20}
								color="grey-70"
								style={tw.style("mb-[25px]")}
							>
								After {discountDays} months will renew at normal
								${total} amount.
							</FypText>
						)}

						<FypText
							fontSize={17}
							lineHeight={22}
							fontWeight={500}
							style={tw.style("mb-[15px]")}
						>
							Payment method
						</FypText>

						<View
							style={tw.style(
								"mb-5 border border-fans-dark-grey rounded-[24px]",
							)}
						>
							<Pressable
								style={tw.style([
									"flex-row items-center py-1 pl-1 pr-[18px] h-[42px]",
								])}
								onPress={() => setCloseDropdown(!closeDropdown)}
							>
								{getPaymentMethod().icon}
								<FypText
									fontSize={16}
									lineHeight={21}
									style={tw.style("ml-2 mr-auto")}
								>
									{getPaymentMethod().label}
								</FypText>
								<CommonSvg.ChevronDownSvg
									width={14}
									height={8}
									color="#707070"
								/>
							</Pressable>
							<Collapsible collapsed={closeDropdown}>
								<View style={tw.style("pb-5")}>
									<FansDivider />

									{paymentMethods.map((method) => (
										<Pressable
											style={tw.style(
												"flex-row items-center px-4 py-2",
											)}
											key={
												method.customerPaymentProfileId
											}
											onPress={() => {
												setPayment(
													method.customerPaymentProfileId,
												);
												setCloseDropdown(true);
											}}
										>
											<CommonSvg.VisaSvg
												width={22}
												height={22}
											/>
											<FypText
												fontSize={16}
												lineHeight={21}
												style={tw.style("ml-2")}
											>
												**** **** ****{" "}
												{method.cardNumber.slice(-4)}
											</FypText>
										</Pressable>
									))}

									<Pressable
										style={tw.style(
											"bg-fans-purple flex-row items-center pl-4 h-[38px]",
										)}
										onPress={handleAddMethod}
									>
										<View
											style={tw.style(
												"w-[22px] justify-center flex-row",
											)}
										>
											<CommonSvg.PlusSvg
												width={14}
												height={14}
												color="#fff"
											/>
										</View>
										<Text
											style={tw.style(
												"text-[18px] leading-6 text-white ml-2",
											)}
										>
											Add payment method
										</Text>
									</Pressable>
								</View>
							</Collapsible>
						</View>
						<FansText
							fontSize={12}
							lineHeight={16}
							color="red"
							style={tw.style("mb-5")}
						>
							{error}
						</FansText>
						<RoundButton onPress={onPayment}>
							Pay ${total}
						</RoundButton>
					</View>
				)}
			</Modal>
		</Portal>
	);
};

export default SubscribeDialog;
