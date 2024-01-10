import CustomSwitch from "@components/common/customSwitch";
import { FypText, FypNullableView } from "@components/common/base";
import UserAvatar from "@components/avatar/UserAvatar";

import tw from "@lib/tailwind";
import { IUserList } from "@usertypes/types";

import React, { FC } from "react";
import { Pressable, View } from "react-native";
import { Avatar } from "react-native-paper";

interface Props {
	data: IUserList;
	onChangeActive: (val: boolean) => void;
	onEidtUserList: (id: string) => void;
}

const UserList: FC<Props> = (props) => {
	const { data, onChangeActive, onEidtUserList } = props;

	return (
		<View style={tw.style("flex-row items-center h-[78px]")}>
			<CustomSwitch
				value={data.isActive}
				onValueChange={(val) => onChangeActive(val)}
			/>
			<Pressable
				style={tw.style("ml-5")}
				onPress={() => onEidtUserList(data.id)}
			>
				<FypText fontSize={17} lineHeight={22} fontWeight={600}>
					{data.title}
				</FypText>
				<FypText
					fontSize={16}
					lineHeight={21}
					color="grey-70"
					style={tw.style("mt-[-3px]")}
				>
					{`${data.creators.length} people`}
				</FypText>
			</Pressable>

			<Pressable
				style={tw.style("ml-auto flex-row-reverse items-center")}
				onPress={() => onEidtUserList(data.id)}
			>
				{data.creators.slice(0, 3).map((user, index) => (
					<View
						key={user.id}
						style={tw.style(
							"items-center border-[2px] border-white rounded-full",
							index !== 0 ? "mr-[-14px]" : "",
						)}
					>
						<UserAvatar image={user.avatar} size="30px" />
					</View>
				))}
				<FypNullableView visible={data.creators.length > 3}>
					<View
						style={tw.style(
							"items-center border-[2px] border-white mr-[-14px] rounded-full",
						)}
					>
						<Avatar.Text
							size={30}
							label={`+${data.creators.length - 3}`}
							style={tw.style("bg-fans-purple text-white")}
						/>
					</View>
				</FypNullableView>
			</Pressable>
		</View>
	);
};

export default UserList;
