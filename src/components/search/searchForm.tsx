import { View, Text, TouchableOpacity, TextInput } from "react-native";
import React, { FC } from "react";
import tw from "@lib/tailwind";
import { useRouter } from "expo-router";

import { SearchSvg } from "@assets/svgs/common";

interface Props {
	value: string;
	onChange: (val: string) => void;
	setSearch?: (val: boolean) => void;
}

const SearchForm: FC<Props> = (props) => {
	const { value, onChange, setSearch } = props;
	const router = useRouter();

	return (
		<View style={tw.style("flex-row items-center px-[18px] gap-5")}>
			<View style={tw.style("flex-1 relative ")}>
				<TextInput
					placeholder="Search"
					value={value}
					onChangeText={onChange}
					style={tw.style(
						"h-[42px] text-[18px] leading-6 text-black pr-4 bg-fans-grey rounded-full pl-[42px] ",
					)}
				/>
				<SearchSvg
					width={16}
					height={16}
					style={tw.style(
						"absolute left-[17px] top-[14px] text-black",
					)}
				/>
			</View>
			{setSearch && (
				<TouchableOpacity
					onPress={() => {
						onChange("");
						setSearch(false);
						router.replace("/posts");
					}}
				>
					<Text
						style={tw.style(
							"text-[19px] text-black font-normal leading-[26px]",
						)}
					>
						Cancel
					</Text>
				</TouchableOpacity>
			)}
		</View>
	);
};

export default SearchForm;
