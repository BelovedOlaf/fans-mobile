import { View, Pressable, Image } from "react-native";
import tw from "@lib/tailwind";
import React from "react";
import { useRouter } from "expo-router";

import { FansText } from "@components/controls";
import { ThreeLineSvg, GemSvg, LogoSvg } from "@assets/svgs/common";
import { useAppContext, CommonActionType } from "@context/useAppContext";

const AppBar = () => {
	const router = useRouter();
	const { state, dispatch } = useAppContext();
	const { userInfo } = state.user;
	const { profile } = state;

	const handleOpenGemModal = () => {
		router.push({ pathname: "get-gems", params: { gems: 1000 } });
	};

	const handleOpenSidebar = () => {
		dispatch.setCommon({
			type: CommonActionType.toggleSidebar,
			data: true,
		});
	};

	return (
		<View
			style={tw.style(
				"px-[18px] py-[18px] flex justify-center items-center md:hidden",
			)}
		>
			<Pressable
				style={tw.style("absolute left-[18px]")}
				onPress={handleOpenSidebar}
			>
				<ThreeLineSvg size={25} color="#000" />
			</Pressable>
			{/* <LogoSvg width={114} height={23} /> */}
			<Image
				source={require("@assets/images/fypfanswebsitelogo.png")}
				style={{ width: 155, height: 30 }}
			/>
			<Pressable
				style={tw.style(
					"absolute right-[18px] bg-fans-grey pl-[9.3px] pr-[12.2px] py-[5px] rounded-[34px] flex-none flex items-center flex-row min-w-[74px]",
				)}
				onPress={handleOpenGemModal}
			>
				{/* <GemSvg size={18.8} /> */}
				<Image
					source={require("@assets/images/gem.png")}
					style={{ width: 18.8, height: 17.43 }}
				/>
				<FansText
					fontSize={18}
					lineHeight={24}
					style={tw.style("text-black ml-1 font-medium")}
				>
					{userInfo.gems}
				</FansText>
			</Pressable>
		</View>
	);
};

export default AppBar;
