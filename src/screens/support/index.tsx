import { NativeStackScreenProps } from "@react-navigation/native-stack";

export { default as ContactUsScreen } from "./ContactUs";
export { default as LawEnforcementGuideScreen } from "./LawEnforcementGuide";
export { default } from "./Layout";

export type SupportNativeStackParams = {
	ContactUs: undefined;
	LawEnforcementGuide: undefined;
};
export type SupportNativeStackScreens = keyof SupportNativeStackParams;
export type SupportNativeStackScreenProps<T extends SupportNativeStackScreens> =
	NativeStackScreenProps<SupportNativeStackParams, T>;
