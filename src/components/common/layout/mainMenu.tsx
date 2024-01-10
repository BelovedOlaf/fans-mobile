import { View, ScrollView } from "react-native";
import React, { FC, useState } from "react";
import { IconButton } from "react-native-paper";
import tw from "@lib/tailwind";
import Animated, {
	useSharedValue,
	useAnimatedStyle,
	withTiming,
	Easing,
} from "react-native-reanimated";
import { useRouter } from "expo-router";

import MenuItem from "./menuItem";
import Divider from "../../controls/Divider";
import { useAppContext } from "@context/useAppContext";
import { UserRoleTypes } from "@usertypes/commonEnums";
import { CloseSvg, SunSvg, MoonSvg, ShortSvg } from "@assets/svgs/common";

interface Props {
	onClose: () => void;
	onClickSettings: () => void;
	onLogout: () => void;
	onSupport: () => void;
}

const MainMenu: FC<Props> = (props) => {
	const { onClose, onClickSettings, onLogout, onSupport } = props;
	const offset = useSharedValue(1);
	const router = useRouter();

	const { state } = useAppContext();
	const { user } = state;
	const { userInfo } = state.user;
	const { type } = userInfo;

	const isCreator = type === UserRoleTypes.Creator;

	const [isLightMode, setIsLightMode] = useState(true);

	const handleToggleTheme = () => {
		setIsLightMode(!isLightMode);
		offset.value = offset.value === 0 ? 1 : 0;
	};

	const onGoToYourCard = () => {
		router.replace({
			pathname: "settings",
			params: { screen: "Payments" },
		});
	};

	const springStyles = useAnimatedStyle(() => {
		return {
			transform: [
				{
					translateX: withTiming(offset.value * 151 + 4.5, {
						duration: 500,
						easing: Easing.bezier(0.5, 0.01, 0, 1),
					}),
				},
			],
		};
	});

	const onGoToProfile = () => {
		if (user.userInfo.type === UserRoleTypes.Creator) {
			router.replace({
				pathname: "profile",
				params: { screen: "Profile" },
			});
		} else {
			router.replace({
				pathname: "profile",
				params: { screen: "ProfileName" },
			});
		}
	};

	return (
		<ScrollView
			contentContainerStyle={tw.style(
				"border-r border-[#dedede] flex-1 pb-5 bg-fans-white",
			)}
		>
			<View
				style={tw.style("pt-8 pl-3 pr-5 lg:pt-15.5 lg:pl-5 lg:pr-7.5")}
			>
				<IconButton
					icon={() => (
						<CloseSvg
							style={tw.style(
								"w-3 h-3 lg:w-[14.45px] lg:h-[14.45px]",
							)}
							color="#fff"
						/>
					)}
					containerColor="bg-[rgba(0,0,0,0.3)]"
					style={tw.style(
						"w-6 h-6 lg:w-7.5 lg:h-7.5 ml-auto my-0 mr-0",
					)}
					onPress={onClose}
				/>

				<View
					style={tw.style(
						"w-[214px] lg:w-[298px] gap-y-3 mt-[38px] lg:mt-14 lg:gap-y-4",
					)}
				>
					{/* <MenuItem title="Search" /> */}
					<MenuItem
						title="Subscriptions"
						onPress={() =>
							router.push({
								pathname: "settings",
								params: { screen: "Subscriptions" },
							})
						}
					/>
					<MenuItem
						title="Collections"
						onPress={() => router.push("/bookmarks")}
					/>
					{isCreator && (
						<MenuItem
							title="Refer creators"
							onPress={() =>
								router.push({
									pathname: "refer",
								})
							}
						/>
					)}
					<MenuItem title="Settings" onPress={onClickSettings} />
					<Divider />
					<MenuItem title="Your cards" onPress={onGoToYourCard} />
					<MenuItem
						title={
							user.userInfo.type === UserRoleTypes.Creator
								? "View profile page"
								: "Become a creator"
						}
						onPress={onGoToProfile}
					/>

					<MenuItem title="Support" onPress={onSupport} />
					{/* <MenuItem title="English" /> */}
					<Divider />
					<MenuItem title="Log out" onPress={onLogout} />
				</View>
				{/* <Pressable
					style={tw.style(
						"w-[194px] h-[42px] rounded-[25px] relative mt-7.5",
						{
							"bg-fans-purple": isLightMode,
							"bg-[#b1b1b1]": !isLightMode,
						},
					)}
					onPress={handleToggleTheme}
				>
					<SunSvg
						width={25.3}
						height={25.3}
						style={tw.style("absolute top-[8.5px] left-[9px]")}
					/>
					<MoonSvg
						width={24.06}
						height={24.05}
						style={tw.style("absolute top-[9px] right-[10px]")}
					/>
					<Text
						style={tw.style(
							"text-[18px] leading-6 text-white top-[9px] absolute",
							isLightMode ? "left-[46px]" : "right-[46px]",
						)}
					>
						{isLightMode ? "Light mode" : "Dark mode"}
					</Text>
					<Animated.View
						style={[
							tw.style(
								"w-[34px] h-[34px] bg-white rounded-full absolute top-1",
							),
							springStyles,
						]}
					></Animated.View>
				</Pressable> */}
			</View>
		</ScrollView>
	);
};

export default MainMenu;
