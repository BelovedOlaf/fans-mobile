import { NativeStackScreenProps } from "@react-navigation/native-stack";

export type DeveloperApplicationsNativeStackParams = {
	MyApplications: undefined;
	AppDetails?: { id: string };
};
export type DeveloperApplicationsNativeStackScreens =
	keyof DeveloperApplicationsNativeStackParams;
export type DeveloperApplicationsNativeStackScreenProps<
	T extends DeveloperApplicationsNativeStackScreens,
> = NativeStackScreenProps<DeveloperApplicationsNativeStackParams, T>;

export { default as AppDetailsScreen } from "./AppDetails";
export { default as MyApplicationsScreen } from "./MyApplications";
