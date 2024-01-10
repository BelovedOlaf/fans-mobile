import { useRouter } from "expo-router";
import { openBrowserAsync } from "expo-web-browser";
import { useSetRecoilState } from "recoil";

import React, { useCallback, useState } from "react";
import {
	Image,
	ImageBackground,
	Platform,
	Pressable,
	ScrollView,
	Text,
	View,
} from "react-native";
import Spinner from "react-native-loading-spinner-overlay";
import Toast from "react-native-toast-message";

import { TitleSvg } from "@assets/svgs/common";
import FormControl from "@components/common/FormControl";
import RoundButton from "@components/common/RoundButton";
import TextButton from "@components/common/TextButton";
import Title from "@components/common/Title";
import { FansText, FansTextInput5 } from "@components/controls";
import { useAppContext } from "@context/useAppContext";
import {
	useDiscordAuthRequest,
	useGoogleAuthRequest,
	useTwitterAuthRequest,
} from "@helper/OAuth2";
import {
	authLogin,
	authOAuth2Authorize,
	authUserInfo,
} from "@helper/endpoints/auth/apis";
import { AuthOAuth2AuthorizeReqBody } from "@helper/endpoints/auth/schemas";
import tw from "@lib/tailwind";
import { AuthState, authAtom, authStateAtom } from "@state/auth";
import { useFeatureGates } from "@state/featureGates";
import {
	OTPPageTypes,
	RoundButtonType,
	StorageKeyTypes,
} from "@usertypes/commonEnums";
import {
	setObjectStorage,
	setStorage,
	takeVolatileStorage,
} from "@utils/storage";
import { validateEmail } from "@utils/validateHelper";

const LoginScreen = () => {
	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [submitted, setSubmitted] = useState<boolean>(false);
	const [loading, setLoading] = useState<boolean>(false);
	const router = useRouter();

	const setAuth = useSetRecoilState(authAtom);
	const setAuthState = useSetRecoilState(authStateAtom);

	const { dispatch } = useAppContext();
	const featureGates = useFeatureGates();

	const [twitterRequest, twitterResponse, twitterPromptAsync] =
		useTwitterAuthRequest("/auth/login");

	const [googleRequest, googleResponse, googlePromptAsync] =
		useGoogleAuthRequest("/auth/login");

	const [discordRequest, discordResponse, discordPromptAsync] =
		useDiscordAuthRequest("/auth/login");

	React.useEffect(() => {
		let provider: string | null = null;
		const body: AuthOAuth2AuthorizeReqBody = {
			code: "",
			redirectUri: "",
			codeVerifier: undefined,
		};

		if (twitterRequest && twitterResponse?.type === "success") {
			provider = "twitter";
			body.code = twitterResponse.params.code;
			body.redirectUri = twitterRequest.redirectUri;
			body.codeVerifier = twitterRequest.codeVerifier;
		} else if (googleRequest && googleResponse?.type === "success") {
			provider =
				Platform.OS === "ios"
					? "google_ios"
					: Platform.OS === "android"
					? "google_android"
					: "google_web";
			body.code = googleResponse.params.code;
			body.redirectUri = googleRequest.redirectUri;
			body.codeVerifier = googleRequest.codeVerifier;
		} else if (discordRequest && discordResponse?.type === "success") {
			provider = "discord";
			body.code = discordResponse.params.code;
			body.redirectUri = discordRequest.redirectUri;
			body.codeVerifier = discordRequest.codeVerifier;
		}

		if (!provider) return;

		setLoading(true);
		setAuthState(AuthState.Loading);
		authOAuth2Authorize(body, {
			provider,
		})
			.then(async (resp) => {
				if (!resp.ok) {
					Toast.show({
						type: "error",
						text1: resp.data.message,
					});
					setStorage(StorageKeyTypes.AccessToken, null);
					setObjectStorage(StorageKeyTypes.UserInfo, null);
					return;
				}

				await setStorage(StorageKeyTypes.AccessToken, resp.data.token);
				// await fetchUserInfo();

				const redirectUrl =
					takeVolatileStorage(StorageKeyTypes.RedirectAfterLogin) ??
					"/posts";
				router.replace(redirectUrl);
			})
			.catch((error) => {
				console.error(error);
			})
			.finally(() => {
				setLoading(false);
			});
	}, [
		twitterRequest,
		googleRequest,
		twitterResponse,
		googleResponse,
		discordRequest,
		discordResponse,
	]);

	const fetchUserInfo = async () => {
		const resp = await authUserInfo();
		if (resp.ok) {
			await setObjectStorage(StorageKeyTypes.UserInfo, {
				id: resp.data.id,
				avatar: resp.data.avatar,
				email: resp.data.email,
				username: resp.data.username,
				phonenumber: resp.data.phonenumber,
				type: resp.data.type,
				profileId: resp.data.profile?.id ?? "",
				displayName: resp.data.profile?.displayName ?? "",
			});
			setAuth({
				username: resp.data.username,
				email: resp.data.email,
			});
		}
	};

	const handleLogin = async () => {
		setSubmitted(true);

		if (!email || !password) return;

		setLoading(true);
		setAuthState(AuthState.Loading);

		const resp = await authLogin({ email: email, password: password });
		if (resp.ok) {
			const token = resp.data.token;
			await setStorage(StorageKeyTypes.AccessToken, token);
			await dispatch.fetchProfile();
			await fetchUserInfo();
			setLoading(false);

			const redirectUrl =
				takeVolatileStorage(StorageKeyTypes.RedirectAfterLogin) ??
				"/posts";
			router.replace(redirectUrl);
		} else {
			Toast.show({ type: "error", text1: resp.data.message });
			if (resp.data.code === 2011) {
				router.push({
					pathname: "/auth/verifyAccount",
					params: {
						otpType: OTPPageTypes.VerifyAccountOTP,
						email,
					},
				});
			}
			setAuth(undefined);
			setStorage(StorageKeyTypes.AccessToken, null);
			setObjectStorage(StorageKeyTypes.UserInfo, null);
			setLoading(false);
		}
	};

	const handleForgot = () => {
		router.push("/auth/resetPassword");
	};

	const handleSignup = () => {
		router.push("/auth/register");
	};

	const handleContactUs = useCallback(() => {
		router.push("/support");
	}, []);

	const onGoToPrivacy = () => {
		openBrowserAsync(
			"https://app.termly.io/document/privacy-policy/8234c269-74cc-48b6-9adb-be080aaaee11",
		);
	};

	return (
		<View style={tw.style("flex-1 relative bg-white")}>
			<ImageBackground
				source={require("@assets/images/background/login-bg.jpg")}
				style={tw.style(
					"w-full h-full absolute top-0 left-0 hidden md:flex",
				)}
				resizeMode="cover"
			/>
			<Spinner
				visible={loading}
				overlayColor="rgba(0,0,0,.5)"
				color="white"
				textStyle={tw`text-white`}
			/>
			<ScrollView contentContainerStyle={tw.style("flex-1")}>
				<View
					style={tw.style(
						"flex-1 md:w-[616px] md:mx-auto md:py-20 md:my-auto md:flex-none",
					)}
				>
					<View style={tw.style("relative md:hidden")}>
						<Image
							source={require("@assets/images/login-banner.jpg")}
							style={tw.style("w-full h-[238px]")}
							resizeMode="cover"
						/>
						<View
							style={tw.style(
								"absolute bottom-[30px] w-full flex justify-center items-center",
							)}
						>
							<TitleSvg width={189} height={38} color="#fff" />
						</View>
					</View>

					<TitleSvg
						width={306}
						height={61.5}
						style={tw.style("mx-auto hidden md:flex")}
						color="#fff"
					/>

					<View
						style={tw.style(
							"mt-[-12px] md:mt-13",
							"flex-1 flex flex-col rounded-tl-[15px] rounded-tr-[15px] md:rounded-[15px]",
							"h-full py-10 px-[18px] bg-white md:pt-9 md:px-10",
						)}
					>
						<View style={tw`flex flex-col gap-2 md:gap-0`}>
							<Title style="mb-1.5 md:text-center md:text-[23px] md:leading-[31px] md:mb-7">
								Sign in
							</Title>
							<FormControl
								value={email}
								onChangeText={(text: string) => {
									setEmail(text);
								}}
								placeholder="Username or email"
								hasError={
									submitted && validateEmail(email).length > 0
								}
								validateString={
									"Please input username or email."
								}
								styles="md:mb-[10px]"
							/>

							<FansTextInput5
								value={password}
								textInputStyle={{
									placeholder: "Password",
									secureTextEntry: true,
								}}
								onChangeText={setPassword}
								/*hasError={submitted && password.length === 0}
								validateString={"Please input password."}*/
							/>

							<RoundButton
								onPress={handleLogin}
								customStyles={"mt-[10px] md:mt-[18px]"}
							>
								Sign in
							</RoundButton>
							<TextButton
								customStyle="w-auto mx-auto md:mt-[10px]"
								onPress={handleForgot}
							>
								Forgot password?
							</TextButton>
						</View>
						<View style={tw`mt-[50px] flex flex-col gap-[9px]`}>
							<RoundButton
								variant={RoundButtonType.OUTLINE_PRIMARY}
								onPress={() => {
									googlePromptAsync();
								}}
							>
								Sign in with Google
							</RoundButton>

							{featureGates.has("2023_11-twitter-oauth2") && (
								<RoundButton
									variant={RoundButtonType.OUTLINE_PRIMARY}
									onPress={() => {
										twitterPromptAsync();
									}}
								>
									Sign in with Twitter
								</RoundButton>
							)}

							<RoundButton
								variant={RoundButtonType.OUTLINE_PRIMARY}
								onPress={() => {
									discordPromptAsync();
								}}
							>
								Sign in with Discord
							</RoundButton>

							<View
								style={tw.style(
									"flex-row pl-5 items-center mt-3 mx-auto",
								)}
							>
								<Pressable
									onPress={() => {
										router.push("/terms");
									}}
								>
									<FansText
										color="grey-70"
										fontSize={16}
										lineHeight={21}
									>
										Terms of Use
									</FansText>
								</Pressable>
								<View
									style={tw.style(
										"w-1 h-1 bg-fans-dark-grey rounded-full mx-2",
									)}
								></View>
								<Pressable onPress={onGoToPrivacy}>
									<FansText
										color="grey-70"
										fontSize={16}
										lineHeight={21}
									>
										Privacy policy
									</FansText>
								</Pressable>
								<View
									style={tw.style(
										"w-1 h-1 bg-fans-dark-grey rounded-full mx-2",
									)}
								></View>
								<Pressable onPress={handleContactUs}>
									<FansText
										color="grey-70"
										fontSize={16}
										lineHeight={21}
									>
										Contact us
									</FansText>
								</Pressable>
							</View>
						</View>
						<View
							style={tw`mt-10 flex flex-row justify-center items-center`}
						>
							<Text
								style={tw.style(
									"text-[17px] leading-[22px] font-inter-semibold",
								)}
							>
								Don't have an account?
							</Text>
							<TextButton onPress={handleSignup}>
								Sign up
							</TextButton>
						</View>
					</View>
				</View>
			</ScrollView>
		</View>
	);
};

export default LoginScreen;
