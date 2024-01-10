import { ChevronLeftSvg, TitleSvg } from "@assets/svgs/common";
import tw from "@lib/tailwind";
import { OTPPageTypes, StorageKeyTypes } from "@usertypes/commonEnums";
import React, { useState } from "react";
import {
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

import { EmailImage } from "@assets/svgs";
import RoundButton from "@components/common/RoundButton";
import TextButton from "@components/common/TextButton";
import { FansSvg } from "@components/controls";
import { useAppContext } from "@context/useAppContext";
import { atoburl } from "@helper/Utils";
import {
	authResendVerifyCode,
	authVerifyAccount,
	authVerifyRegister,
} from "@helper/endpoints/auth/apis";
import { setStorage, takeVolatileStorage } from "@utils/storage";
import { useLocalSearchParams, useRouter } from "expo-router";

const VerifyAccountScreen = () => {
	const router = useRouter();
	const { dispatch } = useAppContext();

	const { email, username, password, otpType } = useLocalSearchParams<{
		email: string;
		username?: string;
		password?: string;
		otpType: OTPPageTypes;
	}>();
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
								text1: "Invalid verification code.",
							});
							setLoading(false);
							return;
						}

						Toast.show({
							type: "success",
							text1: "Your account has been activated successfully.",
						});

						const token = resp.data.token;
						await setStorage(StorageKeyTypes.AccessToken, token);

						await dispatch.fetchUserInfo();

						setLoading(false);
						// router.replace("/");
						router.replace({
							pathname: "profile",
							params: { screen: "ProfileName" },
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
							text1: "Invalid verification code.",
						});
						setLoading(false);
						return;
					}
					Toast.show({
						type: "success",
						text1: "Your account has been created successfully.",
					});
					const token = resp.data.token;
					await setStorage(StorageKeyTypes.AccessToken, token);

					await dispatch.fetchUserInfo();

					setLoading(false);

					const redirectUrl =
						takeVolatileStorage(
							StorageKeyTypes.RedirectAfterLogin,
						) ?? "/posts";
					router.replace(redirectUrl);
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
							style={tw`mt-[100px] md:mt-0 flex-row justify-center`}
						>
							<FansSvg
								width={110.74}
								height={93.36}
								svg={EmailImage}
							/>
						</View>

						<Text
							style={tw`mt-9 text-[23px] font-bold leading-[31px] text-center font-inter-bold lg:mt-6`}
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

						<View style={tw`mt-9 flex md:mt-7`}>
							<CodeField
								ref={ref}
								{...props}
								value={value}
								onChangeText={setValue}
								cellCount={6}
								keyboardType="number-pad"
								textContentType="oneTimeCode"
								rootStyle={tw`h-[54px] md:h-17`}
								renderCell={({ index, symbol, isFocused }) => (
									<Text
										key={index}
										style={[
											tw.style(
												"w-12 h-full rounded-lg border-[1px] border-fans-dark-grey p-2.5 md:w-[62px]",
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
								textInputStyle={tw.style("h-full")}
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
							customStyles={"mt-[38px] md:mt-7.5"}
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
									"mt-auto md:mt-15 md:max-w-[340px] md:mx-auto",
									"text-base leading-[21px] text-center font-inter-regular md:leading-[25px]",
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

export default VerifyAccountScreen;
