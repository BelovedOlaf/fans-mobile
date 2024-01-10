import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React, { FC, useState, useEffect } from "react";
import tw from "@lib/tailwind";

import RecentSearchGroup from "./recentSearchGroup";

import { recentSearchesData } from "@assets/dummyData/post";
import { IRecentSearchGroup } from "@usertypes/types";

interface Props {
	onClickSeeAll: () => void;
	searchKey: string;
}

const RecentSearchsTab: FC<Props> = (props) => {
	const { onClickSeeAll, searchKey } = props;
	const [searchResult, setSearchResult] = useState<IRecentSearchGroup[]>([]);

	useEffect(() => {
		// setSearchResult(
		// 	recentSearchesData.map((searchGroup) => ({
		// 		...searchGroup,
		// 		searches: searchGroup.searches.filter(
		// 			(search) =>
		// 				search.fullname.toLowerCase().includes(searchKey) ||
		// 				search.username.includes(searchKey)
		// 		),
		// 	}))
		// );
	}, [searchKey]);

	return (
		<View style={tw.style("pt-5")}>
			<View
				style={tw.style(
					"flex-row items-center px-[18px] justify-between",
				)}
			>
				<Text
					style={tw.style(
						"text-[19px] font-bold text-black leading-[26px]",
					)}
				>
					Recent searches
				</Text>

				<TouchableOpacity onPress={onClickSeeAll}>
					<Text
						style={tw.style(
							"text-fans-purple text-[17px] leading-[22px] font-semibold",
						)}
					>
						See All
					</Text>
				</TouchableOpacity>
			</View>
			<ScrollView
				showsVerticalScrollIndicator={false}
				contentContainerStyle={{
					rowGap: 8,
				}}
			>
				{searchResult.map((searchGroup) => (
					<RecentSearchGroup
						key={searchGroup.id}
						data={searchGroup}
					/>
				))}
			</ScrollView>
		</View>
	);
};

export default RecentSearchsTab;
