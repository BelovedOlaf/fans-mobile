import debounce from "lodash/debounce";
import { DateTime } from "luxon";
import React, { Fragment, useEffect, useState } from "react";
import { TouchableOpacity, View } from "react-native";

import {
	AccountSvg,
	BlockSvg,
	CalendarSvg,
	CheckSvg,
	ChevronLeftSvg,
	ChevronRight2Svg,
	CloseSvg,
	DollarSvg,
	DotsHorizontalSvg,
	ElitePng,
	SearchSvg,
	ThreeDotsSvg,
	ThreeDotsVerticalSvg,
} from "@assets/svgs/common";

import RoundButton from "@components/common/RoundButton";
import {
	FansButton3,
	FansDivider,
	FansGap,
	FansHorizontalDivider,
	FansImage,
	FansImage1,
	FansImage2,
	FansScreen2,
	FansScreen3,
	FansSvg,
	FansText,
	FansTextInput,
	FansView,
} from "@components/controls";
import { PaymentHistorySheet, PaymentMethodSheet } from "@components/sheet";

import tw from "@lib/tailwind";

import { getUserTransactions } from "@helper/endpoints/profile/apis";
import { getPaymentMethods } from "@helper/endpoints/subscriptions/apis";

import { CommonActionType, useAppContext } from "@context/useAppContext";

import { RoundButtonType } from "@usertypes/commonEnums";
import { Colors } from "@usertypes/enums";
import { SettingsPaymentsStackScreenProps } from "@usertypes/navigations";
import { ColorStyle1 } from "@usertypes/styles";
import { IPaymentMethod, ITransaction } from "@usertypes/types";
import { GemImage, LevelDevotedImage, PaymentVISAImage } from "@assets/svgs";
import { useLocalSearchParams, useRouter } from "expo-router";
import { cdnURL } from "@helper/Utils";
import { openURL } from "expo-linking";
import UserAvatar from "@components/avatar/UserAvatar";

interface IPaymentHistory {
	displayName: string;
	type: "SubscriptionUpdate" | "PaymentFailed" | "PaymentBlocked";
}

const PaymentsScreen = (
	props: SettingsPaymentsStackScreenProps<"Payments">,
) => {
	const { navigation } = props;

	const { refresh = false } = useLocalSearchParams();

	const { state, dispatch } = useAppContext();
	const { userInfo } = state.user;

	const router = useRouter();

	const [paymentHistory, setPaymentHistory] = useState<ITransaction[]>([]);
	const [paymentMethods, setPaymentMethods] = useState<IPaymentMethod[]>([]);

	const items = [
		{ text: "Date", icon: CalendarSvg },
		{ text: "Amount", icon: DollarSvg },
		{ text: "Creator", icon: AccountSvg },
		{ text: "Purchase type", icon: DollarSvg },
	];

	const [page, setPage] = useState(1);
	const [pages, setPages] = useState(1);
	const [search, setSearch] = useState("");
	const [isPaymentHistorySheetVisible, setPaymentHistorySheetVisible] =
		useState(false);
	const [selectedTransaction, setSelectedTransaction] =
		useState<ITransaction | null>();
	const [isPaymentMethodSheetVisible, setPaymentMethodSheetVisible] =
		useState(false);
	const [selectedPaymentMethod, setSelectedPaymentMethod] =
		useState<IPaymentMethod | null>();

	const handleClosePaymentHistoryDialog = () =>
		setPaymentHistorySheetVisible(false);
	const handleClosePaymentMethodDialog = () =>
		setPaymentMethodSheetVisible(false);
	const handlePressAddPaymentMethod = () =>
		navigation.navigate("AddPaymentMethod");
	const handlePressPaymentHistory = (transaction: ITransaction) => {
		setPaymentHistorySheetVisible(true);
		setSelectedTransaction(transaction);
	};
	const handlePressPaymentMethod = (paymentMethod: IPaymentMethod) => {
		setPaymentMethodSheetVisible(true);
		setSelectedPaymentMethod(paymentMethod);
	};

	const handlePressPurchaseGems = () => router.push("/get-gems?gems=1000");

	const getPaymentHistoryData = async () => {
		const paymentHistoryData = await getUserTransactions(
			{},
			{ search, page },
		);
		if (paymentHistoryData.ok) {
			setPaymentHistory(paymentHistoryData.data.transactions);
			setPages(paymentHistoryData.data.pages);
		}
	};

	const getPaymentMethodsData = async () => {
		const paymentMethodsData = await getPaymentMethods();
		if (paymentMethodsData.ok) {
			setPaymentMethods(paymentMethodsData.data);
		}
	};

	const debouncedGetPaymentHistoryData = debounce(getPaymentHistoryData, 500);

	const handleSearch = (text: string) => {
		setSearch(text);
		debouncedGetPaymentHistoryData();
	};

	useEffect(() => {
		getPaymentMethodsData();
		getPaymentHistoryData();
	}, [refresh]);

	useEffect(() => {
		getPaymentHistoryData();
	}, [page]);

	function Pagination() {
		const handlePageChange = (pageNumber: number) => {
			setPage(pageNumber);
		};

		const handleNext = () => {
			setPage((prevPageNumber) => Math.min(prevPageNumber + 1, pages));
		};

		const handlePrev = () => {
			setPage((prevPageNumber) => Math.max(prevPageNumber - 1, 1));
		};

		const getPages = () => {
			const startPage = Math.max(page - 2, 1);
			const endPage = Math.min(startPage + 4, pages);
			return Array.from(
				{ length: endPage - startPage + 1 },
				(_, idx) => startPage + idx,
			);
		};

		return (
			<FansView alignItems="center" flexDirection="row">
				<TouchableOpacity onPress={handlePrev}>
					<FansView
						width={30}
						height={30}
						alignItems="center"
						borderColor={page === 1 ? "grey-de" : "grey-70"}
						borderRadius="full"
						justifyContent="center"
					>
						<FansSvg
							width={6.56}
							height={13.13}
							svg={ChevronLeftSvg}
							color1={page === 1 ? "grey-de" : "grey-70"}
						/>
					</FansView>
				</TouchableOpacity>
				<FansGap grow />
				<FansView flexDirection="row" style={tw.style("gap-[36px]")}>
					{getPages().map((pageNumber) => (
						<FansText
							key={pageNumber}
							onPress={() => handlePageChange(pageNumber)}
							fontFamily="inter-medium"
							fontSize={19}
							color={page === pageNumber ? "grey-70" : "grey-de"}
						>
							{pageNumber}
						</FansText>
					))}
				</FansView>
				<FansGap grow />
				<TouchableOpacity onPress={handleNext}>
					<FansView
						width={30}
						height={30}
						alignItems="center"
						borderColor={page === pages ? "grey-de" : "grey-70"}
						borderRadius="full"
						justifyContent="center"
					>
						<FansSvg
							width={6.56}
							height={13.13}
							svg={ChevronRight2Svg}
							color1={page === pages ? "grey-de" : "grey-70"}
						/>
					</FansView>
				</TouchableOpacity>
			</FansView>
		);
	}

	return (
		<FansScreen3 contentStyle1={{ maxWidth: { lg: 670 } }}>
			{/* Payment method ~ */}
			<FansView gap={12}>
				<FansText fontFamily="inter-semibold" fontSize={17}>
					Payment method
				</FansText>
				<FansText color="grey-70" fontSize={16}>
					Edit your payment settings, including how you'd like to pay
					to creators
				</FansText>
			</FansView>
			{/* ~ Payment method */}

			<FansGap height={37} />

			{paymentMethods.map((paymentMethod, index) => {
				return (
					<Fragment key={index}>
						{(() => {
							switch (index) {
								case 0:
									return (
										<Fragment>
											<FansText
												fontFamily="inter-semibold"
												fontSize={17}
											>
												Default
											</FansText>
											<FansGap height={30} />
										</Fragment>
									);
								case 1:
									return (
										<Fragment>
											<FansGap height={49} />
											<FansText
												fontFamily="inter-semibold"
												fontSize={17}
											>
												Backup
											</FansText>
											<FansGap height={30} />
										</Fragment>
									);
								default:
									return (
										<Fragment>
											<FansGap height={16} />
											<FansHorizontalDivider />
											<FansGap height={16} />
										</Fragment>
									);
							}
						})()}
						<FansView alignItems="center" flexDirection="row">
							<FansSvg
								width={46}
								height={46}
								svg={PaymentVISAImage}
							/>
							<FansGap width={13} />
							<FansView>
								<FansText
									fontFamily="inter-semibold"
									fontSize={19}
								>
									{paymentMethod.cardType} ending{" "}
									{paymentMethod.cardNumber.slice(-4)}
								</FansText>
								<FansText color="grey-70" fontSize={16}>
									Expires {paymentMethod.expirationDate}
								</FansText>
							</FansView>
							<FansGap viewStyle={{ grow: true }} />
							<FansView
								touchableOpacityProps={{
									onPress: () =>
										handlePressPaymentMethod(paymentMethod),
								}}
							>
								<FansSvg
									width={17.38}
									height={3.55}
									svg={DotsHorizontalSvg}
								/>
							</FansView>
						</FansView>
					</Fragment>
				);
			})}

			<FansGap height={33} />

			{/* Add payment method ~ */}
			<FansButton3
				title="Add payment method"
				buttonStyle={{ backgroundColor: "white" }}
				textStyle1={{ color: "purple-a8" }}
				onPress={handlePressAddPaymentMethod}
			/>
			{/* ~ Add payment method */}

			<FansGap height={33} />

			{/* Gem balance ~ */}
			<FansView>
				<FansText fontFamily="inter-semibold" fontSize={17}>
					Gem balance
				</FansText>
				<FansGap height={15} />
				<FansView
					height={116}
					alignItems="center"
					borderColor="grey-f0"
					borderRadius={15}
					flexDirection="row"
					padding={{ l: 19 }}
				>
					<FansView
						width={60}
						height={60}
						alignItems="center"
						background={ColorStyle1.PurpleLite}
						borderRadius="full"
						justifyContent="center"
					>
						<FansSvg width={38.23} height={35.44} svg={GemImage} />
					</FansView>
					<FansGap width={12} />
					<FansView>
						<FansText color="purple-a8" fontSize={16}>
							${userInfo.gemsAmount} USD
						</FansText>
						<FansGap height={3} />
						<FansText
							color="purple-a8"
							fontFamily="inter-semibold"
							fontSize={23}
						>
							{userInfo.gems} Gems
						</FansText>
					</FansView>
				</FansView>
				<FansGap height={14} />
				<FansButton3
					title="Purchase gems"
					onPress={handlePressPurchaseGems}
				/>
			</FansView>
			{/* Gem balance ~ */}
			<FansGap height={39} />
			<FansHorizontalDivider />
			<FansGap height={34} />
			<FansView>
				<FansText fontFamily="inter-semibold" fontSize={17}>
					Payment history
				</FansText>
				<FansGap height={15} />
				<FansTextInput
					icon={SearchSvg}
					placeholder="Search payments"
					value={search}
					onChangeText={handleSearch}
				/>
				<FansGap height={15.1} />
				{/* <FansSwitchButtons
					activeColor={Colors.Green}
					data={items}
					selected={selected}
					onSelect={setSelected}
				/> */}
				<FansGap height={31.9} />

				{paymentHistory.map((item, index) => {
					const { creator, description, date, total, status } = item;
					const { username, avatar } = creator;

					const defaultAvatar = require("@assets/images/default-avatar.png");

					const isSubscriptionUpdate = status === "Successful";
					const isPaymentFailed = status === "Cancelled";

					return (
						<Fragment key={index}>
							<FansView
								height={75}
								alignItems="center"
								flexDirection="row"
							>
								<UserAvatar
									image={
										avatar
											? { uri: cdnURL(avatar) }
											: defaultAvatar
									}
									size="34px"
								/>
								<FansGap width={13} />
								<FansView grow>
									<FansText
										fontFamily="inter-semibold"
										fontSize={16}
									>
										{username}
									</FansText>
									<FansGap height={3} />
									<FansText color="grey-70" fontSize={15}>
										{description}
									</FansText>
								</FansView>
								<FansView alignItems="end">
									<FansView
										style={tw.style(
											isSubscriptionUpdate
												? "bg-fans-green/10 pl-2 pr-2 pt-0.5 pb-0.5 self-end"
												: "bg-fans-red-fd pl-2 pr-2 pt-0.5 pb-0.5 self-end",
										)}
										alignItems="center"
										borderRadius="full"
										flexDirection="row"
										justifyContent="center"
									>
										{isSubscriptionUpdate ? (
											<FansSvg
												width={10.04}
												height={7.01}
												svg={CheckSvg}
												color1="green"
											/>
										) : isPaymentFailed ? (
											<FansSvg
												width={7.73}
												height={7.73}
												svg={CloseSvg}
												color1="red"
											/>
										) : (
											<FansSvg
												width={11.07}
												height={11.06}
												svg={BlockSvg}
												color="red"
											/>
										)}
										<FansGap width={5} />
										<FansText
											color={
												isSubscriptionUpdate
													? "green"
													: "red"
											}
											fontSize={14}
										>
											${total}
										</FansText>
									</FansView>
									<FansText color="grey-70" fontSize={14}>
										{DateTime.fromISO(date).toFormat(
											"MMM d, h:m a",
										)}
									</FansText>
								</FansView>
								<FansGap width={19.5} />
								<TouchableOpacity
									onPress={() =>
										handlePressPaymentHistory(item)
									}
								>
									<ThreeDotsVerticalSvg size={18} />
								</TouchableOpacity>
							</FansView>
						</Fragment>
					);
				})}
				<FansGap height={22.5} />
				<Pagination />
				<FansGap height={20} />
			</FansView>
			<PaymentMethodSheet
				open={isPaymentMethodSheetVisible}
				onClose={handleClosePaymentMethodDialog}
				onSubmit={() => {}}
				onSuccess={() => {
					getPaymentMethodsData();
					handleClosePaymentMethodDialog();
					setSelectedPaymentMethod(null);
				}}
				onEdit={() => {
					handleClosePaymentMethodDialog();
					navigation.navigate("AddPaymentMethod", {
						id: selectedPaymentMethod?.id,
						customerPaymentProfileId:
							selectedPaymentMethod?.customerPaymentProfileId,
					});
				}}
				paymentMethod={selectedPaymentMethod}
			/>
			{isPaymentHistorySheetVisible && selectedTransaction && (
				<PaymentHistorySheet
					transaction={selectedTransaction}
					onClose={handleClosePaymentHistoryDialog}
					onSubmit={() => {}}
				/>
			)}
		</FansScreen3>
	);
};

export default PaymentsScreen;
