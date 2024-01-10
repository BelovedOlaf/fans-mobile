import FormControl from "@components/common/FormControl";
import RoundButton from "@components/common/RoundButton";
import TextButton from "@components/common/TextButton";
import { FansText } from "@components/controls";
import { SUBSCRIBE_LOGIN_DIALOG_ID } from "@constants/modal";
import { IAppDispatch } from "@context/appContext";
import { CommonActionType, ModalActionType } from "@context/useAppContext";
import { useGoogleAuthRequest, useTwitterAuthRequest } from "@helper/OAuth2";
import { authLogin, authOAuth2Authorize } from "@helper/endpoints/auth/apis";
import { AuthOAuth2AuthorizeReqBody } from "@helper/endpoints/auth/schemas";
import tw from "@lib/tailwind";
import { useFeatureGates } from "@state/featureGates";
import { Auth } from "@usertypes/auth";
import { RoundButtonType, StorageKeyTypes } from "@usertypes/commonEnums";
import { setObjectStorage, setStorage } from "@utils/storage";
import { validateEmail } from "@utils/validateHelper";
import React, { FC, useState } from "react";
import { Platform, View } from "react-native";
import Toast from "react-native-toast-message";

interface Props {
	dispatch: IAppDispatch;
	handleClose: () => void;
	setAuth: (value: Auth | undefined) => void;
	avatar?: string;
}

const LoginView: FC<Props> = (props) => {
	const { dispatch, handleClose, setAuth, avatar } = props;

	const [submitted, setSubmitted] = useState(false);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState<string>("");
	const [loading, setLoading] = useState<boolean>(false);

	const [twitterRequest, twitterResponse, twitterPromptAsync] =
		useTwitterAuthRequest("/auth/login");

	const [googleRequest, googleResponse, googlePromptAsync] =
		useGoogleAuthRequest("/auth/login");

	const [discordRequest, discordResponse, discordPromptAsync] =
		useGoogleAuthRequest("/auth/login");

	const featureGates = useFeatureGates();

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

	const handleSignup = () => {
		dispatch.setModal({
			type: ModalActionType.showModal,
			data: {
				id: SUBSCRIBE_LOGIN_DIALOG_ID,
				show: true,
				payload: { tab: "signup", avatar },
			},
		});
	};

	const handleLogin = async () => {
		setSubmitted(true);

		if (!email || !password) return;

		setLoading(true);

		const resp = await authLogin({ email: email, password: password });
		if (resp.ok) {
			const token = resp.data.token;
			await setStorage(StorageKeyTypes.AccessToken, token);
			await dispatch.fetchProfile();
			await dispatch.fetchUserInfo();
			dispatch.fetchSuggestedCreators();
			setLoading(false);
			handleClose();
			dispatch.setCommon({
				type: CommonActionType.toggleSubscribeModal,
				data: {
					visible: true,
				},
			});
		} else {
			Toast.show({ type: "error", text1: resp.data.message });
			if (resp.data.code === 2011) {
				dispatch.setModal({
					type: ModalActionType.showModal,
					data: {
						id: SUBSCRIBE_LOGIN_DIALOG_ID,
						show: true,
						payload: {
							tab: "verify-account",
							email: email,
							avatar,
						},
					},
				});
			}
			setAuth(undefined);
			setStorage(StorageKeyTypes.AccessToken, null);
			setObjectStorage(StorageKeyTypes.UserInfo, null);
			setLoading(false);
		}
	};

	return (
		<View>
			<FansText
				fontSize={17}
				lineHeight={22}
				style={tw.style("font-semibold mb-3.5")}
			>
				Sign in to subscribe
			</FansText>
			<FormControl
				value={email}
				onChangeText={(text: string) => {
					setEmail(text);
				}}
				placeholder="Username or email"
				hasError={submitted && validateEmail(email).length > 0}
				validateString={"Please input username or email."}
				styles="mb-2.5"
			/>
			<FormControl
				value={password}
				onChangeText={setPassword}
				placeholder="Password"
				hasError={submitted && password === ""}
				validateString={"Please input password"}
				styles="mb-5"
				secureTextEntry
			/>
			<RoundButton onPress={handleLogin} loading={loading}>
				Sign in
			</RoundButton>
			{/* <TextButton
				customStyle="w-auto mx-auto md:mt-[10px]"
				onPress={handleForgot}
			>
				Forgot password?
			</TextButton> */}
			<View style={tw.style("relative justify-center flex-row mt-4.5")}>
				<FansText
					fontSize={16}
					lineHeight={21}
					style={tw.style(
						"px-3 text-[#b1b1b1] bg-white relative z-10",
					)}
				>
					OR
				</FansText>
				<View
					style={tw.style(
						"absolute w-full h-[1px] bg-fans-grey top-[10px]",
					)}
				></View>
			</View>
			<View style={tw`mt-7 flex flex-col gap-[9px]`}>
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
			</View>
			<View style={tw.style("justify-center mt-3.5")}>
				<FansText
					fontSize={17}
					lineHeight={22}
					style={tw.style("font-inter-semibold text-center")}
				>
					Don't have an account?
				</FansText>
				<TextButton onPress={handleSignup}>
					Sign up for FYP.Fans
				</TextButton>
			</View>
		</View>
	);
};

export default LoginView;
