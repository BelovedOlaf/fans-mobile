import { NativeStackScreenProps } from "@react-navigation/native-stack";

export { default as PrivacyLayout } from "./Layout";
export { default as PrivacyScreen } from "./Privacy";

export type PrivacyNativeStackParams = {
	Privacy: undefined;
};
export type PrivacyNativeStackScreens = keyof PrivacyNativeStackParams;
export type PrivacyNativeStackScreenProps<T extends PrivacyNativeStackScreens> =
	NativeStackScreenProps<PrivacyNativeStackParams, T>;
