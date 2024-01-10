import { FansText, FansView, FansDivider } from "@components/controls";
import FormControl from "@components/common/FormControl";
import RoundButton from "@components/common/RoundButton";
import CustomRadio from "@components/common/customRadio";
import CustomTopNavBar from "@components/common/customTopNavBar";
import AppLayout, { LayoutContentsContainer } from "@components/common/layout";
import ListLine from "@components/common/listLine";
import SubscriptionBundle from "@components/common/subscriptionBundle";
import { ChevronDownSvg } from "@assets/svgs/common";

import tw from "@lib/tailwind";
import { ProfileActionType, useAppContext } from "@context/useAppContext";
import {
	RoundButtonType,
	StorageKeyTypes,
	SubscriptionTypes,
} from "@usertypes/commonEnums";
import { TextAlignStyle } from "@usertypes/styles";
import { ProfileNavigationStacks } from "@usertypes/navigations";
import * as apis from "@helper/endpoints";

import React, { useState } from "react";
import { useRouter } from "expo-router";
import { Image, ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import Toast from "react-native-toast-message";
import { IProfile } from "@usertypes/types";
import { IdParams } from "@usertypes/params";
import { getStorage, setStorage } from "@utils/storage";

const CreatePageStyleScreen = (
	props: NativeStackScreenProps<ProfileNavigationStacks, "ProfileStyle">,
) => {
	const { navigation } = props;
	const router = useRouter();
	const insets = useSafeAreaInsets();

	const { state, dispatch } = useAppContext();

	const [price, setPrice] = useState("");
	const [inProgress, setInProgress] = useState(false);
	const [isSubmitted, setIsSubmitted] = useState(false);

	const {
		subscriptionType,
		displayName,
		supportNsfw,
		migrationLink,
		profileLink,
	} = state.profile;

	const handleCreateSubscription = async () => {
		const postbody = {
			title: "",
			price: price ? parseFloat(price) : 0,
			currency: "USD",
		};
		await apis.profile.createSubscription(postbody);
		await dispatch.fetchProfile();
		dispatch.setHideLoading();
		navigation.navigate("Profile");
	};

	const handleCreatePage = async () => {
		setIsSubmitted(true);
		if (parseFloat(price ?? "0") > 200 || parseFloat(price ?? "0") < 0) {
			return;
		}
		setInProgress(true);
		const referrerCode = await getStorage(
			StorageKeyTypes.FeatureReferrralCode,
		);
		const resp = await apis.profile.createProfileAndGetId({
			subscriptionType,
			displayName,
			supportNsfw: !!supportNsfw,
			migrationLink,
			profileLink,
			bio: "",
			location: "",
			cover: [],
			referrerCode: referrerCode ?? "",
		});
		if (resp.ok) {
			handleCreateSubscription();
			// if the user clicked on ondato, we start now the processing
			dispatch.fetchUserInfo();
			dispatch.fetchProfile();

			setStorage(StorageKeyTypes.FeatureReferrralCode, undefined);
		} else {
			setInProgress(false);
			Toast.show({ type: "error", text1: "Failed to create account" });
		}
	};

	const onChangeSubscriptionType = (val: SubscriptionTypes) => {
		dispatch.setProfile({
			type: ProfileActionType.updateProfile,
			data: {
				subscriptionType: val,
			},
		});
	};

	return (
		<AppLayout>
			<FansView flex="1">
				<ScrollView style={tw.style("flex-1")}>
					<LayoutContentsContainer>
						<CustomTopNavBar
							title="Page style"
							onClickLeft={() => router.back()}
							onClickRight={handleCreatePage}
							rightLabel="Create"
							loading={inProgress}
						/>
						<FansView
							padding={{ x: 18, t: 24, b: insets.bottom + 24 }}
						>
							<FansText
								fontSize={16}
								lineHeight={21}
								style={tw.style(
									"max-w-[320px] mx-auto mb-[35px] text-center",
								)}
							>
								Select how fans subscribe to your profile page.
								You can change this later.
							</FansText>

							<FansView>
								<FansView
									flexDirection="row"
									alignItems="center"
									margin={{ b: 8 }}
								>
									<CustomRadio
										label="Subscription"
										labelStyles="text-[19px] font-semibold"
										onPress={() =>
											onChangeSubscriptionType(
												SubscriptionTypes.Flat,
											)
										}
										checked={
											subscriptionType ===
											SubscriptionTypes.Flat
										}
									/>
									<FansView
										padding={{ x: 18, y: 6 }}
										borderRadius={30}
										margin={{ l: 24 }}
										background="fans-purple-light"
									>
										<FansText
											color="purple-a8"
											fontSize={13}
											lineHeight={17}
											style={tw.style("font-semibold")}
										>
											RECOMMENDED
										</FansText>
									</FansView>
								</FansView>
								<FansView padding={{ l: 43 }}>
									<FansText
										color="grey-70"
										fontSize={16}
										lineHeight={21}
										style={tw.style("mb-5")}
									>
										Set up subscriptions for your fans. This
										easy, recommended approach, suits most
										creators
									</FansText>

									<FormControl
										label="Price per month (USD)"
										value={price}
										onChangeText={(val: string) =>
											setPrice(val)
										}
										placeholder=""
										// styles="mb-7.5"
										hasError={
											isSubmitted &&
											(parseFloat(price ?? "0") > 200 ||
												parseFloat(price ?? "0") < 0)
										}
										validateString="Price should be max $200"
									/>

									{/* <FansView
										border={1}
										borderRadius={15}
										padding={14}
										borderColor="grey"
									>
										<FansView
											flexDirection="row"
											alignItems="center"
											justifyContent="between"
										>
											<FansText
												fontSize={16}
												lineHeight={21}
												style={tw.style(
													"font-semibold",
												)}
											>
												Subscription bundles
											</FansText>
											<ChevronDownSvg
												width={15}
												height={9}
												color="#707070"
											/>
										</FansView>

										<FansView padding={{ t: 15 }}>
											<SubscriptionBundle
												title="Diamond"
												value="$/month"
											/>
										</FansView>
									</FansView> */}
								</FansView>
							</FansView>

							{/* <FansDivider style={tw.style("my-7.5")} /> */}

							{/* <FansView>
								<CustomRadio
									label="One-time payment"
									labelStyles="text-[19px] font-semibold"
									onPress={() =>
										onChangeSubscriptionType(
											SubscriptionTypes.OneTimePayment,
										)
									}
									checked={
										subscriptionType ===
										SubscriptionTypes.OneTimePayment
									}
								/>
								<FansView margin={12} padding={{ l: 43 }}>
									<FansText
										fontSize={16}
										lineHeight={21}
										color="#707070"
									>
										Let fans unlock premium content with a
										single, hassle-free payment
									</FansText>
									<FansView
										border={1}
										borderRadius={15}
										borderColor="grey-f0"
										padding={{ y: 18, x: 14 }}
										margin={{ t: 26 }}
									>
										<SubscriptionBundle
											title="Purchase"
											value="$15"
											variant="contained"
										/>
									</FansView>
								</FansView>
							</FansView> */}

							<FansDivider style={tw.style("my-7.5")} />

							<FansView margin={{ b: 40 }}>
								<FansView margin={{ b: 8 }}>
									<CustomRadio
										label="Tier"
										labelStyles="text-[19px] font-semibold"
										onPress={() =>
											onChangeSubscriptionType(
												SubscriptionTypes.Tier,
											)
										}
										checked={
											subscriptionType ===
											SubscriptionTypes.Tier
										}
									/>
								</FansView>

								<FansView padding={{ l: 43 }}>
									<FansText
										color="grey-70"
										fontSize={16}
										lineHeight={21}
										style={tw.style("mb-4")}
									>
										Craft tiers with unique fan perks.
										Perfect for creators aiming to give
										additional tier-based access
									</FansText>

									{/* <FansView
										border={1}
										borderRadius={15}
										borderColor="grey"
										padding={14}
									>
										<FansView
											flexDirection="row"
											alignItems="center"
											justifyContent="between"
										>
											<FansText
												fontSize={16}
												lineHeight={21}
												style={tw.style(
													"font-semibold",
												)}
											>
												Subscription bundles
											</FansText>
											<ChevronDownSvg
												width={15}
												height={9}
												color="#707070"
											/>
										</FansView>

										<FansView padding={{ t: 15 }}>
											<FansView
												border={1}
												borderRadius={7}
												borderColor="grey"
											>
												<Image
													source={require("@assets/images/posts/post-img-2.png")}
													alt=""
													style={tw.style(
														"w-full h-[62px] rounded-t-[7px]",
													)}
													resizeMode="cover"
												/>
												<FansView
													padding={{
														t: 10,
														b: 20,
														x: 14,
													}}
												>
													<FansText
														fontSize={17}
														lineHeight={22}
														style={tw.style(
															"mb-1 font-bold text-center",
														)}
													>
														Diamond
													</FansText>
													<FansView
														justifyContent="center"
														flexDirection="row"
														margin={{ b: 10 }}
													>
														<FansText
															color="purple-a8"
															fontSize={18}
															lineHeight={24}
															style={tw.style(
																"font-bold",
															)}
														>
															$20
															<FansText
																color="purple-a8"
																fontSize={13}
																lineHeight={17}
																style={tw.style(
																	"font-bold",
																)}
															>
																{" PER MONTH"}
															</FansText>
														</FansText>
													</FansView>

													<FansView
														width={108}
														margin={{ b: 16 }}
														style={tw.style(
															"mx-auto",
														)}
													>
														<RoundButton
															variant={
																RoundButtonType.OUTLINE_PRIMARY
															}
														>
															Join
														</RoundButton>
													</FansView>

													<FansDivider
														style={tw.style(
															"mb-3 mt-4",
														)}
													/>

													<FansView
														gap={10}
														style={tw.style(
															"mx-auto",
														)}
													>
														<ListLine text="New photos every day" />
														<ListLine text="Exclusive yoga exercises" />
														<ListLine text="Access to weekly playlists" />
														<ListLine text="Live videos every 15 days" />
													</FansView>
												</FansView>
											</FansView>
										</FansView>
									</FansView> */}
								</FansView>
							</FansView>

							<RoundButton
								variant={RoundButtonType.PRIMARY}
								onPress={handleCreatePage}
							>
								Create page
							</RoundButton>
						</FansView>
					</LayoutContentsContainer>
				</ScrollView>
			</FansView>
		</AppLayout>
	);
};

export default CreatePageStyleScreen;
