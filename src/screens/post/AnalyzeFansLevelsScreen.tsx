import { MagnifierSvg } from "@assets/svgs/common";
import RoundTextInput from "@components/common/RoundTextInput";
import Title from "@components/common/Title";
import FanInfoBox from "@components/fans/FanInfoBox";
import FansLevelBox from "@components/fans/FansLevelBox";
import tw from "@lib/tailwind";
import { SimpleFanInfoType } from "@usertypes/fan";
import { debounce } from "lodash";
import React, { useState } from "react";
import { ScrollView, View } from "react-native";

type FansLevelsType = {
	percent: number;
	count: number;
	levels: number[];
};

const FansLevelDurationData: FansLevelsType[] = [
	{ percent: 30, count: 300, levels: [81, 100] },
	{ percent: 40, count: 200, levels: [61, 80] },
	{ percent: 50, count: 100, levels: [41, 60] },
	{ percent: 60, count: 360, levels: [21, 40] },
	{ percent: 70, count: 400, levels: [1, 20] },
];

const AnalyzeFansLevelsScreen = () => {
	const [searchStr, setSearchStr] = useState<string>("");
	const [fans, setFans] = useState<SimpleFanInfoType[]>([]);

	const hanldeChangeSearhStr = (text: string) => {
		setSearchStr(text);

		// TODO: migrate to RequesterBase
		// axiosInstance
		// 	.post("/fans")
		// 	.then((res: any) => {
		// 		setFans([...res]);
		// 	})
		// 	.catch((err) => {
		// 		console.log("AnalyzeFansLevelScreen");
		// 		console.log("Search fans error");
		// 		console.log(err);
		// 	})
		// 	.finally(() => {});
	};

	return (
		<ScrollView
			style={tw`flex-1 relative flex flex-col pl-[17px] pr-[18px]`}
		>
			<View style={tw`flex flex-col pt-[27.3px] pb-[34px]`}>
				<Title>Overview</Title>

				<View style={tw`mt-14px flex flex-col gap-3`}>
					{FansLevelDurationData.map(
						(item: FansLevelsType, idx: number) => (
							<FansLevelBox
								key={idx}
								percent={item.percent}
								count={item.count}
								levels={item.levels}
							/>
						),
					)}
				</View>
			</View>
			<View style={tw`border-fans-grey border-t-[1px] pt-7 pb-7`}>
				<Title>Individual fans</Title>
				<View style={tw`mt-[15px]`}>
					<RoundTextInput
						icon={<MagnifierSvg width={13.14} height={13.26} />}
						placeholder="Search fans"
						value={searchStr}
						onChangeText={(text: string) => {
							debounce(hanldeChangeSearhStr, 500);
						}}
					/>
				</View>
				{/* <ScrollView style={tw`flex-1 basis-full flex flex-col p-0`}> */}
				<View style={tw`flex p-0`}>
					{[...Array(10).keys()].map((item) => (
						<FanInfoBox
							key={item}
							fanInfo={{
								id: item,
								username: `Test Fan ${item}`,
								email: `TestFanEmail${item}@fypfans.com`,
								avatar: null,
								level: 100,
								favoriteCount: 1500,
							}}
						/>
					))}
				</View>
				{/* </ScrollView> */}
			</View>
		</ScrollView>
	);
};

export default AnalyzeFansLevelsScreen;
