import tw from "@lib/tailwind";
import React, { FC } from "react";
import { Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { IFansLink } from "@usertypes/components";
import { FansText } from "@components/controls";

const FansLink: IFansLink = (props) => {
	const router = useRouter();
	const { url, onPress } = props;
	return (
		<TouchableOpacity
			onPress={() => {
				onPress && onPress();
				url && router.push(url);
			}}
		>
			<FansText style={tw.style("underline")} {...props} />
		</TouchableOpacity>
	);
};

export default FansLink;
