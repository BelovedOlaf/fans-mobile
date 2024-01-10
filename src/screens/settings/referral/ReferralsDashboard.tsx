import {
	AnalyticsSvg,
	PayoutSvg,
	PhonewithCashSvg,
	SearchSvg,
} from "@assets/svgs/common";
import RoundButton from "@components/common/RoundButton";
import CustomSwitch from "@components/common/customSwitch";
import AppLayout from "@components/common/layout/layout";
import FansLink from "@components/common/link";
import {
	FansButton3,
	FansChips,
	FansDivider,
	FansGap,
	FansSvg,
	FansText,
	FansTextInput,
	FansView,
} from "@components/controls";
import { Transaction } from "@components/payment";
import { CreatorCard1 } from "@components/refer/CreatorCard";
import tw from "@lib/tailwind";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RoundButtonType } from "@usertypes/commonEnums";
import { Colors } from "@usertypes/enums";
import { useNavigation, useRouter } from "expo-router";
import React, { useState } from "react";
import { ScrollView, View } from "react-native";
import { ReferralProgramNativeStackParams } from ".";
import { CreateLinkSheet } from "@components/sheet/referrals";
import { CreateLinkModal } from "@components/modals/settings/referrals";

const ReferAndEarnScreen = () =>
	// props: ReferralProgramNativeStackScreenProps<"ReferralsDashboard">,
	{
		const balance = 1300.21;

		const navigation =
			useNavigation<
				NativeStackNavigationProp<ReferralProgramNativeStackParams>
			>();
		navigation.setOptions({
			title: "Referrals dashboard",
			headerStyle: tw.style("bg-[#5F17D3]"),
			headerTitleStyle: tw.style(
				"font-inter-bold",
				"text-[19px] text-white",
			),
		});

		const router = useRouter();
		const [autoPayouts, setAutoPayouts] = useState(false);
		const items = [
			{ text: "Latest %" },
			{ text: "Highest earnings" },
			{ text: "Highest CTR" },
			{ text: "Oldest" },
		];
		const [isCreateLinkModalVisible, setCreateLinkModalVisible] =
			useState(false);
		const [isCreateLinkSheetVisible, setCreateLinkSheetVisible] =
			useState(false);
		const [selectedIndex, selectIndex] = useState(0);

		const handleCloseCreateLinkModal = () =>
			setCreateLinkModalVisible(false);

		const handleCloseCreateLinkSheet = () =>
			setCreateLinkSheetVisible(false);

		const handlePressCreateLink = () => setCreateLinkSheetVisible(true);

		const handleSelect = (index: number) => {
			selectIndex(index);
		};

		const handleSubmitCreateLinkSheet = () =>
			setCreateLinkModalVisible(true);

		const onAddPayment = () => {
			// navigation.navigate("GetPaid", { isGreen: true });
			navigation.navigate("PayoutSetup", { id: null, isGreen: true });
		};

		const toAnalytics = () => {
			navigation.navigate("ReferralAnalytics");
		};

		return (
			<AppLayout>
				<ScrollView style={tw.style("relative w-full")}>
					<FansView
						style={tw.style(
							"absolute top-0 bg-[#5F17D3] w-full h-[350px] md:h-[390px]",
						)}
					/>
					<FansView
						style={tw.style(
							"flex mt-[26px] md:mt-[30px] mb-[40px]",
							"mx-[18px] md:mx-auto max-w-[673px]",
						)}
					>
						<FansView style={tw.style("flex items-center")}>
							<FansText
								color="white"
								fontSize={23}
								style={tw.style(
									"font-inter-semibold text-center",
								)}
							>
								Manage Your <br style={tw.style("md:hidden")} />
								Referral Programs
							</FansText>

							<FansView style={tw.style("w-[216px] mt-[30px]")}>
								<RoundButton
									variant={RoundButtonType.OUTLINE_WHITE}
									onPress={toAnalytics}
								>
									<FansView
										style={tw.style(
											"flex flex-row items-center gap-[10px]",
										)}
									>
										<AnalyticsSvg
											width={16}
											color={Colors.White}
										/>
										<FansText
											fontSize={19}
											style={tw.style("font-inter-bold")}
										>
											Analytics
										</FansText>
									</FansView>
								</RoundButton>
							</FansView>
						</FansView>
						<FansView
							style={tw.style(
								"mt-[36px] bg-fans-white px-[17px] py-[22px]  shadow-lg rounded-[15px]",
								"w-full md:hidden",
							)}
						>
							<FansView style={tw.style("flex-row gap-[18px]")}>
								<PhonewithCashSvg width={61} />
								<FansView gap={9}>
									<FansText
										fontFamily="inter-semibold"
										fontSize={23}
									>
										Your balance
									</FansText>
									<FansText
										fontFamily="inter-semibold"
										fontSize={23}
									>
										${balance.toLocaleString()}
									</FansText>
								</FansView>
							</FansView>
							<FansView style={tw.style("w-full mt-[22px]")}>
								<RoundButton
									variant={RoundButtonType.OUTLINE_SECONDARY}
								>
									Payout
								</RoundButton>
							</FansView>
						</FansView>

						<FansView
							style={tw.style(
								"mt-[36px] bg-fans-white px-[43px] py-[22px]  shadow-lg rounded-[15px]",
								"w-full hidden md:flex md:flex-row gap-[66px]",
							)}
						>
							<PhonewithCashSvg width={103} />
							<FansView style={tw.style("")}>
								<FansText
									color="grey-70"
									fontSize={23}
									lineHeight={31}
									style={tw.style("text-center")}
								>
									Your balance
								</FansText>
								<FansText
									fontFamily="inter-semibold"
									fontSize={45}
								>
									${balance.toLocaleString()}
								</FansText>
								<FansGap height={24.3} />
								<FansButton3
									title="Payout"
									buttonStyle={{
										backgroundColor: "white",
										borderColor: "green-4d",
										gap: 4,
									}}
									textStyle1={{ color: "green-4d" }}
									icon={
										<FansSvg
											width={14.68}
											height={14.67}
											svg={PayoutSvg}
											color1="green-4d"
										/>
									}
								/>
							</FansView>
						</FansView>
						<FansView style={tw.style("mt-[31px]")}>
							<FansText fontFamily="inter-bold" fontSize={17}>
								Active links
							</FansText>
							<FansTextInput
								icon={SearchSvg}
								placeholder="Search"
								style={tw.style("mt-[21px]")}
							/>

							<FansGap height={15} />
							<FansChips
								data={items}
								activeColor={Colors.Green}
								selected={selectedIndex}
								onChangeValue={handleSelect}
							/>
						</FansView>

						<FansView style={tw.style("gap-[9px] mt-[23px]")}>
							<CreatorCard1
								back_img={require("@assets/images/background/login-bg.jpg")}
								avatar_img={require("@assets/images/default-avatar.png")}
								earning={1750}
								popularity={20}
								full_name="Natalie White"
								nick_name="@natwhite_"
								verified={true}
								onPressCreateLink={handlePressCreateLink}
							/>
							<CreatorCard1
								back_img={require("@assets/images/background/login-bg.jpg")}
								avatar_img={require("@assets/images/default-avatar.png")}
								earning={1750}
								popularity={20}
								full_name="Lorenzo Atlas"
								nick_name="@lorenzoo"
								verified={true}
							/>
							<CreatorCard1
								back_img={require("@assets/images/background/login-bg.jpg")}
								avatar_img={require("@assets/images/default-avatar.png")}
								earning={1750}
								popularity={20}
								full_name="Natalie White"
								nick_name="@natwhite_"
								verified={true}
							/>
							<CreatorCard1
								back_img={require("@assets/images/background/login-bg.jpg")}
								avatar_img={require("@assets/images/default-avatar.png")}
								earning={1750}
								popularity={20}
								full_name="Lorenzo Atlas"
								nick_name="@lorenzoo"
								verified={true}
							/>
						</FansView>

						<FansDivider
							style={tw.style(
								"w-full my-[38px] md:mt-[52px] md:mb-[46px]",
							)}
						/>

						<FansView style={tw.style("gap-[14px]")}>
							<FansText fontFamily="inter-bold" fontSize={17}>
								Find your perfect Referral Program
							</FansText>
							<FansView style={tw.style("hidden md:flex")}>
								<FansText color="grey-70" fontSize={16}>
									We have created a search engine to help you
									find the best referral program by category,
									revenue share, popular, and more. Go to{" "}
									<FansLink color="green-4d">
										fyp.fans/referrals
									</FansLink>
								</FansText>
							</FansView>
							<RoundButton
								variant={RoundButtonType.OUTLINE_SECONDARY}
								onPress={() =>
									navigation.navigate("FindReferralPrograms")
								}
							>
								Search creators
							</RoundButton>
						</FansView>

						<FansDivider
							style={tw.style(
								"w-full my-[38px] md:mt-[52px] md:mb-[46px]",
							)}
						/>

						<FansView style={tw.style("gap-[11px]")}>
							<FansText fontSize={19}>Payout settings</FansText>
							<FansText color="grey-70" fontSize={16}>
								Edit your payout settings, including how you’d
								like to get paid and your tax information.
							</FansText>
						</FansView>

						<FansView style={tw.style("mt-[25px] gap-[26px]")}>
							<FansView
								style={tw.style("flex-row justify-between")}
							>
								<FansText fontSize={19}>Auto payouts</FansText>
								<CustomSwitch
									value={autoPayouts}
									onValueChange={(val) => setAutoPayouts(val)}
									primary={false}
								/>
							</FansView>
							<RoundButton
								variant={RoundButtonType.OUTLINE_SECONDARY}
								onPress={onAddPayment}
							>
								Add payment method
							</RoundButton>
						</FansView>

						<FansView style={tw.style("mt-[30px]")}>
							<FansText>Payout history</FansText>
						</FansView>
						<FansView style={tw.style("mt-[30px]")}>
							{Array.from(Array(5)).map(() => (
								<Transaction />
							))}
						</FansView>
					</FansView>
					<CreateLinkSheet
						visible={isCreateLinkSheetVisible}
						onClose={handleCloseCreateLinkSheet}
						onSubmit={handleSubmitCreateLinkSheet}
					/>
					<CreateLinkModal
						visible={isCreateLinkModalVisible}
						onClose={handleCloseCreateLinkModal}
						onSubmit={() => {}}
					/>
				</ScrollView>
			</AppLayout>
		);
	};

export default ReferAndEarnScreen;
