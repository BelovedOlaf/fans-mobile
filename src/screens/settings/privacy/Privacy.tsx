import {
	Block3Svg,
	ChevronLeft1Svg,
	Eye4Svg,
	Search1Svg,
	Trash2Svg,
	Warning1Svg,
} from "@assets/svgs/common";
import {
	FansDivider,
	FansGap,
	FansHorizontalDivider,
	FansImage2,
	FansScreen2,
	FansSvg,
	FansSwitch1,
	FansTabs,
	FansText,
	FansTextInput5,
	FansVerticalDivider,
	FansView,
} from "@components/controls";
import tw from "@lib/tailwind";
import React, { FC, Fragment, MutableRefObject, useRef, useState } from "react";
import { Animated, Text, View } from "react-native";
import { Switch } from "react-native-paper";
import { Swipeable } from "react-native-gesture-handler";
import { useRouter } from "expo-router";
import { PrivacyNativeStackScreenProps } from ".";

type ItemProps = {
	text: string;
	value: boolean;
	onValueChange: (value: boolean) => void;
};

const Item: React.FC<ItemProps> = (props) => (
	<View style={tw.style("flex-row justify-between items-center", "my-[5px]")}>
		<Text style={tw.style("text-[18px]")}>{props.text}</Text>
		<Switch
			value={props.value}
			color="#A854F5"
			onValueChange={props.onValueChange}
		/>
	</View>
);

interface UserItem {
	data: { name: string };
	onDelete: () => void;
}

const UserItem: FC<UserItem> = (props) => {
	const { data, onDelete: handleDelete } = props;
	const { name } = data;

	const swipeableRef =
		useRef<Swipeable | null>() as MutableRefObject<Swipeable | null>;

	const onPressBlock = () => {
		swipeableRef.current?.close();
	};
	const onPressReport = () => {
		swipeableRef.current?.close();
	};
	const onPressDelete = () => {
		swipeableRef.current?.close();
		handleDelete();
	};

	const renderRightActions = () => {
		return (
			<FansView alignItems="center" flexDirection="row">
				<FansGap width={16} />
				<FansVerticalDivider height={34} />
				<FansGap width={16} />
				<FansView
					width={34}
					height={34}
					alignItems="center"
					backgroundColor="grey-f0"
					borderRadius="full"
					justifyContent="center"
					touchableOpacityProps={{ onPress: onPressBlock }}
				>
					<FansSvg width={16} height={16} svg={Block3Svg} />
				</FansView>
				<FansGap width={7} />
				<FansView
					width={34}
					height={34}
					alignItems="center"
					backgroundColor="grey-f0"
					borderRadius="full"
					justifyContent="center"
					touchableOpacityProps={{ onPress: onPressReport }}
				>
					<FansSvg
						width={16.53}
						height={14.93}
						svg={Warning1Svg}
						color1="red"
					/>
				</FansView>
			</FansView>
		);
	};

	return (
		<Swipeable ref={swipeableRef} renderRightActions={renderRightActions}>
			<FansView
				height={68}
				alignItems="center"
				flexDirection="row"
				background="white"
			>
				<FansImage2
					width={46}
					height={46}
					viewStyle={{ borderRadius: "full" }}
					source={require("@assets/images/default-avatar.png")}
				/>
				<FansGap width={13} />
				<FansView grow>
					<FansText fontFamily="inter-bold" fontSize={19}>
						{name}
					</FansText>
				</FansView>
				<FansView
					width={34}
					height={34}
					touchableOpacityProps={{ onPress: onPressDelete }}
					alignItems="center"
					backgroundColor="grey-f0"
					borderRadius="full"
					justifyContent="center"
				>
					<FansSvg width={11.87} height={14.76} svg={Trash2Svg} />
				</FansView>
			</FansView>
		</Swipeable>
	);
};

const enum Tab {
	LimitedUsers,
	BlockedUsers,
}

const LimitedUsersTab = (props: {
	limitedUsers: Array<{ id: string; name: string }>;
	trigDeleteLimitedUser: (id: string) => void;
}) => {
	const { limitedUsers, trigDeleteLimitedUser } = props;

	return (
		<Fragment>
			<FansText color="grey-70" fontSize={16} letterSpacing={-0.25}>
				Limited fans can still view your profile but cannot message,
				comment, or interact with you
			</FansText>
			<FansGap height={13.5} />
			<FansView>
				{limitedUsers.map((item, index) => {
					const { id } = item;
					const handleDelete = () => trigDeleteLimitedUser(id);

					return (
						<Fragment key={id}>
							{index !== 0 && (
								<FansHorizontalDivider height={2} />
							)}
							<UserItem data={item} onDelete={handleDelete} />
						</Fragment>
					);
				})}
			</FansView>
		</Fragment>
	);
};

const BlockedUsersTab = (props: {
	blockedUsers: Array<{ id: string; name: string }>;
	trigDeleteBlockedUser: (id: string) => void;
}) => {
	const { blockedUsers, trigDeleteBlockedUser } = props;

	return (
		<Fragment>
			<FansText color="grey-70" fontSize={16} letterSpacing={-0.25}>
				Blocked users won’t be able to access, view your profile, or
				interact with any of your content
			</FansText>
			<FansGap height={13.5} />
			<FansView>
				{blockedUsers.map((item, index) => {
					const { id } = item;
					const handleDelete = () => trigDeleteBlockedUser(id);

					return (
						<Fragment key={id}>
							{index !== 0 && (
								<FansHorizontalDivider height={2} />
							)}
							<UserItem data={item} onDelete={handleDelete} />
						</Fragment>
					);
				})}
			</FansView>
		</Fragment>
	);
};

const SearchResultSection = (props: {
	users: Array<{ id: string; name: string }>;
	trigDeleteSearchedUser: (id: string) => void;
}) => {
	const { users, trigDeleteSearchedUser } = props;

	return (
		<Fragment>
			<FansView>
				{users.map((item, index) => {
					const { id } = item;
					const handleDelete = () => trigDeleteSearchedUser(id);

					return (
						<Fragment key={id}>
							{index !== 0 && (
								<FansHorizontalDivider height={2} />
							)}
							<UserItem data={item} onDelete={handleDelete} />
						</Fragment>
					);
				})}
			</FansView>
		</Fragment>
	);
};

const PrivacyScreen = (props: PrivacyNativeStackScreenProps<"Privacy">) => {
	const [isSearching, setIsSearching] = useState(false);

	const [isHideBookmarks, setHideBookmarks] = useState(true);
	const [isHideLikes, setHideLikes] = useState(true);
	const [isHideComments, setHideComments] = useState(true);
	const [isWatermark, setWatermark] = useState(true);

	const topSectionHeight = useRef(new Animated.Value(340)).current;
	const cancelSearchButtonWidth = useRef(new Animated.Value(0)).current;
	const bottomSectionTabHeight = useRef(new Animated.Value(51)).current;

	const animateShowSearchUser = () => {
		Animated.timing(topSectionHeight, {
			toValue: 0,
			duration: 300,
			useNativeDriver: false,
		}).start();
		Animated.timing(cancelSearchButtonWidth, {
			toValue: 64,
			duration: 300,
			useNativeDriver: false,
		}).start();
		Animated.timing(bottomSectionTabHeight, {
			toValue: 0,
			duration: 300,
			useNativeDriver: false,
		}).start();

		setIsSearching(true);
	};
	const animateHideSearchUser = () => {
		Animated.timing(topSectionHeight, {
			toValue: 340,
			duration: 300,
			useNativeDriver: false,
		}).start();
		Animated.timing(cancelSearchButtonWidth, {
			toValue: 0,
			duration: 300,
			useNativeDriver: false,
		}).start();
		Animated.timing(bottomSectionTabHeight, {
			toValue: 51,
			duration: 300,
			useNativeDriver: false,
		}).start();

		setIsSearching(false);
	};

	const [numTabs, setTabs] = useState(0);

	const [limitedUsers, setLimitedUsers] = useState([
		{ id: "1", name: "Ruth Buckleton" },
		{ id: "2", name: "Matt Wilson" },
		{ id: "3", name: "Alexa Blue" },
		{ id: "4", name: "Louie Maxwell" },
		{ id: "5", name: "Matt Wilson" },
	]);
	const trigDeleteLimitedUser = (id: string) => {
		setLimitedUsers((prev) => prev.filter((value) => value.id !== id));
	};

	const [blockedUsers, setBlockedUsers] = useState([
		{ id: "1", name: "Ruth Buckleton" },
		{ id: "2", name: "Matt Wilson" },
		{ id: "3", name: "Alexa Blue" },
		{ id: "4", name: "Louie Maxwell" },
		{ id: "5", name: "Matt Wilson" },
	]);
	const trigDeleteBlockedUser = (id: string) => {
		setBlockedUsers((prev) => prev.filter((value) => value.id !== id));
	};

	const [searchResult, setSearchResult] = useState([
		{ id: "1", avatar: "", name: "Alexa Blue", isLimited: true },
		{ id: "2", avatar: "", name: "Kate Jane", isBlocked: true },
		{ id: "3", avatar: "", name: "Louie Maxwell", isLimited: true },
		{ id: "4", avatar: "", name: "Matt Wilson", isBlocked: true },
		{ id: "5", avatar: "", name: "Kate Jane", isBlocked: true },
		{ id: "6", avatar: "", name: "Louie Maxwell", isLimited: true },
		{ id: "7", avatar: "", name: "Louie Maxwell", isLimited: true },
		{ id: "8", avatar: "", name: "Louie Maxwell", isLimited: true },
	]);
	const trigDeleteSearchedUser = (id: string) => {
		setSearchResult((prev) => prev.filter((value) => value.id !== id));
	};

	const { navigation } = props;
	const router = useRouter();

	const handlePress = () => {
		if (isSearching) {
			animateHideSearchUser();
		} else if (navigation.canGoBack()) {
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
		<FansView>
			<FansView
				height={{ xs: 64, lg: 103 }}
				alignItems="center"
				backgroundColor="white"
				border={{ b: 1 }}
				borderColor="grey-f0"
				flexDirection="row"
				padding={{ x: 24 }}
			>
				<FansView
					touchableOpacityProps={{ onPress: handlePress }}
					width={40}
					height={40}
					padding={{ x: 4, y: 12 }}
				>
					<FansSvg
						width={8}
						height={16}
						svg={ChevronLeft1Svg}
						color1="grey-70"
					/>
				</FansView>
				<FansGap viewStyle={{ flex: "1" }} />
				<FansText fontFamily="inter-bold" fontSize={19}>
					Privacy & Safety
				</FansText>
				<FansGap viewStyle={{ flex: "1" }} />
				<FansGap width={40} />
			</FansView>

			<FansScreen2 contentStyle={{ maxWidth: 670 }}>
				<Animated.View
					style={{ height: topSectionHeight, overflow: "hidden" }}
				>
					<FansView gap={6}>
						<FansSwitch1
							height={52}
							value={isHideBookmarks}
							label="Hide bookmarks"
							onValueChange={setHideBookmarks}
						/>
						<FansDivider />
						<FansSwitch1
							height={52}
							value={isHideLikes}
							label="Hide likes"
							onValueChange={setHideLikes}
						/>
						<FansDivider />
						<FansSwitch1
							height={52}
							value={isHideComments}
							label="Hide comments"
							onValueChange={setHideComments}
						/>
						<FansDivider />
						<FansSwitch1
							height={52}
							value={isWatermark}
							label="Watermark"
							onValueChange={setWatermark}
						/>
					</FansView>
					<FansGap height={29} />
					<FansView>
						<FansText fontFamily="inter-semibold" fontSize={19}>
							Safety
						</FansText>
						<FansGap height={10} />
						<FansText color="grey-70" fontSize={16}>
							Block or limit someone
						</FansText>
					</FansView>
				</Animated.View>
				<FansGap height={10} />
				<FansView alignItems="center" flexDirection="row" gap={12}>
					<FansTextInput5
						viewStyle={{ grow: true }}
						iconNode={
							<FansSvg
								width={13.14}
								height={13.26}
								svg={Search1Svg}
							/>
						}
						textInputStyle={{
							placeholder: "Search user",
							onFocus: animateShowSearchUser,
						}}
					/>
					<Animated.View
						style={{
							width: cancelSearchButtonWidth,
							overflow: "hidden",
						}}
					>
						<FansView
							width={64}
							touchableOpacityProps={{
								onPress: animateHideSearchUser,
							}}
						>
							<FansText fontSize={19}>Cancel</FansText>
						</FansView>
					</Animated.View>
				</FansView>
				<FansGap height={10} />
				<FansView>
					<Animated.View
						style={{
							height: bottomSectionTabHeight,
							overflow: "hidden",
						}}
					>
						<FansTabs
							data={[
								{
									gap: 6,
									icon: (
										<FansSvg
											width={18.83}
											height={13.19}
											svg={Eye4Svg}
											color1={
												numTabs === 0
													? "black"
													: "grey-70"
											}
										/>
									),
									text: "Limited users",
								},
								{
									gap: 7,
									icon: (
										<FansSvg
											width={16}
											height={16}
											svg={Block3Svg}
											color1={
												numTabs === 1
													? "black"
													: "grey-70"
											}
										/>
									),
									text: "Blocked users",
								},
							]}
							value={numTabs}
							onChangeValue={setTabs}
						/>
					</Animated.View>

					<FansGap height={24.5} />

					{!isSearching && numTabs === Tab.LimitedUsers && (
						<LimitedUsersTab
							limitedUsers={limitedUsers}
							trigDeleteLimitedUser={trigDeleteLimitedUser}
						/>
					)}

					{!isSearching && numTabs === Tab.BlockedUsers && (
						<BlockedUsersTab
							blockedUsers={blockedUsers}
							trigDeleteBlockedUser={trigDeleteBlockedUser}
						/>
					)}

					{isSearching && (
						<SearchResultSection
							users={searchResult}
							trigDeleteSearchedUser={trigDeleteSearchedUser}
						/>
					)}
				</FansView>
				<FansGap height={20} />
			</FansScreen2>
		</FansView>
	);
};

export default PrivacyScreen;
