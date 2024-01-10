import {
	FansText,
	FansView,
	FansDivider,
	FansIconButton,
} from "@components/controls";
import RoundButton from "@components/common/RoundButton";
import RoundTextInput from "@components/common/RoundTextInput";
import CustomTopNavBar from "@components/common/customTopNavBar";
import DropdownSelect from "@components/common/dropdownSelect";
import AppLayout, { LayoutContentsContainer } from "@components/common/layout";
import {
	PromotionCampaign,
	SubscriptionTier,
	SwitchSubscriptionModal,
	SwitchTierModal,
} from "@components/profiles";
import CustomSwitch from "@components/common/customSwitch";
import { DndTriggerSvg, EditSvg, TrashSvg } from "@assets/svgs/common";

import tw from "@lib/tailwind";
import { defaultSubscriptions, pageStyleOptions } from "@constants/common";
import { ProfileActionType, useAppContext } from "@context/useAppContext";
import { RoundButtonType, SubscriptionTypes } from "@usertypes/commonEnums";
import { ProfileNavigationStacks } from "@usertypes/navigations";
import { IBundle, ICampaign, ISubscriptionTier } from "@usertypes/types";
import * as apis from "@helper/endpoints";
import {
	deleteBundle,
	deleteCampaign,
	deleteTier,
	updateSubscriptionById,
} from "@helper/endpoints/profile/apis";

import { NativeStackScreenProps } from "@react-navigation/native-stack";

import React, { FC, Fragment, useEffect, useState } from "react";
import { ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";

interface BundleItemProps {
	onClickEdit: () => void;
	data: IBundle;
	onClickDelete: () => void;
}

const BundleItem: FC<BundleItemProps> = (props) => {
	const { onClickEdit, data, onClickDelete } = props;

	return (
		<FansView>
			<FansView height={52} flexDirection="row" alignItems="center">
				<DndTriggerSvg width={9.8} height={16.14} color="#000" />
				<FansText
					fontSize={18}
					lineHeight={24}
					style={tw.style("text-black ml-9 mr-auto")}
				>
					{`${data.month} months`}
				</FansText>

				<FansView flexDirection="row" alignItems="center" gap={8}>
					<CustomSwitch value={true} onValueChange={(val) => {}} />
					<FansIconButton
						containerColor="#f0f0f0"
						size={34}
						onPress={onClickEdit}
					>
						<EditSvg width={12.94} height={13.5} color="#000" />
					</FansIconButton>
					<FansIconButton
						containerColor="#f0f0f0"
						size={34}
						onPress={onClickDelete}
					>
						<TrashSvg
							width={11.87}
							height={14.76}
							color="#eb2121"
						/>
					</FansIconButton>
				</FansView>
			</FansView>
			<FansDivider />
		</FansView>
	);
};

const SubscriptionScreen = (
	props: NativeStackScreenProps<ProfileNavigationStacks, "Subscription">,
) => {
	const { navigation } = props;
	const insets = useSafeAreaInsets();

	const { state, dispatch } = useAppContext();

	const profile = state.profile;
	const { subscriptions, tiers, subscriptionType } = state.profile;
	const subscription = subscriptions[0] ?? defaultSubscriptions;

	const [openTierModal, setOpenTierModal] = useState(false);
	const [openSubscriptionModal, setOpenSubscriptionModal] = useState(false);
	const [inProgress, setInProgress] = useState(false);

	const [pageStyle, setPageStyle] = useState<SubscriptionTypes>(
		SubscriptionTypes.Flat,
	);
	const [price, setPrice] = useState("0");

	const onChangePageStyle = (val: SubscriptionTypes) => {
		if (pageStyle !== val) {
			if (val === SubscriptionTypes.Flat) {
				setOpenSubscriptionModal(true);
			} else {
				setOpenTierModal(true);
			}
		}
	};

	const handleUpdate = async () => {
		setInProgress(true);
		const postbody = {
			title: "",
			price: parseFloat(price),
			currency: "USD",
		};

		const resp = await updateSubscriptionById(postbody, {
			id: subscription.id,
		});
		if (resp.ok) {
			const data = {
				title: "",
				currency: "USD",
				price: parseFloat(price),
			};

			dispatch.setProfile({
				type: ProfileActionType.updateSubscription,
				data: data,
			});
			navigation.goBack();
		} else {
			Toast.show({
				type: "error",
				text1: "Failed to update",
			});
		}
		setInProgress(false);
	};

	const handleUpdatePageStyle = async () => {
		if (pageStyle !== subscriptionType) {
			setInProgress(true);
			const resp = await apis.profile.updateMyProfile({
				subscriptionType: pageStyle as SubscriptionTypes,
			});
			setInProgress(false);
			if (resp.ok) {
				dispatch.setProfile({
					type: ProfileActionType.updateProfile,
					data: {
						subscriptionType: pageStyle,
					},
				});
			} else {
				Toast.show({
					type: "error",
					text1: resp.data.message,
				});
			}
		}
	};

	const handleSave = async () => {
		if (parseFloat(price ?? "0") > 200 || parseFloat(price ?? "0") < 0) {
			Toast.show({
				type: "error",
				text1:
					parseFloat(price ?? "0") < 0
						? "The price can be min $200."
						: "The price can be max $200.",
			});
			return;
		}
		let bundlePriceOver = false;
		if (subscription.bundles.length > 0) {
			subscription.bundles.forEach((bundle) => {
				const bundlePrice =
					(parseFloat(price ?? "0") *
						bundle.month *
						bundle.discount) /
					100;
				if (bundlePrice > 200) {
					bundlePriceOver = true;
				}
			});
		}
		if (bundlePriceOver) {
			Toast.show({
				type: "error",
				text1: "Subscription price can be max $200.",
			});
			return;
		}
		await handleUpdatePageStyle();
		dispatch.setProfile({
			type: ProfileActionType.updateProfile,
			data: {
				subscriptionType: pageStyle,
			},
		});
		if (pageStyle === SubscriptionTypes.Flat) {
			handleUpdate();
		} else {
			dispatch.setHideLoading();
			navigation.goBack();
		}
	};

	const handleDeleteBundle = async (bundle: IBundle) => {
		if (bundle.isNew) {
			dispatch.setProfile({
				type: ProfileActionType.updateBundles,
				data: subscription.bundles.filter((el) => el.id !== bundle.id),
			});
		} else {
			setInProgress(true);
			const resp = await deleteBundle(
				{ id: bundle.id },
				{ id: bundle.id ?? "" },
			);
			if (resp.ok) {
				let bundles = subscription.bundles;
				bundles = bundles.filter((el) => el.id !== bundle.id);

				dispatch.setProfile({
					type: ProfileActionType.updateBundles,
					data: bundles,
				});
			} else {
				Toast.show({
					type: "error",
					text1: "Failed to delete bundle",
				});
			}
			setInProgress(false);
		}
	};

	const handleDeleteTier = async (tier: ISubscriptionTier) => {
		setInProgress(true);
		const resp = await deleteTier({ id: tier.id }, { id: tier.id });
		if (resp.ok) {
			dispatch.setProfile({
				type: ProfileActionType.updateProfile,
				data: {
					tiers: tiers.filter((el) => el.id !== tier.id),
				},
			});
		} else {
			Toast.show({
				type: "error",
				text1: "Failed to delete tier",
			});
		}
		setInProgress(false);
	};

	const handleDeleteCampaign = async (campaign: ICampaign) => {
		if (campaign.isNew) {
			dispatch.setProfile({
				type: ProfileActionType.updateSubscription,
				data: {
					campaigns: subscription.campaigns.filter(
						(el) => el.id !== campaign.id,
					),
				},
			});
		} else {
			setInProgress(true);
			const resp = await deleteCampaign(
				{ id: campaign.id },
				{ id: campaign.id ?? "" },
			);
			if (resp.ok) {
				let campaigns = subscription.campaigns;
				campaigns = campaigns.filter((el) => el.id !== campaign.id);

				dispatch.setProfile({
					type: ProfileActionType.updateSubscription,
					data: {
						campaigns: campaigns,
					},
				});
			} else {
				Toast.show({
					type: "error",
					text1: "Failed to delete campaign",
				});
			}
			setInProgress(false);
		}
	};

	const handleBack = async () => {
		await handleUpdatePageStyle();
		navigation.goBack();
	};

	const onClickAddBundle = () => {
		navigation.navigate("Bundle", {
			id: null,
			price: parseFloat(price ?? "0"),
		});
	};

	const onClickEditBundle = (bundleId: string) => {
		navigation.navigate("Bundle", {
			id: bundleId,
			price: parseFloat(price ?? "0"),
		});
	};

	useEffect(() => {
		if (subscription?.id) {
			setPageStyle(profile.subscriptionType as SubscriptionTypes);
			setPrice(subscription.price.toString());
		}
	}, [subscription?.id]);

	return (
		<AppLayout
			title="Edit Profile | FYP.Fans"
			description="FYP.Fans allows creators to make an income doing what they love!"
		>
			<FansView flex="1">
				<ScrollView style={tw.style("flex-1")}>
					<LayoutContentsContainer>
						<CustomTopNavBar
							title="Subscription"
							onClickLeft={handleBack}
							onClickRight={handleSave}
							rightLabel="Save"
							loading={inProgress}
						/>
						<FansView
							padding={{ x: 18, t: 24, b: insets.bottom + 35 }}
						>
							<FansView margin={{ b: 32 }}>
								<FansText
									fontSize={17}
									lineHeight={22}
									style={tw.style("mb-[14px] font-semibold")}
								>
									Page style
								</FansText>
								<DropdownSelect
									data={pageStyleOptions}
									value={pageStyle}
									setSelected={(val) =>
										onChangePageStyle(
											val as SubscriptionTypes,
										)
									}
								/>
							</FansView>
							{pageStyle === SubscriptionTypes.Tier ? (
								<Fragment>
									<FansView margin={{ b: 38 }}>
										<FansText
											fontSize={17}
											lineHeight={22}
											style={tw.style(
												"font-semibold mb-3",
											)}
										>
											Manage tiers
										</FansText>
										<FansView gap={12}>
											{tiers.map((el) => (
												<SubscriptionTier
													key={el.id}
													data={el}
													onClickEdit={() => {
														navigation.navigate(
															"Tier",
															{
																id: el.id,
															},
														);
													}}
													onClickDelete={() =>
														handleDeleteTier(el)
													}
													onClickSubscribe={() => {}}
												/>
											))}
										</FansView>
									</FansView>

									<RoundButton
										onPress={() => {
											navigation.navigate("Tier", {
												id: null,
											});
										}}
									>
										Create tier
									</RoundButton>
								</Fragment>
							) : (
								<Fragment>
									<FansView margin={{ b: 32 }}>
										<FansText
											fontSize={17}
											lineHeight={22}
											style={tw.style(
												"mb-[14px] text-black",
											)}
										>
											Price per month (USD)
										</FansText>
										<RoundTextInput
											value={price}
											onChangeText={(text) =>
												setPrice(text)
											}
											placeholder=""
											keyboardType="numeric"
										/>
									</FansView>

									<FansView margin={{ b: 32 }}>
										<FansText
											fontSize={17}
											lineHeight={22}
											style={tw.style(
												"font-semibold mb-3",
											)}
										>
											Profile promotion campaign
										</FansText>
										<FansText
											color="grey-70"
											fontSize={16}
											lineHeight={21}
											style={tw.style("mb-[18px]")}
										>
											Offer a free trial or a discounted
											subscription on your profile to a
											limited quantity of new or
											previously expired subscribers
										</FansText>

										<FansView margin={{ b: 10 }}>
											{subscription.campaigns.map(
												(campaign) => (
													<Fragment key={campaign.id}>
														<PromotionCampaign
															data={campaign}
															onClickDelete={() =>
																handleDeleteCampaign(
																	campaign,
																)
															}
															onClickEdit={() => {
																navigation.navigate(
																	"PromotionCampaign",
																	{
																		id:
																			campaign.id ??
																			"",
																	},
																);
															}}
														/>
													</Fragment>
												),
											)}
										</FansView>
										{subscription.campaigns.length === 0 ? (
											<RoundButton
												variant={
													RoundButtonType.OUTLINE_PRIMARY
												}
												onPress={() => {
													// router.push("/profile/edit/promotion-campaign");
													navigation.navigate(
														"PromotionCampaign",
														{
															id: null,
														},
													);
												}}
											>
												Start promotion campaign
											</RoundButton>
										) : null}
									</FansView>

									<FansView margin={{ b: 32 }}>
										<FansText
											fontSize={17}
											lineHeight={22}
											style={tw.style(
												"font-semibold mb-3",
											)}
										>
											Subscription bundles
										</FansText>
										<FansText
											color="grey-70"
											fontSize={16}
											lineHeight={21}
											style={tw.style("mb-2")}
										>
											Offer a bundled subscription at a
											discounted rate for several months
										</FansText>
										<FansView>
											{subscription?.bundles.map(
												(bundle) => (
													<BundleItem
														onClickEdit={() =>
															onClickEditBundle(
																bundle.id ?? "",
															)
														}
														key={bundle.id}
														data={bundle}
														onClickDelete={() =>
															handleDeleteBundle(
																bundle,
															)
														}
													/>
												),
											)}
										</FansView>
										<RoundButton
											variant={
												RoundButtonType.OUTLINE_PRIMARY
											}
											onPress={onClickAddBundle}
										>
											Add bundle
										</RoundButton>
									</FansView>
								</Fragment>
							)}
						</FansView>
						<SwitchTierModal
							visible={openTierModal}
							handleClose={() => {
								setOpenTierModal(false);
							}}
							onSwitchToTiers={() => {
								setOpenTierModal(false);
								setPageStyle(SubscriptionTypes.Tier);
							}}
							onKeep={() => {
								setPageStyle(SubscriptionTypes.Flat);
								setOpenTierModal(false);
							}}
						/>
						<SwitchSubscriptionModal
							visible={openSubscriptionModal}
							handleClose={() => {
								setOpenSubscriptionModal(false);
							}}
							onSwitchToSubscription={() => {
								setPageStyle(SubscriptionTypes.Flat);
								setOpenSubscriptionModal(false);
							}}
							onKeep={() => {
								setPageStyle(SubscriptionTypes.Tier);
								setOpenSubscriptionModal(false);
							}}
						/>
					</LayoutContentsContainer>
				</ScrollView>
			</FansView>
		</AppLayout>
	);
};

export default SubscriptionScreen;
