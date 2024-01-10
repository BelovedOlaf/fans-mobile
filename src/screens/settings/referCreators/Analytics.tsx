import {
	CalendarSvg,
	ChevronDownSvg,
	ChevronLeft1Svg,
	SearchSvg,
} from "@assets/svgs/common";
import {
	FansChips3,
	FansGap,
	FansHorizontalDivider,
	FansScreen3,
	FansSvg,
	FansText,
	FansTextInput,
	FansView,
} from "@components/controls";
import { BanModal } from "@components/modals";
import { Transaction } from "@components/payment";
import tw from "@lib/tailwind";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
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
import { useNavigation, useRouter } from "expo-router";
import React, { Fragment, useEffect, useState } from "react";
import { ReferralProgramNativeStackParams } from ".";
import {
	CreatorReferralCreator,
	CreatorReferralLinkPerformance,
	CreatorReferralTransaction,
	ITimeline,
} from "@usertypes/types";
import { DateTime } from "luxon";
import { LineChart } from "@components/screens/settings/analytics";
import CreatorItem from "./item/CreatorItem";
import LinkItem from "./item/LinkItem";
import { FilterDuringDialog } from "@components/dialogs/chat";
import {
	getCreatorReferralCreators,
	getCreatorReferralLinkPerformance,
	getCreatorReferralTotalEarning,
	getCreatorReferralTransactions,
} from "@helper/endpoints/profile/apis";

Chart.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
);

interface LinkPerformanceProps {
	onBan: () => void;
}

const LinkPerformance = (props: LinkPerformanceProps) => {
	const items = [{ text: "Highest earnings" }, { text: "Highest CTR" }];
	const [selectedIndex, selectIndex] = useState(0);
	const handleSelect = (index: number) => {
		selectIndex(index);
	};

	const { onBan: handlePressBan } = props;
	const [selected, setItem] = useState(0);
	const [refreshKey, setRefreshKey] = useState(0);

	const handlePressExpand = (index: number, state: boolean) => {
		if (state) setItem(index);
		else setItem(-1);
	};

	const [links, setLinks] = useState<CreatorReferralLinkPerformance[]>([]);
	const [filteredLinks, setFilteredLinks] = useState<
		CreatorReferralLinkPerformance[]
	>([]);
	const [searchQuery, setSearchQuery] = useState("");

	const onChangeSearch = (query: string) => {
		setSearchQuery(query);
	};

	useEffect(() => {
		setFilteredLinks(
			links.filter((el) => (el.code ?? "").indexOf(searchQuery) >= 0),
		);
	}, [searchQuery, links, refreshKey]);

	const startDate = DateTime.local();
	const endDate = DateTime.local();
	useEffect(() => {
		const fetchLinkPerformance = async () => {
			const resp = await getCreatorReferralLinkPerformance({
				from: startDate.toISO()!,
				to: endDate.toISO()!,
				sort: selectedIndex == 0 ? "highest_earnings" : "highest_ctr",
			});
			if (resp.ok) {
				setLinks(resp.data.creatorReferrals);
			}
		};

		fetchLinkPerformance();
	}, [selectedIndex]);

	const [isOpenCalendar, setIsOpenCalendar] = useState(false);
	const handleOpenCalendar = () => {
		setIsOpenCalendar(true);
	};
	const handleCloseCalendar = () => {
		setIsOpenCalendar(false);
	};

	return (
		<FansView>
			<FansText fontSize={23}>Link Performance</FansText>

			<FansTextInput
				icon={SearchSvg}
				placeholder="Search"
				style={tw.style("mt-[21px]")}
				value={searchQuery}
				onChangeText={onChangeSearch}
			/>

			<FansGap height={15.3} />

			<FansView flexDirection="row" alignItems="center">
				<FansChips3
					data={items}
					value={selectedIndex}
					viewStyle={{
						style: tw.style(
							"mx-[-17px] px-[17px] py-2 grow-0 shrink-0",
						),
					}}
					chipsStyle={{ backgroundColor: "green-4d" }}
					onChangeValue={handleSelect}
					scrollEventThrottle={16}
				/>

				<FansView grow />

				<FansView
					width={26.5}
					height={28.49}
					touchableOpacityProps={{ onPress: handleOpenCalendar }}
					padding={5}
				>
					<CalendarSvg width={16.5} height={18.49} />
				</FansView>
			</FansView>

			<FansGap height={15.3} />

			{filteredLinks.map((item, index) => {
				const { id } = item;
				return (
					<Fragment key={id}>
						{index !== 0 && (
							<FansHorizontalDivider
								height={2}
								style={{ marginVertical: 16 }}
							/>
						)}
						<LinkItem
							data={item}
							onDeleteLink={() => {
								setRefreshKey(refreshKey + 1);
							}}
						/>
					</Fragment>
				);
			})}

			<FilterDuringDialog
				open={isOpenCalendar}
				onClose={handleCloseCalendar}
				onSubmit={() => {}}
			/>
		</FansView>
	);
};

const Transactions = () => {
	const [transactions, setTransactions] = useState<
		CreatorReferralTransaction[]
	>([]);

	const [searchQuery, setSearchQuery] = useState("");
	const onChangeSearch = (query: string) => {
		setSearchQuery(query);
	};
	const [page, setPage] = useState(1);

	useEffect(() => {
		const fetchLinkPerformance = async () => {
			const resp = await getCreatorReferralTransactions({
				query: searchQuery,
				page: page,
				size: 10,
			});
			if (resp.ok) {
				setTransactions(resp.data.transactions);
			}
		};

		fetchLinkPerformance();
	}, [searchQuery, page]);

	return (
		<FansView>
			<FansText fontSize={23}>Transactions</FansText>
			<FansTextInput
				icon={SearchSvg}
				placeholder="Search"
				style={tw.style("mt-[21px]")}
			/>

			<FansGap height={15.3} />
			<FansView style={tw.style("mt-[33px]")}>
				{transactions.map((item, index) => (
					<Transaction key={index} />
				))}
			</FansView>
		</FansView>
	);
};

const Earnings = () => {
	const items = [{ text: "Highest earnings" }, { text: "Highest MMR" }];
	const [selectedIndex, selectIndex] = useState(0);
	const handleSelect = (index: number) => {
		selectIndex(index);
	};

	const [timeline, setTimeline] = useState<ITimeline[]>([]);
	const [period, setPeriod] = useState("today");
	const [duration, setDuration] = useState("Today");

	const [earnings, setEarnings] = useState(0);

	const [creators, setCreators] = useState<CreatorReferralCreator[]>([]);
	const [filteredCreators, setFilteredCreators] = useState<
		CreatorReferralCreator[]
	>([]);
	const [searchQuery, setSearchQuery] = useState("");

	const onChangeSearch = (query: string) => {
		setSearchQuery(query);
	};

	useEffect(() => {
		setFilteredCreators(
			creators.filter(
				(el) =>
					(el.referent?.displayName ?? "").indexOf(searchQuery) >= 0,
			),
		);
	}, [searchQuery, creators]);

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
			});
			if (resp.ok) {
				setPeriod(resp.data.period);
				setEarnings(resp.data.totalEarning);

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
				sort: selectedIndex == 0 ? "highest_earnings" : "highest_mmr",
			});
			if (resp.ok) {
				setCreators(resp.data.creators);
			}
		};

		fetchEarningsAnalytics();
		fetchCreators();
	}, [duration, selectedIndex]);

	return (
		<FansView>
			<FansText fontFamily="inter-medium" fontSize={23}>
				Earnings
			</FansText>
			<FansText color="green-4d" fontFamily="inter-medium" fontSize={34}>
				${earnings.toLocaleString()}
			</FansText>

			<FansGap height={28} />

			<LineChart
				timeline={timeline}
				duration={duration}
				setDuration={setDuration}
				period={period}
			/>

			<FansGap height={41} />

			<FansHorizontalDivider />

			<FansGap height={36} />

			<FansView flexDirection="row" alignItems="center">
				<FansText fontFamily="inter-medium" fontSize={19}>
					Referred creators
				</FansText>
				<FansView grow />
				<ChevronDownSvg width={14} height={7} rotation={180} />
			</FansView>

			<FansGap height={22} />

			<FansTextInput
				icon={SearchSvg}
				placeholder="Search"
				value={searchQuery}
				onChangeText={onChangeSearch}
			/>

			<FansGap height={15.3} />

			<FansChips3
				data={items}
				value={selectedIndex}
				viewStyle={{
					style: tw.style(
						"mx-[-17px] px-[17px] py-2 grow-0 shrink-0",
					),
				}}
				chipsStyle={{ backgroundColor: "green-4d" }}
				onChangeValue={handleSelect}
				scrollEventThrottle={16}
			/>

			<FansGap height={15.3} />

			{filteredCreators.map((item, index) => {
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
	);
};

const ReferCreatorsAnalyticsScreen = () => {
	const router = useRouter();
	const navigation =
		useNavigation<
			NativeStackNavigationProp<ReferralProgramNativeStackParams>
		>();

	navigation.setOptions({
		header: (props) => {
			const { navigation, options } = props;
			const { title } = options;

			const handlePress = () => {
				if (navigation.canGoBack()) {
					navigation.goBack();
				} else {
					if (router.canGoBack()) {
						router.back();
					} else {
						router.replace({
							pathname: "posts",
							params: { screen: "Home" },
						});
					}
				}
			};

			return (
				<FansView
					height={{ xs: 64, lg: 103 }}
					alignItems="center"
					border={{ b: 1 }}
					borderColor="grey-f0"
					flexDirection="row"
					padding={{ x: 24 }}
					backgroundColor="white"
				>
					<FansView
						touchableOpacityProps={{ onPress: handlePress }}
						width={40}
						height={40}
						padding={{ x: 4, y: 12 }}
					>
						<FansSvg width={8} height={16} svg={ChevronLeft1Svg} />
					</FansView>
					<FansGap viewStyle={{ flex: "1" }} />
					<FansText fontFamily="inter-bold" fontSize={19}>
						{title}
					</FansText>
					<FansGap viewStyle={{ flex: "1" }} />
					<FansGap width={40} />
				</FansView>
			);
		},
	});

	const items = [
		{ text: "Earnings" },
		{ text: "Link performance" },
		{ text: "Transactions" },
	];

	const [isBanModalVisible, setBanModalVisible] = useState(false);
	const [selectedIndex, selectIndex] = useState(0);

	const handleBan = () => setBanModalVisible(true);

	const handleCloseBanModal = () => setBanModalVisible(true);

	const handleSelect = (index: number) => {
		selectIndex(index);
	};

	return (
		<FansScreen3 contentStyle1={{ maxWidth: { lg: 670 } }}>
			<FansChips3
				data={items}
				value={selectedIndex}
				viewStyle={{
					style: tw.style(
						"mx-[-17px] px-[17px] py-2 grow-0 shrink-0",
					),
				}}
				chipsStyle={{ backgroundColor: "green-4d" }}
				onChangeValue={handleSelect}
				scrollEventThrottle={16}
			/>
			<FansGap height={30} />
			{selectedIndex === 0 && <Earnings />}
			{selectedIndex === 1 && <LinkPerformance onBan={handleBan} />}
			{selectedIndex === 2 && <Transactions />}
			<BanModal
				visible={isBanModalVisible}
				onClose={handleCloseBanModal}
				onSubmit={() => {}}
			/>{" "}
		</FansScreen3>
	);
};

export default ReferCreatorsAnalyticsScreen;
