import { View, Text, Image } from "react-native";
import React, { FC } from "react";
import tw from "@lib/tailwind";

import { IRecentSearch } from "@usertypes/types";

interface Props {
	data: IRecentSearch;
}

const RecentSearch: FC<Props> = (props) => {
	const { data } = props;

	return (
		<View style={tw.style("flex-row items-center py-4")}>
			<View style={tw.style("mr-3 relative")}>
				<Image
					source={require("@assets/images/posts/user-1.png")}
					style={tw.style("w-[46px] h-[46px] rounded-full")}
					resizeMode="cover"
				/>
				<View
					style={tw.style(
						"absolute w-[11px] h-[11px] border-2 border-white bg-fans-green rounded-full right-0 bottom-[1px]",
					)}
				></View>
			</View>

			<View>
				<Text style={tw.style("text-[19px] font-bold leading-[26px]")}>
					{/* {data.fullname} */}
					full name
				</Text>
				<Text
					style={tw.style(
						"text-base leading-[21px] text-fans-dark-grey mt-[-3px]",
					)}
				>
					{data.username}
				</Text>
			</View>
		</View>
	);
};

export default RecentSearch;
