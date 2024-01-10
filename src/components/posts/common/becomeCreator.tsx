import tw from "@lib/tailwind";
import { useRouter } from "expo-router";
import React from "react";
import { Image, View } from "react-native";

import RoundButton from "@components/common/RoundButton";
import { FansText } from "@components/controls";

const BecomeCreator = () => {
	const router = useRouter();

	const onBecomeCreator = () => {
		router.push({
			pathname: "profile",
			params: { screen: "ProfileName" },
		});
	};

	return (
		<View
			style={tw.style(
				"bg-fans-purple-light py-6 px-4 rounded-[15px] flex-row items-center md:py-10 md:px-6",
			)}
		>
			<Image
				source={require("@assets/images/profile/medias-set.png")}
				style={tw.style("w-[74px] h-[78px]")}
			/>
			<View style={tw.style("ml-5 md:ml-10")}>
				<FansText
					fontSize={19}
					lineHeight={21}
					style={tw.style("font-semibold mb-1.5")}
				>
					Are you a creator?
				</FansText>
				<FansText
					fontSize={16}
					lineHeight={21}
					style={tw.style("mb-4")}
				>
					Sign up to start posting now
				</FansText>
				<View style={tw.style("w-[204px]")}>
					<RoundButton onPress={onBecomeCreator}>
						Become creator
					</RoundButton>
				</View>
			</View>
		</View>
	);
};

export default BecomeCreator;
