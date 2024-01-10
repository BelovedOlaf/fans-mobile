import { SearchSvg } from "@assets/svgs/common";
import { defaultAnalyzeFans } from "@constants/common";
import RoundTextInput from "@components/common/RoundTextInput";
import { FansDivider } from "@components/controls";
import { FypText } from "@components/common/base";
import { IndividualFan, OverviewFansLevel } from "@components/posts/common";

import { getAnalyzeFans, getFansUsers } from "@helper/endpoints/post/apis";
import tw from "@lib/tailwind";
import { IAnalyzeFans, IFansUser } from "@usertypes/types";

import React, { useEffect, useState } from "react";
import { View } from "react-native";

const AnalyzeFansLevelsContents = () => {
	const [overViewData, setOverViewData] =
		useState<IAnalyzeFans[]>(defaultAnalyzeFans);
	const [searchKey, setSearchKey] = useState("");
	const [fanUsers, setFanUsers] = useState<IFansUser[]>([]);

	const fetchAnalyzeFans = async () => {
		const resp = await getAnalyzeFans();
		if (resp.ok) {
			setOverViewData(resp.data.data);
		}
	};

	const getOverviewDetail = (data: IAnalyzeFans) => {
		switch (data.from) {
			case 1:
				return {
					color: "#23c9b1",
					percent: Math.floor((data.fans * 100) / 200),
				};
			case 21:
				return {
					color: "#24a2ff",
					percent: Math.floor((data.fans * 100) / 200),
				};
			case 41:
				return {
					color: "#a854f5",
					percent: Math.floor((data.fans * 100) / 200),
				};
			case 61:
				return {
					color: "#e53ec6",
					percent: Math.floor((data.fans * 100) / 200),
				};
			case 81:
				return {
					color: "#f98c28",
					percent: Math.floor((data.fans * 100) / 200),
				};
			default:
				return {
					color: "#23c9b1",
					percent: Math.floor((data.fans * 100) / 200),
				};
		}
	};

	const fetchFanUsers = async () => {
		const resp = await getFansUsers({ query: searchKey });
		if (resp.ok) {
			setFanUsers(resp.data.fans);
		}
	};

	useEffect(() => {
		fetchAnalyzeFans();
	}, []);

	useEffect(() => {
		fetchFanUsers();
	}, [searchKey]);

	return (
		<View>
			<View>
				<FypText
					fontSize={17}
					lineHeight={22}
					margin={{ b: 14 }}
					fontWeight={600}
				>
					Overview
				</FypText>

				<View style={tw.style("gap-y-[14px]")}>
					{overViewData.map((cell) => (
						<OverviewFansLevel
							key={cell.from}
							percent={getOverviewDetail(cell).percent}
							color={getOverviewDetail(cell).color}
							fans={cell.fans}
							levels={`${cell.from}-${cell.to}`}
						/>
					))}
				</View>
			</View>

			<FansDivider
				style={tw.style(
					"mb-6 mt-[34px]",
					overViewData.length === 0 && "hidden",
				)}
			/>

			<View>
				<FypText
					fontSize={17}
					lineHeight={22}
					margin={{ b: 14 }}
					fontWeight={600}
				>
					Individual fans
				</FypText>

				<RoundTextInput
					value={searchKey}
					placeholder="Search fans"
					onChangeText={(val) => setSearchKey(val)}
					icon={
						<SearchSvg width={13.14} height={13.26} color="#000" />
					}
					customStyles="pl-11"
				/>

				<View style={tw.style("mt-3")}>
					{fanUsers.map((user) => (
						<IndividualFan key={user.id} data={user} />
					))}
				</View>
			</View>
		</View>
	);
};

export default AnalyzeFansLevelsContents;
