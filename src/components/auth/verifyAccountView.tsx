import tw from "@lib/tailwind";
import { OTPPageTypes, StorageKeyTypes } from "@usertypes/commonEnums";
import React, { FC, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import {
	CodeField,
	Cursor,
	useBlurOnFulfill,
	useClearByFocusCell,
} from "react-native-confirmation-code-field";
import Spinner from "react-native-loading-spinner-overlay";
import Toast from "react-native-toast-message";

import RoundButton from "@components/common/RoundButton";
import TextButton from "@components/common/TextButton";
import {
	authResendVerifyCode,
	authUserInfo,
	authVerifyAccount,
	authVerifyRegister,
} from "@helper/endpoints/auth/apis";
import { setObjectStorage, setStorage } from "@utils/storage";
import { useRouter } from "expo-router";
import { atoburl } from "@helper/Utils";
import { IAppDispatch } from "@context/appContext";
import { ModalState } from "@context/state/modalState";
import { SUBSCRIBE_LOGIN_DIALOG_ID } from "@constants/modal";
import { CommonActionType } from "@context/useAppContext";

interface Props {
	dispatch: IAppDispatch;
	handleClose: () => void;
	modals: ModalState[];
}

const VerifyAccountView: FC<Props> = (_props) => {
	const { dispatch, handleClose, modals } = _props;
	const router = useRouter();
	const modal = modals.find(
		(m) => m.id === SUBSCRIBE_LOGIN_DIALOG_ID,
	) as ModalState<{
		tab: string;
		email: string;
		username: string;
		password: string;
		otpType: OTPPageTypes;
	}>;

	const email = !!modal && modal.payload?.email;
	const username = !!modal && modal.payload?.username;
	const password = !!modal && modal.payload?.password;

	const [value, setValue] = useState<string>("");
	const [loading, setLoading] = useState<boolean>(false);
	const [submitted, setSubmitted] = useState<boolean>(false);
	const [validateStr, setValidateStr] = useState<string>("");

	const ref = useBlurOnFulfill({ value, cellCount: 6 });
	const [props, getCellOnLayoutHandler] = useClearByFocusCell({
		value,
		setValue,
	});

	const handleActivate = () => {
		setSubmitted(true);
		if (value.length !== 6) {
			setValidateStr("Please enter a valid code.");
		} else if (!email) {
			setValidateStr("Please enter a valid email.");
		} else {
			setLoading(true);
			if (!username || !password) {
				authVerifyAccount({
					email,
					code: value,
				})
					.then(async (resp) => {
						if (!resp.ok) {
							Toast.show({
								type: "error",
								text1: resp.data.message,
							});
							setLoading(false);
							return;
						}

						const token = resp.data.token;
						await setStorage(StorageKeyTypes.AccessToken, token);

						await dispatch.fetchProfile();
						await dispatch.fetchUserInfo();

						setLoading(false);
						handleClose();
						dispatch.setCommon({
							type: CommonActionType.toggleSubscribeModal,
							data: {
								visible: true,
							},
						});
					})
					.finally(() => {
						setLoading(false);
					});
			} else {
				authVerifyRegister({
					code: value,
					email,
					username,
					password: atoburl(password),
				}).then(async (resp) => {
					if (!resp.ok) {
						Toast.show({
							type: "error",
							text1: resp.data.message,
						});
						setLoading(false);
						return;
					}

					const token = resp.data.token;
					await setStorage(StorageKeyTypes.AccessToken, token);

					await dispatch.fetchProfile();
					await dispatch.fetchUserInfo();

					setLoading(false);
					handleClose();
					dispatch.setCommon({
						type: CommonActionType.toggleSubscribeModal,
						data: {
							visible: true,
						},
					});
				});
			}
		}
	};

	const handleResend = () => {
		setLoading(true);
		if (!email) {
			setValidateStr("Please enter a valid email.");
		} else {
			authResendVerifyCode({
				email,
				username,
			})
				.then((resp) => {
					if (!resp.ok) {
						Toast.show({
							type: "error",
							text1: resp.data.message,
						});
						return;
					}

					Toast.show({
						type: "success",
						text1: "Verification code has been sent to your email!",
					});
				})
				.finally(() => {
					setLoading(false);
				});
		}
	};

	const handleTryAnotherEmail = () => {
		router.push("/auth/register");
	};

	return (
		<View style={tw`flex-1 flex relative bg-white`}>
			<Spinner
				visible={loading}
				overlayColor="rgba(0,0,0,.5)"
				color="white"
				textStyle={tw`text-white`}
			/>
			<ScrollView contentContainerStyle={tw.style("flex-1 py-4")}>
				<View>
					<View style={tw.style("flex-1 relative")}>
						<Text
							style={tw`text-[23px] font-bold leading-[31px] text-center font-inter-bold`}
						>
							Check your email
						</Text>
						<Text
							style={tw`mt-4 text-base leading-[21px] text-center font-inter-regular`}
						>
							We have sent you a 6-digit verification code
							{"\n"}
							to activate your account
						</Text>

						<View style={tw`mt-4`}>
							<CodeField
								ref={ref}
								{...props}
								value={value}
								onChangeText={setValue}
								cellCount={6}
								keyboardType="number-pad"
								textContentType="oneTimeCode"
								rootStyle={tw`h-[54px]`}
								renderCell={({ index, symbol, isFocused }) => (
									<Text
										key={index}
										style={[
											tw.style(
												"w-12 h-full rounded-lg border-[1px] border-fans-dark-grey p-2.5",
												"font-inter-semibold text-2xl text-black text-center flex items-center justify-center",
											),
											isFocused && tw`border-fans-purple`,
										]}
										onLayout={getCellOnLayoutHandler(index)}
									>
										{symbol ||
											(isFocused ? <Cursor /> : null)}
									</Text>
								)}
							/>
							{submitted && validateStr && (
								<Text
									style={tw`mt-1 text-sm leading-[21px] text-[#ff0000] mx-auto`}
								>
									{validateStr}
								</Text>
							)}
						</View>

						<RoundButton
							customStyles={"md:mt-7.5"}
							onPress={handleActivate}
						>
							Confirm
						</RoundButton>

						<TextButton
							customStyle={"mt-[14px]"}
							onPress={handleResend}
						>
							Resend code
						</TextButton>

						<View style={tw`flex-auto`}>
							<Text
								style={tw.style(
									"mt-auto",
									"text-base leading-[21px] text-center font-inter-regular",
								)}
							>
								Didn't receive our email? Check your SPAM folder
								or{" "}
								<Text
									style={tw`text-fans-purple`}
									onPress={() => {
										handleTryAnotherEmail();
									}}
								>
									try an another email address
								</Text>
							</Text>
						</View>
					</View>
				</View>
			</ScrollView>
		</View>
	);
};

export default VerifyAccountView;
