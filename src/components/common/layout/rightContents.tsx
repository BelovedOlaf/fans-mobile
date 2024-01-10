import { View, Pressable } from "react-native";
import React, { useState, FC } from "react";
import { useRouter } from "expo-router";
import { openBrowserAsync } from "expo-web-browser";

import SearchTextInput from "../searchTextInput";
import SuggestedCreators from "./suggestedCreators";
import MediaContents from "./mediaContents";
import { FansText } from "@components/controls";

import tw from "@lib/tailwind";

interface Props {
	hide?: boolean;
}

const RightContents: FC<Props> = (props) => {
	const { hide } = props;
	const router = useRouter();

	const [searchQuery, setSearchQuery] = useState("");

	const onSearch = (val: string) => {
		setSearchQuery(val);
	};

	const onGoToPrivacy = () => {
		openBrowserAsync(
			"https://app.termly.io/document/privacy-policy/8234c269-74cc-48b6-9adb-be080aaaee11",
		);
	};

	const onClickContact = async () => {
		openBrowserAsync("https://support.fyp.fans/");
	};

	return (
		<View
			style={tw.style(
				"hidden pt-15.5 2lg:flex px-5 w-100 xl:w-[536px] xl:px-10 xl:pr-[140px] 2lg:min-h-screen",
			)}
		>
			{/* <SearchTextInput value={searchQuery} onChangeText={onSearch} /> */}
			<View style={tw.style("gap-y-[34px]", hide && "lg:hidden")}>
				<SuggestedCreators searchQuery={searchQuery} />
				<MediaContents />
				<View style={tw.style("flex-row pl-5 items-center mt-3")}>
					<Pressable onPress={onGoToPrivacy}>
						<FansText color="grey-70" fontSize={16} lineHeight={21}>
							Privacy policy
						</FansText>
					</Pressable>
					<View
						style={tw.style(
							"w-1 h-1 bg-fans-dark-grey rounded-full mx-2",
						)}
					></View>
					<Pressable
						onPress={() => {
							router.push("/terms");
						}}
					>
						<FansText color="grey-70" fontSize={16} lineHeight={21}>
							Terms of Use
						</FansText>
					</Pressable>
					<View
						style={tw.style(
							"w-1 h-1 bg-fans-dark-grey rounded-full mx-2",
						)}
					></View>
					<Pressable onPress={onClickContact}>
						<FansText color="grey-70" fontSize={16} lineHeight={21}>
							Contact Us
						</FansText>
					</Pressable>
				</View>
			</View>
		</View>
	);
};

export default RightContents;
