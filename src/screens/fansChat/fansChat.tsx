import tw from "@lib/tailwind";
import React, { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import Swipeable from "react-native-gesture-handler/Swipeable";

import { msg } from "@assets/dummyData/chat";
import {
	ImageSvg,
	OutlinedPinSvg,
	SearchSvg,
	StarCheckSvg,
	ThreeDotsMenuSvg,
} from "@assets/svgs/common";
import OnlineAvatar from "@components/avatar/OnlineAvatar";
import { ChatLayout } from "@components/chat/layout";
import { SearchForm } from "@components/search";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { MessagesStackParamList } from "@usertypes/route";
import { firstParam } from "@utils/common";
import {
	Stack,
	useLocalSearchParams,
	useNavigation,
	useRouter,
} from "expo-router";

const FansChatScreen = () => {
	const { id } = useLocalSearchParams();
	const userId = firstParam(id);
	const [openAddDialog, setOpenAddDialog] = useState(false);
	const [openUserDlg, setOpenUserDlg] = useState(false);
	const [isSearchMode, setIsSearchMode] = useState(false);
	const [searchKey, setSearchKey] = useState("");
	const router = useRouter();
	const handleBackScreen = () => {
		router.back();
	};

	const navigation: NativeStackNavigationProp<MessagesStackParamList> =
		useNavigation();

	const rightSwipeActions = () => {
		return (
			<View
				style={{
					justifyContent: "center",
					alignItems: "flex-end",
				}}
			>
				<Text style={tw.style("text-[14px] text-[#707070]")}>
					11 : 40 AM
				</Text>
			</View>
		);
	};

	if (!userId) return null;

	return (
		<>
			<Stack.Screen
				options={{
					headerTitleAlign: "left",
					headerTitle: (props) => (
						<View
							{...props}
							style={tw.style(
								"flex-row justify-start items-center flex-1",
							)}
						>
							<OnlineAvatar />
							<Text style={tw.style("px-[12px]")}>Jane Love</Text>
							<StarCheckSvg width={14} height={14} />
						</View>
					),
					headerRight: () => (
						<View style={tw.style("flex-row gap-1 justify-end")}>
							<TouchableOpacity
								style={tw.style(
									"flex justify-center items-center w-8 h-8",
								)}
								onPress={() =>
									navigation.navigate("MEDIA_LIST")
								}
							>
								<ImageSvg
									width={17}
									height={17}
									color={"black"}
								/>
							</TouchableOpacity>
							<TouchableOpacity
								style={tw.style(
									"flex justify-center items-center w-8 h-8",
								)}
								onPress={() =>
									navigation.navigate("PIN_MESSAGE")
								}
							>
								<OutlinedPinSvg
									width={17}
									height={17}
									color={"black"}
								/>
							</TouchableOpacity>
							<TouchableOpacity
								style={tw.style(
									"flex justify-center items-center w-8 h-8",
								)}
								onPress={() => setIsSearchMode(true)}
							>
								<SearchSvg
									width={17}
									height={17}
									color={"black"}
								/>
							</TouchableOpacity>
							<TouchableOpacity
								style={tw.style(
									"flex justify-center items-center w-8 h-8",
								)}
								onPress={() => setOpenUserDlg(true)}
							>
								<ThreeDotsMenuSvg
									width={17}
									height={17}
									color={"black"}
								/>
							</TouchableOpacity>
						</View>
					),
					headerShown: !isSearchMode,
				}}
			/>
			{/* search bar */}
			{isSearchMode && (
				<View
					style={tw.style(
						"bg-white pt-6 flex flex-row w-full items-center justify-between px-2",
					)}
				>
					<View style={tw.style("w-7/8")}>
						<SearchForm
							value={searchKey}
							onChange={(val) => setSearchKey(val)}
						/>
					</View>
					<TouchableOpacity onPress={() => setIsSearchMode(false)}>
						<Text style={tw.style("text-4")}>Cancel</Text>
					</TouchableOpacity>
				</View>
			)}
			<ChatLayout setOpenAddDialog={setOpenAddDialog}>
				<ScrollView>
					<View style={tw.style("pb-10 h-full flex-col justify-end")}>
						<View style={tw.style("px-4")}>
							{msg
								.filter((msg) => msg.id == userId)[0]
								?.msg.map((item, index) => {
									return (
										<Swipeable
											key={index}
											renderRightActions={
												rightSwipeActions
											}
										></Swipeable>
									);
								})}
						</View>
					</View>
				</ScrollView>
			</ChatLayout>
		</>
	);
};

export default FansChatScreen;
