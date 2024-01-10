import { View } from "react-native";
import React, { Fragment, useEffect, useMemo, useState } from "react";
import { IconButton } from "react-native-paper";
import tw from "@lib/tailwind";

import BottomSheetWrapper from "@components/common/bottomSheetWrapper";
import {
	FansGap,
	FansHorizontalDivider,
	FansSvg,
	FansText,
	FansView,
} from "@components/controls";
import { ChevronLeft1Svg, CloseSvg } from "@assets/svgs/common";
import { useAppContext, CommonActionType } from "@context/useAppContext";
import { LineChart } from "@components/screens/settings/analytics";
import {
	CreatorReferral,
	CreatorReferralCreator,
	ITimeline,
} from "@usertypes/types";
import { DateTime } from "luxon";
import CreatorItem from "../item/CreatorItem";
import {
	getCreatorReferralCreators,
	getCreatorReferralTotalEarning,
} from "@helper/endpoints/profile/apis";

const ViewAnalyticsDialog = (props: { referral: CreatorReferral }) => {
	const { state, dispatch } = useAppContext();
	const { openViewAnalyticsModal } = state.common;
	const [timeline, setTimeline] = useState<ITimeline[]>([]);
	const [period, setPeriod] = useState("today");
	const [duration, setDuration] = useState("Today");
	const [visibleCreators, setVisibleCreators] = useState(false);

	const [earnings, setEarnings] = useState(0);
	const [
		prevPeriodEarningsPercentageDifference,
		setPrevPeriodEarningsPercentageDifference,
	] = useState(0);
	const [numberOfCreators, setNumberOfCreators] = useState(0);

	const [link, setLink] = useState(
		`fyp.fans/?r=${props.referral.code ?? ""}`,
	);
	useEffect(() => {
		setLink(`fyp.fans/?r=${props.referral.code ?? ""}`);
	}, [props, props.referral, props.referral.code]);

	const open = useMemo(
		() => (openViewAnalyticsModal ? true : false),
		[openViewAnalyticsModal],
	);

	const onClose = () => {
		dispatch.setCommon({
			type: CommonActionType.toggleViewAnalyticsModal,
			data: false,
		});
	};
	const handleViewCreators = () => {
		setVisibleCreators(true);
	};
	const handleHideCreators = () => {
		setVisibleCreators(false);
	};

	const [creators, setCreators] = useState<CreatorReferralCreator[]>([]);

	useEffect(() => {
		const fetchEarningsAnalytics = async () => {
			let startDate = DateTime.local();
			let endDate = DateTime.local();

			switch (duration) {
				case "Today":
					startDate = DateTime.local();
					endDate = DateTime.local();
					break;
				case "1W":
					startDate = DateTime.local().minus({ weeks: 1 });
					endDate = DateTime.local();
					break;
				case "1M":
					startDate = DateTime.local().minus({ months: 1 });
					endDate = DateTime.local();
					break;
				case "3M":
					startDate = DateTime.local().minus({ months: 3 });
					endDate = DateTime.local();
					break;
				case "6M":
					startDate = DateTime.local().minus({ months: 6 });
					endDate = DateTime.local();
					break;
				case "1Y":
					startDate = DateTime.local().minus({ years: 1 });
					endDate = DateTime.local();
					break;
				case "All":
					startDate = DateTime.fromISO("2023-01-01");
					endDate = DateTime.local();
					break;
			}

			const resp = await getCreatorReferralTotalEarning({
				from: startDate.toISO()!,
				to: endDate.toISO()!,
				code: props.referral.code,
			});
			if (resp.ok) {
				setEarnings(resp.data.totalEarning);
				setPrevPeriodEarningsPercentageDifference(resp.data.percentage);
				setNumberOfCreators(resp.data.creatorCount);

				const timeline = new Map<string, ITimeline>();
				resp.data.transactions.forEach((element) => {
					timeline.set(element.updatedAt, {
						date: element.updatedAt,
						earnings: element.amount,
					});
				});
				setTimeline(Array.from(timeline.values()));
			}
		};

		const fetchCreators = async () => {
			let startDate = DateTime.local();
			let endDate = DateTime.local();

			switch (duration) {
				case "Today":
					startDate = DateTime.local();
					endDate = DateTime.local();
					break;
				case "1W":
					startDate = DateTime.local().minus({ weeks: 1 });
					endDate = DateTime.local();
					break;
				case "1M":
					startDate = DateTime.local().minus({ months: 1 });
					endDate = DateTime.local();
					break;
				case "3M":
					startDate = DateTime.local().minus({ months: 3 });
					endDate = DateTime.local();
					break;
				case "6M":
					startDate = DateTime.local().minus({ months: 6 });
					endDate = DateTime.local();
					break;
				case "1Y":
					startDate = DateTime.local().minus({ years: 1 });
					endDate = DateTime.local();
					break;
				case "All":
					startDate = DateTime.fromISO("2023-01-01");
					endDate = DateTime.local();
					break;
			}

			const resp = await getCreatorReferralCreators({
				from: startDate.toISO()!,
				to: endDate.toISO()!,
				code: props.referral.code,
			});
			if (resp.ok) {
				setCreators(resp.data.creators);
			}
		};

		fetchEarningsAnalytics();
		fetchCreators();
	}, [duration]);

	return (
		<BottomSheetWrapper
			open={open}
			onClose={onClose}
			dialogWrapperStyle="md:max-w-[740px]"
			topLineStyle="md:hidden"
		>
			<View style={tw.style("pb-3 md:pb-0 px-[19px] md:px-[32px]")}>
				<View
					style={tw.style(
						"relative md:pb-[34px] md:pt-[15px] items-center",
					)}
				>
					<View
						style={tw.style(
							"hidden absolute right-[0px] top-[6px] md:flex w-7.5 h-7.5",
						)}
					>
						<IconButton
							icon={() => <CloseSvg size={13.2} color="#fff" />}
							containerColor="rgba(0,0,0,0.3)"
							style={tw.style("m-0 w-7.5 h-7.5 ")}
							onPress={onClose}
						/>
					</View>

					{visibleCreators && (
						<FansView
							touchableOpacityProps={{
								onPress: handleHideCreators,
							}}
							width={32}
							height={24}
							padding={{ x: 12, y: 4 }}
							style={{
								position: "absolute",
								left: 0,
							}}
						>
							<FansSvg
								width={8}
								height={16}
								svg={ChevronLeft1Svg}
							/>
						</FansView>
					)}

					<FansText fontFamily="inter-bold" fontSize={19}>
						{visibleCreators ? "Referred creators" : link}
					</FansText>

					<FansGap height={38} />

					{!visibleCreators ? (
						<FansView width="full">
							<FansText fontFamily="inter-medium" fontSize={23}>
								Total earnings
							</FansText>
							<FansText
								color="green-4d"
								fontFamily="inter-medium"
								fontSize={34}
							>
								${earnings.toLocaleString()}
							</FansText>

							<FansGap height={26} />

							<FansText fontFamily="inter-medium" fontSize={23}>
								Affiliate percentage
							</FansText>
							<FansText
								color="green-4d"
								fontFamily="inter-medium"
								fontSize={34}
							>
								{prevPeriodEarningsPercentageDifference.toLocaleString()}
								%
							</FansText>

							<FansGap height={26} />

							<FansView
								grow
								flexDirection="row"
								alignItems="center"
								justifyContent="between"
							>
								<FansText
									fontFamily="inter-medium"
									fontSize={23}
								>
									Total creators
								</FansText>
								<FansText
									color="green-4d"
									fontFamily="inter-medium"
									fontSize={17}
									onPress={handleViewCreators}
								>
									View creators
								</FansText>
							</FansView>
							<FansText
								color="green-4d"
								fontFamily="inter-medium"
								fontSize={34}
							>
								{numberOfCreators}
							</FansText>

							<FansGap height={44.5} />

							<LineChart
								timeline={timeline}
								duration={duration}
								setDuration={setDuration}
								period={period}
							/>
						</FansView>
					) : (
						<FansView width="full">
							{creators.map((item, index) => {
								return (
									<Fragment key={index}>
										{index !== 0 && (
											<FansHorizontalDivider
												height={2}
												style={{ marginVertical: 16 }}
											/>
										)}
										<CreatorItem data={item} />
									</Fragment>
								);
							})}
						</FansView>
					)}
				</View>
			</View>
		</BottomSheetWrapper>
	);
};

export default ViewAnalyticsDialog;
