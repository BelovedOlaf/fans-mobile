import React, { useCallback, useState } from "react";
import { TouchableOpacity } from "react-native";

import RoundButton from "@components/common/RoundButton";
import {
	FansGap,
	FansPhoneInput,
	FansScreen2,
	FansScreen3,
	FansText,
	FansView,
} from "@components/controls";
import { UserActionType, useAppContext } from "@context/useAppContext";
import { updateSetting } from "@helper/endpoints";
import tw from "@lib/tailwind";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Colors } from "@usertypes/enums";
import { SettingsNativeStackParams } from "@usertypes/navigations";
import ToastMessage from "react-native-toast-message";

const PhoneScreen = (
	props: NativeStackScreenProps<SettingsNativeStackParams, "Phone">,
) => {
	const { navigation } = props;

	const { state, dispatch } = useAppContext();
	const { userInfo } = state.user;
	const { phonenumber } = userInfo;

	const [strPhonenumber, setPhonenumber] = useState(phonenumber);
	const handlePressSavePhonenumber = useCallback(async () => {
		const res = await updateSetting({ phonenumber: strPhonenumber });
		if (res.ok) {
			dispatch.setUser({
				type: UserActionType.updateUserInfo,
				payload: { data: { phonenumber: strPhonenumber } },
			});
			ToastMessage.show({
				type: "success",
				text1: "Saved successfully.",
			});
		} else {
			ToastMessage.show({
				type: "error",
				text1: res.data.message,
			});
		}
	}, [strPhonenumber]);

	const handlePressCancel = () => navigation.goBack();

	return (
		<FansScreen3 contentStyle1={{ maxWidth: { lg: 670 } }}>
			<FansGap height={{ lg: 42.4 }} />
			<FansView gap={12}>
				<FansText fontFamily="inter-semibold" fontSize={17}>
					Current
				</FansText>
				<FansText color="grey-70" fontSize={18}>
					{phonenumber ?? "Add phone number"}
				</FansText>
			</FansView>
			<FansGap height={29} />
			<FansView gap={15}>
				<FansText fontFamily="inter-semibold" fontSize={17}>
					New
				</FansText>
				<FansPhoneInput
					value={strPhonenumber}
					onChange={setPhonenumber}
				/>
			</FansView>
			<FansGap height={{ lg: 32 }} grow={!tw.prefixMatch("lg")} />
			<FansView style={tw.style("flex gap-[10px]")}>
				<RoundButton onPress={handlePressSavePhonenumber}>
					Save phone number
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
			</FansView>
		</FansScreen3>
	);
};

export default PhoneScreen;
