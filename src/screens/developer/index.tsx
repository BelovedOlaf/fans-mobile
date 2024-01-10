import { NativeStackScreenProps } from "@react-navigation/native-stack";

export type DeveloperNativeStackParams = {
	DeveloperPortal: undefined;
	Applications: undefined;
	GettingStarted: undefined;
};
export type DeveloperNativeStackScreens = keyof DeveloperNativeStackParams;
export type DeveloperNativeStackScreenProps<
	T extends DeveloperNativeStackScreens,
> = NativeStackScreenProps<DeveloperNativeStackParams, T>;
