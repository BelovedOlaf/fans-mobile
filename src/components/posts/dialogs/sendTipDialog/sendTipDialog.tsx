import RoundButton from "@components/common/RoundButton";
import RoundTextInput from "@components/common/RoundTextInput";
import Title from "@components/common/Title";
import BottomSheetWrapper from "@components/common/bottomSheetWrapper";
import { FansText } from "@components/controls";
import { gemOptions } from "@constants/common";
import { CommonActionType, useAppContext } from "@context/useAppContext";
import { tipCreator } from "@helper/endpoints/gems/apis";
import tw from "@lib/tailwind";
import { ComponentSizeTypes, RoundButtonType } from "@usertypes/commonEnums";
import { validateNumberString } from "@utils/stringHelper";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Image, Text, TextInput, View } from "react-native";
import Toast from "react-native-toast-message";
import GemItem from "./gemItem";

const SendTipDialog = () => {
	const router = useRouter();
	const { state, dispatch } = useAppContext();
	const { userInfo } = state.user;
	const { sendTipModal } = state.common;

	const [customTip, setCustomTip] = useState("");
	const [customTipPrice, setCustomTipPrice] = useState(0);
	const [selectedTip, setSelectedTip] = useState("500");
	const [message, setMessage] = useState("");

	const onClose = () => {
		dispatch.setCommon({
			type: CommonActionType.toggleSendTipModal,
			data: {
				visible: false,
			},
		});
	};

	const onClickGetGem = () => {
		onClose();
		router.push({ pathname: "/get-gems", params: { gems: selectedTip } });
	};

	const handleSendTip = () => {
		const tipCreatorAsync = async () => {
			if (!sendTipModal.creator) {
				return;
			}

			const res = await tipCreator({
				creatorId: sendTipModal.creator.id,
				gems: parseInt(selectedTip.replace(/,/g, "")),
				message,
			});

			onClose();

			if (res.ok) {
				dispatch.fetchUserInfo();
				dispatch.setCommon({
					type: CommonActionType.toggleSendTipSuccessModal,
					data: {
						visible: true,
						creator: sendTipModal.creator,
						tip: selectedTip,
						message: message,
					},
				});
			} else {
				Toast.show({
					type: "error",
					text1: res.data.message,
				});
			}
		};

		tipCreatorAsync();
	};

	const onChangeCustomTip = (val: string) => {
		if (!validateNumberString(val)) {
			return;
		}
		setSelectedTip(val);
		setCustomTip(val);
		setCustomTipPrice(parseInt(val) * 0.01);
	};

	const onSelectTip = (amount: string, price: number) => {
		setSelectedTip(amount);
		setCustomTip(amount.replace(",", ""));
		setCustomTipPrice(price);
	};

	useEffect(() => {
		onSelectTip("500", 5);
	}, [sendTipModal]);

	return (
		<BottomSheetWrapper
			open={sendTipModal.visible}
			onClose={() => {
				onClose();
			}}
		>
			<View>
				<View style={tw.style("px-[18px] mb-[22px] md:pt-10")}>
					<Title style="text-center" size={ComponentSizeTypes.lg}>
						{`Tip @${(sendTipModal.creator?.profileLink ?? "")
							.split("/")
							.slice(-1)}`}
					</Title>
					{selectedTip !== "" && (
						<Text
							style={tw.style(
								"text-[73px] leading-[97px] text-center text-fans-purple mt-3",
							)}
						>
							{selectedTip}
						</Text>
					)}
					<FansText
						fontSize={22}
						lineHeight={30}
						style={tw.style("text-center mt-[-10px]")}
					>
						{`$${parseInt(selectedTip.replace(/,/g, "")) * 0.01}`}
					</FansText>
				</View>

				<View
					style={tw.style("flex-row px-[28px] justify-between mb-8")}
				>
					{gemOptions.map((gem) => (
						<GemItem
							key={gem.title}
							title={gem.title}
							price={gem.price}
							titleColor={gem.color}
							onSelect={() => onSelectTip(gem.title, gem.price)}
							isSelected={selectedTip === gem.title}
							icon={gem.icon}
						/>
					))}
				</View>

				<View style={tw.style("px-[18px] mb-[22px]")}>
					<View style={tw.style("mb-6")}>
						<View style={tw.style("relative")}>
							<RoundTextInput
								placeholder="Enter tip amount"
								onChangeText={onChangeCustomTip}
								value={customTip}
								keyboardType="numeric"
							/>
							{customTip !== "" ? (
								<FansText
									fontSize={17}
									lineHeight={22}
									style={tw.style(
										"text-fans-dark-grey font-normal absolute right-3 top-[10px]",
									)}
								>
									{`= ${customTipPrice} USD`}
								</FansText>
							) : null}
						</View>
					</View>

					<View style={tw.style("mb-7 h-[85px]")}>
						{selectedTip !== "0" || customTip !== "" ? (
							<TextInput
								value={message}
								onChangeText={(val) => setMessage(val)}
								autoCapitalize="none"
								multiline
								numberOfLines={4}
								maxLength={1000}
								placeholder="Write a message..."
								placeholderTextColor="#707070"
								style={[
									tw.style(
										"h-[85px] rounded-[15px] text-[18px] leading-[23px] p-[14px]",
									),
									{
										shadowColor: "rgba(0,0,0,0.16)",
										shadowOffset: {
											width: 0,
											height: 3,
										},
										shadowRadius: 6,
									},
									{ outlineStyle: "none" },
								]}
							/>
						) : null}
					</View>

					<RoundButton
						onPress={handleSendTip}
						disabled={customTip === "" && selectedTip === "0"}
					>
						Send tip
					</RoundButton>
				</View>
				<LinearGradient
					colors={["#a854f5", "#a854f5", "#d885ff"]}
					start={[0, 1]}
					end={[1, 0]}
					style={tw.style("pt-5 pb-11")}
				>
					<Title
						style="text-white text-center mb-2"
						size={ComponentSizeTypes.lg}
					>
						Next level unlock in 5 Gems!
					</Title>
					<View style={tw.style("flex-row justify-center mb-4")}>
						<Title style="font-normal text-white mr-[12.6px]">
							You have
						</Title>
						{/* <GemSvg size={20.7} /> */}
						<Image
							source={require("@assets/images/gem.png")}
							style={tw.style("w-5 h-5")}
							resizeMode="cover"
						/>
						<Title style="text-white ml-[4.7px]">{`${userInfo.gems} Gems`}</Title>
					</View>

					<View style={tw.style("w-[164px] mx-auto")}>
						<RoundButton
							onPress={onClickGetGem}
							variant={RoundButtonType.OUTLINE_WHITE}
						>
							Get Gems
						</RoundButton>
					</View>
				</LinearGradient>
			</View>
		</BottomSheetWrapper>
	);
};

export default SendTipDialog;
