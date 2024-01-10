import React, { useState } from "react";

import { SocialInstagram2Image } from "@assets/svgs";
import {
	Check1Svg,
	Copy1Svg,
	Link2Svg,
	Link3Svg,
	SMS1Svg,
	Whatsapp1Svg,
} from "@assets/svgs/common";
import UserAvatar from "@components/avatar/UserAvatar";
import {
	FansGap,
	FansHorizontalDivider,
	FansSvg,
	FansText,
	FansView,
} from "@components/controls";
import { FansModal3 } from "@components/controls/Modal";
import { IFansModal } from "@usertypes/components";

const CreateLinkModal: IFansModal = (props) => {
	const { visible, onClose, onSubmit, ...props_ } = props;

	const link = "fyp.fans/henry/1345";

	const [isCopied, setCopied] = useState(false);

	const handlePressCopy = () => setCopied(true);

	return (
		<FansModal3 modalStyle={{ padding: { x: 17, y: 31 } }} {...props}>
			<FansView alignSelf="center">
				<UserAvatar size="78px" />
			</FansView>

			<FansGap height={27} />

			<FansHorizontalDivider />

			<FansGap height={24} />

			<FansView alignSelf="center">
				<FansText
					fontFamily="inter-bold"
					fontSize={23}
					textAlign="center"
				>
					Your referral link was created!
				</FansText>
			</FansView>

			<FansGap height={18} />

			<FansView alignSelf="center">
				<FansText fontSize={16} textAlign="center">
					Start referring fans today, and see your earnings soar
				</FansText>
			</FansView>

			<FansGap height={35} />

			<FansView
				alignItems="center"
				borderColor="grey-f0"
				borderRadius="full"
				flexDirection="row"
				padding={4}
			>
				<FansView
					width={34}
					height={34}
					alignItems="center"
					justifyContent="center"
				>
					<FansSvg
						width={17.71}
						height={17.73}
						svg={Link2Svg}
						color1="green-4d"
					/>
				</FansView>
				<FansGap width={8.7} />
				<FansText fontFamily="inter-semibold" fontSize={16}>
					{link}
				</FansText>
				<FansGap grow />
				<FansView
					width={34}
					height={34}
					touchableOpacityProps={
						isCopied ? undefined : { onPress: handlePressCopy }
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
						<FansSvg width={14.71} height={18.73} svg={Copy1Svg} />
					)}
				</FansView>
			</FansView>

			<FansGap height={40} />

			<FansView alignSelf="center" flexDirection="row" gap={7}>
				{[
					{
						icon: (
							<FansView
								width={46}
								height={46}
								alignItems="center"
								backgroundColor="purple-a8"
								borderRadius="full"
								justifyContent="center"
							>
								<FansSvg
									width={24.35}
									height={24.36}
									svg={Link3Svg}
									color1="white"
								/>
							</FansView>
						),
						text: "Copy link",
					},
					{
						icon: (
							<FansView
								width={46}
								height={46}
								alignItems="center"
								backgroundColor="blue-6d"
								borderRadius="full"
								justifyContent="center"
							>
								<FansSvg
									width={24.94}
									height={24.94}
									svg={SMS1Svg}
									color1="white"
								/>
							</FansView>
						),
						text: "SMS",
					},
					{
						icon: (
							<FansSvg
								width={46}
								height={46}
								svg={SocialInstagram2Image}
							/>
						),
						text: "Instagram",
					},
					{
						icon: (
							<FansView
								width={46}
								height={46}
								alignItems="center"
								backgroundColor="green-65"
								borderRadius="full"
								justifyContent="center"
							>
								<FansSvg
									width={24.74}
									height={24.75}
									svg={Whatsapp1Svg}
									color1="white"
								/>
							</FansView>
						),
						text: "Whatsapp",
					},
				].map((value, index) => {
					const { icon, text } = value;
					return (
						<FansView width={70} alignItems="center" gap={10}>
							{icon}
							<FansText fontSize={14}>{text}</FansText>
						</FansView>
					);
				})}
			</FansView>
		</FansModal3>
	);
};

export default CreateLinkModal;
