import { ChevronLeftSvg, TitleSvg } from "@assets/svgs/common";
import FormControl from "@components/common/FormControl";
import RoundButton from "@components/common/RoundButton";
import Title from "@components/common/Title";
import CustomTopNavBar from "@components/common/customTopNavBar";
import ConfirmDialog from "@components/common/dialog/ConfirmDialog";
import { authResetPassword } from "@helper/endpoints/auth/apis";
import tw from "@lib/tailwind";
import { validateResetPassword } from "@utils/validateHelper";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import {
	ImageBackground,
	Pressable,
	SafeAreaView,
	ScrollView,
	Text,
	View,
} from "react-native";
import Spinner from "react-native-loading-spinner-overlay";
import Toast from "react-native-toast-message";

const CreateNewPasswordScreen = () => {
	const router = useRouter();
	const { email } = useLocalSearchParams<{ email: string }>();
	const [password, setPassword] = useState<string>("");
	const [confirmPassword, setConfirmPassword] = useState<string>("");
	const [submitted, setSubmitted] = useState<boolean>(false);
	const [loading, setLoading] = useState<boolean>(false);
	const [isShowDlg, setIsShowDlg] = useState(false);

	const handleResetPassword = () => {
		if (email) {
			setSubmitted(true);
			const validate = validateResetPassword({
				password,
				confirmPassword,
			});
			if (
				validate.password.length > 0 ||
				validate.confirmPassword.length > 0
			)
				return;
			setLoading(true);
			authResetPassword({ email, password })
				.then((res) => {
					setIsShowDlg(true);
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

	return (
		<SafeAreaView style={tw`flex-1 flex relative bg-white`}>
			<Spinner
				visible={loading}
				overlayColor="rgba(0,0,0,.5)"
				color="white"
				textStyle={tw`text-white`}
			/>
			<CustomTopNavBar
				title="Create new password"
				onClickLeft={() => router.back()}
				onClickRight={() => {}}
				style="md:hidden"
			/>
			<ImageBackground
				source={require("@assets/images/background/auth-bg-2.jpg")}
				style={tw.style(
					"w-full h-full absolute top-0 left-0 hidden md:flex",
				)}
				resizeMode="cover"
			/>
			<ScrollView
				contentContainerStyle={tw.style(
					"flex-1 py-6 px-[18px] px-[18px]",
				)}
			>
				<View
					style={tw.style(
						"md:w-[616px] md:my-auto md:py-20 md:max-w-none md:mx-auto",
					)}
				>
					<TitleSvg
						width={306}
						height={61.5}
						style={tw.style("mx-auto hidden md:flex")}
					/>
					<View
						style={tw.style(
							"md:bg-white md:rounded-[15px] md:px-10 md:pt-9 md:pb-10 md:mt-13 relative md:h-[600px]",
						)}
					>
						<View
							style={tw.style(
								"mb-9 relative flex-row justify-center hidden md:flex",
							)}
						>
							<Text
								style={tw.style(
									"text-[23px] leading-[31px] font-semibold text-black",
								)}
							>
								Create new password
							</Text>
							<Pressable
								style={tw.style("absolute left-0 top-2")}
								onPress={() => router.back()}
							>
								<ChevronLeftSvg
									width={8}
									height={14.6}
									color="#707070"
								/>
							</Pressable>
						</View>
						<Text
							style={tw`text-center text-base leading-[21px] font-inter-regular`}
						>
							Your new password must be different from previous
							passwords
						</Text>
						<Title style="mb-1 mt-[35px]">New password</Title>
						<FormControl
							placeholder="Password"
							value={password}
							onChangeText={setPassword}
							secureTextEntry={true}
							hasError={
								submitted &&
								validateResetPassword({
									password,
									confirmPassword,
								}).password.length > 0
							}
							validateString={
								validateResetPassword({
									password,
									confirmPassword,
								}).password
							}
						/>
						<FormControl
							styles={tw`mt-2.5`}
							label=""
							placeholder="Confirm password"
							value={confirmPassword}
							onChangeText={setConfirmPassword}
							secureTextEntry={true}
							hasError={
								submitted &&
								validateResetPassword({
									password,
									confirmPassword,
								}).confirmPassword.length > 0
							}
							validateString={
								validateResetPassword({
									password,
									confirmPassword,
								}).confirmPassword
							}
						/>

						<RoundButton
							customStyles={"mt-5"}
							onPress={handleResetPassword}
						>
							Send email
						</RoundButton>
					</View>
				</View>
			</ScrollView>

			{isShowDlg && (
				<ConfirmDialog
					title={"Your password changed successfully"}
					text="Please login with new password"
					onConfirm={() => {
						router.push("/auth/login");
					}}
				/>
			)}
		</SafeAreaView>
	);
};

export default CreateNewPasswordScreen;
