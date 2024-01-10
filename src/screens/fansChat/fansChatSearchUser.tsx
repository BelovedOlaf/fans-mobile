import { View, ScrollView, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import tw from "@lib/tailwind";
import { IUserList, IUserProfile } from "@usertypes/types";
import { usersListData } from "@assets/dummyData/post";
import { MessageLayout } from "@components/chat/layout";
import { SearchForm } from "@components/search";
import { MessagesStackParamList } from "@usertypes/route";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import UserListItem from "@components/chat/fansView/userListItem";
import { usersList } from "../../constants/data";
import UserCard from "./UserCard";

const FansChatSearchUserScreen = ({
	navigation,
	route,
}: NativeStackScreenProps<MessagesStackParamList, "SEARCH_USER">) => {
	const [users, setUsers] = useState<IUserList[]>(usersListData);
	const [searchKey, setSearchKey] = useState("");

	// const onClickNavigation = (id: number) => {
	// 	navigation.navigate("SEND_MESSAGE", { id: id });
	// };

	return (
		<MessageLayout>
			<ScrollView
				contentContainerStyle={{ rowGap: 16 }}
				showsVerticalScrollIndicator={false}
			>
				<View>
					<View>
						<View style={tw.style("mb-4")}>
							<SearchForm
								value={searchKey}
								onChange={(val) => setSearchKey(val)}
							/>
						</View>
					</View>
					<View style={tw.style("px-[10px]")}>
						{usersList.map((user, i) => (
							<UserCard key={i} user={user} />
						))}
					</View>
				</View>
			</ScrollView>
		</MessageLayout>
	);
};

export default FansChatSearchUserScreen;
