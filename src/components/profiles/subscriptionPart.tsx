import { View } from "react-native";
import React, { FC } from "react";

import TextButton from "@components/common/TextButton";
import SubscriptionButton from "./subscriptionButton";
import SubscriptionTier from "./subscriptionTier";
import SubscriptionBundle from "@components/common/subscriptionBundle";
import { FansDivider, FansText } from "@components/controls";
import { FypNullableView } from "@components/common/base";

import { PlusSvg } from "@assets/svgs/common";

import tw from "@lib/tailwind";
import { getBundlePrice } from "@utils/stringHelper";
import { IProfile } from "@usertypes/types";
import { SubscriptionTypes, SubscribeActionType } from "@usertypes/commonEnums";

interface Props {
	isPreview?: boolean;
	profile: IProfile;
	onClickAddTier?: () => void;
	onClickEditTier?: (tierId: string) => void;
	onClickDeleteTier?: (tierId: string) => void;
	onClickSubscribe?: (
		subscribeType: SubscribeActionType,
		subscribeTierId: string,
		bundleId: string,
		price?: number,
	) => void;
}

const SubscriptionPart: FC<Props> = (props) => {
	const {
		profile,
		onClickAddTier,
		onClickEditTier,
		onClickDeleteTier,
		isPreview,
		onClickSubscribe,
	} = props;

	const tiers = profile.tiers;
	const subscription = profile.subscriptions[0];

	return (
		<View>
			{profile.subscriptionType === SubscriptionTypes.Tier ? (
				<FypNullableView visible={tiers.length > 0}>
					<View
						style={tw.style(
							"flex-row items-center justify-between",
							{
								"mb-4": tiers.length > 0,
							},
						)}
					>
						<FansText
							fontSize={17}
							lineHeight={22}
							style={tw.style("font-semibold text-black")}
						>
							Subscription tiers
						</FansText>

						<View
							style={tw.style(onClickAddTier ? "flex" : "hidden")}
						>
							<TextButton
								icon={() => (
									<PlusSvg
										width={8.4}
										height={8.4}
										color="#a854f5"
									/>
								)}
								onPress={onClickAddTier}
							>
								Add tier
							</TextButton>
						</View>
					</View>

					<View
						style={tw.style(
							"gap-y-3 mb-5 gap-y-3 flex-row flex-wrap md:mx-[-6px]",
						)}
					>
						{tiers?.map((el) => (
							<View
								style={tw.style("w-full md:w-1/2 md:px-1.5")}
								key={el.id}
							>
								<SubscriptionTier
									data={el}
									onClickEdit={() => {
										if (onClickEditTier) {
											onClickEditTier(el.id);
										}
									}}
									onClickDelete={() => {
										if (onClickDeleteTier) {
											onClickDeleteTier(el.id);
										}
									}}
									onClickSubscribe={() => {
										if (onClickSubscribe) {
											onClickSubscribe(
												SubscribeActionType.Tier,
												el.id,
												"",
											);
										}
									}}
									isPreview={isPreview}
								/>
							</View>
						))}
					</View>
				</FypNullableView>
			) : (
				<View>
					{subscription ? (
						<View style={tw.style("mb-10")}>
							<SubscriptionButton
								data={subscription}
								onPress={() => {
									if (onClickSubscribe) {
										onClickSubscribe(
											SubscribeActionType.Subscribe,
											subscription.id,
											"",
											subscription.price,
										);
									}
								}}
							/>
						</View>
					) : null}
					<FypNullableView visible={subscription?.bundles.length > 0}>
						<FansText
							fontSize={17}
							lineHeight={22}
							style={tw.style("font-semibold text-black")}
						>
							Subscription bundles
						</FansText>
						<View
							style={tw.style("flex-col gap-y-2", {
								"mt-4": subscription?.bundles.length > 0,
							})}
						>
							{subscription?.bundles.map((bundle) => (
								<SubscriptionBundle
									key={bundle.id}
									title={`${bundle.month} months`}
									value={`${getBundlePrice(
										subscription.price,
										bundle.month,
										bundle.discount,
										"USD",
									)} total`}
									optionalText={`(${bundle.discount}% off)`}
									onPress={() => {
										if (onClickSubscribe) {
											onClickSubscribe(
												SubscribeActionType.Bundle,
												bundle.subscriptionId ?? "",
												bundle.id ?? "",
											);
										}
									}}
								/>
							))}
						</View>
						<FansDivider style={tw.style("my-5.5 h-[1px]")} />
					</FypNullableView>
				</View>
			)}
		</View>
	);
};

export default SubscriptionPart;
