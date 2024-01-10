import { Redirect, useLocalSearchParams } from "expo-router";
import React, { useEffect } from "react";

import { useAppContext } from "@context/useAppContext";
import LandingScreen from "@screens/Landing";
import { AuthState, authStateAtom } from "@state/auth";
import { Platform } from "react-native";
import { useRecoilValue } from "recoil";
import { setStorage } from "@utils/storage";
import { StorageKeyTypes } from "@usertypes/commonEnums";

const IndexScreen = () => {
	const { dispatch } = useAppContext();
	const authState = useRecoilValue(authStateAtom);
	const { r } = useLocalSearchParams();

	useEffect(() => {
		dispatch.fetchUserInfo().then((resp) => {
			if (!resp.ok) return;
			dispatch.fetchProfile();
			dispatch.fetchSuggestedCreators();
		});

		if (typeof r === "string")
			setStorage(StorageKeyTypes.FeatureReferrralCode, r);
	}, []);

	if (authState === AuthState.Loading) {
		return null;
	} else if (authState === AuthState.Authenticated) {
		return <Redirect href="/posts" />;
	} else if (Platform.OS !== "web") {
		return <Redirect href="/auth/login" />;
	} else {
		return <LandingScreen />;
	}
};

export default IndexScreen;
