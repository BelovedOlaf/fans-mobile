import React, { useState } from "react";

import ToastMessage from "react-native-toast-message";

// import base modules
import {
	Check1Svg,
	CloseSvg,
	CongratsSvg,
	Copy1Svg,
	CopyLinkSvg,
	SmsSvg,
	WhatsappSvg,
} from "@assets/svgs/common";
import {
	FansGap,
	FansHorizontalDivider,
	FansImage2,
	FansSvg,
	FansText,
	FansView,
} from "@components/controls";
import tw from "@lib/tailwind";
import { IFansModal } from "@usertypes/components";
import { FansModal3 } from "@components/controls/Modal";
import { IconButton } from "react-native-paper";
import { View, Image } from "react-native";
import { setStringAsync } from "expo-clipboard";

const ReferralLinkCreatedModal: IFansModal = (props) => {
	const { code, visible, onClose, ...props_ } = props;

	const link = `fyp.fans/${code}`;
	const [isCopied, setCopied] = useState(false);

	const socials = [
		{
			title: "Copy link",
			icon: (
				<FansView
					style={tw.style(
						"w-[46px] h-[46px] flex items-center justify-center bg-fans-purple rounded-full pl-[1px]",
					)}
				>
					<CopyLinkSvg color="#FFF" width={25} />
				</FansView>
			),
		},
		{
			title: "SMS",
			icon: (
				<FansView
					style={tw.style(
						"w-[46px] h-[46px] flex items-center justify-center bg-[#6D83F7] rounded-full",
					)}
				>
					<SmsSvg width={25} />
				</FansView>
			),
		},
		{
			title: "Instagram",
			icon: (
				<Image
					style={tw.style("w-[46px] h-[46px]")}
					source={require("@assets/images/socials/instagram.png")}
				/>
			),
		},
		{
			title: "Whatsapp",
			icon: (
				<FansView
					style={tw.style(
						"w-[46px] h-[46px] flex items-center justify-center bg-fans-green rounded-full pl-[2px]",
					)}
				>
					<WhatsappSvg width={25} />
				</FansView>
			),
		},
	];

	const handlePressCopy = () => {
		setStringAsync(link);
		ToastMessage.show({ type: "success", text1: "Copied" });
		setCopied(true);
	};

	return (
		<FansModal3 {...props}>
			<View
				style={tw.style(
					"absolute right-[15px] top-[15px] md:flex w-7.5 h-7.5",
				)}
			>
				<IconButton
					icon={() => <CloseSvg size={13.2} color="#fff" />}
					containerColor="rgba(0,0,0,0.3)"
					style={tw.style("m-0 w-7.5 h-7.5 ")}
					onPress={onClose}
				/>
			</View>

			<FansView
				style={tw.style("flex items-center", "mx-[20px] my-[15px]")}
			>
				<FansView style={tw.style("w-[101.8px] h-[100.6px]")}>
					<FansImage2
						width={{ xs: 90.27, lg: 101.81 }}
						height={{ xs: 89.19, lg: 100.6 }}
						source={require("@assets/images/congulator.png")}
					/>
				</FansView>
				<FansGap height={22} />
				<FansHorizontalDivider width={{ lg: 358, xs: "full" }} />
				<FansGap height={18} />
				<FansText
					style={tw.style(
						"font-inter-bold",
						"text-[23px] text-center",
					)}
				>
					Your referral link{"\n"}
					was created!
				</FansText>
				<FansGap height={18} />
				<FansText
					style={tw.style("text-[16px] text-center leading-[21px]")}
				>
					Start referring creators today,{"\n"}
					and see your networth soar
				</FansText>
				<FansGap height={35} />
				<FansView
					height={42}
					alignItems="center"
					alignSelf="stretch"
					borderColor="grey-f0"
					borderRadius="full"
					flexDirection="row"
					padding={4}
				>
					<FansView
						style={tw.style(
							"w-[34px] h-[34px] rounded-full p-2 mr-2 items-center justify-center",
						)}
					>
						<CopyLinkSvg color="#5f17d3" />
					</FansView>
					<FansText fontFamily="inter-semibold" fontSize={16}>
						{link}
					</FansText>
					<FansGap grow />
					<FansView
						width={34}
						height={34}
						touchableOpacityProps={
							isCopied
								? undefined
								: {
										onPress: handlePressCopy,
								  }
						}
						alignItems="center"
						backgroundColor="grey-f0"
						borderRadius="full"
						justifyContent="center"
					>
						{isCopied ? (
							<FansSvg
								width={14.71}
								height={18.73}
								svg={Check1Svg}
								color1="green-4d"
							/>
						) : (
							<FansSvg
								width={14.71}
								height={18.73}
								svg={Copy1Svg}
							/>
						)}
					</FansView>
				</FansView>
				<FansGap height={40} />
				<FansView
					style={tw.style(
						"flex-row items-center justify-center",
						"gap-[10px] md:gap-[30px]",
					)}
				>
					{socials.map((item, index) => (
						<FansView
							style={tw.style("flex items-center gap-[9px]")}
							key={index}
						>
							{item.icon}
							<FansText fontSize={14}>{item.title}</FansText>
						</FansView>
					))}
				</FansView>
			</FansView>
		</FansModal3>
	);
};

export default ReferralLinkCreatedModal;
