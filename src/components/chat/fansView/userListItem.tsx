import React from "react";
import tw from "@lib/tailwind";
import { View, Text, Image } from "react-native";
import { IUserListMember } from "@usertypes/types";

// import base modules
import { FansDivider } from "@components/controls";

export default function UserListItem(props: { data: IUserListMember }) {
	const { data } = props;
	return (
		<View>
			<View style={tw.style("flex-row p-[16px] w-full")}>
				<View style={tw.style("w-[46px] h-[46px] ")}>
					<Image
						source={require("@assets/images/posts/user-1.png")}
						alt="User"
						resizeMode="cover"
						style={tw.style("w-full h-full rounded-full")}
					/>
				</View>
				<View style={tw.style("pl-[13px] w-full flex-col gap-1 ")}>
					<Text style={tw.style("text-[19px] pr-[9px]")}>
						{data.fullname}
					</Text>
					<Text style={tw.style("text-[16px] text-fans-dark-grey ")}>
						{data.username}
					</Text>
				</View>
			</View>
			<FansDivider />
		</View>
	);
}
