import FormControl from "@components/common/FormControl";
import RoundButton from "@components/common/RoundButton";
import TextButton from "@components/common/TextButton";
import { FansText, FansView } from "@components/controls";
import { SUBSCRIBE_LOGIN_DIALOG_ID } from "@constants/modal";
import { IAppDispatch } from "@context/appContext";
import { CommonActionType, ModalActionType } from "@context/useAppContext";
import { useGoogleAuthRequest, useTwitterAuthRequest } from "@helper/OAuth2";
import { btoaurl } from "@helper/Utils";
import { authOAuth2Authorize, authRegister } from "@helper/endpoints/auth/apis";
import { AuthOAuth2AuthorizeReqBody } from "@helper/endpoints/auth/schemas";
import tw from "@lib/tailwind";
import { useFeatureGates } from "@state/featureGates";
import {
	OTPPageTypes,
	RoundButtonType,
	StorageKeyTypes,
} from "@usertypes/commonEnums";
import { ISignUpForm } from "@usertypes/commonTypes";
import { setObjectStorage, setStorage } from "@utils/storage";
import { validateSignUpForm } from "@utils/validateHelper";

import React, { FC, useState } from "react";
import { Platform } from "react-native";
import Toast from "react-native-toast-message";

interface Props {
	dispatch: IAppDispatch;
	handleClose: () => void;
	avatar?: string;
}

const SignupView: FC<Props> = (props) => {
	const { dispatch, handleClose, avatar } = props;

	const [formData, setFormData] = useState<ISignUpForm>({
		username: "",
		email: "",
		password: "",
	});
	const [formValidate, setFormValidate] = useState<ISignUpForm>({
		username: "",
		email: "",
		password: "",
	});

	const [submitted, setSubmitted] = useState<boolean>(false);
	const [loading, setLoading] = useState<boolean>(false);

	const [twitterRequest, twitterResponse, twitterPromptAsync] =
		useTwitterAuthRequest("/auth/register");

	const [googleRequest, googleResponse, googlePromptAsync] =
		useGoogleAuthRequest("/auth/register");

	const [discordRequest, discordResponse, discordPromptAsync] =
		useGoogleAuthRequest("/auth/register");

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

	const handleSignUp = () => {
		setSubmitted(true);

		const temp = validateSignUpForm(formData);
		setFormValidate({ ...temp });

		if (temp.username || temp.email || temp.password) return;

		setLoading(true);
		authRegister({
			username: formData.username,
			email: formData.email,
			password: formData.password,
		})
			.then((resp) => {
				if (!resp.ok) {
					const code = resp.data.code;
					if (code === 1020) {
						setFormValidate({
							...formValidate,
							username: resp.data.message,
						});
					} else if (code === 2010) {
						setFormValidate({
							...formValidate,
							email: resp.data.message,
						});
					} else {
						Toast.show({
							type: "error",
							text1: resp.data.message,
						});
					}
					return;
				}

				dispatch.setModal({
					type: ModalActionType.showModal,
					data: {
						id: SUBSCRIBE_LOGIN_DIALOG_ID,
						show: true,
						payload: {
							tab: "verify-account",
							otpType: OTPPageTypes.VerifyAccountOTP,
							email: formData.email,
							username: formData.username,
							password: btoaurl(formData.password),
							avatar,
						},
					},
				});
			})
			.finally(() => {
				setLoading(false);
			});
	};

	const onClickLogin = () => {
		dispatch.setModal({
			type: ModalActionType.showModal,
			data: {
				id: SUBSCRIBE_LOGIN_DIALOG_ID,
				show: true,
				payload: { tab: "login", avatar },
			},
		});
	};

	const handleChangeValue = (changedValue: ISignUpForm) => {
		setFormData(changedValue);
		setFormValidate(validateSignUpForm(changedValue));
	};

	return (
		<FansView>
			<FansText
				fontSize={17}
				lineHeight={22}
				style={tw.style("font-semibold mb-3.5")}
			>
				Sign up to subscribe
			</FansText>
			<FormControl
				value={formData.username}
				placeholder="Username"
				onChangeText={(text: string) =>
					handleChangeValue({
						...formData,
						username: text,
					})
				}
				hasError={submitted && !!formValidate.username}
				validateString={formValidate.username}
				styles="md:mb-[10px]"
				maxLength={30}
			/>

			<FormControl
				value={formData.email}
				placeholder="Email"
				onChangeText={(text: string) =>
					handleChangeValue({
						...formData,
						email: text,
					})
				}
				hasError={submitted && !!formValidate.email}
				validateString={formValidate.email}
				styles="md:mb-[10px]"
			/>

			<FormControl
				secureTextEntry
				value={formData.password}
				placeholder="Password"
				onChangeText={(text: string) =>
					handleChangeValue({
						...formData,
						password: text,
					})
				}
				hasError={submitted && !!formValidate.password}
				validateString={formValidate.password}
			/>

			<RoundButton
				onPress={handleSignUp}
				loading={loading}
				customStyles={"mt-[10px] md:mt-[18px]"}
			>
				Sign up
			</RoundButton>

			<FansView gap={9} margin={{ t: 16 }}>
				<RoundButton
					variant={RoundButtonType.OUTLINE_PRIMARY}
					onPress={() => {
						googlePromptAsync();
					}}
				>
					Sign up with Google
				</RoundButton>

				{featureGates.has("2023_11-twitter-oauth2") && (
					<RoundButton
						variant={RoundButtonType.OUTLINE_PRIMARY}
						onPress={() => {
							twitterPromptAsync();
						}}
					>
						Sign up with Twitter
					</RoundButton>
				)}

				<RoundButton
					variant={RoundButtonType.OUTLINE_PRIMARY}
					onPress={() => {
						discordPromptAsync();
					}}
				>
					Sign up with Discord
				</RoundButton>
			</FansView>
			<FansView justifyContent="center" margin={{ t: 14 }}>
				<FansText
					fontSize={17}
					lineHeight={22}
					style={tw.style("font-inter-semibold text-center")}
				>
					Already have an account?
				</FansText>
				<TextButton onPress={onClickLogin}>Log in</TextButton>
			</FansView>
		</FansView>
	);
};

export default SignupView;
