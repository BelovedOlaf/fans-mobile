import React from "react";
import { View } from "react-native";
import DoubleAvatar from "./DoubleAvatar";
import IconAvatar from "./IconAvatar";
import { IconType } from "./Icons";
import UserAvatar from "./UserAvatar";

type WithAvatar = { avatar?: string };

interface UserAvatarListProps {
	users?: Array<WithAvatar>;
	icon?: IconType;
}

const empty: Array<WithAvatar> = [];

const UserAvatarList = ({ users = empty, icon }: UserAvatarListProps) => {
	if (users.length === 0) {
		if (!icon) return null;

		return (
			<View>
				<IconAvatar icon={icon} />
			</View>
		);
	} else if (users.length === 1) {
		return (
			<View>
				<UserAvatar image={users[0].avatar} icon={icon} />
			</View>
		);
	} else {
		return (
			<View>
				<DoubleAvatar
					image1={users[0].avatar}
					image2={users[1].avatar}
					icon={icon}
				/>
			</View>
		);
	}
};

export default UserAvatarList;
