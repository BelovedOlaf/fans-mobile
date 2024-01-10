import tw from "@lib/tailwind";
import { useRouter } from "expo-router";
import React, { useCallback, useState } from "react";
import { View } from "react-native";
import { useSetRecoilState } from "recoil";

import MainMenu from "./mainMenu";
import SettingsMenu from "./settingsMenu";
import TabMenu from "./tabMenu";

import {
	CommonActionType,
	ProfileActionType,
	useAppContext,
} from "@context/useAppContext";
import { authLogout } from "@helper/endpoints/auth/apis";
import { AuthState, authAtom, authStateAtom } from "@state/auth";
import { StorageKeyTypes } from "@usertypes/commonEnums";
import { setObjectStorage, setStorage } from "@utils/storage";
import { useBlankLink } from "@utils/useBlankLink";

const Sidebar = () => {
	const router = useRouter();

	const [openLink] = useBlankLink();
	const { state, dispatch } = useAppContext();
	const setAuth = useSetRecoilState(authAtom);
	const setAuthState = useSetRecoilState(authStateAtom);

	const [collapsedTabMenu, setCollapsedTabMenu] = useState(false);
	const [collapsesSettings, setCollapsesSettings] = useState(true);

	const onToggleMore = () => {
		// dispatch.setCommon({
		// 	type: CommonActionType.toggleLayoutSidebar,
		// 	data: {
		// 		collapsedTabMenu: !collapsedTabMenu,
		// 	},
		// });
		setCollapsedTabMenu(!collapsedTabMenu);
	};

	const handleLogout = async () => {
		dispatch.setShowLoading();
		setAuthState(AuthState.Loading);
		await setStorage(StorageKeyTypes.AccessToken, null);
		await setObjectStorage(StorageKeyTypes.UserInfo, null);
		await authLogout(null);
		dispatch.setProfile({
			type: ProfileActionType.initProfile,
			data: {},
		});
		dispatch.setHideLoading();
		dispatch.setCommon({
			type: CommonActionType.toggleLayoutSidebar,
			data: {
				collapsedTabMenu: false,
			},
		});
		setAuth(undefined);
		setAuthState(AuthState.Unauthenticated);
		router.push("/auth/login");
	};

	const handleOpenTabMenu = () => {
		// dispatch.setCommon({
		// 	type: CommonActionType.toggleLayoutSidebar,
		// 	data: {
		// 		collapsedTabMenu: false,
		// 		collapsesSettings: true,
		// 	},
		// });
		setCollapsedTabMenu(false);
		setCollapsesSettings(true);
	};

	const handleBackFromSettings = () => {
		dispatch.setCommon({
			type: CommonActionType.toggleLayoutSidebar,
			data: {
				collapsedTabMenu: true,
				collapsesSettings: true,
			},
		});
	};

	const handleSupport = useCallback(() => {
		openLink("https://support.fyp.fans/hc/en-us");
	}, [router]);

	return (
		<View
			style={tw.style(
				"hidden md:flex pl-10 xl:pl-[114px] h-full flex-row bg-fans-white z-10 absolute left-0 top-0",
			)}
		>
			<TabMenu onToggleMore={onToggleMore} collapsed={collapsedTabMenu} />
			{collapsedTabMenu && collapsesSettings ? (
				<MainMenu
					onClose={handleOpenTabMenu}
					onClickSettings={() => {
						router.push("/settings");
					}}
					onLogout={handleLogout}
					onSupport={handleSupport}
				/>
			) : null}
			{!collapsesSettings ? (
				<SettingsMenu
					onClose={handleOpenTabMenu}
					onClickBack={handleBackFromSettings}
				/>
			) : null}
		</View>
	);
};

export default Sidebar;
