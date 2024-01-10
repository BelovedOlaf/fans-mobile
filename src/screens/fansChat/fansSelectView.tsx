import React, { Dispatch, SetStateAction } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { Stack } from "expo-router";
import tw from "@lib/tailwind";
import { OpenedMailSvg, Remove } from "@assets/svgs/common";
import { msg } from "@assets/dummyData/chat";
import SelectedItem from "@components/chat/fansView/selectItem";

type FansSelectViewProps = {
	selected: string[];
	setSelected: Dispatch<SetStateAction<string[] | undefined>>;
};

const FansSelectView = ({ selected, setSelected }: FansSelectViewProps) => {
	const handleClick = (id: string) => {
		if (selected.includes(id)) {
			setSelected((selected) => selected?.filter((item) => item !== id));
		} else {
			setSelected([...selected, id]);
		}
	};
	return (
		<View>
			<Stack.Screen
				options={{
					headerRight: () => (
						<TouchableOpacity>
							<Text
								style={tw.style(
									"font-bold text-lg text-fans-purple",
								)}
							>
								Save
							</Text>
						</TouchableOpacity>
					),
					headerLeft: () => (
						<TouchableOpacity
							onPress={() => {
								setSelected(undefined);
							}}
						>
							<Text
								style={tw.style(
									"font-bold text-lg text-fans-purple",
								)}
							>
								Cancel
							</Text>
						</TouchableOpacity>
					),
				}}
			/>
			<View style={tw.style("my-5")}>
				<ScrollView
					horizontal
					contentContainerStyle={{
						paddingHorizontal: 18,
						columnGap: 8,
					}}
					showsHorizontalScrollIndicator
				>
					<TouchableOpacity
						style={tw.style(
							"h-[34px] flex-row items-center bg-fans-grey px-4 rounded-full",
						)}
						onPress={() => {
							setSelected(msg.map((item) => item.id));
						}}
					>
						<Text style={tw.style("text-[17px]")}>Select all</Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={tw.style(
							"h-[34px] flex-row items-center bg-fans-grey px-4 rounded-full gap-[6px]",
						)}
					>
						<OpenedMailSvg
							width={16}
							height={16}
							style={tw.style("text-black")}
						/>
						<Text style={tw.style("text-[17px]")}>
							Mark as read
						</Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={tw.style(
							"h-[34px] w-[34px] flex-row items-center justify-center bg-fans-grey rounded-full",
						)}
					>
						<Remove
							width={16}
							height={16}
							style={tw.style("text-fans-red")}
						/>
					</TouchableOpacity>
				</ScrollView>
			</View>
			<View>
				{msg.map((item, index) => {
					return (
						<TouchableOpacity
							key={index}
							onPress={() => handleClick(item.id)}
						>
							<SelectedItem data={item} selected={selected} />
						</TouchableOpacity>
					);
				})}
			</View>
		</View>
	);
};

export default FansSelectView;
