import { DateTime } from "luxon";

import React, { Fragment, useCallback, useEffect, useState } from "react";
import { Line } from "react-chartjs-2";

import { LevelDevotedImage } from "@assets/svgs";
import {
	Block1Svg,
	BlockSvg,
	Calendar1Svg,
	Calendar3Svg,
	Chat1Svg,
	Check1Svg,
	ChevronDown3Svg,
	ChevronUp1Svg,
	Close0Svg,
	Cursor1Svg,
	Diamond1Svg,
	Dollar1Svg,
	DotsVerticalSvg,
	Eye2Svg,
	Heart1Svg,
	Mail2Svg,
	Reply1Svg,
	Search1Svg,
	User1Svg,
} from "@assets/svgs/common";
import UserAvatar from "@components/avatar/UserAvatar";
import {
	FansChips4,
	FansGap,
	FansHorizontalDivider,
	FansImage2,
	FansScreen4,
	FansSvg,
	FansText,
	FansTextInput5,
	FansView,
} from "@components/controls";
import { RemoveModal } from "@components/modals/settings/referral";
import { LineChart } from "@components/screens/settings/analytics";
import {
	PostSheet,
	TransactionSheet,
} from "@components/sheet/settings/analytics";
import { IPost, ITransaction } from "@helper/CommonAPISchemas";
import { getPostAnalytics } from "@helper/endpoints";
import tw from "@lib/tailwind";
import { PostType } from "@usertypes/commonEnums";
import { Colors } from "@usertypes/enums";
import { SettingsNativeStackScreenProps } from "@usertypes/navigations";
import {
	CategoryScale,
	Chart,
	Legend,
	LineElement,
	LinearScale,
	PointElement,
	Title,
	Tooltip,
} from "chart.js";

type ContextType = {
	x: number;
	y: number;
};

Chart.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
);

const options = {
	responsive: true,
	plugins: {
		legend: {
			position: "top" as const,
		},
		title: {
			display: true,
			text: "Chart.js Line Chart",
		},
	},
};

const labels = ["00", "06", "12", "18", "20"];

const data = {
	labels,
	datasets: [
		{
			label: "Dataset 1",
			data: [0, 90, 60, 75, 100],
			borderColor: "#4DCC36",
			tension: 0.8,
		},
	],
};

interface PromotionalCampaignsProps {
	onBan: () => void;
}

const Earnings = () => {
	return (
		<FansView>
			<FansText fontFamily="inter-semibold" fontSize={23}>
				Earnings
			</FansText>
			<FansGap height={9} />
			<FansText fontFamily="inter-semibold" fontSize={23}>
				$1.21
			</FansText>
			<FansGap height={21.8} />
		</FansView>
	);
};

const LinkPerformance = (props: PromotionalCampaignsProps) => {
	const { onBan: trigBan } = props;

	const items = [
		{
			url: "fyp.fans/janelove/compagin1",
			time: "2023-09-05T23:39:10.318Z",
			revenue: 1500,
			share: 20,
			profile: 590,
			cursor: 1750,
		},
		{
			url: "fyp.fans/janelove/compagin1",
			time: "2023-09-05T23:39:10.318Z",
			revenue: 1500,
			share: 20,
			profile: 590,
			cursor: 1750,
		},
		{
			url: "fyp.fans/janelove/compagin1",
			time: "2023-09-05T23:39:10.318Z",
			revenue: 1500,
			share: 20,
			profile: 590,
			cursor: 1750,
		},
		{
			url: "fyp.fans/janelove/compagin1",
			time: "2023-09-05T23:39:10.318Z",
			revenue: 1500,
			share: 20,
			profile: 590,
			cursor: 1750,
		},
	];

	const [numChips, setChips] = useState(0);

	return (
		<FansView>
			<FansText fontFamily="inter-semibold" fontSize={23}>
				Link performance
			</FansText>
			<FansGap height={21} />
			<FansTextInput5
				textInputStyle={{ placeholder: "Search" }}
				iconNode={
					<FansSvg width={13.14} height={13.26} svg={Search1Svg} />
				}
			/>
			<FansGap height={15.3} />
			<FansView alignItems="center" flexDirection="row">
				<FansChips4
					data={[
						{ text: "Highest earnings" },
						{ text: "Highest CTR" },
					]}
					value={numChips}
					onChangeValue={setChips}
					chipsStyle={{ backgroundColor: "green-4d" }}
				/>
				<FansSvg width={16.5} height={18.49} svg={Calendar3Svg} />
			</FansView>
			<FansGap height={31.5} />
			{items.map((item, index) => {
				const { url, time, revenue, share, profile, cursor } = item;

				const [isCollapsed, setCollapsed] = useState(index !== 2);
				const handlePressCollapse = () => setCollapsed(!isCollapsed);

				const [strDuration, setDuration] = useState("Today");

				return (
					<Fragment key={index}>
						{index !== 0 && (
							<Fragment>
								<FansGap height={21.5} />
								<FansHorizontalDivider />
								<FansGap height={19.5} />
							</Fragment>
						)}
						<FansView>
							<FansView
								touchableOpacityProps={{
									onPress: handlePressCollapse,
								}}
								alignItems="center"
								flexDirection="row"
							>
								<FansView grow>
									<FansText
										fontFamily="inter-semibold"
										fontSize={16}
									>
										fyp.fans/janelove/campaign1
									</FansText>
								</FansView>
								<FansText
									color="grey-70"
									fontSize={14}
									textTransform="uppercase"
								>
									{DateTime.fromISO(time).toFormat("MMM d")}
								</FansText>
								<FansGap width={15.1} />
								<FansSvg
									width={11.87}
									height={5.93}
									svg={
										isCollapsed
											? ChevronDown3Svg
											: ChevronUp1Svg
									}
									color1="grey-70"
								/>
							</FansView>
							<FansGap height={10.5} />
							<FansView flexDirection="row" gap={7}>
								<FansView
									alignItems="center"
									backgroundColor={{
										color: "green-4d",
										opacity: 10,
									}}
									borderRadius="full"
									padding={{ x: 10 }}
								>
									<FansText
										color="green-4d"
										fontFamily="inter-semibold"
										fontSize={14}
									>
										REVENUE ${revenue.toLocaleString()}
									</FansText>
								</FansView>
								<FansView
									alignItems="center"
									backgroundColor={{
										color: "green-4d",
										opacity: 10,
									}}
									borderRadius="full"
									padding={{ x: 10 }}
								>
									<FansText
										color="green-4d"
										fontFamily="inter-semibold"
										fontSize={14}
										textTransform="uppercase"
									>
										{share}% Share
									</FansText>
								</FansView>
							</FansView>
							<FansView alignItems="end" flexDirection="row">
								<FansView flexDirection="row" gap={6}>
									<FansSvg
										width={15.43}
										height={15.71}
										svg={User1Svg}
										color1="green-4d"
									/>
									<FansText
										fontFamily="inter-semibold"
										fontSize={17}
									>
										{profile}
									</FansText>
								</FansView>
								<FansGap width={18.5} />
								<FansView flexDirection="row" gap={5.5}>
									<FansSvg
										width={12.04}
										height={15.71}
										svg={Cursor1Svg}
										color1="green-4d"
									/>
									<FansText
										fontFamily="inter-semibold"
										fontSize={17}
									>
										{cursor.toLocaleString()}
									</FansText>
								</FansView>
								<FansGap grow />
								<FansView
									touchableOpacityProps={{
										onPress: trigBan,
									}}
									backgroundColor="grey-f0"
									borderRadius="full"
									padding={10}
								>
									<BlockSvg size={16} color={Colors.Red} />
								</FansView>
							</FansView>
							{!isCollapsed && (
								<FansView>
									<Line options={options} data={data} />
									<FansView
										height={34}
										alignItems="center"
										borderColor="green-4d"
										borderRadius="full"
										flexDirection="row"
										justifyContent="around"
									>
										{[
											"Today",
											"1W",
											"1M",
											"3M",
											"6M",
											"1Y",
											"All",
										].map((item, index) => {
											const isActive =
												item === strDuration;

											const handlePressDuration = () =>
												setDuration(item);

											return (
												<FansView
													key={index}
													touchableOpacityProps={{
														onPress:
															handlePressDuration,
													}}
													backgroundColor={
														isActive
															? "green-4d"
															: "white"
													}
													borderRadius="full"
													padding={{
														x: isActive ? 10 : 0,
													}}
												>
													<FansText
														color={
															isActive
																? "white"
																: "green-4d"
														}
														fontFamily="inter-semibold"
														fontSize={14}
														textTransform="uppercase"
													>
														{item}
													</FansText>
												</FansView>
											);
										})}
									</FansView>
								</FansView>
							)}
						</FansView>
					</Fragment>
				);
			})}
		</FansView>
	);
};

const Transactions = () => {
	const data: ITransaction[] = [
		{
			id: "1",
			creator: {
				id: "1",
				username: "connan_key",
				displayName: "Ramiro Altamiglia",
				avatar: "",
			},
			description: "Subscription update",
			status: "Successful",
			date: "2023-09-05T23:39:10.318Z",
			amount: 0,
			processingFee: 0,
			platformFee: 0,
			totalFee: 0,
			total: 15,
		},
		{
			id: "2",
			creator: {
				id: "2",
				username: "janelove",
				displayName: "Ramiro Altamiglia",
				avatar: "",
			},
			description: "Payment failed",
			status: "Failed",
			date: "2023-09-05T23:39:10.318Z",
			amount: 0,
			processingFee: 0,
			platformFee: 0,
			totalFee: 0,
			total: 15,
		},
		{
			id: "3",
			creator: {
				id: "3",
				username: "connan_key",
				displayName: "Ramiro Altamiglia",
				avatar: "",
			},
			description: "Subscription update",
			status: "Successful",
			date: "2023-09-05T23:39:10.318Z",
			amount: 0,
			processingFee: 0,
			platformFee: 0,
			totalFee: 0,
			total: 15,
		},
		{
			id: "4",
			creator: {
				id: "4",
				username: "janelove",
				displayName: "Ramiro Altamiglia",
				avatar: "",
			},
			description: "Payment blocked",
			status: "Blocked",
			date: "2023-09-05T23:39:10.318Z",
			amount: 0,
			processingFee: 0,
			platformFee: 0,
			totalFee: 0,
			total: 15,
		},
		{
			id: "5",
			creator: {
				id: "5",
				username: "connan_key",
				displayName: "Ramiro Altamiglia",
				avatar: "",
			},
			description: "Subscription update",
			status: "Successful",
			date: "2023-09-05T23:39:10.318Z",
			amount: 0,
			processingFee: 0,
			platformFee: 0,
			totalFee: 0,
			total: 15,
		},
		{
			id: "6",
			creator: {
				id: "6",
				username: "connan_key",
				displayName: "Ramiro Altamiglia",
				avatar: "",
			},
			description: "Subscription update",
			status: "Successful",
			date: "2023-09-05T23:39:10.318Z",
			amount: 0,
			processingFee: 0,
			platformFee: 0,
			totalFee: 0,
			total: 15,
		},
		{
			id: "7",
			creator: {
				id: "7",
				username: "connan_key",
				displayName: "Ramiro Altamiglia",
				avatar: "",
			},
			description: "Payment blocked",
			status: "Blocked",
			date: "2023-09-05T23:39:10.318Z",
			amount: 0,
			processingFee: 0,
			platformFee: 0,
			totalFee: 0,
			total: 15,
		},
	];

	const [isTransactionSheetVisible, setTransactionSheetVisible] =
		useState(false);
	const [dataTransaction, setTransaction] = useState<ITransaction>();
	const handleCloseTransactionSheet = () => setTransactionSheetVisible(false);

	return (
		<FansView>
			<FansText fontFamily="inter-semibold" fontSize={23}>
				Transactions
			</FansText>
			<FansGap height={21} />
			<FansTextInput5
				textInputStyle={{ placeholder: "Search" }}
				iconNode={
					<FansSvg width={13.14} height={13.26} svg={Search1Svg} />
				}
			/>
			<FansGap height={19.5} />
			<FansView>
				{data.map((item, index) => {
					const { creator, description, status, date, total } = item;
					const { username, avatar } = creator;

					const isSubscriptionUpdate = status === "Successful";
					const isPaymentFailed = status === "Failed";

					const handlePressTransaction = () => {
						setTransaction(item);
						setTransactionSheetVisible(true);
					};

					return (
						<Fragment key={index}>
							<FansView
								height={75}
								touchableOpacityProps={{
									onPress: handlePressTransaction,
								}}
								alignItems="center"
								flexDirection="row"
							>
								<UserAvatar size="34px" image={avatar ?? ""} />
								<FansGap width={13} />
								<FansView gap={3} grow>
									<FansView
										alignItems="center"
										flexDirection="row"
										gap={7}
									>
										<FansText
											fontFamily="inter-semibold"
											fontSize={16}
										>
											{username}
										</FansText>
										<FansText
											color="green-4d"
											fontFamily="inter-semibold"
											fontSize={14}
										>
											20%
										</FansText>
									</FansView>
									<FansText color="grey-70" fontSize={13}>
										Wells Fargo Bank **** 1234
									</FansText>
								</FansView>
								<FansView alignItems="end" gap={3}>
									<FansView
										alignItems="center"
										backgroundColor={
											isSubscriptionUpdate
												? {
														color: "green-4d",
														opacity: 10,
												  }
												: "red-fd"
										}
										borderRadius="full"
										flexDirection="row"
										padding={{ l: 3, r: 7 }}
									>
										<FansView
											height={20}
											alignItems="center"
											aspectRatio="square"
											justifyContent="center"
										>
											{isSubscriptionUpdate ? (
												<FansSvg
													width={10.04}
													height={7.01}
													svg={Check1Svg}
													color1="green-4d"
												/>
											) : isPaymentFailed ? (
												<FansSvg
													width={7.73}
													height={7.73}
													svg={Close0Svg}
													color1="red-eb"
												/>
											) : (
												<FansSvg
													width={11.07}
													height={11.06}
													svg={Block1Svg}
													color1="red-eb"
												/>
											)}
										</FansView>
										<FansText
											color={
												isSubscriptionUpdate
													? "green-4d"
													: "red-eb"
											}
											fontFamily="inter-semibold"
											fontSize={14}
										>
											${total}
										</FansText>
									</FansView>
									<FansText
										color="grey-70"
										fontSize={14}
										textTransform="uppercase"
									>
										{DateTime.fromISO(date).toFormat(
											"MMM d, h:mm a",
										)}
									</FansText>
								</FansView>
								<FansGap width={19.4} />
								<FansSvg
									width={3.55}
									height={17.38}
									svg={DotsVerticalSvg}
								/>
							</FansView>
							<FansHorizontalDivider />
						</Fragment>
					);
				})}
			</FansView>
		</FansView>
	);
};

const AnalyticsScreen = (
	props: SettingsNativeStackScreenProps<"Analytics">,
) => {
	const { navigation } = props;

	const items = [
		{ text: "Earnings" },
		{ text: "Link performance" },
		{ text: "Transactions" },
	];

	const [isRemoveModalVisible, setRemoveModalVisible] = useState(false);
	const [selected, setSelected] = useState(0);

	const handleBan = () => setRemoveModalVisible(true);

	const handleCloseRemoveModal = () => setRemoveModalVisible(false);

	const handleSelect = (index: number) => {
		setSelected(index);
	};

	return (
		<FansScreen4 contentStyle1={{ maxWidth: { lg: 670 } }}>
			<FansChips4
				data={items}
				value={selected}
				viewStyle={{
					style: tw.style("mx-[-17px]", "px-[17px]"),
				}}
				chipsStyle={{ backgroundColor: "green-4d" }}
				onChangeValue={handleSelect}
			/>
			<FansGap height={30} />
			{(() => {
				switch (selected) {
					case 0: {
						return <Earnings />;
					}
					case 1: {
						return <LinkPerformance onBan={handleBan} />;
					}
					case 2: {
						return <Transactions />;
					}
				}
				return <></>;
			})()}
			<RemoveModal
				visible={isRemoveModalVisible}
				onClose={handleCloseRemoveModal}
				onSubmit={() => {}}
			/>
		</FansScreen4>
	);
};

export default AnalyticsScreen;
