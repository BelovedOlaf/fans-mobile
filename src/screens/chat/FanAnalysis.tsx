import React, { Fragment, useState } from "react";
import { ProgressBar } from "react-native-paper";

import { Search1Svg } from "@assets/svgs/common";
import {
	FansChips2,
	FansDivider,
	FansGap,
	FansScreen2,
	FansSvg,
	FansText,
	FansTextInput3,
	FansView,
} from "@components/controls";
import { FansImage2 } from "@components/controls/Image";
import tw from "@lib/tailwind";
import { ChatNativeStackScreenProps } from "@usertypes/navigations";

const FanAnalysisScreen = (
	props: ChatNativeStackScreenProps<"FanAnalysis">,
) => {
	const { navigation } = props;

	const name = "Kimberly Lou";
	const level = 100;
	const cash = 750;

	const chips = [
		{ text: "Most important" },
		{ text: "Newest" },
		{ text: "Oldest" },
	];
	const [selected, setSelected] = useState<string | number>(0);

	const items = [
		{
			value: "FavoriteColor",
			title: "Favorite color",
			date: "6/10/2023",
			progress: 0.8,
			color: "#E53EC6",
			text: "My favorite color is light blue but I’m also really into millennial pink",
		},
		{
			value: "Music",
			title: "Music",
			date: "6/10/2023",
			progress: 0.6,
			color: "#E53EC6",
			text: "I love jazz! I’m actually a musician, but now I’m working in retail",
		},
		{
			value: "Cooking",
			title: "Cooking",
			date: "6/10/2023",
			progress: 0.3,
			color: "#24A2FF",
			text: "Sometimes I cook, yeah, but not too often. It’s not my favorite thing to do, honestly",
		},
		{
			value: "Travel",
			title: "Travel",
			date: "6/10/2023",
			progress: 0.1,
			color: "#A854F5",
			text: "I’m not a huge fan of traveling, I prefer staying cozy at home, you know?",
		},
	];

	return (
		<FansScreen2>
			<FansGap height={{ lg: 20 }} />
			<FansView alignItems="center">
				<FansImage2
					width={95}
					height={95}
					source={require("@assets/images/default-avatar.png")}
				/>
				<FansGap height={8} />
				<FansText fontFamily="inter-bold" fontSize={19}>
					{name}
				</FansText>
				<FansGap height={1} />
				<FansView alignItems="center" flexDirection="row">
					<FansText color="grey-70" fontSize={16}>
						Level {level} •
					</FansText>
					<FansView
						height={20}
						style={tw.style("px-[7px]")}
						backgroundColor={{ color: "green", opacity: 10 }}
						borderRadius="full"
						justifyContent="center"
					>
						<FansText
							color="green"
							fontFamily="inter-semibold"
							fontSize={14}
						>
							${cash}
						</FansText>
					</FansView>
				</FansView>
			</FansView>
			<FansGap height={37.3} />
			<FansChips2
				data={chips}
				value={selected}
				onChangeValue={setSelected}
			/>
			<FansGap height={14} />
			<FansTextInput3
				iconNode={
					<FansSvg width={13.14} height={13.26} svg={Search1Svg} />
				}
				placeholder="Search"
			/>
			<FansGap height={26.5} />
			<FansView>
				{items.map((item, index) => {
					const { title, date, progress, color, text } = item;

					return (
						<Fragment>
							{index !== 0 && (
								<Fragment>
									<FansGap height={19} />
									<FansDivider ver1 />
									<FansGap height={17.5} />
								</Fragment>
							)}
							<FansView
								alignItems="center"
								flexDirection="row"
								justifyContent="between"
							>
								<FansText
									fontFamily="inter-semibold"
									fontSize={19}
								>
									{title}
								</FansText>
								<FansText
									color="grey-70"
									fontFamily="inter-semibold"
									fontSize={15}
								>
									{date}
								</FansText>
							</FansView>
							<FansGap height={6.5} />
							<FansView>
								<ProgressBar
									progress={progress}
									style={tw.style("rounded-full")}
									color={color}
								/>
							</FansView>
							<FansGap height={13.7} />
							<FansText color="grey-70" fontSize={16}>
								{text}
							</FansText>
						</Fragment>
					);
				})}
			</FansView>
		</FansScreen2>
	);
};

export default FanAnalysisScreen;
