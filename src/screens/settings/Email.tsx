import RoundButton from "@components/common/RoundButton";
import {
	FansGap,
	FansScreen1,
	FansScreen2,
	FansScreen3,
	FansText,
	FansTextInput,
	FansView,
} from "@components/controls";
import { useAppContext } from "@context/useAppContext";
import { updateEmail } from "@helper/endpoints";
import tw from "@lib/tailwind";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Colors } from "@usertypes/enums";
import { SettingsNativeStackParams } from "@usertypes/navigations";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { TouchableOpacity, View } from "react-native";

const EmailScreen = (
	props: NativeStackScreenProps<SettingsNativeStackParams, "Email">,
) => {
	const { navigation } = props;
	const router = useRouter();

	const { dispatch, state } = useAppContext();
	const { email } = state.user.userInfo;

	const [valEmail, changeEmail] = useState("");

	const handlePressCancel = () => navigation.goBack();

	const handlePressSaveEmail = async () => {
		const res = await updateEmail({ email: valEmail });
		navigation.navigate("VerifyEmail", { email: valEmail });
	};

	return (
		<FansScreen3 contentStyle1={{ maxWidth: { lg: 670 } }}>
			<FansGap height={{ lg: 42.4 }} />
			<FansView gap={12}>
				<FansText fontFamily="inter-semibold" fontSize={17}>
					Current
				</FansText>
				<FansText color="grey-70" fontSize={18}>
					{email}
				</FansText>
			</FansView>
			<FansGap height={29} />
			<FansView gap={15}>
				<FansText fontFamily="inter-semibold" fontSize={17}>
					New
				</FansText>
				<FansTextInput
					value={valEmail}
					placeholder="Email address"
					onChangeText={changeEmail}
				/>
			</FansView>
			<FansGap height={{ lg: 32 }} grow={!tw.prefixMatch("lg")} />
			<View style={tw.style("flex gap-[10px]")}>
				<RoundButton onPress={handlePressSaveEmail}>
					Save email
				</RoundButton>
				<TouchableOpacity onPress={handlePressCancel}>
					<FansText
						color="purple-a8"
						fontSize={17}
						textAlign="center"
					>
						Cancel
					</FansText>
				</TouchableOpacity>
			</View>
		</FansScreen3>
	);
};

export default EmailScreen;
