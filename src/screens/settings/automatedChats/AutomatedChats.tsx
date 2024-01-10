import React, { useEffect, useState } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";

import { Edit1Svg } from "@assets/svgs/common";
import {
	FansButton3,
	FansGap,
	FansHorizontalDivider,
	FansImage2,
	FansScreen2,
	FansScreen3,
	FansSvg,
	FansSwitch,
	FansSwitch1,
	FansText,
	FansView,
} from "@components/controls";
import tw from "@lib/tailwind";
import { AutomatedChatsNativeStackScreenProps } from "@screens/settings/automatedChats";
import { ColorStyle1 } from "@usertypes/styles";
import {
	WelcomeMessageImageModal,
	WelcomeMessageModal,
} from "@components/modals/settings/automatedChats";

const AutomatedChatsScreen = (
	prop: AutomatedChatsNativeStackScreenProps<"AutomatedChats">,
) => {
	const { navigation } = prop;

	const [isTop1, setTop1] = useState(true);
	const [isTop5, setTop5] = useState(true);
	const [isTop10, setTop10] = useState(true);
	const [isCustomMessage, setCustomMessage] = useState(true);
	const [isWelcomeMessage, setWelcomeMessage] = useState(true);
	const [
		isWelcomeMessageImageModalVisible,
		setWelcomeMessageImageModalVisible,
	] = useState(false);
	const [isWelcomeMessageModalVisible, setWelcomeMessageModalVisible] =
		useState(false);

	const handleCloseWelcomeMessageImageModal = () =>
		setWelcomeMessageImageModalVisible(false);

	const handleCloseWelcomeMessageModal = () =>
		setWelcomeMessageModalVisible(false);

	const handlePressCustomMessage = () => {
		tw.prefixMatch("lg")
			? setWelcomeMessageImageModalVisible(true)
			: navigation.navigate("MessageImage", { type: "Custom" });
	};

	const handlePressWelcomeMessage = () => {
		tw.prefixMatch("lg")
			? setWelcomeMessageImageModalVisible(true)
			: navigation.navigate("MessageImage", { type: "Welcome" });
	};

	const handleSubmitWlecomeMessageImageModal = () => {
		setWelcomeMessageImageModalVisible(false);
		setWelcomeMessageModalVisible(true);
	};

	const welcomeMessage = {
		image: "https://i.postimg.cc/J7vXYBL0/image.png",
		text: "Hey there! Here’s a little surprise gift for you. Hope you enjoy it! Xx",
	};

	const topFansMessage = {
		image: "https://i.postimg.cc/J7vXYBL0/image.png",
		text: "Hey there! Here’s a little surprise gift for you. Hope you enjoy it! Xx",
	};

	return (
		<FansScreen3 contentStyle={tw.style("lg:max-w-[670px]")}>
			<FansGap height={{ lg: 40.6 }} />
			<FansView>
				<FansSwitch1
					label={
						<FansText fontFamily="inter-semibold" fontSize={19}>
							Welcome message
						</FansText>
					}
					value={isWelcomeMessage}
					onValueChange={setWelcomeMessage}
				/>
				<FansGap height={10} />
				<FansText color="grey-70" fontSize={16}>
					Send an automated message to new fans
				</FansText>
				<FansGap height={20} />
				<FansButton3
					title="Create welcome message"
					buttonStyle={{ backgroundColor: "white" }}
					textStyle1={{ color: "purple" }}
					onPress={handlePressWelcomeMessage}
				/>
			</FansView>
			<FansGap height={36.3} />
			{/* Welcome message ~*/}
			<FansView>
				<FansView
					alignItems="center"
					flexDirection="row"
					justifyContent="between"
				>
					<FansText fontFamily="inter-semibold" fontSize={17}>
						Welcome message
					</FansText>
					<TouchableOpacity>
						<FansView
							alignItems="center"
							flexDirection="row"
							gap={4.6}
						>
							<FansSvg
								width={10.85}
								height={11.31}
								svg={Edit1Svg}
								color1="purple"
							/>
							<FansText
								color="purple"
								fontFamily="inter-semibold"
								fontSize={17}
							>
								Edit
							</FansText>
						</FansView>
					</TouchableOpacity>
				</FansView>
				<FansGap height={14} />
				<FansView
					style={tw.style("p-[15px]")}
					alignItems="end"
					borderColor="grey-f0"
					borderRadius={7}
					gap={7.4}
				>
					<FansImage2
						width={250}
						height={183}
						source={{ uri: welcomeMessage.image }}
						viewStyle={{ borderRadius: 15 }}
					/>
					<FansView
						width={250}
						style={tw.style(
							"rounded-t-[21px] rounded-bl-[21px]",
							"p-[11px]",
						)}
						backgroundColor="purple"
					>
						<FansText color="white" fontSize={18}>
							{welcomeMessage.text}
						</FansText>
					</FansView>
				</FansView>
			</FansView>
			{/* ~ Welcome message */}
			<FansGap height={32} />
			<FansHorizontalDivider />
			<FansGap height={26.3} />
			<FansView>
				<FansText fontFamily="inter-semibold" fontSize={19}>
					Notify top fans
				</FansText>
				<FansGap height={11} />
				<FansText color="grey-70" fontSize={16}>
					Monthly notify your fans when they have made it to the Top
					1% or 5%
				</FansText>
				<FansGap height={24.8} />
				<FansSwitch1
					label="Top 1%"
					value={isTop1}
					onValueChange={setTop1}
				/>
				<FansGap height={20} />
				<FansHorizontalDivider />
				<FansGap height={20} />
				<FansSwitch1
					label="Top 5%"
					value={isTop5}
					onValueChange={setTop5}
				/>
				<FansGap height={20} />
				<FansHorizontalDivider />
				<FansGap height={20} />
				<FansSwitch
					text="Top 10%"
					value={isTop10}
					onValueChange={setTop10}
				/>
			</FansView>
			<FansGap height={40} />
			<FansView>
				<FansSwitch1
					label={
						<FansText fontFamily="inter-semibold" fontSize={18}>
							Set custom message
						</FansText>
					}
					value={isCustomMessage}
					onValueChange={setCustomMessage}
				/>
				<FansGap height={10.5} />
				<FansText color="grey-70" fontSize={16}>
					Craft your own message that is sent to fans when they reach
					a certain top %
				</FansText>
				<FansGap height={20} />
				<FansButton3
					title="Create custom message"
					buttonStyle={{ backgroundColor: "white" }}
					textStyle1={{ color: "purple" }}
					onPress={handlePressCustomMessage}
				/>
			</FansView>
			<FansGap height={36.3} />
			{/* Top fans message ~*/}
			<FansView>
				<FansView
					alignItems="center"
					flexDirection="row"
					justifyContent="between"
				>
					<FansText fontFamily="inter-semibold" fontSize={17}>
						Top fans message
					</FansText>
					<TouchableOpacity>
						<FansView
							alignItems="center"
							flexDirection="row"
							gap={4.6}
						>
							<FansSvg
								width={10.85}
								height={11.31}
								svg={Edit1Svg}
								color1="purple"
							/>
							<FansText
								color="purple"
								fontFamily="inter-semibold"
								fontSize={17}
							>
								Edit
							</FansText>
						</FansView>
					</TouchableOpacity>
				</FansView>
				<FansGap height={14} />
				<FansView
					style={tw.style("p-[15px]")}
					alignItems="end"
					borderColor="grey-f0"
					borderRadius={7}
					gap={7.4}
				>
					<FansImage2
						width={250}
						height={183}
						source={{ uri: topFansMessage.image }}
						viewStyle={{ borderRadius: 15 }}
					/>
					<FansView
						width={250}
						style={tw.style(
							"rounded-t-[21px] rounded-bl-[21px]",
							"p-[11px]",
						)}
						backgroundColor="purple"
					>
						<FansText color="white" fontSize={18}>
							{topFansMessage.text}
						</FansText>
					</FansView>
				</FansView>
			</FansView>
			{/* ~ Top fans message */}
			<FansGap height={39.9} />
			<FansButton3 title="Update" />
			<WelcomeMessageImageModal
				visible={isWelcomeMessageImageModalVisible}
				onClose={handleCloseWelcomeMessageImageModal}
				onSubmit={handleSubmitWlecomeMessageImageModal}
			/>
			<WelcomeMessageModal
				visible={isWelcomeMessageModalVisible}
				onClose={handleCloseWelcomeMessageModal}
				onSubmit={() => {}}
			/>
			<FansGap height={20} />
		</FansScreen3>
	);
};

export default AutomatedChatsScreen;
