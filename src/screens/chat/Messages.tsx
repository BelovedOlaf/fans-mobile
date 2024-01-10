import Animated, { PinwheelIn, PinwheelOut } from "react-native-reanimated";

import {
	DocEdit1Svg,
	DocEditSvg,
	OutlinedPinSvg,
	PlusSvg,
	SearchSvg,
	SelectSvg,
	SortAscSvg,
	SortDescSvg,
	Trash2Svg,
} from "@assets/svgs/common";
import { Inbox } from "@components/chat";
import AddNoteDialog from "@components/chat/common/dialogs/AddNoteDialog_";
import EditOrderOptionDialog from "@components/chat/common/dialogs/EditOrderOptionDialog";
import {
	FansChips,
	FansDivider,
	FansGap,
	FansImage,
	FansScreen2,
	FansSvg,
	FansText,
	FansTextInput2,
	FansView,
} from "@components/controls";
import { FilterDuringDialog } from "@components/dialogs/chat";
import MoneyRangeDlg from "@components/dialogs/chat/FilterTips";
import { useAppContext } from "@context/useAppContext";
import tw from "@lib/tailwind";
import { chatInboxAtom, chatUnreadCountSelector } from "@state/chat";
import { UserRoleTypes } from "@usertypes/commonEnums";
import { Colors } from "@usertypes/enums";
import {
	ChatNativeStackParams,
	ChatNativeStackScreenProps,
	ChatNativeStackScreens,
} from "@usertypes/navigations";
import { ColorStyle1 } from "@usertypes/styles";
import { IConversationMeta } from "@usertypes/types";
import { useRouter } from "expo-router";
import React, { Fragment, useEffect, useState } from "react";
import { ScrollView, TouchableOpacity, View } from "react-native";
import { SwipeListView } from "react-native-swipe-list-view";
import { useRecoilValue } from "recoil";
import { useFeatureGates } from "@state/featureGates";

interface MessagesScreenContentProps {
	navigationRef: {
		navigate<RouteName extends keyof ChatNativeStackParams>(
			...args: RouteName extends unknown
				? undefined extends ChatNativeStackParams[RouteName]
					?
							| [screen: RouteName]
							| [
									screen: RouteName,
									params: ChatNativeStackParams[RouteName],
							  ]
					: [
							screen: RouteName,
							params: ChatNativeStackParams[RouteName],
					  ]
				: never
		): void;
	};
}

export const MessagesScreenContent = (props: MessagesScreenContentProps) => {
	const chatUnreadCount = useRecoilValue(chatUnreadCountSelector);
	const featureGates = useFeatureGates();

	const groups = [
		{ text: "All" },
		{
			badge: chatUnreadCount > 0 ? chatUnreadCount : undefined,
			text: "Unread",
		},
		// { text: "Priority" },
	];

	const { state } = useAppContext();
	const { userInfo } = state.user;
	const { type } = userInfo;

	const notes: Array<{ isBorder: boolean; name: string; text: string }> = [];

	const [note, setNote] = useState({ name: "", text: "" });
	const [strFilterMode, setFilterMode] = React.useState("");
	const [openChatFilterDialog, setOpenChatFilterDialog] =
		React.useState(false);
	const [openEditOrderOptionDialog, setOpenEditOrderOptionDialog] =
		React.useState(false);
	const [orderBy, setOrderBy] = useState<"asc" | "desc">("asc");
	const [searchKey, setSearchKey] = React.useState("");
	const [openFilterDlg, setOpenFilterDlg] = React.useState(false);
	const inbox = useRecoilValue(chatInboxAtom);
	const router = useRouter();

	const [isSearch, setSearchYN] = React.useState(false);
	const [isShareNoteDialogOpened, openShareNoteDialogYN] =
		React.useState(false);
	const [selected, setSelected] = React.useState(0);

	const handlePressSendMessage = () =>
		props.navigationRef.navigate("SendMessage");

	const handleEditOrderOption = (note: string) => {};

	const handleCloseSearchDuringDialog = () => {
		setFilterMode("");
	};

	const handleItemDelete = (id: string) => {
		// setItems((items) => items.filter((item) => item.id !== id));
	};

	const handleItemNotification = (id: string) => {
		// setItems((items) => {
		// 	const item = items.find((item) => item.id === id);
		// 	if (item) item.isNotification = !item.isNotification;
		// 	return items;
		// });
	};

	const handleItemPin = (id: string) => {
		// setItems((items) => {
		// 	const item = items.find((value) => value.id === id);
		// 	if (item) {
		// 		item.isPinned = !item.isPinned;
		// 		return [...items];
		// 	}
		// 	return items;
		// });
	};

	const handlePress = (meta: IConversationMeta) => {
		props.navigationRef.navigate("Chat", { id: meta.id });
		router.push(`/chat/${meta.id}`);
	};

	const handlePressAddNote = () => {
		props.navigationRef.navigate("ShareNote");
	};

	const handlePressCancel = () => {
		setSearchYN(false);
	};

	const handlePressSearch = () => {
		setSearchYN(true);
	};

	const handlePressSelect = () => {
		props.navigationRef.navigate("MessageSelect");
	};

	const handlePressSort = () => {
		setOrderBy(orderBy === "asc" ? "desc" : "asc");
	};

	const handlePressUser = (index: number) => {
		setNote(notes[index]);
		openShareNoteDialogYN(true);
	};

	return (
		<FansScreen2 contentStyle={tw.style("lg:px-[37px]")}>
			{tw.prefixMatch("md") && (
				<Fragment>
					<FansGap height={65} />
					<FansView
						alignItems="center"
						flexDirection="row"
						justifyContent="between"
					>
						<FansText fontFamily="inter-bold" fontSize={23}>
							Messages
						</FansText>
						<FansView
							touchableOpacityProps={{
								onPress: handlePressSendMessage,
							}}
						>
							<FansSvg
								width={18.14}
								height={17.8}
								svg={DocEdit1Svg}
								color1="purple-a8"
							/>
						</FansView>
					</FansView>
					<FansGap height={64} />
				</Fragment>
			)}
			<FansView height={42} alignItems="center" flexDirection="row">
				{isSearch ? (
					<Fragment>
						<FansTextInput2
							iconNode={
								<FansSvg
									width={13.14}
									height={13.26}
									svg={SearchSvg}
								/>
							}
							placeholder="Search"
							placeholderTextColor={tw.color(ColorStyle1.Black)}
						/>
						<FansGap width={12} />
						<TouchableOpacity onPress={handlePressCancel}>
							<FansText fontSize={19}>Cancel</FansText>
						</TouchableOpacity>
					</Fragment>
				) : (
					<Fragment>
						<FansView
							touchableOpacityProps={{ onPress: handlePressSort }}
							flexDirection="row"
						>
							<FansSvg
								width={16.76}
								height={14.05}
								svg={
									orderBy === "asc" ? SortAscSvg : SortDescSvg
								}
								color={tw.color(ColorStyle1.GreyDark)}
							/>
							<FansGap width={13.2} />
							<Animated.View
								entering={PinwheelIn}
								exiting={PinwheelOut}
							>
								<FansText
									color="grey-70"
									fontFamily="inter-medium"
									fontSize={17}
								>
									{orderBy === "asc"
										? "Newest first"
										: "Oldest first"}
								</FansText>
							</Animated.View>
						</FansView>
						<FansGap grow />
						{featureGates.has("2023_11-chat-selections") && (
							<>
								<TouchableOpacity onPress={handlePressSelect}>
									<FansView
										width={34}
										height={34}
										alignItems="center"
										backgroundColor="grey-f0"
										borderRadius="full"
										justifyContent="center"
									>
										<FansSvg
											width={15.65}
											height={15.65}
											svg={SelectSvg}
										/>
									</FansView>
								</TouchableOpacity>
								<FansGap width={7} />
							</>
						)}
						<TouchableOpacity onPress={handlePressSearch}>
							<FansView
								width={34}
								height={34}
								alignItems="center"
								backgroundColor="grey-f0"
								borderRadius="full"
								justifyContent="center"
							>
								<FansSvg
									width={13.71}
									height={13.84}
									svg={SearchSvg}
								/>
							</FansView>
						</TouchableOpacity>
					</Fragment>
				)}
			</FansView>
			<FansGap height={15.1} />
			<FansView>
				<FansChips
					data={groups}
					value={selected}
					onChangeValue={setSelected}
				/>
			</FansView>
			<FansGap height={15.1} />
			<ScrollView
				style={tw.style("max-h-[145px]", "-mx-[23px]", "px-[23px]")}
				horizontal
				showsHorizontalScrollIndicator={false}
			>
				{type === UserRoleTypes.Creator && (
					<View
						style={tw.style(
							"w-[95px]",
							"relative",
							"flex gap-[5px] items-center",
							"mt-[35px]",
						)}
					>
						<View
							style={tw.style(
								"border-[2px] border-transparent",
								"p-[2px]",
							)}
						>
							<FansImage
								style={tw.style(
									"w-[68px] h-[68px] rounded-full",
								)}
								source={require("@assets/images/default-avatar.png")}
							/>
						</View>
						<View style={tw.style("absolute top-[25.5px]")}>
							<TouchableOpacity onPress={handlePressAddNote}>
								<View
									style={tw.style(
										"w-[25px] h-[25px]",
										"bg-white/75",
										"flex justify-center items-center",
										"rounded-full",
									)}
								>
									<PlusSvg size={14} />
								</View>
							</TouchableOpacity>
						</View>
						<FansText fontSize={15}>Add note</FansText>
					</View>
				)}
				{notes.map((item, index) => {
					const { isBorder, name, text } = item;

					return (
						<Fragment key={index}>
							<TouchableOpacity
								onPress={() => handlePressUser(index)}
							>
								<View
									style={tw.style(
										"w-[94.8px]",
										"flex gap-[5px] items-center",
										"mt-[35px]",
										"relative",
									)}
								>
									<View
										style={tw.style(
											"border-[2px] rounded-full border-dashed",
											isBorder
												? "border-fans-purple"
												: "border-transparent",
											"p-[2px]",
										)}
									>
										<FansImage
											style={tw.style(
												"w-[68px] h-[68px] rounded-full",
											)}
											source={require("@assets/images/default-avatar.png")}
										/>
									</View>
									<View
										style={tw.style(
											"absolute top-[-35px]",
											"bg-white",
											"px-[6.4px] py-[6.2px]",
											"rounded-[15px]",
											"shadow-black/13 shadow-offset-[0px]/[3px] shadow-radius-[3px]",
										)}
									>
										<FansText
											fontSize={13}
											lineHeight={15}
											numberOfLines={3}
											textAlign="center"
										>
											{text}
										</FansText>
									</View>
									<FansText fontSize={15}>{name}</FansText>
								</View>
							</TouchableOpacity>
							<FansGap width={8.1} />
						</Fragment>
					);
				})}
			</ScrollView>
			<FansGap height={21} />
			<FansView style={tw.style("flex gap-[20px]")} grow>
				<SwipeListView
					data={inbox.sorted}
					keyExtractor={(item) => item.id}
					renderItem={({ item }) => {
						return (
							<View style={tw`bg-white`}>
								<FansGap height={20} />
								<FansDivider />
								<FansGap height={20} />
								<TouchableOpacity
									onPress={() => handlePress(item)}
								>
									<Inbox data={item} />
								</TouchableOpacity>
							</View>
						);
					}}
					renderHiddenItem={(rowData, rowMap) => {
						const { index, item } = rowData;

						return (
							<FansView
								justifyContent="end"
								style={tw.style(
									"flex-row gap-[5px] items-center",
									"pt-[50px]",
								)}
							>
								<TouchableOpacity
									onPress={() => {
										rowMap[index + 1].closeRow();
										handleItemPin(item.id);
									}}
								>
									<FansView
										width={34}
										height={34}
										alignItems="center"
										backgroundColor="grey-f0"
										borderRadius="full"
										justifyContent="center"
									>
										<FansView width={14.7} height={14.7}>
											<OutlinedPinSvg />
										</FansView>
									</FansView>
								</TouchableOpacity>
								{/* <TouchableOpacity
									onPress={() => {
										rowMap[index + 1].closeRow();
										handleItemNotification(item.id);
									}}
								>
									<FansView
										width={34}
										height={34}
										alignItems="center"
										backgroundColor="grey-f0"
										borderRadius="full"
										justifyContent="center"
									>
										{item.isNotification ? (
											<FansView
												width={15.55}
												height={15.56}
											>
												<UnNotificationSvg />
											</FansView>
										) : (
											<NotificationSvg size={16} />
										)}
									</FansView>
								</TouchableOpacity> */}
								<TouchableOpacity
									onPress={() => {
										rowMap[index + 1].closeRow();
										handleItemDelete(item.id);
									}}
								>
									<FansView
										width={34}
										height={34}
										alignItems="center"
										backgroundColor="grey-f0"
										borderRadius="full"
										justifyContent="center"
									>
										<FansView width={11.87} height={14.76}>
											<Trash2Svg
												color={tw.color("fans-red")}
											/>
										</FansView>
									</FansView>
								</TouchableOpacity>
							</FansView>
						);
					}}
					rightOpenValue={-120}
				/>
			</FansView>

			<AddNoteDialog
				data={note}
				open={isShareNoteDialogOpened}
				onClose={() => openShareNoteDialogYN(false)}
				onSubmit={() => {}}
			/>
			<EditOrderOptionDialog
				open={openEditOrderOptionDialog}
				onClose={() => setOpenEditOrderOptionDialog(false)}
				onSubmit={handleEditOrderOption}
			/>
			<FilterDuringDialog
				open={strFilterMode === "During"}
				onClose={handleCloseSearchDuringDialog}
				onSubmit={() => {}}
			/>
			<MoneyRangeDlg
				open={strFilterMode === "Tips"}
				onClose={() => setSearchYN(false)}
				onSubmit={() => {}}
			/>
		</FansScreen2>
	);
};

const MessagesScreen = (props: ChatNativeStackScreenProps<"Messages">) => {
	const { navigation } = props;

	useEffect(() => {
		navigation.setOptions({
			headerRight: () => (
				<FansView style={tw.style("mr-[20px]")}>
					<TouchableOpacity onPress={handlePressMessage}>
						<DocEditSvg size={18} color={Colors.Purple} />
					</TouchableOpacity>
				</FansView>
			),
		});
	}, [navigation]);

	const handleNavigate = (screen: ChatNativeStackScreens) => {
		navigation.navigate(screen);
	};

	const handlePressMessage = () => handleNavigate("SendMessage");

	return <MessagesScreenContent navigationRef={navigation} />;
};

export default MessagesScreen;
