import React, { useEffect, useState } from "react";
import { TouchableOpacity } from "react-native";
import ToastMessage from "react-native-toast-message";

import {
	FansButton2,
	FansGap,
	FansScreen3,
	FansText,
	FansTextInput3,
	FansTextInput6,
	FansView,
} from "@components/controls";
import { changePassword } from "@helper/endpoints";
import { SettingsNativeStackScreenProps } from "@usertypes/navigations";
import { isEmpty } from "lodash";

const ChangePasswordScreen = (
	props: SettingsNativeStackScreenProps<"ChangePassword">,
) => {
	const { navigation } = props;

	const [objValidation, setValidation] = useState({
		isValidation: false,
		currentPassword: "",
		newPassword: "",
		confirmPassword: "",
	});
	const [strCurrentPassword, setCurrentPassword] = useState("");
	const [strNewPassword, setNewPassword] = useState("");
	const [strConfirmPassword, setConfirmPassword] = useState("");

	useEffect(() => {
		if (objValidation.isValidation) {
			const resValidation = trigValidation();
			setValidation({ isValidation: true, ...resValidation });
		}
	}, [strCurrentPassword, strNewPassword, strConfirmPassword]);

	const handlePressCancel = () => {
		navigation.goBack();
	};

	const handlePressSave = async () => {
		const resValidation = trigValidation();

		setValidation({
			isValidation: true,
			...resValidation,
		});

		if (
			!isEmpty(resValidation.currentPassword) ||
			!isEmpty(resValidation.newPassword) ||
			!isEmpty(resValidation.confirmPassword)
		)
			return;

		const res = await changePassword({
			oldPassword: strCurrentPassword,
			newPassword: strNewPassword,
		});
		if (res.ok) {
			ToastMessage.show({
				type: "success",
				text1: "Password is changed!",
			});
		} else {
			setValidation({
				...objValidation,
				currentPassword: "Incorrect current password!",
			});
		}
	};

	const trigValidation = () => {
		const res = {
			currentPassword: "",
			newPassword: "",
			confirmPassword: "",
		};

		if (strNewPassword.length < 8)
			res.newPassword = "Password length must be at least 8!";

		if (strNewPassword !== strConfirmPassword)
			res.confirmPassword = "Password does not match!";

		if (strCurrentPassword.length === 0)
			res.currentPassword = "Input current password!";

		if (strNewPassword.length === 0)
			res.newPassword = "Input new password!";

		if (strConfirmPassword.length === 0)
			res.confirmPassword = "Input confirm password!";

		return res;
	};

	return (
		<FansScreen3 contentStyle1={{ maxWidth: { lg: 670 } }}>
			<FansView gap={15}>
				<FansText fontFamily="inter-semibold" fontSize={17}>
					Current password
				</FansText>
				<FansTextInput6
					value={strCurrentPassword}
					textInputStyle={{ secureTextEntry: true }}
					errorText={objValidation.currentPassword}
					onChangeText={setCurrentPassword}
				/>
			</FansView>

			<FansGap height={31} />

			<FansView gap={15}>
				<FansText fontFamily="inter-semibold" fontSize={17}>
					New password
				</FansText>
				<FansTextInput6
					value={strNewPassword}
					textInputStyle={{ secureTextEntry: true }}
					errorText={objValidation.newPassword}
					onChangeText={setNewPassword}
				/>
			</FansView>

			<FansGap height={34} />

			<FansView gap={15}>
				<FansText fontFamily="inter-semibold" fontSize={17}>
					Confirm password
				</FansText>
				<FansTextInput6
					value={strConfirmPassword}
					textInputStyle={{ secureTextEntry: true }}
					errorText={objValidation.confirmPassword}
					onChangeText={setConfirmPassword}
				/>
			</FansView>

			<FansGap height={40} />

			<FansView gap={16}>
				<FansButton2
					title="Save new password"
					backgroundColor="white"
					textColor="purple"
					onPress={handlePressSave}
				/>
				<FansView alignSelf="center">
					<TouchableOpacity onPress={handlePressCancel}>
						<FansText
							color="purple"
							fontFamily="inter-semibold"
							fontSize={17}
						>
							Cancel
						</FansText>
					</TouchableOpacity>
				</FansView>
			</FansView>
		</FansScreen3>
	);
};

export default ChangePasswordScreen;
