import { FansText, FansView } from "@components/controls";
import RoundButton from "@components/common/RoundButton";
import CustomTopNavBar from "@components/common/customTopNavBar";
import AppLayout, { LayoutContentsContainer } from "@components/common/layout";
import { ApprovePendingImage } from "@assets/svgs/images";

import tw from "@lib/tailwind";
import { TextAlignStyle } from "@usertypes/styles";
import { ProfileNavigationStacks } from "@usertypes/navigations";

import React from "react";
import { ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

const AgeVerificationPendingScreen = (
	props: NativeStackScreenProps<ProfileNavigationStacks, "AgeVerifyPending">,
) => {
	const { navigation } = props;
	const insets = useSafeAreaInsets();

	const onClickBackHome = () => {};

	return (
		<AppLayout>
			<FansView flex="1">
				<ScrollView style={tw.style("flex-1")}>
					<LayoutContentsContainer>
						<CustomTopNavBar
							title="Age verification"
							onClickLeft={() => navigation.goBack()}
						/>
						<FansView
							padding={{ x: 18, t: 24, b: insets.bottom + 24 }}
						>
							<FansView
								padding={{ x: 16, y: 20 }}
								borderRadius={15}
								background="fans-purple-light"
								margin={{ b: 26 }}
								alignItems="center"
								gap={9}
							>
								<ApprovePendingImage size={48.5} />
								<FansText
									color="purple-a8"
									fontFamily="inter-bold"
									fontSize={19}
									lineHeight={26}
									textAlign="center"
								>
									Your application{"\n"}is being approved
								</FansText>
								<FansText
									color="purple-a8"
									fontSize={16}
									lineHeight={21}
									textAlign="center"
								>
									Average processing time under one hour, In
									extreme cases, up to 24 hours
								</FansText>
							</FansView>
							<RoundButton onPress={onClickBackHome}>
								Back to home
							</RoundButton>
						</FansView>
					</LayoutContentsContainer>
				</ScrollView>
			</FansView>
		</AppLayout>
	);
};

export default AgeVerificationPendingScreen;
