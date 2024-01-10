import RoundButton from "@components/common/RoundButton";
import { FansView, FansDivider } from "@components/controls";
import { FypText } from "@components/common/base";
import RoundTextInput from "@components/common/RoundTextInput";
import CustomRadio from "@components/common/customRadio";
import CustomTopNavBar from "@components/common/customTopNavBar";
import AppLayout, { LayoutContentsContainer } from "@components/common/layout";
import { DiscountPicker } from "@components/profiles";
import { defaultSubscriptions } from "@constants/common";
import { ProfileActionType } from "@context/reducer/profileReducer";
import { useAppContext } from "@context/useAppContext";
import { createBundle, updateBundle } from "@helper/endpoints/profile/apis";
import tw from "@lib/tailwind";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ProfileNavigationStacks } from "@usertypes/navigations";
import { validateNumberString } from "@utils/stringHelper";
import React, { useEffect, useState } from "react";
import { ScrollView } from "react-native";
import Collapsible from "react-native-collapsible";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";

interface IBundleForm {
	month: string;
	discount: string;
	limit: string;
}

const BundleScreen = (
	props: NativeStackScreenProps<ProfileNavigationStacks, "Bundle">,
) => {
	const { navigation, route } = props;
	const { id, price } = route.params;

	const insets = useSafeAreaInsets();

	const { state, dispatch } = useAppContext();
	const { subscriptions } = state.profile;
	const subscription = subscriptions[0] ?? defaultSubscriptions;

	const isEditPage = !!id;

	const [inProgress, setInProgress] = useState(false);
	const [isNoLimit, setIsNoLimit] = useState(true);
	const [formData, setFormData] = useState<IBundleForm>({
		month: "",
		discount: "25",
		limit: "",
	});
	const [formErrors, setFormErrors] = useState({
		month: false,
		discount: false,
		limit: false,
	});

	const onSaveContext = () => {
		let bundles = subscription.bundles;
		if (!isEditPage) {
			bundles.push({
				id: new Date().getTime().toString(),
				month: parseInt(formData.month),
				limit: parseInt(formData.limit),
				discount: parseInt(formData.discount),
				isNew: true,
			});
		} else {
			bundles = bundles.map((el) =>
				el.id === id
					? {
							...el,
							month: parseInt(formData.month),
							limit: parseInt(formData.limit),
							discount: parseInt(formData.discount),
					  }
					: el,
			);
		}
		dispatch.setProfile({
			type: ProfileActionType.updateBundles,
			data: bundles,
		});

		navigation.goBack();
	};

	const onIntegrateWithApi = async () => {
		setInProgress(true);
		const postbody = {
			month: parseInt(formData.month),
			limit: parseInt(formData.limit),
			discount: parseInt(formData.discount),
		};

		let bundles = subscription.bundles;

		if (!isEditPage) {
			const resp = await createBundle({ ...postbody, title: "" });
			if (resp.ok) {
				bundles.push(resp.data);
				dispatch.setProfile({
					type: ProfileActionType.updateBundles,
					data: bundles,
				});
				navigation.goBack();
			} else {
				Toast.show({
					type: "error",
					text1: "Failed to create",
				});
			}
			setInProgress(false);
		} else {
			const resp = await updateBundle(postbody, { id: id as string });
			setInProgress(false);
			if (resp.ok) {
				bundles = bundles.map((el) =>
					el.id === id
						? {
								...el,
								month: parseInt(formData.month),
								limit: parseInt(formData.limit),
								discount: parseInt(formData.discount),
						  }
						: el,
				);
				dispatch.setProfile({
					type: ProfileActionType.updateBundles,
					data: bundles,
				});
				navigation.goBack();
			} else {
				Toast.show({
					type: "error",
					text1: "Failed to update",
				});
			}
		}
	};

	const handleSubmit = async () => {
		if (
			!validateNumberString(formData.month) ||
			!validateNumberString(formData.discount) ||
			!validateNumberString(formData.limit)
		) {
			setFormErrors({
				month: !validateNumberString(formData.month),
				discount: !validateNumberString(formData.discount),
				limit: !validateNumberString(formData.limit),
			});
			return;
		}
		setFormErrors({
			month: false,
			discount: false,
			limit: false,
		});
		const bundlePrice =
			(price *
				parseInt(formData.month) *
				(100 - parseFloat(formData.discount))) /
			100;
		if (bundlePrice > 200) {
			Toast.show({
				type: "error",
				text1: "Bundle price can't go over $200",
			});
			return;
		}
		if (subscription.id) {
			onIntegrateWithApi();
		} else {
			onSaveContext();
		}
	};

	const onChange = (name: string, value: string) => {
		setFormData({
			...formData,
			[name]: value,
		});
	};

	useEffect(() => {
		if (id) {
			const bundle = subscription.bundles.find((el) => el.id === id);
			setFormData({
				discount: bundle?.discount.toString() ?? "",
				month: bundle?.month.toString() ?? "",
				limit: bundle?.limit.toString() ?? "",
			});
			setIsNoLimit(bundle?.limit === 0 ? true : false);
		} else {
			setFormData({
				discount: "25",
				month: "",
				limit: "0",
			});
		}
	}, [id]);

	return (
		<AppLayout
			title="Edit Profile | FYP.Fans"
			description="FYP.Fans allows creators to make an income doing what they love!"
		>
			<FansView flex="1">
				<ScrollView style={tw.style("flex-1")}>
					<LayoutContentsContainer>
						<CustomTopNavBar
							title={isEditPage ? "Edit bundle" : "Add bundle"}
							onClickLeft={() => navigation.goBack()}
							onClickRight={handleSubmit}
							rightLabel="Save"
							loading={inProgress}
						/>
						<FansView
							padding={{ x: 18, t: 24, b: insets.bottom + 35 }}
						>
							<FypText
								fontSize={17}
								lineHeight={22}
								fontWeight={600}
								style={tw.style("mb-3")}
							>
								Subscription bundle
							</FypText>
							<FypText
								fontSize={16}
								lineHeight={21}
								color="grey-70"
								style={tw.style("mb-[18px]")}
							>
								Enter how many months you're bundling together
							</FypText>
							<RoundTextInput
								placeholder="e.g. 6"
								value={formData.month}
								onChangeText={(val) => onChange("month", val)}
								hasError={formErrors.month}
								helperText={
									formErrors.month ? "Invalid value" : ""
								}
								keyboardType="numeric"
							/>

							<FansView margin={{ t: 24, b: 32 }}>
								<FypText
									fontSize={17}
									lineHeight={22}
									fontWeight={600}
									style={tw.style("mb-3")}
								>
									Discount
								</FypText>
								<FypText
									fontSize={16}
									lineHeight={21}
									color="grey-70"
									style={tw.style("mb-9")}
								>
									Set how much in percent discount you're
									giving for bundle compared to subscription
									price
								</FypText>

								<DiscountPicker
									value={formData.discount}
									onChange={(val) =>
										onChange("discount", val)
									}
								/>
							</FansView>

							<FansView>
								<FypText
									fontSize={17}
									lineHeight={22}
									fontWeight={600}
									style={tw.style("mb-3")}
								>
									Limit
								</FypText>
								<FypText
									fontSize={16}
									lineHeight={21}
									color="grey-70"
									style={tw.style("mb-[10px]")}
								>
									Specify the maximum number of subscribers
									who can sign up for the promotion
								</FypText>

								<FansView
									height={52}
									flexDirection="row"
									alignItems="center"
								>
									<CustomRadio
										label="No limit"
										onPress={() => {
											setIsNoLimit(true);
											onChange("limit", "0");
										}}
										checked={isNoLimit}
									/>
								</FansView>
								<FansDivider />
								<FansView
									height={52}
									flexDirection="row"
									alignItems="center"
								>
									<CustomRadio
										label="Specify limit"
										onPress={() => {
											setIsNoLimit(false);
										}}
										checked={!isNoLimit}
									/>
								</FansView>
								<Collapsible collapsed={isNoLimit}>
									<FansView padding={{ t: 6 }}>
										<RoundTextInput
											onChangeText={(val) =>
												onChange("limit", val)
											}
											hasError={formErrors.limit}
											helperText={
												formErrors.limit
													? "Invalid value"
													: ""
											}
											placeholder="e.g. 25"
											value={formData.limit}
											keyboardType="numeric"
										/>
									</FansView>
								</Collapsible>

								<FansView margin={{ t: 46 }}>
									<RoundButton
										onPress={handleSubmit}
										loading={inProgress}
									>
										{isEditPage
											? "Save changes"
											: "Add bundle"}
									</RoundButton>
								</FansView>
							</FansView>
						</FansView>
					</LayoutContentsContainer>
				</ScrollView>
			</FansView>
		</AppLayout>
	);
};

export default BundleScreen;
