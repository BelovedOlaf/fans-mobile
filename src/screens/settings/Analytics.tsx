import { DateTime } from "luxon";
import Toast from "react-native-toast-message";
import { LevelDevotedImage } from "@assets/svgs";
import {
	ArrowDownSvg,
	ArrowUpSvg,
	Block1Svg,
	BlockSvg,
	Calendar1Svg,
	Chat1Svg,
	Check1Svg,
	ChevronDown3Svg,
	ChevronRight2Svg,
	ChevronUp1Svg,
	Close0Svg,
	Cursor1Svg,
	Diamond1Svg,
	Dollar1Svg,
	DotsVerticalSvg,
	EarningSvg,
	Eye2Svg,
	Heart1Svg,
	Income1Svg,
	Mail2Svg,
	Reply1Svg,
	Search1Svg,
	User1Svg,
} from "@assets/svgs/common";
import UserAvatar from "@components/avatar/UserAvatar";
import {
	FansButton3,
	FansChips3,
	FansChips4,
	FansGap,
	FansHorizontalDivider,
	FansImage2,
	FansScreen3,
	FansSvg,
	FansSwitch1,
	FansText,
	FansTextInput5,
	FansView,
} from "@components/controls";
import { BanModal } from "@components/modals";
import { LineChart } from "@components/screens/settings/analytics";
import {
	PostSheet,
	TransactionSheet,
} from "@components/sheet/settings/analytics";
import {
	IPost,
	ISubscriber,
	ITransactionCreator,
} from "@helper/CommonAPISchemas";
import { getPostAnalytics } from "@helper/endpoints";
import tw from "@lib/tailwind";
import { PostType } from "@usertypes/commonEnums";
import { Colors } from "@usertypes/enums";
import { emptyProfileData } from "@constants/common";
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
import React, {
	Fragment,
	MutableRefObject,
	useCallback,
	useEffect,
	useRef,
	useState,
} from "react";
import { Line } from "react-chartjs-2";
import { SettingsNativeStackScreenProps } from "@usertypes/navigations";
import { useRouter } from "expo-router";
import { Animated, NativeScrollEvent, ScrollView } from "react-native";
import {
	PanGestureHandler,
	PanGestureHandlerGestureEvent,
} from "react-native-gesture-handler";
import {
	useAnimatedGestureHandler,
	useSharedValue,
} from "react-native-reanimated";
import { useAppContext } from "@context/useAppContext";
import {
	getEarnings,
	getSubscribers,
	getTransactions,
	refund,
} from "@helper/endpoints/creator/apis";

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

const PromotionalCampaigns = (props: PromotionalCampaignsProps) => {
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

	return (
		<FansView>
			<FansText fontFamily="inter-semibold" fontSize={23}>
				Promotional campaigns
			</FansText>
			<FansGap height={33.5} />
			{items.map((item, index) => {
				const { url, time, revenue, share, profile, cursor } = item;

				const [isCollapsed, setCollapsed] = useState(index !== 2);
				const handlePressCollapse = () => setCollapsed(!isCollapsed);

				const [strDuration, setDuration] = useState("today");

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

const Subscribers = () => {
	const [numSelected, setSelected] = useState(0);
	const [initialSubscribers, setInitialSubscribers] = useState<ISubscriber[]>(
		[],
	);
	const [subscribers, setSubscribers] = useState<ISubscriber[]>([]);
	const [search, setSearch] = useState("");

	useEffect(() => {
		const fetchSubscribers = async () => {
			const resp = await getSubscribers();
			if (resp.ok) {
				const subscribers = resp.data.subscribers.sort(
					(a, b) => b.earnings - a.earnings,
				);
				setInitialSubscribers(subscribers);
				setSubscribers(subscribers);
			}
		};
		fetchSubscribers();
	}, []);

	useEffect(() => {
		const sortedSubscribers = [...subscribers].sort((a, b) => {
			if (numSelected === 0) {
				return b.earnings - a.earnings;
			} else if (numSelected === 1) {
				return b.level - a.level;
			} else if (numSelected === 2) {
				return b.period - a.period;
			}
			return 0;
		});

		setSubscribers(sortedSubscribers);
	}, [numSelected]);

	useEffect(() => {
		setSubscribers(
			initialSubscribers.filter((subscriber) =>
				subscriber.username
					.toLowerCase()
					.includes(search.toLowerCase()),
			),
		);
	}, [search]);

	return (
		<FansView>
			<FansText fontFamily="inter-semibold" fontSize={23}>
				Subscribers
			</FansText>
			<FansGap height={13.3} />
			<FansTextInput5
				iconNode={
					<FansSvg width={13.14} height={13.26} svg={Search1Svg} />
				}
				textInputStyle={{ placeholder: "Search" }}
				onChangeText={setSearch}
				value={search}
			/>
			<FansGap height={15.1} />
			<FansChips4
				data={[
					{
						icon1: {
							width: 6.79,
							height: 13.96,
							svg: Dollar1Svg,
						},
						gap: 9,
						text: "Most money",
					},
					{
						icon1: {
							width: 12.79,
							height: 13.04,
							svg: Diamond1Svg,
						},
						gap: 9.1,
						text: "Highest level",
					},
					{
						icon1: {
							width: 11.54,
							height: 12.93,
							svg: Calendar1Svg,
						},
						gap: 10.2,
						text: "Most time",
					},
				]}
				value={numSelected}
				viewStyle1={{ margin: { x: -17 }, padding: { x: 17 } }}
				chipsStyle={{ backgroundColor: "green-4d" }}
				onChangeValue={setSelected}
			/>
			<FansGap height={15.4} />
			{subscribers.map((item, index) => {
				const { avatar, username, level, periodLabel, earnings } = item;

				return (
					<Fragment key={index}>
						{index !== 0 && <FansHorizontalDivider />}
						<FansView
							height={75}
							alignItems="center"
							flexDirection="row"
						>
							<UserAvatar size="34px" image={avatar} />
							<FansGap width={13} />
							<FansView gap={2} grow>
								<FansText
									fontFamily="inter-semibold"
									fontSize={16}
								>
									{username}
								</FansText>
								<FansView
									alignItems="center"
									flexDirection="row"
									gap={6.6}
								>
									<FansSvg
										width={15.37}
										height={15.43}
										svg={LevelDevotedImage}
									/>
									<FansText color="grey-70" fontSize={16}>
										Level {level} • {periodLabel}
									</FansText>
								</FansView>
							</FansView>
							<FansView
								backgroundColor={{
									color: "green-4d",
									opacity: 10,
								}}
								borderRadius="full"
								padding={{ x: 8, y: 4 }}
							>
								<FansText
									color="green-4d"
									fontFamily="inter-semibold"
									fontSize={14}
								>
									${earnings.toLocaleString()}
								</FansText>
							</FansView>
							<FansGap width={7} />
							<FansView
								width={34}
								height={34}
								alignItems="center"
								backgroundColor="grey-f0"
								borderRadius="full"
								justifyContent="center"
							>
								<FansSvg
									width={18.45}
									height={14.77}
									svg={Mail2Svg}
								/>
							</FansView>
						</FansView>
					</Fragment>
				);
			})}
		</FansView>
	);
};

const Transactions = () => {
	const [isTransactionSheetVisible, setTransactionSheetVisible] =
		useState(false);
	const [dataTransaction, setTransaction] = useState<ITransactionCreator>();
	const handleCloseTransactionSheet = () => setTransactionSheetVisible(false);

	const [initialTransactions, setInitialTransactions] = useState<
		ITransactionCreator[]
	>([]);
	const [transactions, setTransactions] = useState<ITransactionCreator[]>([]);
	const [search, setSearch] = useState("");

	const onRefund = async (id: string) => {
		const resp = await refund({
			id: id,
		});

		if (resp.ok) {
			Toast.show({
				type: "success",
				text1: "Refund successful",
				text2: "The transaction has been refunded",
			});
		} else {
			Toast.show({
				type: "error",
				text1: "Refund failed",
				text2: resp.data.message,
			});
		}
	};

	useEffect(() => {
		const fetchTransactions = async () => {
			const resp = await getTransactions();
			if (resp.ok) {
				const transactions = resp.data.transactions;
				setInitialTransactions(transactions);
				setTransactions(transactions);
			}
		};
		fetchTransactions();
	}, []);

	useEffect(() => {
		setTransactions(
			initialTransactions.filter(
				(transaction) =>
					transaction.user.username
						.toLowerCase()
						.includes(search.toLowerCase()) ||
					transaction.description
						.toLowerCase()
						.includes(search.toLowerCase()),
			),
		);
	}, [search]);

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
				onChangeText={setSearch}
				value={search}
			/>
			<FansGap height={19.5} />
			<FansView>
				{transactions.map((item, index) => {
					const { user, description, status, createdAt, amount } =
						item;
					const { username, avatar } = user;

					const isSubscriptionUpdate = status === "Successful";
					const isPaymentFailed = status === "Cancelled";

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
								<UserAvatar size="34px" image={avatar} />
								<FansGap width={13} />
								<FansView gap={3} grow>
									<FansText
										fontFamily="inter-semibold"
										fontSize={16}
									>
										{username}
									</FansText>
									<FansText color="grey-70" fontSize={15}>
										{description}
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
											${amount}
										</FansText>
									</FansView>
									<FansText
										color="grey-70"
										fontSize={14}
										textTransform="uppercase"
									>
										{DateTime.fromISO(createdAt).toFormat(
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
			<TransactionSheet
				visible={isTransactionSheetVisible}
				data={dataTransaction}
				onClose={handleCloseTransactionSheet}
				onSubmit={onRefund}
			/>
		</FansView>
	);
};

const Posts = () => {
	const [page, setPage] = useState(1);
	const [size, setSize] = useState(10);
	const [total, setTotal] = useState(0);
	const [posts, setPosts] = useState<IPost[]>([]);
	const fetchPosts = useCallback(async () => {
		const resp = await getPostAnalytics({
			page,
			size,
		});
		if (resp.ok) {
			setPosts(resp.data.posts);
			setPage(resp.data.page);
			setSize(resp.data.size);
			setTotal(resp.data.total);
		}
		setPosts([
			{
				id: "1",
				profileId: "0",
				profile: emptyProfileData,
				title: "Loving my new outfit! You can see later.",
				type: PostType.Photo,
				caption: "",
				thumb: {
					id: "0",
					url: "",
				},
				medias: [],
				isArchived: false,
				isHidden: false,
				commentCount: 1750,
				likeCount: 590,
				createdAt: "2023-09-05T23:39:10.318Z",
				updatedAt: "",
				bookmarkCount: 17,
				taggedPeoples: [],
				isPaidPost: false,
				isPaidOut: false,
				isPinned: false,
			},
			{
				id: "2",
				profileId: "0",
				profile: emptyProfileData,
				title: "Loving my new outfit! You can see later.",
				type: PostType.Photo,
				caption: "",
				thumb: {
					id: "0",
					url: "",
				},
				medias: [],
				isArchived: false,
				isHidden: false,
				commentCount: 1750,
				likeCount: 590,
				createdAt: "2023-09-05T23:39:10.318Z",
				updatedAt: "",
				bookmarkCount: 17,
				taggedPeoples: [],
				isPaidPost: false,
				isPaidOut: false,
				isPinned: false,
			},
			{
				id: "3",
				profileId: "0",
				profile: emptyProfileData,
				title: "Loving my new outfit! You can see later.",
				type: PostType.Photo,
				caption: "",
				thumb: {
					id: "0",
					url: "",
				},
				medias: [],
				isArchived: false,
				isHidden: false,
				commentCount: 1750,
				likeCount: 590,
				createdAt: "2023-09-05T23:39:10.318Z",
				updatedAt: "",
				bookmarkCount: 17,
				taggedPeoples: [],
				isPaidPost: false,
				isPaidOut: false,
				isPinned: false,
			},
			{
				id: "4",
				profileId: "0",
				profile: emptyProfileData,
				title: "Loving my new outfit! You can see later.",
				type: PostType.Photo,
				caption: "",
				thumb: {
					id: "0",
					url: "",
				},
				medias: [],
				isArchived: false,
				isHidden: false,
				commentCount: 1750,
				likeCount: 590,
				createdAt: "2023-09-05T23:39:10.318Z",
				updatedAt: "",
				bookmarkCount: 17,
				taggedPeoples: [],
				isPaidPost: false,
				isPaidOut: false,
				isPinned: false,
			},
			{
				id: "5",
				profileId: "0",
				profile: emptyProfileData,
				title: "Loving my new outfit! You can see later.",
				type: PostType.Photo,
				caption: "",
				thumb: {
					id: "0",
					url: "",
				},
				medias: [],
				isArchived: false,
				isHidden: false,
				commentCount: 1750,
				likeCount: 590,
				createdAt: "2023-09-05T23:39:10.318Z",
				updatedAt: "",
				bookmarkCount: 17,
				taggedPeoples: [],
				isPaidPost: false,
				isPaidOut: false,
				isPinned: false,
			},
		]);
	}, [page, size]);

	useEffect(() => {
		fetchPosts();
	}, []);

	const [isPostSheetVisible, setPostSheetVisible] = useState(false);
	const [dataPost, setPost] = useState<IPost>();
	const handleClosePostSheet = () => setPostSheetVisible(false);

	const defaultAvatar = require("@assets/images/default-avatar.png");

	return (
		<FansView gap={23}>
			<FansText fontFamily="inter-semibold" fontSize={23}>
				Posts
			</FansText>
			<FansView gap={9}>
				{posts.map((value, index) => {
					const {
						id,
						title,
						commentCount,
						likeCount,
						createdAt,
						bookmarkCount,
					} = value;

					const handlePress = () => {
						setPost(value), setPostSheetVisible(true);
					};

					return (
						<FansView
							key={id}
							height={138}
							touchableOpacityProps={{ onPress: handlePress }}
							borderColor="grey-f0"
							borderRadius={15}
							justifyContent="center"
							padding={{ x: 17 }}
						>
							<FansView
								alignItems="center"
								flexDirection="row"
								gap={15.3}
							>
								<FansImage2
									width={54.5}
									height={54.5}
									source={defaultAvatar}
									viewStyle={{ borderRadius: 7 }}
									imageStyle={{ resizeMode: "cover" }}
								/>
								<FansView width={0} gap={4} grow>
									<FansText
										fontFamily="inter-medium"
										fontSize={16}
										numberOfLines={1}
									>
										{title}
									</FansText>
									<FansText
										color="grey-70"
										fontSize={14}
										textTransform="uppercase"
									>
										{DateTime.fromISO(createdAt).toFormat(
											"MMM d, h:mm a",
										)}
									</FansText>
								</FansView>
							</FansView>
							<FansGap height={14} />
							<FansHorizontalDivider />
							<FansGap height={15.5} />
							<FansView alignItems="center" flexDirection="row">
								<FansView
									alignItems="center"
									flexDirection="row"
									gap={3.2}
								>
									<FansSvg
										width={18.52}
										height={12.97}
										svg={Eye2Svg}
										color1="green-4d"
									/>
									<FansText
										fontFamily="inter-semibold"
										fontSize={17}
									>
										{commentCount.toLocaleString()}
									</FansText>
								</FansView>
								<FansGap width={16.6} />
								<FansView
									alignItems="center"
									flexDirection="row"
									gap={6.8}
								>
									<FansSvg
										width={14.68}
										height={12.97}
										svg={Heart1Svg}
										color1="green-4d"
									/>
									<FansText
										fontFamily="inter-semibold"
										fontSize={17}
									>
										{likeCount.toLocaleString()}
									</FansText>
								</FansView>
								<FansGap width={17.8} />
								<FansView
									alignItems="center"
									flexDirection="row"
									gap={4.9}
								>
									<FansSvg
										width={15.3}
										height={15.3}
										svg={Chat1Svg}
										color1="green-4d"
									/>
									<FansText
										fontFamily="inter-semibold"
										fontSize={17}
									>
										{commentCount.toLocaleString()}
									</FansText>
								</FansView>
								<FansGap width={16.6} />
								<FansView
									alignItems="center"
									flexDirection="row"
									gap={4.3}
								>
									<FansSvg
										width={16.16}
										height={11.25}
										svg={Reply1Svg}
										color1="green-4d"
									/>
									<FansText
										fontFamily="inter-semibold"
										fontSize={17}
									>
										{bookmarkCount.toLocaleString()}
									</FansText>
								</FansView>
							</FansView>
						</FansView>
					);
				})}
			</FansView>
			<PostSheet
				visible={isPostSheetVisible}
				data={dataPost}
				onClose={handleClosePostSheet}
				onSubmit={() => {}}
			/>
		</FansView>
	);
};

const AnalyticsScreen = (
	props: SettingsNativeStackScreenProps<"Analytics">,
) => {
	const { navigation } = props;
	const { state } = useAppContext();
	const { userInfo } = state.user;

	const items = [
		{ text: "Earnings" },
		// { text: "Promotional campaigns" },
		{ text: "Subscribers" },
		{ text: "Transactions" },
		// { text: "Posts" }, // TODO: uncomment when API is ready
	];

	const router = useRouter();

	const [isBanModalVisible, setBanModalVisible] = useState(false);
	const [selected, setSelected] = useState(0);

	const handleBan = () => setBanModalVisible(true);

	const handleCloseBanModal = () => setBanModalVisible(false);

	const handlePressBalance = () =>
		router.push({
			pathname: "profile",
			params: {
				screen: "Edit",
			},
		});

	const handleSelect = (index: number) => {
		setSelected(index);
	};

	const Earnings = () => {
		interface ITimeline {
			date: string;
			earnings: number;
		}

		const [period, setPeriod] = useState("today");
		const [duration, setDuration] = useState("Today");
		const [earnings, setEarnings] = useState(0);
		const [prevPeriodLabel, setPrevPeriodLabel] = useState("");
		const [prevPeriodEarnings, setPrevPeriodEarnings] = useState(0);
		const [prevPeriodEarningsDifference, setPrevPeriodEarningsDifference] =
			useState(0);
		const [
			prevPeriodEarningsPercentageDifference,
			setPrevPeriodEarningsPercentageDifference,
		] = useState(0);
		const [timeline, setTimeline] = useState<ITimeline[]>([]);
		const [isShowProjectedEarnings, setShowProjectedEarnings] =
			useState(true);

		useEffect(() => {
			const fetchEarningsAnalytics = async () => {
				let startDate: DateTime | undefined;
				let endDate: DateTime | undefined;

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
						break;
				}

				const resp = await getEarnings({
					startDate: startDate?.toISO() ?? undefined,
					endDate: endDate?.toISO() ?? undefined,
				});
				if (resp.ok) {
					setPeriod(resp.data.period);
					setEarnings(resp.data.earnings);
					setPrevPeriodLabel(resp.data.prevPeriodLabel);
					setPrevPeriodEarnings(resp.data.prevPeriodEarnings);
					setPrevPeriodEarningsDifference(
						resp.data.prevPeriodEarningsDifference,
					);
					setPrevPeriodEarningsPercentageDifference(
						resp.data.prevPeriodEarningsPercentageDifference,
					);
					setTimeline(resp.data.timeline);
				}
			};

			fetchEarningsAnalytics();
		}, [duration]);

		return (
			<FansView>
				<FansView flexDirection="row" justifyContent="between">
					<FansView gap={9}>
						<FansText fontFamily="inter-semibold" fontSize={23}>
							Earnings
						</FansText>
						<FansText fontFamily="inter-semibold" fontSize={23}>
							${earnings.toLocaleString()}
						</FansText>
					</FansView>
					{/* <FansButton3
						height={34}
						title="Make more"
						buttonStyle={{
							backgroundColor: "white",
							borderColor: "green-4d",
							gap: 4.6,
						}}
						textStyle1={{ color: "green-4d", fontSize: 17 }}
						icon={
							<FansSvg
								width={15.95}
								height={15.94}
								svg={EarningSvg}
								color1="green-4d"
							/>
						}
					/> */}
				</FansView>
				<FansGap height={11} />
				<FansView alignItems="center" flexDirection="row">
					{prevPeriodEarningsDifference !== 0 && (
						<FansSvg
							width={11.02}
							height={12.68}
							svg={
								prevPeriodEarningsDifference > 0
									? ArrowUpSvg
									: ArrowDownSvg
							}
							color1={
								prevPeriodEarningsDifference > 0
									? "green-4d"
									: "red-eb"
							}
						/>
					)}

					{prevPeriodEarningsDifference !== 0 && (
						<FansGap width={8} />
					)}
					<FansText
						color={
							prevPeriodEarningsDifference === 0
								? "grey-70"
								: prevPeriodEarningsDifference > 0
								? "green-4d"
								: "red-eb"
						}
						fontSize={16}
					>
						${prevPeriodEarningsDifference.toLocaleString()} (
						{prevPeriodEarningsDifference > 0 ? "+" : ""}
						{prevPeriodEarningsPercentageDifference.toLocaleString()}
						% )
					</FansText>
					<FansGap width={7} />
					<FansText color="grey-70" fontSize={14}>
						• {prevPeriodLabel}
					</FansText>
				</FansView>
				<FansGap height={21.8} />
				<LineChart
					timeline={timeline}
					duration={duration}
					setDuration={setDuration}
					period={period}
				/>
				<FansGap height={31} />
				<FansView
					alignItems="center"
					flexDirection="row"
					touchableOpacityProps={{ onPress: handlePressBalance }}
				>
					<FansText fontSize={18}>Balance</FansText>
					<FansGap viewStyle={{ grow: true }} />
					<FansText fontSize={18}>${userInfo.payoutBalance}</FansText>
					<FansGap width={35.8} />
					<FansSvg
						width={6.14}
						height={12.28}
						svg={ChevronRight2Svg}
						color1="grey-70"
					/>
				</FansView>
				<FansGap height={21} />
				<FansHorizontalDivider />
				<FansGap height={20} />
				<FansSwitch1
					value={isShowProjectedEarnings}
					switchStyle={{ backgroundColor: "green-4d" }}
					label="Show projected earnings"
					onValueChange={setShowProjectedEarnings}
				/>
				<FansGap height={30} />
				{/* <FansView
					height={180}
					alignItems="center"
					borderColor="grey-f0"
					borderRadius={15}
					flexDirection="row"
					gap={14.8}
					padding={{ l: 13.5, r: 10 }}
				>
					<FansSvg
						width={80.69}
						height={74.64}
						svg={Income1Svg}
						color1="green-4d"
					/>
					<FansView width={0} grow>
						<FansText fontFamily="inter-semibold" fontSize={19}>
							Boost your income
						</FansText>
						<FansGap height={10} />
						<FansText fontSize={16}>
							Let our network of marketers help sky rocket your
							earnings!
						</FansText>
						<FansGap height={17} />
						<FansButton3
							width={188}
							height={42}
							buttonStyle={{
								backgroundColor: "green-4d",
								borderColor: "green-4d",
							}}
							title="Get started"
						/>
					</FansView>
				</FansView> */}
			</FansView>
		);
	};

	const [completeScrollBarWidth, setCompleteScrollBarWidth] = useState(1);
	const [visibleScrollBarWidth, setVisibleScrollBarWidth] = useState(0);

	const scrollIndicator = useRef(new Animated.Value(0)).current;

	const scrollIndicatorSize =
		completeScrollBarWidth > visibleScrollBarWidth
			? (visibleScrollBarWidth * visibleScrollBarWidth) /
			  completeScrollBarWidth
			: visibleScrollBarWidth;

	const difference =
		visibleScrollBarWidth > scrollIndicatorSize
			? visibleScrollBarWidth - scrollIndicatorSize
			: 1;

	const scrollIndicatorPosition = Animated.multiply(
		scrollIndicator,
		visibleScrollBarWidth / completeScrollBarWidth,
	).interpolate({
		inputRange: [0, difference],
		outputRange: [0, difference],
		extrapolate: "clamp",
	});

	const x = useSharedValue(0);
	const panGestureEvent = useAnimatedGestureHandler<
		PanGestureHandlerGestureEvent,
		ContextType
	>({
		onStart: (_, context) => {
			// context.x = x.value;
			// console.log(`yunny: onStart`);
		},
		onActive: (event, context) => {
			context.x = event.translationX + x.value;
			scrollRef.current?.scrollTo({
				x: Math.min(
					Math.max(0, context.x),
					completeScrollBarWidth - visibleScrollBarWidth,
				),
				animated: false,
			});
		},
		onEnd: () => {
			// x.value = withSpring(0);
		},
	});
	const scrollRef =
		useRef<ScrollView | null>() as MutableRefObject<ScrollView | null>;

	return (
		<FansScreen3 contentStyle1={{ maxWidth: { lg: 670 } }}>
			<FansChips3
				data={items}
				value={selected}
				viewStyle={{
					style: tw.style(
						"mx-[-17px] px-[17px] py-2 grow-0 shrink-0",
					),
				}}
				chipsStyle={{ backgroundColor: "green-4d" }}
				onChangeValue={handleSelect}
				onContentSizeChange={(width, _) => {
					setCompleteScrollBarWidth(width);
				}}
				onLayout={({
					nativeEvent: {
						layout: { width },
					},
				}) => {
					setVisibleScrollBarWidth(width);
				}}
				onScroll={Animated.event(
					[
						{
							nativeEvent: {
								contentOffset: { x: scrollIndicator },
							},
						},
					],
					{
						useNativeDriver: true,
						listener: (event) => {
							x.value = (
								event.nativeEvent as NativeScrollEvent
							).contentOffset.x;
						},
					},
				)}
				scrollEventThrottle={16}
				scrollRef={scrollRef}
			/>
			<PanGestureHandler onGestureEvent={panGestureEvent}>
				<Animated.View
					style={{
						height: 8,
						borderRadius: 8,
						backgroundColor: "#4DCC36",
						width: scrollIndicatorSize,
						transform: [{ translateX: scrollIndicatorPosition }],
					}}
				/>
			</PanGestureHandler>

			<FansGap height={30} />
			{(() => {
				switch (selected) {
					case 0: {
						return <Earnings />;
					}
				}
				return <></>;
			})()}
			{/* {selected === 1 && <PromotionalCampaigns onBan={handleBan} />} */}
			{selected === 1 && <Subscribers />}
			{selected === 2 && <Transactions />}
			{selected === 3 && <Posts />}
			<BanModal
				visible={isBanModalVisible}
				onClose={handleCloseBanModal}
				onSubmit={() => {}}
			/>
			<FansGap height={20} />
		</FansScreen3>
	);
};

export default AnalyticsScreen;
