import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useCallback, useEffect, useState } from "react";

import {
	FansButton3,
	FansGap,
	FansScreen1,
	FansScreen2,
	FansText,
	FansView,
} from "@components/controls";
import tw from "@lib/tailwind";
import { Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { ApplicationRespBody } from "@helper/endpoints/application/schemas";
import * as apis from "@helper/endpoints";
import { AppIcon } from "@components/applications";
import Toast from "react-native-toast-message";
import { DeveloperApplicationsNativeStackScreenProps } from "@screens/developer/applications";

const MyApplicationsScreen = (
	props: DeveloperApplicationsNativeStackScreenProps<"MyApplications">,
) => {
	const { navigation } = props;
	const [applications, setApplications] = useState<ApplicationRespBody[]>();

	const handlePress = (id: string) => {
		navigation.navigate("AppDetails", { id: id });
	};

	const handlePressAddApplication = () => {
		navigation.navigate("AppDetails", { id: "" });
	};

	const fetchData = useCallback(async () => {
		const res = await apis.application.getApplications();
		if (res.ok) {
			setApplications(res.data.applications);
		} else {
			Toast.show({
				type: "error",
				text1: res.data.message,
			});
		}
	}, [setApplications]);

	useEffect(() => {
		fetchData();
	}, [fetchData]);

	return (
		<FansScreen2>
			<FansGap height={{ lg: 42.4 }} />
			<FansView gap={{ xs: 12, lg: 11 }}>
				<FansText fontFamily="inter-semibold" fontSize={17}>
					My Applications
				</FansText>
				<FansText
					color="grey-70"
					fontSize={16}
					letterSpacing={0.7}
					lineHeight={21}
				>
					Get started by creating a new application, use our API,
					create webhooks, and view documentation
				</FansText>
			</FansView>
			<FansView
				style={tw.style(
					"flex-row gap-[5px] md:gap-[24px] flex-wrap mt-5",
				)}
			>
				{applications &&
					applications.length > 0 &&
					applications.map((item) => (
						<TouchableOpacity
							onPress={() => handlePress(item.id)}
							key={item.id}
						>
							<View
								style={tw.style(
									"w-[115px] h-[108px]",
									"flex gap-[10px] justify-center items-center border border-[#f0f0f0] rounded-[15px]",
								)}
							>
								<AppIcon icon={item.icon} size={46} />
								<FansText
									style={tw.style(
										"font-inter-medium",
										"text-[16px]",
									)}
								>
									{item.name}
								</FansText>
							</View>
						</TouchableOpacity>
					))}
			</FansView>
			<FansGap height={10} />
			<FansButton3
				title="Add Application"
				onPress={handlePressAddApplication}
			/>
		</FansScreen2>
	);
};

export default MyApplicationsScreen;
