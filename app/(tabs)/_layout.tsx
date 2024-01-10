import {
	ChatSvg,
	HomeSvg,
	NotificationSvg,
	OutlinedPlusSvg,
} from "@assets/svgs/common";
import AvatarWithStatus from "@components/common/AvatarWithStatus";
import { MobileSidebar } from "@components/common/layout";
import { CommonActionType, useAppContext } from "@context/useAppContext";

import tw from "@lib/tailwind";
import { notificationCountSelector } from "@state/notifications";
import { StorageKeyTypes, UserRoleTypes } from "@usertypes/commonEnums";
import { FansColors } from "@usertypes/enums";

import { AuthState, authStateAtom } from "@state/auth";
import { chatUnreadCountSelector } from "@state/chat";
import { useFeatureGates } from "@state/featureGates";
import { setVolatileStorage } from "@utils/storage";
import { Tabs, useRouter, useSegments } from "expo-router";
import React, { Fragment, useEffect } from "react";
import { Platform } from "react-native";
import { useRecoilValue } from "recoil";
import { useDeviceContext } from "twrnc";

const publicLinks = [
	"(tabs)/[username]",
	"(tabs)/terms",
	"(tabs)/support",
	"auth/login",
	"auth/register",
	"auth/checkYourEmail",
	"auth/verifyAccount",
	"auth/createNewPassword",
	"auth/resetPassword",
	"auth/welcome",
	"",
];

const NewLayout = () => {
	useDeviceContext(tw);

	const router = useRouter();
	const segments = useSegments();

	const { state, dispatch } = useAppContext();
	const { userInfo } = state.user;
	const authState = useRecoilValue(authStateAtom);

	const notificationCount = useRecoilValue(notificationCountSelector);
	const chatUnreadCount = useRecoilValue(chatUnreadCountSelector);
	const featureGates = useFeatureGates();

	const chatEnabled = featureGates.has("2023_10-chat");

	const onClickNewPost = () => {
		if (userInfo.type === UserRoleTypes.Creator) {
			dispatch.setCommon({
				type: CommonActionType.toggleNewPostTypesModal,
				data: true,
			});
		} else {
			router.push({
				pathname: "profile",
				params: {
					screen: "ProfileName",
				},
			});
		}
	};
	const needShowTabBar = () => {
		return (
			segments[0] === "(tabs)" &&
			[
				"",
				"posts",
				"notifications",
				"create",
				"chat",
				"profile",
			].includes(segments[1])
		);
	};

	useEffect(() => {
		// the app is still loading.
		if (segments.length === 1 && segments[0] === "(tabs)") return;

		const route = segments.join("/");
		if (!publicLinks.includes(route)) {
			if (authState === AuthState.Unauthenticated) {
				// console.log(
				// 	"route",
				// 	route,
				// 	"is not in publicLinks, redirecting to login",
				// );
				if (Platform.OS === "web") {
					console.log(
						"setting redirect after login:",
						window.location.pathname,
					);
					setVolatileStorage(
						StorageKeyTypes.RedirectAfterLogin,
						window.location.pathname,
					);
				}
				router.push("/auth/login");
			} else if (authState === AuthState.Loading) {
				// console.log("authState is loading, waiting for it to finish");
			}
		}
	}, [segments, authState]);

	useEffect(() => {
		if (userInfo.id === "0") {
			(async () => {
				const resp = await dispatch.fetchUserInfo();
				if (!resp.ok) return;
				dispatch.fetchProfile();
				dispatch.fetchSuggestedCreators();
			})();
		}
	}, [userInfo.id]);

	return (
		<Fragment>
			<Tabs
				backBehavior="history"
				screenOptions={{
					headerShown: false,
					tabBarShowLabel: false,
					tabBarStyle: {
						display:
							!tw.prefixMatch("lg") && needShowTabBar()
								? "flex"
								: "none",
					},
				}}
				id="RootNavigator"
			>
				<Tabs.Screen
					name="posts"
					initialParams={{ screen: "Home" }}
					options={{
						tabBarIcon: ({ focused }) => (
							<HomeSvg
								size={25}
								fill={focused ? FansColors.Black : undefined}
							/>
						),
					}}
					// listeners={() => ({
					// 	tabPress: (e) => {
					// 		e.preventDefault();
					// 		router.replace({
					// 			pathname: "posts",
					// 			params: { screen: "Home" },
					// 		});
					// 	},
					// })}
				/>
				<Tabs.Screen
					name="search"
					options={{
						href: null,
					}}
				/>
				<Tabs.Screen
					name="notifications"
					options={{
						tabBarBadge: notificationCount,
						tabBarBadgeStyle: tw.style(
							"min-w-[20px] min-h-[16px]",
							"bg-fans-purple",
							"text-[11px]",
						),
						tabBarIcon: ({ focused }) => (
							<NotificationSvg
								size={25}
								fill={focused ? FansColors.Black : undefined}
							/>
						),
					}}
				/>
				<Tabs.Screen
					name="create"
					options={{
						tabBarIcon: () => <OutlinedPlusSvg size={25} />,
					}}
					listeners={() => ({
						tabPress: (e) => {
							e.preventDefault();
							onClickNewPost();
						},
					})}
				/>
				<Tabs.Screen
					name="chat"
					options={{
						tabBarBadge: chatUnreadCount,
						tabBarBadgeStyle: tw.style(
							"min-w-[20px] min-h-[16px]",
							"bg-fans-purple",
							"text-[11px]",
						),
						tabBarItemStyle: chatEnabled
							? undefined
							: { display: "none" },
						tabBarIcon: ({ focused }) => (
							<ChatSvg
								size={25}
								fill={focused ? FansColors.Black : undefined}
							/>
						),
					}}
				/>
				<Tabs.Screen
					name="profile"
					options={{
						tabBarIcon: () => (
							<AvatarWithStatus
								isOnline={true}
								avatar={userInfo.avatar}
								size={30}
								hasOnlineStatus
							/>
						),
						tabBarItemStyle: {
							display:
								userInfo.type === UserRoleTypes.Creator
									? "flex"
									: "none",
						},
					}}
				/>

				<Tabs.Screen
					name="settings"
					options={{
						href: null,
					}}
				/>
				<Tabs.Screen
					name="terms"
					options={{
						href: null,
					}}
				/>
				<Tabs.Screen
					name="privacy"
					options={{
						href: null,
					}}
				/>
				<Tabs.Screen
					name="[username]"
					options={{
						href: null,
						tabBarItemStyle: { display: "none" },
						tabBarStyle: {
							display: tw.prefixMatch("md")
								? "none"
								: userInfo.id === "0"
								? "none"
								: "flex",
						},
					}}
				/>
				<Tabs.Screen
					name="get-gems"
					options={{
						href: null,
					}}
				/>
				<Tabs.Screen
					name="stories"
					options={{
						href: null,
						tabBarItemStyle: { display: "none" },
						tabBarStyle: {
							display: "none",
						},
					}}
				/>
				<Tabs.Screen
					name="playlist"
					options={{
						href: null,
					}}
				/>
				<Tabs.Screen
					name="refer"
					options={{
						href: null,
					}}
				/>
				<Tabs.Screen
					name="bookmarks"
					options={{
						href: null,
					}}
				/>
				<Tabs.Screen
					name="p/[id]"
					options={{
						href: null,
					}}
				/>
				<Tabs.Screen
					name="home"
					options={{
						href: null,
					}}
				/>
				<Tabs.Screen
					name="logo"
					options={{
						href: null,
					}}
				/>
				<Tabs.Screen
					name="create-post"
					options={{
						href: null,
					}}
				/>
			</Tabs>
			<MobileSidebar />
		</Fragment>
	);
};

export default NewLayout;
