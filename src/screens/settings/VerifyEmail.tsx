import { ChevronLeftSvg, TitleSvg } from "@assets/svgs/common";
import RoundButton from "@components/common/RoundButton";
import TextButton from "@components/common/TextButton";
import { FansView } from "@components/controls";
import { UserActionType, useAppContext } from "@context/useAppContext";
import { authResendVerifyCode } from "@helper/endpoints/auth/apis";
import { verifyNewEmail } from "@helper/endpoints/settings/apis";
import tw from "@lib/tailwind";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { OTPPageTypes } from "@usertypes/commonEnums";
import { SettingsNativeStackParams } from "@usertypes/navigations";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import {
	Image,
	ImageBackground,
	Pressable,
	ScrollView,
	Text,
} from "react-native";
import {
	CodeField,
	Cursor,
	useBlurOnFulfill,
	useClearByFocusCell,
} from "react-native-confirmation-code-field";
import Spinner from "react-native-loading-spinner-overlay";
import Toast from "react-native-toast-message";

const VerifyEmailScreen = (
	props: NativeStackScreenProps<SettingsNativeStackParams, "VerifyEmail">,
) => {
	const { navigation, route } = props;
	const { email: newEmail } = route.params;

	const { dispatch } = useAppContext();

	const router = useRouter();
	const { email, otpType } = useLocalSearchParams<{
		email: string;
		otpType: OTPPageTypes;
	}>();

	const [value, setValue] = useState<string>("");
	const [loading, setLoading] = useState<boolean>(false);
	const [submitted, setSubmitted] = useState<boolean>(false);
	const [validateStr, setValidateStr] = useState<string>("");

	const ref = useBlurOnFulfill({ value, cellCount: 6 });
	const [props_, getCellOnLayoutHandler] = useClearByFocusCell({
		value,
		setValue,
	});

	const handleActivate = async () => {
		setSubmitted(true);
		if (value.length !== 6) {
			setValidateStr("Please enter a valid verification code.");
		} else if (!email) {
			setValidateStr("Please enter a valid email.");
		} else {
			setLoading(true);
			const res = await verifyNewEmail({
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
					payload: { data: { email: newEmail } },
				});
				Toast.show({
					type: "success",
					text1: "Success",
				});
				navigation.navigate("Email");
			}
			setLoading(false);
		}
	};

	const handleResend = () => {
		if (!email) return;

		setLoading(true);
		authResendVerifyCode({
			email,
		})
			.then((res) => {
				if (!res.ok) {
					Toast.show({
						type: "error",
						text1: "Failed to resend verification code!",
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
	};

	return (
		<FansView style={tw`flex-1 flex relative bg-white`}>
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
				<FansView
					style={tw.style(
						"flex-1 md:flex-none max-w-[600px] mx-auto md:w-[616px] md:my-auto md:py-20 md:max-w-none",
					)}
				>
					<TitleSvg
						width={306}
						height={61.5}
						style={tw.style("mx-auto hidden md:flex")}
					/>
					<FansView
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
						<FansView
							style={tw`mt-[20px] md:mt-0 flex-row justify-center`}
						>
							<Image
								source={require("@assets/images/send-email.png")}
								style={{ width: 111, height: 94 }}
							/>
						</FansView>

						<Text
							style={tw`mt-9 text-[23px] font-bold leading-[31px] text-center font-inter-bold lg:mt-6`}
						>
							Verify your email change
						</Text>
						<Text
							style={tw`mt-4 text-base leading-[21px] text-center font-inter-regular`}
						>
							We have sent you a 6-digit verification code to your
							new email, please enter it here to confirm the
							change of email address.
						</Text>

						<FansView style={tw`mt-9 flex md:mt-7`}>
							<CodeField
								ref={ref}
								{...props_}
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
							/>
							{submitted && validateStr && (
								<Text
									style={tw`mt-1 text-sm leading-[21px] text-[#ff0000] mx-auto`}
								>
									{validateStr}
								</Text>
							)}
						</FansView>

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

						<FansView style={tw`flex-auto`}>
							<Text
								style={tw.style(
									"mt-auto md:mt-15 md:max-w-[340px] md:mx-auto",
									"text-base leading-[21px] text-center font-inter-regular md:leading-[25px]",
								)}
							>
								Didn't receive our email?{"\n"}Check your spam
								folder.
							</Text>
						</FansView>
					</FansView>
				</FansView>
			</ScrollView>
		</FansView>
	);
};

export default VerifyEmailScreen;
