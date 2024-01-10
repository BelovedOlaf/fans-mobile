import { DateTime } from "luxon";

import React, { Fragment } from "react";

import { Block1Svg, Check1Svg, Close0Svg } from "@assets/svgs/common";
import UserAvatar from "@components/avatar/UserAvatar";
import {
	FansButton3,
	FansGap,
	FansHorizontalDivider,
	FansSheet2,
	FansSvg,
	FansText,
	FansView,
} from "@components/controls";
import { IFansSheet } from "@usertypes/components";
import { ITransactionCreator, TransactionEmpty } from "@usertypes/types";

const TransactionSheet: IFansSheet<ITransactionCreator> = (props) => {
	const {
		width = { lg: 741 },
		height = { xs: 556, lg: 548 },
		data = TransactionEmpty,
		...props_
	} = props;
	const { onClose: handleClose, onSubmit: handleSubmit } = props_;
	const {
		id,
		user,
		description,
		status,
		createdAt,
		amount,
		totalFees,
		netAmount,
	} = data;
	const { username, displayName, avatar } = user;

	const isSubscriptionUpdate = status === "Successful";
	const isPaymentFailed = status === "Failed";

	return (
		<FansSheet2
			width={width}
			height={height}
			sheetStyle={{
				padding: {
					xs: { t: 29, b: 29.4, x: 17 },
					lg: { t: 43.5, b: 28.9, x: 34 },
				},
			}}
			{...props_}
		>
			<FansView alignItems="center" flexDirection="row">
				<UserAvatar size="46px" image={avatar} />
				<FansGap width={13} />
				<FansView gap={4} grow>
					<FansText fontFamily="inter-semibold" fontSize={19}>
						{displayName}
					</FansText>
					<FansText color="grey-70" fontSize={16}>
						@{username}
					</FansText>
				</FansView>
				<FansView alignItems="end" gap={6}>
					<FansView
						height={20}
						backgroundColor={
							isSubscriptionUpdate
								? {
										color: "green-4d",
										opacity: 10,
								  }
								: "red-fd"
						}
						borderRadius="full"
						justifyContent="center"
						padding={{ x: 7 }}
					>
						<FansText
							color={isSubscriptionUpdate ? "green-4d" : "red-eb"}
							fontFamily="inter-semibold"
							fontSize={14}
						>
							${netAmount}
						</FansText>
					</FansView>
					<FansText
						color="grey-70"
						fontSize={14}
						textTransform="uppercase"
					>
						{DateTime.fromISO(createdAt).toFormat("MMM d, h:m a")}
					</FansText>
				</FansView>
			</FansView>
			<FansGap height={{ xs: 39.9, lg: 41.9 }} />
			<FansView>
				{[
					{ label: "Transaction ID", text: id },
					{ label: "Transaction", text: description },
					{ label: "Price", text: `$${amount}` },
					// { label: "VAT tax", text: "-$10" },
					{ label: "Fee", text: `$${totalFees}` },
					{ label: "Net cost", text: `$${netAmount}` },
					{ label: "Status", text: status },
				].map((item) => {
					const { label, text } = item;
					return (
						<Fragment>
							<FansHorizontalDivider />
							<FansView
								height={50}
								alignItems="center"
								flexDirection="row"
							>
								<FansView flex="1">
									<FansText
										fontFamily="inter-semibold"
										fontSize={17}
									>
										{label}
									</FansText>
								</FansView>
								<FansView flex="1">
									{label !== "Status" ? (
										<FansText color="grey-70" fontSize={16}>
											{text}
										</FansText>
									) : (
										<FansView
											alignSelf="start"
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
												width={20}
												height={20}
												alignItems="center"
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
												textTransform="uppercase"
											>
												{text}
											</FansText>
										</FansView>
									)}
								</FansView>
							</FansView>
						</Fragment>
					);
				})}
			</FansView>
			<FansGap height={{ xs: 29.4, lg: 28.9 }} />
			<FansButton3
				title="Refund"
				buttonStyle={{ backgroundColor: "white" }}
				textStyle1={{ color: "purple-a8" }}
				onPress={() => handleSubmit(String(id))}
			/>
		</FansSheet2>
	);
};

export default TransactionSheet;
