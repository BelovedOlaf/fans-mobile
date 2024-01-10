import { ExpandSvg, LaunchSvg, ProfitSvg } from "@assets/svgs/common";
import RoundButton from "@components/common/RoundButton";
import RoundTextInput from "@components/common/RoundTextInput";
import CustomSwitch from "@components/common/customSwitch";
import CustomText from "@components/common/customText";
import CustomTopNavBar from "@components/common/customTopNavBar";
import DropdownSelect from "@components/common/dropdownSelect";
import FansInfoCard from "@components/common/infoCard";
import AppLayout, { LayoutContentsContainer } from "@components/common/layout";
import { FansText } from "@components/controls";
import tw from "@lib/tailwind";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ResizeMode, RoundButtonType } from "@usertypes/commonEnums";
import {
	ProfileNavigationStacks,
	SettingsNativeStackParams,
} from "@usertypes/navigations";
import { Video } from "expo-av";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const ReferralProgramScreen = (
	props: NativeStackScreenProps<
		ProfileNavigationStacks | SettingsNativeStackParams,
		"ReferralProgram"
	>,
) => {
	const { route } = props;
	const isSetting = route.params?.isSetting ?? false;

	const router = useRouter();
	const insets = useSafeAreaInsets();

	const onSkip = () => {
		router.push("/profile/create/style");
	};

	const onSave = () => {};

	const handlerClick = () => {
		isSetting ? onSave() : onSkip();
	};

	const [joinProgram, setJoinProgram] = useState(false);
	const [revenueShare, setRevenueShare] = useState("");

	return (
		<AppLayout>
			<View style={tw.style("flex-1")}>
				<ScrollView style={tw.style("flex-1")}>
					<LayoutContentsContainer>
						<CustomTopNavBar
							title="Referral Program"
							onClickLeft={() => router.back()}
							onClickRight={handlerClick}
							rightLabel={isSetting ? "Save" : "Skip"}
						/>
						<View
							style={{
								paddingBottom: insets.bottom + 35,
							}}
						>
							<View style={tw.style("pt-6 px-4.5")}>
								<CustomText
									size="base"
									style="text-center mb-10"
								>
									Accelerate your success with our unique
									Referral Program! Watch your fanbase grow
									rapidly as individuals share your content
									far and wide
								</CustomText>

								<View>
									<FansText
										style={tw.style("text-[19px] mb-1.5")}
									>
										Referral Program
									</FansText>
									<View
										style={tw.style(
											"h-13 flex-row items-center justify-between mb-3",
										)}
									>
										<FansText
											style={tw.style(
												"text-[18px] leading-6 text-black",
											)}
										>
											Join Program
										</FansText>
										<CustomSwitch
											value={joinProgram}
											onValueChange={(val) =>
												setJoinProgram(val)
											}
										/>
									</View>

									<FansInfoCard text="Joining is optional, and you can discontinue program at any time" />

									<View style={tw.style("mb-7.5")}>
										<FansText
											style={tw.style(
												"text-[17px] mb-3 text-black relative",
											)}
										>
											Revenue share
											<Text
												style={tw.style(
													"text-sm absolute top-[-0.5em] text-fans-red",
												)}
											>
												*
											</Text>
										</FansText>
										<CustomText
											size="base"
											style="text-fans-dark-grey mb-4"
										>
											Choose what percent of revenue
											referrers earn from new fans they
											refer
										</CustomText>
										<DropdownSelect
											data={[
												{
													data: "5",
													label: "5%",
												},
												{
													data: "10",
													label: "10%",
												},
												{
													data: "25",
													label: "25%",
												},
												{
													data: "50",
													label: "50%",
												},
											]}
											value={revenueShare}
											setSelected={(val) =>
												setRevenueShare(val)
											}
											placeholder="Revenue share"
										/>
									</View>

									<View style={tw.style("mb-8")}>
										<FansText
											fontSize={17}
											lineHeight={22}
											style={tw.style("mb-3")}
										>
											Upload content
										</FansText>
										<FansText
											color="grey-70"
											fontSize={16}
											lineHeight={21}
											style={tw.style("mb-9")}
										>
											Upload marketing content that
											marketers can use. Attach a google
											drive link that has material
										</FansText>
										<RoundTextInput
											customStyles="text-fans-grey-dark"
											placeholder="drive.google.com/drive/fypfans"
											maxLength={200}
										/>
									</View>
								</View>

								<View style={tw.style("mb-9")}>
									<CustomText size="lg" style="mb-[15px]">
										Video explanation
									</CustomText>
									<Video
										source={require("@assets/video/video-1.mp4")}
										style={tw.style(
											"w-full h-[234px] rounded-[7px] md:h-[350px]",
										)}
										resizeMode={ResizeMode.COVER}
										isMuted={true}
										useNativeControls
										focusable={true}
									/>
								</View>

								{isSetting ? (
									<RoundButton
										variant={RoundButtonType.PRIMARY}
										onPress={onSave}
										disabled={revenueShare === ""}
									>
										Save
									</RoundButton>
								) : (
									<View
										style={tw.style(
											"gap-y-8 mx-[26px] mb-50 mt-6",
										)}
									>
										<View>
											<View
												style={tw.style(
													"flex-row justify-center mb-3",
												)}
											>
												<LaunchSvg size={73} />
											</View>
											<CustomText
												size="base"
												style="text-center mb-3"
											>
												1. Launch
											</CustomText>
											<CustomText
												size="base"
												style="text-center text-fans-dark-grey"
											>
												Setup your referral program by
												picking revenue share given to
												referrers, empowering fans to
												become promoters
											</CustomText>
										</View>

										<View>
											<View
												style={tw.style(
													"flex-row justify-center mb-3",
												)}
											>
												<ExpandSvg size={82} />
											</View>
											<CustomText
												size="base"
												style="text-center mb-3"
											>
												2. Expand
											</CustomText>
											<CustomText
												size="base"
												style="text-center text-fans-dark-grey"
											>
												Fans and expert marketers spread
												your work, attracting new users
												via their unique referral links
											</CustomText>
										</View>

										<View>
											<View
												style={tw.style(
													"flex-row justify-center mb-3",
												)}
											>
												<ProfitSvg size={77.8} />
											</View>
											<CustomText
												size="base"
												style="text-center mb-3"
											>
												3. Profit
											</CustomText>
											<CustomText
												size="base"
												style="text-center text-fans-dark-grey"
											>
												With eaesh successful referral,
												your promoters enjoy a share of
												lifetime earnings, further
												fueling your expansive growth
											</CustomText>
										</View>
									</View>
								)}
							</View>
						</View>
					</LayoutContentsContainer>
				</ScrollView>
			</View>
		</AppLayout>
	);
};

export default ReferralProgramScreen;
