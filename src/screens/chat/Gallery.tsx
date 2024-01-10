import { Stack } from "expo-router";

import React, { useState } from "react";
import { TouchableOpacity, View, useWindowDimensions } from "react-native";
import { FlatGrid } from "react-native-super-grid";

import { dummyImages } from "@assets/dummyData/chat";
import {
	CheckSvg,
	ChevronDownSvg,
	StarCheckSvg,
	TrashSvg,
} from "@assets/svgs/common";
import { FansChips, FansImage, FansText } from "@components/controls";
import tw from "@lib/tailwind";
import { Colors } from "@usertypes/enums";

const GalleryScreen = () => {
	const items = [
		{ text: "All" },
		{ text: "Photos" },
		{ text: "Videos" },
		{ text: "Audio" },
	];

	const [filter, setFilter] = useState("All");
	const [isSelectMode, setIsSelectMode] = useState(false);
	const [selected, setSelected] = useState<number[]>([]);

	const { width: screenWidth } = useWindowDimensions();

	const handleSelect = (i: number) => {
		if (!isSelectMode) return;
		const index = selected.findIndex((item) => item === i);
		if (index === -1) {
			setSelected((old) => [...old, i]);
		} else {
			const temp = [...selected];
			temp.splice(index, 1);
			setSelected(temp);
		}
	};

	const handleCancel = () => {
		setSelected([]);
		setIsSelectMode(false);
	};

	const handleSelectAll = () => {
		const arr = Array.from(
			{ length: dummyImages.length },
			(_, index) => index,
		);
		setSelected(arr);
	};
	return (
		<View>
			{/* custom header */}
			<Stack.Screen
				options={{
					headerTitleAlign: "left",
					headerTitle: () => (
						<View
							style={tw.style("flex-row gap-[10px] items-center")}
						>
							<FansImage
								size={34}
								source={require("@assets/images/default-avatar.png")}
							/>
							<FansText fontFamily="inter-semibold" fontSize={16}>
								Jane Love
							</FansText>
							<StarCheckSvg width={14} height={14} />
						</View>
					),
					headerRight: () => (
						<View style={tw.style("mr-[20px]")}>
							{isSelectMode ? (
								<TouchableOpacity onPress={handleCancel}>
									<FansText
										style={tw.style(
											"text-purple-600 text-[16px] font-bold",
										)}
									>
										Cancel
									</FansText>
								</TouchableOpacity>
							) : (
								<TouchableOpacity
									onPress={() => setIsSelectMode(true)}
								>
									<FansText
										style={tw.style(
											"text-purple-600 text-[16px] font-bold",
										)}
									>
										Select
									</FansText>
								</TouchableOpacity>
							)}
						</View>
					),
				}}
			/>
			{/* user menu */}
			<View
				style={tw.style(
					"bg-white",
					"flex gap-[15px]",
					"px-[18px] py-[20px]",
				)}
			>
				<TouchableOpacity
					style={tw.style("flex flex-row items-center gap-[10px]")}
				>
					<FansText fontFamily="inter-bold" fontSize={19}>
						From Jane Love
					</FansText>
					<ChevronDownSvg size={12} color={Colors.Black} />
				</TouchableOpacity>
				<FansChips data={items} selected={0} onChangeValue={() => {}} />
			</View>
			{isSelectMode && (
				<View
					style={tw.style(
						"border-t border-gray-300 p-[10px] bg-white flex flex-row gap-2 items-center",
					)}
				>
					<TouchableOpacity
						style={tw.style("bg-gray-200 p-2 px-3 rounded-full")}
						onPress={handleSelectAll}
					>
						<FansText style={tw.style("text-4")}>
							Select all
						</FansText>
					</TouchableOpacity>
					<TouchableOpacity
						style={tw.style("w-9 h-9 bg-gray-200 rounded-full p-2")}
					>
						<TrashSvg />
					</TouchableOpacity>
				</View>
			)}

			{/* images */}
			<FlatGrid
				itemDimension={screenWidth / 4}
				data={dummyImages}
				renderItem={({ item, index }) => (
					<TouchableOpacity
						style={tw.style("relative")}
						onPress={() => handleSelect(index)}
					>
						<FansImage
							source={{ uri: item }}
							style={tw.style(
								`h-[${screenWidth / 3}px] w-[${
									screenWidth / 3
								}px]`,
							)}
							resizeMode="cover"
						/>
						{isSelectMode && (
							<View
								style={tw.style(
									"absolute top-[10px] right-[10px] w-[20px] h-[20px] rounded-full border border-white overflow-hidden",
								)}
							>
								<View
									style={tw.style(
										`${
											selected.includes(index)
												? "bg-purple-500"
												: "bg-gray-600"
										} flex-1 p-[5px]`,
									)}
								>
									{selected.includes(index) && <CheckSvg />}
								</View>
							</View>
						)}
					</TouchableOpacity>
				)}
				spacing={2}
			/>
		</View>
	);
};

export default GalleryScreen;
