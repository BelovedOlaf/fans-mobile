import React, { Fragment, useRef, useState } from "react";
import { View } from "react-native";
import SelectDropdown from "react-native-select-dropdown";

import { DiscordPng, DiscordSvg, EditSvg } from "@assets/svgs/common";
import {
	FansButton,
	FansButton2,
	FansGap,
	FansScreen2,
	FansScreen3,
	FansSvg,
	FansSwitch1,
	FansText,
	FansView,
} from "@components/controls";
import { useAppContext } from "@context/useAppContext";
import tw from "@lib/tailwind";
import { UserRoleTypes } from "@usertypes/commonEnums";
import { Colors } from "@usertypes/enums";
import { useDiscordAuthRequest } from "@helper/OAuth2";

const ConnectionsScreen = () => {
	const { state } = useAppContext();
	const { userInfo } = state.user;
	const { type } = userInfo;

	const isCreator = type === UserRoleTypes.Creator;

	const [isAccount, setAccount] = useState(true);
	const [isConnected, setConnected] = useState(false);
	const [isTier, setTier] = useState(true);
	const [isTierTwo, setTierTwo] = useState(true);
	const [isSponsor, setSponsor] = useState(false);
	const connectInProgress = useRef(false);

	const handlePressConnect = async () => {
		if (connectInProgress.current) return;

		try {
			connectInProgress.current = true;
			const result = await discordPromptAsync();
			console.log("result", result);
		} finally {
			connectInProgress.current = false;
		}
	};

	const handlePressDisconnect = () => setConnected(false);

	const [discordRequest, discordResponse, discordPromptAsync] =
		useDiscordAuthRequest("/settings", true);

	return (
		<FansScreen3 contentStyle1={{ maxWidth: { lg: 670 } }}>
			{isCreator ? (
				<Fragment>
					<FansView>
						<FansText fontFamily="inter-semibold" fontSize={17}>
							Linked accounts
						</FansText>
						<FansGap height={15} />
						<FansView
							height={78}
							alignItems="center"
							flexDirection="row"
						>
							<FansView
								width={46}
								height={46}
								alignItems="center"
								backgroundColor="blue"
								borderRadius="full"
								justifyContent="center"
							>
								<FansSvg
									width={26.73}
									height={20.21}
									svg={DiscordSvg}
									color1="white"
								/>
							</FansView>
							<FansGap width={13} />
							<FansView grow>
								<FansText
									fontFamily="inter-semibold"
									fontSize={19}
								>
									Discord account
								</FansText>
								<FansText color="grey-70" fontSize={16}>
									#janelove
								</FansText>
							</FansView>
							<FansView
								width={34}
								height={34}
								alignItems="center"
								backgroundColor="grey"
								borderRadius="full"
								justifyContent="center"
							>
								<FansSvg
									width={12.94}
									height={13.5}
									svg={EditSvg}
								/>
							</FansView>
							<FansGap width={6.6} />
							<FansSwitch1
								value={isAccount}
								onValueChange={setAccount}
							/>
						</FansView>
					</FansView>
					<FansGap height={32} />
					<FansView>
						<FansText fontFamily="inter-semibold" fontSize={17}>
							Available connections
						</FansText>
						<FansGap height={15} />
						<FansView
							height={78}
							alignItems="center"
							flexDirection="row"
						>
							<FansView
								width={46}
								height={46}
								alignItems="center"
								backgroundColor="blue"
								borderRadius="full"
								justifyContent="center"
							>
								<FansSvg
									width={26.73}
									height={20.21}
									svg={DiscordSvg}
									color1="white"
								/>
							</FansView>
							<FansGap width={13} />
							<FansView grow>
								<FansText
									fontFamily="inter-semibold"
									fontSize={19}
								>
									Discord roles
								</FansText>
								<FansText color="grey-70" fontSize={16}>
									{isConnected
										? "Gaming central"
										: "Assign roles"}
								</FansText>
							</FansView>
							{isConnected ? (
								<FansButton2
									title="Disconnect"
									backgroundColor="white"
									textColor="purple"
									onPress={handlePressDisconnect}
								/>
							) : (
								<FansButton2
									title="Connect"
									onPress={handlePressConnect}
								/>
							)}
						</FansView>
					</FansView>
					{isConnected && (
						<Fragment>
							<FansGap height={17} />
							{/* Assigned Discord roles ~ */}
							<FansView>
								<FansText
									fontFamily="inter-semibold"
									fontSize={17}
								>
									Assign Discord roles
								</FansText>
								<FansGap height={12} />
								<FansText color="grey-70" fontSize={16}>
									Fans will be assigned Discord roles based on
									tier they join
								</FansText>
								<FansGap height={22} />
								<FansView
									style={tw.style("gap-[12.6px]")}
									alignItems="start"
									flexDirection="row"
								>
									<FansView
										height={112}
										style={tw.style(
											"gap-[13.7px]",
											"px-[17px]",
										)}
										borderColor="grey"
										borderRadius={15}
										grow
										justifyContent="center"
									>
										<FansText
											fontFamily="inter-semibold"
											fontSize={17}
										>
											Tier Premium
										</FansText>
										<SelectDropdown
											data={["Add role"]}
											defaultValue={"Add role"}
											onSelect={(item, index) => {}}
											buttonStyle={tw.style(
												"w-full h-fans-dropdown",
												"bg-fans-white",
												"border border-fans-grey-70 rounded-full",
											)}
											buttonTextStyle={tw.style(
												"text-left text-fans-grey-70",
											)}
										/>
									</FansView>
									<FansSwitch1
										value={isTier}
										style={tw.style("mt-[18px]")}
										onValueChange={setTier}
									/>
								</FansView>
								<FansGap height={9} />
								<FansView
									style={tw.style("gap-[12.6px]")}
									alignItems="start"
									flexDirection="row"
								>
									<FansView
										height={112}
										style={tw.style(
											"gap-[13.7px]",
											"px-[17px]",
										)}
										borderColor="grey"
										borderRadius={15}
										grow
										justifyContent="center"
									>
										<FansText
											fontFamily="inter-semibold"
											fontSize={17}
										>
											Tier 2 Premium
										</FansText>
										<SelectDropdown
											data={["Add role"]}
											defaultValue={"Add role"}
											onSelect={(item, index) => {}}
											buttonStyle={tw.style(
												"w-full h-fans-dropdown",
												"bg-fans-white",
												"border border-fans-grey-70 rounded-full",
											)}
											buttonTextStyle={tw.style(
												"text-left text-fans-grey-70",
											)}
										/>
									</FansView>
									<FansSwitch1
										value={isTierTwo}
										style={tw.style("mt-[18px]")}
										onValueChange={setTierTwo}
									/>
								</FansView>
								<FansGap height={9} />
								<FansView
									style={tw.style("gap-[12.6px]")}
									alignItems="start"
									flexDirection="row"
								>
									<FansView
										style={tw.style("px-[17px] py-[18px]")}
										borderColor="grey"
										borderRadius={15}
										grow
									>
										<FansText
											fontFamily="inter-semibold"
											fontSize={17}
										>
											Sponsor
										</FansText>
									</FansView>
									<FansSwitch1
										value={isSponsor}
										style={tw.style("mt-[18px]")}
										onValueChange={setSponsor}
									/>
								</FansView>
							</FansView>
							{/* ~ Assigned Discord roles */}
							<FansGap height={39} />
							<FansButton2
								title="Add server"
								backgroundColor="white"
								textColor="purple"
							/>
							<FansGap height={40} />
							<FansButton2 title="Update" />
						</Fragment>
					)}
				</Fragment>
			) : (
				<Fragment>
					<FansView style={tw.style("flex gap-[10px]")}>
						<FansText fontFamily="inter-semibold" fontSize={17}>
							Connect your Discord
						</FansText>
						<FansView>
							<FansText color="grey-70" fontSize={16}>
								Connect your Discord account to unlock exclusive
								roles (in Creator's Discord Server) when you
								subscribe to select creators
							</FansText>
						</FansView>
					</FansView>
					<View style={tw.style("flex-row gap-[10px] items-center")}>
						<FansView style={tw.style("w-[46px] h-[46px]")}>
							<DiscordPng />
						</FansView>
						<View style={tw.style("grow")}>
							<FansText fontFamily="inter-semibold" fontSize={19}>
								Discord user
							</FansText>
							<FansText color="grey-70" fontSize={16}>
								Connected account
							</FansText>
						</View>
						<FansButton style={tw.style("w-[106px]")}>
							<FansText
								color="white"
								fontFamily="inter-bold"
								fontSize={19}
							>
								Connect
							</FansText>
						</FansButton>
					</View>
				</Fragment>
			)}
			<FansGap height={20} />
		</FansScreen3>
	);
};

export default ConnectionsScreen;
