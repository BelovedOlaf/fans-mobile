import Tabs from "@components/common/tabs";
import {
	CreatorsTab,
	PostsTab,
	RecentSearchsTab,
	SearchForm,
	TagsTab,
} from "@components/search";
import tw from "@lib/tailwind";
import { SearchTabTypes } from "@usertypes/commonEnums";
import React, { useState } from "react";
import { SafeAreaView, View } from "react-native";

const SearchScreen = () => {
	const [searchKey, setSearchKey] = useState("");
	const [tab, setTab] = useState<SearchTabTypes>(
		SearchTabTypes.RecentSearches,
	);

	const onSelectTag = () => {
		setTab(SearchTabTypes.Posts);
	};

	return (
		<View style={tw.style("flex-1 bg-white")}>
			<SafeAreaView style={tw.style("flex-1 pt-2")}>
				<SearchForm
					value={searchKey}
					onChange={(val) => setSearchKey(val)}
					setSearch={() => {}}
				/>
				{tab === SearchTabTypes.RecentSearches && (
					<RecentSearchsTab
						searchKey={searchKey}
						onClickSeeAll={() => setTab(SearchTabTypes.Creators)}
					/>
				)}

				{tab !== SearchTabTypes.RecentSearches && (
					<Tabs
						tabs={[
							{
								data: SearchTabTypes.Creators,
								label: "Creators",
							},
							{ data: SearchTabTypes.Posts, label: "Posts" },
							{ data: SearchTabTypes.Tags, label: "Tags" },
						]}
						selectedTab={tab}
						onChangeTab={(val) => setTab(val as SearchTabTypes)}
					/>
				)}
				{tab === SearchTabTypes.Creators && (
					<CreatorsTab searchKey={searchKey} />
				)}
				{tab === SearchTabTypes.Posts && (
					<PostsTab searchKey={searchKey} />
				)}
				{tab === SearchTabTypes.Tags && (
					<TagsTab searchKey={searchKey} onClickTag={onSelectTag} />
				)}
			</SafeAreaView>
		</View>
	);
};

export default SearchScreen;
