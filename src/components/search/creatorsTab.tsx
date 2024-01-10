import { ScrollView } from "react-native";
import React, { FC, useState } from "react";
import { useRouter } from "expo-router";
import tw from "@lib/tailwind";

import { ISuggestedProfile } from "@usertypes/types";

interface Props {
	searchKey: string;
}

const CreatorsTab: FC<Props> = (props) => {
	const { searchKey } = props;

	const router = useRouter();
	const [searchResult, setSearchResult] = useState<ISuggestedProfile[]>([]);

	const onViewCreator = () => {
		router.push("/posts/story");
	};

	return (
		<ScrollView
			showsVerticalScrollIndicator={false}
			contentContainerStyle={{
				rowGap: 10,
			}}
			style={tw.style("px-[18px] mt-5")}
		>
			{/* {searchResult.map((profile) => (
				<SuggestProfile
					key={profile.id}
					data={profile}
					onClickView={onViewCreator}
				/>
			))} */}
		</ScrollView>
	);
};

export default CreatorsTab;
