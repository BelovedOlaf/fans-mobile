/*import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import tw from "@lib/tailwind";
import {
	DocEditSvg,
	EditSvg,
	SearchSvg,
	SelectSvg,
	SortAscSvg,
	SortDescSvg,
} from "@assets/svgs/common";
import { IUserList, IUserProfile } from "@usertypes/types";
import { messageListData, usersData } from "@assets/dummyData/post";
import { msg } from "@assets/dummyData/chat";

import { MessageLayout } from "@components/chat/layout";
import { SearchForm } from "@components/search";
import { FilterButton, StoryCell } from "@components/posts/common";

import SelctedFansView from "./fansSelectView";
import AddNoteDialog from "@components/chat/common/dialogs/addNoteDialog";
import EditOrderOptionDialog from "@components/chat/common/dialogs/editOrderOptionDialog";
import { useRouter } from "expo-router";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { MessagesStackParamList } from "@usertypes/route";

const FansChatViewScreen = ({
	navigation,
}: NativeStackScreenProps<MessagesStackParamList>) => {
	const [users, setUsers] = useState<IUserProfile[]>(usersData);
	const [filter, setFilter] = useState<string | number>("all");
	const [openAddNoteDialog, setOpenAddNoteDialog] = useState(false);
	const [openEditOrderOptionDialog, setOpenEditOrderOptionDialog] =
		useState(false);

	const [userLists, setUserLists] = useState<IUserList[]>(messageListData);
	const [search, setSearch] = useState(false);
	const [searchKey, setSearchKey] = useState("");
	const [selected, setSelected] = useState<number[] | undefined>(undefined);
	const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
	const router = useRouter();

	const onSelectUser = (user: IUserProfile) => {
		if (user.isCurrentUser) {
			setOpenAddNoteDialog(true);
		} else {
			setUsers(
				users.map((cell) =>
					cell.id === user.id
						? { ...cell, isSelected: !user.isSelected }
						: cell,
				),
			);
		}
	};
	const onChangeFilter = (value: string | number) => {
		setFilter(value);
	};
	const onClickEditFilter = () => {
		setOpenEditOrderOptionDialog(true);
	};
	const handlerLongClick = (value: number) => {
		if (selected) {
			setSelected([...selected, value]);
		} else {
			setSelected([value]);
		}
	};
	const onClickNavigation = (page: string, id: number) => {
		router.push(`/chat/${id}`);
	};

	const onClickSelect = () => {
		setSelected([]);
	};

	const handleAddNote = (note: string) => {};
	const handleEditOrderOption = (note: string) => {};

	return (
		<>
			<View style={tw.style("bg-white relative")}>
				<Text
					style={tw.style(
						"text-center text-[23px] font-bold mt-[20px]",
					)}
				>
					Messages
				</Text>
				{!selected ? (
					<TouchableOpacity
						style={tw.style(
							"w-[34px] h-[34px] absolute right-[10px] top-[30px]",
						)}
						onPress={() => {}}
					>
						<DocEditSvg width={18} height={18} />
					</TouchableOpacity>
				) : (
					<>
						<TouchableOpacity
							style={tw.style("absolute right-[10px] top-[25px]")}
						>
							<Text
								style={tw.style(
									"text-purple-500 text-[18px] font-bold",
								)}
							>
								Save
							</Text>
						</TouchableOpacity>
						<TouchableOpacity
							style={tw.style("absolute left-[10px] top-[25px]")}
							onPress={() => setSelected(undefined)}
						>
							<Text
								style={tw.style(
									"text-purple-500 text-[18px] font-bold",
								)}
							>
								Cancel
							</Text>
						</TouchableOpacity>
					</>
				)}
			</View>
			<MessageLayout>
				<ScrollView
					contentContainerStyle={{ rowGap: 16 }}
					showsVerticalScrollIndicator={false}
				>
					<View>
						{!selected ? (
							<View>
								<View style={tw.style("")}>
									{!search ? (
										<View
											style={tw.style(
												"flex-row justify-between mb-4 px-5 items-center",
											)}
										>
											<View
												style={tw.style(
													"flex-row gap-1 items-center",
												)}
											>
												<TouchableOpacity
													style={tw.style(
														"w-[34px] h-[34px] flex items-center justify-center",
													)}
													onPress={() => {
														setSortOrder(
															(prevState) => {
																return prevState ===
																	"asc"
																	? "desc"
																	: "asc";
															},
														);
													}}
												>
													{sortOrder === "asc" ? (
														<SortAscSvg
															width={16}
															height={16}
															style={tw.style(
																"text-fans-dark-grey",
															)}
														/>
													) : (
														<SortDescSvg
															width={16}
															height={16}
															style={tw.style(
																"text-fans-dark-grey",
															)}
														/>
													)}
												</TouchableOpacity>
												<Text
													style={tw.style(
														"text-[17px] text-fans-dark-grey",
													)}
												>
													{sortOrder === "asc"
														? "Newest List"
														: "Oldest List"}
												</Text>
											</View>
											<View
												style={tw.style(
													"flex-row gap-[7px]",
												)}
											>
												<TouchableOpacity
													style={tw.style(
														"w-[34px] h-[34px] rounded-full bg-fans-grey flex items-center justify-center",
													)}
													onPress={() =>
														setSelected([])
													}
												>
													<SelectSvg
														width={16}
														height={16}
														style={tw.style(
															"text-black",
														)}
													/>
												</TouchableOpacity>
												<TouchableOpacity
													style={tw.style(
														"w-[34px] h-[34px] rounded-full bg-fans-grey  flex items-center justify-center",
													)}
													onPress={() =>
														navigation.navigate(
															"SEARCH_USER",
														)
													}
												>
													<SearchSvg
														width={16}
														height={16}
														style={tw.style(
															"text-black",
														)}
													/>
												</TouchableOpacity>
											</View>
										</View>
									) : (
										<View style={tw.style("mb-4]")}>
											<SearchForm
												value={searchKey}
												onChange={(val) =>
													setSearchKey(val)
												}
												setSearch={setSearch}
											/>
										</View>
									)}
								</View>
								<View style={tw.style("mt-3 mb-2")}>
									<ScrollView
										horizontal
										contentContainerStyle={{
											paddingHorizontal: 18,
											columnGap: 8,
										}}
										showsHorizontalScrollIndicator
									>
										<FilterButton
											title="All"
											onClick={() =>
												onChangeFilter("all")
											}
											isSelected={filter === "all"}
											count={17}
										/>
										{userLists
											.filter((el) => el.active)
											.map((userList) => (
												<FilterButton
													key={userList.id}
													title={userList.listName}
													onClick={() =>
														onChangeFilter(
															userList.id,
														)
													}
													isSelected={
														filter === userList.id
													}
													count={
														userList.listName ===
														"Unread"
															? 17
															: undefined
													}
												/>
											))}
										<TouchableOpacity
											style={tw.style(
												"py-[6px] flex-row items-center",
											)}
											onPress={onClickEditFilter}
										>
											<EditSvg width={13} height={13.5} />
											<Text
												style={tw.style(
													"text-fans-purple font-bold text-[17px] leading-[22px] ml-[6.5px]",
												)}
											>
												Edit
											</Text>
										</TouchableOpacity>
									</ScrollView>
								</View>
								<ScrollView
									horizontal
									contentContainerStyle={{
										paddingHorizontal: 18,
										paddingBottom: 9,
										columnGap: 15,
									}}
									showsHorizontalScrollIndicator={false}
									style={tw.style(
										"border-b border-fans-grey pt-6",
									)}
								>
									{users.map((user) => (
										<View
											key={user.id}
											style={tw.style("px-2 pt-4")}
										>
											<StoryCell
												key={user.id}
												title={user.username}
												image={user.avatar}
												isSelected={user.isSelected}
												isYou={user.isCurrentUser}
												onClick={() =>
													onSelectUser(user)
												}
											/>
											{user.note && (
												<View
													style={tw.style(
														"top-[-12px] rounded-[15px] w-25 absolute bg-white px-2 py-2 shadow-lg",
													)}
												>
													<Text
														style={tw.style(
															"text-center text-[13px]",
														)}
													>
														{user.note}
													</Text>
												</View>
											)}
										</View>
									))}
								</ScrollView>
								<View>
									{msg.map((item, index) => {
										return (
											<TouchableOpacity
												key={index}
												onLongPress={() =>
													handlerLongClick(item.id)
												}
												onPress={() =>
													onClickNavigation(
														"SEND_MESSAGE",
														item.id,
													)
												}
											></TouchableOpacity>
										);
									})}
								</View>
							</View>
						) : (
							<SelctedFansView
								selected={selected}
								setSelected={setSelected}
							/>
						)}
					</View>
				</ScrollView>

				<AddNoteDialog
					open={openAddNoteDialog}
					onClose={() => setOpenAddNoteDialog(false)}
					onSubmit={handleAddNote}
				/>

				<EditOrderOptionDialog
					open={openEditOrderOptionDialog}
					onClose={() => setOpenEditOrderOptionDialog(false)}
					onSubmit={handleEditOrderOption}
				/>
			</MessageLayout>
		</>
	);
};

export default FansChatViewScreen;
*/
