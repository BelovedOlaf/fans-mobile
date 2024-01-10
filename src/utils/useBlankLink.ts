import { Platform } from "react-native";
import React from "react";
import { openBrowserAsync } from "expo-web-browser";

export const useBlankLink = () => {
	const openLink = (url: string) => {
		if (Platform.OS === "web") {
			window.open(url, "_blank");
		} else {
			openBrowserAsync("https://support.fyp.fans/");
		}
	};

	return [openLink];
};
