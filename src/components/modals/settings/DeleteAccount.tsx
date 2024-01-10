import React, { useState } from "react";

// import base modules
import { Warning2Svg } from "@assets/svgs/common";
import {
	FansButton,
	FansDivider,
	FansGap,
	FansModal,
	FansText,
	FansView,
} from "@components/controls";
import { authLogout } from "@helper/endpoints/auth/apis";
import { verifyDeleteAccount } from "@helper/endpoints/settings/apis";
import tw from "@lib/tailwind";
import { FansModalProps, IFansModal } from "@usertypes/components";
import {
	CodeField,
	Cursor,
	useBlurOnFulfill,
	useClearByFocusCell,
} from "react-native-confirmation-code-field";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import { FansModal3 } from "@components/controls/Modal";

const DeleteAccountModal: IFansModal = (props) => {
	const { visible, onClose, onSubmit, ...props_ } = props;

	const [value, setValue] = useState<string>("");
	const [validateStr, setValidateStr] = useState<string>("");

	const ref = useBlurOnFulfill({ value, cellCount: 6 });
	const [props__, getCellOnLayoutHandler] = useClearByFocusCell({
		value,
		setValue,
	});
	const [submitted, setSubmitted] = useState<boolean>(false);

	const handleActivate = async () => {
		setSubmitted(true);
		if (value.length !== 6) {
			setValidateStr("Please enter a valid verification code.");
		} else {
			/*const res = await verifyNewEmail({
				code: value,
				newEmail,
			});
			if (!res.ok) {
				Toast.show({
					type: "error",
					text1: "Invalid verification code.",
				});
			} else {
				dispatch.setUser({
					type: UserActionType.updateUserInfo,
					data: { email: newEmail },
				});
				Toast.show({
					type: "success",
					text1: "Success",
				});
				navigation.navigate("Email");
			}
			setLoading(false);*/
		}
	};

	const handlePressCancel = () => onClose();

	const handlePressDelete = async () => {
		const res = await verifyDeleteAccount({
			code: value,
		});
		if (res.ok) {
			onClose();
			onSubmit();
		} else {
			Toast.show({
				type: "error",
				text1: "Invalid verification code.",
			});
		}
	};

	return (
		<FansModal3 {...props}>
			<FansView
				style={tw.style("flex items-center", "mx-[16px] my-[30px]")}
			>
				<FansView style={tw.style("w-[76.58px] h-[68.62px]")}>
					<Warning2Svg colorFans="fans-red" />
				</FansView>
				<FansGap height={23.5} />
				<FansDivider />
				<FansGap height={18} />
				<FansText style={tw.style("font-inter-bold", "text-[23px]")}>
					Caution
				</FansText>
				<FansGap height={18} />
				<FansText
					style={tw.style("text-[16px] text-center leading-[21px]")}
				>
					Permanently deleting your account{"\n"}
					will erase all content, fan details, and{"\n"}
					transaction history. This action is irreversible.
				</FansText>
				<FansGap height={12} />
				<FansText
					style={tw.style("text-[16px] text-center leading-[21px]")}
				>
					We have sent you a code to your email, please copy it here
					before proceeding
				</FansText>
				<FansGap height={36} />
				<CodeField
					ref={ref}
					{...props__}
					value={value}
					onChangeText={setValue}
					cellCount={6}
					keyboardType="number-pad"
					textContentType="oneTimeCode"
					renderCell={({ symbol, index, isFocused }) => (
						<FansView
							style={tw.style(
								"w-[43.31px] h-[48.72px]",
								"border border-fans-dark-grey rounded-[7px]",
								"flex justify-center items-center",
								"mx-[6px]",
							)}
						>
							<FansText
								style={tw.style("text-[23px] text-fans-purple")}
							>
								{symbol || (isFocused ? <Cursor /> : null)}
							</FansText>
						</FansView>
					)}
				/>
				<FansGap height={38.3} />
				<FansView
					style={tw.style(
						"w-full",
						"flex-row gap-[14px] justify-between",
					)}
				>
					<FansButton
						title="Cancel"
						style={tw.style("grow")}
						fillMode="outline"
						onPress={handlePressCancel}
					/>
					<FansButton
						title="Delete"
						style={tw.style("grow")}
						colorFans={
							value.length !== 6 ? "fans-grey-dark" : "fans-red"
						}
						onPress={handlePressDelete}
					/>
				</FansView>
			</FansView>
		</FansModal3>
	);
};

/*const VerifyEmailScreen = (
	props: NativeStackScreenProps<SettingsNavigationStacks, "VerifyEmail">,
) => {
	const { navigation, route } = props;
	const { email: newEmail } = route.params;

	const { dispatch } = useAppContext();

	const router = useRouter();
	const { email, otpType } = useLocalSearchParams<{
		email: string;
		otpType: OTPPageTypes;
	}>();

	const [loading, setLoading] = useState<boolean>(false);

	const fetchUserInfo = async () => {
		const resp = await authUserInfo();
		if (resp.ok) {
			await setObjectStorage(StorageKeyTypes.UserInfo, {
				id: resp.data.id,
				avatar: resp.data.avatar,
				email: resp.data.email,
				username: resp.data.username,
				type: resp.data.type,
				profileId: resp.data.profile?.id ?? "",
				displayName: resp.data.profile?.displayName ?? "",
			});
		} else {
			console.log("user info error");
		}
	};
	const handleResend = () => {
		setLoading(true);
		axiosInstance
			.post("/auth/resend-verify-code", {
				email,
				code: value,
			})
			.then((res) => {
				Toast.show({
					type: "success",
					text1: "Verification code has been sent to your email!",
				});
			})
			.catch((err) => {
				console.log("Resent verification code:");
				console.log(err);
			})
			.finally(() => {
				setLoading(false);
			});
	};

	const handleTryAnotherEmail = () => {
		router.push("/auth/register");
	};
};*/

export default DeleteAccountModal;
