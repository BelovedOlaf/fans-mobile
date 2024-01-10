import React from "react";
import { ScrollView, TouchableOpacity, Text } from "react-native";
import { notificationMenu } from "@constants/notification.menu";
import tw from "@lib/tailwind";

interface FilterMenuProps {
	setFilter: Function;
	filter: string;
}

const FilterMenu = ({ filter, setFilter }: FilterMenuProps) => {
	return (
		<ScrollView horizontal style={tw.style("p-[10px]")}>
			{notificationMenu.map((menu, i) => (
				<TouchableOpacity
					style={
						menu.value === filter
							? tw.style(
									"mx-[10px] bg-purple-500 rounded-[20px] h-[40px] min-w-[50px] flex items-center justify-center",
							  )
							: tw.style(
									"mx-[10px] bg-gray-200 rounded-[20px] h-[40px] min-w-[50px] flex items-center justify-center",
							  )
					}
					key={i}
					onPress={() => setFilter(menu.value)}
				>
					<Text
						style={
							menu.value === filter
								? tw.style("p-[10px] text-white")
								: tw.style("p-[10px] text-black")
						}
					>
						{menu.text}
					</Text>
				</TouchableOpacity>
			))}
		</ScrollView>
	);
};

export default FilterMenu;
