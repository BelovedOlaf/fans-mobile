import React, { useState } from "react";
import { TouchableOpacity } from "react-native";
import ToastMessage from "react-native-toast-message";

import RoundButton from "@components/common/RoundButton";
import {
	FansGap,
	FansScreen3,
	FansText,
	FansTextInput3,
	FansView,
} from "@components/controls";
import { UserActionType } from "@context/reducer/userReducer";
import { ProfileActionType, useAppContext } from "@context/useAppContext";
import { updateSetting } from "@helper/endpoints";
import tw from "@lib/tailwind";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Colors } from "@usertypes/enums";
import { SettingsNativeStackParams } from "@usertypes/navigations";

const UsernameScreen = (
	props: NativeStackScreenProps<SettingsNativeStackParams, "Username">,
) => {
	const { navigation } = props;

	const { state, dispatch } = useAppContext();
	const { username } = state.user.userInfo;

	const [valUsername, changeUsername] = useState("");

	const handlePressCancel = () => navigation.goBack();

	const handlePressSaveUsername = async () => {
		const res = await updateSetting({
			username: valUsername,
		});
		if (res.ok) {
			ToastMessage.show({
				type: "success",
				text1: "Saved successfully.",
			});
			dispatch.setUser({
				type: UserActionType.updateUserInfo,
				payload: { data: { username: valUsername } },
			});
			dispatch.setProfile({
				type: ProfileActionType.updateProfile,
				data: {
					user: { ...state.profile.user!, username: valUsername },
					profileLink:
						state.profile.profileLink.slice(
							0,
							state.profile.profileLink.lastIndexOf("/"),
						) +
						"/" +
						valUsername,
				},
			});
		} else {
			ToastMessage.show({
				type: "error",
				text1: res.data.message,
			});
		}
	};

	return (
		<FansScreen3 contentStyle1={{ maxWidth: { lg: 670 }, grow: true }}>
			<FansGap height={{ lg: 42.4 }} />
			<FansView gap={12}>
				<FansText fontFamily="inter-semibold" fontSize={17}>
					Current
				</FansText>
				<FansText color="grey-70" fontSize={18}>
					fyp.fans/{username}
				</FansText>
			</FansView>
			<FansGap height={29} />
			<FansView gap={15}>
				<FansText fontFamily="inter-semibold" fontSize={17}>
					New
				</FansText>
				<FansView center flexDirection="row">
					<FansText fontSize={18}>fyp.fans/</FansText>
					<FansGap width={21} />
					<FansTextInput3
						grow
						placeholder="Username"
						value={valUsername}
						onChangeText={changeUsername}
					/>
				</FansView>
			</FansView>
			<FansGap height={{ lg: 32 }} grow={!tw.prefixMatch("lg")} />
			<FansView style={tw.style("flex gap-[10px]")}>
				<RoundButton onPress={handlePressSaveUsername}>
					Save username
				</RoundButton>
				<TouchableOpacity onPress={handlePressCancel}>
					<FansText
						color="purple-a8"
						fontFamily="inter-semibold"
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

export default UsernameScreen;
