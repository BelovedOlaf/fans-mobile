import { Text, TouchableOpacity } from "react-native";
import React, { FC } from "react";
import tw from "@lib/tailwind";

interface Props {
	title: string;
	onClick: () => void;
	isSelected: boolean;
	count?: number;
}

const FilterButton: FC<Props> = (props) => {
	const { title, onClick, isSelected, count } = props;

	return (
		<TouchableOpacity
			style={tw.style(
				"py-[6px] px-4 rounded-full flex-row items-center",
				isSelected ? "bg-fans-purple" : "bg-fans-grey",
			)}
			onPress={onClick}
		>
			<Text
				style={tw.style(
					"text-[17px] leading-[22px] pr-2",
					isSelected ? "text-white" : "text-black",
				)}
			>
				{title}
			</Text>
			{count && (
				<TouchableOpacity
					style={tw.style(
						"py-[1px] px-1 rounded-[12px] h-4",
						isSelected ? "bg-fans-grey" : "bg-fans-purple",
					)}
				>
					<Text
						style={tw.style(
							"text-[11px]",
							isSelected ? "text-fans-purple" : "text-white",
						)}
					>
						{count}
					</Text>
				</TouchableOpacity>
			)}
		</TouchableOpacity>
	);
};

export default FilterButton;
