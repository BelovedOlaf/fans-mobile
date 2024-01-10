import { FansText, FansView } from "@components/controls";
import RoundButton from "@components/common/RoundButton";
import CustomTopNavBar from "@components/common/customTopNavBar";
import AppLayout, { LayoutContentsContainer } from "@components/common/layout";
import { ApproveErrorImage } from "@assets/svgs/images";

import tw from "@lib/tailwind";
import { TextAlignStyle } from "@usertypes/styles";
import { ProfileNavigationStacks } from "@usertypes/navigations";

import React from "react";
import { ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

const AgeVerificationErrorScreen = (
	props: NativeStackScreenProps<ProfileNavigationStacks, "AgeVerifyFailed">,
) => {
	const { navigation } = props;
	const insets = useSafeAreaInsets();

	const onSubmitNewForm = () => {
		navigation.goBack();
	};

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
								gap={9}
							>
								<FansView alignItems="center">
									<ApproveErrorImage size={50.3} />
								</FansView>
								<FansText
									color="purple-a8"
									fontFamily="inter-bold"
									fontSize={19}
									lineHeight={26}
									textAlign="center"
								>
									Your application hasn't been approved
								</FansText>
								<FansText
									color="purple-a8"
									fontSize={16}
									lineHeight={21}
								>
									This may be for a few reasons:
									{"\n"}
									{"\n"}
									1. The selfie you submitted alongside your
									government-issued ID either wasn’t provided
									or wasn’t good enough quality. The ID should
									be in color, fully visible, and not edited
									in any way. Both your face and all
									information on the ID should be easily
									readable. Images that have been edited,
									cropped, or manipulated in any way won’t be
									accepted.
									{"\n"}
									{"\n"}
									2. The cover and profile photos you’ve
									uploaded are unclear or misleading, and
									should accurately reflect the kind of
									content you’ll be posting.
									{"\n"}
									{"\n"}
									3. You can’t include other people or
									copyrighted material in your cover image or
									profile photo without written permission
									from those involved. Please replace them
									with images that comply with our Terms of
									Service and Acceptable Use Policy.
									{"\n"}
									{"\n"}
									If your application doesn’t meet all these
									criteria, we’ll need more information from
									you, and this will delay your application by
									24 to 48 hours.
									{"\n"}
									{"\n"}
									Thank you!
								</FansText>
							</FansView>
							<RoundButton onPress={onSubmitNewForm}>
								Submit new form
							</RoundButton>
						</FansView>
					</LayoutContentsContainer>
				</ScrollView>
			</FansView>
		</AppLayout>
	);
};

export default AgeVerificationErrorScreen;
