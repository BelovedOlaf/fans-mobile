import { PRODUCTION_MODE } from "@env";
import * as ExpoDevice from "expo-device";

import { Platform } from "react-native";

export const isAndroid = Platform.OS === "android";

export const isDesktop =
	Platform.OS === "web" &&
	ExpoDevice.deviceType === ExpoDevice.DeviceType.DESKTOP;

export const isiOS = Platform.OS === "ios";

export const isMobile =
	Platform.OS === "web" &&
	ExpoDevice.deviceType === ExpoDevice.DeviceType.PHONE;

export const isWeb = Platform.OS === "web";

export const osSelect = <T>(
	defaultValue: T,
	osValues: {
		android?: T;
		desktop?: T;
		ios?: T;
		mobile?: T;
	},
) => {
	const { android, desktop, ios, mobile } = osValues;

	if (isAndroid && android) return android;
	if (isDesktop && desktop) return desktop;
	if (isiOS && ios) return ios;
	if (isMobile && mobile) return mobile;
	return defaultValue;
};
