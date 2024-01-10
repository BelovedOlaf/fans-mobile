import { View, Text, TouchableOpacity } from "react-native";
import React, { FC } from "react";
import tw from "@lib/tailwind";

import { ITabCell } from "@usertypes/types";

interface TabProps {
	title: string;
	onClick: () => void;
	isSelected: boolean;
}

export const Tab: FC<TabProps> = (props) => {
	const { title, onClick, isSelected } = props;

	return (
		<TouchableOpacity
			style={tw.style("flex-1 py-[14px] relative")}
			onPress={onClick}
		>
			<Text
				style={tw.style(
					"text-center text-[17px] font-medium",
					isSelected ? "text-black" : "text-fans-dark-grey",
				)}
			>
				{title}
			</Text>

			<View
				style={tw.style(
					"h-[2px] w-full absolute bottom-[-1px] bg-fans-purple left-0",
					isSelected ? "" : "hidden",
				)}
			/>
		</TouchableOpacity>
	);
};

interface Props {
	tabs: ITabCell[];
	selectedTab: string;
	onChangeTab: (val: string) => void;
}

const Tabs: FC<Props> = (props) => {
	const { tabs, selectedTab, onChangeTab } = props;

	return (
		<View style={tw.style("border-b border-fans-grey flex-row")}>
			{tabs.map((tab) => (
				<Tab
					title={tab.label}
					onClick={() => onChangeTab(tab.data)}
					isSelected={tab.data === selectedTab}
					key={tab.data}
				/>
			))}
		</View>
	);
};

export default Tabs;
