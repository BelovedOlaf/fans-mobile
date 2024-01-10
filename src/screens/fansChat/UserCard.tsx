import UserAvatar from "@components/avatar/UserAvatar";
import tw from "@lib/tailwind";
import React from "react";
import { View, Text, Image } from "react-native";

interface User {
	name: string;
	username: string;
	avatar: string;
}

interface UserCardProps {
	user: User;
}

const UserCard = ({ user }: UserCardProps) => {
	return (
		<View
			style={tw.style(
				"flex flex-row items-center gap-3 py-[5px] border-b border-gray-100",
			)}
		>
			<View>
				<UserAvatar image={user.avatar} />
			</View>
			<View>
				<View>
					<Text>{user.name}</Text>
				</View>
				<View>
					<Text
						style={tw.style("text-gray-500")}
					>{`@${user.username}`}</Text>
				</View>
			</View>
		</View>
	);
};

export default UserCard;
