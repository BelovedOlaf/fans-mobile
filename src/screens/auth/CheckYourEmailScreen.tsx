import { ChevronLeftSvg, TitleSvg } from "@assets/svgs/common";
import RoundButton from "@components/common/RoundButton";
import TextButton from "@components/common/TextButton";
import {
	authForgotPassword,
	authVerifyCode,
} from "@helper/endpoints/auth/apis";
import tw from "@lib/tailwind";
import { AuthState, accessTokenAtom, authStateAtom } from "@state/auth";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import {
	Image,
	ImageBackground,
	Pressable,
	ScrollView,
	Text,
	View,
} from "react-native";
import {
	CodeField,
	Cursor,
	useBlurOnFulfill,
	useClearByFocusCell,
} from "react-native-confirmation-code-field";
import Spinner from "react-native-loading-spinner-overlay";
import Toast from "react-native-toast-message";
import { useSetRecoilState } from "recoil";

const CheckYourEmailScreen = () => {
	const router = useRouter();
	const { email } = useLocalSearchParams<{ email: string }>();
	const setAccessToken = useSetRecoilState(accessTokenAtom);
	const setAuthState = useSetRecoilState(authStateAtom);
	const [value, setValue] = useState<string>("");
	const [loading, setLoading] = useState<boolean>(false);
	const [submitted, setSubmitted] = useState<boolean>(false);
	const [validateStr, setValidateStr] = useState<string>("");

	const ref = useBlurOnFulfill({ value, cellCount: 6 });
	const [props, getCellOnLayoutHandler] = useClearByFocusCell({
		value,
		setValue,
	});

	const handleNext = (code: string) => {
		setSubmitted(true);
		if (code.length !== 6) {
			setValidateStr("Please enter a valid verification code.");
		} else if (!email) {
			setValidateStr("Please enter a valid email.");
		} else {
			setLoading(true);
			setAuthState(AuthState.Loading);
			authVerifyCode({ email, code: code })
				.then((res) => {
					if (!res.ok) {
						setValidateStr(
							"Please enter a valid verification code.",
						);
						return;
					}

					setAccessToken(res.data.token);
					router.push({
						pathname: "/auth/createNewPassword",
						params: { email },
					});
					setLoading(false);
				})
				.finally(() => {
					setLoading(false);
				});
		}
	};

	const handleResend = () => {
		setLoading(true);
		if (!email) {
			setValidateStr("Please input valid email.");
		} else {
			authForgotPassword({ email })
				.then((res) => {
					Toast.show({
						type: "success",
						text1: "Reset password request email has sent again.",
					});
				})
				.catch((err) => {
					Toast.show({
						type: "error",
						text1: "Email does not exist.",
					});
				})
				.finally(() => {
					setLoading(false);
				});
		}
	};

	const handleTryAnotherEmail = () => {
		// setResetPwdEmail("");
		router.push("/auth/resetPassword");
	};

	const handleChangeFields = (val: string) => {
		setValue(val);
		if (val.length === 6) {
			handleNext(val);
		}
	};

	return (
		<View style={tw`flex-1 flex relative bg-white`}>
			<Spinner
				visible={loading}
				overlayColor="rgba(0,0,0,.5)"
				color="white"
				textStyle={tw`text-white`}
			/>
			<ImageBackground
				source={require("@assets/images/background/auth-bg-2.jpg")}
				style={tw.style(
					"w-full h-full absolute top-0 left-0 hidden md:flex",
				)}
				resizeMode="cover"
			/>
			<ScrollView
				contentContainerStyle={tw.style("flex-1 py-6 px-[18px]")}
			>
				<View
					style={tw.style(
						"flex-1 md:flex-none max-w-[600px] mx-auto md:w-[616px] md:my-auto md:py-20 md:max-w-none",
					)}
				>
					<TitleSvg
						width={306}
						height={61.5}
						style={tw.style("mx-auto hidden md:flex")}
					/>
					<View
						style={tw.style(
							"flex-1 md:flex-none md:bg-white md:rounded-[15px] md:px-10 md:pt-12 md:pb-10 md:mt-13 relative",
						)}
					>
						<Pressable
							style={tw.style(
								"absolute left-9 top-11 hidden md:flex",
							)}
							onPress={() => router.back()}
						>
							<ChevronLeftSvg
								width={8}
								height={14.6}
								color="#707070"
							/>
						</Pressable>
						<View
							style={tw`mt-[100px] w-2/6 mx-auto md:mt-0 md:w-full md:justify-center md:flex-row`}
						>
							<Image
								source={require("@assets/images/send-email.png")}
								style={{ width: 111, height: 94 }}
							/>
						</View>

						<Text
							style={tw`mt-9 text-[23px] font-bold leading-[31px] text-center font-inter-bold md:mt-6`}
						>
							Check your email
						</Text>
						<Text
							style={tw`mt-4 text-base leading-[21px] text-center font-inter-regular`}
						>
							We have sent you a 6-digit code
							{"\n"}
							to recover your password
						</Text>

						<View style={tw`mt-9 flex md:mt-7 md:px-10`}>
							<CodeField
								ref={ref}
								{...props}
								value={value}
								// onChangeText={setValue}
								onChangeText={handleChangeFields}
								cellCount={6}
								keyboardType="number-pad"
								textContentType="oneTimeCode"
								rootStyle={tw`h-[54px] md:h-17`}
								renderCell={({ index, symbol, isFocused }) => (
									<Text
										key={index}
										style={[
											tw.style(
												"w-12 h-full rounded-lg border-[1px] border-fans-dark-grey p-2.5 md:w-15",
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
							customStyles={"mt-[38px] md:mt-[30px]"}
							onPress={() => handleNext(value)}
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
									"mt-auto md:mt-15 md:w-[340px] md:mx-auto",
									"text-base leading-[21px] text-center font-inter-regular",
								)}
							>
								Didn't receive our email? Check under Spam or{" "}
								<Text
									style={tw`text-fans-purple`}
									onPress={() => {
										handleTryAnotherEmail();
									}}
								>
									try another email address
								</Text>
							</Text>
						</View>
					</View>
				</View>
			</ScrollView>
		</View>
	);
};

export default CheckYourEmailScreen;
