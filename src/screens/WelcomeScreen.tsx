import React from "react";
import { View, Text } from "react-native";
import { useRouter } from "expo-router";

import tw from "@lib/tailwind";
import RoundButton from "@components/common/RoundButton";
import { RoundButtonType } from "@usertypes/commonEnums";
import { WelcomeLayout } from "@components/layouts";
import { StackActions } from "@react-navigation/native";

const WelcomeScreen = () => {
	const router = useRouter();

	return (
		<WelcomeLayout>
			<View
				style={tw.style(
					"absolute left-[17px] right-[19px] bottom-10",
					"flex flex-col",
				)}
			>
				<Text
					style={tw`font-inter-semibold text-center leading-8 text-white text-[23px]`}
				>
					Join the ultimate platform for exclusive content
				</Text>
				<RoundButton
					variant={RoundButtonType.OUTLINE_WHITE}
					customStyles={"mt-[38px]"}
					onPress={() => router.push("/auth/login")}
				>
					Continue
				</RoundButton>
			</View>
		</WelcomeLayout>
	);
};

export default WelcomeScreen;
