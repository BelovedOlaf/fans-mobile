import { Platform, Pressable } from "react-native";
import React from "react";
import { useRouter } from "expo-router";

import { FansView, FansSvg } from "@components/controls";
import {
	FypNullableView,
	FypText,
	FypButton,
	FypLinearGradientView,
} from "@components/common/base";
import { Diamond1Png } from "@assets/svgs/common";

import tw from "@lib/tailwind";
import { useAppContext } from "@context/useAppContext";
import { setVolatileStorage } from "@utils/storage";
import { StorageKeyTypes } from "@usertypes/commonEnums";

const BottomNav = () => {
	const { state } = useAppContext();
	const router = useRouter();

	const { userInfo } = state.user;

	const onChangeRouter = (pathname: string) => {
		if (Platform.OS === "web") {
			setVolatileStorage(
				StorageKeyTypes.RedirectAfterLogin,
				window.location.pathname,
			);
		}
		router.push(pathname);
	};

	return (
		<FypNullableView visible={userInfo.id === "0" && !tw.prefixMatch("md")}>
			<FansView
				position="absolute"
				background="white"
				padding={{ x: 18, y: 19 }}
				flexDirection="row"
				alignItems="center"
				justifyContent="between"
				style={[
					tw.style("w-full left-0 bottom-0"),
					{
						shadowColor: "rgba(0,0,0,0.16)",
						shadowOffset: {
							width: 0,
							height: -3,
						},
						shadowRadius: 6,
					},
				]}
			>
				<FansSvg
					style={tw.style("w-[37px] h-[34px]")}
					svg={Diamond1Png}
				/>
				<FansView flexDirection="row" gap={7}>
					<FypButton
						textStyle={tw.style(
							"text-[17px] font-bold leading-[22px] text-fans-purple",
						)}
						style={tw.style(
							"border border-fans-grey-de rounded-[28px] h-[34px] w-30",
						)}
						onPress={() => onChangeRouter("/auth/login")}
					>
						Log in
					</FypButton>

					<FypLinearGradientView
						style={tw.style("w-30")}
						height={34}
						borderRadius={28}
						colors={["#1d21e5", "#a854f5", "#d885ff"]}
					>
						<Pressable
							style={tw.style(
								"w-full h-full items-center justify-center",
							)}
							onPress={() => onChangeRouter("/auth/register")}
						>
							<FypText
								fontSize={17}
								lineHeight={22}
								fontWeight={700}
								color="white"
							>
								Sign up
							</FypText>
						</Pressable>
					</FypLinearGradientView>
				</FansView>
			</FansView>
		</FypNullableView>
	);
};

export default BottomNav;
