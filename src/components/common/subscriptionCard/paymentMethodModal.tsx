import * as CommonSvg from "@assets/svgs/common";
import { EditSvg, VisaSvg } from "@assets/svgs/common";
import { FansDivider, FansGap, FansText } from "@components/controls";
import {
	getPaymentMethod,
	getPaymentMethods,
	unsubscribe,
	updatePaymentMethod,
} from "@helper/endpoints/subscriptions/apis";
import tw from "@lib/tailwind";
import { RoundButtonType } from "@usertypes/commonEnums";
import { IPaymentMethod, Subscription } from "@usertypes/types";
import { useRouter } from "expo-router";
import React, { FC, useEffect, useState } from "react";
import { Pressable, Text, View } from "react-native";
import Collapsible from "react-native-collapsible";
import { IconButton, Modal, Portal } from "react-native-paper";
import Toast from "react-native-toast-message";
import AvatarWithStatus from "../AvatarWithStatus";
import RoundButton from "../RoundButton";
import CustomText from "../customText";

interface Props {
	visible: boolean;
	handleClose: () => void;
	subscription: Subscription;
}

const PaymentMethodModal: FC<Props> = (props) => {
	const { visible, handleClose, subscription } = props;

	const router = useRouter();

	const [editMode, setEditMode] = useState(false);
	const [closeDropdown, setCloseDropdown] = useState(true);
	const [paymentMethods, setPaymentMethods] = useState<IPaymentMethod[]>([]);
	const [payment, setPayment] = useState<IPaymentMethod>();
	const [selectedPaymentMethod, setSelectedPaymentMethod] =
		useState<IPaymentMethod>();

	const formatPaymentMethod = () => {
		const selectedPayment = paymentMethods.find(
			(el) =>
				el.customerPaymentProfileId ===
				payment?.customerPaymentProfileId,
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

		const getPaymentMethodData = async () => {
			const paymentMethodData = await getPaymentMethod({
				id: subscription.id,
			});
			if (paymentMethodData.ok) {
				setSelectedPaymentMethod(paymentMethodData.data);
			}
		};

		getPaymentMethodData();
		getPaymentMethodsData();
	}, []);

	const handleAddMethod = () => {
		handleClose();
		router.push({
			pathname: "profile",
			params: {
				screen: "AddCard",
				returnPopup: "UpdatePaymentMethodSubscriptions",
				subscriptionId: subscription.id,
			},
		});
	};

	const onUpdatePaymentMethod = async () => {
		if (!payment) return;

		const updatePaymentMethodData = await updatePaymentMethod({
			id: subscription.id,
			customerPaymentProfileId: payment.customerPaymentProfileId,
		});
		if (updatePaymentMethodData.ok) {
			Toast.show({
				type: "success",
				text1: "Success",
				text2: "Payment method updated",
			});
			setSelectedPaymentMethod(payment);
			handleClose();
		} else {
			Toast.show({
				type: "error",
				text1: updatePaymentMethodData.data.message,
			});
		}
	};

	const onCancelSubsciption = async () => {
		const response = await unsubscribe({
			id: subscription.id,
		});

		if (response.ok) {
			Toast.show({
				type: "success",
				text1: "Subscription deleted",
			});
			handleClose();
		} else {
			Toast.show({
				type: "error",
				text1: response.data.message,
			});
		}
	};

	useEffect(() => {
		setEditMode(false);
	}, [visible]);

	return (
		<Portal>
			<Modal
				visible={visible}
				onDismiss={handleClose}
				contentContainerStyle={tw.style(
					"bg-white rounded-[15px] mx-[18px] md:max-w-150 md:mx-auto md:w-full",
				)}
			>
				<FansGap height={29} />
				<View style={tw.style("flex-row justify-center")}>
					<AvatarWithStatus avatar="" size={79} />
				</View>
				<FansGap height={19} />
				<FansDivider ver1 />
				<FansGap height={18} />
				<FansText
					style={tw.style(
						"font-inter-bold",
						"text-[19px] text-center",
					)}
				>
					Payment method
				</FansText>
				{editMode ? (
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
							onPress={() => setEditMode(false)}
						/>

						<CustomText size="lg" style="mb-[15px]">
							Change payment method
						</CustomText>

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
								{formatPaymentMethod().icon}
								<CustomText size="base" style="ml-2 mr-auto">
									{formatPaymentMethod().label}
								</CustomText>
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
												setPayment(method);
												setCloseDropdown(true);
											}}
										>
											<CommonSvg.VisaSvg
												width={22}
												height={22}
											/>
											<CustomText
												size="base"
												style="ml-2"
											>
												**** **** ****{" "}
												{method.cardNumber.slice(-4)}
											</CustomText>
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
						<RoundButton onPress={onUpdatePaymentMethod}>
							Update Method
						</RoundButton>
					</View>
				) : (
					<View>
						<View style={tw.style("mx-[18px] pt-6")}>
							<View
								style={tw.style("flex-row items-center mb-8")}
							>
								<VisaSvg size={46} />
								<View style={tw.style("ml-3")}>
									<CustomText size="xl" style="font-semibold">
										VISA ending{" "}
										{selectedPaymentMethod?.cardNumber}
									</CustomText>
									<CustomText
										size="base"
										style="text-fans-dark-grey mt-[-3px]"
									>
										Expires{" "}
										{selectedPaymentMethod?.expirationDate}
									</CustomText>
								</View>
								<IconButton
									style={tw.style(
										"w-[34px] h-[34px] m-0 ml-auto",
									)}
									containerColor="#f0f0f0"
									icon={() => (
										<EditSvg
											width={16}
											height={16.5}
											color="#000"
										/>
									)}
									onPress={() => setEditMode(true)}
								/>
							</View>
							<View style={tw.style("pb-5")}>
								<RoundButton
									variant={RoundButtonType.OUTLINE_RED}
									onPress={onCancelSubsciption}
								>
									Cancel subscription
								</RoundButton>
							</View>
						</View>
					</View>
				)}
			</Modal>
		</Portal>
	);
};

export default PaymentMethodModal;
